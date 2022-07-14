// Hooks
import { useQuery } from "../../hooks/useQuery";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

// Redux
import { getSearchedMovies } from '../../slices/movieSlice';

// Interfaces
import { IMovie } from './../../interfaces/IMovie';

// Components
import MovieCard from './../../components/MovieCard/MovieCard';

const Search = () => {
  // Resgatando os states do Redux
  const { movies, loading, error } = useSelector((state: any) => state.movie);

  // Instanciando o dispatch para poder utlizar as funções do Reducer 
  const dispatch: any = useDispatch();

  // Resgatando a query string
  const search: URLSearchParams = useQuery();
  const query: string | null = search.get("q")
 
  // Carregando os dados - seão recarregados todas as vezes em que 'q' for alterado
  useEffect(() => {
    // Validação para verificar se a query está vazia
    if(!query) return;

    // Disparando a função do reducer para buscar os filmes pela query
    dispatch(getSearchedMovies(query));
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">Resultados para: <span className="query-text">{query}</span></h2>

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

export default Search;
