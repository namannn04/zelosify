import Pagination from "@/components/UI/Pagination";
import { Check, Filter, Search, X } from "lucide-react";

const requests = [
  {
    id: 1,
    contractNo: "a2fdw3",
    identity: {
      name: "Dylan Parker",
      email: "dparker@chat.com",
    },
    source: "AWS",
    amount: "$1200",

    access: "AWS",

    requestedOn: "Jun 6, 2024",
  },
  {
    id: 2,
    contractNo: "a2fdw3",
    identity: {
      name: "Russell Giles",
      email: "rgiles@chat.com",
    },
    source: "AWS",
    amount: "$1200",

    access: "AWS",

    requestedOn: "Jun 6, 2024",
  },
  {
    id: 3,
    contractNo: "a2fdw3",
    identity: {
      name: "Clark Hood",
      email: "chood@chat.com",
    },
    source: "AWS",
    amount: "$1200",

    access: "AWS",

    requestedOn: "Jun 6, 2024",
  },
  {
    id: 4,
    contractNo: "a2fdw3",
    identity: {
      name: "Kiana Ponce",
      email: "kponce@chat.com",
    },
    source: "Okta",
    amount: "$1200",

    access: "Snowflake",

    requestedOn: "Jun 6, 2024",
  },
  {
    id: 5,
    contractNo: "a2fdw3",
    identity: {
      name: "Fred Beck",
      email: "fbeck@chat.com",
    },
    source: "Okta",
    amount: "$1200",

    access: "Snowflake",

    requestedOn: "Jun 6, 2024",
  },
  {
    id: 6,
    contractNo: "a2fdw3",
    identity: {
      name: "Tianna Mendez",
      email: "tmendez@chat.com",
    },
    source: "AWS",
    amount: "$1200",

    access: "AWS",

    requestedOn: "Jun 6, 2024",
  },
  {
    id: 7,
    contractNo: "a2fdw3",
    identity: {
      name: "Zaki Eaton",
      email: "zeaton@chat.com",
    },
    source: "AWS",
    amount: "$1200",

    access: "AWS",

    requestedOn: "Jun 6, 2024",
  },
];

export default function RequestsLayout() {
  return (
    <div className="min-h-screen text-foreground bg-background">
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold mb-6">Requests</h1>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="rounded-lg border border-border p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Active Requests (This Month)
              </span>
              <button className="text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                •••
              </button>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold">16</span>
              <span className="ml-2 text-xs text-emerald-500">↑ 2%</span>
            </div>
          </div>
          <div className="rounded-lg border border-border p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Avg. Approval Time (This Month)
              </span>
              <button className="text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                •••
              </button>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold">0.12 mins</span>
              <span className="ml-2 text-xs text-red-500">↑ 5%</span>
            </div>
          </div>
          <div className="rounded-lg border border-border p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Completed Requests (This Month)
              </span>
              <button className="text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                •••
              </button>
            </div>
            <div className="flex items-center">
              <span className="text-2xl font-bold">24</span>
              <span className="ml-2 text-xs text-red-500">↑ 2%</span>
            </div>
          </div>
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
        <div className="rounded-lg overflow-hidden border border-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-tableHeader">
                <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                  Contract No.
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                  Raised By
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                  Business Unit
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                  Requested On
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr
                  key={request.id}
                  className="border-b border-border hover:bg-tableHeader"
                >
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium">
                      {request.contractNo}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="text-sm font-medium">
                        {request.identity.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {request.identity.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded  text-xs">
                      {request.source}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center justify-center px-2 py-1 rounded text-xs">
                      {request.amount}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">{request.requestedOn}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {/* Approve Button - Green */}
                      <button className="px-3 py-1.5 text-xs border border-green-600 text-green-600 rounded-md flex items-center gap-1 hover:bg-green-600 hover:text-white transition-colors">
                        <Check className="h-4 w-4" />
                        Approve
                      </button>

                      {/* Deny Button - Red */}
                      <button className="px-3 py-1.5 text-xs border border-red-600 text-red-600 rounded-md flex items-center gap-1 hover:bg-red-600 hover:text-white transition-colors">
                        <X className="h-4 w-4" />
                        Deny
                      </button>
                    </div>
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
  );
}
