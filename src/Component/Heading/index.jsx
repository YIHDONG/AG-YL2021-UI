import React from 'react';
import PropTypes from 'prop-types';

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
    <div className="Heading">
      <button data-testid="title" type="button" className="Rectangle" style={{ backgroundColor: changeColor() }}>{pageTitle}</button>
      <button data-testid="forwardButton" type="button" onClick={() => onGoToPage(nextPageId)} className="Vector-forward" style={{ display: (nextPageId == null) ? 'none' : 'block' }}>up</button>
      <button data-testid="backButton" type="button" onClick={() => onGoToPage(previousPageId)} className="Vector-back" style={{ display: (previousPageId == null) ? 'none' : 'block' }}>back</button>
    </div>
  );
}
