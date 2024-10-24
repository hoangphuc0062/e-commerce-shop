/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import TagsService from "../../services/tags.service";

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

export const getAllTags = createAsyncThunk("tags/getAllTags", (_, thunkAPI) =>
  handleAsyncThunk(TagsService.getAll, [null], thunkAPI)
);

const tags = createSlice({
  name: "tags",
  initialState: {
    data: [],
    status: "idle",
    error: null,
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
        state.data = action.payload;
      })
      .addCase(getAllTags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default tags.reducer;
export const { resetTagsState } = tags.actions;
