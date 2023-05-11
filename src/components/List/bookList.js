import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Book from '../Book/book';
import { fetchBooks, DeleteBook } from '../../redux/books/bookSplice';

function BookList() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(DeleteBook(id));
  };

  return (
    <>
      <div>
        <h1 className="h1">List of Books</h1>
        {Array.isArray(books) && books.length > 0
          ? books.map((book) => (
            <Book
              key={book.item_id}
              id={book.item_id}
              title={book.title}
              author={book.author}
              onDelete={() => handleDelete(book.item_id)}
            />
          ))
          : <p>No books to display</p>}
      </div>
    </>
  );
}

export default BookList;
