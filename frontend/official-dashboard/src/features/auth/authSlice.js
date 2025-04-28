import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        Loading: null,
        user: null,
        error: null,
        isAuthenticated: false
    },
    reducers: {

    }
})