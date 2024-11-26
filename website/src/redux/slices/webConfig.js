/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import webConfigService from "../../services/webConfig.service";

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

// get webConfig
export const getWebConfig = createAsyncThunk(
    "webConfig/getWebConfig",
    (_, thunkAPI) => handleAsyncThunk(webConfigService.get, [null], thunkAPI)
);


const webConfig = createSlice({
    name: "webConfig",
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
            .addCase(getWebConfig.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getWebConfig.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(getWebConfig.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

    },
});

export default webConfig.reducer;
export const { resetWebConfig } = webConfig.actions;
