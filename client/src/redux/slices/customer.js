// slices/customer.js
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import CustomerService from "../../services/customer.service";
import Cookies from "js-cookie";

// Thunk để xử lý các thao tác bất đồng bộ
export const loginCustomer = createAsyncThunk(
  "customer/login",
  async (data, thunkAPI) => {
    try {
      const response = await CustomerService.login(data);

      // Lưu token vào cookie
      Cookies.set("access_token", response.accessToken, {
        expires: 30 / (24 * 60), // Token lưu trong 30 phút
        secure: true,
      });
      return response.customer;
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data
          : error.message;

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

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

export const logoutCustomer = createAsyncThunk("customer/logout", async () => {
  await CustomerService.logout();
  // Xóa token khỏi cookie
  Cookies.remove("access_token");
});

export const getCurrentCustomerByCookie = createAsyncThunk(
  "customer/getCurrentByCookie",
  async () => {
    const response = await CustomerService.getCustomerByCookie();
    return response;
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async ({ customerId, data }, thunkAPI) => {
    try {
      const response = await CustomerService.updateCustomer(customerId, data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const setStatus = createAction("users/setStatus");

// Slice
const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customer: null,
    isLoginned: false,
    status: "idle",
    error: null,
    statusLogout: "idle",
  },
  reducers: {
    resetCustomerState: (state) => {
      state.customer = null;
      state.isLoginned = false;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginCustomer.fulfilled, (state, action) => {
        state.isLoginned = true;
        state.customer = action.payload;
        state.status = "success";
      })
      .addCase(loginCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(logoutCustomer.pending, (state) => {
        state.statusLogout = "loading";
      })
      .addCase(logoutCustomer.fulfilled, (state) => {
        state.customer = null;
        state.isLoginned = false;
        state.status = "idle";
        state.statusLogout = "success";
      })
      .addCase(registerCustomer.fulfilled, (state, action) => {
        state.status = "success";
        state.customer = action.payload;
      })

      .addCase(getCurrentCustomerByCookie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCurrentCustomerByCookie.fulfilled, (state, action) => {
        state.customer = action.payload;
        state.isLoginned = true;
        state.status = "success";
      })
      .addCase(getCurrentCustomerByCookie.rejected, (state, payload) => {
        state.customer = null;
        state.isLoginned = false;
        state.status = "idle";
        state.error = payload.error;
      })

      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.customer = action.payload;
        state.status = "success";
      })
      .addCase(setStatus, (state, action) => {
        const { key, value } = action.payload;
        if (state[key] !== undefined) {
          state[key] = value; // Update the status field dynamically
        }
      });
  },
});

export const { setCustomer } = customerSlice.actions;
export default customerSlice.reducer;
