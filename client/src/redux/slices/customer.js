/* eslint-disable no-unused-vars */
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

// login

export const loginCustomer = createAsyncThunk(

  "customer/login",
  async (data, thunkAPI) =>
    handleAsyncThunk(CustomerService.login, [data], thunkAPI)
);


// register
export const registerCustomer = createAsyncThunk(
  "customer/register",
  async (data, thunkAPI) =>
    handleAsyncThunk(CustomerService.registerCustomer, [data], thunkAPI)
);


// Logout action
export const logout = createAsyncThunk("staff/logout", (_, thunkAPI) =>
  handleAsyncThunk(CustomerService.logout, [null], thunkAPI)
);


export const resetPassword = createAsyncThunk(
  "customer/forgotpassword",
  async (data, thunkAPI) =>
    handleAsyncThunk(CustomerService.forgotPassword, [data], thunkAPI)
);

// get current customer
export const getCurrentCustomer = createAsyncThunk(
  "customer/getCurrentCustomer",
  async (payload, thunkAPI) =>
    handleAsyncThunk(CustomerService.getCustomer, [], thunkAPI)
);

export const resetState = createAsyncThunk(
  "state/resetState",
  async (payload, thunkAPI) => {
    return payload;
  }
);

// update customer
export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  ({ customerId, data }, thunkAPI) =>
    handleAsyncThunk(
      CustomerService.updateCustomer,
      [customerId, data],
      thunkAPI
    )
);

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    me: null,
    statusUpdate: "idle",
    deleteStatus: "idle",
    loginStatus: "idle",

    registerStatus: "idle",

  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCustomer.pending, (state) => {
        state.statusUpdate = "loading";
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.statusUpdate = "success";
        state.data = action.payload;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.statusUpdate = "failed";
        state.error = action.payload;

      });

    // Handle logout

    builder
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "success";
        state.data = null;
        state.isLoginned = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Handle register
    builder
      .addCase(registerCustomer.pending, (state) => {
        state.status = "loading";

      })
      .addCase(resetState.fulfilled, (state, action) => {
        if (action.payload) {
          const { key, value } = action.payload;
          if (key && value !== undefined) {
            state[key] = value;
          }
        }
      })
te.loginStatus = "failed";
=======
      .addCase(loginCustomer.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(loginCustomer.fulfilled, (state, action) => {
        state.loginStatus = "success";
        state.data = action.payload;
      })
      .addCase(loginCustomer.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload;
      })
      .addCase(registerCustomer.pending, (state) => {
        state.registerStatus = "loading";
      })
      .addCase(registerCustomer.fulfilled, (state, action) => {
        state.registerStatus = "success";
        state.data = action.payload;
      })
      .addCase(registerCustomer.rejected, (state, action) => {
        state.registerStatus = "failed";

        state.error = action.payload;
      });
  },
});
export default customerSlice.reducer;
export const { resetStateCustomer } = customerSlice.actions;
