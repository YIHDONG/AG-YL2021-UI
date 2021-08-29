import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { host } from '../../api';
import GraphCreator from '../GraphCreator';
import Graph from '../Graph';
import GraphAnimatorComponent from '../GraphAnimator';
import constants from '../../constants';

const SectionText = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: left;

  color: ${constants.color.textBasic};
`;

const SectionImg = styled.img`
  justify-content: center;
  align-items: center;
  border-radius: 10px 0 0 10px;
  background: #ffffff;
  max-width: 600px;
  display: block;
  margin: 6px auto;
`;

const SectionGraph = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionComponent = ({ type, content }) => {
  switch (type) {
    case 'image':
      return <SectionImg src={`${host}/${content}`} alt="logo" />;
    case 'text':
      return <SectionText>{content}</SectionText>;
    case 'graphCreator':
      return (
        <SectionGraph>
          <SectionText>{content}</SectionText>
          <GraphCreator
            width={400}
            height={400}
            onGraphChanged={() => {}}
          />
        </SectionGraph>
      );
    case 'graph':
      return (
        <SectionGraph>
          <Graph
            width={content.width}
            height={content.height}
            nodes={content.nodes}
            edges={content.edges}
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
        </SectionGraph>
      );
    case 'graphAnimation':
      return (
        <SectionGraph>
          <GraphAnimatorComponent
            initialGraph={content.initialGraph}
            events={content.events}
          />
        </SectionGraph>
      );
    default:
      throw new Error(`invalid section type ${type}`);
  }
};

SectionComponent.propTypes = {
  type: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  content: PropTypes.any.isRequired,
};

export default SectionComponent;
