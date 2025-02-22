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
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const data = [
  { month: "Sep", value: 22000 },
  { month: "Oct", value: 38000 },
  { month: "Nov", value: 25000 },
  { month: "Dec", value: 23000 },
  { month: "Jan", value: 15000 },
  { month: "Feb", value: 32000 },
];

export default function LineGraph() {
  const [timeframe, setTimeframe] = useState("Monthly");
  const currentValue = 485.75;
  const percentage = 74;

  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents hydration mismatch in Next.js

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDarkMode = currentTheme === "dark";

  return (
    <div className="p-6 bg-background rounded-xl border border-border">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-medium text-foreground mb-1">Earning</h3>
          <p className="text-sm text-secondary">
            ${currentValue.toFixed(2)} ({percentage}%)
          </p>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-secondary hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
          {timeframe}
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={isDarkMode ? "rgba(255, 255, 255, 0.1)" : "#f0f0f0"}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: isDarkMode ? "#f8fafc" : "#9CA3AF",
                fontSize: 12,
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: isDarkMode ? "#f8fafc" : "#9CA3AF",
                fontSize: 12,
              }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? "#f8fafc" : "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "8px 12px",
                color: "#000", // Ensures black text in dark mode
              }}
              formatter={(value) => [`$${value.toLocaleString()}`, "Earning"]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--chart-line)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#000" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
