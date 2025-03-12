import AreaChart1 from "./AreaChart1/AreaChart1";
import BarChartComponent from "./BarChart/BarChart";
import ContractSpent from "./ContractsSpent/ContractSpent";
import HorizantalBarChartComponent from "./HorizontalBarChart/HorizontalBarChart";

export default function HomeLayout() {
  return (
    <div className="px-2">
      <ContractSpent />
      <div className="mt-6">
        <BarChartComponent />
      </div>
      <div className="mt-6 p-4 flex flex-col md:flex-row gap-4">
        <HorizantalBarChartComponent />
        <AreaChart1 />
      </div>
    </div>
  );
}
