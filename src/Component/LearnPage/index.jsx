import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { host } from '../../api';

const LearningPage = styled.div`
  max-width: 800px;
  display: block;
  margin: auto
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

// const sectionNumber = 1;

function LearnComponent({ sections }) {
  const sectionRendering = (section) => {
    if (section.type === 'image') {
      return (
        <LearningPageSection>
          <LearningPageImg src={`${host}/${section.content}`} alt="logo" />
        </LearningPageSection>
      );
    }
    if (section.type === 'text') {
      return (
        <LearningPageSection>
          <LearningPageText>{section.content}</LearningPageText>
        </LearningPageSection>
      );
    }
    if (section.type === 'animation') {
      return (
        <LearningPageSection>
          <AnimationVideo
            src={section.content}
            title="Youtube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </LearningPageSection>
      );
    }
    throw new Error('invalid section type!');
  };

  return (
    <LearningPage>
      {sections.map((section) => sectionRendering(section))}
    </LearningPage>
  );
}

LearnComponent.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
};

export default LearnComponent;
