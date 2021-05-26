/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
    <div className={classes.Heading} style={{ backgroundColor: changeColor() }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-1">
            {previousPageId && (
            <div className={classes.LeftArrow}>
              <svg onClick={() => onGoToPage(previousPageId)} width="23" height="31" viewBox="0 0 23 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.657853 16.7749L20.5939 30.7246C20.8239 30.8855 21.0932 30.9797 21.3724 30.9971C21.6517 31.0144 21.9303 30.9542 22.1781 30.823C22.426 30.6918 22.6335 30.4945 22.7784 30.2526C22.9233 30.0107 22.9999 29.7333 23 29.4505V1.551C23.0002 1.2681 22.9238 0.990534 22.779 0.748397C22.6342 0.50626 22.4267 0.308784 22.1788 0.17737C21.9309 0.0459563 21.6522 -0.0143825 21.3728 0.00289298C21.0934 0.0201685 20.8241 0.114399 20.5939 0.275373L0.657853 14.2251C0.454749 14.3684 0.288879 14.5591 0.174344 14.7811C0.0598102 15.003 0 15.2497 0 15.5C0 15.7503 0.0598102 15.997 0.174344 16.2189C0.288879 16.4409 0.454749 16.6316 0.657853 16.7749Z" fill="#2596FF" />
              </svg>
            </div>
            )}
          </div>

          <div className="col-10">
            {pageTitle}
          </div>

          <div className="col-1">
            {nextPageId && (
            <div className={classes.RightArrow}>
              <svg onClick={() => onGoToPage(nextPageId)} width="23" height="31" viewBox="0 0 23 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.3421 14.2251L2.40613 0.275372C2.17606 0.114473 1.90682 0.0202541 1.62757 0.00291634C1.34832 -0.0144215 1.06969 0.0457821 0.821869 0.17701C0.574043 0.308237 0.366461 0.505487 0.221594 0.747402C0.076725 0.989317 9.53674e-05 1.26668 1.90735e-06 1.54945L1.90735e-06 29.449C-0.000183105 29.7319 0.0762405 30.0095 0.220997 30.2516C0.365751 30.4937 0.573315 30.6912 0.821192 30.8226C1.06907 30.954 1.3478 31.0144 1.62719 30.9971C1.90657 30.9798 2.17595 30.8856 2.40613 30.7246L22.3421 16.7749C22.5453 16.6316 22.7111 16.4409 22.8257 16.2189C22.9402 15.997 23 15.7503 23 15.5C23 15.2497 22.9402 15.003 22.8257 14.7811C22.7111 14.5591 22.5453 14.3684 22.3421 14.2251Z" fill="#2596FF" />
              </svg>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
