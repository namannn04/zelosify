"use client"

import { useEffect } from "react"
import useUtilization from "../../../hooks/Dashboard/Utilization/useUtilization"
import UtilizationFilters from "./UtilizationFilters"
import UtilizationTable from "./UtilizationTable"
import PaginationControls from "./PaginationControls"
import Loader from "@/components/common/Loader"
import ErrorComponent from "@/components/common/ErrorComponent"
import EmptyState from "@/components/common/EmptyState"

const ActiveFilters = ({ filters, onClear }) => {
  const pills = Object.entries(filters)
    .filter(([key, value]) => value && key !== "page" && key !== "pageSize")
    .map(([key, value]) => (
      <span
        key={key}
        className="bg-[#252837] text-gray-300 text-sm px-3 py-1 rounded-full flex items-center gap-2 border border-gray-600"
      >
        {key}: {value}
        <button onClick={() => onClear(key)} className="text-gray-400 hover:text-white">
          ×
        </button>
      </span>
    ))

  return pills.length > 0 ? (
    <div className="mb-4">
      <div className="text-sm text-gray-400 mb-2">Active Filters:</div>
      <div className="flex flex-wrap gap-2">{pills}</div>
    </div>
  ) : null
}

const UtilizationLayout = () => {
  const { data, isLoading, error, filters, handleFetchUtilizationData, handleClearError, handleSetFilters } =
    useUtilization()

  useEffect(() => {
    handleFetchUtilizationData(filters)
  }, [filters, handleFetchUtilizationData])

  useEffect(() => {
    if (error) {
      console.error("Utilization Error:", error)
    }
  }, [error])

  if (isLoading) return <Loader />

  if (error)
    return (
      <ErrorComponent
        message={error}
        onRetry={() => {
          handleClearError()
          handleFetchUtilizationData({ ...filters, forceRefresh: true })
        }}
      />
    )

  const rows = data?.data || []
  const totalCount = data?.totalCount || 0

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Utilization</h1>
      </div>

      <UtilizationFilters />
      <ActiveFilters filters={filters} onClear={(key) => handleSetFilters({ [key]: "", page: 1 })} />

      {rows.length > 0 ? (
        <>
          <UtilizationTable data={rows} />
          <PaginationControls totalCount={totalCount} />
        </>
      ) : (
        <EmptyState message="No utilization data found." />
      )}
    </div>
  )
}

export default UtilizationLayout

