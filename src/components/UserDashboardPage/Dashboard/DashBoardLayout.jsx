import ContractSpent from "./ContractsSpent/ContractSpent";
// import LineGraph from "./LineGraph/LineGraph";

export default function DashBoardLayout() {
  return (
    <div className="px-2">
      {/* Contracts spent and import functions */}
      <ContractSpent />
      {/* LineGraph */}
      {/* <LineGraph /> */}
    </div>
  );
}
