"use client";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import DashBoardProviders from "./DashBoard/DashBoardProviders";
import ChatProviders from "./Chat/ChatProviders";
import RequestProviders from "./Requests/RequestProviders";
import TrackingProviders from "./Tracking/TrackingProviders";
import store from "@/store/store";

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
          <DashBoardProviders>
            <RequestProviders>
              <TrackingProviders>{children}</TrackingProviders>
            </RequestProviders>
          </DashBoardProviders>
        </ChatProviders>
      </ThemeProvider>
    </Provider>
  );
}
