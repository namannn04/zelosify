import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/shadcn/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/UI/shadcn/card";

import { Calendar, Clock, AlertTriangle, ChevronDown } from "lucide-react";

export default function RenewableAlertsTable() {
  const [sortColumn, setSortColumn] = useState("endDate");
  const [sortDirection, setSortDirection] = useState("asc");

  // Static data for demonstration
  const renewalAlerts = [
    {
      id: 1,
      vendorName: "Acme Technologies",
      startDate: "2023-01-15",
      contractName: "Cloud Infrastructure Services",
      category: "IT Infra",
      endDate: "2024-02-10", // < 30 days
      contractValue: 4500000,
      owner: "Rajesh Kumar",
      urgency: "high",
    },
    {
      id: 2,
      vendorName: "GlobalServe Solutions",
      startDate: "2022-08-22",
      contractName: "Managed IT Support",
      category: "Services",
      endDate: "2024-03-20", // < 60 days
      contractValue: 2800000,
      owner: "Priya Singh",
      urgency: "medium",
    },
    {
      id: 3,
      vendorName: "DataSafe Security",
      startDate: "2023-04-10",
      contractName: "Cybersecurity Suite",
      category: "IT Security",
      endDate: "2024-05-15", // > 60 days
      contractValue: 3200000,
      owner: "Amit Patel",
      urgency: "low",
    },
    {
      id: 4,
      vendorName: "Office Essentials",
      startDate: "2023-02-28",
      contractName: "Office Supplies Contract",
      category: "Supplies",
      endDate: "2024-02-05", // < 30 days
      contractValue: 950000,
      owner: "Neha Gupta",
      urgency: "high",
    },
    {
      id: 5,
      vendorName: "InnoTech Solutions",
      startDate: "2022-11-05",
      contractName: "Software Licenses",
      category: "IT Infra",
      endDate: "2024-04-01", // < 60 days
      contractValue: 5800000,
      owner: "Vikram Sharma",
      urgency: "medium",
    },
  ];

  // Sort the data based on current sort settings
  const sortedData = [...renewalAlerts].sort((a, b) => {
    if (sortColumn === "endDate") {
      return sortDirection === "asc"
        ? new Date(a.endDate) - new Date(b.endDate)
        : new Date(b.endDate) - new Date(a.endDate);
    } else if (sortColumn === "contractValue") {
      return sortDirection === "asc"
        ? a.contractValue - b.contractValue
        : b.contractValue - a.contractValue;
    }
    return 0;
  });

  // Helper function to format date as DD-MM-YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Format currency as INR
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Toggle sort direction and column
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Get urgency color and icon
  const getUrgencyDetails = (urgency) => {
    switch (urgency) {
      case "high":
        return {
          color: "text-red-500 bg-red-50 dark:text-red-400 dark:bg-red-950/40",
          icon: (
            <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400 mr-1" />
          ),
        };
      case "medium":
        return {
          color:
            "text-orange-500 bg-orange-50 dark:text-orange-400 dark:bg-orange-950/40",
          icon: (
            <AlertTriangle className="w-4 h-4 text-orange-500 dark:text-orange-400 mr-1" />
          ),
        };
      case "low":
        return {
          color:
            "text-green-500 bg-green-50 dark:text-green-400 dark:bg-green-950/40",
          icon: (
            <Clock className="w-4 h-4 text-green-500 dark:text-green-400 mr-1" />
          ),
        };
      default:
        return {
          color:
            "text-gray-500 bg-gray-50 dark:text-gray-400 dark:bg-gray-800/40",
          icon: (
            <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-1" />
          ),
        };
    }
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Upcoming Renewal Alerts
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground mt-1">
            Track contracts nearing expiry and manage renewals efficiently
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Contract Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleSort("endDate")}
                >
                  <div className="flex items-center font-bold">
                    End Date
                    <ChevronDown
                      className={`w-4 h-4 ml-1 transition-transform ${
                        sortColumn === "endDate" && sortDirection === "desc"
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => handleSort("contractValue")}
                >
                  <div className="flex items-center font-bold">
                    Contract Value (INR)
                    <ChevronDown
                      className={`w-4 h-4 ml-1 transition-transform ${
                        sortColumn === "contractValue" &&
                        sortDirection === "desc"
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </div>
                </TableHead>
                <TableHead>Owner/Accountable Person</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((alert) => {
                const { color, icon } = getUrgencyDetails(alert.urgency);
                return (
                  <TableRow key={alert.id}>
                    <TableCell>{alert.vendorName}</TableCell>
                    <TableCell>{formatDate(alert.startDate)}</TableCell>
                    <TableCell>{alert.contractName}</TableCell>
                    <TableCell>{alert.category}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full ${color}`}
                      >
                        {icon}
                        {formatDate(alert.endDate)}
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(alert.contractValue)}</TableCell>
                    <TableCell>{alert.owner}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-foreground text-background rounded-md text-xs">
                          View
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-foreground text-background rounded-md text-xs">
                          Renew
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 bg-foreground text-background rounded-md text-xs">
                          Notify
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
