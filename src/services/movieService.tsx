/**
 * Objetivo: arquivo de funções que lidam com as requisições HTTP
 * Data: 13/07/2022
 * @author Thales Santos
 */

// Interfaces
import { IMovies, IMoviesError } from "../interfaces/IMovies";
import { IMovie } from "./../interfaces/IMovie";

// Função responsável por trazer a lista dos melhores filmes
const getTopRatedMovies = async (url: string) => {
  // Realizando a requisição para obter os melhores filmes
  const res: IMovies | IMoviesError = await fetch(url)
    .then((res) => res.json())
    .catch((err) => err);

  // Retornando a resposta da requisição
  return res;
};
// Função responsável por trazer a lista dos melhores filmes por página
const getMoviesByPage = async (url: string) => {
  // Realizando a requisição para obter os melhores filmes
  const res: IMovies | IMoviesError = await fetch(url)
    .then((res) => res.json())
    .catch((err) => err);

  // Retornando a resposta da requisição
  return res;
};

// Função responsável por trazer filmes com base em uma palavra digitada
const getSearchedMovies = async (url: string) => {
  // Realizando a requisição para obter os filmes com base na palavra digitada
  const res: IMovies | IMoviesError = await fetch(url)
    .then((res) => res.json())
    .catch((err) => err);

  // Retornando a resposta da requisição
  return res;
};

// Função responsável por buscar informações de um filme
const getMovie = async (url: string) => {
  // Realizando a requisição para obter os detalhes do filme
  const res: IMovie | IMoviesError = await fetch(url)
    .then((res) => res.json())
    .catch((err) => err);

  // Retornando resposta da requisição
  return res
};

const movieService = {
  getTopRatedMovies,
  getMoviesByPage,
  getSearchedMovies,
  getMovie
};

export default movieService;
