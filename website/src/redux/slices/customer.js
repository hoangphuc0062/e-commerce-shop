/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import customersService from "../../services/customer.service";

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

  export const updateCustomer = createAsyncThunk("customer/update", (_, thunkAPI) =>
    handleAsyncThunk(updateCustomer.updateCustomer, [null], thunkAPI)
  );

  