/* eslint-disable react/prop-types */
import React from 'react';
import ReactDom from 'react-dom';
import './Modal.css';

export default function Modal({ showModal, children, closeModal }) {
  if (!showModal) return null;
  return ReactDom.createPortal(
    <>
      <div className="Container">
        <div className="Header">
          <h2>Modal header</h2>
        </div>
        {children}
        <button className="CloseModal" type="button" onClick={closeModal}> Close Modal </button>
      </div>
    </>, document.getElementById('portal'),
  );
}
