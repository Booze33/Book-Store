import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { AddBook } from '../../redux/books/bookSplice';
import './bookForm.css';

function Form() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const book = {
      item_id: nanoid(),
      title,
      author,
      category: 'Uncategorized',
    };

    dispatch(AddBook(book));
    setTitle('');
    setAuthor('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="title-1"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        name="title"
      />
      <input
        className="author-1"
        type="text"
        placeholder="Author"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
        name="author"
      />
      <button type="submit" className="button">
        Add Book
      </button>
    </form>
  );
}

export default Form;
