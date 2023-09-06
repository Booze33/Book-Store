/* eslint-disable implicit-arrow-linebreak */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = 'http://localhost:3001/api/v1';

export const fetchBooks = createAsyncThunk(
  'book/fetchBooks',
  async () => {
    const response = await axios.get(`${apiURL}/books`);
    console.log(response);
    return response.data;
  },
);

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

export const deleteBook = createAsyncThunk(
  'book/deleteBook',
  async (bookId) => {
    await axios.delete(`${apiURL}/books/${bookId}`);
    return bookId;
  },
);

// Initial state
const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

// Slice
const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBook.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter(
          (reserv) => reserv.id !== action.payload,
        );
      })
      .addMatcher(
        (action) =>
          [
            fetchBooks.rejected,
            addBook.rejected,
            deleteBook.rejected,
          ].includes(action.type),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        },
      );
  },
});

export default bookSlice.reducer;
