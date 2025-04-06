import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  brand: '',
  rentalPrice: '',
  minMileage: '',
  maxMileage: '',
 limit: '',
 page: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter(state, {payload}) {  
      if (payload.brand !== undefined) state.brand = payload.brand;
      if (payload.rentalPrice !== undefined)state.rentalPrice = payload.rentalPrice;
      if (payload.minMileage !== undefined)state.minMileage = payload.minMileage;
      if (payload.maxMileage !== undefined)state.maxMileage = payload.maxMileage;
      if (payload.limit !== undefined)state.limit = payload.limit;
      if (payload.page !== undefined)state.page = payload.page;
  },
},
});
export const {setFilter} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
