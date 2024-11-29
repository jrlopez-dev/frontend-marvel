// src/components/ComicList.js
import React, { useState } from 'react';
import { searchComics } from '../services/marvelApi';
import '../styles/CharacterList.css';

const ComicList = () => {
  const [comics, setComics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    if (searchTerm) {
      const result = await searchComics(searchTerm);
      setComics(result);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar comic por título"
      />
      <button onClick={handleSearch}>Buscar</button>
      <ul>
        {comics.map((comic) => (
          <li key={comic.id}>
            <a href={comic.urls[0].url} target="_blank" rel="noopener noreferrer">
              {comic.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComicList;
