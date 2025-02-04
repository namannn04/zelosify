import { Check, X } from "lucide-react";
import Pagination from "../../UI/Pagination";

const requests = [
  {
    id: 1,
    identity: {
      name: "Dylan Parker",
      email: "dparker@chat.com",
    },
    source: "AWS",
    role: "S3_Admin",
    access: "AWS",
    resource: "PII data",
    permissions: ["view", "edit", "delete", "manage"],
    requestedOn: "Jun 6, 2024",
  },
  {
    id: 2,
    identity: {
      name: "Russell Giles",
      email: "rgiles@chat.com",
    },
    source: "AWS",
    role: "Prod_Dev",
    access: "AWS",
    resource: "Prod_EKS",
    permissions: ["edit", "delete"],
    requestedOn: "Jun 6, 2024",
  },
  {
    id: 3,
    identity: {
      name: "Clark Hood",
      email: "chood@chat.com",
    },
    source: "AWS",
    role: "Prod_Dev",
    access: "AWS",
    resource: "Prod_S3",
    permissions: ["view", "edit", "delete", "manage"],
    requestedOn: "Jun 6, 2024",
  },
  {
    id: 4,
    identity: {
      name: "Kiana Ponce",
      email: "kponce@chat.com",
    },
    source: "Okta",
    role: "Sales",
    access: "Snowflake",
    resource: "Revenue Data",
    permissions: ["view"],
    requestedOn: "Jun 6, 2024",
  },
  {
    id: 5,
    identity: {
      name: "Fred Beck",
      email: "fbeck@chat.com",
    },
    source: "Okta",
    role: "Sales",
    access: "Snowflake",
    resource: "Revenue Data",
    permissions: ["view"],
    requestedOn: "Jun 6, 2024",
  },
  {
    id: 6,
    identity: {
      name: "Tianna Mendez",
      email: "tmendez@chat.com",
    },
    source: "AWS",
    role: "Admin",
    access: "AWS",
    resource: "Prod_Env",
    permissions: ["view", "edit", "delete", "manage"],
    requestedOn: "Jun 6, 2024",
  },
  {
    id: 7,
    identity: {
      name: "Zaki Eaton",
      email: "zeaton@chat.com",
    },
    source: "AWS",
    role: "S3_Viewer",
    access: "AWS",
    resource: "PII data",
    permissions: ["view"],
    requestedOn: "Jun 6, 2024",
  },
];

export default function RequestsLayout() {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#0F172A] dark:text-gray-100">
      <div className="px-6 py-4">
        <h1 className="text-2xl font-bold mb-6">Requests</h1>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-200 dark:bg-[#1E293B] rounded-lg p-4">
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
          <div className="bg-gray-200 dark:bg-[#1E293B] rounded-lg p-4">
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
          <div className="bg-gray-200 dark:bg-[#1E293B] rounded-lg p-4">
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

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <button className="px-3 py-1.5 text-white bg-black dark:bg-[#1E293B] text-sm rounded-md flex items-center gap-2">
            All time
            <span className="text-gray-400">×</span>
          </button>
          <button className="px-3 py-1.5 bg-gray-200 dark:bg-[#1E293B] text-sm rounded-md flex items-center gap-2">
            AWS, Snowflake
            <span className="text-gray-400">×</span>
          </button>
          <button className="px-3 py-1.5 bg-gray-200 dark:bg-[#1E293B] text-sm rounded-md flex items-center gap-2">
            More filters
            <span className="text-gray-400">≡</span>
          </button>
        </div>

        {/* Table */}
        <div className="bg-gray-200 dark:bg-[#1E293B] rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-700">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Identity
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Source
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Role/Group
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Access
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Resource
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Permissions
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Requested On
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="border-b border-gray-700/50">
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
                      {request.role}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded text-xs">
                      {request.access}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center justify-center px-2 py-1 rounded text-xs">
                      {request.resource}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-1">
                      {request.permissions.map((permission, index) => (
                        <span
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            permission === "view"
                              ? "bg-purple-500"
                              : permission === "edit"
                              ? "bg-blue-500"
                              : permission === "delete"
                              ? "bg-indigo-500"
                              : "bg-pink-500"
                          }`}
                        />
                      ))}
                    </div>
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
