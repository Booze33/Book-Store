/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-boolean-value */
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../redux/auth/authAction';

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
      <div className="formCont registrationFormCont">
        <form className="registrationForm" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="formTitle">Registration</h2>

          <div className="inputsCont">
            <div className="inputCont">
              <input
                required={true}
                type="text"
                name="name"
                placeholder="Full Name"
                className="formInput"
                {...register('name', { required: true })}
              />

              <input
                required={true}
                type="email"
                name="email"
                placeholder="E-mail"
                className="formInput"
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
                className="formInput"
                {...register('password', { required: true })}
              />

              <input
                required={true}
                type="password"
                name="password_confirmation"
                placeholder="Password Confirmation"
                className="formInput"
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
          <div className="formHelper registrationHelper">
            <p className="helperText">Already have an account?</p>
            <a className="helperLink" href="/login">Login</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
