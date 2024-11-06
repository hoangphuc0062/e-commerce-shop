import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import ProductServices from "../../services/product.service";

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

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (params, thunkAPI) => {
    return handleAsyncThunk(
      () => ProductServices.getProducts(params),
      [],
      thunkAPI
    );
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    loading: false,
    error: null,
    status: "idle",
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
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default productSlice.reducer;
export const { setProducts } = productSlice.actions;
