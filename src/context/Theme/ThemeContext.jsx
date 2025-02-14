"use client";

import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const getInitialTheme = () => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("zelosify_theme") === "dark" ||
        (!localStorage.getItem("zelosify_theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  };
  useEffect(() => {
    const initialTheme = getInitialTheme();
    setIsDarkMode(initialTheme);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("zelosify_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("zelosify_theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
