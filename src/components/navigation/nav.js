import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

function Nav() {
  return (
    <header>
      <h1 className="h1">BookStore CMS</h1>
      <nav>
        <button className="button-2" type="button">
          <Link className="nav-button" to="/">Books</Link>
        </button>
        <button className="button-2" type="button">
          <Link className="nav-button" to="/categories">Categories</Link>
        </button>
      </nav>
    </header>
  );
}

export default Nav;
