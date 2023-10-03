import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const booksFetch = createAsyncThunk(
  "books/booksFetch",
  async (params, { rejectWithValue, getState }) => {
    try {
      const { data } = await axios.get(
        `http://68.178.162.203:8080/application-test-v1.1/books?${new URLSearchParams(
          params
        ).toString()}`
      );

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createBook = createAsyncThunk(
  "books/createBook",
  async (params, { getState, rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `http://68.178.162.203:8080/application-test-v1.1/books`,
        {
          ...params.values,
        }
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const updateBook = createAsyncThunk(
  "books/updateBook",
  async (params, { getState, rejectWithValue }) => {
    try {
      const { _id, ...rest } = params;
      const { data } = await axios.put(
        `http://68.178.162.203:8080/application-test-v1.1/books/${_id}`,

        { ...rest }
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
