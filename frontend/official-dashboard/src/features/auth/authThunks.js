import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, fetchAPI, logoutAPI } from "./authAPI";


export const login = createAsyncThunk(
  "auth/login",
  async (Credentials, thunkAPI) => {
    try {
      const response = await loginAPI(credentials);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const fetchUser = createAsyncThunk("auth/fetch", async (_, thunkAPI) => {
    try {
        const response = await fetchAPI(credentials);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
});


export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        const response = await logoutAPI(credentials);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
});
