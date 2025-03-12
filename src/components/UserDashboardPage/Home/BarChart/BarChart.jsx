"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";

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

// Sample contract spend data by vendor and type
const contractData = [
  {
    date: "2024-04",
    Oracle: 85000,
    Microsoft: 67000,
    Adobe: 45000,
    Salesforce: 92000,
    Other: 58000,
  },
  {
    date: "2024-05",
    Oracle: 78000,
    Microsoft: 73000,
    Adobe: 51000,
    Salesforce: 97000,
    Other: 62000,
  },
  {
    date: "2024-06",
    Oracle: 92000,
    Microsoft: 81000,
    Adobe: 48000,
    Salesforce: 105000,
    Other: 67000,
  },
  {
    date: "2024-07",
    Oracle: 88000,
    Microsoft: 76000,
    Adobe: 52000,
    Salesforce: 112000,
    Other: 59000,
  },
  {
    date: "2024-08",
    Oracle: 95000,
    Microsoft: 83000,
    Adobe: 57000,
    Salesforce: 108000,
    Other: 71000,
  },
  {
    date: "2024-09",
    Oracle: 102000,
    Microsoft: 89000,
    Adobe: 61000,
    Salesforce: 118000,
    Other: 75000,
  },
];

// Sample spend type data
const spendTypeData = {
  "IT Infrastructure": ["Oracle", "Microsoft", "Other"],
  "Software Licensing": ["Microsoft", "Adobe", "Oracle"],
  "CRM Solutions": ["Salesforce", "Oracle", "Other"],
  "Cloud Services": ["Microsoft", "Oracle", "Salesforce"],
  Consulting: ["Other", "Oracle", "Microsoft"],
};

// Colors for vendors
const vendorColors = {
  Oracle: "hsl(var(--chart-1))",
  Microsoft: "hsl(var(--chart-2))",
  Adobe: "hsl(var(--chart-3))",
  Salesforce: "hsl(var(--chart-4))",
  Other: "hsl(var(--chart-5))",
};

// Create chart config
const createChartConfig = (vendors) => {
  const config = {
    spend: {
      label: "Contract Spend",
    },
  };

  vendors.forEach((vendor) => {
    config[vendor] = {
      label: vendor,
      color: vendorColors[vendor] || "hsl(var(--chart-1))",
    };
  });

  return config;
};

export default function BarChartComponent() {
  const [selectedVendor, setSelectedVendor] = React.useState("All Vendors");
  const [selectedTimeRange, setSelectedTimeRange] = React.useState("180d");
  const [selectedSpendType, setSelectedSpendType] = React.useState("All Types");

  // Get all vendors
  const allVendors = Object.keys(vendorColors);

  // Update localStorage when selectedVendor changes (for other components to detect)
  React.useEffect(() => {
    localStorage.setItem("selectedVendor", selectedVendor);
  }, [selectedVendor]);

  // Filter data based on selected filters
  const filteredData = React.useMemo(() => {
    let data = [...contractData]; // Copy original data

    // Filter by spend type if not "All Types"
    if (selectedSpendType !== "All Types") {
      const relevantVendors = spendTypeData[selectedSpendType];
      data = data.map((item) => {
        const newItem = { date: item.date };
        relevantVendors.forEach((vendor) => {
          newItem[vendor] = item[vendor];
        });
        return newItem;
      });
    }

    // Filter by time range
    // For demo purposes, time range filter doesn't actually filter
    // In a real app, you would apply date filtering here

    // Filter by vendor if not "All Vendors"
    if (selectedVendor !== "All Vendors") {
      data = data.map((item) => {
        return {
          date: item.date,
          [selectedVendor]: item[selectedVendor],
        };
      });
    }

    return data;
  }, [selectedVendor, selectedTimeRange, selectedSpendType]);

  // Get list of vendors to show based on filters
  const vendorsToShow = React.useMemo(() => {
    if (selectedVendor !== "All Vendors") {
      return [selectedVendor];
    }
    if (selectedSpendType !== "All Types") {
      return spendTypeData[selectedSpendType];
    }
    return allVendors;
  }, [selectedVendor, selectedSpendType]);

  // Create chart config based on vendors to show
  const chartConfig = React.useMemo(() => {
    return createChartConfig(vendorsToShow);
  }, [vendorsToShow]);

  return (
    <div className="p-4">
      <Card>
        <CardHeader className="flex flex-col space-y-0 border-b border-border p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle>Contract Spend Trends</CardTitle>
              <CardDescription>
                Visualizing contract expenditures over time
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
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

              <Select
                value={selectedTimeRange}
                onValueChange={setSelectedTimeRange}
              >
                <SelectTrigger
                  className="w-[160px] rounded-lg"
                  aria-label="Select time range"
                >
                  <SelectValue placeholder="Last 180 days" />
                </SelectTrigger>
                <SelectContent className="rounded-xl bg-background text-foreground">
                  <SelectItem value="180d" className="rounded-lg">
                    Last 180 days
                  </SelectItem>
                  <SelectItem value="90d" className="rounded-lg">
                    Last 90 days
                  </SelectItem>
                  <SelectItem value="30d" className="rounded-lg">
                    Last 30 days
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedSpendType}
                onValueChange={setSelectedSpendType}
              >
                <SelectTrigger
                  className="w-[180px] rounded-lg"
                  aria-label="Select spend type"
                >
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="rounded-xl bg-background text-foreground">
                  <SelectItem value="All Types" className="rounded-lg">
                    All Types
                  </SelectItem>
                  {Object.keys(spendTypeData).map((type) => (
                    <SelectItem
                      key={type}
                      value={type}
                      className="rounded-lg hover:bg-tableHeader"
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[350px] w-full"
          >
            <BarChart
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
                    formatter={(value) => `$${value.toLocaleString()}`}
                  />
                }
              />
              {vendorsToShow.map((vendor, index) => (
                <Bar
                  key={vendor}
                  dataKey={vendor}
                  fill={vendorColors[vendor]}
                  name={vendor}
                  stackId={selectedVendor === "All Vendors" ? undefined : "a"}
                />
              ))}
              <Legend />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
