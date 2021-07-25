import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { host } from '../../api';

const LearningPage = styled.div`
  max-width: 800px;
  display: block;
  margin: auto;
`;

const LearningPageSection = styled.div`
  margin: 40px auto;
`;

const LearningPageText = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: left;

  color: #2B1953;
`;

const LearningPageImg = styled.img`
  justify-content: center;
  align-items: center;
  border-radius: 10px 0 0 10px;
  background: #FFFFFF;
  max-width: 600px;
  display: block;
  margin: 6px auto;
`;

const AnimationVideo = styled.iframe`
  position: relative;
`;

const LearnComponent = ({ sections }) => {
  const sectionRendering = (section) => {
    if (section.type === 'image') {
      return <LearningPageImg src={`${host}/${section.content}`} alt="logo" />;
    }
    if (section.type === 'text') {
      return <LearningPageText>{section.content}</LearningPageText>;
    }
    if (section.type === 'animation') {
      return (
        <AnimationVideo
          src={section.content}
          title="Youtube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      );
    }
    throw new Error('invalid section type!');
  };

  return (
    <LearningPage>
      {sections.map((section, idx) => (
        // this disabled because the sections are static and wont change
        // eslint-disable-next-line react/no-array-index-key
        <LearningPageSection key={idx}>
          {sectionRendering(section)}
        </LearningPageSection>
      ))}
    </LearningPage>
  );
};

LearnComponent.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
};

export default LearnComponent;
