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

// get orrders
export const getAll = createAsyncThunk("orders/getAllOrder", (_, thunkAPI) =>
  handleAsyncThunk(OrderService.getAll, [null], thunkAPI)
);
// update orders
export const update = createAsyncThunk(
  "orders/updateStatus",
  ({ orderId, data }, thunkAPI) =>
    handleAsyncThunk(OrderService.update, [orderId, data], thunkAPI)
);

export const createInStoreOrder = createAsyncThunk(
  "orders/createInStoreOrder",
  (data, thunkAPI) => handleAsyncThunk(OrderService.create, [data], thunkAPI)
);

export const VnPay = createAsyncThunk("orders/VnPay", (data, thunkAPI) =>
  handleAsyncThunk(OrderService.VnPay, [data], thunkAPI)
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  (orderId, thunkAPI) =>
    handleAsyncThunk(OrderService.delete, [orderId], thunkAPI)
);

const orders = createSlice({
  name: "orders",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    statusUpdate: "idle",
    statusCreate: "idle",
    statusVnPay: "idle",
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
      })
      .addCase(update.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(update.fulfilled, (state, action) => {
        state.updateStatus = "success";
        state.post = action.payload;
      })
      .addCase(update.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      })
      .addCase(createInStoreOrder.pending, (state) => {
        state.statusCreate = "loading";
      })
      .addCase(createInStoreOrder.fulfilled, (state, action) => {
        state.statusCreate = "success";
        state.data = action.payload;
      })
      .addCase(createInStoreOrder.rejected, (state, action) => {
        state.statusCreate = "failed";
        state.error = action.payload;
      })
      .addCase(VnPay.pending, (state) => {
        state.statusVnPay = "loading";
      })
      .addCase(VnPay.fulfilled, (state, action) => {
        state.statusVnPay = "success";
        state.data = action.payload;
      })
      .addCase(VnPay.rejected, (state, action) => {
        state.statusVnPay = "failed";
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.statusDelete = "loading";
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.statusDelete = "success";
        state.data = action.payload;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.statusDelete = "failed";
        state.error = action.payload;
      });
  },
});

export default orders.reducer;
export const { resetOrdersState } = orders.actions;
