/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
// components/Book/book.js
import React from 'react';

function Book({ id, title, author, category, onDelete }) {
  return (
    <div className="book">
      <div className="book-info">
        <h3>Title: {title}</h3>
        <p>Author: {author}</p>
        <p>Category: {category}</p>
      </div>
      <button onClick={() => onDelete(id)} type="button">Delete</button>
    </div>
  );
}

export default Book;
