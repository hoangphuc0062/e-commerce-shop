/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import TagsService from "../../services/tags.service";

export const resetState = createAsyncThunk(
  "state/resetState",
  async (payload) => payload
);

export const getAllTags = createAsyncThunk(
  "tags/getAllTags",
  async (_, thunkAPI) => {
    try {
      const response = await TagsService.getAllTags();
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const tags = createSlice({
  name: "tags",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetTagsState: (state) => {
      state.data = [];
      state.status = "idle";
      state.error = null;
    },
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
      .addCase(getAllTags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllTags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.tags;
      })
      .addCase(getAllTags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default tags.reducer;
export const { resetTagsState } = tags.actions;
