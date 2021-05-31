import React, { useRef, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import * as d3 from 'd3';

const NODE_RADIUS = 20;

const GraphStyle = styled.svg`

  background:white;
  border: 6px solid black;
  box-shadow: 4px 4px 0px black;
  border-radius: 10px;

  circle {
    fill: #fd7aff;
    cursor: pointer;
  }

  circle:hover {
    fill: #C900CD;
  }

  text {
    font-family: 'Lato', sans-serif;
    fill: #FFFFFF;
    user-select: none;
    pointer-events: none;
  }

  path {
    stroke: #7efd6a;
    fill: none;
    stroke-width: 4;
    cursor: pointer;
  }

  path:hover {
    stroke: #1ABA00;
  }
`;

const Graph = ({
  width, height, nodes, edges, onNodeClicked, onEdgeClicked, onCanvasClicked,
}) => {
  const graph = useRef(null);
  const [g, setG] = useState(null);

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

      const edgesConverted = edges.map((e) => ({ ...e, ...getPos(e.from, e.to) }));
      // add edges
      g.selectAll('path')
        .data(edgesConverted, (d) => `(${d.from}, ${d.to})`)
        .join('path')
        .attr('d', (d) => lineGenerator([{ x: d.fromX, y: d.fromY }, { x: d.midX, y: d.midY }, { x: d.toX, y: d.toY }]))
        .attr('marker-mid', 'url(#graphDirMarker)')
        .style('stroke', (d) => {
          if (d.selected) return '#1ABA00';
          return undefined;
        })
        .lower()
        .on('click', (event, d) => onEdgeClicked(d));

      // add nodes
      g.selectAll('circle')
        .data(nodes, (d) => d.id)
        .join('circle')
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
        .attr('r', NODE_RADIUS)
        .style('fill', (d) => {
          if (d.selected) return '#C900CD';
          return undefined;
        })
        .on('click', (event, d) => onNodeClicked(d));

      const labels = [
        ...edgesConverted.map((d) => ({
          text: `(${d.from}, ${d.to})`,
          x: d.labelX,
          y: d.labelY,
          fill: '#1ABA00',
        })),
        ...nodes.map((d) => ({
          text: d.id,
          x: d.x,
          y: d.y,
          fill: '#FFFFFF',
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
        .style('fill', (d) => d.fill)
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
    g,
  ]);

  return (
    <div>
      <GraphStyle ref={graph} width={width} height={height}>
        <rect onClick={handleCanvasClicked} width={width} height={height} fill="#F1F1F1F1" />
        <defs>
          <marker
            id="graphDirMarker"
            viewBox="0 0 10 10"
            refX="1"
            refY="5"
            markerUnits="strokeWidth"
            orient="auto"
            markerWidth="4"
            markerHeight="3"
          >
            <polyline points="0,0 10,5 0,10 1,5" fill="#1ABA00" />
          </marker>
        </defs>
      </GraphStyle>
    </div>
  );
};

Graph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  nodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
  })).isRequired,
  edges: PropTypes.arrayOf(PropTypes.shape({
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
  })).isRequired,
  onNodeClicked: PropTypes.func.isRequired,
  onEdgeClicked: PropTypes.func.isRequired,
  onCanvasClicked: PropTypes.func.isRequired,
};

export default Graph;
