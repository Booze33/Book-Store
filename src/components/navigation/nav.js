import React from "react";
import { Link } from 'react-router-dom';
import './nav.css';

function Nav() {
  return (
    <header>
      <h1 className="h1">BookStore CMS</h1>
      <nav>
        <button>
          <Link className="button" to="/">Books</Link>
        </button>
        <button>
          <Link className="button" to="/categories">Categories</Link>
        </button>
      </nav>
    </header>
  )
}

export default Nav;
