import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Pagination from "@/components/UI/Pagination";

/**
 * Reusable table component with pagination and action buttons
 * 
 * Features:
 * - Responsive table layout
 * - Loading and error states
 * - Pagination support
 * - Action buttons per row
 * - Accessibility features
 * 
 * @param {Object} props - Component props
 * @param {Array} props.data - Table data array
 * @param {Array} props.columns - Column configuration
 * @param {boolean} props.loading - Loading state
 * @param {string} props.error - Error message
 * @param {Object} props.pagination - Pagination configuration
 * @param {Function} props.onPageChange - Page change handler
 * @param {Object} props.actions - Action button configuration
 */
const ReusableTable = ({
  data,
  columns,
  loading,
  error,
  pagination,
  onPageChange,
  actions,
}) => {
  const [actionLoading, setActionLoading] = useState({});

  /**
   * Handle action button clicks with loading state
   * @param {string} action - Action name
   * @param {Object} row - Row data
   */
  const handleAction = useCallback(async (action, row) => {
    if (!actions || !actions[action]) return;
    
    setActionLoading((prev) => ({ ...prev, [row.id]: true }));
    try {
      await actions[action](row);
    } catch (err) {
      console.error("Action error:", err);
    } finally {
      setActionLoading((prev) => ({ ...prev, [row.id]: false }));
    }
  }, [actions]);

  // Early returns for loading and error states
  if (loading && (!data || !data.length)) {
    return (
      <div className="text-center py-8">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  if (error && (!data || !data.length)) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto border border-border rounded-lg">
        <table className="w-full divide-y divide-border table-fixed" role="table">
          <thead className="bg-tableHeader">
            <tr role="row">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-2 py-3 text-left text-sm font-medium text-primary"
                  scope="col"
                >
                  {col.label}
                </th>
              ))}
              {actions && (
                <th
                  className="px-2 py-3 text-left text-sm font-medium text-primary"
                  scope="col"
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-tableHeader" role="row">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-2 py-3 text-sm text-foreground truncate"
                    role="cell"
                  >
                    {row[col.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-2 py-3 text-sm text-foreground" role="cell">
                    <div className="flex flex-wrap gap-1">
                      {Object.keys(actions).map((action) => (
                        <button
                          key={action}
                          className="inline-flex items-center px-2 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          onClick={() => handleAction(action, row)}
                          disabled={actionLoading[row.id]}
                          aria-label={`${action} for row ${row.id}`}
                          type="button"
                        >
                          {actionLoading[row.id] ? "..." : action}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

/**
 * PropTypes for ReusableTable component
 */
ReusableTable.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    totalItems: PropTypes.number,
    itemsPerPage: PropTypes.number,
  }),
  onPageChange: PropTypes.func,
  actions: PropTypes.objectOf(PropTypes.func),
};

/**
 * Default props for ReusableTable component
 */
ReusableTable.defaultProps = {
  loading: false,
  error: null,
  pagination: null,
  onPageChange: null,
  actions: null,
};

export default ReusableTable;
