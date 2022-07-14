/**
 * Objetivo: arquivo de funções que utilizam o service e usam o gerenciamento dos estados com Redux
 * Data: 13/07/2022
 * @author Thales Santos
 */

// Import config
const MOVIES_URL = import.meta.env.VITE_API;
const SEARCH_URL = import.meta.env.VITE_SEARCH
const API_KEY = import.meta.env.VITE_API_KEY;

// Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../interfaces/IMovie";

// Services
import movieService from "../services/movieService";

// Types
import TMovie from "../types/TMovie";

// Interfaces
import { IMovies, IMoviesError } from './../interfaces/IMovies';

// Estado inicial
const initialState: TMovie = {
  movies: {},
  movie: {},

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
    const data: IMovies | IMoviesError = await movieService.getTopRatedMovies(topRatedUrl);

    // Validação para verificar se não houveram erros
    if (data?.status_message) {
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
    const searchUrl: string = `${SEARCH_URL}?${API_KEY}&language=pt-BR&query=${query}`

    // Chamando a função do service que retorna essa lista
    const data: IMovies | IMoviesError = await movieService.getSearchedMovies(searchUrl)

    // Validação para verificar se houveram erros
    if(data?.status_message){
        // Retornando uma mensagem de erro
        return thunkAPI.rejectWithValue("Erro ao buscar filmes.")
    }

    // Retornando os filmes encontrados
    return data
  }
);

// Função responsável por trazer detalhes de um filme
export const getMovie = createAsyncThunk("movie/details", async (id: string, thunkAPI) => {
    // Configurando a URL da requisição
    const movieUrl: string = `${MOVIES_URL}${id}?${API_KEY}&language=pt-BR`

    // Chamando a função do service para trazer detalhes de um filme
    const data: IMovie | IMoviesError = await movieService.getMovie(movieUrl)

    // Validação para verificar se houveram erros
    if(data?.status_message) {
        // Retornando uma mensagem de erro 
        return thunkAPI.rejectWithValue("Erro ao buscar detalhes do filme.")
    }

    // Retornando os detalhes do filme
    return data
})

// Criando o slicer
export const movieSlice = createSlice({
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
        state.movies = {}

        state.loading = false;
        state.error = action.payload;
    })

    // Detalhes do filme
    .addCase(getMovie.pending, (state) => {
      // Caso pendente
      state.loading = true;
      state.error = null;

      state.movie = {}
    })
    .addCase(getMovie.fulfilled, (state, action) => {
      // Caso de certo
      state.loading = false;
      state.error = null;

      state.movie = action.payload
    })
    .addCase(getMovie.rejected, (state, action) => {
      // Caso de errado
      state.loading = false;
      state.movie = {}

      state.error = action.payload
    })
  },
});

export default movieSlice.reducer;
