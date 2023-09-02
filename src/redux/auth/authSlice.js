import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserAPI, registerUserAPI, logoutUserAPI } from './api_url';

// Define initial state
const initialState = {
  user: null,
  status: 'idle',
  error: null,
};

// Create async thunks for registration, login, and logout
export const registerUser = createAsyncThunk('auth/register', async (userData) => {
  const response = await registerUserAPI(userData);
  console.log(response);
  return response.data;
});

export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
  const response = await loginUserAPI(credentials);
  console.log(response);
  return response.data;
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await logoutUserAPI();
});

// Create the authentication slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
