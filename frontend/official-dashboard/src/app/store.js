import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./state/reducers";

const store = configureStore({
  reducer: usersReducer,
});

export default store;
