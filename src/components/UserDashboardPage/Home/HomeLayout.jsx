"use client";

import AreaChart1 from "./AreaChart1/AreaChart1";
import AreaChart2 from "./AreaChart2/AreaChart2";
import HeaderMetrics from "./HeaderMetrics/HeaderMetrics";
import HorizantalBarChartComponent from "./HorizontalBarChart/HorizontalBarChart";
import LineChartComponent from "./LineChart/LineChart";

export default function HomeLayout() {
  return (
    <div className="px-2">
      <HeaderMetrics />
      <div className="mt-6">
        <LineChartComponent />
      </div>
      <div className="mt-6 p-4 flex flex-col md:flex-row gap-4">
        <HorizantalBarChartComponent />
        <AreaChart1 />
      </div>
      <AreaChart2 />
    </div>
  );
}
