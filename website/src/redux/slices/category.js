/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import CategoryService from "../../services/category.service";

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};

export const resetState = createAsyncThunk(
  "state/resetState",
  async (payload, thunkAPI) => {
    return payload;
  }
);

export const getAll = createAsyncThunk("category/getAll", (_, thunkAPI) =>
  handleAsyncThunk(CategoryService.getAll, [null], thunkAPI)
);

export const getCategoryBySlug = createAsyncThunk(
  "category/getBySlug",
  (slug, thunkAPI) =>
    handleAsyncThunk(CategoryService.getBySlug, [slug], thunkAPI)
);
const category = createSlice({
  name: "category",

  initialState: {
    data: [],
    status: "idle",
    error: null,
    statusCategoryBySlug: "idle",
  },
  extraReducers: (builder) => {
    builder.addCase(resetState.fulfilled, (state, action) => {
      if (action.payload) {
        const { key, value } = action.payload;
        if (key && value !== undefined) {
          state[key] = value;
        }
      }
    });
    builder
      .addCase(getAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })

      .addCase(getAll.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(getCategoryBySlug.pending, (state) => {
        state.statusCategoryBySlug = "loading";
      })
      .addCase(getCategoryBySlug.fulfilled, (state, action) => {
        state.statusCategoryBySlug = "success";
        state.data = action.payload;
      })
      .addCase(getCategoryBySlug.rejected, (state, action) => {
        state.statusCategoryBySlug = "failed";
        state.error = action.payload;
      });
  },
});

export default category.reducer;
export const { categoryActions } = category.actions;
