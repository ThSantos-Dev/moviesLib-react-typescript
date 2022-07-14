// Interfaces
import { IMovie } from "../interfaces/IMovie";
import { IMovies } from "../interfaces/IMovies";

type TMovie = {
    movies: IMovies | {},
    movie: IMovie | {},

    error: any,
    success: boolean,
    loading: boolean,
}

export default TMovie