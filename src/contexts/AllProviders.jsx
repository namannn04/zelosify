"use client";
import { ThemeProvider } from "next-themes";
import DashBoardProviders from "./DashBoard/DashBoardProviders";

export default function AllProviders({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <DashBoardProviders> {children}</DashBoardProviders>
    </ThemeProvider>
  );
}
