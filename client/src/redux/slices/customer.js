/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import CustomerService from "../../services/customer.service";

// Utility function to handle async actions
const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};

// Login action
export const loginCustomer = createAsyncThunk(
  "customer/login",
  async (data, thunkAPI) => {
    try {
      const { accessToken, customer } = await CustomerService.login(data);
      localStorage.setItem("accessToken", accessToken);
      return customer;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Register action
export const registerCustomer = createAsyncThunk(
  "customer/register",
  async (data, thunkAPI) => {
    try {
      const response = await CustomerService.registerCustomer(data);
      return response.customer;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Logout action
export const logout = createAsyncThunk("staff/logout", (_, thunkAPI) =>
  handleAsyncThunk(CustomerService.logout, [null], thunkAPI)
);

// Reset password action
export const resetPassword = createAsyncThunk(
  "customer/forgotpassword",
  (data, thunkAPI) =>
    handleAsyncThunk(CustomerService.forgotPassword, [data], thunkAPI)
);

// Get current customer action
export const getCurrentCustomer = createAsyncThunk(
  "customer/getCurrent",
  async (_, thunkAPI) => {
    try {
      const response = await CustomerService.getCustomer();
      return response.customer;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Reset state action
export const resetState = createAsyncThunk(
  "state/resetState",
  async (payload) => {
    return payload;
  }
);

// Update customer action
export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  ({ customerId, data }, thunkAPI) =>
    handleAsyncThunk(
      CustomerService.updateCustomer,
      [customerId, data],
      thunkAPI
    )
);

// Create customer slice
const customerSlice = createSlice({
  name: "customer",
  initialState: {
    data: null,
    isLoginned: false,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    // Handle login
    builder
      .addCase(loginCustomer.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginCustomer.fulfilled, (state, action) => {
        state.isLoginned = true;
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(loginCustomer.rejected, (state, action) => {
        state.status = "failed";
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
      .addCase(registerCustomer.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(registerCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Handle get current customer
    builder
      .addCase(getCurrentCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCurrentCustomer.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
        state.isLoginned = true;
      })
      .addCase(getCurrentCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Handle update customer
    builder
      .addCase(updateCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Handle reset state
    builder.addCase(resetState.fulfilled, (state, action) => {
      if (action.payload) {
        const { key, value } = action.payload;
        if (key && value !== undefined) {
          state[key] = value;
        }
      }
    });
  },
});

// Export reducer and actions
export default customerSlice.reducer;
export const { resetStateCustomer } = customerSlice.actions;
