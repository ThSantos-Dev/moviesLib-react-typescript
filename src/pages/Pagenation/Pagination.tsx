// Hooks
import { useQuery } from "../../hooks/useQuery";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Redux
import {
  getSearchedMoviesByPage,
  getTopRatedMoviesByPage,
} from "../../slices/movieSlice";

// Types
import TSearch from "../../types/TSearch";

// Interfaces
import { IMovie } from "./../../interfaces/IMovie";

// Components
import PagenationBar from "./../../components/PagenationBar/PagenationBar";
import MovieCard from "./../../components/MovieCard/MovieCard";

const Pagination = () => {
  // Resgatando os states do rudux
  const { movies, loading, error } = useSelector((state: any) => state.movie);

  // Instanciando o dispatch para poder utlizar as funções do Reducer
  const dispatch: any = useDispatch();

  // Resgatando o número da página passada na url
  const { page } = useParams<string>();

  // State para controlar a quantidade de botões da paginação
  const [numberOfButtons, setNumberOfButtons] = useState<number>(9);

  // Resgatando URL e informações da query
  const url = window.location.href;
  const query = useQuery().get("q");

  // State que controla o redirecionamento
  const [redirect, setRedirect] = useState<string>("");

  // Carregando os dados da página
  useEffect(() => {
    // Validação para verificar se o número passado como argumento é válido
    if (!(parseInt(page!) > 0)) return;

    // Verificando qual função do redux utilizar com base na URL
    if (url.includes("movies")) {
      // Disparando função do redux para carregar os dados de acordo com uma página - melhor avaliados
      dispatch(getTopRatedMoviesByPage(parseInt(page!)));

      // Atualizando o state de redirecionamento
      setRedirect("movies");
    } else if (url.includes("search")) {
      // Disparando função do redux para carregar os dados de acordo com uma página - busca
      const search: TSearch = {
        page: parseInt(page!),
        query: query!,
      };

      dispatch(getSearchedMoviesByPage(search));

      // Atualizando o state de redirecionamento
      setRedirect("search");
    }

    // Definindo a quantidade de botões de acordo com o tamanho da tela
    if (window.screen.width <= 576) {
      return setNumberOfButtons(3);
    }

    if (window.screen.width <= 875) {
      return setNumberOfButtons(5);
    }
  }, [page]);

  // Loading
  if (loading) return <p>Carregando...</p>;

  return (
    <div className="container">
      <h2 className="title">
        {redirect === "search" ? (
          <>Resultados para: <span className="query-text">{query}</span></>
        ) : (
          <>Melhores avaliados</>
        )}
      </h2>

      <div className="movies-container">
        {movies.results &&
          movies.results.map((movie: IMovie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>

      <PagenationBar
        numberOfPages={movies.total_pages && movies.total_pages}
        page={parseInt(page!)}
        numberOfButtons={numberOfButtons}
        redirectTo={`/${redirect}/page`}
        query={redirect === "search" ? query! : ""}
      />
    </div>
  );
};

export default Pagination;
