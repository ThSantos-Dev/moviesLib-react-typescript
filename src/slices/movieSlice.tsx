/**
 * Objetivo: arquivo de funções que utilizam o service e usam o gerenciamento dos estados com Redux
 * Data: 13/07/2022
 * @author Thales Santos
 */

// Import config
const MOVIES_URL = import.meta.env.VITE_API;
const SEARCH_URL = import.meta.env.VITE_SEARCH;
const API_KEY = import.meta.env.VITE_API_KEY;

// Redux
import { createAsyncThunk, createSlice, Slice } from "@reduxjs/toolkit";
import { IMovie } from "../interfaces/IMovie";

// Services
import movieService from "../services/movieService";

// Types
import TMovie from "../types/TMovie";
import TSearch from "../types/TSearch";

// Interfaces
import { IMovies, IMoviesError } from "./../interfaces/IMovies";

// Estado inicial
const initialState: TMovie = {
  movies: {},
  movie: {},
  recommendations: {},

  error: null,
  success: false,
  loading: false,
};

// Função responsável por trazer a lista do filmes mais bem avaliados
export const getTopRatedMovies = createAsyncThunk(
  "movie/topRated",
  async (_, thunkAPI) => {
    // Configurando a URL
    const topRatedUrl: string = `${MOVIES_URL}top_rated?${API_KEY}&language=pt-BR`;

    // Chamando a função do service para listar os filmes melhor avaliados
    const data: IMovies | IMoviesError = await movieService.getData(
      topRatedUrl
    );

    // Validação para verificar se não houveram erros
    if (data.status_message) {
      // Retornando uma mensagem de erro
      return thunkAPI.rejectWithValue("Erro ao buscar filmes.");
    }

    // Retornando a resposta da requisição
    return data;
  }
);

// Função responsável por trazer a lista do filmes mais bem avaliados por página
export const getTopRatedMoviesByPage = createAsyncThunk(
  "movie/topRatedByPage",
  async (page: number, thunkAPI) => {
    // Configurando a URL
    const topRatedUrl: string = `${MOVIES_URL}top_rated?${API_KEY}&page=${page}&language=pt-BR`;

    // Chamando a função do service para listar os filmes melhor avaliados
    const data: IMovies | IMoviesError = await movieService.getData(
      topRatedUrl
    );

    // Validação para verificar se não houveram erros
    if (data.status_message) {
      // Retornando uma mensagem de erro
      return thunkAPI.rejectWithValue("Erro ao buscar filmes.");
    }

    // Retornando a resposta da requisição
    return data;
  }
);

// Função responsável por trazer a lista de filmes com base em uma palavra
export const getSearchedMovies = createAsyncThunk(
  "movie/search",
  async (query: string, thunkAPI) => {
    // Configurando a URL
    const searchUrl: string = `${SEARCH_URL}?${API_KEY}&query=${query}&language=pt-BR`;

    // Chamando a função do service que retorna essa lista
    const data: IMovies | IMoviesError = await movieService.getData(
      searchUrl
    );

    // Validação para verificar se houveram erros
    if (data.status_message) {
      // Retornando uma mensagem de erro
      return thunkAPI.rejectWithValue("Erro ao buscar filmes.");
    }

    // Retornando os filmes encontrados
    return data;
  }
);

// Função responsável por trazer a lista de filmes com base em uma palavra por página
export const getSearchedMoviesByPage = createAsyncThunk(
  "movie/searchByPage",
  async (search: TSearch, thunkAPI) => {
    // Configurando a URL
    const searchUrl: string = `${SEARCH_URL}?&${API_KEY}&query=${search.query}&page=${search.page}&language=pt-BR`;

    // Chamando a função do service que retorna essa lista
    const data: IMovies | IMoviesError = await movieService.getData(
      searchUrl
    );

    // Validação para verificar se houveram erros
    if (data.status_message) {
      // Retornando uma mensagem de erro
      return thunkAPI.rejectWithValue("Erro ao buscar filmes.");
    }

    // Retornando os filmes encontrados
    return data;
  }
);

// Função responsável por trazer detalhes de um filme
export const getMovie = createAsyncThunk(
  "movie/details",
  async (id: string, thunkAPI) => {
    // Configurando a URL da requisição
    const movieUrl: string = `${MOVIES_URL}${id}?${API_KEY}&language=pt-BR`;

    // Chamando a função do service para trazer detalhes de um filme
    const data: IMovie | IMoviesError = await movieService.getData(movieUrl);

    // Validação para verificar se houveram erros
    if (data.status_message) {
      // Retornando uma mensagem de erro
      return thunkAPI.rejectWithValue("Erro ao buscar detalhes do filme.");
    }

    // Retornando os detalhes do filme
    return data;
  }
);

// Função responsável por trazer recomendações de filmes com base na seleção atual
export const getRecommendationsMovies = createAsyncThunk(
  "movie/getRecommendations",
  async (id: string, thunkAPI) => {
    // Configurando a URL da requisição
    const recommendationsUrl = `${MOVIES_URL}${id}/recommendations?${API_KEY}&language=pt-BR` 

    // Chamando a função do service para trazer as recomendações
    const data: IMovies | IMoviesError = await movieService.getData(recommendationsUrl)

    // Validação para verificar se houveram erros
    if (data.status_message) {
      // Retornando uma mensagem de erro
      return thunkAPI.rejectWithValue("Erro ao buscar recomendações.");
    }

    // Retornando as recomendações
    return data

  }
);

// Criando o slicer
export const movieSlice: Slice<TMovie> = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Melhor avaliados
      .addCase(getTopRatedMovies.pending, (state) => {
        // Caso pendente
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopRatedMovies.fulfilled, (state, action) => {
        // Caso de certo
        state.movies = action.payload;

        state.loading = false;
        state.error = null;
      })
      .addCase(getTopRatedMovies.rejected, (state, action) => {
        // Caso de errado
        state.movies = {};

        state.loading = false;
        state.error = action.payload;
      })

      // Melhor avalidos por página
      .addCase(getTopRatedMoviesByPage.pending, (state) => {
        // Caso pendente
        state.loading = true;
        state.error = null;

        state.movies = {};
      })
      .addCase(getTopRatedMoviesByPage.fulfilled, (state, action) => {
        // Caso de certo
        state.loading = false;
        state.error = null;

        state.movies = action.payload;
      })
      .addCase(getTopRatedMoviesByPage.rejected, (state, action) => {
        // Caso de errado
        state.loading = false;
        state.movies = {};

        state.error = action.payload;
      })

      //   Busca pelo título
      .addCase(getSearchedMovies.pending, (state) => {
        // Caso pendente
        state.loading = true;
        state.error = null;
      })
      .addCase(getSearchedMovies.fulfilled, (state, action) => {
        // Caso de certo
        state.loading = false;
        state.error = null;

        state.movies = action.payload;
      })
      .addCase(getSearchedMovies.rejected, (state, action) => {
        // Caso de errado
        state.movies = {};

        state.loading = false;
        state.error = action.payload;
      })

      // Busca pelo título por página
      .addCase(getSearchedMoviesByPage.pending, (state) => {
        // Caso pendente
        state.loading = true;
        state.error = null;

        state.movies = {};
      })
      .addCase(getSearchedMoviesByPage.fulfilled, (state, action) => {
        // Caso de certo
        state.loading = false;
        state.error = null;

        state.movies = action.payload;
      })
      .addCase(getSearchedMoviesByPage.rejected, (state, action) => {
        // Caso de errado
        state.loading = false;
        state.movies = {};

        state.error = action.payload;
      })

      // Detalhes do filme
      .addCase(getMovie.pending, (state) => {
        // Caso pendente
        state.loading = true;
        state.error = null;

        state.movie = {};
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        // Caso de certo
        state.loading = false;
        state.error = null;

        state.movie = action.payload;
      })
      .addCase(getMovie.rejected, (state, action) => {
        // Caso de errado
        state.loading = false;
        state.movie = {};

        state.error = action.payload;
      })

      // Recomendações
      .addCase(getRecommendationsMovies.pending, (state) => {
        // Caso pendente
        state.loading = true;
        state.error = null;

        state.recommendations = {};
      })
      .addCase(getRecommendationsMovies.fulfilled, (state, action) => {
        // Caso de certo
        state.loading = false;
        state.error = null;

        state.recommendations = action.payload;
      })
      .addCase(getRecommendationsMovies.rejected, (state, action) => {
        // Caso de errado
        state.loading = false;
        state.recommendations = {}

        state.error = action.payload
      })

  },
});

export default movieSlice.reducer;
