"use client"
import React from "react";
import { Eye, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
// import Pagination from "@/components/UI/Pagination";
// import CircleLoader from "@/components/UI/loaders/CircleLoader";
import { formatDate } from "@/utils/Common/date";
import ReusableTable from "@/components/UI/ReusableTable";

export default function OpeningsTable({
  openings,
  loading,
  error,
  pagination,
  onPageChange,
}) {
  const router = useRouter();

  const handleViewDetails = (openingId) => {
    router.push(`/user/vendor-openings/${openingId}`);
  };

  const handleUploadProfiles = (openingId) => {
    router.push(`/user/vendor-openings/${openingId}/upload`);
  };

  // Define columns for ReusableTable
  const tableColumns = [
    { key: "title", label: "Title" },
    { key: "location", label: "Location" },
    { key: "contractType", label: "Contract Type" },
    { key: "postedDate", label: "Posted Date" },
    { key: "hiringManager", label: "Hiring Manager" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions", minWidth: 360 },
  ];

  // Map data for ReusableTable
  const tableData = Array.isArray(openings)
    ? openings.map((opening) => ({
        id: opening.id,
        title: <div className="text-sm ml-1 font-medium">{opening.title}</div>,
        location: (
          <span className="inline-flex items-center justify-center text-xs">
            {opening.location || "Not specified"}
          </span>
        ),
        contractType: (
          <span className="inline-flex items-center justify-center px-2 py-1 rounded text-xs">
            {opening.contractType || "Not specified"}
          </span>
        ),
        postedDate: formatDate(opening.postedDate),
        hiringManager: (
          <div>
            <div className="text-sm font-medium">
              {opening.hiringManager?.name || "Not specified"}
            </div>
            <div className="text-sm text-gray-400">
              {opening.hiringManager?.email || ""}
            </div>
          </div>
        ),
        status: (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              opening.status === "OPEN"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                : opening.status === "CLOSED"
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
            }`}
          >
            {opening.status}
          </span>
        ),
        actions: (
          <div className="flex items-center -translate-x-8 flex-col w-full gap-2">
            <button
              className="px-3.5 py-1.5 text-xs border border-blue-600 text-blue-600 rounded-md flex items-center gap-1 hover:bg-blue-600 hover:text-white transition-colors min-w-[100px] justify-center"
              onClick={() => handleViewDetails(opening.id)}
            >
              <Eye className="h-4 w-4" />
              View Details
            </button>
            {opening.status === "OPEN" && (
              <button
                className="px-2 py-1.5 text-xs border border-green-600 text-green-600 rounded-md flex items-center gap-1 hover:bg-green-600 hover:text-white transition-colors min-w-[120px] justify-center"
                onClick={() => handleUploadProfiles(opening.id)}
              >
                <Upload className="h-4 w-4" />
                Upload Profiles
              </button>
            )}
          </div>
        ),
      }))
    : [];

  return (
    <ReusableTable
      data={tableData}
      columns={tableColumns}
      loading={loading}
      error={error}
      pagination={pagination}
      onPageChange={onPageChange}
    />
  );
} 