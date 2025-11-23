import { configureStore } from '@reduxjs/toolkit';
import authReducer from './state';

const store = configureStore({
  reducer: authReducer
});

export default store;