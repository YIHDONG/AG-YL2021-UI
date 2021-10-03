import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Graph from '../Graph';
import constants from '../../constants';

const DijkstraProblem = ({
  width, height, nodes, edges, onSubmissionDataChange,
}) => {
  const [nodesSelected, setNodesSelected] = useState([...nodes]);
  const [edgesSelected, setEdgesSelected] = useState([...edges]);
  const [newSelectedNodeIds, setNewSelectedNodeIds] = useState([]);
  const [newSelectedEdgesIds, setNewSelectedEdgesIds] = useState([]);

  useEffect(() => {
    setNodesSelected(nodes);
  }, [nodes]);

  useEffect(() => {
    setEdgesSelected(edges);
  }, [edges]);

  const handleNodeClicked = ({ id }) => {
    const newSelected = nodesSelected.map((n) => {
      if (n.id === id) {
        return { ...n, selected: !n.selected };
      }
      return n;
    });

    setNodesSelected(newSelected);
    if (!newSelectedNodeIds.includes(id)) {
      newSelectedNodeIds.push(id);
    } else {
      newSelectedNodeIds.splice(newSelectedNodeIds.indexOf(id), 1);
    }
    setNewSelectedNodeIds(newSelectedNodeIds);
    // eslint-disable-next-line no-console
    console.log(newSelectedNodeIds);
    onSubmissionDataChange({ type: 'graph', data: { nodes: newSelectedNodeIds, edges: newSelectedEdgesIds } });
    // sendSubmissionData(newSelected, edgesSelected);
  };

  const handleEdgeClicked = ({ id }) => {
    const newSelected = edgesSelected.map((n) => {
      if (n.id === id) {
        return { ...n, selected: !n.selected };
      }
      return n;
    });

    setEdgesSelected(newSelected);
    if (!newSelectedEdgesIds.includes(id)) {
      newSelectedEdgesIds.push(id);
    } else {
      newSelectedEdgesIds.splice(newSelectedEdgesIds.indexOf(id), 1);
    }
    setNewSelectedEdgesIds(newSelectedEdgesIds);
    onSubmissionDataChange({ type: 'graph', data: { nodes: newSelectedNodeIds, edges: newSelectedEdgesIds } });
  };

  return (
    <Graph
      width={width}
      height={height}
      nodes={nodesSelected}
      edges={edgesSelected}
      onCanvasClicked={() => {}}
      onNodeClicked={handleNodeClicked}
      onEdgeClicked={handleEdgeClicked}
      selectable
      edgeColor={(d) => ({
        primary: (d.selected ? constants.color.graphAccentBlue : constants.color.edgeGreen),
        secondary: (d.selected ? constants.color.graphAccentBlue : constants.color.edgeAccentGreen),
      })}
      nodeColor={(d) => ({
        primary: (d.selected ? constants.color.graphAccentBlue : constants.color.nodePink),
        secondary: '#FFFFFF',
      })}
    />
  );
};

DijkstraProblem.propTypes = {
  onSubmissionDataChange: PropTypes.func.isRequired,
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
};

export default DijkstraProblem;
