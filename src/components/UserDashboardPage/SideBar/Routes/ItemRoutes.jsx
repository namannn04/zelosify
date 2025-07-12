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
  Scale3DIcon,
} from "lucide-react";
import { FaDollarSign } from "react-icons/fa6";
import { MdDataUsage } from "react-icons/md";

// Role-based menu items
const getOverviewItemsByRole = (role) => {
  switch (role) {
    // For VENDOR_MANAGER role
    case "VENDOR_MANAGER":
      return [
        {
          title: "Vendor",
          href: "#",
          icon: Users,
          hasSubmenu: true,
          submenu: [
            { title: "Contracts", href: "/user", icon: FileText },
            { title: "Payments", href: "/user/payments", icon: CreditCard },
            { title: "Tracking", href: "/user/tracking", icon: FaDollarSign },
            { title: "Requests", href: "/user/requests", icon: FileSignature },
            { title: "Openings", href: "/user/vendor-openings", icon: Users },
            { title: "AI Chat", href: "/user/messages", icon: Sparkles },
            {
              title: "Utilization",
              href: "/user/utilization",
              icon: MdDataUsage,
            },
          ],
        },
        { title: "Resource", href: "/user/resource", icon: BarChart3 },
      ];

    // For BUSINESS_STAKEHOLDER role
    case "BUSINESS_STAKEHOLDER":
      return [
        {
          title: "Digital",
          href: "/user/digital-initiative",
          icon: MdDataUsage,
        },
        {
          title: "Dummy Page 1",
          href: "/user/dummy-page-1",
          icon: Scale3DIcon,
        },
      ];

    default:
      return [];
  }
};

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

// Role-based sidebar sections
export const getSidebarSectionsByRole = (role) => {
  const overviewItems = getOverviewItemsByRole(role);

  if (overviewItems.length === 0) {
    return [];
  }

  return [
    {
      title: "Overview",
      items: overviewItems,
    },
    // {
    //   title: "Contract",
    //   items: contractItems,
    // },
  ];
};

export const supportItem = {
  title: "Support",
  href: "/user/support",
  icon: Headset,
};

export const settingsItem = {
  title: "Settings",
  href: "/user/settings",
  icon: Settings,
};
export const signOutItem = { title: "Sign Out", href: "#", icon: LogOut };
