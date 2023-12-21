/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-confusing-arrow */
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
    try {
      const response = await axios.post(`${apiURL}/books`, {
        book: formData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
);

export const deleteBook = createAsyncThunk(
  'book/deleteBook',
  async (bookId) => {
    try {
      await axios.delete(`${apiURL}/books/${bookId}`);
      return bookId;
    } catch (error) {
      throw error;
    }
  },
);

export const editBook = createAsyncThunk(
  'book/editBook',
  async (book) => {
    const { id, ...formData } = book;
    try {
      const response = await axios.patch(`${apiURL}/books/${id}`, {
        book: formData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
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

    builder.addCase(addBook.pending, (state) => {
      state.isLoading = true;
      state.isError = undefined;
    });

    builder.addCase(addBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    });

    builder.addCase(addBook.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(deleteBook.pending, (state) => {
      state.isLoading = true;
      state.isError = undefined;
    });

    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = state.books.filter((book) => book.id !== action.payload);
    });

    builder.addCase(deleteBook.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(editBook.pending, (state) => {
      state.isLoading = true;
      state.isError = undefined;
    });

    builder.addCase(editBook.fulfilled, (state, action) => {
      state.isLoading = false;
      // Update the edited book in the state
      state.books = state.books.map((book) =>
        book.id === action.payload.id ? action.payload : book
      );
    });

    builder.addCase(editBook.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default bookSlice.reducer;
