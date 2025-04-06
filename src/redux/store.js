import { configureStore } from "@reduxjs/toolkit";
import  {carsReducer}  from "./Cars/slice.js";
import  {filtersReducer}  from "./filters/slice.js";

import { persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { favoritesReducer  } from "./Favourite/slice.js";
import persistReducer from "redux-persist/es/persistReducer";
import storage from 'redux-persist/lib/storage'

const persistConfigFilters = {
    key: "favorites",
    storage,
    version: 1,
  };


const persistedReducerFilters = persistReducer( persistConfigFilters, filtersReducer);


 export const store = configureStore({
  reducer: {
    cars: carsReducer,
    filters: persistedReducerFilters,
    favorites: favoritesReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], 
      },
    }),
});

export const persistor = persistStore(store);
export default store;