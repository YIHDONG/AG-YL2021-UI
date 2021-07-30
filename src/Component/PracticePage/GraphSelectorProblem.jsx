import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Graph from '../Graph';

const GraphSelectorProblem = ({
  width, height, nodes, edges, onSubmissionDataChange,
}) => {
  const [nodesSelected, setNodesSelected] = useState([...nodes]);
  const [edgesSelected, setEdgesSelected] = useState([...edges]);

  const sendSubmissionData = (nodeData, edgeData) => {
    const selectedNodeIds = nodeData.filter((n) => n.selected).map((n) => n.id);
    const selectedEdgeIds = edgeData.filter((n) => n.selected).map((n) => n.id);
    onSubmissionDataChange({ type: 'graph', data: { nodes: selectedNodeIds, edges: selectedEdgeIds } });
  };

  const handleNodeClicked = ({ id }) => {
    const newSelected = nodesSelected.map((n) => {
      if (n.id === id) {
        return { ...n, selected: !n.selected };
      }
      return n;
    });

    setNodesSelected(newSelected);
    sendSubmissionData(newSelected, edgesSelected);
  };

  const handleEdgeClicked = ({ id }) => {
    const newSelected = edgesSelected.map((n) => {
      if (n.id === id) {
        return { ...n, selected: !n.selected };
      }
      return n;
    });

    setEdgesSelected(newSelected);
    sendSubmissionData(nodesSelected, newSelected);
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
    />
  );
};

GraphSelectorProblem.propTypes = {
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

export default GraphSelectorProblem;
