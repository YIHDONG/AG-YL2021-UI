import React from 'react';
import PropTypes from 'prop-types';
import classes from './index.module.css';

export default function Heading({
  status, pageTitle, onGoToPage, nextPageId, previousPageId,
}) {
  const changeColor = () => {
    if (status === 'correct') {
      return '#91f39a';
    }
    if (status === 'incorrect') {
      return 'rgb(245, 178, 178)';
    }
    return '#B3DAFF';
  };
  Heading.propTypes = {
    status: PropTypes.string,
    nextPageId: PropTypes.string,
    previousPageId: PropTypes.string,
    onGoToPage: PropTypes.func.isRequired,
    pageTitle: PropTypes.string.isRequired,
  };

  Heading.defaultProps = {
    status: 'default',
    nextPageId: null,
    previousPageId: null,
  };

  return (
    <div className={classes.Heading}>
      <button type="button" className={classes.Rectangle} style={{ backgroundColor: changeColor() }}>{pageTitle}</button>
      {nextPageId && <button type="button" onClick={() => onGoToPage(nextPageId)} className={classes.VectorForward} style={{ display: nextPageId }}>up</button>}
      {previousPageId && <button type="button" onClick={() => onGoToPage(previousPageId)} className={classes.VectorBack} style={{ display: previousPageId }}>back</button>}
    </div>
  );
}
