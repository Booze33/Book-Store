/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-props-no-spreading */
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/auth/authAction';
import './auth.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    dispatch(loginUser(formData));
    navigate('/');
  };

  return (
    <>
      <section className="registrationFormCont">
        <form className="registrationForm" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="auth-formTitle">Login</h1>
          <div className="auth-inputCont">
            <input
              className="auth-formInput"
              type="email"
              name="email"
              placeholder="Email Address"
              required={true}
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}

            <input
              className="auth-formInput"
              type="password"
              name="password"
              placeholder="Password"
              required={true}
              {...register('password', { required: 'Password is required' })}
            />
          </div>
          <div className="divider" />
          <button className="registrationSubmit" type="submit">Login</button>
        </form>
      </section>
    </>
  );
};

export default Login;
