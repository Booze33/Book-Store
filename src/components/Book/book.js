/* eslint-disable no-nested-ternary */
/* eslint-disable no-else-return */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { fetchBooks, deleteBook } from '../../redux/books/bookSlice';
import { fetchCategories } from '../../redux/category/categorySlice';
import Loader from '../Loader/loader';
import 'react-circular-progressbar/dist/styles.css';
import './book.css';

function Book() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const categories = useSelector((state) => state.categories.categories);
  const isLoadingBooks = useSelector((state) => state.books.isLoading);
  const isLoadingCategories = useSelector((state) => state.categories.isLoading);
  const isErrorBooks = useSelector((state) => state.books.isError);
  const isErrorCategories = useSelector((state) => state.categories.isError);
  const [progressValues, setProgressValues] = useState(() => {
    const storedProgressValues = JSON.parse(localStorage.getItem('progressValues')) || {};
    return storedProgressValues;
  });

  const handleButtonClick = (bookId) => {
    setProgressValues((prevProgress) => ({
      ...prevProgress,
      [bookId]: (prevProgress[bookId] || 0) + 5,
    }));
  };

  const handleResetClick = (bookId) => {
    setProgressValues((prevProgress) => {
      const updatedProgress = { ...prevProgress };
      delete updatedProgress[bookId];
      return updatedProgress;
    });
  };

  const getColor = (progress) => {
    if (progress < 40) {
      return '#ff0000';
    } else if (progress < 70) {
      return '#ffa500';
    } else {
      return '#0290ff';
    }
  };

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('progressValues', JSON.stringify(progressValues));
  }, [progressValues]);

  const handleDelete = async (bookId) => {
    try {
      await dispatch(deleteBook(bookId));
      toast.success('Book Deleted!');
      dispatch(fetchBooks());
    } catch (error) {
      toast.error('Failed to delete the book.');
    }
  };

  const confirmDelete = (bookId) => {
    const result = window.confirm('Are you sure you want to delete this book?');
    if (result) {
      handleDelete(bookId);
    }
  };

  return (
    <div>
      {(isLoadingBooks || isLoadingCategories) ? (
        <Loader />
      ) : (isErrorBooks || isErrorCategories) ? (
        <p>Error loading data.</p>
      ) : (
        <section className="book-page">
          {books.map((book) => {
            const category = categories.find((c) => c.id === book.category_id);
            const progress = progressValues[book.id] || 0;

            return (
              <div key={book.id} className="book-con">
                <div>
                  <h3 className="category">{category ? category.name : 'Uncategorized'}</h3>
                  <h2 className="title">{book.title}</h2>
                  <h4 className="author">{book.author}</h4>
                  <div className="book-links">
                    <p className="book-btn">
                      Comment
                    </p>
                    <button className="book-btn" type="button" onClick={() => confirmDelete(book.id)}>
                      Delete
                    </button>
                    <Link className="book-btn" to={`/edit_book/${book.id}`}>
                      Edit
                    </Link>
                  </div>
                </div>
                <div className="p-con">
                  <div className="circular-progress-bar">
                    <CircularProgressbar
                      value={progress}
                      className="progress-label"
                      text={`${progress}%`}
                      styles={buildStyles({
                        pathColor: getColor(progress),
                        textColor: getColor(progress),
                      })}
                    />
                  </div>
                </div>
                <div className="last-div">
                  <p className="current-chapter">CURRENT CHAPTER</p>
                  <h5 className="chapter">Chapter 17</h5>
                  <div>
                    <button className="progress-btn" type="button" onClick={() => handleButtonClick(book.id)}>Update Progress</button>
                    <button className="progress-btn" type="button" onClick={() => handleResetClick(book.id)}>Reset</button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}

export default Book;
