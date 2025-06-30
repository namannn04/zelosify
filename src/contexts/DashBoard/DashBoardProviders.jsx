"use client";

import { ContractSpendProvider } from "./ContractSpend/ContractSpendContext";

export default function DashBoardProviders({ children }) {
  return <ContractSpendProvider>{children}</ContractSpendProvider>;
}
