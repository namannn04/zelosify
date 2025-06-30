import { memo } from "react";

const ErrorDisplay = memo(({ error }) => (
  <div className="flex justify-center items-center h-[350px] w-full text-red-500">
    Error loading chart data: {error}
  </div>
));

ErrorDisplay.displayName = "ErrorDisplay";

export default ErrorDisplay;
