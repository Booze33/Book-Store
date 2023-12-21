/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-catch */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = 'http://localhost:3001/api/v1';

export const fetchCategories = createAsyncThunk('categories/getCategories', async () => {
  try {
    const response = await axios.get(`${apiURL}/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  categories: [],
  isLoading: false,
  isError: undefined,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
      state.isError = undefined;
    });

    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });

    builder.addCase(fetchCategories.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default categorySlice.reducer;
