import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './bookForm.css';

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
function Form({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  function HandleSubmit(e) {
    e.preventDefault();

    onSubmit(title, author);
  }

  return (
    <form onSubmit={HandleSubmit}>
      <input className="title-1" type="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} />
      <input className="author-1" type="text" placeholder="Author" value={author} onChange={(event) => setAuthor(event.target.value)} />
      <button type="submit" className="button">Add Book</button>
    </form>
  );
}

export default Form;
