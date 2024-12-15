/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import settingFilterService from "../../services/settingFilter.service";

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

// get setting filter
export const getSettingFilter = createAsyncThunk(
  "settingFilter/getSettingFilter",
  async (params, { rejectWithValue }) => {
    try {
      const response = await settingFilterService.get(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error occurred");
    }
  }
);

const settingFilter = createSlice({
  name: "settingFilter",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSettingFilter.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSettingFilter.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { settingFilters } = action.payload;
        state.data = settingFilters;
      })
      .addCase(getSettingFilter.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default settingFilter.reducer;
export const { resetWebConfig } = settingFilter.actions;
