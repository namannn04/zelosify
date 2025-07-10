import { formatDate } from "../../../utils/Dashboard/Utilization/formdata"

const UtilizationTable = ({ data }) => {
  return (
    <div className="border border-border rounded-lg overflow-x-auto">
      <table className="w-full divide-y divide-border table-fixed">
        <thead className="bg-tableHeader">
          <tr>
            <th className="px-2 py-3 text-left text-sm font-medium text-primary w-[15%]">Employee</th>
            <th className="px-2 py-3 text-left text-sm font-medium text-primary w-[12%]">Contract</th>
            <th className="px-2 py-3 text-left text-sm font-medium text-primary w-[12%]">Period</th>
            <th className="px-2 py-3 text-left text-sm font-medium text-primary w-[10%]">Days Logged</th>
            <th className="px-2 py-3 text-left text-sm font-medium text-primary w-[8%]">Utilization %</th>
            <th className="px-2 py-3 text-left text-sm font-medium text-primary w-[10%]">Contract Value</th>
            <th className="px-2 py-3 text-left text-sm font-medium text-primary w-[10%]">Amount Logged</th>
            <th className="px-2 py-3 text-left text-sm font-medium text-primary w-[8%]">Status</th>
            <th className="px-2 py-3 text-left text-sm font-medium text-primary w-[10%]">Last Updated</th>
            <th className="px-2 py-3 text-left text-sm font-medium text-primary w-[5%]">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((row, index) => (
            <tr key={`${row.employeeId}-${row.contractId || row.contractTitle}-${index}`} className="hover:bg-tableHeader">
              <td className="px-2 py-3 whitespace-nowrap">
                <div className="flex flex-col">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">{row.employeeName}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{row.employeeEmail || "-"}</div>
                </div>
              </td>
              <td 
                title={row.contractTitle}
                className="px-2 py-3 text-sm text-foreground"
              >
                <div className="truncate">{row.contractTitle}</div>
              </td>
              <td className="px-2 py-3 text-sm text-foreground">
                <div className="truncate">
                  {formatDate(row.contractStartDate)} - {formatDate(row.contractEndDate)}
                </div>
              </td>
              <td className="px-2 py-3 text-sm text-foreground">
                {row.daysLogged} / {row.totalContractDays}
              </td>
              <td className="px-2 py-3 text-sm text-foreground">{row.utilizationPercent?.toFixed(1)}%</td>
              <td className="px-2 py-3 text-sm text-foreground truncate">₹{row.contractValue?.toLocaleString()}</td>
              <td className="px-2 py-3 text-sm text-foreground truncate">₹{row.loggedAmount?.toLocaleString()}</td>
              <td className="px-2 py-3 text-sm text-foreground">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {row.status}
                </span>
              </td>
              <td className="px-2 py-3 text-sm text-foreground">{formatDate(row.lastUpdated)}</td>
              <td className="px-2 py-3 text-sm text-gray-500 dark:text-gray-400">
                <button className="inline-flex items-center px-2 py-1 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded text-gray-700 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
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
