import React from 'react';
import { PropTypes } from 'prop-types';

import Graph from '.';
import constants from '../../constants';

const StaticGraphGraphic = ({
  width, height, nodes, edges,
}) => (
  <Graph
    width={width}
    height={height}
    nodes={nodes}
    edges={edges}
    onNodeClicked={() => {}}
    onEdgeClicked={() => {}}
    onCanvasClicked={() => {}}
    edgeColor={() => ({
      primary: constants.color.edgeGreen,
      secondary: constants.color.edgeAccentGreen,
    })}
    nodeColor={() => ({
      primary: constants.color.nodePink,
      secondary: '#FFFFFF',
    })}
  />
);

StaticGraphGraphic.propTypes = {
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

export default StaticGraphGraphic;
