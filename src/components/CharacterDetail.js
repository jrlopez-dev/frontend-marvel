// src/components/CharacterDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCharacterDetails, getCharacterComics } from '../services/marvelApi';
import '../styles/CharacterList.css';

const CharacterDetail = ({character}) => {
  return (
    <div className="col">
      <h6>{character.name}</h6>
      <h6>ID: {character.id}</h6>
      <img  style={{width:"150px", height:"150px", alignContent:"center"}} src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
      <h6>Descripcion: </h6>
      <p>{character.description || 'Sin descripción disponible.'}</p>
    </div>
  );
};

export default CharacterDetail;

