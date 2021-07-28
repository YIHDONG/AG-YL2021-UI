import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { host } from '../../api';
import GraphCreator from '../GraphCreator';
import Graph from '../Graph';

const SectionText = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: left;

  color: #2B1953;
`;

const SectionImg = styled.img`
  justify-content: center;
  align-items: center;
  border-radius: 10px 0 0 10px;
  background: #FFFFFF;
  max-width: 600px;
  display: block;
  margin: 6px auto;
`;

const SectionComponent = ({ type, content }) => {
  switch (type) {
    case 'image':
      return <SectionImg src={`${host}/${content}`} alt="logo" />;
    case 'text':
      return <SectionText>{content}</SectionText>;
    case 'graphCreator':
      return (
        <div>
          <SectionText>{content}</SectionText>
          <GraphCreator width={400} height={400} onGraphChanged={() => {}} />
        </div>
      );
    case 'graph':
      return (
        <Graph
          width={content.width}
          height={content.height}
          nodes={content.nodes}
          edges={content.edges}
          onNodeClicked={(d) => console.log(d)}
          onEdgeClicked={(d) => console.log(d)}
          onCanvasClicked={(d) => console.log(d)}
        />
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
