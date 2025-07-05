"use client";

import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { use } from "react";
import PaymentsPage from "@/pages/UserDashboardPage/Payments/PaymentsPage";
import RequestPage from "@/pages/UserDashboardPage/Requests/RequestsPage";
import SupportPage from "@/pages/UserDashboardPage/Support/SupportPage";
import TrackingPage from "@/pages/UserDashboardPage/Tracking/TrackingPage";
import FinancePage from "@/pages/UserDashboardPage/Finance/FinancePage";
import VendorResourcePage from "@/pages/UserDashboardPage/Vendor/VendorResourcePage";
import DigitalInitiativePage from "@/pages/UserDashboardPage/DigitalInitiative/DigitalInitiativePage";
import DummyLayout1 from "@/components/UserDashboardPage/Dummy1/DummyLayout1";
import DummyLayout2 from "@/components/UserDashboardPage/Dummy2/DummyLayout2";

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
      "resource",
      "digital-initiative",
      "dummy-page-1",
      "dummy-page-2",
    ].includes(slug)
  ) {
    notFound();
  }

  // Conditionally render the correct component:
  switch (slug) {
    // For VENDOR_MANAGER role
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
    case "resource":
      return <VendorResourcePage />;

    // For BUSINESS_STAKEHOLDER role
    case "digital-initiative":
      return <DigitalInitiativePage />;
    case "dummy-page-1":
      return <DummyLayout1 />;
    case "dummy-page-2":
      return <DummyLayout2 />;

    // Default case
    default:
      return null;
  }
}
