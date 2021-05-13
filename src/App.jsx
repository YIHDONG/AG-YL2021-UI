/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
import React, { useState } from 'react';
import api from './api';
import logo from './logo.svg';
import './App.css';
import Modal from './components/Modal';

function App() {
  const [courses, setCoursesList] = useState('No courses yet!');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const getCoursesList = () => {
    setLoading(true);
    api.getAllCourses()
      .then((res) => {
        setCoursesList(res);
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.js</code>
          {' '}
          and save to reload.
        </p>
        <button
          disabled={loading}
          type="button"
          onClick={() => getCoursesList()}
        >
          Get Courses
        </button>
        <button type="button" onClick={() => setShowModal(true)}> Open Modal </button>
        <Modal showModal={showModal} closeModal={() => setShowModal(false)}>
          Looks like you’ve selected the incorrect nodes, each node has a label, select only the nodes labled 1 and 5
        </Modal>
        <p>{JSON.stringify(courses)}</p>
      </header>
    </div>
  );
}

export default App;
