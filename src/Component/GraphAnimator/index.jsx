import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GraphComponent from '../Graph';
import Graph from '../../graph/graph';
import Node from '../../graph/node';
import Edge from '../../graph/edge';
import constants from '../../constants';
import ButtonQuiet from '../Buttons/ButtonQuiet';

const GraphAnimatorComponent = ({ initialGraph, events }) => {
  const buildInitialGraph = (graphData) => {
    const g = new Graph();
    const nodes = graphData.nodes.map((n) => {
      const node = new Node(n.name, n.x, n.y, g);
      node.id = n.id;
      return node;
    });
    g.nodes = nodes;

    const edges = graphData.edges.map((e) => {
      const fromNode = nodes.find((n) => n.id === e.fromNodeId);
      const toNode = nodes.find((n) => n.id === e.toNodeId);
      const edge = new Edge(fromNode, toNode, 1, e.name);
      edge.id = e.id;
      edge.fromNodeId = fromNode.id;
      edge.toNodeId = toNode.id;
      fromNode.edges.push(edge);
      toNode.edges.push(edge);
      return edge;
    });
    g.edges = edges;
    return g;
  };

  const buildFrames = (graphData, eventData) => {
    const frames = [buildInitialGraph(graphData)];
    for (let i = 0; i < eventData.length; i += 1) {
      const frame = buildInitialGraph(graphData);
      for (let j = 0; j <= i; j += 1) {
        frame.apply(eventData[j]);
      }
      frames.push(frame);
    }
    return frames;
  };

  const [frames] = useState(buildFrames(initialGraph, events));
  const [frameIdx, setFrameIdx] = useState(0);
  const [animationPlaying, setAnimationPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!animationPlaying) return;
      setFrameIdx((f) => (f + 1) % frames.length);
    }, 900);
    return () => clearInterval(interval);
  }, [frameIdx, frames, animationPlaying]);

  return (
    <div>
      {!animationPlaying && (
      <ButtonQuiet onClick={() => setAnimationPlaying(true)} disabled={animationPlaying}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.2625 5.86959L2.2625 0.179585C1.36875 -0.282506 0 0.165914 0 1.30884V12.6861C0 13.7115 1.27188 14.3294 2.2625 13.8154L13.2625 8.12809C14.2437 7.62225 14.2469 6.37543 13.2625 5.86959Z" fill="white" />
        </svg>
      </ButtonQuiet>
      )}
      {animationPlaying && (
      <ButtonQuiet onClick={() => setAnimationPlaying(false)} disabled={!animationPlaying}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 3H5C4.73478 3 4.48043 3.10536 4.29289 3.29289C4.10536 3.48043 4 3.73478 4 4V12C4 12.2652 4.10536 12.5196 4.29289 12.7071C4.48043 12.8946 4.73478 13 5 13H6C6.26522 13 6.51957 12.8946 6.70711 12.7071C6.89464 12.5196 7 12.2652 7 12V4C7 3.73478 6.89464 3.48043 6.70711 3.29289C6.51957 3.10536 6.26522 3 6 3V3Z" fill="white" />
          <path d="M11 3H10C9.73478 3 9.48043 3.10536 9.29289 3.29289C9.10536 3.48043 9 3.73478 9 4V12C9 12.2652 9.10536 12.5196 9.29289 12.7071C9.48043 12.8946 9.73478 13 10 13H11C11.2652 13 11.5196 12.8946 11.7071 12.7071C11.8946 12.5196 12 12.2652 12 12V4C12 3.73478 11.8946 3.48043 11.7071 3.29289C11.5196 3.10536 11.2652 3 11 3V3Z" fill="white" />
        </svg>
      </ButtonQuiet>
      )}
      <GraphComponent
        width={initialGraph.width}
        height={initialGraph.height}
        nodes={frames[frameIdx].nodes}
        edges={frames[frameIdx].edges}
        onCanvasClicked={() => {}}
        onEdgeClicked={() => {}}
        onNodeClicked={() => {}}
        edgeColor={(d) => ({
          primary: d.traversed ? constants.color.graphAccentBlue : constants.color.edgeGreen,
          secondary: (d.traversed ? constants.color.graphAccentBlue
            : constants.color.edgeAccentGreen),
        })}
        nodeColor={(d) => ({
          primary: d.visited ? constants.color.graphAccentBlue : constants.color.nodePink,
          secondary: '#FFFFFF',
        })}
      />
    </div>
  );
};

GraphAnimatorComponent.propTypes = {
  initialGraph: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({

  })).isRequired,
};

export default GraphAnimatorComponent;
