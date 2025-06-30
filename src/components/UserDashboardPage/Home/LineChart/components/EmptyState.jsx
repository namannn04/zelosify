import { memo } from "react";

const EmptyState = memo(() => (
  <div className="flex justify-center items-center h-[350px] w-full text-gray-500">
    No data available for the selected filters. Please try different filters.
  </div>
));

EmptyState.displayName = "EmptyState";

export default EmptyState;
