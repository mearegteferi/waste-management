import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk('auth/login', async(Credentials, thunkAPI) => {
    return loginAPI()
})

export const fetchUser = createAsyncThunk('auth/fetch', async(_, thunkAPI) => {
    return fetchAPI()
})

export const logout = createAsyncThunk('auth/logout', async(_, thunkAPI) => {
    return logoutAPI()
})