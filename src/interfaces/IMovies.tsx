import { IMovie } from "./IMovie";

// Interface para Filmes
export interface IMovies {
  page?: number;
  results?: IMovie[];
  total_results?: number;
  total_pages?: number;

  status_message?: string;
}

export interface IMoviesError {
  status_message?: string;
  status_code?: number;
  success?: boolean;
}