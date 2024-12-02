/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import SettingFilterService from "../../services/settingFilter.service";
import { update } from "./orders";
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

export const getSlugByCategory = createAsyncThunk(
  "settingFilter/getSlugByCategory",
  async (category, thunkAPI) => {
    return handleAsyncThunk(
      SettingFilterService.getSlugByCategory,
      [category],
      thunkAPI
    );
  }
);

export const createSettingFilter = createAsyncThunk(
  "settingFilter/create",
  async (data, thunkAPI) => {
    return handleAsyncThunk(SettingFilterService.create, [data], thunkAPI);
  }
);

export const deleteAllSettingFilter = createAsyncThunk(
  "settingFilter/deleteAll",
  async (id, thunkAPI) => {
    return handleAsyncThunk(SettingFilterService.deleteAll, [id], thunkAPI);
  }
);

export const deleteOneSettingFilter = createAsyncThunk(
  "settingFilter/deleteOne",
  async ({ id, idButton }, thunkAPI) => {
    return handleAsyncThunk(
      SettingFilterService.deleteOne,
      [id, idButton],
      thunkAPI
    );
  }
);

export const updateSettingFilterOne = createAsyncThunk(
  "settingFilter/updateOne",
  async ({ id, idButton, data }, thunkAPI) => {
    return handleAsyncThunk(
      SettingFilterService.update,
      [id, idButton, data],
      thunkAPI
    );
  }
);

export const getSettingFilterById = createAsyncThunk(
  "settingFilter/getById",
  async (id, thunkAPI) => {
    return handleAsyncThunk(SettingFilterService.getById, [id], thunkAPI);
  }
);

export const updateSettingFilter = createAsyncThunk(
  "settingFilter/update",
  async ({ id, data }, thunkAPI) => {
    return handleAsyncThunk(
      SettingFilterService.updateSettingFilter,
      [id, data],
      thunkAPI
    );
  }
);

const settingFilterSlice = createSlice({
  name: "settingFilter",
  initialState: {
    data: [],
    dataByCategory: [],
    status: "idle",
    statusByCategory: "idle",
    error: null,
    statusCreate: "idle",
    statusDeleteAll: "idle",
    statusDeleteOne: "idle",
    statusUpdateOne: "idle",
    statusGetById: "idle",
    statusUpdate: "idle",
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
    builder
      .addCase(getSlugByCategory.pending, (state) => {
        state.statusByCategory = "loading";
      })
      .addCase(getSlugByCategory.fulfilled, (state, action) => {
        state.statusByCategory = "success";
        state.dataByCategory = action.payload;
      })
      .addCase(getSlugByCategory.rejected, (state, action) => {
        state.statusByCategory = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(createSettingFilter.pending, (state) => {
        state.statusCreate = "loading";
      })
      .addCase(createSettingFilter.fulfilled, (state, action) => {
        state.statusCreate = "success";
        state.data = action.payload;
      })
      .addCase(createSettingFilter.rejected, (state, action) => {
        state.statusCreate = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(deleteAllSettingFilter.pending, (state) => {
        state.statusDeleteAll = "loading";
      })
      .addCase(deleteAllSettingFilter.fulfilled, (state, action) => {
        state.statusDeleteAll = "success";
        state.data = action.payload;
      })
      .addCase(deleteAllSettingFilter.rejected, (state, action) => {
        state.statusDeleteAll = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(deleteOneSettingFilter.pending, (state) => {
        state.statusDeleteOne = "loading";
      })
      .addCase(deleteOneSettingFilter.fulfilled, (state, action) => {
        state.statusDeleteOne = "success";
        state.data = action.payload;
      })
      .addCase(deleteOneSettingFilter.rejected, (state, action) => {
        state.statusDeleteOne = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(updateSettingFilterOne.pending, (state) => {
        state.statusUpdateOne = "loading";
      })
      .addCase(updateSettingFilterOne.fulfilled, (state, action) => {
        state.statusUpdateOne = "success";
        state.data = action.payload;
      })
      .addCase(updateSettingFilterOne.rejected, (state, action) => {
        state.statusUpdateOne = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(getSettingFilterById.pending, (state) => {
        state.statusGetById = "loading";
      })
      .addCase(getSettingFilterById.fulfilled, (state, action) => {
        state.statusGetById = "success";
        state.data = action.payload;
      })
      .addCase(getSettingFilterById.rejected, (state, action) => {
        state.statusGetById = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(updateSettingFilter.pending, (state) => {
        state.statusUpdate = "loading";
      })
      .addCase(updateSettingFilter.fulfilled, (state, action) => {
        state.statusUpdate = "success";
        state.data = action.payload;
      })
      .addCase(updateSettingFilter.rejected, (state, action) => {
        state.statusUpdate = "failed";
        state.error = action.payload;
      });
  },
});

export default settingFilterSlice.reducer;
export const { resetSettingFilter } = settingFilterSlice.actions;
