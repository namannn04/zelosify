import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import trackingReducer from "./features/Dashboard/trackingSlice";
import requestReducer from "./features/Dashboard/requestSlice";
import chatReducer from "./features/Dashboard/chatSlice";
import headerMetricsReducer from "./features/Dashboard/Home/headerMetricsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tracking: trackingReducer,
    requests: requestReducer,
    chat: chatReducer,
    headerMetrics: headerMetricsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable SerializableStateInvariantMiddleware
    }),
});

export default store;
