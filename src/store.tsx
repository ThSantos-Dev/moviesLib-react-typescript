// Redux
import { configureStore } from "@reduxjs/toolkit";

// Reducer
import movieReducer from "./slices/movieSlice";

// Configurando o redux
export const store = configureStore({
    reducer: {
        movie: movieReducer
    }
})