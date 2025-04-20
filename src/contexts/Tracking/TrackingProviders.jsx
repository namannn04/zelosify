"use client";

import { TrackingProvider } from "./TrackingContext";

const TrackingProviders = ({ children }) => {
  return <TrackingProvider>{children}</TrackingProvider>;
};

export default TrackingProviders;
