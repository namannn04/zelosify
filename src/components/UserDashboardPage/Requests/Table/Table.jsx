import React from "react";
import { Check, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { useRequests } from "../../../../contexts/Requests/RequestContext";
import Pagination from "../../../UI/Pagination";
import CircleLoader from "@/components/UI/loaders/CircleLoader";

export default function Table() {
  const {
    requests,
    loading,
    error,
    pagination,
    approveRequest,
    rejectRequest,
    getAIRecommendation,
    changePage,
  } = useRequests();

  const [aiRecommendations, setAiRecommendations] = useState({});
  const [actionLoading, setActionLoading] = useState({});

  const handleApprove = async (id) => {
    if (actionLoading[id]) return;

    setActionLoading((prev) => ({ ...prev, [id]: "approve" }));
    try {
      await approveRequest(id);
    } catch (err) {
      console.error("Error approving request:", err);
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: null }));
    }
  };

  const handleReject = async (id) => {
    if (actionLoading[id]) return;

    setActionLoading((prev) => ({ ...prev, [id]: "reject" }));
    try {
      await rejectRequest(id);
    } catch (err) {
      console.error("Error rejecting request:", err);
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: null }));
    }
  };

  const handleAskAI = async (id) => {
    if (actionLoading[id]) return;

    // If recommendation already exists, toggle visibility
    if (aiRecommendations[id]) {
      setAiRecommendations((prev) => ({
        ...prev,
        [id]: prev[id] ? null : prev[id],
      }));
      return;
    }

    setActionLoading((prev) => ({ ...prev, [id]: "ai" }));
    try {
      const response = await getAIRecommendation(id);
      setAiRecommendations((prev) => ({
        ...prev,
        [id]: response.aiRecommendation,
      }));
    } catch (err) {
      console.error("Error getting AI recommendation:", err);
    } finally {
      setActionLoading((prev) => ({ ...prev, [id]: null }));
    }
  };

  if (loading && (!requests || !requests.length)) {
    return <CircleLoader />;
  }

  if (error && (!requests || !requests.length)) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (!requests || !requests.length) {
    return <div className="text-center py-8">No contract requests found.</div>;
  }

  // Create a flat array that includes both requests and their recommendations
  const tableRows = [];
  requests.forEach((request) => {
    // Add the request row
    tableRows.push({
      type: "request",
      data: request,
    });

    // If there's an AI recommendation for this request, add it as a separate row
    if (aiRecommendations[request.id]) {
      tableRows.push({
        type: "recommendation",
        requestId: request.id,
        recommendation: aiRecommendations[request.id],
      });
    }
  });

  console.log(requests);

  return (
    <div className="space-y-4">
      <div className="rounded-lg overflow-hidden border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-tableHeader">
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                Contract No.
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                Raised By
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                Business Unit
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                Requested On
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <React.Fragment key={`container-${request.id}`}>
                <tr
                  key={`request-${request.id}`}
                  className="border-b border-border hover:bg-tableHeader"
                >
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium">
                      {request.contractNumber}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <div className="text-sm font-medium">
                        {request.requestedBy?.firstName}{" "}
                        {request.requestedBy?.lastName}
                      </div>
                      <div className="text-sm text-gray-400">
                        {request.requestedBy?.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center justify-center text-xs">
                      {request.department}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center justify-center px-2 py-1 rounded text-xs">
                      ${parseFloat(request.contractAmount).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.status === "APPROVED"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                          : request.status === "REJECTED"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {request.status === "PENDING" ? (
                      <div className="flex items-center gap-2">
                        {/* Approve Button - Green */}
                        <button
                          className={`px-3 py-1.5 text-xs border border-green-600 text-green-600 rounded-md flex items-center gap-1 hover:bg-green-600 hover:text-white transition-colors min-w-[90px] justify-center ${
                            actionLoading[request.id] === "approve"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => handleApprove(request.id)}
                          disabled={!!actionLoading[request.id]}
                        >
                          {actionLoading[request.id] === "approve" ? (
                            <CircleLoader
                              classNameOne={"h-4"}
                              classNameTwo={"h-4 w-4"}
                            />
                          ) : (
                            <>
                              <Check className="h-4 w-4" />
                              Approve
                            </>
                          )}
                        </button>

                        {/* Deny Button - Red */}
                        <button
                          className={`px-3 py-1.5 text-xs border border-red-600 text-red-600 rounded-md flex items-center gap-1 hover:bg-red-600 hover:text-white transition-colors min-w-[80px] justify-center ${
                            actionLoading[request.id] === "reject"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          onClick={() => handleReject(request.id)}
                          disabled={!!actionLoading[request.id]}
                        >
                          {actionLoading[request.id] === "reject" ? (
                            <CircleLoader
                              classNameOne={"h-4"}
                              classNameTwo={"h-4 w-4"}
                            />
                          ) : (
                            <>
                              <X className="h-4 w-4" />
                              Deny
                            </>
                          )}
                        </button>

                        {/* Ask AI Button - Purple */}
                        <button
                          className={`px-3 py-1.5 text-xs border border-purple-600 text-purple-600 rounded-md flex items-center gap-1 hover:bg-purple-600 hover:text-white transition-colors min-w-[80px] justify-center ${
                            actionLoading[request.id] === "ai"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          } ${
                            aiRecommendations[request.id]
                              ? "bg-purple-600 text-white"
                              : ""
                          }`}
                          onClick={() => handleAskAI(request.id)}
                          disabled={!!actionLoading[request.id]}
                        >
                          {actionLoading[request.id] === "ai" ? (
                            <CircleLoader
                              classNameOne={"h-4"}
                              classNameTwo={"h-4 w-4"}
                            />
                          ) : (
                            <>
                              <Sparkles className="h-4 w-4" />
                              Ask AI
                            </>
                          )}
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {request.status === "APPROVED"
                          ? "Approved"
                          : "Rejected"}
                      </span>
                    )}
                  </td>
                </tr>

                {/* AI Recommendation Row */}
                {aiRecommendations[request.id] && (
                  <tr
                    key={`recommendation-${request.id}`}
                    className="border-b border-border bg-purple-50 dark:bg-purple-900/20"
                  >
                    <td colSpan={7} className="px-4 py-4">
                      <div className="text-sm flex items-start gap-2 relative">
                        <div className="bg-purple-100 dark:bg-purple-800 p-1 rounded">
                          <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-300" />
                        </div>
                        <div className="flex-1">
                          <span className="font-medium text-purple-700 dark:text-purple-300">
                            AI Recommendation:
                          </span>
                          <div className="mt-1 p-3 bg-white dark:bg-gray-800 rounded border border-purple-200 dark:border-purple-700 text-gray-800 dark:text-gray-200">
                            {aiRecommendations[request.id]}
                          </div>
                        </div>
                        <button
                          onClick={() => handleAskAI(request.id)}
                          className="absolute top-0 right-0 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          aria-label="Close recommendation"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.pages}
        totalItems={pagination.total}
        itemsPerPage={pagination.limit}
        onPageChange={changePage}
      />
    </div>
  );
}
