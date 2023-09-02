import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/auth/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    try {
      await dispatch(registerUser(formData));
      // If registration is successful (status is 'succeeded'), redirect to the home page
      if (authStatus === 'succeeded') {
        navigate('/books');
      }
    } catch (error) {
      // Handle errors if needed
    }
  };

  useEffect(() => {
    // If the user is already authenticated, redirect them to the home page
    if (authStatus === 'succeeded') {
      navigate('/books');
    }
  }, [authStatus, navigate]);

  return (
    <div>
      <h2>Register</h2>
      <form>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          value={formData.password_confirmation}
          onChange={handleInputChange}
        />
        <button onClick={handleRegister} type="button">Register</button>
      </form>
      {authStatus === 'failed' && <p>Error: {authError}</p>}
    </div>
  );
};

export default Register;
