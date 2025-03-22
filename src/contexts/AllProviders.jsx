"use client";
import { ThemeProvider } from "next-themes";
import DashBoardProviders from "./DashBoard/DashBoardProviders";
import AuthProviders from "./Auth/AuthProviders";
import ChatProviders from "./Chat/ChatProviders";

export default function AllProviders({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProviders>
        <ChatProviders>
          <DashBoardProviders>{children}</DashBoardProviders>
        </ChatProviders>
      </AuthProviders>
    </ThemeProvider>
  );
}
