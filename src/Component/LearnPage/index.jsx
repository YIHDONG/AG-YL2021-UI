import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PageSection from '../PageSection';

const LearningPage = styled.div`
  max-width: 800px;
  display: block;
  margin: auto;
`;

const LearningPageSection = styled.div`
  margin: 40px auto;
`;

const LearnComponent = ({ sections }) => (
  <LearningPage>
    {sections.map((section, idx) => (
      // this disabled because the sections are static and wont change
      // eslint-disable-next-line react/no-array-index-key
      <LearningPageSection key={idx}>
        <PageSection type={section.type} content={section.content} />
      </LearningPageSection>
    ))}
  </LearningPage>
);

LearnComponent.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
};

export default LearnComponent;
