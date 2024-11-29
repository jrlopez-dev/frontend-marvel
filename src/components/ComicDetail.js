// src/components/ComicDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getComicsById } from '../services/marvelApi';
import '../styles/CharacterList.css';

const ComicDetail = ({character})=> {
  return (
    <div>
      <ul>
      <h6>Comicos de: <h6>{character.name}</h6></h6>
         { character.comics.items.map((comic) => (
          <li key={comic.id}>
              {comic.name}
          </li>
        )) } 
      </ul>
      
    </div>
  );
};

export default ComicDetail;
