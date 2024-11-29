import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';
import ComicList from './components/ComicList';
import SearchHistory from './components/SearchHistory';



function App() {
  return (
    <Router>
      <div>
        <h1>PRUEBA TECNICA</h1>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
          <Route path="/comics" element={<ComicList />} />
          <Route path="/search-history" element={<SearchHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

