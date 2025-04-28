import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        Loading: null,
        user: null,
        error: null,
        isAuthenticated: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.pending, (state) => {
            state.Loading = true
            state.error = null
        })

        .addCase(login.fullfilled, (state) => {
            state.Loading = false
            state.isAuthenticated = true
        })
    }

})