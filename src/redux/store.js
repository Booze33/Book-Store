import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './books/bookSplice';
import categoriesReducer from './category/categorySplice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    categories: categoriesReducer,
  },
});

export default store;
