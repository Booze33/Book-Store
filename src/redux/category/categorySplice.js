import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: 'Under Construction',
};

const categoriesSlice = createSlice({
  name: 'Categories',
  initialState,
  reducers: {},
});

export default categoriesSlice.reducers;
