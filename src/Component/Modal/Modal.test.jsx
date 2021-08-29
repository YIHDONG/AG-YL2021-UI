import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '.';
import '@testing-library/jest-dom/extend-expect';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Modal
      title="someTitle"
      status="correct"
      showModal
      closeModal={() => {}}
    />, div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
