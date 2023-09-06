/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../redux/books/bookSlice';

function Book() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const isLoading = useSelector((state) => state.books.isLoading);
  const isError = useSelector((state) => state.books.isError);

  useEffect(() => {
    // Dispatch the fetchCategories action to retrieve categories
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div>
      <h1>Categories</h1>
      {isLoading ? (
        <p>Loading categories...</p>
      ) : isError ? (
        <p>Error loading categories.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Book;
