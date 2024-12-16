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

export const getProductsBySearch = createAsyncThunk(
  "products/getProductsBySearch",
  async (params, thunkAPI) => {
    return handleAsyncThunk(
      () => ProductServices.getProducts(params),
      [],
      thunkAPI
    );
  }
);

export const getProductBySlug = createAsyncThunk(
  "products/getProductBySlug",
  async (slug, thunkAPI) => {
    return handleAsyncThunk(
      () => ProductServices.getProductBySlug(slug),
      [],
      thunkAPI
    );
  }
);

export const compareProduct = createAsyncThunk(
  "products/compareProduct",
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        products: { slugs },
      } = getState(); // Lấy danh sách slugs từ state
      const response = await ProductServices.compareProduct({ slugs });
      return response;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    dataDetail: [],
    dataSearch: [],
    loading: false,
    error: null,
    status: "idle",
    statusDetail: "idle",
    statusSearch: "idle",
    compareProducts: [],
    slugs: [],
  },
  reducers: {
    addSlug(state, action) {
      if (!state.slugs.includes(action.payload)) {
        state.slugs.push(action.payload);
      }
    },
    removeSlug(state, action) {
      state.slugs = state.slugs.filter((slug) => slug !== action.payload);
    },
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
    builder
      .addCase(getProductBySlug.pending, (state) => {
        state.loading = true;
        state.statusDetail = "loading";
      })
      .addCase(getProductBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.dataDetail = action.payload;
        state.statusDetail = "success";
      })
      .addCase(getProductBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.statusDetail = "failed";
      });
    builder
      .addCase(getProductsBySearch.pending, (state) => {
        state.loading = true;
        state.statusSearch = "loading";
      })
      .addCase(getProductsBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.dataSearch = action.payload;
        state.statusSearch = "success";
      })
      .addCase(getProductsBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.statusSearch = "failed";
      });
    builder
      .addCase(compareProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(compareProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(compareProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;

export const { addSlug, removeSlug } = productSlice.actions;
export const { setProducts } = productSlice.actions;
