/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import CouponService from "../../services/coupon.sercice";
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

// get all coupon

export const getAllCoupon = createAsyncThunk(
  "coupon/getAllCoupon",
  (_, thunkAPI) => handleAsyncThunk(CouponService.getAll, [null], thunkAPI)
);

// create coupon
export const createCoupon = createAsyncThunk(
  "coupon/createCoupon",
  (data, thunkAPI) =>
    handleAsyncThunk(CouponService.createCoupon, [data], thunkAPI)
);

const coupon = createSlice({
  name: "coupon",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    statusCreate: "idle",
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
      .addCase(getAllCoupon.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCoupon.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getAllCoupon.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    builder
      .addCase(createCoupon.pending, (state) => {
        state.statusCreate = "loading";
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.statusCreate = "success";
        state.data.push(action.payload);
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.statusCreate = "failed";
        state.error = action.payload;
      });
  },
});

export default coupon.reducer;
export const { resetCouponState } = coupon.actions;
