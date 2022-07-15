// Hooks
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Components
import PagenationBar from "./../../components/PagenationBar/PagenationBar";
import { IMovie } from "./../../interfaces/IMovie";
import MovieCard from "./../../components/MovieCard/MovieCard";
import { getTopRatedMoviesByPage } from "../../slices/movieSlice";
import { useState } from 'react';

const Pagination = () => {
  // Resgatando os states do rudux
  const { movies, loading, error } = useSelector((state: any) => state.movie);

  // Instanciando o dispatch para poder utlizar as funções do Reducer
  const dispatch: any = useDispatch();

  // Resgatando o número da página passada na url
  const { page } = useParams<string>();

  // Carregando os dados da página
  useEffect(() => {
    // Validação para verificar se o número passado como argumento é válido
    if (!(parseInt(page!) > 0)) return;

    // Disparando função do redux para carregar os dados de acordo com uma página
    dispatch(getTopRatedMoviesByPage(parseInt(page!)));
  }, [page]);

  const [numberOfButtons, setNumberOfButtons] = useState<number>(9)

  useEffect(() => {
    if(window.screen.width <= 576) {
      return setNumberOfButtons(3)
    }

    if(window.screen.width <= 875){
      return setNumberOfButtons(5)
    }
    
  }, [])

  return (
    <div className="container" >
      <h2 className="title">Página: {page}</h2>
      <PagenationBar numberOfPages={100} page={parseInt(page!)} 
        numberOfButtons={numberOfButtons}
      />

      <div className="movies-container">
        {loading && <p>Carregando...</p>}
        {movies.results &&
          movies.results.map((movie: IMovie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </div>
  );
};

export default Pagination;
