import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { api } from '../../api';
import classes from './index.module.css';
import MultiChoiceProblem from './MultiChoiceProblem';
import Modal from '../Modal';
import GraphCreatorProblem from './GraphCreatorProblem';
import GraphSelectorProblem from './GraphSelectorProblem';
import ButtonLoud from '../Buttons/ButtonLoud';
import ButtonQuiet from '../Buttons/ButtonQuiet';
import BlocklyProblem from './BlocklyProblem';
import PageSection from '../PageSection';

const ModalContainer = styled.div`
  position: absolute;
  z-index: 100;
`;

const PracticePage = ({
  type, question, data, hints, pageId, onResults, sections,
}) => {
  const [canSubmit, setCanSubmit] = useState(false);
  const [submissionData, setSubmissionData] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [result, setResult] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [error, setError] = useState(null);

  const submit = async () => {
    try {
      setSubmitting(true);
      const body = { submission: submissionData };
      const submission = await api.createPageSubmission(pageId, body);
      setResult(submission);
      setShowFeedback(true);
      onResults({ status: (submission.status === 'pass' ? 'correct' : 'incorrect'), pageId });
    } catch (e) {
      setError((e && e.body.message && e.body.reason) || (e && e.body.message && e.body.message) || (e && e.statusText) || 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmissionChange = (d) => {
    setSubmissionData(d);
    setCanSubmit(true);
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
    case 'graphCreator':
      problemJsx = (
        <GraphCreatorProblem
          onSubmissionDataChange={onSubmissionChange}
          options={data.options}
        />
      );
      break;
    case 'graphSelector':
      problemJsx = (
        <GraphSelectorProblem
          onSubmissionDataChange={onSubmissionChange}
          width={data.width}
          height={data.height}
          nodes={data.nodes}
          edges={data.edges}
        />
      );
      break;
    case 'graphBlockly':
      problemJsx = (
        <BlocklyProblem
          initialGraph={data.initialGraph}
          blocks={data.blocks}
          onSubmissionDataChange={onSubmissionChange}
        />
      );
      break;
    default:
      throw new Error(`no component for problem type ${type}`);
  }

  return (
    <div className={classes.ProblemPage}>
      <div className={classes.LeftContent}>
        {problemJsx}
      </div>
      <div className={classes.RightContent}>
        <div className={classes.PromptBox}>
          <div className="arrow">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55Z" stroke="white" strokeWidth="5" />
              <path d="M25 21.21C26.25 18.735 27.5 17.5 30 17.5C33.115 17.5 35 19.9725 35 22.445C35 24.9175 33.75 26.1525 30 28.6275V32.5M30 41.25V42.5" stroke="white" strokeWidth="5" strokeLinecap="round" />
            </svg>
          </div>
          <div className={classes.Question}>
            {question}
          </div>
          {sections.map((s, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={idx}>
              <PageSection type={s.type} content={s.content} />
            </div>
          ))}
        </div>
        <div className={classes.ButtonPanel}>
          <ButtonQuiet onClick={() => setHintVisible(true)}>
            Hint
          </ButtonQuiet>
          <ButtonLoud disabled={!canSubmit || submitting} onClick={submit}>
            Submit
          </ButtonLoud>
        </div>
      </div>
      <ModalContainer>
        <Modal showModal={hintVisible} title="Hint" closeModal={() => setHintVisible(false)}>
          {hints[0]}
        </Modal>
        <Modal showModal={error !== null} title="Woops!!" status="incorrect" closeModal={() => setError(null)}>
          {`Woops, sorry!!! We tried to submit your solution but we ran into an error, this is probably just temporary so please try to submit again in minute. Error was: ${error}`}
        </Modal>
        <Modal
          showModal={showFeedback}
          status={result && result.status === 'pass' ? 'correct' : 'incorrect'}
          title={result && result.status === 'pass' ? 'Correct, nice work!' : 'Not quite right...'}
          closeModal={() => setShowFeedback(false)}
        >
          {result.feedback}
        </Modal>
      </ModalContainer>
    </div>
  );
};

PracticePage.propTypes = {
  type: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  hints: PropTypes.arrayOf(PropTypes.string).isRequired,
  pageId: PropTypes.string.isRequired,
  onResults: PropTypes.func.isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    content: PropTypes.any.isRequired,
  })).isRequired,
};

export default PracticePage;
