import React, { useEffect, useState } from 'react';

const SeriesDetail = ({character})=> {
    return (
      <div>
         <ul>
      <h6>Series de: {character.name} </h6>
         { character.series.items.map((comic) => (
          <li key={comic.id}>
              {comic.name}
          </li>
        )) } 
      </ul>
      </div>
    );
  };
  
  export default SeriesDetail;