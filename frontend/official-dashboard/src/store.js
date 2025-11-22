import { configureStore } from '@reduxjs/toolkit';
import authReducer from './state/reducers';

const store = configureStore({
  reducer: authReducer
});

export default store;