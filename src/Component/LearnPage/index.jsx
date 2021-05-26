import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LearningPageText = styled.p`
/* body */
font-family: Lato;
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 22px;
text-align: center;

/* text */
color: #2B1953;
`;

const LearningPageImg = styled.img`
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 10px 0 0 10px;
  background: #FFFFFF;
  width: 200 px;
  height: 200 px;
  max-height: 400px;
  max-width: 400px;
`;

const AnimationVideo = styled.iframe`
  position: relative;
  /* overflow: hidden;
  padding-top: 56.25%; */
`;

// const sectionNumber = 1;

function LearnComponent({ sections }) {
  const sectionRendering = (section) => {
    if (section.type === 'image') {
      return (
        <LearningPageImg src={section.content} alt="logo" />
      );
    }
    if (section.type === 'text') {
      return (
        <LearningPageText>{section.content}</LearningPageText>
      );
    }
    if (section.type === 'animation') {
      return (
        <div>
          <AnimationVideo
            src={section.content}
            title="Youtube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
      );
    }
    throw new Error('invalid section type!');
  };

  return (
    <div className="App">
      {sections.map((section) => sectionRendering(section))}
    </div>
  );
}

LearnComponent.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
};

export default LearnComponent;
