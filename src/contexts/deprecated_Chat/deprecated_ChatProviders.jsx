"use client";

import React from "react";
import { ChatProvider } from "./ChatContext";

const ChatProviders = ({ children }) => {
  return <ChatProvider>{children}</ChatProvider>;
};

export default ChatProviders;
