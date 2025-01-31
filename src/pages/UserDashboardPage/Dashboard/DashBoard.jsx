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
    <>
      {/* Main Content */}
      <main className="p-6 bg-[#f7fdf8ec]">
        {/* Stats Grid */}
        <div className="flex flex-wrap lg:flex-nowrap gap-x-6 py-4">
          {/* First Component: VendorStats */}
          <div className="w-full lg:w-3/5 pt-4">
            <VendorStats />
          </div>

          {/* Second Component: Contracts Bar Chart */}
          <div className="lg:w-2/5 ">
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
          <div className="bg-white rounded-lg p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-6">Top Vendor Items</h2>
            <div className="space-y-6">
              {vendorItems.map((item) => (
                <div key={item.id}>
                  <div className="flex justify-between mb-2">
                    <div className="text-sm text-gray-600">
                      {item.id}. {item.name}
                    </div>
                    <div className="text-sm font-medium">{item.percentage}</div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${item.popularity}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Volume vs Service Level */}
          <div className="bg-white rounded-lg p-6 border border-gray-100">
            <h2 className="text-lg font-semibold mb-6">
              Volume vs Service Level
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={volumeServiceData} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="volume" fill="#3b82f6" />
                  <Bar dataKey="services" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm">Volume</span>
                <span className="text-sm font-medium">1,135</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Services</span>
                <span className="text-sm font-medium">635</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
