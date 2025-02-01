import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivacyPage from "./pages/LandingPage/terms & privacy/PrivacyPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import ContactPage from "./pages/LandingPage/contact/ContactPage";
import LoginForm from "./pages/LandingPage/authentication/LoginPage";
import RegisterPage from "./pages/LandingPage/authentication/RegisterPage";
import NotFound from "./pages/LandingPage/ErrorPage";
import HomeOutlet from "./pages/LandingPage/HomeOutlet";
import TermsPage from "./pages/LandingPage/terms & privacy/TermsPage";
import UserOutlet from "./pages/UserDashboardPage/UserOutlet";
import DashBoard from "./pages/UserDashboardPage/Dashboard/DashBoard";
import Home from "./pages/UserDashboardPage/Home/Home";
import SettingsPage from "./pages/UserDashboardPage/Settings/SettingsPage";
import AnalyticsPage from "./pages/UserDashboardPage/Analytics/AnalyticsPage";
import ChatPage from "./pages/UserDashboardPage/ChatBot/ChatPage";
import Pages from "./pages/UserDashboardPage/Pages/Pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeOutlet />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <RegisterPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "privacy", element: <PrivacyPage /> },
      { path: "terms", element: <TermsPage /> },
      {
        path: "user",
        element: <UserOutlet />,
        children: [
          { index: true, element: <Home /> },
          { path: "chat", element: <ChatPage /> },
          { path: "dashboard", element: <DashBoard /> },
          { path: "settings", element: <SettingsPage /> },
          { path: "analytics", element: <AnalyticsPage /> },
          { path: "pages", element: <Pages /> },
        ],
      },
    ],
  },
]);

const App = () => {
  useEffect(() => {
    function checkCookieAccess() {
      try {
        sessionStorage.setItem("test", "test");
        sessionStorage.removeItem("test");
      } catch (error) {
        if (
          error instanceof DOMException &&
          (error.code === 18 || error.name === "SecurityError")
        ) {
          showCookieAlert();
        }
      }
    }

    function showCookieAlert() {
      const alertDiv = document.createElement("div");
      alertDiv.innerHTML = `
        <div style="position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); width: 90%; max-width: 400px; background: #ff6b6b; color: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 15px 20px; text-align: center; z-index: 9999; font-family: 'Arial', sans-serif;">
          <p style="margin: 0; font-size: 16px; line-height: 1.4;">
            🍪 This site requires cookies to function correctly. Please enable cookies in your browser settings.
          </p>
          <button style="margin-top: 10px; background: white; color: #ff6b6b; border: none; padding: 8px 15px; border-radius: 5px; font-size: 14px; cursor: pointer; transition: background 0.3s ease;"
              onclick="this.parentElement.style.display='none'">
            Got it!
          </button>
        </div>
      `;
      document.body.appendChild(alertDiv);
    }

    checkCookieAccess();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
