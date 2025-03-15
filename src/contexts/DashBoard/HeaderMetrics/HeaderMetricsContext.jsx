"use client";

import axiosInstance from "@/utils/axios/AxiosInstance";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const HeaderMetricsContext = createContext({});

export const HeaderMetricsProvider = ({ children }) => {
  const [metricsData, setMetricsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get("/dashboard/header-metrics");
        setMetricsData(response.data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching metrics");
        console.error("Error fetching metrics:", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (pathname === "/user") fetchMetrics();
  }, [pathname]);

  // Convert the metrics object to the format our UI expects
  const getFormattedMetrics = () => {
    if (!metricsData) return [];

    return [
      {
        icon: "user",
        value: metricsData.totalActiveContracts.toString(),
        label: "Total Active Contracts",
        change: { type: "increase", value: "Compared to last quarter" },
      },
      {
        icon: "download",
        value: metricsData.contractsInProgress.toString(),
        label: "Contracts in Progress",
        change: { type: "increase", value: "Compared to last quarter" },
      },
      {
        icon: "stack",
        value: `$${parseInt(
          metricsData.totalContractAmountSpent
        ).toLocaleString()}`,
        label: "Total Contract Amount Spent",
        change: { type: "increase", value: "Compared to last quarter" },
      },
      {
        icon: "book",
        value: metricsData.totalVendorCount.toString(),
        label: "Total Vendor Count",
        change: { type: "increase", value: "Compared to last quarter" },
      },
    ];
  };
  return (
    <HeaderMetricsContext.Provider
      value={{
        isLoading,
        error,
        getFormattedMetrics,
      }}
    >
      {children}
    </HeaderMetricsContext.Provider>
  );
};

export default HeaderMetricsContext;
