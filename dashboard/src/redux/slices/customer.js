import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import CustomerService from "../../services/customer.service";

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};

// get customer
export const getCustomer = createAsyncThunk(
  "customer/getCustomer",
  (_, thunkAPI) => handleAsyncThunk(CustomerService.getAll, [null], thunkAPI)
);
export const resetState = createAsyncThunk(
  "state/resetState",
  async (payload, thunkAPI) => {
    return payload;
  }
);
const customerSlice = createSlice({
  name: "customer",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    me: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(resetState.fulfilled, (state, action) => {
        const { key, value } = action.payload; // Destructure the action payload
        if (key && value !== undefined) {
          state[key] = value;
        }
      });
  },
});
export default customerSlice.reducer;
