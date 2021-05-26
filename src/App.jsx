/* eslint-disable no-shadow */
import React, { useState } from 'react';
import api from './api';
import logo from './logo.svg';
import './App.css';
import Heading from './Component/Heading';

function App() {
  const [courses, setCoursesList] = useState('No courses yet!');
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(null);
  const [userHistory, setUserHistory] = useState(null);
  const [course, setCourse] = useState(null);

  const goToPage = (id) => {
    const nextPage = course.pages.find((p) => p.id === id);
    setCurrentPage(nextPage);
  };

  const getCoursesList = async () => {
    setLoading(true);
    try {
      const courses = await api.getAllCourses();
      const course = await api.getCourse(courses[0].id);

      const pages = await Promise.all(course.pages.map((p) => api.getPage(p.id)));

      setCourse({ course, pages });
      goToPage(course.defaultPage);
      setLoading(false);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('big woops!');
    }
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
        <p>{JSON.stringify(courses)}</p>
      </header>
      <Heading
        status={userHistory[currentPage].status}
        nextPageId={currentPage.nextPageId}
        previousPageId={currentPage.previousPageId}
        onGoToPage={goToPage}
        pageTitle={currentPage.title}
      />
    </div>
  );
}

export default App;
