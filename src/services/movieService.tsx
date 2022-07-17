/**
 * Objetivo: arquivo de funções que lidam com as requisições HTTP
 * Data: 13/07/2022
 * @author Thales Santos
 */

// Interfaces
import { IMovies, IMoviesError } from "../interfaces/IMovies";
import { IMovie } from "./../interfaces/IMovie";

// Função responsável por trazer a lista dos melhores filmes
const getData = async (url: string) => {
  // Realizando a requisição para obter os melhores filmes
  const res: IMovies | IMovie | IMoviesError = await fetch(url)
    .then((res) => res.json())
    .catch((err) => err);

  // Retornando a resposta da requisição
  return res;
};



const movieService = {
  getData
};

export default movieService;
