import { ChevronDown, ChevronRight } from "lucide-react";
import { memo } from "react";

// SidebarMenu component - memoized
export const SidebarMenu = memo(({ children, className, ...props }) => {
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
export const SidebarMenuItem = memo(({ children, className, ...props }) => {
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
export const SidebarMenuButton = memo(
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
