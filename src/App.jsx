import React, { useState } from 'react';

import './App.css';
import CourseNavigation from './Component/CourseNavigation';

function App() {
  const [currentPageId, setCurrentPageId] = useState('1');

  return (
    <div className="App">
      <CourseNavigation
        currentPageId={currentPageId}
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
        onGoToPage={setCurrentPageId}
      />
    </div>
  );
}

export default App;
