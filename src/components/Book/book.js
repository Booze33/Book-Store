import React, { useState } from 'react';
import './book.css';
import PropTypes from 'prop-types';

function Book({ title, author, onDelete }) {
  const [isDelete, setIsDelete] = useState(false);

  function handleDelete() {
    setIsDelete(true);
    setTimeout(() => {
      onDelete();
    }, 1000);
  }

  return (
    <>
      <div className="book">
        <h2 className="title">
          {title }
          :  by
          { author}
          {!isDelete && <button type="button" onClick={handleDelete} className="click">Delete</button>}
          {isDelete && <p>Deleting...</p>}
        </h2>
      </div>
    </>
  );
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Book;
