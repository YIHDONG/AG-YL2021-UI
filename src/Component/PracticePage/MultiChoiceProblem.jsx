import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './MultiChoiceProblem.module.css';

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
    onSubmissionDataChange({ type: 'multichoice', data: { ids } });
  };

  return (
    <div className={`container ${classes.Choices}`}>
      {options.map(({ id, content }) => (
        <div key={id} className="row align-items-center">
          <div className="col-1">
            <CourseIcon pageId={id} active={submissionData[id].active} type="practice" onClick={handleSelect} />
          </div>
          <div className={`col-11 ${classes.Question}`}>
            {content}
          </div>
        </div>
      ))}
    </div>
  );
};

MultiChoiceProblem.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  onSubmissionDataChange: PropTypes.func.isRequired,
};

export default MultiChoiceProblem;
