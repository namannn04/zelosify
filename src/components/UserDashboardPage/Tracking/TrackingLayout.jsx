import Pagination from "@/components/UI/Pagination";
import { Filter, Search } from "lucide-react";
import { useTrackingContext } from "@/contexts/Tracking/TrackingContext";
import CircleLoader from "@/components/UI/loaders/CircleLoader";

export default function TrackingLayout() {
  const {
    contracts,
    loading,
    error,
    pagination,
    handlePageChange,
    handleFilterChange,
  } = useTrackingContext();

  // Helper function to calculate duration in days
  const calculateDaysDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return "N/A";
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays.toString();
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format currency for display
  const formatCurrency = (amount, currency) => {
    if (!amount) return "Not available";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex bg-background px-2">
      {/* Main Content */}
      <div className="flex-1">
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
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

          {loading ? (
            <CircleLoader classNameOne="h-64" />
          ) : error ? (
            <div className="flex justify-center items-center h-64 text-red-500">
              <p>{error}</p>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="border border-border rounded-lg overflow-x-auto">
                <table className="w-full divide-y divide-border table-fixed">
                  <thead className="bg-tableHeader">
                    <tr>
                      <th className="px-2 py-3 text-left text-sm font-medium text-primary w-[15%]">
                        Contract No
                      </th>
                      <th className="px-2 py-3 text-left text-sm font-medium text-primary w-[15%]">
                        Vendor Name
                      </th>
                      <th className="px-2 py-3 text-left text-sm font-medium text-primary w-[12%]">
                        Contract Type
                      </th>
                      <th className="px-2 py-3 text-left text-sm font-medium text-primary w-[10%]">
                        From
                      </th>
                      <th className="px-2 py-3 text-left text-sm font-medium text-primary w-[10%]">
                        To
                      </th>
                      <th className="px-2 py-3 text-left text-sm font-medium text-primary w-[8%]">
                        Days
                      </th>
                      <th className="px-2 py-3 text-left text-sm font-medium text-primary w-[10%]">
                        Amount
                      </th>
                      <th className="px-2 py-3 text-left text-sm font-medium text-primary w-[10%]">
                        Billing
                      </th>
                      <th className="px-2 py-3 text-left text-sm font-medium text-primary w-[10%]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {contracts && contracts.length > 0 ? (
                      contracts.map((contract) => (
                        <tr key={contract.id} className="hover:bg-tableHeader">
                          <td className="px-2 py-3 whitespace-nowrap">
                            <div className="flex flex-col">
                              <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {contract.contractReference ||
                                  `Contract #${contract.id}`}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {formatDate(contract.agreementDate)}
                              </div>
                            </div>
                          </td>

                          <td
                            title={contract.vendor?.name || "N/A"}
                            className="px-2 py-3 text-sm text-foreground"
                          >
                            <div className="truncate">
                              {contract.vendor?.name || "N/A"}
                            </div>
                          </td>

                          <td
                            title={contract.contractType}
                            className="px-2 py-3 text-sm text-foreground truncate"
                          >
                            {contract.contractType}
                          </td>

                          <td className="px-2 py-3 text-sm text-foreground">
                            {formatDate(contract.contractStartDate)}
                          </td>

                          <td className="px-2 py-3 text-sm text-foreground">
                            {formatDate(contract.contractEndDate)}
                          </td>

                          <td className="px-2 py-3 text-sm text-foreground">
                            {calculateDaysDuration(
                              contract.contractStartDate,
                              contract.contractEndDate
                            )}
                          </td>

                          <td className="px-2 py-3 text-sm text-foreground truncate">
                            {formatCurrency(
                              contract.totalContractValue,
                              contract.currency
                            )}
                          </td>

                          <td
                            title={contract.billingMethod}
                            className="px-2 py-3 text-sm text-foreground truncate"
                          >
                            {contract.billingMethod}
                          </td>

                          <td className="px-2 py-3 text-sm text-gray-500 dark:text-gray-400">
                            <button className="inline-flex items-center px-2 py-1 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded text-gray-700 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="9"
                          className="px-4 py-8 text-center text-gray-500"
                        >
                          No contracts found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {contracts && contracts.length > 0 && (
                <div className="mt-4">
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={Math.ceil(pagination.total / pagination.limit)}
                    totalItems={pagination.total}
                    itemsPerPage={pagination.limit}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
