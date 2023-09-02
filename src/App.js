import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Nav from './components/navigation/nav';
import Category from './components/Category/category';
import Books from './components/Display/display';
import Welcome from './components/Welcome/welcome';
import Register from './components/auth/register';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/books" element={<Books />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/sign_up" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
