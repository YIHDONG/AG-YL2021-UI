import React from 'react';

import './App.css';
import CourseNavigation from './Component/CourseNavigation';

function App() {
  return (
    <div className="App">
      <CourseNavigation
        pages={[
          {
            pageId: '1',
            type: 'practice',
            active: true,
            status: 'correct',
            seen: true,
          },
          {
            pageId: '2',
            type: 'learn',
            seen: true,
          },
        ]}
        onGoToPage={(id) => console.log(`clicked ${id}`)}
      />
    </div>
  );
}

export default App;
