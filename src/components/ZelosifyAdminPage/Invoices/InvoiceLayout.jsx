"use client";

import { useState } from "react";
import { LineChart, Line } from "recharts";
import {
  Search,
  ChevronDown,
  Eye,
  PenSquare,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Pagination from "@/components/UI/Pagination";

const chartData = Array(12)
  .fill(0)
  .map((_, i) => ({ value: Math.random() * 50 + 25 }));

const invoices = [
  {
    id: 2,
    user: {
      name: "Abey Boseley",
      email: "aabsl32@gmail.com",
      avatar: "/favicon.ico",
    },
    createDate: "7/15/2022",
    dueDate: "2/15/2022",
    totalUsers: 2030,
    status: "Unpaid",
  },
  {
    id: 5,
    user: {
      name: "Mickie Melmoth",
      email: "mmsht23@gmail.com",
      avatar: "/favicon.ico",
    },
    createDate: "5/5/2022",
    dueDate: "7/11/2022",
    totalUsers: 3000,
    status: "Paid",
  },
];

export default function InvoiceLayout() {
  const [selectedTab, setSelectedTab] = useState("All");

  return (
    <div className="bg-background min-h-screen">
      <div className="grid grid-cols-4 gap-4 mb-8">
        {/* Metric Cards */}
        {[
          {
            title: "Paid",
            amount: "$7,825",
            percentage: "70.5%",
            color: "text-emerald-500",
            stroke: "var(--primary)",
          },
          {
            title: "Unpaid",
            amount: "$1,880",
            percentage: "27.4%",
            color: "text-amber-500",
            stroke: "var(--ring)",
          },
        ].map((metric, index) => (
          <div
            key={index}
            className="bg-background p-4 rounded-lg shadow-sm border border-border"
          >
            <div className="flex justify-between mb-2">
              <span className="text-secondary">{metric.title}</span>
              <span className={metric.color}>{metric.percentage}</span>
            </div>
            <div className="text-2xl font-semibold mb-1 text-foreground">
              {metric.amount}
            </div>
            <div className="text-sm text-secondary mb-4">9 invoices</div>
            <div className="h-16">
              <LineChart width={200} height={60} data={chartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={metric.stroke}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-background rounded-lg border border-border">
        <div className="border-b px-6 py-4">
          <div className="flex gap-6">
            {["All", "Paid", "Unpaid", "Cancelled"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`flex items-center gap-2 pb-4 px-2 -mb-4 text-sm ${
                  selectedTab === tab
                    ? "text-primary border-b-2 border-primary"
                    : "text-secondary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search and Sort */}
        <div className="p-6 flex justify-between items-center border-b border-border">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" />
            <input
              type="search"
              placeholder="Search 5 records..."
              className="pl-10 pr-4 py-2 border border-border rounded-lg w-64 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-background text-foreground hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-all">
            Sort by (Invoice Id)
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Table */}
        <table className="w-full border border-border">
          <thead className="bg-secondary/10 dark:bg-secondary/20 border-b border-border">
            <tr>
              {[
                "INVOICE ID",
                "CLIENT INFO",
                "CREATE DATE",
                "DUE DATE",
                "TOTAL USERS",
                "STATUS",
                "ACTIONS",
              ].map((header, index) => (
                <th
                  key={index}
                  className="text-left text-sm font-medium text-secondary px-6 py-3"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-border hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-all"
              >
                <td className="px-6 py-4 text-sm text-foreground">
                  {invoice.id}
                </td>
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-black flex items-center justify-center">
                    {invoice.user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      {invoice.user.name}
                    </div>
                    <div className="text-sm text-secondary">
                      {invoice.user.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {invoice.createDate}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {invoice.dueDate}
                </td>
                <td className="px-6 py-4 text-sm text-foreground">
                  {invoice.totalUsers}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      invoice.status === "Paid"
                        ? "bg-emerald-200 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300"
                        : "bg-red-200 dark:bg-red-900 text-red-600 dark:text-red-300"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  {[Eye, PenSquare, Trash2].map((Icon, i) => (
                    <button
                      key={i}
                      className="p-2 rounded-lg border border-border hover:bg-secondary/10 dark:hover:bg-secondary/20 transition-all"
                    >
                      <Icon className="w-5 h-5 text-secondary" />
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <Pagination />
    </div>
  );
}
