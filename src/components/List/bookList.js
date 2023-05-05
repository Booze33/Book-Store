import React, { useState } from "react";
import Book from "../Book/book";

function BookList() {
    const booksArr = [
      {
        id: 1,
        title: 'Swamp of Ducks',
        author: 'Jack Blue',
      },
      {
        id: 2,
        title: 'First sight Kill',
        author: 'Robin Jane',
      },
      {
        id: 3,
        title: 'Crashsite Camp',
        author: 'John COD',
      },
    ];
    const [books] = useState(booksArr);
    return (
        <>
          <div>
            <h1 className="h1">List of Books</h1>
            {books.map((book) => (<Book key={book.id} title={book.title} author={book.author} onDelete={() => onDelete(book.id)} />))}
          </div>
        </>
      );
    };

export default BookList;
