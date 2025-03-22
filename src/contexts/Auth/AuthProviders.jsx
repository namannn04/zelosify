"use client";

import React from "react";
import { AuthProvider } from "./AuthContext";

const AuthProviders = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AuthProviders;
