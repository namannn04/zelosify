import { formatDate } from "../../../utils/Dashboard/Utilization/formdata"

const UtilizationTable = ({ data }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-[#1a1d29] text-sm rounded-lg overflow-hidden">
        <thead className="bg-[#252837] border-b border-gray-600">
          <tr>
            <th className="px-6 py-4 text-left text-gray-300 font-medium text-sm">Employee</th>
            <th className="px-6 py-4 text-left text-gray-300 font-medium text-sm">Contract</th>
            <th className="px-6 py-4 text-left text-gray-300 font-medium text-sm">Period</th>
            <th className="px-6 py-4 text-left text-gray-300 font-medium text-sm">Days Logged</th>
            <th className="px-6 py-4 text-left text-gray-300 font-medium text-sm">Utilization %</th>
            <th className="px-6 py-4 text-left text-gray-300 font-medium text-sm">Contract Value</th>
            <th className="px-6 py-4 text-left text-gray-300 font-medium text-sm">Amount Logged</th>
            <th className="px-6 py-4 text-left text-gray-300 font-medium text-sm">Status</th>
            <th className="px-6 py-4 text-left text-gray-300 font-medium text-sm">Last Updated</th>
            <th className="px-6 py-4 text-left text-gray-300 font-medium text-sm">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {data.map((row) => (
            <tr key={row.employeeId} className="hover:bg-[#2a2d3a] transition-colors duration-150">
              <td className="px-6 py-4">
                <div className="font-medium text-white">{row.employeeName}</div>
                <div className="text-xs text-gray-400">{row.employeeEmail || "-"}</div>
              </td>
              <td className="text-gray-300 px-6 py-4">{row.contractTitle}</td>
              <td className="text-gray-300 px-6 py-4">
                {formatDate(row.contractStartDate)} - {formatDate(row.contractEndDate)}
              </td>
              <td className="px-6 py-4 text-gray-300">
                {row.daysLogged} / {row.totalContractDays}
              </td>
              <td className="text-gray-300 px-6 py-4">{row.utilizationPercent?.toFixed(1)}%</td>
              <td className="text-gray-300 px-6 py-4">₹{row.contractValue?.toLocaleString()}</td>
              <td className="text-gray-300 px-6 py-4">₹{row.loggedAmount?.toLocaleString()}</td>
              <td className="text-gray-300 px-6 py-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {row.status}
                </span>
              </td>
              <td className="text-gray-300 px-6 py-4">{formatDate(row.lastUpdated)}</td>
              <td className="px-6 py-4">
                <button className="text-red-400 text-xs hover:text-red-300 hover:underline transition-colors">
                  Flag
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UtilizationTable
