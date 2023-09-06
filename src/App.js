import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Nav from './components/navigation/nav';
import Category from './components/Category/category';
import Book from './components/Book/book';
import Welcome from './components/Welcome/welcome';
import BookForm from './components/Form/bookForm';
import Register from './components/auth/register';
import Login from './components/auth/login';
import EditBook from './components/Form/edit';
import { authSuccess } from './redux/auth/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      dispatch(authSuccess({ token: storedToken, user: storedUser }));
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/books" element={<Book />} />
          <Route path="/book_form" element={<BookForm />} />
          <Route path="/edit_book/:bookId" element={<EditBook />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/sign_up" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
