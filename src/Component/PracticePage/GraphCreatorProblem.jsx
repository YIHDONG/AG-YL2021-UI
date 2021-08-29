import React from 'react';
import PropTypes from 'prop-types';
import GraphCreator from '../GraphCreator';

const GraphCreatorProblem = ({ onSubmissionDataChange }) => {
  const handleGraphChanged = ({ graph }) => {
    const nodes = graph.nodes.map((n) => n.name);
    const edges = graph.edges.map((e) => `(${e.fromNode.name}, ${e.toNode.name})`);
    onSubmissionDataChange({ type: 'graph', data: { nodes, edges } });
  };

  return (
    <GraphCreator width={400} height={400} onGraphChanged={handleGraphChanged} />
  );
};

GraphCreatorProblem.propTypes = {
  onSubmissionDataChange: PropTypes.func.isRequired,
};

export default GraphCreatorProblem;
