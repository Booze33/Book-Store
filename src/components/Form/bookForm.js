/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-boolean-value */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addBook } from '../../redux/books/bookSlice';
import { fetchCategories } from '../../redux/category/categorySlice';
import './bookForm.css';

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
      navigate('/books');
    });
  };

  return (
    <div className="formCont">
      <form className="bookForm" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="formTitle">Add Book</h2>
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
              Select Genre
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id} className="carSelector">
                {category.name}
              </option>
            ))}
          </select>
          {errors.category_id && <span>Select Genre</span>}
        </div>
        <button type="submit" className="book-Submit">
          Add Book
        </button>
      </form>
      <div className="book-sec">
        <div className="overlay" />
        <p className="book-p">
          Books are more than just pages filled with text; they are vessels of knowledge,
          emotion, and imagination. They have the power to transport us to distant lands,
          to introduce us to characters who become our friends,
          and to spark the flames of creativity and empathy within us.
          Each book we read is a new adventure, a new opportunity to learn,
          grow, and explore the infinite possibilities of the human experience.
        </p>
      </div>
    </div>
  );
}

export default BookForm;
