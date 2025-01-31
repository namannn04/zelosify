"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", oldVendors: 250, newVendors: 200 },
  { month: "Feb", oldVendors: 300, newVendors: 250 },
  { month: "Mar", oldVendors: 200, newVendors: 180 },
  { month: "Apr", oldVendors: 280, newVendors: 220 },
  { month: "May", oldVendors: 250, newVendors: 200 },
  { month: "Jun", oldVendors: 300, newVendors: 250 },
  { month: "Jul", oldVendors: 350, newVendors: 300 },
  { month: "Aug", oldVendors: 320, newVendors: 280 },
  { month: "Sep", oldVendors: 280, newVendors: 250 },
  { month: "Oct", oldVendors: 300, newVendors: 270 },
  { month: "Nov", oldVendors: 280, newVendors: 230 },
  { month: "Dec", oldVendors: 240, newVendors: 200 },
];

export default function VendorInsightsChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 py-6 px-2">
      <h2 className="text-lg font-semibold text-[#1e0e4b] mb-6">
        Vendor Insights
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
            <Line
              type="monotone"
              dataKey="oldVendors"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: "#8b5cf6", strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="newVendors"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: "#ef4444", strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Legend Section */}
      <div className="flex justify-center items-center mt-4 space-x-6">
        <div className="flex items-center space-x-2">
          <span
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: "#8b5cf6" }}
          ></span>
          <span className="text-sm text-gray-600">Old Vendors</span>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: "#ef4444" }}
          ></span>
          <span className="text-sm text-gray-600">New Vendors</span>
        </div>
      </div>
    </div>
  );
}
