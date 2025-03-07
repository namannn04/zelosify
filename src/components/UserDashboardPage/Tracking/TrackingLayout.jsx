import Pagination from "@/components/UI/Pagination";
import { Filter, Search } from "lucide-react";

const leads = [
  {
    id: 1,
    contract: "Intellias",
    vendorName: "AAA",
    from: "Feb 1, 2025",
    to: "March 1, 2025",
    totalDays: "30",
    domain: "intellias.com",
    amount: "$150.0M",
  },
  {
    id: 2,
    contract: "Kia America",
    vendorName: "AAA",
    from: "Feb 1, 2025",
    to: "March 1, 2025",
    totalDays: "30",
    domain: "kia.com",
    amount: "Not available",
  },
  {
    id: 3,
    contract: "Fisker",
    vendorName: "AAA",
    from: "Feb 1, 2025",
    to: "March 1, 2025",
    totalDays: "30",
    domain: "fiskerinc.com",
    amount: "$200.1M",
  },
  {
    id: 4,
    contract: "Lucid Motors",
    vendorName: "AAA",
    from: "Feb 1, 2025",
    to: "March 1, 2025",
    totalDays: "30",
    domain: "lucidmotors.com",
    amount: "$639.4M",
  },
  {
    id: 5,
    contract: "First Brands Group, LLC",
    vendorName: "AAA",
    from: "Feb 1, 2025",
    to: "March 1, 2025",
    totalDays: "30",
    domain: "firstbrandsgroup.com",
    amount: "$2500.0M",
  },
  {
    id: 6,
    contract: "Karma Automotive",
    vendorName: "AAA",
    from: "Feb 1, 2025",
    to: "March 1, 2025",
    totalDays: "30",
    domain: "karmaautomotive.com",
    amount: "$24.2M",
  },
  {
    id: 7,
    contract: "Oliver Wyman",
    vendorName: "AAA",
    from: "Feb 1, 2025",
    to: "March 1, 2025",
    totalDays: "30",
    domain: "oliverwyman.com",
    amount: "$2500.0M",
  },
  {
    id: 8,
    contract: "Waymo",
    vendorName: "AAA",
    from: "Feb 1, 2025",
    to: "March 1, 2025",
    totalDays: "30",
    domain: "waymo.com",
    amount: "$1400.0M",
  },
];

export default function TrackingLayout() {
  return (
    <div className="flex bg-background px-2">
      {/* Main Content */}
      <div className="flex-1">
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-foreground">Tracking</h1>
            <button className="px-3 py-1.5 bg-foreground text-background rounded-md text-sm">
              <span>+</span> Create
            </button>
          </div>

          {/* Filter and Search */}
          <div className="flex items-center justify-between gap-2 mb-6">
            <button className="px-3 py-1.5 bg-foreground text-background text-sm rounded-md flex items-center gap-2">
              Filter
              <Filter className="w-4 h-4" />
            </button>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary" />
              <input
                type="text"
                placeholder="Search"
                className="pl-9 pr-4 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring w-64"
              />
            </div>
          </div>

          {/* Table */}
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-tableHeader">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-primary">
                    Contract No
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-primary">
                    Vendor Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-primary">
                    From
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-primary">
                    To
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-primary">
                    Total Days
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-primary">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-primary">
                    Owned By
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-tableHeader">
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

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      <div className="flex gap-2">{lead.vendorName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      <div className="flex gap-2">{lead.from}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      <div className="flex gap-2">{lead.to}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      <div className="flex gap-2">{lead.totalDays} </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      {lead.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs font-medium rounded text-gray-700 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                        View {lead.contract}
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
