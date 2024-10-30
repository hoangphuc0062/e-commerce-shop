import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import PostSevice from "../../services/post.service";

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};

export const getPosts = createAsyncThunk("post/getPost", (_, thunkAPI) =>
  handleAsyncThunk(PostSevice.getPost, [null], thunkAPI)
);
export const GetBySlug = createAsyncThunk(
  "post/getBySlug",
  (slug, thunkAPI) => handleAsyncThunk(PostSevice.getBySlug, [slug], thunkAPI),
);

export const resetState = createAsyncThunk(
  "state/resetState",
  async (payload, thunkAPI) => {
    return payload;
  }
);

const Posts = createSlice({
  name: "post",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    me: null,
    getBySlugStatus: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(GetBySlug.pending, (state) => {
        state.getBySlugStatus = "loading";
      })
      .addCase(GetBySlug.fulfilled, (state, action) => {
        state.getBySlugStatus = "success";
        state.data = action.payload;
      })
      .addCase(GetBySlug.rejected, (state, action) => {
        state.getBySlugStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default Posts.reducer;
export const { resetStatePost } = Posts.actions;
