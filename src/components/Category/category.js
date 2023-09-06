/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/category/categorySlice';
import Loader from '../Loader/loader';

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
    <div>
      <h1>Categories</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p>Error loading categories.</p>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Category;
