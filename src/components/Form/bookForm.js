import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
// import PropTypes from 'prop-types';
import { addBook } from '../../redux/books/bookSplice';
import './bookForm.css';

function Form() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  function HandleSubmit(e) {
    e.preventDefault();

    const book = {
      item_id: nanoid(),
      title,
      author,
      category: 'Uncategorized',
    };
    dispatch(addBook(book));
    setTitle('');
    setAuthor('');
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
