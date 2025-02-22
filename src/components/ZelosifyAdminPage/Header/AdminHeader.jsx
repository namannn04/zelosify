"use client";

import { Search, Bell, ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function AdminHeader({ pageTitle }) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-semibold text-foreground">{pageTitle}</h1>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
          <input
            type="search"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-lg bg-background border border-border text-foreground"
          />
        </div>

        {/* Toggle Theme Button */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={currentTheme === "dark"} //  Ensure correct theme detection
            onChange={() =>
              setTheme(currentTheme === "dark" ? "light" : "dark")
            }
          />
          <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 dark:border dark:border-gray-700 rounded-full peer peer-checked:after:translate-x-6 rtl:peer-checked:after:-translate-x-6 after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-black">
            {currentTheme === "dark" ? (
              <Moon className="absolute left-1 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white" />
            ) : (
              <Sun className="absolute right-1 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
            )}
          </div>
        </label>

        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="w-5 h-5 text-secondary" />
        </button>
        <button className="flex items-center gap-2 text-sm font-medium">
          <div className="w-8 h-8 rounded-full bg-secondary/20 dark:bg-secondary flex justify-center items-center text-foreground">
            ZS
          </div>
          <span>Zelosify</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
