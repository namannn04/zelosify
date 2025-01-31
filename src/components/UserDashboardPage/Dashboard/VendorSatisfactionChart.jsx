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
  { month: 1, lastMonth: 78, thisMonth: 88 },
  { month: 2, lastMonth: 82, thisMonth: 85 },
  { month: 3, lastMonth: 75, thisMonth: 87 },
  { month: 4, lastMonth: 75, thisMonth: 84 },
  { month: 5, lastMonth: 78, thisMonth: 86 },
  { month: 6, lastMonth: 77, thisMonth: 83 },
  { month: 7, lastMonth: 78, thisMonth: 90 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-sm">
        {payload.map((entry, index) => (
          <div key={index} className="text-sm">
            <span className="font-medium" style={{ color: entry.color }}>
              {entry.name}:
            </span>
            <span className="ml-1">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function VendorSatisfactionChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 py-6 px-2">
      <h2 className="text-lg font-semibold text-[#1e0e4b] mb-6">
        Vendor Satisfaction
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorThisMonth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.01} />
              </linearGradient>
              <linearGradient id="colorLastMonth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01} />
              </linearGradient>
            </defs>
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
              domain={[70, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="lastMonth"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              name="Last Month"
              fill="url(#colorLastMonth)"
            />
            <Line
              type="monotone"
              dataKey="thisMonth"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ fill: "#10b981", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              name="This Month"
              fill="url(#colorThisMonth)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Centered Legend */}
      <div className="flex items-center justify-center gap-8 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div>
          <span className="text-sm text-gray-500">Last Month</span>
          <span className="text-sm font-medium">80%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
          <span className="text-sm text-gray-500">This Month</span>
          <span className="text-sm font-medium">90%</span>
        </div>
      </div>
    </div>
  );
}
