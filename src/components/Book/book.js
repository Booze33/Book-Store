import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { removeBook } from '../../redux/books/bookSplice';
import './book.css';

function Book({ id, title, author }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeBook(id));
  };

  return (
    <div className="book">
      <h2 className="title">
        {title}
        {' by '}
        {author}
        <button type="button" onClick={handleDelete} className="click">Delete</button>
      </h2>
    </div>
  );
}

Book.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Book;
