import ChatPage from "@/pages/UserDashboardPage/Messages/ChatPage";
import PaymentsPage from "@/pages/UserDashboardPage/Payments/PaymentsPage";
import RequestPage from "@/pages/UserDashboardPage/Requests/RequestsPage";
import SupportPage from "@/pages/UserDashboardPage/Support/SupportPage";
import TrackingPage from "@/pages/UserDashboardPage/Tracking/TrackingPage";
import { notFound } from "next/navigation";

export default async function UserSubPage({ params }) {
  const { slug } = await params;

  // If it's not one of our known slugs, trigger a 404:
  if (
    !["messages", "payments", "tracking", "requests", "support"].includes(slug)
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

    default:
      return null;
  }
}
