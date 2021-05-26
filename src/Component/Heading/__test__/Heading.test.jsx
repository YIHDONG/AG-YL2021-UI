/* eslint-disable linebreak-style */
import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import Heading from '../index';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);
it('render without crash', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Heading
      onGoToPage={() => undefined}
      pageTitle="page 1"
    />, div,
  );
});

it('render heading component with in learning first page', () => {
  const { getByTestId } = render(<Heading
    onGoToPage={() => undefined}
    pageTitle="learning page"
  />);
  expect(getByTestId('title')).toHaveTextContent('learning page');
});

it('render heading component with in learning first page', () => {
  const { getByTestId } = render(<Heading
    onGoToPage={() => undefined}
    pageTitle="learning page"
  />);
  expect(getByTestId('title')).toHaveTextContent('learning page');
});

it('matches the snapshot with nextpage', () => {
  const { getByTestId } = render(<Heading
    onGoToPage={() => undefined}
    pageTitle="learning page"
    nextPageId="page"
  />);
  expect(getByTestId('forwardButton')).toHaveStyle('display:block');
});

it('matches the snapshot with nextpage and prepage', () => {
  const { getByTestId } = render(<Heading
    onGoToPage={() => undefined}
    pageTitle="learning page"
    previousPageId="page"
  />);
  expect(getByTestId('backButton')).toHaveStyle('display:block');
});

it('matches the snapshot with correct submit', () => {
  const { getByTestId } = render(<Heading
    onGoToPage={() => undefined}
    pageTitle="learning page"
    previousPageId="page"
    status="correct"
  />);
  expect(getByTestId('title')).toHaveStyle('background-color:#91f39a');
});

it('matches the snapshot with incorrect submit', () => {
  const { getByTestId } = render(<Heading
    onGoToPage={() => undefined}
    pageTitle="learning page"
    previousPageId="page"
    status="incorrect"
  />);
  expect(getByTestId('title')).toHaveStyle('background-color:rgb(245, 178, 178)');
});
