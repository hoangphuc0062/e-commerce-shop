/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import OrderService from "../../services/order.service";

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

export const createOrder = createAsyncThunk(
  "order/createOrder",
  (data, thunkAPI) =>
    handleAsyncThunk(OrderService.createOrder, [data], thunkAPI)
);

export const vnPay = createAsyncThunk("order/vnPay", (data, thunkAPI) =>
  handleAsyncThunk(OrderService.vnPay, [data], thunkAPI)
);

export const vnPAYReturn = createAsyncThunk(
  "order/vnPAYReturn",
  (data, thunkAPI) =>
    handleAsyncThunk(OrderService.returnOrder, [data], thunkAPI)
);

// sendMail

export const sendMail = createAsyncThunk("order/sendMail", (data, thunkAPI) =>
  handleAsyncThunk(OrderService.sendMail, [data], thunkAPI)
);
const orderSlice = createSlice({
  name: "order",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    statusVNPay: "idle",
    statusReturn: "idle",
    statusSendMail: "idle",
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
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(vnPay.pending, (state) => {
        state.statusVNPay = "loading";
      })
      .addCase(vnPay.fulfilled, (state, action) => {
        state.statusVNPay = "success";
        state.data = action.payload;
      })
      .addCase(vnPay.rejected, (state, action) => {
        state.statusVNPay = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(vnPAYReturn.pending, (state) => {
        state.statusReturn = "loading";
      })
      .addCase(vnPAYReturn.fulfilled, (state, action) => {
        state.statusReturn = "success";
        state.data = action.payload;
      })
      .addCase(vnPAYReturn.rejected, (state, action) => {
        state.statusReturn = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(sendMail.pending, (state) => {
        state.statusSendMail = "loading";
      })
      .addCase(sendMail.fulfilled, (state, action) => {
        state.statusSendMail = "success";
        state.data = action.payload;
      })
      .addCase(sendMail.rejected, (state, action) => {
        state.statusSendMail = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
export const { resetOrderState } = orderSlice.actions;
