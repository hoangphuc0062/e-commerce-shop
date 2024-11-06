/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import BannerService from "../../services/barnner";

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

export const getBanners = createAsyncThunk(
  "banners/getBanners",
  async (payload, thunkAPI) => {
    return handleAsyncThunk(BannerService.getBanners, [], thunkAPI);
  }
);

const bannerSlice = createSlice({
  name: "banners",
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
      .addCase(getBanners.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default bannerSlice.reducer;
export const { bannerActions } = bannerSlice.actions;
