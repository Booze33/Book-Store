/* eslint-disable no-useless-catch */
import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

// API function for user registration
export const registerUserAPI = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/registrations`, { user: userData });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API function for user login
export const loginUserAPI = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/sign_in`, { user: credentials });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// API function for user logout
export const logoutUserAPI = async () => {
  try {
    const response = await axios.delete(`${BASE_URL}/sessions/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
