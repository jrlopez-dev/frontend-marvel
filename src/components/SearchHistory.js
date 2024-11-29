// src/components/SearchHistory.js
import React, { useState, useEffect } from 'react';
import '../styles/CharacterList.css';

const SearchHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setHistory(savedHistory);
  }, []);

  return (
    <div>
      <h2>Historial de Búsquedas</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
