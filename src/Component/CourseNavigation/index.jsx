import React from 'react';
import PropTypes from 'prop-types';
import CourseIcon from './CourseIcon';
import classes from './index.module.css';

const CourseNavigation = ({ pages, onGoToPage }) => {
  const pageIcons = [...pages].map((p) => (
    <CourseIcon
      pageId={p.pageId}
      type={p.type}
      status={p.status}
      seen={p.seen}
      active={p.active}
      onClick={onGoToPage}
    />
  ));

  return (
    <div className={classes.CourseNavigation}>
      {pageIcons}
    </div>
  );
};

CourseNavigation.propTypes = {
  pages: PropTypes.arrayOf(PropTypes.shape({
    pageId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string,
    seen: PropTypes.bool,
    active: PropTypes.bool,
  })).isRequired,
  onGoToPage: PropTypes.func.isRequired,
};

export default CourseNavigation;
