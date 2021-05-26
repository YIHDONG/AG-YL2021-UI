import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CourseIcon from '../CourseNavigation/CourseIcon';

const MultiChoiceProblem = ({ options, onSubmissionDataChange }) => {
  const [submissionData, setSubmissionData] = useState(options.reduce((acc, { id }) => {
    acc[id] = {
      active: false,
    };
    return acc;
  }, {}));

  const handleSelect = (id) => {
    const nextSubData = { ...submissionData };
    nextSubData[id].active = !nextSubData[id].active;
    setSubmissionData(nextSubData);
    const ids = Object.keys(nextSubData).filter((i) => nextSubData[i].active);
    onSubmissionDataChange({ ids });
  };

  return (
    <div>
      {options.map(({ id, content }) => (
        <div>
          <CourseIcon pageId={id} active={submissionData[id].active} type="practice" onClick={handleSelect} />
          <p>{content}</p>
        </div>
      ))}
    </div>
  );
};

MultiChoiceProblem.propTypes = {
  options: PropTypes.arrayOf({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  onSubmissionDataChange: PropTypes.func.isRequired,
};

export default MultiChoiceProblem;
