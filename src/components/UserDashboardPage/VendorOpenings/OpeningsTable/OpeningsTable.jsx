"use client"
import React from "react";
import { Eye, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/UI/Pagination";
import CircleLoader from "@/components/UI/loaders/CircleLoader";
import { formatDate } from "@/utils/Common/date";

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

  if (loading && (!openings || !openings.length)) {
    return <CircleLoader />;
  }

  if (error && (!openings || !openings.length)) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (!openings || !openings.length) {
    return <div className="text-center py-8">No contract openings found.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg overflow-hidden border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-tableHeader">
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                Location
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                Contract Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                Posted Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                Hiring Manager
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {openings.map((opening) => (
              <tr
                key={opening.id}
                className="border-b border-border hover:bg-tableHeader"
              >
                <td className="px-4 py-4">
                  <div className="text-sm font-medium">{opening.title}</div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center justify-center text-xs">
                    {opening.location || "Not specified"}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center justify-center px-2 py-1 rounded text-xs">
                    {opening.contractType || "Not specified"}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm">
                  {formatDate(opening.postedDate)}
                </td>
                <td className="px-4 py-4">
                  <div>
                    <div className="text-sm font-medium">
                      {opening.hiringManager?.name || "Not specified"}
                    </div>
                    <div className="text-sm text-gray-400">
                      {opening.hiringManager?.email || ""}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
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
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    {/* View Details Button */}
                    <button
                      className="px-3 py-1.5 text-xs border border-blue-600 text-blue-600 rounded-md flex items-center gap-1 hover:bg-blue-600 hover:text-white transition-colors min-w-[100px] justify-center"
                      onClick={() => handleViewDetails(opening.id)}
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </button>

                    {/* Upload Profiles Button - Only show if status is OPEN */}
                    {opening.status === "OPEN" && (
                      <button
                        className="px-3 py-1.5 text-xs border border-green-600 text-green-600 rounded-md flex items-center gap-1 hover:bg-green-600 hover:text-white transition-colors min-w-[120px] justify-center"
                        onClick={() => handleUploadProfiles(opening.id)}
                      >
                        <Upload className="h-4 w-4" />
                        Upload Profiles
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-center">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
} 