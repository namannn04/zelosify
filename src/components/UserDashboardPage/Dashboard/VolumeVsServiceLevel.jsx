"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function VolumeVsServiceLevel() {
  const volumeServiceData = [
    { name: "1", volume: 1135, services: 635 },
    { name: "2", volume: 1135, services: 635 },
    { name: "3", volume: 1135, services: 635 },
    { name: "4", volume: 1135, services: 635 },
    { name: "5", volume: 1135, services: 635 },
    { name: "6", volume: 1135, services: 635 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700">
      <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">
        Volume vs Service Level
      </h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={volumeServiceData} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
            <XAxis dataKey="name" stroke="#2d2d2d" />
            <YAxis stroke="#2d2d2d" />
            <Tooltip />
            <Bar dataKey="volume" fill="#3b82f6" />
            <Bar dataKey="services" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Volume
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            1,135
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Services
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            635
          </span>
        </div>
      </div>
    </div>
  );
}
