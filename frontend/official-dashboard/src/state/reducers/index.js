import { combineReducers } from 'redux';
import authReducer from '../authSlice'; // Make sure this path matches where your authSlice is saved

const rootReducer = combineReducers({
  auth: authReducer, // Combine your auth slice here
});

export default rootReducer;
