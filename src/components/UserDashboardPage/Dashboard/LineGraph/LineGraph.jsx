"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
} from "recharts";

export default function LineGraph() {
  const [dateRange, setDateRange] = useState("11 May - 11 June 2020");

  // Sample data
  const data = [
    { day: "Wed", value: 25000, date: "14" },
    { day: "Thu", value: 95000, date: "15" },
    { day: "Fri", value: 65000, date: "16" },
    { day: "Sat", value: 110000, date: "17" },
    { day: "Sun", value: 86500, date: "18", highlight: true },
    { day: "Mon", value: 95000, date: "19", projected: true },
    { day: "Tue", value: 105000, date: "20", projected: true },
    { day: "Wed", value: 75000, date: "21", projected: true },
    { day: "Thu", value: 92000, date: "22", projected: true },
    { day: "Fri", value: 115000, date: "23", projected: true },
  ];

  // Find the index where projected data starts
  const projectedStartIndex = data.findIndex((item) => item.projected);

  // Find the index of the highlighted point (Sunday)
  const highlightIndex = data.findIndex((item) => item.highlight);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 shadow-sm rounded-md">
          <p className="text-sm font-medium">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom dot component
  const CustomDot = (props) => {
    const { cx, cy, payload } = props;

    if (payload.highlight) {
      return (
        <g>
          <circle
            cx={cx}
            cy={cy}
            r={6}
            fill="white"
            stroke="#a855f7"
            strokeWidth={2}
          />
          <text
            x={cx}
            y={cy - 15}
            textAnchor="middle"
            fill="#1f2937"
            fontSize="12px"
            fontWeight="500"
          >
            ${(payload.value / 1000).toFixed(0)}k
          </text>
        </g>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-1">
            Monthly Recurring Revenue
          </h2>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900">$120,544</span>
            <span className="text-gray-500">from $180,000</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-gray-500">Showing data for:</span>
            <button className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-200 rounded-md bg-white hover:bg-gray-50">
              {dateRange}
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-500">Overall profit</span>
            <span className="ml-2 text-green-500 font-medium">3.5%</span>
          </div>
        </div>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickFormatter={(value, index) => value}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />

            {/* Highlight area for Sunday */}
            {highlightIndex !== -1 && (
              <ReferenceArea
                x1={data[highlightIndex].day}
                x2={data[highlightIndex].day}
                fill="#e9d5ff"
                fillOpacity={0.6}
              />
            )}

            {/* Past data - solid line */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#a855f7"
              strokeWidth={2}
              dot={false}
              activeDot={false}
              isAnimationActive={false}
              data={data.slice(0, projectedStartIndex)}
              connectNulls
            />

            {/* Projected data - dashed line */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="#a855f7"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={false}
              isAnimationActive={false}
              data={data.slice(projectedStartIndex - 1)}
              connectNulls
            />

            {/* Custom dots for highlighted points */}
            <Line
              type="monotone"
              dataKey="value"
              stroke="transparent"
              dot={<CustomDot />}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
