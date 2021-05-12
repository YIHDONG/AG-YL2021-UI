/* eslint-disable react/prop-types */
import React from 'react';
import ReactDom from 'react-dom';
// import styled from 'styled-components';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  background: '#FFF',
  padding: '50px',
};

export default function Modal({ showModal, children, closeModal }) {
  if (!showModal) return null;
  return ReactDom.createPortal(
    <>
      <div style={MODAL_STYLES}>
        {children}
        <button type="button" onClick={closeModal}> Close Modal </button>
      </div>
    </>, document.getElementById('portal'),
  );
}
