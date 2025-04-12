"use client";

import dynamic from "next/dynamic";
import PaymentsPage from "@/pages/UserDashboardPage/Payments/PaymentsPage";
import RequestPage from "@/pages/UserDashboardPage/Requests/RequestsPage";
import SupportPage from "@/pages/UserDashboardPage/Support/SupportPage";
import TrackingPage from "@/pages/UserDashboardPage/Tracking/TrackingPage";
import { notFound } from "next/navigation";
import { use } from "react";
import FinancePage from "@/pages/UserDashboardPage/Finance/FinancePage";

// Dynamically import the ChatPage with SSR disabled
const ChatPage = dynamic(
  () => import("@/pages/UserDashboardPage/Messages/ChatPage"),
  { ssr: false }
);

export default function UserSubPage({ params }) {
  // Unwrap params with React.use()
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  // If it's not one of our known slugs, trigger a 404:
  if (
    ![
      "messages",
      "payments",
      "tracking",
      "requests",
      "support",
      "finance",
    ].includes(slug)
  ) {
    notFound();
  }

  // Conditionally render the correct component:
  switch (slug) {
    case "messages":
      return <ChatPage />;
    case "payments":
      return <PaymentsPage />;
    case "tracking":
      return <TrackingPage />;
    case "requests":
      return <RequestPage />;
    case "support":
      return <SupportPage />;
    case "finance":
      return <FinancePage />;
    default:
      return null;
  }
}
