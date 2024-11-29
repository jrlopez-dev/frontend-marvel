// src/services/marvelApi.js
import axios from 'axios';
import md5 from 'crypto-js/md5';

const publicKey = '03634040c87e77c532cf468d2970b978';
const privateKey = '49146281eb824449d7e7faffc38a859317ba83d9';
const baseUrl = 'https://gateway.marvel.com/v1/public';

const getAuthParams = () => {
  const ts = new Date().getTime();
 
  const hash = md5(ts + privateKey + publicKey);  // Usa una función de hash MD5
  return {
    ts,
    apikey: publicKey,
    hash,
  };
};

export const searchCharacters = async (name) => {

  const params = getAuthParams();
  const response = await axios.get(`${baseUrl}/characters`, {
    params: { ...params, nameStartsWith: name }
  });
  console.log(response.data)
  return response.data.data.results;
};
/**Recurso que busca todos los personajes */
export const getBuscarTodosLosPersonajes = async (name) => {
const params = getAuthParams();
const response = await axios.get(`${baseUrl}/characters`, {
  params: { ...params}
});
return response.data.data.results;
};
/**Recurso que busca por ID de personaje */
export const getBuscarPorId = async (characterId) => {
const params = getAuthParams();
const response = await axios.get(`${baseUrl}/characters/${parseInt(characterId)}`, 
{ params: { ...params}});
console.log("Respuesta de peticion: ",response.data)
return response.data.data.results;
};

/**Recurso que busca por nombre de personaje */
export const getBuscarPorNombre = async (name) => {
const params = getAuthParams();
const response = await axios.get(`${baseUrl}/characters`, {
  params: { ...params, nameStartsWith: name }
});
console.log(response.data.data.results)
return response.data.data.results;
};
/**Recurso que busca todos los comic */
export const getBuscarTodosLosComic = async (name) => {
  console.log("Nuevo metodo de buscar todos los personajes")
const params = getAuthParams();
const response = await axios.get(`${baseUrl}/comics`, {
  params: { ...params}
});
return response.data.data.results;
};
/**Recurso que busca todos los comic por ID */
export const getBuscarTodosLosComicPorId = async (comicId) => {
  console.log("Nuevo metodo de buscar todos los personajes")
const params = getAuthParams();
const response = await axios.get(`${baseUrl}/comics/${parseInt(comicId)}`, {
  params: { ...params, nameStartsWith: comicId}
});
console.log("Resultado***: ",response.data.data.results)
return response.data.data.results;
};


export const searchComics = async (title) => {
    console.log("BUSQUEDA DE SEGUNDO METODO "+title)
  const params = getAuthParams();
  const response = await axios.get(`${baseUrl}/comics`, {
    params: { ...params, titleStartsWith: title }
  });
  return response.data.data.results;
};

// Nueva función para obtener detalles de un personaje específico
export const getCharacterDetails = async (characterId) => {
  
    console.log("BUSQUEDA DE TERCER METODO A BUSCAR POR ID")
  const params = getAuthParams();
  const response = await axios.get(`${baseUrl}/characters/${characterId}`, {...params, nameStartsWith: characterId });
  console.log("Respuesta de peticion: "+response.data)
  return response.data.data.results[0]; // El personaje está dentro del array "results"
};

// Nueva función para obtener los cómics de un personaje específico
export const getCharacterComics = async (id) => {
    console.log("BUSQUEDA DE CUARTO METODO")
  const params = getAuthParams();
  const response = await axios.get(`${baseUrl}/characters/${id}/comics`, { params });
  return response.data.data.results;
};

// Nueva función para obtener los detalles de un cómic específico por ID
export const getComicsById = async (comicId) => {
    console.log("BUSQUEDA DE QUINTO METODO")
  const params = getAuthParams();
  const response = await axios.get(`${baseUrl}/comics/${comicId}`, { params });
  return response.data.data.results[0]; // El cómic está dentro del array "results"
};

// Nueva función para obtener series si se requiere
export const searchSeries = async (title) => {
    console.log("BUSQUEDA DE sexto METODO")
  const params = getAuthParams();
  const response = await axios.get(`${baseUrl}/series`, {
    params: { ...params, titleStartsWith: title }
  });
  return response.data.data.results;
};
