import React, { useState } from 'react';
import PropTypes from 'prop-types';

import api from '../../api';
import helpLogo from '../../assets/images/questionmark.png';
import classes from './index.module.css';
import MultiChoiceProblem from './MultiChoiceProblem';

const PracticePage = ({
  type, question, data, hints,
}) => {
  const [submissionData, setSubmissionData] = useState({});
  const [result, setResult] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  const submit = async () => {
    try {
      setSubmitting(true);
      const submission = await api.createPageSubmission(submissionData);
      setResult(submission);
    } catch (e) {
      console.log('woops');
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmissionChange = (d) => {
    setSubmissionData(d);
  };

  const showHint = () => {
    setHintVisible(true);
  };

  let problemJsx;
  switch (type) {
    case 'multichoice':
      problemJsx = (
        <MultiChoiceProblem
          onSubmissionDataChange={onSubmissionChange}
          options={data.options}
        />
      );
      break;
    default:
      throw new Error('no component type for problem type');
  }

  return (
    <div className={classes.ProblemPage}>
      {hintVisible && (<div>{JSON.stringify(hints)}</div>)}
      {submitting && (<div>Im submitting</div>)}
      {result && (<div>{JSON.stringify(result)}</div>)}
      <div className={classes.LeftContent}>
        {problemJsx}
      </div>
      <div className={classes.RightContent}>
        <div className={classes.Top1}>
          <div className="arrow">
            <em />
            <span />
            <img src={helpLogo} alt="helpLogo" />
          </div>
          <div>
            {question}
          </div>
        </div>
        <div className="top-2">
          <button type="button" className={classes.HintButton} onClick={showHint}>
            Hint
          </button>
          <button type="button" className={classes.SubmitButton} onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

PracticePage.propTypes = {
  type: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  data: PropTypes.oneOf([
    PropTypes.shape({
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          content: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }),
  ]).isRequired,
  hints: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PracticePage;
