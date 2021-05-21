import React from 'react';
import PropTypes from 'prop-types';
import api from 'algorithms_api';

export default function Heading(props) {
  const [prePage, setPrePage] = React.useState(null);
  const [nextPage, setNextPage] = React.useState(null);
  const {
    submit, result, pageId, pageTitle,
  } = props;
  const changeColor = () => {
    if (submit && result) {
      return '#91f39a';
    }
    if (submit && !result) {
      return 'rgb(245, 178, 178)';
    }
    return '#B3DAFF';
  };
  function havePrePage() {
    if (prePage === null) return 'none';
    return 'block';
  }
  function haveNextPage() {
    if (nextPage === null) return 'none';
    return 'block';
  }
  function changePrePage() {
    api.getPageById(pageId).then((res) => {
      setNextPage(res.next);
      setPrePage(res.prev);
    });
  }
  function changeNextPage() {
    api.getPageById(pageId).then((res) => {
      setNextPage(res.next);
      setPrePage(res.prev);
    });
  }
  Heading.propTypes = {
    submit: PropTypes.bool,
    result: PropTypes.bool,
    pageId: PropTypes.string,
    pageTitle: PropTypes.string,
  };

  Heading.defaultProps = {
    submit: false,
    result: false,
    pageId: null,
    pageTitle: null,
  };

  return (
    <div className="Heading">
      <button type="button" className="Rectangle" style={{ backgroundColor: changeColor() }}>{pageTitle}</button>
      <button type="button" onClick={changePrePage} className="Vector-forward" style={{ display: havePrePage() }}>up</button>
      <button type="button" onClick={changeNextPage} className="Vector-back" style={{ display: haveNextPage() }}>back</button>
    </div>
  );
}
