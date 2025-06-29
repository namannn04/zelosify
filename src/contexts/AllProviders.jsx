"use client";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import DashBoardProviders from "./DashBoard/DashBoardProviders";
import ChatProviders from "./Chat/ChatProviders";
import store from "@/redux/store";

export default function AllProviders({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ChatProviders>
          <DashBoardProviders>{children}</DashBoardProviders>
        </ChatProviders>
      </ThemeProvider>
    </Provider>
  );
}
