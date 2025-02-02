import { createBrowserRouter } from "react-router-dom";
import PrivacyPage from "../pages/LandingPage/terms & privacy/PrivacyPage";
import LandingPage from "../pages/LandingPage/LandingPage";
import ContactPage from "../pages/LandingPage/contact/ContactPage";
import LoginForm from "../pages/LandingPage/authentication/LoginPage";
import RegisterPage from "../pages/LandingPage/authentication/RegisterPage";
import HomeErrorPage from "../pages/LandingPage/HomeErrorPage";
import HomeOutlet from "../pages/LandingPage/HomeOutlet";
import TermsPage from "../pages/LandingPage/terms & privacy/TermsPage";
import UserOutlet from "../pages/UserDashboardPage/UserOutlet";
import DashBoard from "../pages/UserDashboardPage/Dashboard/DashBoard";
import SettingsPage from "../pages/UserDashboardPage/Settings/SettingsPage";
import ChatPage from "../pages/UserDashboardPage/Messages/ChatPage";
import DashboardErrorPage from "../pages/UserDashboardPage/DashboardErrorPage";
import ContractsPage from "../pages/UserDashboardPage/Contracts/ContractsPage";
import General from "../components/UserDashboardPage/Settings/General";
import DetailedProfile from "../components/UserDashboardPage/Settings/DetailedProfile";
import Security from "../components/UserDashboardPage/Settings/Security";
import Billing from "../components/UserDashboardPage/Settings/Billing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeOutlet />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "*", element: <HomeErrorPage /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "privacy", element: <PrivacyPage /> },
      { path: "terms", element: <TermsPage /> },
      {
        path: "user",
        errorElement: <DashboardErrorPage />,
        children: [
          {
            path: "",
            element: <UserOutlet />,
            children: [
              { index: true, element: <DashBoard /> },
              { path: "messages", element: <ChatPage /> },
              { path: "contracts", element: <ContractsPage /> },
              {
                path: "settings",
                element: <SettingsPage />, // Renders SettingsLayout
                children: [
                  { index: true, element: <DetailedProfile /> },
                  { path: "profile", element: <DetailedProfile /> },
                  { path: "general", element: <General /> },
                  { path: "security", element: <Security /> },
                  { path: "billing", element: <Billing /> },
                ],
              },
            ],
          },
          { path: "*", element: <DashboardErrorPage /> },
        ],
      },
    ],
  },
]);

export default router;
