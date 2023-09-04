/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-props-no-spreading */
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/auth/authAction';

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
      <section className="formCont loginFormCont">
        <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="formTitle">Login</h1>
          <div className="inputCont">
            <input
              className="formInput"
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
              className="formInput"
              type="password"
              name="password"
              placeholder="Password"
              required={true}
              {...register('password', { required: 'Password is required' })}
            />
          </div>
          <div className="divider" />
          <button className="loginSubmit" type="submit">Login</button>
          <div className="formHelper loginHelper">
            <p className="helperText">Don&rsquo;t have an account?</p>
            <a className="helperLink" href="/register">Register</a>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
