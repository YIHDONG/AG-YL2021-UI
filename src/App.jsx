/* eslint-disable no-nested-ternary */
/* import React, { useState } from 'react';
import api from './api';
import logo from './logo.svg';
import './App.css';

function App() {
  const [courses, setCoursesList] = useState('No courses yet!');
  const [loading, setLoading] = useState(false);

  const getCoursesList = () => {
    setLoading(true);
    api.getAllCourses()
      .then((res) => {
        setCoursesList(res);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}
          and save to reload.
        </p>
        <button
          disabled={loading}
          type="button"
          onClick={() => getCoursesList()}
        >
          Get Courses
        </button>
        <p>{JSON.stringify(courses)}</p>
      </header>
    </div>
  );
}

export default App; */
/*
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Check from '@material-ui/icons/Check';
// import StepLabel from '@material-ui/core/StepLabel';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const differentStatusStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: '100%',
    backgroundColor: 'currentColor',
  },
  activeStep: {
    color: '#6495ed',
  },
  completed: {
    zIndex: 1,
    fontSize: 18,
    color: '#6495ed',
  },
  wrong: {
    width: 22,
    height: 22,
    borderRadius: '100%',
    color: '#f08080',
  },
  correct: {
    width: 22,
    height: 22,
    borderRadius: '100%',
    color: '#bcee68',
  },
});

function differentStatus(props) {
  const classes = differentStatusStyles();
  const {
    activeStep, wrong, correct, completed,
  } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.activeStep]: activeStep,
        [classes.wrong]: wrong,
        [classes.correct]: correct,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

differentStatus.propTypes = {
  activeStep: PropTypes.bool,
  completed: PropTypes.bool,
  wrong: PropTypes.bool,
  correct: PropTypes.bool,
};

function getSteps() {
  return ['question 1', 'question 2', 'question 3', 'question 4', 'question 5', 'question 6'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'This is the optional demonstration for step 1.';
    case 1:
      return 'This is the optional demonstration for step 2.';
    case 2:
      return 'This is the optional demonstration for step 3.';
    case 3:
      return 'This is the optional demonstration for step 4.';
    case 4:
      return 'This is the optional demonstration for step 5.';
    case 5:
      return 'This is the optional demonstration for step 6.';
    default:
      return 'Unknown step';
  }
}

function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [wrong, setWrong] = React.useState({});
  const [correct, setCorrect] = React.useState({});
  const steps = getSteps();

  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length + Object.keys(wrong).length
   + Object.keys(correct).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep = isLastStep() && !allStepsCompleted()
      ? steps.findIndex((step, i) => (i in completed)) : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleWrong = () => {
    const newWrong = wrong;
    newWrong[activeStep] = true;
    setWrong(newWrong);
    handleNext();
  };

  const handleCorrect = () => {
    const newCorrect = correct;
    newCorrect[activeStep] = true;
    setCorrect(newCorrect);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setWrong({});
    setCorrect({});
  };

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={handleStep(index)} completed={completed[index]}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Next
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleWrong}
                className={classes.button}
              >
                Wrong
              </Button>
              <Button
                varient="contained"
                color="primary"
                onClick={handleCorrect}
                className={classes.button}
              >
                Correct
              </Button>
              {activeStep !== steps.length
                && (completed[activeStep] ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step
                    {' '}
                    {activeStep + 1}
                    {' '}
                    already completed
                  </Typography>
                ) : (
                  <Button variant="contained" color="primary" onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                  </Button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
*/
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#3498DB',
  },
  wrong: {
    color: '#FF5733',
  },
  correct: {
    color: '#58D68D',
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#3498DB',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const {
    active, completed, wrong, correct,
  } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.wrong]: wrong,
        [classes.correct]: correct,
        [classes.completed]: completed,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : wrong ? (
        <div className={classes.wrong} />
      ) : correct ? (
        <div className={classes.correct} />
      ) : (<Check className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  // eslint-disable-next-line react/require-default-props
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  // eslint-disable-next-line react/require-default-props
  completed: PropTypes.bool,
  /**
   * Mark the question is answered correctly
   */
  // eslint-disable-next-line react/require-default-props
  correct: PropTypes.bool,
  /**
   * Mark the question is answered wrongly
   */
  // eslint-disable-next-line react/require-default-props
  wrong: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['question 1', 'question 2', 'question 3', 'question 4', 'question 5', 'question 6'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'This is an optional description for question 1';
    case 1:
      return 'This is an optional description for question 2';
    case 2:
      return 'This is an optional description for question 3';
    case 3:
      return 'This is an optional description for question 4';
    case 4:
      return 'This is an optional description for question 5';
    case 5:
      return 'This is an optional description for question 6';
    default:
      return 'Unknown step';
  }
}

function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [correct, setCorrect] = React.useState({});
  const [wrong, setWrong] = React.useState({});
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setWrong({});
    setCorrect({});
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleWrong = () => {
    const newWrong = wrong;
    newWrong[activeStep] = true;
    setWrong(newWrong);
    handleNext();
  };

  const handleCorrect = () => {
    const newCorrect = correct;
    newCorrect[activeStep] = true;
    setCorrect(newCorrect);
    handleNext();
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleWrong}
                    className={classes.button}
                  >
                    Wrong
                  </Button>
                  <Button
                    varient="contained"
                    color="primary"
                    onClick={handleCorrect}
                    className={classes.button}
                  >
                    Correct
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleComplete}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
}
export default App;
