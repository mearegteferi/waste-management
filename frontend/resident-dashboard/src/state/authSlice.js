import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to handle login (POST request to API)
export const login = createAsyncThunk(
  'auth/login',  // action name
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, { email, password });
      localStorage.setItem('access', res.data.access);  // Store the access token
      localStorage.setItem('refresh', res.data.refresh); // Store the refresh token
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('status', res.data.status);
      return res.data;  // If login is successful
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ general: 'Something went wrong.' });
    }
  }
);

// Async action to load the user (GET request to API)
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/account/user/me/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('access')}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      return res.data;  // If user is successfully loaded
    } catch (error) {
      return rejectWithValue('Failed to load user');  // If loading the user fails
    }
  }
);

// Slice to handle all auth actions and state
const authSlice = createSlice({
  name: 'auth',  // Slice name
  initialState: {  // The initial state for authentication
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    status: localStorage.getItem('status'),
    role: localStorage.getItem('role'),
    isAuthenticated: false,
    user: {},
    isLoading: false,
  },
  reducers: {
    logout: (state) => {  // Action for logging out
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      state.access = null;
      state.refresh = null;
      state.status = null;
      state.role = null;
      state.isAuthenticated = false;
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login success
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
        state.status = action.payload.status;
        state.role= action.payload.role;
      })
      // Handle login failure
      .addCase(login.rejected, (state) => {
        state.isAuthenticated = false;
        state.access = null;
        state.refresh = null;
        state.status = null;
        state.role = null;
      })
      // Handle user loading success
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      // Handle user loading failure
      .addCase(loadUser.rejected, (state) => {
        state.user = {};
      });
  },
});

export const { logout } = authSlice.actions;  // Export logout action
export default authSlice.reducer;  // Export the reducer
