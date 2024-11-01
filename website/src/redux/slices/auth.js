/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import AuthService from "../../services/auth.service";

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

// login
export const login = createAsyncThunk("auth/login", (data, thunkAPI) =>
  handleAsyncThunk(AuthService.login, [data], thunkAPI)
);

// register

export const register = createAsyncThunk("auth/register", (data, thunkAPI) =>
  handleAsyncThunk(AuthService.register, [data], thunkAPI)
);

// logout

export const logout = createAsyncThunk("auth/logout", (_, thunkAPI) =>
  handleAsyncThunk(AuthService.logout, [null], thunkAPI)
);

// getMe
export const getMe = createAsyncThunk("auth/getMe", (_, thunkAPI) =>
  handleAsyncThunk(AuthService.getme, [null], thunkAPI)
);
const auth = createSlice({
  name: "auth",

  initialState: {
    isLogin: false,
    data: [],
    status: "idle",
    error: null,
    statusRegister: "idle",
    statusLogout: "idle",
    statusGetMe: "idle  ",
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
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.isLogin = true;
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(register.pending, (state) => {
        state.statusRegister = "loading";
      })
      .addCase(register.fulfilled, (state) => {
        state.statusRegister = "success";
      })
      .addCase(register.rejected, (state) => {
        state.statusRegister = "failed";
      });
    builder
      .addCase(logout.pending, (state) => {
        state.statusLogout = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.statusLogout = "success";
        state.isLogin = false;
      })
      .addCase(logout.rejected, (state) => {
        state.statusLogout = "failed";
      });
    builder
      .addCase(getMe.pending, (state) => {
        state.statusGetMe = "loading";
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.statusGetMe = "success";
        state.isLogin = true;
        state.data = action.payload;
      })
      .addCase(getMe.rejected, (state) => {
        state.statusGetMe = "failed";
      });
  },
});

export default auth.reducer;
export const { resetLogin } = auth.actions;
