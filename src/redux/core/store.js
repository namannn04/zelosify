import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/features/Auth/authSlice";
import trackingReducer from "@/redux/features/Dashboard/trackingSlice";
import requestReducer from "@/redux/features/Dashboard/requestSlice";
import chatReducer from "@/redux/features/Dashboard/chatSlice";
import headerMetricsReducer from "@/redux/features/Dashboard/Home/headerMetricsSlice";
import contractSpendReducer from "@/redux/features/Dashboard/Home/contractSpendSlice";
import vendorResourceReducer from "@/redux/features/Dashboard/vendorResourceSlice";
import utilizationReducer from "@/redux/features/Dashboard/utilizationSlice";
import contractUploadReducer from "@/redux/features/Dashboard/Home/contractUploadSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tracking: trackingReducer,
    requests: requestReducer,
    chat: chatReducer,
    headerMetrics: headerMetricsReducer,
    contractSpend: contractSpendReducer,
    vendorResource: vendorResourceReducer,
    utilization: utilizationReducer,
    contractUpload: contractUploadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable SerializableStateInvariantMiddleware
    }),
});

export default store;
