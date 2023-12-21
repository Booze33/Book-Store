/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-boolean-value */
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../redux/auth/authAction';
import './auth.css';

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
  } = useForm();

  const onSubmit = (formData) => {
    dispatch(registerUser(formData));
    navigate('/books');
  };

  return (
    <>
      <div className="registrationFormCont">
        <form className="registrationForm" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="auth-formTitle">Registration</h2>
          <div className="inputsCont">
            <div className="auth-inputCont">
              <input
                required={true}
                type="text"
                name="name"
                placeholder="Full Name"
                className="auth-formInput"
                {...register('name', { required: true })}
              />

              <input
                required={true}
                type="email"
                name="email"
                placeholder="E-mail"
                className="auth-formInput"
                {...register('email', { required: true })}
              />
            </div>
            <div className="divider" />
            <div className="inputCont inputCont2">
              <input
                required={true}
                type="password"
                name="password"
                placeholder="Password"
                className="auth-formInput"
                {...register('password', { required: true })}
              />

              <input
                required={true}
                type="password"
                name="password_confirmation"
                placeholder="Password Confirmation"
                className="auth-formInput"
                {...register('password_confirmation', {
                  required: true,
                  validate: (value) =>
                    value === getValues('password') || 'Passwords do not match',
                })}
              />
            </div>
            <div className="divider divider2" />
          </div>
          <button className="registrationSubmit" type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Registration;
