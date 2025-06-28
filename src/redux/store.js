import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import trackingReducer from "./features/trackingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tracking: trackingReducer,
  },
});

export default store;
