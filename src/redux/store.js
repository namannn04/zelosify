import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import trackingReducer from "./features/trackingSlice";
import requestReducer from "./features/requestSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tracking: trackingReducer,
    requests: requestReducer,
  },
});

export default store;
