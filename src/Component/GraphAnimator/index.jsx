import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import GraphComponent from '../Graph';
import Graph from '../../graph/graph';
import Node from '../../graph/node';
import Edge from '../../graph/edge';
import constants from '../../constants';

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
    }, 2000);
    return () => clearInterval(interval);
  }, [frameIdx, frames, animationPlaying]);

  return (
    <div>
      <button onClick={() => setAnimationPlaying(true)} disabled={animationPlaying} type="button">play</button>
      <button onClick={() => setAnimationPlaying(false)} disabled={!animationPlaying} type="button">stop</button>
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
