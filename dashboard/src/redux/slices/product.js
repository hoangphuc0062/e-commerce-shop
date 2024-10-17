/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import ProductService from "../../services/product.service";

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

// get product

export const getProduct = createAsyncThunk(
  "product/getProduct",
  (_, thunkAPI) => handleAsyncThunk(ProductService.getAll, [null], thunkAPI)
);

// delete product

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  (id, thunkAPI) => handleAsyncThunk(ProductService.delete, [id], thunkAPI)
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    statusDelete: "idle",
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
      .addCase(getProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.statusDelete = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.statusDelete = "success";
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.statusDelete = "failed";
      });
  },
});

export default productSlice.reducer;
export const { resetProduct } = productSlice.actions;
