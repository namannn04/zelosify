"use client";
import { ArrowDownIcon, Upload } from "lucide-react";
import ImportPopUp from "../ImportDoc/ImportPopUp";
import { useState, useContext } from "react";
import HeaderMetricsContext from "@/contexts/DashBoard/HeaderMetrics/HeaderMetricsContext";
import CardSkeleton from "@/components/UI/loaders/CardSkeleton";

/* Icon Components */
const UserIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DownloadIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 10L12 15L17 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 15V3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StackIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 17L12 22L22 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12L12 17L22 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 2L2 7L12 12L22 7L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BookIcon = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 21V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 21H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 7H15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 11H15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 15H13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UpArrow = (props) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 19V5M12 5L5 12M12 5L19 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Map icons to their respective components
const iconMapping = {
  user: UserIcon,
  download: DownloadIcon,
  stack: StackIcon,
  book: BookIcon,
};

export default function HeaderMetrics() {
  const [isImportOpen, setIsImportOpen] = useState(false);
  const { isLoading, error, getFormattedMetrics } =
    useContext(HeaderMetricsContext);

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
        <h2 className="text-2xl font-bold text-foreground">Contracts Spent</h2>
        <button
          onClick={() => setIsImportOpen(true)}
          className="flex items-center px-4 py-2 text-sm font-medium text-background bg-foreground rounded-md transition"
        >
          <Upload className="w-4 h-4 mr-2" />
          Import
        </button>
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
                <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
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
                      <UpArrow className="w-4 h-4 text-green-500 mr-1" />
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
