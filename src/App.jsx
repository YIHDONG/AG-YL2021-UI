import React, { useEffect, useState } from 'react';
import { api } from './api';
import Heading from './Component/Heading';
import LearnPage from './Component/LearnPage';
import PracticePage from './Component/PracticePage';
import CourseNavigation from './Component/CourseNavigation';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState({});
  const [course, setCourse] = useState(null);

  const goToPage = (id) => {
    const nextPage = course.pages.find((p) => p.id === id);
    nextPage.seen = true;
    setCourse(course);
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
          return { ...p, ...idData, status: 'default' };
        });

        setCourse({
          courseFetched,
          pages,
        });

        const pg = pages.find((p) => p.id === courseFetched.firstPage);
        pg.seen = true;
        setCurrentPage(pg);
      } catch (e) {
        // console.log('big woops!');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, []);

  let pageJsx;
  if (currentPage.type === 'learn') {
    pageJsx = (<LearnPage sections={currentPage.sections} />);
  } else if (currentPage.type === 'practice') {
    pageJsx = (
      <PracticePage
        type={currentPage.problem.type}
        question={currentPage.problem.question}
        data={currentPage.problem.data}
        hints={currentPage.problem.hints || []}
        pageId={currentPage.id}
      />
    );
  }

  return (!loading && course
  && (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-1" />
          <div className="col-11">
            <Heading
              status={currentPage.status}
              nextPageId={currentPage.next}
              previousPageId={currentPage.previous}
              onGoToPage={goToPage}
              pageTitle={currentPage.title}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-1">
            <CourseNavigation
              pages={course.pages}
              currentPageId={currentPage.id}
              onGoToPage={goToPage}
            />
          </div>
          <div className="col-11">
            {pageJsx}
          </div>
        </div>
      </div>
    </div>
  ));
}

export default App;
