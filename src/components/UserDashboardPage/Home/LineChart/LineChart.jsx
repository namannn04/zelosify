"use client";

// Contract Spend Summary Line Chart Component
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/shadcn/card";
import CircleLoader from "@/components/UI/loaders/CircleLoader";

// Import modular components
import {
  ErrorDisplay,
  EmptyState,
  ChartDisplay,
  FilterControls,
} from "./components";

// Import custom hook
import useLineChartLogic from "./hooks/useLineChartLogic";

export default function LineChartComponent() {
  const {
    // State and setters
    selectedVendor,
    setSelectedVendor,
    selectedTimeRange,
    selectedIndustry,
    setSelectedIndustry,
    topVendorsCount,
    setTopVendorsCount,
    calendarOpen,
    setCalendarOpen,
    tempFromDate,
    tempToDate,

    // Context data
    allVendors,
    industries,
    isLoading,
    error,
    vendorColors,

    // Computed values
    filteredData,
    vendorsToShow,
    chartConfig,

    // Event handlers
    handleTempDateSelect,
    handleCalendarOpen,
    handleCalendarClose,
    handleCalendarCancel,
    handleTimeRangeChange,
    handleApplyDateRange,
  } = useLineChartLogic();

  return (
    <div className="p-4">
      <Card>
        <CardHeader className="flex flex-col space-y-0 border-b border-border p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Contract Spend Trends</CardTitle>
              <CardDescription className="mt-2">
                Visualizing top {topVendorsCount} contract expenditures over
                time
              </CardDescription>
            </div>
            <FilterControls
              topVendorsCount={topVendorsCount}
              setTopVendorsCount={setTopVendorsCount}
              selectedVendor={selectedVendor}
              setSelectedVendor={setSelectedVendor}
              selectedTimeRange={selectedTimeRange}
              handleTimeRangeChange={handleTimeRangeChange}
              calendarOpen={calendarOpen}
              setCalendarOpen={setCalendarOpen}
              handleCalendarOpen={handleCalendarOpen}
              handleCalendarClose={handleCalendarClose}
              handleCalendarCancel={handleCalendarCancel}
              tempFromDate={tempFromDate}
              tempToDate={tempToDate}
              handleDateSelect={handleTempDateSelect}
              selectedIndustry={selectedIndustry}
              setSelectedIndustry={setSelectedIndustry}
              allVendors={allVendors}
              industries={industries}
              onApply={handleApplyDateRange}
            />
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          {isLoading ? (
            <CircleLoader />
          ) : error ? (
            <ErrorDisplay error={error} />
          ) : !filteredData ||
            filteredData.length === 0 ||
            !vendorsToShow ||
            vendorsToShow.length === 0 ? (
            <EmptyState />
          ) : (
            <ChartDisplay
              filteredData={filteredData}
              vendorsToShow={vendorsToShow}
              chartConfig={chartConfig}
              vendorColors={vendorColors}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
