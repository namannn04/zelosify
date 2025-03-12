import AreaChart1 from "./AreaChart1/AreaChart1";
import AreaChart2 from "./AreaChart2/AreaChart2";
import BarChartComponent from "./BarChart/BarChart";
import ContractSpent from "./ContractsSpent/ContractSpent";
import HorizantalBarChartComponent from "./HorizontalBarChart/HorizontalBarChart";

export default function HomeLayout() {
  return (
    <div className="px-2">
      {/* Contracts spent and import functions */}
      <ContractSpent />
      {/* AreaChart and HorizontalBarChart */}
      <div className="flex items-center gap-4 w-full p-4">
        <AreaChart1 />
        <HorizantalBarChartComponent />
      </div>
      {/* BarChart */}
      <BarChartComponent />
      {/* AreaChart */}
      <AreaChart2 />
    </div>
  );
}
