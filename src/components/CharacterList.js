import React, { useState } from 'react';
import { getBuscarPorId, getBuscarPorNombre, getBuscarTodosLosComic, getBuscarTodosLosComicPorId, getBuscarTodosLosPersonajes, getCharacterDetails, searchCharacters, searchComics } from '../services/marvelApi';
import { Link } from 'react-router-dom';
import '../styles/CharacterList.css'; // Asegúrate de que la ruta sea correcta
import CharacterDetail from '../components/CharacterDetail';
import ComicDetail from '../components/ComicDetail';
import StoriesDetail from './StoriesDetail';
import SeriesDetail from './SeriesDetail';
import AllComics from './AllComics';

const CharacterList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('todos'); // "character", "comic", "series"
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const handleSearchTypeChange = (e) => {
    console.log("Selecciono algo")
    setResults([]);
    setSearchType(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setResults([]);
    try {
      setError('');
      
      let result;
      if(searchType === 'todos'){
        result = await getBuscarTodosLosPersonajes(searchTerm);
      }else if (searchType === 'character') {
        result = await getBuscarPorNombre(searchTerm);
      } else if (searchType === 'comic') {
        result = await getBuscarPorNombre(searchTerm);
      } else if (searchType === 'series') {
        result = await getBuscarPorNombre(searchTerm);
      } else if (searchType === 'porid') {
        result = await getBuscarPorId(searchTerm);
      }else if(searchType === 'history'){
        result = await  getBuscarPorNombre(searchTerm);
      }else if(searchType === 'allcomics'){
        result = await getBuscarTodosLosComic(searchTerm);
      } else if(searchType === 'comicid'){
        result = await getBuscarTodosLosComicPorId(searchTerm);
      }

      setResults(result);
      setSearchHistory([...searchHistory, { searchType, searchTerm }]);
    } catch (err) {
      setError('Hubo un problema al realizar la búsqueda.');
    }finally {
        setIsLoading(false); // Desactivar el estado de carga
        setSearchTerm('');
      }
  };

  const handleShowHistory = () => {
    setShowHistoryModal(true); // Mostrar el modal con el historial
  };

  const handleCloseHistory = () => {
    setShowHistoryModal(false); // Cerrar el modal de historial
  };

  return (
    <div className="container">
      {/* Encabezado con la imagen de Marvel */}

      <h1>Búsqueda de personajes en Api de Marvel</h1>


       {/* Botón para mostrar/ocultar las instrucciones */}
       <button 
        className="instructions-button" 
        onClick={() => setShowInstructions(!showInstructions)}
      >
        {showInstructions ? 'Ocultar instrucciones' : 'Mostrar instrucciones de uso'}
      </button>

      {/* Diálogo con instrucciones */}
      {showInstructions && (
        <div className="instructions-dialog">
          <div className="instructions-content">
            <h2>Instrucciones recomendadas</h2>
            <ul>
              <p>Como sugerencia, buscar en primer lugar
                bajo el filtro de "Todos los personajes" ya que se obtendra un catalogo donde aparecera 
                informacion de cada personaje y datos que le serviran para buscar en las siguientes opciones, por ejemplo aparece el ID y nombre para que luego
                pueda hacer una busqueda por ID o por nombre, de la misma manera se puede hacer para filtrar todos los comicos y luego buscar el Comic por ID</p>
              <li>1. Todos los personajes (Muestra todo los personajes. No requiere que digite un dato)</li>
              <li>2. Personaje por id (Debe digitar el ID del personaje)</li>
              <li>3. Por Nombre (Digitar el nombre del personaje)</li>
              <li>4. Cómicos Por Personaje (Digitar el nombre del personaje y obtendra los comicos del mismo)</li>
              <li>5. Serie Por Personaje (Digitar el nombre del personaje y obtendra las series del mismo)</li>
              <li>6. Historietas Por Personaje (Digitar el nombre del personaje y obtendra las historietas del mismo)</li>
              <li>7. Todos los comicos (Muestra un catalogo de comicos y no requiere que digite un dato)</li>
              <li>8. Comic Por ID (Debe digitar el id del comic)</li>
            </ul>
            <button onClick={() => setShowInstructions(false)}>Cerrar</button>
          </div>
        </div>
      )}










      {/* Formulario de filtros */}
      <div className="form-search">
        <select
          value={searchType}
          onChange={handleSearchTypeChange}
        >
          <option value="todos">Todos los personajes</option>
          <option value="porid">Personaje Por ID</option>
          <option value="character">Por Nombre</option>
          <option value="comic">Cómicos Por Personaje</option>
          <option value="series">Serie Por Personaje</option>
          <option value="history">Historietas Por Personaje</option>
          <option value="allcomics">Todos los comicos</option>
          <option value="comicid">Comic Por ID</option>
        </select>

        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange} 
          placeholder="Buscar..."
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

 {/* Mostrar el historial de búsqueda */}
 <button className="history-button" onClick={handleShowHistory}>
        Ver Historial de Búsquedas
      </button>


      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Buscando...</p>
        </div>
      )}

      {/* Mostrar errores */}
      {error && <div className="error-message">{error}</div>}
      <div className="container">
        {/* Mostrar resultados */}
        <div className="results">
          {searchType === "character" && (
            <h3>Resultados de filtrar por personaje</h3>
          )}
          {searchType === "comic" && <h2>Resultados de cómicos por personaje</h2>}
          {searchType === "series" && <h2>Resultados de series por personaje</h2>}
          {searchType === "allcomics" && <h5>Resultados de todos los comic</h5>}
          {searchType === "character" && <h5>Resultados por personajes</h5>}
          {searchType === "comicid" && <h5>Resultados de comic por id</h5>}
          {searchType === "history" && <h5>Resultados historietas por id</h5>}
          {searchType === "todos" && <h5>Resultado de todos los personajes</h5>}

          <ul className="row">
            {results.length === 0 ? (
              <li>No hay resultados para mostrar.</li>
            ) : (
              results.map((item) => (
                <li className="col-4" key={item.id}>
                  {searchType === "character" && (
                    <CharacterDetail character={item} />
                  )}
                  {searchType === "todos" && (
                    <CharacterDetail character={item} />
                  )}
                  {searchType === "comic" && (
                    <>
                      <CharacterDetail character={item} />
                      <ComicDetail character={item} />
                    </>
                  )}
                   {searchType === "series" && (
                    <>
                      <CharacterDetail character={item} />
                      <SeriesDetail character={item} />
                    </>
                  )}
                  {searchType === "history" && (
                    <>
                      <CharacterDetail character={item} />
                      <StoriesDetail character={item}/>
                    </>
                  )}
                  {searchType === "porid" && (
                    <CharacterDetail character={item} />
                  )}
                  {searchType ==="allcomics" &&(
                    <AllComics character={item}/>
                  )}
                  {searchType ==="comicid" &&(
                    <AllComics character={item}/>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>


 {/* Modal de Historial de Búsquedas */}
 {showHistoryModal && (
        <div className="history-modal">
          <div className="history-content">
            <h2>Historial de Búsquedas</h2>
            <ul>
              {searchHistory.length === 0 ? (
                <li>No hay búsquedas realizadas aún.</li>
              ) : (
                searchHistory.map((search, index) => (
                  <li key={index}>
                    <strong>{search.searchType}</strong>: {search.searchTerm}
                  </li>
                ))
              )}
            </ul>
            <button onClick={handleCloseHistory}>Cerrar</button>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default CharacterList;

