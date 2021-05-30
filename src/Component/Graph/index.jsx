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
  width, height, nodes, edges, onClicked,
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
      const thetaPrime = Math.atan2(NODE_RADIUS, mag);
      const magPrime = Math.sqrt(NODE_RADIUS * NODE_RADIUS + mag * mag);

      const midX = fromX + magPrime * Math.cos(theta + thetaPrime);
      const midY = fromY + magPrime * Math.sin(theta + thetaPrime);

      return ({
        fromX, fromY, midX, midY, toX, toY, theta,
      });
    };

    if (nodes && edges && graph.current) {
      const svg = d3.select(graph.current).append('g');

      const lineGenerator = d3.line()
        .x((d) => d.x)
        .y((d) => d.y)
        .curve(d3.curveBasis);

      // add edges
      svg.selectAll('path')
        .data(edges.map((e) => ({ ...e, ...getPos(e.from, e.to) })))
        .enter()
        .append('path')
        .attr('d', (d) => lineGenerator([{ x: d.fromX, y: d.fromY }, { x: d.midX, y: d.midY }, { x: d.toX, y: d.toY }]))
        .attr('marker-mid', 'url(#graphDirMarker)')
        .style('stroke', (d) => {
          if (d.selected) return '#1ABA00';
          return undefined;
        })
        .on('click', (d) => onClicked('edge', d))
        .append('path')
        .attr('d', 'M0,-5L10,0L0,5')
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
        .on('click', (d) => onClicked('node', d))
        .exit()
        .remove();

      // add node labels
      svg.selectAll('text')
        .data(nodes)
        .enter()
        .append('text')
        .attr('dx', (d) => d.x)
        .attr('dy', (d) => d.y + 6)
        .attr('font-size', 18)
        .attr('text-anchor', 'middle')
        .text((d) => d.id)
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
    onClicked,
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
          <polyline points="0,0 10,5 0,10 1,5" fill="#7efd6a" />
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
  onClicked: PropTypes.func.isRequired,
};

export default Graph;
