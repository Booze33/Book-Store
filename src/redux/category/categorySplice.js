import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: 'Under Construction',
};

const categoriesSlice = createSlice({
  name: 'Categories',
  initialState,
  reducers: {
    checkStatus: (state, action) => ({
      ...state,
      categories: action.payload === 'Under construction'
        ? 'Under construction'
        : state.categories,
    }),
  },
});

export const { checkStatus } = categoriesSlice.actions;
export default categoriesSlice.reducers;
