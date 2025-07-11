"use client";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookIcon,
  DownloadIcon,
  Layers,
  Upload,
  UserIcon,
} from "lucide-react";
import ImportPopUp from "../ImportDoc/ImportPopUp";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import useHeaderMetrics from "@/hooks/Dashboard/Home/HeaderMetrics/useHeaderMetrics";
import CardSkeleton from "@/components/UI/loaders/CardSkeleton";
import { Button } from "@/components/UI/shadcn/button";

// Map icons to their respective components
const iconMapping = {
  user: UserIcon,
  download: DownloadIcon,
  stack: Layers,
  book: BookIcon,
};

export default function HeaderMetrics() {
  const [isImportOpen, setIsImportOpen] = useState(false);
  const pathname = usePathname();
  const { isLoading, error, getFormattedMetrics, handleFetchHeaderMetrics } =
    useHeaderMetrics();

  const hasFetchedData = useRef(false);

  // Fetch metrics when component mounts and we're on the correct route
  useEffect(() => {
    if (pathname === "/user" && !hasFetchedData.current) {
      handleFetchHeaderMetrics();
      hasFetchedData.current = true;
    }
  }, [pathname, handleFetchHeaderMetrics]);

  // Function to get the correct icon component
  const getIcon = (iconName) => {
    const IconComponent = iconMapping[iconName] || UserIcon;
    const colors = {
      user: "text-orange-500",
      download: "text-red-500",
      stack: "text-purple-500",
      book: "text-blue-500",
    };

    return (
      <IconComponent
        className={`w-6 h-6 ${colors[iconName] || "text-primary"}`}
      />
    );
  };

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Contracts Intelligence
        </h2>
        <Button onClick={() => setIsImportOpen(true)}>
          <Upload className="w-4 h-4" />
          Import
        </Button>
      </div>

      {/* Import Popup */}
      <ImportPopUp
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
      />

      {/* Metrics Grid */}
      {isLoading ? (
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            // custom loading sleleton
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 h-[152px] flex-center">
          Error loading metrics: {error}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {getFormattedMetrics().map((metric, index) => (
            <div
              key={index}
              className="bg-background p-2 rounded-lg border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  {getIcon(metric.icon)}
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-primary mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-secondary mb-3">
                  {metric.label}
                </div>
                <div className="flex items-center">
                  {metric.change.type === "increase" ? (
                    <>
                      <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 dark:text-green-400">
                        {metric.change.value}
                      </span>
                    </>
                  ) : (
                    <>
                      <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
                      <span className="text-sm text-red-600 dark:text-red-400">
                        {metric.change.value}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
