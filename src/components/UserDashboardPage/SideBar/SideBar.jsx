"use client";
import {
  useEffect,
  useRef,
  memo,
  useState,
  createContext,
  useCallback,
  useMemo,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  Settings,
  CreditCard,
  FileSignature,
  Headset,
  Sparkles,
  BarChart3,
  Users,
  FileText,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { FaDollarSign } from "react-icons/fa6";
import SidebarHeader from "./SidebarHeader";
import useAuth from "@/hooks/Auth/useAuth";
import SignOutConfirmation from "@/components/UI/SignOutConfirmation";

// Create sidebar context
const SidebarContext = createContext(null);

const overviewItems = [
  {
    title: "Vendor",
    href: "#",
    icon: Users,
    hasSubmenu: true,
    submenu: [
      {
        title: "Contracts",
        href: "/user",
        icon: FileText,
      },
      { title: "Payment", href: "/user/payments", icon: CreditCard },
      { title: "Tracking", href: "/user/tracking", icon: FaDollarSign },
      { title: "Requests", href: "/user/requests", icon: FileSignature },
      { title: "AI-Chat", href: "/user/messages", icon: Sparkles },
    ],
  },
  { title: "Finance", href: "/user/finance", icon: FaDollarSign },
  { title: "Resource", href: "/user/resource", icon: BarChart3 },
];

// const contractItems = [
//   {
//     title: "Dummy",
//     href: "#",
//     icon: Users,
//     hasSubmenu: true,
//     submenu: [
//       {
//         title: "Contracts",
//         href: "/user/contract-intelligence",
//         icon: FileText,
//       },
//       { title: "Payment", href: "/user/payments", icon: CreditCard },
//       { title: "Tracking", href: "/user/tracking", icon: FaDollarSign },
//       { title: "Requests", href: "/user/requests", icon: FileSignature },
//       { title: "AI-Chat", href: "/user/messages", icon: Sparkles },
//     ],
//   },
//   { title: "AI-Chat", href: "/user/messages", icon: Sparkles },
//   { title: "Payments", href: "/user/payments", icon: CreditCard },
//   { title: "Tracking", href: "/user/tracking", icon: FaDollarSign },
//   { title: "Requests", href: "/user/requests", icon: FileSignature },
// ];

// Sidebar sections configuration
// To add a new section, just add a new object to this array
const sidebarSections = [
  {
    title: "Overview",
    items: overviewItems,
  },
  // {
  //   title: "Payment",
  //   items: contractItems,
  // },
  // Example of how to add another section:
  // {
  //   title: "Contracts",
  //   items: contractItems.filter(item =>
  //     item.title === "Contracts" || item.title === "Requests"
  //   )
  // }
];

const supportItem = {
  title: "Support",
  href: "/user/support",
  icon: Headset,
};

const settingsItem = {
  title: "Settings",
  href: "/user/settings",
  icon: Settings,
};
const signOutItem = { title: "Sign Out", href: "#", icon: LogOut };

// SidebarMenu component - memoized
const SidebarMenu = memo(({ children, className, ...props }) => {
  return (
    <ul
      data-sidebar="menu"
      className={`flex w-full min-w-0 flex-col gap-1 ${className || ""}`}
      {...props}
    >
      {children}
    </ul>
  );
});
SidebarMenu.displayName = "SidebarMenu";

// SidebarMenuItem component - memoized
const SidebarMenuItem = memo(({ children, className, ...props }) => {
  return (
    <li
      data-sidebar="menu-item"
      className={`group/menu-item relative ${className || ""}`}
      {...props}
    >
      {children}
    </li>
  );
});
SidebarMenuItem.displayName = "SidebarMenuItem";

// SidebarMenuButton component - memoized
const SidebarMenuButton = memo(
  ({
    icon: Icon,
    title,
    isActive,
    onClick,
    isOpen,
    hasSubmenu,
    isExpanded,
    className,
    ...props
  }) => {
    return (
      <button
        data-sidebar="menu-button"
        data-active={isActive}
        onClick={onClick}
        className={`
        flex w-full items-center ${
          isOpen ? "justify-between" : "justify-center"
        } px-3 py-2 text-sm rounded-md
        ${
          isActive
            ? "bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/20 dark:text-blue-400"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        }
        ${className || ""}
      `}
        {...props}
      >
        <div className="flex items-center gap-2">
          {Icon && (
            <Icon
              className={`h-5 w-5 ${
                isActive
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            />
          )}
          {isOpen && <span>{title}</span>}
        </div>
        {isOpen &&
          hasSubmenu &&
          (isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ))}
      </button>
    );
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";

// SidebarMenuSub component - memoized
const SidebarMenuSub = memo(
  ({ children, isOpen, isExpanded, className, ...props }) => {
    return (
      <ul
        data-sidebar="menu-sub"
        className={`ml-3 pl-1 border-l border-border mt-1 space-y-1 transition-all duration-300 transform ${
          isOpen && isExpanded
            ? "max-h-screen opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        } ${className || ""}`}
        {...props}
      >
        {children}
      </ul>
    );
  }
);
SidebarMenuSub.displayName = "SidebarMenuSub";

// SidebarMenuSubItem component - memoized
const SidebarMenuSubItem = memo(({ item, isActive, isOpen, ...props }) => {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(item.href);
  }, [router, item.href]);

  return (
    <li {...props}>
      <button
        onClick={handleClick}
        className={`
          w-full rounded-md flex items-center gap-2 px-3 py-2 text-sm
          ${
            isActive
              ? "bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/20 dark:text-blue-400"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
          }
        `}
      >
        {item.icon && (
          <item.icon
            className={`h-5 w-5 ${
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          />
        )}
        {isOpen && <span>{item.title}</span>}
      </button>
    </li>
  );
});
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const Sidebar = memo(({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarRef = useRef(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const [showSignoutConfirmation, setShowSignoutConfirmation] = useState(false);

  const { handleLogout, handleOpenSignoutConfirmation } = useAuth();

  const handleCancelSignout = () => {
    setShowSignoutConfirmation(false);
  };

  const handleConfirmSignout = async () => {
    await handleLogout();
    setShowSignoutConfirmation(false);
  };

  // Find which menu item should be expanded based on current path
  useEffect(() => {
    // Check if any submenu item is active
    for (const section of sidebarSections) {
      for (const item of section.items) {
        if (item.hasSubmenu) {
          const activeSubmenuItem = item.submenu.find(
            (subItem) => subItem.href === pathname
          );

          if (activeSubmenuItem) {
            setExpandedItem(item.title);
            break;
          }
        }
      }
    }
  }, [pathname]); // Re-run when pathname changes

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isOpen &&
        window.innerWidth < 1024
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggleSidebar]);

  const toggleSubmenu = useCallback((title) => {
    setExpandedItem((prevExpanded) => (prevExpanded === title ? null : title));
  }, []);

  // Create context value - memoize to prevent unnecessary re-renders
  const sidebarContextValue = useMemo(
    () => ({
      isOpen,
      toggleSidebar,
      expandedItem,
      setExpandedItem,
      toggleSubmenu,
    }),
    [isOpen, toggleSidebar, expandedItem, toggleSubmenu]
  );

  // Memoize handlers for footer buttons
  const handleSupportClick = useCallback(() => {
    router.push(supportItem.href);
  }, [router]);

  const handleSettingsClick = useCallback(() => {
    router.push(settingsItem.href);
  }, [router]);

  // Memoize the menu item click handler
  const createMenuItemClickHandler = useCallback(
    (item) => {
      return () => {
        // If sidebar is closed and item has submenu, just open the sidebar
        if (!isOpen && item.hasSubmenu) {
          toggleSidebar();
          // Also set this as expanded item for when sidebar opens
          setExpandedItem(item.title);
        } else if (item.hasSubmenu) {
          // If sidebar is open and item has submenu, toggle the submenu
          toggleSubmenu(item.title);
        } else {
          // If item doesn't have submenu, navigate to the page
          router.push(item.href);
        }
      };
    },
    [isOpen, toggleSidebar, toggleSubmenu, router]
  );

  // Render the sidebar sections - memoize to prevent re-renders when only expandedItem changes
  const renderSidebarSections = useMemo(() => {
    return sidebarSections.map((section, index) => (
      <div key={index} className="space-y-4">
        {isOpen && (
          <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 px-4">
            {section.title.toUpperCase()}
          </h2>
        )}
        <SidebarMenu>
          {section.items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.hasSubmenu &&
                item.submenu.some((subItem) => pathname === subItem.href));
            const isExpanded = expandedItem === item.title;

            // Create a dedicated handler for this specific item
            const onItemClick = createMenuItemClickHandler(item);

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  icon={item.icon}
                  title={item.title}
                  isActive={isActive}
                  isOpen={isOpen}
                  hasSubmenu={item.hasSubmenu}
                  isExpanded={isExpanded}
                  onClick={onItemClick}
                />

                {item.hasSubmenu && (
                  <SidebarMenuSub isOpen={isOpen} isExpanded={isExpanded}>
                    {item.submenu.map((subItem) => (
                      <SidebarMenuSubItem
                        key={subItem.title}
                        item={subItem}
                        isActive={pathname === subItem.href}
                        isOpen={isOpen}
                      />
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </div>
    ));
  }, [isOpen, pathname, expandedItem, createMenuItemClickHandler]);

  return (
    <SidebarContext.Provider value={sidebarContextValue}>
      <>
        {isOpen && window.innerWidth < 1024 && (
          <div
            className="fixed inset-0 bg-black bg-opacity-20 z-40"
            onClick={toggleSidebar}
          />
        )}

        <aside
          ref={sidebarRef}
          className={`${
            isOpen ? "w-[12rem]" : "w-[5rem]"
          } fixed inset-y-0 left-0 z-40 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg flex flex-col h-screen`}
        >
          <SidebarHeader isOpen={isOpen} toggleSidebar={toggleSidebar} />

          <div className={`flex-1 overflow-hidden`}>
            <div
              className={`h-full ${
                isOpen ? "overflow-y-auto" : "overflow-y-hidden"
              }`}
            >
              <div className="px-3 py-4 space-y-4">{renderSidebarSections}</div>
            </div>
          </div>

          {/* Footer Section: Settings & Sign Out */}
          <div className="px-3 py-4 border-t border-dashed border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSupportClick}
              className={`rounded-md flex gap-2 items-center w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <supportItem.icon className="h-5 w-5" />
              {isOpen && <span>{supportItem.title}</span>}
            </button>
            <button
              onClick={handleSettingsClick}
              className={`rounded-md flex gap-2 items-center w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <settingsItem.icon className="h-5 w-5" />
              {isOpen && <span>{settingsItem.title}</span>}
            </button>
            <button
              onClick={handleOpenSignoutConfirmation}
              className={`rounded-md flex gap-2 items-center w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <signOutItem.icon className="h-5 w-5" />
              {isOpen && <span>{signOutItem.title}</span>}
            </button>
          </div>
        </aside>

        {/* Signout Confirmation Popup */}
        <SignOutConfirmation
          isOpen={showSignoutConfirmation}
          onCancel={handleCancelSignout}
        />
      </>
    </SidebarContext.Provider>
  );
});

Sidebar.displayName = "Sidebar";
export default Sidebar;
