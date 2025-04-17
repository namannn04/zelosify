"use client";

import { RequestProvider } from "./RequestContext";

const RequestProviders = ({ children }) => {
  return <RequestProvider>{children}</RequestProvider>;
};

export default RequestProviders;
