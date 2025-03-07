"use client";

import {
  ChevronDown,
  Search,
  Sliders,
  Eye,
  Pencil,
  Trash2,
  Filter,
} from "lucide-react";
import Pagination from "@/components/UI/Pagination";

export default function People() {
  const users = [
    {
      id: 1,
      name: "Liam Smith",
      avatar: "/avatars/liam-smith.jpg",
      email: "smith@example.com",
      role: "Project Manager",
      status: "Active",
      joinedDate: "24 Jun 2024, 9:23 pm",
      twoFAuth: "Enabled",
    },
    {
      id: 2,
      name: "Noah Anderson",
      avatar: "/avatars/noah-anderson.jpg",
      email: "anderson@example.com",
      role: "UX Designer",
      status: "Active",
      joinedDate: "15 Mar 2023, 2:45 pm",
      twoFAuth: "Enabled",
    },
    {
      id: 3,
      name: "Isabella Garcia",
      avatar: "/avatars/isabella-garcia.jpg",
      email: "garcia@example.com",
      role: "Front-End Developer",
      status: "Inactive",
      joinedDate: "10 Apr 2022, 11:30 am",
      twoFAuth: "Enabled",
    },
    {
      id: 4,
      name: "William Clark",
      avatar: "/avatars/william-clark.jpg",
      email: "clark@example.com",
      role: "Product Owner",
      status: "Active",
      joinedDate: "28 Feb 2023, 6:15 pm",
      twoFAuth: "Enabled",
    },
    {
      id: 5,
      name: "James Hall",
      avatar: "/avatars/james-hall.jpg",
      email: "hall@example.com",
      role: "Business Analyst",
      status: "Active",
      joinedDate: "19 May 2024, 7:55 am",
      twoFAuth: "Enabled",
    },
    {
      id: 6,
      name: "Benjamin Lewis",
      avatar: "/avatars/benjamin-lewis.jpg",
      email: "lewis@example.com",
      role: "Data Analyst",
      status: "Active",
      joinedDate: "03 Jan 2024, 12:05 pm",
      twoFAuth: "Enabled",
    },
    {
      id: 7,
      name: "Amelia Davis",
      avatar: "/avatars/amelia-davis.jpg",
      email: "davis@example.com",
      role: "UX Designer",
      status: "Inactive",
      joinedDate: "21 Jul 2023, 8:40 pm",
      twoFAuth: "Enabled",
    },
    {
      id: 8,
      name: "Emma Johnson",
      avatar: "/avatars/emma-johnson.jpg",
      email: "johnson@example.com",
      role: "UX Designer",
      status: "Active",
      joinedDate: "16 Sep 2023, 3:25 pm",
      twoFAuth: "Enabled",
    },
    {
      id: 9,
      name: "Olivia Brown",
      avatar: "/avatars/olivia-brown.jpg",
      email: "brown@example.com",
      role: "Marketing Specialist",
      status: "Active",
      joinedDate: "04 Nov 2022, 9:50 am",
      twoFAuth: "Enabled",
    },
    {
      id: 10,
      name: "Ava Williams",
      avatar: "/avatars/ava-williams.jpg",
      email: "williams@example.com",
      role: "Software Engineer",
      status: "Active",
      joinedDate: "30 Dec 2023, 4:35 pm",
      twoFAuth: "Enabled",
    },
    {
      id: 11,
      name: "Sophia Jones",
      avatar: "/avatars/sophia-jones.jpg",
      email: "jones@example.com",
      role: "Front-End Developer",
      status: "Active",
      joinedDate: "05 Jun 2023, 7:10 pm",
      twoFAuth: "Enabled",
    },
    {
      id: 12,
      name: "Mia Miller",
      avatar: "/avatars/mia-miller.jpg",
      email: "miller@example.com",
      role: "Security Analyst",
      status: "Inactive",
      joinedDate: "12 Aug 2022, 1:00 pm",
      twoFAuth: "Enabled",
    },
    {
      id: 13,
      name: "Lucas Young",
      avatar: "/avatars/lucas-young.jpg",
      email: "young@example.com",
      role: "Front-End Developer",
      status: "Active",
      joinedDate: "17 Oct 2023, 10:20 am",
      twoFAuth: "Enabled",
    },
    {
      id: 14,
      name: "Alexander Wright",
      avatar: "/avatars/alexander-wright.jpg",
      email: "wright@example.com",
      role: "DevOps Engineer",
      status: "Active",
      joinedDate: "08 Feb 2023, 5:45 pm",
      twoFAuth: "Enabled",
    },
    {
      id: 15,
      name: "Harper Martinez",
      avatar: "/avatars/harper-martinez.jpg",
      email: "martinez@example.com",
      role: "System Architect",
      status: "Active",
      joinedDate: "27 Jul 2024, 6:30 am",
      twoFAuth: "Enabled",
    },
  ];

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const getAvatarBgColor = (name) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];

    // Simple hash function to get consistent color for the same name
    const hash = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="w-full bg-background text-foreground">
      {/* Top Navigation */}
      <div className="flex justify-between items-center my-4 border-b border-border pb-4">
        <div className="text-xl font-bold text-foreground pl-3">People</div>
        <div className="flex items-center space-x-3 mr-2">
          <button className="flex items-center px-3 py-1.5 text-sm border border-border rounded-md bg-background hover:bg-tableHeader">
            <Eye className="w-4 h-4 mr-2" />
            Hide
          </button>
          <button className="flex items-center px-3 py-1.5 text-sm border border-border rounded-md bg-background hover:bg-tableHeader">
            <Sliders className="w-4 h-4 mr-2" />
            Customize
          </button>
          <button className="px-3 py-1.5 text-sm border border-border rounded-md bg-background hover:bg-tableHeader">
            Export
          </button>
          <button className="flex items-center px-3 py-1.5 text-sm border border-border rounded-md bg-background hover:bg-tableHeader">
            Add
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex items-center justify-between gap-2 mb-4 px-3">
        <button className="px-3 py-1.5 bg-foreground text-background text-sm rounded-md flex items-center gap-2">
          Filter
          <Filter className="w-4 h-4" />
        </button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary" />
          <input
            type="text"
            placeholder="Search"
            className="pl-9 pr-4 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring w-64"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-y border-border bg-tableHeader">
              <th className="py-3 pl-3 pr-2 text-left">
                <input
                  type="checkbox"
                  className="rounded border-border text-focus focus:ring-1 focus:ring-ring"
                />
              </th>
              <th className="py-3 px-2 text-left text-sm font-medium text-primary">
                Full name
              </th>
              <th className="py-3 px-2 text-left text-sm font-medium text-primary">
                Email
              </th>
              <th className="py-3 px-2 text-left text-sm font-medium text-primary">
                Role
              </th>
              <th className="py-3 px-2 text-left text-sm font-medium text-primary">
                Status
              </th>
              <th className="py-3 px-2 text-left text-sm font-medium text-primary">
                Date
              </th>
              <th className="py-3 px-2 text-left text-sm font-medium text-primary">
                2F Auth
              </th>
              <th className="py-3 px-2 text-left text-sm font-medium text-primary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-border hover:bg-tableHeader"
              >
                <td className="py-3 pl-3 pr-2">
                  <input
                    type="checkbox"
                    className="rounded border-border text-focus focus:ring-1 focus:ring-ring"
                  />
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${getAvatarBgColor(
                        user.name
                      )}`}
                    >
                      {getInitials(user.name)}
                    </div>
                    <span className="ml-3 text-sm font-medium">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <a
                    href={`mailto:${user.email}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {user.email.slice(0, 7)}...
                  </a>
                </td>
                <td className="py-3 px-2 text-sm">{user.role}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        user.status === "Active" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span className="ml-2 text-sm">{user.status}</span>
                  </div>
                </td>
                <td className="py-3 px-2 text-sm">{user.joinedDate}</td>
                <td className="py-3 px-2">
                  <span className="text-sm px-2 py-1 bg-amber-100 text-amber-800 rounded-sm font-medium">
                    {user.twoFAuth}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-gray-500 hover:text-primary">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="px-3 mb-10">
          <Pagination />
        </div>
      </div>
    </div>
  );
}
