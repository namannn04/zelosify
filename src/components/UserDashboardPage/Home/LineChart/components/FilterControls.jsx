import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/shadcn/select";
import CustomDatePicker from "./CustomDatePicker";

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
        <CustomDatePicker
          calendarOpen={calendarOpen}
          setCalendarOpen={setCalendarOpen}
          handleCalendarOpen={handleCalendarOpen}
          fromDate={fromDate}
          toDate={toDate}
          handleDateSelect={handleDateSelect}
          onApply={onApply}
        />
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
            All Verticles
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

FilterControls.displayName = "FilterControls";

export default FilterControls;
