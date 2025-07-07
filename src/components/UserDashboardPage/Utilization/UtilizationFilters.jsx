"use client"

import { useEffect, useState } from "react"
import useUtilization from "@/hooks/Dashboard/Utilization/useUtilization"
import { debounce } from "lodash"

const UtilizationFilters = () => {
  const { filters, filterOptions, handleSetFilters, handleFetchFilterOptions } = useUtilization()

  const [searchText, setSearchText] = useState(filters.search || "")
  const [vendor, setVendor] = useState(filters.vendor || "")
  const [contract, setContract] = useState(filters.contract || "")
  const [status, setStatus] = useState(filters.status || "")
  const [pageSize, setPageSize] = useState(filters.pageSize || 10)

  const debouncedSearch = debounce((value) => {
    handleSetFilters({ search: value })
  }, 500)

  useEffect(() => {
    handleFetchFilterOptions()
  }, [handleFetchFilterOptions])

  useEffect(() => {
    debouncedSearch(searchText)
    return () => debouncedSearch.cancel()
  }, [searchText])

  // Handle filters
  const handleFilterChange = () => {
    handleSetFilters({
      vendor,
      contract,
      status,
      page: 1,
      pageSize,
    })
  }

  // 🔄 Reset 
  const resetFilters = () => {
    setSearchText("")
    setVendor("")
    setContract("")
    setStatus("")
    setPageSize(10)
    handleSetFilters({
      search: "",
      vendor: "",
      contract: "",
      status: "",
      page: 1,
      pageSize: 10,
    })
  }

  const handlePageSizeChange = (e) => {
    const newSize = Number.parseInt(e.target.value)
    setPageSize(newSize)
    handleSetFilters({ pageSize: newSize, page: 1 })
  }

  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-[#252837] border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Vendor */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-400 mb-1">Vendor</label>
            <select
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              className="bg-[#252837] border border-gray-600 rounded-lg px-3 py-2 text-gray-300 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Vendors</option>
              {filterOptions.vendors?.map((vendorOption) => (
                <option key={vendorOption} value={vendorOption}>
                  {vendorOption}
                </option>
              ))}
            </select>
          </div>

          {/* Contract */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-400 mb-1">Contract</label>
            <select
              value={contract}
              onChange={(e) => setContract(e.target.value)}
              className="bg-[#252837] border border-gray-600 rounded-lg px-3 py-2 text-gray-300 min-w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Contracts</option>
              {filterOptions.contracts?.map((contractOption) => (
                <option key={contractOption} value={contractOption}>
                  {contractOption}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-400 mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-[#252837] border border-gray-600 rounded-lg px-3 py-2 text-gray-300 min-w-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              {filterOptions.statuses?.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </select>
          </div>

          {/* Page Size */}
          <div className="flex flex-col">
            <label className="text-xs text-gray-400 mb-1">Rows per page</label>
            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="bg-[#252837] border border-gray-600 rounded-lg px-3 py-2 text-gray-300 min-w-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        <div className="flex items-end gap-2">
          <button
            onClick={handleFilterChange}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export default UtilizationFilters

