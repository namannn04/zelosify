import { AlertCircle } from "lucide-react";

export default function ErrorComponent({ uploadError }) {
  return (
    <div className="bg-destructive/10 text-destructive rounded-md">
      <div className="flex items-center text-red-600 dark:text-red-400">
        <div className="rounded-full bg-destructive/20 mr-3">
          <AlertCircle size={16} />
        </div>
        <div className="font-medium">{uploadError}</div>
      </div>
    </div>
  );
}
