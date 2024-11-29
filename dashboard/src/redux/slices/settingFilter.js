/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import SettingFilterService from "../../services/settingFilter.service";
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

export const getAllSettingFilter = createAsyncThunk(
  "settingFilter/getAll",
  async (payload, thunkAPI) => {
    return handleAsyncThunk(SettingFilterService.getAll, [], thunkAPI);
  }
);

const settingFilterSlice = createSlice({
  name: "settingFilter",
  initialState: {
    data: [],
    status: "idle",
    error: null,
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
      .addCase(getAllSettingFilter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllSettingFilter.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getAllSettingFilter.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default settingFilterSlice.reducer;
export const { resetSettingFilter } = settingFilterSlice.actions;
