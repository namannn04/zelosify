"use client";

import { ChevronDown } from "lucide-react";
import { LineChart, Line, BarChart, Bar } from "recharts";

const barData = [
  { value: 20 },
  { value: 40 },
  { value: 35 },
  { value: 50 },
  { value: 55 },
  { value: 45 },
  { value: 25 },
  { value: 30 },
  { value: 35 },
  { value: 40 },
  { value: 35 },
  { value: 30 },
];

const lineData = [
  { value: 10 },
  { value: 40 },
  { value: 15 },
  { value: 35 },
  { value: 20 },
  { value: 30 },
  { value: 25 },
  { value: 20 },
];

const dotData = [
  { value: 25 },
  { value: 30 },
  { value: 35 },
  { value: 40 },
  { value: 35 },
  { value: 30 },
  { value: 25 },
  { value: 20 },
];

const metrics = [
  {
    title: "Total Sales",
    data: barData,
    amount: "$30,200",
    change: "+30.6%",
    changeColor: "text-blue-500",
    chart: (
      <BarChart width={200} height={100} data={barData}>
        <Bar dataKey="value" fill="var(--primary)" />
      </BarChart>
    ),
  },
  {
    title: "Clients",
    data: lineData,
    amount: "$30,200",
    change: "+30.6%",
    changeColor: "text-emerald-500",
    chart: (
      <LineChart width={200} height={100} data={lineData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--secondary)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    ),
  },
  {
    title: "Retention Rate",
    data: dotData,
    amount: "$30,200",
    change: "-30.6%",
    changeColor: "text-red-500",
    chart: (
      <LineChart width={200} height={100} data={dotData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke="var(--ring)"
          strokeWidth={3}
          strokeDasharray="8 8"
        />
      </LineChart>
    ),
  },
];

export default function MetricCards() {
  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="p-6 bg-background rounded-2xl shadow-sm border border-border transition-all"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              {metric.title}
            </h3>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-foreground border border-border rounded-lg hover:bg-secondary/10">
              Monthly
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="h-[100px] mb-4">{metric.chart}</div>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-foreground">
              {metric.amount}
            </span>
            <span className={`text-sm ${metric.changeColor}`}>
              {metric.change}
            </span>
          </div>

          <button className="w-full mt-4 py-2 text-sm text-foreground border border-border rounded-lg hover:bg-secondary/10">
            View More
          </button>
        </div>
      ))}
    </div>
  );
}
