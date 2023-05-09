import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Book from '../Book/book';

function BookList({ onDelete }) {
  const books = useSelector((state) => state.books);
  return (
    <>
      <div>
        <h1 className="h1">List of Books</h1>
        {books.map((book) => (
          <Book
            key={book.item_id}
            title={book.title}
            author={book.author}
            onDelete={() => onDelete(book.id)}
          />
        ))}
      </div>
    </>
  );
}

BookList.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default BookList;
