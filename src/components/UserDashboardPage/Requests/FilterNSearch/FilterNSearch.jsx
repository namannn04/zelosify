import { Filter, Search } from "lucide-react";

export default function FilterNSearch() {
  return (
    <div className="flex items-center justify-between gap-2 mb-6">
      <button className="px-3 py-1.5 bg-foreground text-background text-sm rounded-md flex items-center gap-2">
        Filter
        <Filter className="w-4 h-4" />
      </button>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary" />
        <input
          type="text"
          placeholder="Search"
          className="pl-9 pr-4 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-ring w-64"
        />
      </div>
    </div>
  );
}
