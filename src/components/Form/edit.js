/* eslint-disable no-unused-vars */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-boolean-value */
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { editBook, fetchBooks } from '../../redux/books/bookSlice';
import { fetchCategories } from '../../redux/category/categorySlice';

function EditBook() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const { bookId } = useParams();

  const selectedBook = useSelector((state) =>
    state.books.books.find((b) => b.id === bookId),
  );

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

  useMemo(() => {
    if (selectedBook) {
      setValue('title', selectedBook.title);
      setValue('author', selectedBook.author);
      setValue('category_id', selectedBook.category_id);
    }
  }, [selectedBook, setValue]);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBooks());
  }, [dispatch]);

  const onSubmit = (formData) => {
    const editedBook = { ...formData, id: bookId };
    dispatch(editBook(editedBook)).then(() => {
      toast.success('Book edited successfully!');
      navigate('/books');
    });
  };

  return (
    <div className="formCont">
      <form className="bookForm" onSubmit={handleSubmit(onSubmit)}>
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
          Update Book
        </button>
      </form>
    </div>
  );
}

export default EditBook;
