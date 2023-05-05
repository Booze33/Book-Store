import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Nav from './components/navigation/nav';
import Category from './components/Category/category';
import Books from './components/Display/display';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/categories" element={<Category />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
