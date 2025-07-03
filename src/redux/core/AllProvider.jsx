"use client";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { Toaster } from "@/components/UI/shadcn/sonner";
import store from "./store";

export default function AllProvider({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
}
