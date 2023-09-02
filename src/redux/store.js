import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './books/bookSplice';
import categoriesReducer from './category/categorySplice';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    categories: categoriesReducer,
    auth: authReducer,
  },
});

export default store;
