import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = 'https://us-central1-bookstore-api-e63c8.cloudfunctions.net/bookstoreApi/apps/EY0N6sNA3XmOHEB8noS1';

export const AddBook = createAsyncThunk('books/addBook', async (book) => {
  try {
    await axios.post(`${apiURL}/books`, book);
  } catch (e) {
    throw new Error(e);
  }
  return book;
});

export const DeleteBook = createAsyncThunk('books/deleteBook', async (bookId) => {
  try {
    await axios.delete(`${apiURL}/books/${bookId}`);
  } catch (e) {
    throw new Error(e);
  }
  return bookId;
});

export const fetchBooks = createAsyncThunk('books/getBooks', async () => {
  const response = await axios.get(`${apiURL}/books`);

  const books = Object.entries(response.data).map((item) => (
    {
      ...item[1][0],
      item_id: item[0],
    }
  ));
  return books;
});

const initialState = {
  books: [],
  isLoading: false,
  isError: undefined,
};

const bookSplice = createSlice({
  name: 'books',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(AddBook.fulfilled, (state, action) => {
      state.books.push(action.payload);
    });

    builder.addCase(DeleteBook.fulfilled, (state, action) => ({
      ...state,
      books: state.books.filter((book) => book.item_id !== action.payload),
    }));

    builder.addCase(fetchBooks.pending, (state) => ({
      ...state,
      isLoading: true,
    }));

    builder.addCase(fetchBooks.fulfilled, (state, action) => ({
      ...state,
      isLoading: false,
      books: action.payload,
    }));

    builder.addCase(fetchBooks.rejected, (state) => ({
      ...state,
      isLoading: false,
      isError: true,
    }));
  },
});

export default bookSplice.reducer;
