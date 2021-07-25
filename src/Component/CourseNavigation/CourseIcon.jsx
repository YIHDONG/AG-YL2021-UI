import React from 'react';
import PropTypes from 'prop-types';
import classes from './CourseIcon.module.css';

const CourseIcon = ({
  pageId, type, status, seen, active, onClick,
}) => {
  const c = [classes.CourseIcon];
  if (type === 'learn') {
    c.push(classes.LearnIcon);
  } else {
    c.push(classes.PracticeIcon);
  }

  if (seen) {
    if (active) {
      switch (status) {
        case 'incorrect': c.push(classes.IncorrectActive);
          break;
        case 'correct': c.push(classes.CorrectActive);
          break;
        default: c.push(classes.DefaultActive);
      }
    } else {
      switch (status) {
        case 'incorrect': c.push(classes.Incorrect);
          break;
        case 'correct': c.push(classes.Correct);
          break;
        default: c.push(classes.Default);
      }
    }
  } else if (active) {
    c.push(classes.CourseIconActive);
  }

  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <div className={c.join(' ')} onKeyUp={() => onClick(pageId)} onClick={() => onClick(pageId)} role="button" tabIndex="0" />
  );
};

CourseIcon.propTypes = {
  pageId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  status: PropTypes.string,
  seen: PropTypes.bool,
  active: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

CourseIcon.defaultProps = {
  status: null,
  seen: false,
  active: false,
};

export default CourseIcon;
