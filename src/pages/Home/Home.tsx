// Styles
import styles from "./Home.module.css";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { getTopRatedMovies } from "../../slices/movieSlice";

// Interfaces
import { IMovie } from "./../../interfaces/IMovie";

// Components
import MovieCard from "./../../components/MovieCard/MovieCard";
import PagenationBar from "./../../components/PagenationBar/PagenationBar";
import Loading from './../../components/Loading/Loading';

const Home = () => {
  // Resgatando os states do Redux
  const { movies, loading, error } = useSelector((state: any) => state.movie);


  // Instanciando o dispatch para poder utlizar as funções do Reducer
  const dispatch: any = useDispatch();

  const [numberOfButtons, setNumberOfButtons] = useState<number>(9);

  // Carregando os dados
  useEffect(() => {
    dispatch(getTopRatedMovies());

    if (window.screen.width <= 576) {
      return setNumberOfButtons(3);
    }

    if (window.screen.width <= 875) {
      return setNumberOfButtons(5);
    }
  }, []);

  // Exibindo loading
  if(loading) {
    return <Loading />
  }

  return (
    <div className="container">
      <h2 className="title">Melhores filmes:</h2>

      <div className="movies-container">
        {loading && <p>Carregando...</p>}
        {movies.results &&
          movies.results.map((movie: IMovie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>

      <PagenationBar
        numberOfPages={100}
        numberOfButtons={numberOfButtons}
        redirectTo="/movies/page"
      />
    </div>
  );
};

export default Home;
