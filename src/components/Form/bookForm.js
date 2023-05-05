import React, { useState } from "react";
import './bookForm.css';

function Form ({onSubmit}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  function HandleSubmit(e) {
    e.preventDefault();

    onSubmit(title, author);
  }

  return (
    <form onSubmit={HandleSubmit}>
      <label>
        <input className="title-1" type="text" placeholder="Title" value={title} onChange={(event) => setTitle(event.target.value)} />
      </label>
      <label>
        <input className="author-1" type="text" placeholder="Author" value={author} onChange={(event) => setAuthor(event.target.value)} />
      </label>
      <button type="submit" className="button">Add Book</button>
    </form>
  )
}

export default Form;
