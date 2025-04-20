"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Legend } from "recharts";
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/shadcn/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/UI/shadcn/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/shadcn/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/shadcn/popover";
import { Button } from "@/components/UI/shadcn/button";
import { CalendarDaysIcon } from "lucide-react";
import { format } from "date-fns";
import CircleLoader from "@/components/UI/loaders/CircleLoader";
import ContractSpendContext from "@/contexts/DashBoard/ContractSpend/ContractSpendContext";

// Memoized Error component
const ErrorDisplay = memo(({ error }) => (
  <div className="flex justify-center items-center h-[350px] w-full text-red-500">
    Error loading chart data: {error}
  </div>
));

// Memoized Empty State component
const EmptyState = memo(() => (
  <div className="flex justify-center items-center h-[350px] w-full text-gray-500">
    No data available for the selected filters. Please try different filters.
  </div>
));

// Memoized Chart component
const ChartDisplay = memo(
  ({ filteredData, vendorsToShow, chartConfig, vendorColors }) => (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[350px] w-full"
    >
      <AreaChart
        accessibilityLayer
        data={filteredData}
        margin={{
          left: 12,
          right: 12,
          bottom: 20,
        }}
      >
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            const [year, month] = value.split("-");
            const date = new Date(year, parseInt(month) - 1);
            return date.toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            });
          }}
          style={{ fontSize: "12px", fill: "var(--foreground)" }}
        />
        <YAxis
          tickFormatter={(value) => `$${value / 1000}k`}
          style={{ fontSize: "12px", fill: "var(--foreground)" }}
        />
        <ChartTooltip
          cursor={{ stroke: "var(--muted)" }}
          content={
            <ChartTooltipContent
              className="w-[200px] bg-background"
              labelFormatter={(value) => {
                const [year, month] = value.split("-");
                const date = new Date(year, parseInt(month) - 1);
                return date.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                });
              }}
              formatter={(value, name, props) => {
                const color = vendorColors[name] || "hsl(var(--chart-1))";
                return (
                  <span style={{ color }}>
                    {name}: ${value.toLocaleString()}
                  </span>
                );
              }}
            />
          }
        />
        {vendorsToShow.map((vendor) => (
          <Area
            key={vendor}
            type="monotone"
            dataKey={vendor}
            stroke={vendorColors[vendor] || "hsl(var(--chart-1))"}
            fill={vendorColors[vendor] || "hsl(var(--chart-1))"}
            fillOpacity={0.2}
            name={vendor}
            activeDot={{ r: 6 }}
            stackId="1"
          />
        ))}
        <Legend wrapperStyle={{ paddingTop: 16 }} />
      </AreaChart>
    </ChartContainer>
  )
);

// Memoized Filter Controls component
const FilterControls = memo(
  ({
    topVendorsCount,
    setTopVendorsCount,
    selectedVendor,
    setSelectedVendor,
    selectedTimeRange,
    handleTimeRangeChange,
    calendarOpen,
    setCalendarOpen,
    handleCalendarOpen,
    fromDate,
    toDate,
    handleDateSelect,
    selectedIndustry,
    setSelectedIndustry,
    allVendors,
    industries,
    onApply,
  }) => (
    <div className="flex flex-col sm:flex-row gap-2">
      <Select value={topVendorsCount} onValueChange={setTopVendorsCount}>
        <SelectTrigger
          className="w-[160px] rounded-lg"
          aria-label="Select top vendors count"
        >
          <SelectValue placeholder="Top 5 Vendors" />
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-background text-foreground">
          {[3, 4, 5, 6].map((count) => (
            <SelectItem
              key={count}
              value={count.toString()}
              className="rounded-lg hover:bg-tableHeader"
            >
              Top {count} Vendors
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedVendor} onValueChange={setSelectedVendor}>
        <SelectTrigger
          className="w-[160px] rounded-lg"
          aria-label="Select vendor"
        >
          <SelectValue placeholder="All Vendors" />
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-background text-foreground">
          <SelectItem value="All Vendors" className="rounded-lg">
            All Vendors
          </SelectItem>
          {allVendors.map((vendor) => (
            <SelectItem
              key={vendor}
              value={vendor}
              className="rounded-lg hover:bg-tableHeader"
            >
              {vendor}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedTimeRange} onValueChange={handleTimeRangeChange}>
        <SelectTrigger
          className="w-[160px] rounded-lg"
          aria-label="Select time range"
        >
          <SelectValue placeholder="Last 90 Days" />
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-background text-foreground">
          <SelectItem value="90d" className="rounded-lg">
            Last 90 Days
          </SelectItem>
          <SelectItem value="60d" className="rounded-lg">
            Last 60 Days
          </SelectItem>
          <SelectItem value="30d" className="rounded-lg">
            Last 30 Days
          </SelectItem>
          <SelectItem value="custom" className="rounded-lg">
            Custom Range
          </SelectItem>
        </SelectContent>
      </Select>

      {selectedTimeRange === "custom" && (
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="rounded-lg flex items-center justify-center font-normal"
              onClick={handleCalendarOpen}
            >
              <CalendarDaysIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4 bg-background border border-border shadow-md rounded-lg">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-foreground">
                Select Date Range
              </h3>
              <div className="grid gap-3">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="from-date"
                    className="text-xs text-muted-foreground"
                  >
                    From Date
                  </label>
                  <input
                    id="from-date"
                    type="date"
                    className="p-2 text-sm rounded-md border border-input bg-transparent"
                    value={fromDate ? format(fromDate, "yyyy-MM-dd") : ""}
                    onChange={(e) => {
                      if (e.target.value) {
                        handleDateSelect(new Date(e.target.value), "from");
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="to-date"
                    className="text-xs text-muted-foreground"
                  >
                    To Date
                  </label>
                  <input
                    id="to-date"
                    type="date"
                    className="p-2 text-sm rounded-md border border-input bg-transparent"
                    value={toDate ? format(toDate, "yyyy-MM-dd") : ""}
                    onChange={(e) => {
                      if (e.target.value) {
                        handleDateSelect(new Date(e.target.value), "to");
                      }
                    }}
                    min={fromDate ? format(fromDate, "yyyy-MM-dd") : ""}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  className="disabled:hover:cursor-not-allowed rounded-lg text-xs text-background bg-foreground"
                  size="sm"
                  onClick={onApply}
                  disabled={!fromDate || !toDate}
                >
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}

      <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
        <SelectTrigger
          className="w-[180px] rounded-lg"
          aria-label="Select industry"
        >
          <SelectValue placeholder="All Industries" />
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-background text-foreground">
          <SelectItem value="All Industries" className="rounded-lg">
            All Industries
          </SelectItem>
          {industries &&
            industries.map((industry) => (
              <SelectItem
                key={industry}
                value={industry}
                className="rounded-lg hover:bg-tableHeader"
              >
                {industry}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
);

export default function LineChartComponent() {
  const [selectedVendor, setSelectedVendor] = useState("All Vendors");
  const [selectedTimeRange, setSelectedTimeRange] = useState("90d");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  const [topVendorsCount, setTopVendorsCount] = useState("5");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  // Temporary states for custom date selection
  const [tempFromDate, setTempFromDate] = useState(null);
  const [tempToDate, setTempToDate] = useState(null);

  const {
    allVendors,
    industries,
    isLoading,
    error,
    getFilteredData,
    getVendorsToShow,
    createChartConfig,
    vendorColors,
    setTopVendors,
    setCustomDateRange,
  } = useContext(ContractSpendContext);

  // Update localStorage when selectedVendor changes (for other components to detect)
  useEffect(() => {
    localStorage.setItem("selectedVendor", selectedVendor);
  }, [selectedVendor]);

  // Update topVendors in context when topVendorsCount changes
  useEffect(() => {
    if (typeof setTopVendors === "function") {
      setTopVendors(topVendorsCount);
    }
  }, [topVendorsCount, setTopVendors]);

  // Handle date selection for temp states
  const handleTempDateSelect = useCallback((date, type) => {
    if (type === "from") {
      setTempFromDate(date);
    } else {
      setTempToDate(date);
    }
  }, []);

  // Reset temp date picker when opening
  const handleCalendarOpen = useCallback(() => {
    setTempFromDate(fromDate);
    setTempToDate(toDate);
    setCalendarOpen(true);
  }, [fromDate, toDate]);

  // Handle time range change
  const handleTimeRangeChange = useCallback(
    (value) => {
      setSelectedTimeRange(value);
      if (value !== "custom") {
        setFromDate(null);
        setToDate(null);
        setTempFromDate(null);
        setTempToDate(null);
        // Also update the context to stop using custom date range
        if (typeof setCustomDateRange === "function") {
          setCustomDateRange({ fromDate: null, toDate: null });
        }
      } else {
        setTempFromDate(fromDate);
        setTempToDate(toDate);
        setCalendarOpen(true);
      }
    },
    [setCustomDateRange, fromDate, toDate]
  );

  // Format date range for display - memoized
  const formattedDateRange = useMemo(() => {
    if (fromDate && toDate) {
      return `${format(fromDate, "MMM dd, yyyy")} - ${format(
        toDate,
        "MMM dd, yyyy"
      )}`;
    }
    return "Select date range";
  }, [fromDate, toDate]);

  // Update the context whenever the time range changes
  useEffect(() => {
    if (selectedTimeRange === "custom") {
      if (fromDate && toDate && typeof setCustomDateRange === "function") {
        setCustomDateRange({ fromDate, toDate });
      }
    }
  }, [selectedTimeRange, fromDate, toDate, setCustomDateRange]);

  // Get filtered data based on selected filters
  const filteredData = useMemo(() => {
    // Ensure getFilteredData is a function
    if (typeof getFilteredData !== "function") {
      console.error("getFilteredData is not a function:", getFilteredData);
      return [];
    }
    return getFilteredData(
      selectedVendor,
      selectedTimeRange,
      selectedIndustry,
      fromDate,
      toDate
    );
  }, [
    selectedVendor,
    selectedTimeRange,
    selectedIndustry,
    getFilteredData,
    fromDate,
    toDate,
  ]);

  // Get list of vendors to show based on filters
  const vendorsToShow = useMemo(() => {
    // Ensure getVendorsToShow is a function
    if (typeof getVendorsToShow !== "function") {
      console.error("getVendorsToShow is not a function:", getVendorsToShow);
      return [];
    }
    return getVendorsToShow(selectedVendor, selectedIndustry);
  }, [selectedVendor, selectedIndustry, getVendorsToShow]);

  // Create chart config based on vendors to show
  const chartConfig = useMemo(() => {
    // Ensure createChartConfig is a function
    if (typeof createChartConfig !== "function") {
      console.error("createChartConfig is not a function:", createChartConfig);
      return {};
    }
    return createChartConfig(vendorsToShow);
  }, [vendorsToShow, createChartConfig]);

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
              fromDate={tempFromDate}
              toDate={tempToDate}
              handleDateSelect={handleTempDateSelect}
              selectedIndustry={selectedIndustry}
              setSelectedIndustry={setSelectedIndustry}
              allVendors={allVendors}
              industries={industries}
              onApply={() => {
                setFromDate(tempFromDate);
                setToDate(tempToDate);
                setCalendarOpen(false);
                setSelectedTimeRange("custom");
                if (typeof setCustomDateRange === "function") {
                  setCustomDateRange({
                    fromDate: tempFromDate,
                    toDate: tempToDate,
                  });
                }
              }}
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
