"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Monday", online: 12000, offline: 11000 },
  { day: "Tuesday", online: 15000, offline: 11000 },
  { day: "Wednesday", online: 5000, offline: 20000 },
  { day: "Thursday", online: 15000, offline: 6000 },
  { day: "Friday", online: 12000, offline: 11000 },
  { day: "Saturday", online: 15000, offline: 12000 },
  { day: "Sunday", online: 20000, offline: 10000 },
];

export default function ContractsChart() {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 py-6 px-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-[#1e0e4b] dark:text-white">
          Total Contracts Approved
        </h2>
      </div>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
              className="dark:stroke-gray-600"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 14 }}
              className="dark:text-gray-300"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 14 }}
              tickFormatter={(value) => `${value / 1000}k`}
              className="dark:text-gray-300"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                className:
                  "dark:bg-gray-700 dark:border-gray-600 dark:text-white",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              iconSize={8}
              className="dark:text-gray-300"
            />
            <Bar
              dataKey="online"
              name="Online"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="offline"
              name="Offline"
              fill="#10B981"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
