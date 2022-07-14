// Styles
import styles from './MovieCard.module.css';

// Interfaces
import { IMovie } from './../../interfaces/IMovie';

// Components
import { Link } from "react-router-dom";

// Icons
import { FaStar } from "react-icons/fa";

// Config
const IMAGE_URL = import.meta.env.VITE_IMG

type Props = {
    movie: IMovie,
    showLink?: boolean,
    moviePage?: boolean
};

const MovieCard = ({movie, showLink = true, moviePage = false}: Props) => {
  return (
    <div className={`${styles.movie_card} ${moviePage && styles.movie_page}`}>
        <img src={IMAGE_URL + movie.poster_path} alt={movie.title} />
        <h2>{movie.title}</h2>

        <p>
            <FaStar /> {movie.vote_average}
        </p>

        {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
    </div>
  )
};

export default MovieCard;
