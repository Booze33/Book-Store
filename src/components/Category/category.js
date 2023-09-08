/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/category/categorySlice';
import Loader from '../Loader/loader';
import './category.css';

function Category() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const isLoading = useSelector((state) => state.categories.isLoading);
  const isError = useSelector((state) => state.categories.isError);

  useEffect(() => {
    // Dispatch the fetchCategories action to retrieve categories
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="category-con">
      <h1 className="category-h1">Categories</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p>Error loading categories.</p>
      ) : (
        <div>
          {categories.map((category) => (
            <h2 key={category.id} className="category-h2">{category.name}</h2>
          ))}
        </div>
      )}
    </div>
  );
}

export default Category;
