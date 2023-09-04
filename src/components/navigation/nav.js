/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineMenuBook } from 'react-icons/md';
import { logoutUser } from '../../redux/auth/authAction';
import './nav.css';

function Nav() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);
  const body = document.querySelector('body');

  const closeSideMenu = () => {
    setSideMenuOpen(false);
    body.classList.remove('active');
  };

  const handleNav = () => {
    setSideMenuOpen(!isSideMenuOpen);
    body.classList.toggle('active');
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <header>
        <div className="nav-container">
          <h1 className="h1">BookStore CMS</h1>
        </div>
        <div className="nav-con-1">
          <MdOutlineMenuBook className="nav-menu" onClick={handleNav} />
        </div>
        <div className="nav-con-2">
          {isAuthenticated && (
            <nav>
              <Link className="nav-link" to="/books">
                Books
              </Link>
              <Link className="nav-link" to="/categories">
                Categories
              </Link>
            </nav>
          )}
        </div>
        <div className="nav-con">
          {!isAuthenticated && (
            <div>
              <button className="nav-btn" type="button">
                <Link to="/sign_up" className="navAnchor" onClick={handleNav}>
                  Sign Up
                </Link>
              </button>

              <button className="nav-btn" type="button">
                <Link to="/login" className="navAnchor" onClick={handleNav}>
                  Login
                </Link>
              </button>
            </div>
          )}
          {isAuthenticated && (
            <div className="nav-ul">
              <button className="nav-btn" type="button">
                <Link
                  to={'/'}
                  className="navAnchor"
                  onClick={() => {
                    handleLogout();
                    handleNav();
                  }}
                >
                  Logout
                </Link>
              </button>
            </div>
          )}
        </div>
      </header>
      <div className="mobile-nav">
        {isSideMenuOpen && (
          <div className="side-menu">
            <div className="nav-con-2-slide">
              {isAuthenticated && (
                <nav>
                  <Link className="nav-link" to="/books" onClick={closeSideMenu}>
                    Books
                  </Link>
                  <Link className="nav-link" to="/categories" onClick={closeSideMenu}>
                    Categories
                  </Link>
                </nav>
              )}
            </div>
            <div className="nav-con-slide">
              {!isAuthenticated && (
                <div className="nav-ul">
                  <button className="nav-btn" type="button">
                    <Link to="/sign_up" className="navAnchor" onClick={handleNav}>
                      Sign Up
                    </Link>
                  </button>

                  <button className="nav-btn" type="button">
                    <Link to="/login" className="navAnchor" onClick={handleNav}>
                      Login
                    </Link>
                  </button>
                </div>
              )}
              {isAuthenticated && (
                <div className="nav-ul">
                  <button className="nav-btn" type="button">
                    <Link
                      to={'/'}
                      className="navAnchor"
                      onClick={() => {
                        handleLogout();
                        handleNav();
                      }}
                    >
                      Logout
                    </Link>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Nav;
