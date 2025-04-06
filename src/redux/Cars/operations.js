import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


   axios.defaults.baseURL = "https://car-rental-api.goit.global";
 

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async ({brand, rentalPrice, minMileage, maxMileage, limit, page}, thunkAPI) => {
    try {
      const response = await axios("cars",
        { params: {brand, rentalPrice, minMileage, maxMileage, limit, page},}
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to fetch cars");
    }
  }
);

export const fetchNextCars = createAsyncThunk(
  "cars/etchNextCars",
  async (
    {brand, rentalPrice, minMileage, maxMileage, limit, page},
    thunkAPI
  ) => {
    try { 
      const response = await axios("cars", {
        params: { brand, rentalPrice, minMileage, maxMileage, limit, page },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch next cars"
      );
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "cars/fetchCarById",
  async (id, thunkAPI) => {
    try {
      const response = await axios (`cars/${id}`);

      return response.data;
    } catch (error) {
      const message = error.message || "Failed to fetch car details";
      return thunkAPI.rejectWithValue(message);
    }
  }
);