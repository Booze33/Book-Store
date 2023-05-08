import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducer: {
    addBook: (state, action) => {
      state.books.push(action.payload);
    },
    removeBook: (state, action) => {
      const bookIndex = state.books.findIndex((book) => book.id === action.payload);
      if (bookIndex !== -1) {
        state.books.splice(bookIndex, 1);
      }
    },
  },
});

export const { addBook, removeBook } = booksSlice.actions;
export default booksSlice.reducer;
