import React from 'react';
import PropTypes from 'prop-types';

export default function Heading(props) {
  // const handleForward = () => {
  //   this.props.history.goForward()
  //   }
  //   const handleBack =()=>{
  //       this.props.history.goBack()
  //   }
  const { submit, result } = props;
  const changeColor = () => {
    if (submit && result) {
      return '#91f39a';
    }
    if (submit && !result) {
      return 'rgb(245, 178, 178)';
    }
    return '#B3DAFF';
  };
  Heading.propTypes = {
    submit: PropTypes.bool,
    result: PropTypes.bool,
  };

  Heading.defaultProps = {
    submit: false,
    result: false,
  };

  return (
    <div className="Heading">
      <button type="button" className="Rectangle" style={{ backgroundColor: changeColor() }}>Dijkstras Algorithm</button>
      <button type="button" className="Vector-forward">up</button>
      <button type="button" className="Vector-back">back</button>
    </div>
  );
}
