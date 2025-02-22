import ComplianceChart from "@/components/UserDashboardPage/Dashboard/ComplianceChart";
import ContractsChart from "@/components/UserDashboardPage/Dashboard/ContractsChart";
import VendorInsightsChart from "@/components/UserDashboardPage/Dashboard/VendorInsightsChart";
import VendorSatisfactionChart from "@/components/UserDashboardPage/Dashboard/VendorSatisfactionChart";
import VendorStats from "@/components/UserDashboardPage/Dashboard/VendorStats";
import VolumeVsServiceLevel from "@/components/UserDashboardPage/Dashboard/VolumeVsServiceLevel";

const vendorItems = [
  { id: "01", name: "IT support", popularity: 80, percentage: "45%" },
  { id: "02", name: "Hardware Item", popularity: 70, percentage: "25%" },
  { id: "03", name: "App development", popularity: 60, percentage: "15%" },
  { id: "04", name: "Networking", popularity: 75, percentage: "25%" },
];

// Dashboard Page for default route "/user"

export default function UserDashboardPage() {
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
        <VolumeVsServiceLevel />
      </div>
    </div>
  );
}
