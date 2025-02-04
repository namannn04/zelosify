"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ShoppingBag, Glasses } from "lucide-react";

const data = [
  { month: "Jan", actual: 8.823, target: 12.122 },
  { month: "Feb", actual: 8.823, target: 11.122 },
  { month: "Mar", actual: 7.823, target: 12.122 },
  { month: "Apr", actual: 8.823, target: 10.122 },
  { month: "May", actual: 10.823, target: 13.122 },
  { month: "June", actual: 10.823, target: 13.122 },
  { month: "July", actual: 10.823, target: 13.122 },
];

export default function ComplianceChart() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold text-[#1e0e4b] dark:text-white mb-8">
        Compliance Target vs Reality
      </h2>
      <div className="h-[300px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            barGap={8}
          >
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 14 }}
            />
            <Bar
              dataKey="actual"
              fill="#10b981"
              radius={[20, 20, 20, 20]}
              barSize={16}
            />
            <Bar
              dataKey="target"
              fill="#fbbf24"
              radius={[20, 20, 20, 20]}
              barSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-emerald-500 dark:text-emerald-300" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Actual compliance
            </span>
            <span className="text-emerald-500 dark:text-emerald-300 font-bold">
              8.823
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900 flex items-center justify-center">
            <Glasses className="w-5 h-5 text-amber-500 dark:text-amber-300" />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Target compliance
            </span>
            <span className="text-amber-500 dark:text-amber-300 font-bold">
              12.122
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
