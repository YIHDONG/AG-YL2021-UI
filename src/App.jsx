import React, { useEffect, useState } from 'react';
import api from './api';
import classes from './App.module.css';
import Heading from './Component/Heading';
import LearnPage from './Component/LearnPage';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState({});
  const [userHistory, setUserHistory] = useState({});
  const [course, setCourse] = useState(null);

  const goToPage = (id) => {
    const nextPage = course.pages.find((p) => p.id === id);
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    const fetchCourse = async () => {
      setLoading(true);
      try {
        const courses = await api.getAllCourses();
        const courseFetched = await api.getCourse(courses[0].id);

        let pages = await Promise.all(courseFetched.pages.map((p) => api.getPage(p.id)));
        pages = pages.map((p) => {
          const idData = courseFetched.pages.find((pg) => pg.id === p.id);
          return { ...p, ...idData };
        });

        setCourse({
          courseFetched,
          pages,
        });

        setUserHistory(pages.reduce((acc, c) => {
          acc[c.id] = {};
          return acc;
        }, {}));
        const pg = pages.find((p) => p.id === courseFetched.firstPage);
        setCurrentPage(pg);
      } catch (e) {
        console.log('big woops!');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, []);

  // const sectionList = page.sections;

  let pageJsx;
  if (currentPage.type === 'learn') {
    pageJsx = (<LearnPage sections={currentPage.sections} />);
  }

  return (!loading
  && (
    <div className="App">
      <div className={classes.Heading}>
        <Heading
          status={currentPage.id && userHistory[currentPage.id]
            && userHistory[currentPage.id].status}
          nextPageId={currentPage.next}
          previousPageId={currentPage.previous}
          onGoToPage={goToPage}
          pageTitle={currentPage.title}
        />
      </div>
      <div className={classes.Page}>
        {pageJsx}
      </div>
    </div>
  ));
}

export default App;
