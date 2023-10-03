import React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchResults({
  state,
  searchPage,
  setSearchParamsFunc,
}) {
  const { books } = state;
  const navigate = useNavigate();
  const totalPages = books?.pagination?.totalPages || 0;
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const onEdit = (id, book) => {
    navigate(`/book/${id}`, { state: book });
  };
  return (
    <div className=" my-6 mx-auto py-4 ">
      {books?.data?.length === 0 && <div>No books found</div>}
      <div className="flex flex-wrap gap-4 mx-8 mt-12 justify-center sm:justify-start">
        {books?.data?.map((book) => {
          return (
            <div
              key={book.id}
              className="w-80 rounded overflow-hidden shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] px-8 pt-6 pb-8 mb-4"
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{book.title}</div>
                <p className="text-gray-700 text-base">{book.author}</p>
                <a
                  href={book.link}
                  rel="noreferrer"
                  target="_blank"
                  className="text-blue-700 text-base"
                >
                  Link
                </a>
              </div>
              <div className="px-6 py-4 flex items-center justify-between">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {book.language || "Other"}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  Year: {book.year || ""}
                </span>
              </div>
              <div className="px-6 py-4">
                <button
                  onClick={() => onEdit(book.id, book)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Edit Book
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <nav className="bg-white px-4  mt-8 py-3 flex items-center justify-center sm:px-6 ">
        <div className="flex-1 flex items-center justify-center sm:justify-end ">
          <span className=" z-0 inline-flex items-center px-4 py-2 round text-sm font-medium text-gray-700">
            Page {searchPage} of {totalPages}
          </span>
          <span className="relative z-0 inline-flex align-middle">
            {searchPage > 1 && (
              <button
                onClick={() =>
                  setSearchParamsFunc({ page: Number(searchPage) - 1 })
                }
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                Previous
              </button>
            )}
            {/* {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() =>
                  setSearchParamsFunc({ page: Number(pageNumber) })
                }
                className={
                  Number(searchPage) === pageNumber
                    ? "z-10  bg-indigo-50 border-indigo-500 text-indigo-600 hover:bg-indigo-50 mx-3 rounded-3xl p-2"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 mx-3  rounded-3xl p-2"
                }
              >
                {pageNumber}
              </button>
            ))} */}
            {searchPage < totalPages && (
              <button
                onClick={() =>
                  setSearchParamsFunc({ page: Number(searchPage) + 1 })
                }
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                Next
              </button>
            )}
          </span>
        </div>
      </nav>
    </div>
  );
}
