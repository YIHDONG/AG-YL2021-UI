import React, { useRef, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import styled from 'styled-components';
import * as d3 from 'd3';

const NODE_RADIUS = 20;

const GraphStyle = styled.svg`

  circle {
    fill: #fd7aff;
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
  }

  path:hover {
    stroke: #1ABA00;
  }
`;

const Graph = ({
  width, height, nodes, edges, onNodeClicked, onEdgeClicked,
}) => {
  const graph = useRef(null);
  // const [nodeSelections, setNodeSelections] = useState([]);
  // const [edgeSelections, setEdgeSelections] = useState([]);

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
      const svg = d3.select(graph.current).append('g');

      const lineGenerator = d3.line()
        .x((d) => d.x)
        .y((d) => d.y)
        .curve(d3.curveCardinal);

      const edgesConverted = edges.map((e) => ({ ...e, ...getPos(e.from, e.to) }));
      // add edges
      svg.selectAll('path')
        .data(edgesConverted)
        .enter()
        .append('path')
        .attr('d', (d) => lineGenerator([{ x: d.fromX, y: d.fromY }, { x: d.midX, y: d.midY }, { x: d.toX, y: d.toY }]))
        .attr('marker-mid', 'url(#graphDirMarker)')
        .style('stroke', (d) => {
          if (d.selected) return '#1ABA00';
          return undefined;
        })
        .on('click', (event, d) => onEdgeClicked(d))
        .exit()
        .remove();

      // add nodes
      svg.selectAll('circle')
        .data(nodes)
        .enter()
        .append('circle')
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
        .attr('r', NODE_RADIUS)
        .style('fill', (d) => {
          if (d.selected) return '#C900CD';
          return undefined;
        })
        .on('click', (event, d) => onNodeClicked(d))
        .exit()
        .remove();

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
      svg.selectAll('text')
        .data(labels)
        .enter()
        .append('text')
        .attr('dx', (d) => d.x)
        .attr('dy', (d) => d.y + 6)
        .attr('font-size', 18)
        .attr('text-anchor', 'middle')
        .style('fill', (d) => d.fill)
        .text((d) => d.text)
        .exit()
        .remove();
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
  ]);

  return (
    <GraphStyle ref={graph} width={width} height={height}>
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
};

export default Graph;
