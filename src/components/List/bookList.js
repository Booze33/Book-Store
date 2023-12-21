// components/List/bookList.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Book from '../Book/book';
import { deleteBook } from '../../redux/books/bookSlice';

function BookList() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.data);

  const handleDelete = (id) => {
    // Dispatch the DeleteBook action
    dispatch(deleteBook(id));
  };

  return (
    <>
      <div>
        {Array.isArray(books) && books.length > 0 ? (
          books.map((book) => (
            <Book
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              category={book.category ? book.category.name : 'Unknown Category'}
              onDelete={() => handleDelete(book.id)}
            />
          ))
        ) : (
          <p>No books to display</p>
        )}
      </div>
    </>
  );
}

export default BookList;
