import React, { useEffect, useState } from 'react';

const StoriesDetail = ({character})=> {
    return (
      <div>
         <ul>
      <h6>Historietas de: {character.name} </h6>
         { character.stories.items.map((comic) => (
          <li key={comic.id}>
              {comic.name}
          </li>
        )) } 
      </ul>
      </div>
    );
  };
  
  export default StoriesDetail;