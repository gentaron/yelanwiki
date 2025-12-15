import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WikiList from './pages/WikiList';
import WikiDetail from './pages/WikiDetail';
import StoryReader from './pages/StoryReader';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reader" element={<StoryReader />} />
      <Route path="/characters" element={<WikiList type="Character" />} />
      <Route path="/characters/:name" element={<WikiDetail />} />
      <Route path="/terms" element={<WikiList type="Term" />} />
      <Route path="/terms/:name" element={<WikiDetail />} />
    </Routes>
  );
}

export default App;
