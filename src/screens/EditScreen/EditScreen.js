import React from "react";
import { Form, Field } from "react-final-form";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBook, updateBook } from "../../state/books/booksActions";
import { clearErrors } from "../../state/books/booksSlice";
export default function EditScreen() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.books);
  const navigate = useNavigate();
  const { state: routeState } = useLocation();
  const { slug } = useParams();
  const [initialValues, setInitialValues] = React.useState({
    title: "",
    author: "",
    language: "",
    link: "",
    country: "",
    pages: "",
    year: "",
  });
  React.useEffect(() => {
    dispatch(clearErrors());
  }, [dispatch, slug]);
  React.useEffect(() => {
    if (slug !== "new") {
      setInitialValues({
        title: routeState?.title,
        year: routeState?.year,
        author: routeState?.author,
        language: routeState?.language,
        country: routeState?.country,
        link: routeState?.link,
        pages: routeState?.pages,
      });
    }
  }, [routeState, slug]);

  let type = "new";
  if (!slug) {
    return <Navigate to="/book/new" />;
  }
  if (slug !== "new") {
    type = "edit";
  }
  if (type === "edit") {
    if (!routeState?.title) {
      return <Navigate to="/book/new" />;
    }
  }
  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Required";
    }
    if (!values.author) {
      errors.author = "Required";
    }

    return errors;
  };

  const onSubmit = async (values) => {
    if (type === "new") {
      await dispatch(createBook({ values }));
    } else {
      await dispatch(updateBook({ ...values, _id: slug }));
    }
  };
  if (state.createBookSuccess || state.updateBookSuccess) {
    dispatch(clearErrors());
    return navigate("/search");
  }
  const renderAsterisk = () => <span className="text-red-500">*</span>;
  if (type === "edit" && state.fetchBookLoading) {
    return (
      <div className="text-center my-4 mx-2">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
  if (state.fetchBookError) {
    return (
      <div>
        <p className="text-red-500 my-4 mx-2">
          Something went wrong while fetching the book
        </p>
      </div>
    );
  }
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit} validate={validate}>
      {({ handleSubmit, submitting }) => (
        <form
          onSubmit={handleSubmit}
          className=" text-left max-w-md mx-auto mt-8
         bg-gray  rounded px-8 pt-6 pb-8 mb-4 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]"
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Title {renderAsterisk()}
            </label>
            <Field
              name="title"
              component="input"
              type="text"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-gray-700 font-bold mb-2"
            >
              Author {renderAsterisk()}
            </label>
            <Field
              name="author"
              component="input"
              type="text"
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-gray-700 font-bold mb-2"
            >
              Country
            </label>
            <Field
              name="country"
              component="input"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="language"
              className="block text-gray-700 font-bold mb-2"
            >
              Language
            </label>
            <Field
              name="language"
              component="input"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="link"
              className="block text-gray-700 font-bold mb-2"
            >
              Link
            </label>
            <Field
              name="link"
              component="input"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="pages"
              className="block text-gray-700 font-bold mb-2"
            >
              Pages
            </label>
            <Field
              name="pages"
              component="input"
              type="number"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="year"
              className="block text-gray-700 font-bold mb-2"
            >
              Year
            </label>
            <Field
              name="year"
              component="input"
              type="number"
              className="w-full p-2 border rounded"
            />
          </div>
          {type === "new" && state.createBookError && (
            <p className="text-red-500 text-center px-2 py-2">
              Something went wrong, please try again.
            </p>
          )}
          {type === "edit" && state.updateBookError && (
            <p className="text-red-500 text-center px-2 py-2">
              Something went wrong, please try again.
            </p>
          )}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
              disabled={state.createBookLoading || state.updateBookLoading}
            >
              {type === "new" ? "Add Book" : "Update Book"}
            </button>
          </div>
        </form>
      )}
    </Form>
  );
}
