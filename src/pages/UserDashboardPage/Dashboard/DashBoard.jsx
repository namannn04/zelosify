import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import VendorStats from "../../../components/UserDashboardPage/Dashboard/VendorStats";
import ContractsChart from "../../../components/UserDashboardPage/Dashboard/ContractsChart";
import VendorInsightsChart from "../../../components/UserDashboardPage/Dashboard/VendorInsightsChart";
import VendorSatisfactionChart from "../../../components/UserDashboardPage/Dashboard/VendorSatisfactionChart";
import ComplianceChart from "../../../components/UserDashboardPage/Dashboard/ComplianceChart";

const vendorItems = [
  { id: "01", name: "IT support", popularity: 80, percentage: "45%" },
  { id: "02", name: "Hardware Item", popularity: 70, percentage: "25%" },
  { id: "03", name: "App development", popularity: 60, percentage: "15%" },
  { id: "04", name: "Networking", popularity: 75, percentage: "25%" },
];

const volumeServiceData = [
  { name: "1", volume: 1135, services: 635 },
  { name: "2", volume: 1135, services: 635 },
  { name: "3", volume: 1135, services: 635 },
  { name: "4", volume: 1135, services: 635 },
  { name: "5", volume: 1135, services: 635 },
  { name: "6", volume: 1135, services: 635 },
];

export default function DashboardUser() {
  return (
    <div className="px-6 py-2 bg-gray-50 dark:bg-gray-900">
      {/* Stats Grid */}
      <div className="flex flex-wrap lg:flex-nowrap gap-x-6 py-4">
        {/* First Component: VendorStats */}
        <div className="w-full lg:w-3/5">
          <VendorStats />
        </div>

        {/* Second Component: Contracts Bar Chart */}
        <div className="w-full lg:w-2/5">
          <ContractsChart />
        </div>
      </div>

      {/* Charts Grid */}
      {/* Total Contracts Chart */}
      <div className="flex flex-wrap gap-4 pb-6">
        <div className="w-full lg:w-[45%]">
          <VendorInsightsChart />
        </div>
        <div className="w-full lg:w-[30%]">
          <VendorSatisfactionChart />
        </div>
        <div className="w-full lg:w-[20%]"></div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <ComplianceChart />
        {/* Top Vendor Items */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">
            Top Vendor Items
          </h2>
          <div className="space-y-6">
            {vendorItems.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between mb-2">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {item.id}. {item.name}
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.percentage}
                  </div>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
                    style={{ width: `${item.popularity}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volume vs Service Level */}
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
      </div>
    </div>
  );
}
