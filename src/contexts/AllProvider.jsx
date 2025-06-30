"use client";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import DashBoardProviders from "./DashBoard/DashBoardProviders";
import store from "@/redux/store";

export default function AllProvider({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <DashBoardProviders>{children}</DashBoardProviders>
      </ThemeProvider>
    </Provider>
  );
}
