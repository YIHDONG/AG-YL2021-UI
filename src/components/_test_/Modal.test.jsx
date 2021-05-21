import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import Modal from '../Modal';
import '@testing-library/jest-dom/extend-expect';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Modal
      isCorrect
      showModal
      closeModal={() => undefined}
    />, div,
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders text correctly', () => {
  const { getByTestId } = render(
    <Modal
      isCorrect={false}
      showModal
      closeModal={() => undefined}
    >
      Test text
    </Modal>,
  );
  expect(getByTestId('modal-incorrect')).toHaveTextContent('Test text');
});
