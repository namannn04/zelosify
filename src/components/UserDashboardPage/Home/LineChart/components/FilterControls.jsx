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
    handleCalendarClose,
    handleCalendarCancel,
    tempFromDate,
    tempToDate,
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
          <SelectValue placeholder="This Month" />
        </SelectTrigger>
        <SelectContent className="rounded-xl bg-background text-foreground">
          <SelectItem value="thisMonth" className="rounded-lg">
            This Month
          </SelectItem>
          <SelectItem value="last3Months" className="rounded-lg">
            Last 3 Months
          </SelectItem>
          <SelectItem value="thisYear" className="rounded-lg">
            This Year
          </SelectItem>
          <SelectItem value="last2Years" className="rounded-lg">
            Last 2 Years
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
          onCalendarClose={handleCalendarClose}
          onCalendarCancel={handleCalendarCancel}
          tempFromDate={tempFromDate}
          tempToDate={tempToDate}
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
