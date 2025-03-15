"use client";

import { ContractSpendProvider } from "./ContractSpend/ContractSpendContext";
import { HeaderMetricsProvider } from "./HeaderMetrics/HeaderMetricsContext";

export default function DashBoardProviders({ children }) {
  return (
    <HeaderMetricsProvider>
      <ContractSpendProvider>{children}</ContractSpendProvider>
    </HeaderMetricsProvider>
  );
}
