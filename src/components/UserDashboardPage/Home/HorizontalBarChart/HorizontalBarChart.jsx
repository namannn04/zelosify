"use client";

import { TrendingUp, DollarSign } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/shadcn/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/UI/shadcn/chart";
import { useContext, useEffect, useState } from "react";

// Sample data for vendor contract categories
const vendorCategories = {
  Oracle: [
    { category: "Database Licensing", amount: 125000, percentage: 65 },
    { category: "Cloud Services", amount: 45000, percentage: 58 },
    { category: "Technical Support", amount: 35000, percentage: 82 },
    { category: "Consulting", amount: 28000, percentage: 45 },
    { category: "Training", amount: 18000, percentage: 92 },
  ],
  Microsoft: [
    { category: "Office 365", amount: 85000, percentage: 78 },
    { category: "Azure Services", amount: 65000, percentage: 62 },
    { category: "Developer Tools", amount: 45000, percentage: 95 },
    { category: "Enterprise Support", amount: 32000, percentage: 83 },
  ],
  Adobe: [
    { category: "Creative Cloud", amount: 48000, percentage: 72 },
    { category: "Document Services", amount: 32000, percentage: 86 },
    { category: "Marketing Suite", amount: 25000, percentage: 45 },
  ],
  Salesforce: [
    { category: "CRM Platform", amount: 105000, percentage: 68 },
    { category: "Service Cloud", amount: 75000, percentage: 92 },
    { category: "Marketing Cloud", amount: 45000, percentage: 54 },
    { category: "Integration Services", amount: 25000, percentage: 78 },
  ],
  "All Vendors": [
    { category: "Software Licensing", amount: 285000, percentage: 75 },
    { category: "Cloud Services", amount: 245000, percentage: 68 },
    { category: "Support & Maintenance", amount: 128000, percentage: 82 },
    { category: "Professional Services", amount: 98000, percentage: 62 },
    { category: "Training & Development", amount: 45000, percentage: 58 },
  ],
};

const chartConfig = {
  category: {
    label: "Category",
    color: "hsl(var(--foreground))",
  },
  amount: {
    label: "Amount",
    color: "hsl(var(--chart-1))",
  },
  percentage: {
    label: "Budget Utilization",
    color: "hsl(var(--chart-2))",
  },
};

export default function HorizantalBarChartComponent() {
  const [selectedVendor, setSelectedVendor] = useState("All Vendors");
  const [vendorData, setVendorData] = useState(vendorCategories["All Vendors"]);

  // In a real application, this would listen to a context or prop from the parent
  // For demo, we'll simulate it with useEffect and check localStorage
  useEffect(() => {
    // Check if there's a selected vendor in localStorage that the BarChart component might have set
    const checkForVendorSelection = () => {
      const storedVendor = localStorage.getItem("selectedVendor");
      if (storedVendor && vendorCategories[storedVendor]) {
        setSelectedVendor(storedVendor);
        setVendorData(vendorCategories[storedVendor]);
      }
    };

    // Check immediately
    checkForVendorSelection();

    // Set up an interval to check periodically (simulating event listening)
    const interval = setInterval(checkForVendorSelection, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate vendor totals
  const totalAmount = vendorData.reduce((sum, item) => sum + item.amount, 0);
  const avgUtilization = Math.round(
    vendorData.reduce((sum, item) => sum + item.percentage, 0) /
      vendorData.length
  );

  return (
    <div className="p-4">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-xl">
            {selectedVendor === "All Vendors"
              ? "Contract Category Breakdown"
              : `${selectedVendor} Contract Details`}
          </CardTitle>
          <CardDescription>
            {selectedVendor === "All Vendors"
              ? "Overview of all contract categories"
              : `Showing contract categories and budget utilization for ${selectedVendor}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="text-sm text-muted-foreground">
                Total Contract Value
              </div>
              <div className="mt-1 flex items-center">
                <span className="text-xl font-bold text-primary">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="text-sm text-muted-foreground">
                Average Budget Utilization
              </div>
              <div className="mt-1 flex items-center">
                <TrendingUp className="mr-1 h-4 w-4 text-primary" />
                <span className="text-xl font-bold text-primary">
                  {avgUtilization}%
                </span>
              </div>
            </div>
          </div>

          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={vendorData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="category"
                  type="category"
                  width={150}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={false}
                  formatter={(value) => formatCurrency(value)}
                  labelFormatter={(value) => `Category: ${value}`}
                  contentStyle={{
                    backgroundColor: "var(--background)", // Custom background color
                    borderRadius: "8px", // Rounded corners
                    border: "1px solid var(--border)", // Border color
                  }}
                  labelStyle={{
                    color: "var(--foreground)", // Custom text color
                  }}
                />
                <Bar
                  dataKey="amount"
                  fill="hsl(var(--chart-1))"
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                >
                  <LabelList
                    dataKey="amount"
                    position="right"
                    formatter={(value) => formatCurrency(value)}
                    style={{ fill: "var(--foreground)", fontSize: "12px" }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
        {/* <CardFooter className="flex-col items-start gap-2">
          <div className="text-xl font-semibold">
            Budget Utilization by Category
          </div>
          <div className="w-full h-[100px] mt-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart className="p-0.5" data={vendorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 10 }}
                  interval={0}
                />
                <YAxis
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fontSize: 10 }}
                />
                <Tooltip
                  formatter={(value) => `${value}%`}
                  labelFormatter={(value) => `Category: ${value}`}
                  contentStyle={{
                    backgroundColor: "var(--background)", // Custom background color
                    borderRadius: "8px", // Rounded corners
                    border: "1px solid var(--border)", // Border color
                  }}
                  labelStyle={{
                    color: "var(--foreground)", // Custom text color
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 1 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardFooter> */}
      </Card>
    </div>
  );
}
