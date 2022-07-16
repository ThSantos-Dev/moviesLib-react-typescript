// Interfaces
import { IMovie } from "../interfaces/IMovie";
import { IMovies } from "../interfaces/IMovies";

type TMovie = {
    movies: IMovies | {},
    movie: IMovie | {},
    recommendations: IMovies | {},

    error: any,
    success: boolean,
    loading: boolean,
}

export default TMovie