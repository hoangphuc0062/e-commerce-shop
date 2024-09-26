import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StaffService from "../../services/staff.service";

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};
export const login = createAsyncThunk("staff/login", (data, thunkAPI) =>
  handleAsyncThunk(StaffService.login, [data], thunkAPI)
);

const staffSlice = createSlice({
  name: "staff",
  initialState: {
    data: [],
    status: "idle",
    statusMe: "idle",
    error: null,
    me: null,
    statusUpdate: "idle",
    statusPassword: "idle",
  },
  reducers: {
    resetState: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        state.me = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetState } = staffSlice.actions;

export default staffSlice.reducer;
