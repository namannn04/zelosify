export default function MetricCards() {
  return (
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
  );
}
