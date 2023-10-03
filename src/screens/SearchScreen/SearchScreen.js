import React from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResults from "../../components/SearchResults/SearchResults.js";
import { useDispatch, useSelector } from "react-redux";
import { booksFetch } from "../../state/books/booksActions";

export default function SearchScreen() {
  const state = useSelector((state) => state.books);
  const { fetchBooksError, fetchBooksLoading } = state;
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const query = searchParams.get("title") || "";
  const sortBy = searchParams.get("DIR") || "";
  const page = searchParams.get("page") || "";
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchSortBy, setSearchSortBy] = React.useState("");
  const [searchPage, setSearchPage] = React.useState(1);

  React.useEffect(() => {
    setSearchQuery(query);
    setSearchSortBy(sortBy);
    setSearchPage(page);
    let qQuery = query && query !== "null" ? query : "";
    let sortByQuery = sortBy && sortBy !== "null" ? sortBy : "";
    let pageQuery = page && page !== "null" ? page : 1;
    setSearchParams(
      new URLSearchParams({
        title: qQuery,
        DIR: sortByQuery,
        page: pageQuery,
      }).toString()
    );
  }, [query, sortBy, page, setSearchParams]);

  const setSearchParamsFunc = (params) => {
    let qQuery = query && query !== "null" ? query : "";
    let sortByQuery = sortBy && sortBy !== "null" ? sortBy : "";
    let pageQuery = page && page !== "null" ? page : 1;
    const str = new URLSearchParams({
      title: qQuery,
      DIR: sortByQuery,
      page: pageQuery,
      ...params,
    }).toString();
    setSearchParams(str);
  };
  const fetch = React.useCallback(
    (query) => {
      dispatch(booksFetch(query));
    },
    [dispatch]
  );
  React.useEffect(() => {
    fetch({ title: query, DIR: sortBy, page: page });
  }, [fetch, page, sortBy, query, dispatch]);

  return (
    <div className="  ">
      <SearchBar
        searchQuery={searchQuery}
        searchSortBy={searchSortBy}
        searchPage={searchPage}
        setSearchParamsFunc={setSearchParamsFunc}
      />
      {fetchBooksError && (
        <div className="mt-12 text-red-600">
          Error fetching books, Please try again.
        </div>
      )}
      {fetchBooksLoading ? (
        <div className="mt-12">Loading...</div>
      ) : (
        <SearchResults
          searchPage={searchPage}
          setSearchParamsFunc={setSearchParamsFunc}
          state={state}
        />
      )}
    </div>
  );
}
