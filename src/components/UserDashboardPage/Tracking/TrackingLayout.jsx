import Pagination from "@/components/UI/Pagination";

const leads = [
  {
    id: 1,
    contract: "Intellias",
    vendorName: "AAA",
    from: "Feb 1, 2025",
    to: "March 1, 2025",
    totalDays: "30",
    domain: "intellias.com",
    logo: "/placeholder.svg?height=40&width=40",
    revenue: "$150.0M",
    socials: ["linkedin", "twitter"],
  },
  {
    id: 2,
    contract: "Kia America",
    vendorName: "AAA",
    from: "Feb 1, 2025",
    to: "March 1, 2025",
    totalDays: "30",
    domain: "kia.com",
    logo: "/placeholder.svg?height=40&width=40",
    revenue: "Not available",
    socials: ["linkedin"],
  },
  {
    id: 3,
    contract: "Fisker",
    vendorName: "AAA",
    from: "Feb 1, 2025",
    to: "March 1, 2025",
    totalDays: "30",
    domain: "fiskerinc.com",
    logo: "/placeholder.svg?height=40&width=40",
    revenue: "$200.1M",
    socials: ["linkedin"],
  },
  {
    id: 4,
    contract: "Lucid Motors",
    vendorName: "AAA",
    from: "Feb 1, 2025",
    to: "March 1, 2025",
    totalDays: "30",
    domain: "lucidmotors.com",
    logo: "/placeholder.svg?height=40&width=40",
    revenue: "$639.4M",
    socials: ["linkedin", "twitter"],
  },
  {
    id: 5,
    contract: "First Brands Group, LLC",
    vendorName: "AAA",
    from: "Feb 1, 2025",
    to: "March 1, 2025",
    totalDays: "30",
    domain: "firstbrandsgroup.com",
    logo: "/placeholder.svg?height=40&width=40",
    revenue: "$2500.0M",
    socials: ["linkedin"],
  },
  {
    id: 6,
    contract: "Karma Automotive",
    vendorName: "AAA",
    from: "Feb 1, 2025",
    to: "March 1, 2025",
    totalDays: "30",
    domain: "karmaautomotive.com",
    logo: "/placeholder.svg?height=40&width=40",
    revenue: "$24.2M",
    socials: ["linkedin", "twitter"],
  },
  {
    id: 7,
    contract: "Oliver Wyman",
    vendorName: "AAA",
    from: "Feb 1, 2025",
    to: "March 1, 2025",
    totalDays: "30",
    domain: "oliverwyman.com",
    logo: "/placeholder.svg?height=40&width=40",
    revenue: "$2500.0M",
    socials: ["linkedin", "twitter"],
  },
  {
    id: 8,
    contract: "Waymo",
    vendorName: "AAA",
    from: "Feb 1, 2025",
    to: "March 1, 2025",
    totalDays: "30",
    domain: "waymo.com",
    logo: "/placeholder.svg?height=40&width=40",
    revenue: "$1400.0M",
    socials: ["linkedin", "twitter"],
  },
];

export default function TrackingLayout() {
  return (
    <div className="flex bg-white dark:bg-gray-900 rounded-lg">
      {/* Main Content */}
      <div className="flex-1">
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Tracking
            </h1>
            <button className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-slate-900 dark:bg-gray-800 dark:hover:bg-gray-700">
              <span>+</span> Create
            </button>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Showing 25 leads in this campaign
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-8">
            <div className="relative flex-shrink-0">
              <select className="appearance-none w-64 px-3 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-white dark:bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-sm">
                <option>Automotive Industry Outreach Campaign</option>
              </select>
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search leads..."
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 text-sm"
              />
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Contract
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Vendor Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    TO
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Total Days
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    People
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {lead.contract}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {lead.domain}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div className="flex gap-2">{lead.vendorName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div className="flex gap-2">{lead.from}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div className="flex gap-2">{lead.to}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      <div className="flex gap-2">{lead.totalDays} </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {lead.revenue}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded text-gray-700 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                        View People
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination />
        </div>
      </div>
    </div>
  );
}
