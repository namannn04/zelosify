export default function Billing() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-8">
        Billing
      </h2>

      {/* Current Plan Section */}
      <div className="mb-12 bg-white dark:bg-gray-800 p-6 rounded-lg border border-dotted border-black dark:border-gray-600">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Current Plan
        </h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              Pro Plan
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Billed annually
            </p>
          </div>
          <button className="px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-800 dark:hover:bg-gray-300 transition-colors">
            Upgrade Plan
          </button>
        </div>
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Your next billing date is{" "}
            <span className="font-medium">August 1, 2023</span>
          </p>
        </div>
      </div>

      {/* Payment Method Section */}
      {/* <div className="mb-12">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Payment Method
        </h3>
        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-12 h-8 bg-gray-200 rounded-md mr-4"></div>
            <div>
              <p className="font-medium text-gray-900">Visa ending in 4242</p>
              <p className="text-sm text-gray-600">Expires 12/2024</p>
            </div>
          </div>
          <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Edit
          </button>
        </div>
      </div> */}

      {/* Billing History Section */}
      {/* <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Billing History
        </h3>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { date: "Jul 1, 2023", amount: "$29.00", status: "Paid" },
                { date: "Jun 1, 2023", amount: "$29.00", status: "Paid" },
                { date: "May 1, 2023", amount: "$29.00", status: "Paid" },
              ].map((invoice, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="px-2 inline-flex text-xs leading-5 font-bold rounded-full bg-green-100 text-green-800">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button className="text-gray-600 hover:text-gray-900 transition-colors">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
}
