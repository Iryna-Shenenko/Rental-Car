import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const carId = action.payload;
      const index = state.favorites.indexOf(carId);
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(carId);
      }
    },
    clearFavorites: (state) => {
        state.favorites = [];
      },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;

const persistConfig = {
  key: "favorites",
  storage,
};

export const favoritesReducer = persistReducer(
  persistConfig,
  favoritesSlice.reducer
);