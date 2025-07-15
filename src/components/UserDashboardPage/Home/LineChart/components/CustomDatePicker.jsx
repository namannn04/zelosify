import { memo } from "react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/UI/shadcn/popover";
import { Button } from "@/components/UI/shadcn/button";
import { CalendarDaysIcon } from "lucide-react";

const CustomDatePicker = memo(
  ({
    calendarOpen,
    setCalendarOpen,
    handleCalendarOpen,
    tempFromDate,
    tempToDate,
    handleDateSelect,
    onApply,
    onCalendarClose,
    onCalendarCancel,
  }) => (
    <Popover
      open={calendarOpen}
      onOpenChange={(open) => {
        if (!open) {
          // Calendar is being closed
          if (onCalendarClose) {
            onCalendarClose();
          } else {
            setCalendarOpen(false);
          }
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="rounded-lg flex items-center justify-center font-normal"
          onClick={handleCalendarOpen}
        >
          <CalendarDaysIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 p-4 bg-background border border-border shadow-md rounded-lg">
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
                value={tempFromDate ? format(tempFromDate, "yyyy-MM-dd") : ""}
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
                value={tempToDate ? format(tempToDate, "yyyy-MM-dd") : ""}
                onChange={(e) => {
                  if (e.target.value) {
                    handleDateSelect(new Date(e.target.value), "to");
                  }
                }}
                min={tempFromDate ? format(tempFromDate, "yyyy-MM-dd") : ""}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (onCalendarCancel) {
                  onCalendarCancel();
                } else {
                  setCalendarOpen(false);
                }
              }}
            >
              Cancel
            </Button>
            <Button
              className="rounded-lg text-xs"
              size="sm"
              onClick={onApply}
              disabled={!tempFromDate || !tempToDate}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
);

CustomDatePicker.displayName = "CustomDatePicker";

export default CustomDatePicker;
