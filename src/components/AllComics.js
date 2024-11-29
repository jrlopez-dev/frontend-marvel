const AllComics = ({character})=> {
    
    return (
      <div>
         <ul>
         <h6>Titulo: {character.title} </h6>
         <h6>ID: {character.id} </h6>
         <img  style={{width:"150px", height:"150px", alignContent:"center"}} src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
         <h6>Descripcion: </h6>
      <p>{character.description || 'Sin descripción disponible.'}</p>
      </ul>
      </div>
    );
  };
  
  export default AllComics;