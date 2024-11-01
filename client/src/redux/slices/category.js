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

// get category
export const getCategory = createAsyncThunk(
  "category/getCategory",
  (_, thunkAPI) => handleAsyncThunk(CategoryService.getAll, [null], thunkAPI)
);
export const GetBySlug = createAsyncThunk("category/getBySlug", (slug, thunkAPI) =>
  handleAsyncThunk(CategoryService.getBySlug, [slug], thunkAPI)
);

const category = createSlice({
  name: "category",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    mes: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetState.fulfilled, (state, action) => {
        if (action.payload) {
          const { key, value } = action.payload;
          if (key && value !== undefined) {
            state[key] = value;
          }
        }
      })
      .addCase(getCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export default category.reducer;
export const { resetCategory } = category.actions;
