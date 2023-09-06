import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './books/bookSlice';
import categoriesReducer from './category/categorySlice';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    books: booksReducer,
    categories: categoriesReducer,
    auth: authReducer,
  },
});

export default store;
