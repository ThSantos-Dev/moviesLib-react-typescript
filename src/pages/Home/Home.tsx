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
import MovieCard from './../../components/MovieCard/MovieCard';
import PagenationBar from './../../components/PagenationBar/PagenationBar';

const Home = () => {
  // Resgatando os states do Redux
  const { movies, loading, error } = useSelector((state: any) => state.movie);

  // Instanciando o dispatch para poder utlizar as funções do Reducer 
  const dispatch: any = useDispatch();


  // Carregando os dados
  useEffect(() => {
    dispatch(getTopRatedMovies());
  }, []);

  return (
    <div className="container">
      <PagenationBar numberOfPages={100}/>

      <h2 className="title">Melhores filmes:</h2>

      <div className="movies-container">
        {loading && (<p>Carregando...</p>)}
        {movies.results && movies.results.map((movie: IMovie) => <MovieCard movie={movie} key={movie.id}/>)}
      </div>

    </div>
  );
};

export default Home;
