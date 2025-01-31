"use client";

import { CircleDollarSign, Users, CheckCircle, UserPlus } from "lucide-react";

const stats = [
  {
    value: "$1k",
    label: "Contract Approved",
    change: "+5% from yesterday",
    icon: CircleDollarSign,
    bgColor: "bg-gradient-to-l from-red-100 to-red-200",
    iconColor: "text-red-200",
    iconBg: "bg-red-700",
  },
  {
    value: "300",
    label: "Total Contracts",
    change: "+5% from yesterday",
    icon: Users,
    bgColor: "bg-gradient-to-l from-amber-100 to-amber-200",
    iconColor: "text-amber-200",
    iconBg: "bg-amber-700",
  },
  {
    value: "5",
    label: "Contracts in Progress",
    change: "+1.25% from yesterday",
    icon: CheckCircle,
    bgColor: "bg-gradient-to-l from-emerald-100 to-emerald-200",
    iconColor: "text-emerald-200",
    iconBg: "bg-emerald-700",
  },
  {
    value: "2",
    label: "New Vendors",
    change: "0.0% from yesterday",
    icon: UserPlus,
    bgColor: "bg-gradient-to-l from-purple-100 to-purple-200",
    iconColor: "text-purple-200",
    iconBg: "bg-purple-700",
  },
];

export default function VendorStats() {
  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-purple-800">
            Vendor Statistics
          </h2>
          <p className="text-sm text-gray-500">Cost Summary</p>
        </div>
        <button className="inline-flex items-center text-sm text-gray-500 border border-gray-600 hover:bg-gray-700 hover:text-gray-100 rounded-md px-3 py-1">
          <span>Export</span>
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`${stat.bgColor} rounded-xl p-4 space-y-3 shadow-lg`}
          >
            <div
              className={`${stat.iconBg} w-10 h-10 rounded-full flex items-center justify-center`}
            >
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </div>
              <div className="text-sm text-gray-700">{stat.label}</div>
            </div>
            <div className="text-xs text-blue-800">{stat.change}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
