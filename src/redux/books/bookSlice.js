/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-catch */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = 'http://localhost:3001/api/v1';

export const fetchBooks = createAsyncThunk('books/getBooks', async () => {
  try {
    const response = await axios.get(`${apiURL}/books`);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addBook = createAsyncThunk(
  'book/addBook',
  async (formData) => {
    const response = await axios.post(`${apiURL}/books`, {
      book: formData,
    });
    console.log(response);
    return response.data;
  },
);

const initialState = {
  books: [],
  isLoading: false,
  isError: undefined,
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.isLoading = true;
      state.isError = undefined;
    });

    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    });

    builder.addCase(fetchBooks.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(addBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    });

    builder.addCase(addBook.pending, (state) => {
      state.isLoading = true;
      state.isError = undefined;
    });

    builder.addCase(addBook.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default bookSlice.reducer;
