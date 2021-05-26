import React, { useState } from 'react';
import styled from 'styled-components';
import api from './api';
import './App.css';
import Heading from './Component/Heading';

const LearningPageText = styled.p`
/* body */
font-family: Lato;
font-style: normal;
font-weight: 500;
font-size: 18px;
line-height: 22px;
text-align: center;

/* text */
color: #2B1953;
`;

const LearningPageImg = styled.img`
  position: relative;
  justify-content: center;
  align-items: center;
  border-radius: 10px 0 0 10px;
  background: #FFFFFF;
  width: 200 px;
  height: 200 px;
  max-height: 400px;
  max-width: 400px;
`;

const AnimationVideo = styled.iframe`
  position: relative;
  /* overflow: hidden;
  padding-top: 56.25%; */
`;

// const sectionNumber = 1;

function sectionRendering(section) {
  if (section.type === 'image') {
    return (
      <LearningPageImg src={section.content} alt="logo" />
    );
  }
  if (section.type === 'text') {
    return (
      <LearningPageText>{section.content}</LearningPageText>
    );
  }
  if (section.type === 'animation') {
    return (
      <div>
        <AnimationVideo
          src={section.content}
          title="Youtube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
    );
  }
  return null;
}

function App() {
  const [page, setPage] = useState('No page is loaded yet!');
  const [loading, setLoading] = useState(false);
  const [sections, getSections] = useState([]);

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
      console.log('big woops!');
    }
  };

  // const sectionList = page.sections;

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
        status={userHistory[currentPageId].status}
        nextPageId={currentPage.nextPageId}
        previousPageId={currentPage.previousPageId}
        onGoToPage={goToPage}
        pageTitle={currentPage.title}
      />
    </div>
  );
}

export default App;
