/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-boolean-value */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addBook } from '../../redux/books/bookSlice';
import { fetchCategories } from '../../redux/category/categorySlice';

function BookForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      author: '',
      category_id: '',
    },
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const onSubmit = (formData) => {
    dispatch(addBook(formData)).then(() => {
      setValue('title', '');
      setValue('author', '');
      setValue('category_id', '');
      toast.success('Book added successfully!');
      navigate('/book');
    });
  };

  return (
    <div className="formCont">
      <form className="bookForm" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="formTitle">Test Drive</h2>
        <p className="formDesc">
          Book your test drive today for a chance to experience the excitement
          of driving a supercar! We&rsquo;ll get in touch with you to confirm
          your reservation and make it happen.
        </p>
        <div className="inputCont">
          <input
            required={true}
            type="text"
            name="title"
            placeholder="title"
            {...register('title', { required: true })}
            className="formInput"
          />
          <input
            required={true}
            type="text"
            name="author"
            placeholder="Author"
            {...register('author', { required: true })}
            className="formInput"
          />
          <select
            required={true}
            name="category_id"
            {...register('category_id', { required: true })}
            className="formInput formSelect"
          >
            <option className="carSelector" value="">
              Select a vehicle
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id} className="carSelector">
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && <span>Select Vehicle Model</span>}
        </div>
        <button type="submit" className="reservationSubmit">
          Book Reservation
        </button>
      </form>
    </div>
  );
}

export default BookForm;
