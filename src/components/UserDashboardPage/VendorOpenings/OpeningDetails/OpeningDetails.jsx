"use client"
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Upload, User, Calendar, MapPin, FileText } from "lucide-react";
import useVendorOpenings from "@/hooks/Dashboard/Vendor/useVendorOpenings";
import CircleLoader from "@/components/UI/loaders/CircleLoader";
import { formatDate } from "@/utils/Common/date";

export default function OpeningDetails() {
  const params = useParams();
  const router = useRouter();
  const { getOpeningById, loading, error } = useVendorOpenings();
  const [opening, setOpening] = useState(null);

  useEffect(() => {
    if (params.id) {
      const fetchOpening = async () => {
        try {
          const data = await getOpeningById(params.id);
          setOpening(data);
        } catch (err) {
          console.error("Error fetching opening details:", err);
        }
      };
      fetchOpening();
    }
  }, [params.id]);

  const handleBack = () => {
    router.push("/user/vendor-openings");
  };

  const handleUploadProfiles = () => {
    router.push(`/user/vendor-openings/${params.id}/upload`);
  };

  if (loading) {
    return <CircleLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen text-foreground bg-background">
        <div className="px-6 py-4">
          <div className="text-center py-8 text-red-500">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!opening) {
    return (
      <div className="min-h-screen text-foreground bg-background">
        <div className="px-6 py-4">
          <div className="text-center py-8">Opening not found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground bg-background">
      <div className="px-6 py-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Openings
          </button>
        </div>

        {/* Opening Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {opening.title}
          </h1>
          <div className="flex items-center gap-4 mt-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                opening.status === "OPEN"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                  : opening.status === "CLOSED"
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
              }`}
            >
              {opening.status}
            </span>
            <span className="text-sm text-gray-500">
              Posted on {formatDate(opening.postedDate)}
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            {opening.description && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-border p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Description
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {opening.description}
                </p>
              </div>
            )}

            {/* Key Details */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold mb-4">Key Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {opening.location && (
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="text-gray-900 dark:text-white">{opening.location}</p>
                    </div>
                  </div>
                )}
                {opening.contractType && (
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Contract Type</p>
                      <p className="text-gray-900 dark:text-white">{opening.contractType}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Hiring Manager & Actions */}
          <div className="space-y-6">
            {/* Hiring Manager */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-border p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Hiring Manager
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p className="text-gray-900 dark:text-white">
                    {opening.hiringManager?.name || "Not specified"}
                  </p>
                </div>
                {opening.hiringManager?.email && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-gray-900 dark:text-white">
                      {opening.hiringManager.email}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            {opening.status === "OPEN" && (
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-border p-6">
                <h2 className="text-xl font-semibold mb-4">Actions</h2>
                <button
                  onClick={handleUploadProfiles}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Upload className="h-5 w-5" />
                  Upload Candidate Profiles
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 