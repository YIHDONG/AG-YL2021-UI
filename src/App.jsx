import React, { useState } from 'react';
// import styled from 'styled-components';
import api from './api';
import logo from './logo.svg';
import './App.css';
import Modal from './components/Modal';
// import { GlobalStyle } from './globalStyles';

// const Container = styled.div`
// display: flex;
// justify-content: center;
// align-items: center;
// height: 100vh;
// `;

// const Button = styled.button`
// min-width: 100px;
// padding: 16px 32px;
// border-radius: 4px;
// border: none;
// background: #141414;
// color: #fff;
// font-size: 24px;
// cursor: pointer;
// `;

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
          Some feedback
        </Modal>
        <p>{JSON.stringify(courses)}</p>
      </header>
    </div>
  );
}

export default App;
