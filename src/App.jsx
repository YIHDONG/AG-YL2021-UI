import React, { useState } from 'react';
import styled from 'styled-components';
import api from './api';
import './App.css';

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

  const getPage = () => {
    setLoading(true);
    api.getPage('correct_page_id')
      .then((res) => {
        setPage(res);
        setLoading(false);
        getSections(res.sections);
      });
  };

  // const sectionList = page.sections;

  return (
    <div className="App">
      <button
        disabled={loading}
        type="button"
        onClick={() => getPage()}
      >
        Get Learning Page
      </button>
      {sections.map((section) => sectionRendering(section))}
      <p>{JSON.stringify(page)}</p>
      {/* {sectionList.map((section) => <div><h1>{section.content}</h1></div>)} */}
    </div>
  );
}

export default App;
