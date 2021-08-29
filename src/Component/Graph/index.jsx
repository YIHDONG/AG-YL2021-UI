import React, { useRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import * as d3 from 'd3';
import { v4 as uuidv4 } from 'uuid';

const NODE_RADIUS = 20;

const GraphStyle = styled.svg`

background:white;
border: 6px solid black;
box-shadow: 4px 4px 0px black;
border-radius: 10px;
width: 410px;
height: 410px;

text {
  font-family: 'Lato', sans-serif;
  user-select: none;
  pointer-events: none;
}

path {
  fill: none;
  stroke-width: 6;
}`;

const Graph = ({
  width,
  height,
  nodes,
  edges,
  onNodeClicked,
  onEdgeClicked,
  onCanvasClicked,
  edgeColor,
  nodeColor,
  selectable,
}) => {
  const graph = useRef(null);
  const [g, setG] = useState(null);
  const [graphId] = useState(uuidv4());

  const handleCanvasClicked = (e) => {
    const pt = graph.current.createSVGPoint();

    // pass event coordinates
    pt.x = e.clientX;
    pt.y = e.clientY;

    // transform to SVG coordinates
    const svgP = pt.matrixTransform(graph.current.getScreenCTM().inverse());
    onCanvasClicked({
      clientX: e.clientX, clientY: e.clientY, svgX: svgP.x, svgY: svgP.y,
    });
  };

  useEffect(() => {
    const getNode = (id) => nodes.find((n) => n.id === id);

    const getPos = (from, to) => {
      const { x: fromX, y: fromY } = getNode(from);
      const { x: toX, y: toY } = getNode(to);

      const dx = toX - fromX;
      const dy = toY - fromY;
      const theta = Math.atan2(dy, dx);
      const mag = Math.sqrt(dx * dx + dy * dy) / 2;

      // find the deflection of edge path
      const thetaPrime = Math.atan2(NODE_RADIUS, mag);
      const magPrime = Math.sqrt(NODE_RADIUS * NODE_RADIUS + mag * mag);

      const midX = fromX + magPrime * Math.cos(theta + thetaPrime);
      const midY = fromY + magPrime * Math.sin(theta + thetaPrime);

      // find position for annotation
      const labelOffset = NODE_RADIUS * 2;
      const thetaPrimeOffset = Math.atan2(labelOffset, mag);
      const magPrimeOffset = Math.sqrt(labelOffset * labelOffset + mag * mag);

      const labelX = fromX + magPrimeOffset * Math.cos(theta + thetaPrimeOffset);
      const labelY = fromY + magPrimeOffset * Math.sin(theta + thetaPrimeOffset);

      return ({
        fromX, fromY, midX, midY, toX, toY, labelX, labelY, theta,
      });
    };

    if (nodes && edges && graph.current) {
      if (!g) {
        setG(d3.select(graph.current).append('g'));
        return;
      }

      const lineGenerator = d3.line()
        .x((d) => d.x)
        .y((d) => d.y)
        .curve(d3.curveCardinal);

      const edgesConverted = edges.map((e) => ({ ...e, ...getPos(e.fromNodeId, e.toNodeId) }));
      // add edges
      g.selectAll('path')
        .data(edgesConverted, (d) => d.id)
        .join('path')
        .attr('d', (d) => lineGenerator([{ x: d.fromX, y: d.fromY }, { x: d.midX, y: d.midY }, { x: d.toX, y: d.toY }]))
        .attr('marker-mid', (d) => `url(#graphDirMarker-${graphId}-${d.id})`)
        .style('stroke', (d) => edgeColor(d).primary)
        .style('cursor', selectable ? 'pointer' : 'auto')
        .lower()
        .on('click', (event, d) => onEdgeClicked(d));

      // add nodes
      g.selectAll('circle')
        .data(nodes, (d) => d.id)
        .join('circle')
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
        .attr('r', NODE_RADIUS)
        .style('fill', (d) => nodeColor(d).primary)
        .style('cursor', selectable ? 'pointer' : 'auto')
        .on('click', (event, d) => onNodeClicked(d));

      const labels = [
        ...edgesConverted.map((d) => ({
          type: 'edge',
          data: d,
          text: d.name,
          x: d.labelX,
          y: d.labelY,
        })),
        ...nodes.map((d) => ({
          text: d.name,
          type: 'node',
          data: d,
          x: d.x,
          y: d.y,
        })),
      ];

      // add labels
      g.selectAll('text')
        .data(labels, (d) => d.text)
        .join('text')
        .attr('dx', (d) => d.x)
        .attr('dy', (d) => d.y + 6)
        .attr('font-size', 18)
        .attr('text-anchor', 'middle')
        .style('fill', (d) => {
          if (d.type === 'edge') {
            return edgeColor(d.data).secondary;
          }
          return nodeColor(d.data).secondary;
        })
        .text((d) => d.text);
    }
  },
  [
    graph,
    edges,
    nodes,
    width,
    height,
    onNodeClicked,
    onEdgeClicked,
    selectable,
    edgeColor,
    nodeColor,
    g,
    graphId,
  ]);

  return (
    <GraphStyle>
      <svg ref={graph} width={400} height={400} viewBox={`0 0 ${width} ${height}`}>
        <rect onClick={handleCanvasClicked} width={width} height={height} fill="#F1F1F1F1" />
        <defs>
          {edges.map((e, idx) => (
            <marker
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              id={`graphDirMarker-${graphId}-${e.id}`}
              viewBox="0 0 10 10"
              refX="1"
              refY="5"
              markerUnits="strokeWidth"
              orient="auto"
              markerWidth="4"
              markerHeight="3"
            >
              <polyline points="0,0 10,5 0,10 1,5" fill={edgeColor(e).secondary} />
            </marker>
          ))}
        </defs>
      </svg>
    </GraphStyle>
  );
};

Graph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  nodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    selected: PropTypes.bool,
  })).isRequired,
  edges: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    fromNodeId: PropTypes.string.isRequired,
    toNodeId: PropTypes.string.isRequired,
    selected: PropTypes.bool,
  })).isRequired,
  onNodeClicked: PropTypes.func.isRequired,
  onEdgeClicked: PropTypes.func.isRequired,
  onCanvasClicked: PropTypes.func.isRequired,
  edgeColor: PropTypes.func.isRequired,
  nodeColor: PropTypes.func.isRequired,
  selectable: PropTypes.bool,
};

Graph.defaultProps = {
  selectable: false,
};

export default Graph;
