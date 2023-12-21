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
import './bookForm.css';

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
        <h2 className="formTitle">Edit book</h2>
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
          Update Book
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

export default EditBook;
