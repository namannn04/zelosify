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
import SidebarHeader from "./SidebarHeader";
import useAuth from "@/hooks/Auth/useAuth";
import SignOutConfirmation from "@/components/UI/SignOutConfirmation";
import { getRoleFromCookie } from "@/utils/Auth/roleUtils";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./components/SideBarMenu";
import {
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "./components/SideBarMenuSub";
import {
  getSidebarSectionsByRole,
  settingsItem,
  supportItem,
  signOutItem,
} from "./Routes/ItemRoutes";

// Create sidebar context
const SidebarContext = createContext(null);

const Sidebar = memo(({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarRef = useRef(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const { handleOpenSignoutConfirmation } = useAuth();

  // Get user role from cookie
  useEffect(() => {
    const role = getRoleFromCookie();
    setUserRole(role);

    // If role is not available immediately, retry after a short delay
    if (!role) {
      const timer = setTimeout(() => {
        const retryRole = getRoleFromCookie();
        if (retryRole) {
          setUserRole(retryRole);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  // Get sidebar sections based on user role
  const sidebarSections = useMemo(() => {
    if (!userRole) return [];
    return getSidebarSectionsByRole(userRole);
  }, [userRole]);

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
  }, [pathname, sidebarSections]); // Re-run when pathname or sidebarSections changes

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
    if (!sidebarSections || sidebarSections.length === 0) {
      return (
        <div className="px-4 py-8">
          {isOpen && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No menu items available for your role.
            </p>
          )}
        </div>
      );
    }

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
  }, [
    isOpen,
    pathname,
    expandedItem,
    createMenuItemClickHandler,
    sidebarSections,
  ]);

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
          } fixed inset-y-0 left-0 z-40 bg-background border-r border-border shadow-lg flex flex-col h-screen`}
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
          isOpen={false}
          onCancel={handleOpenSignoutConfirmation}
        />
      </>
    </SidebarContext.Provider>
  );
});

Sidebar.displayName = "Sidebar";
export default Sidebar;
