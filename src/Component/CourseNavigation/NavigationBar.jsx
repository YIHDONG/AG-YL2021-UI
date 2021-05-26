import React from 'react';
import PropTypes from 'prop-types';
import classes from './NavigationBar.module.css';

const NavigationBar = ({ pageNumber }) => {
  const dynamicHeight = `${30 * pageNumber}px`;

  NavigationBar.propTypes = {
    pageNumber: PropTypes.string.isRequired,
  };

  return (
    <div className={classes.NavigationBar} style={{ height: dynamicHeight }}> </div>
  );
};

export default NavigationBar;
