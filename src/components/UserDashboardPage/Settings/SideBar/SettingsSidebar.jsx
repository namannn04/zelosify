"use client";

import { useMemo } from "react";
import Link from "next/link";

export default function SettingsSidebar({ activePath }) {
  const menuSections = useMemo(
    () => [
      {
        title: "ACCOUNT",
        links: [
          { name: "Profile", href: "/user/settings" },
          { name: "General", href: "/user/settings/general" },
        ],
      },
      {
        title: "WORKSPACE",
        links: [
          { name: "People", href: "/user/settings/people" },
          { name: "Security", href: "/user/settings/security" },
          { name: "Billing", href: "/user/settings/billing" },
        ],
      },
    ],
    []
  );

  const renderNavLink = useMemo(
    () => (href, name) => {
      const isActive = activePath === href; // Strict check for exact path

      return (
        <Link
          key={href}
          href={href}
          className={`flex items-center text-sm px-3 py-2 rounded-md transition ${
            isActive
              ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          }`}
        >
          {name}
        </Link>
      );
    },
    [activePath] // Recalculate when activePath changes
  );

  return (
    <div className="w-40 border-r border-dashed border-border h-screen overflow-hidden">
      <nav className="flex flex-col pl-6 py-4 pr-4 space-y-6">
        {menuSections.map(({ title, links }) => (
          <div key={title}>
            <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
              {title}
            </h3>
            <div className="space-y-1">
              {links.map(({ href, name }) => renderNavLink(href, name))}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
