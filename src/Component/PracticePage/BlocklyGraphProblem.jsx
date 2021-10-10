import React from 'react';
import PropTypes from 'prop-types';

import BlocklyRunner from '../Blockly';

const BlocklyGraphProblem = ({ initialGraph, blocks, onSubmissionDataChange }) => (
  <BlocklyRunner
    initialVars={{
      graph: {
        type: 'graph',
        value: initialGraph,
      },
      sourceNodeId: {
        type: 'simple',
        value: initialGraph.sourceNodeId,
      },
    }}
    blocks={blocks}
    onCodeGenerated={(code) => onSubmissionDataChange({ type: 'code', data: { code } })}
    displayInModal
    output={{
      name: 'graph',
      type: 'graphAnimation',
    }}
  />
);

BlocklyGraphProblem.propTypes = {
  onSubmissionDataChange: PropTypes.func.isRequired,
  initialGraph: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    sourceNodeId: PropTypes.string,
    nodes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })),
    edges: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      fromNodeId: PropTypes.string.isRequired,
      toNodeId: PropTypes.string.isRequired,
    })),
  }).isRequired,
  blocks: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default BlocklyGraphProblem;
