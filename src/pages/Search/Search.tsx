// Hooks
import { useQuery } from "../../hooks/useQuery";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Redux
import { getSearchedMovies } from "../../slices/movieSlice";

// Interfaces
import { IMovie } from "./../../interfaces/IMovie";

// Components
import MovieCard from "./../../components/MovieCard/MovieCard";
import PagenationBar from "../../components/PagenationBar/PagenationBar";

const Search = () => {
  // Resgatando os states do Redux
  const { movies, loading, error } = useSelector((state: any) => state.movie);

  // Instanciando o dispatch para poder utlizar as funções do Reducer
  const dispatch: any = useDispatch();

  // Resgatando a query string
  const search: URLSearchParams = useQuery();
  const query: string | null = search.get("q");

  // Resgatando o número da página passada na url
  const { page } = useParams<string>();

  // State para controlar a quantidade de botões da paginação
  const [numberOfButtons, setNumberOfButtons] = useState<number>(9);

  // Carregando os dados - seão recarregados todas as vezes em que 'q' for alterado
  useEffect(() => {
    // Validação para verificar se a query está vazia
    if (!query) return;

    // Disparando a função do reducer para buscar os filmes pela query
    dispatch(getSearchedMovies(query));

    // Definindo a quantidade de botões de acordo com o tamanho da tela
    if (window.screen.width <= 576) {
      return setNumberOfButtons(3);
    }

    if (window.screen.width <= 875) {
      return setNumberOfButtons(5);
    }
  }, [query, page]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="container">
      
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>

      <div className="movies-container">
        {loading && <p>Carregando...</p>}
        {movies.results &&
          movies.results.map((movie: IMovie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>

      <PagenationBar
        numberOfPages={movies.total_pages && movies.total_pages}
        page={page ? parseInt(page) : 1}
        numberOfButtons={numberOfButtons}
        redirectTo={`/search/page`}
        query={query!}
      />
    </div>
  );
};

export default Search;
