"use client";

import { useState } from "react";

const UtilizationFilters = ({ onFilterChange, filterOptions = {} }) => {
  const [filters, setFilters] = useState({
    search: "",
    vendor: "",
    contract: "",
    status: "",
  });

  const handleInputChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const resetFilters = () => {
    const emptyFilters = { search: "", vendor: "", contract: "", status: "" };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="bg-background border border-border rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <div>
          <label className="block text-sm text-foreground mb-2">
            Search Employee
          </label>
          <input
            type="text"
            placeholder="Search by name or email"
            value={filters.search}
            onChange={(e) => handleInputChange("search", e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground placeholder-secondary focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Vendor */}
        <div>
          <label className="block text-sm text-foreground mb-2">Vendor</label>
          <select
            value={filters.vendor}
            onChange={(e) => handleInputChange("vendor", e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Vendors</option>
            {filterOptions.vendors?.map((vendor, index) => (
              <option key={`vendor-${index}`} value={vendor}>
                {vendor}
              </option>
            ))}
          </select>
        </div>

        {/* Contract */}
        <div>
          <label className="block text-sm text-foreground mb-2">Contract</label>
          <select
            value={filters.contract}
            onChange={(e) => handleInputChange("contract", e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Contracts</option>
            {filterOptions.contracts?.map((contract, index) => (
              <option key={`contract-${index}`} value={contract}>
                {contract}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm text-foreground mb-2">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All Statuses</option>
            {filterOptions.statuses?.map((status, index) => (
              <option key={`status-${index}`} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filter Actions */}
      <div className="flex gap-3">
        <button
          onClick={applyFilters}
          className="bg-primary text-white dark:bg-white dark:text-black px-6 py-2 rounded-lg hover:bg-primary/90 dark:hover:bg-gray-100 transition-colors font-medium"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="bg-secondary text-white dark:bg-gray-100 dark:text-black px-4 py-2 rounded-lg hover:bg-secondary/80 dark:hover:bg-gray-200 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default UtilizationFilters;
