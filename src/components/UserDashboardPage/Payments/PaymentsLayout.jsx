"use client";
import { useState } from "react";
import { ArrowLeft, Filter, Search } from "lucide-react";
import OrderDetailsPopup from "./OrderDetailsPopup";
import SelectionToolbar from "./SelectionToolbar";
import Statistics from "./Statistics";
import Pagination from "@/components/UI/Pagination";

const contracts = [
  {
    id: "#192541",
    customer: { initials: "EH", name: "Esther Howard" },
    type: "Shipping",
    status: "Active",
    total: "$3,127.00",
    date: "Jun 19",
    people: "xxx@gmail.com",
  },
  {
    id: "#192540",
    customer: { initials: "DM", name: "David Miller" },
    type: "Pickups",
    status: "Active",
    total: "$864.00",
    date: "Jun 19",
    people: "yyy@gmail.com",
  },
  {
    id: "#192539",
    customer: { initials: "JM", name: "James Moore" },
    type: "Shipping",
    status: "Active",
    total: "$1,527.00",
    date: "Jun 19",
    people: "zzz@gmail.com",
  },
  {
    id: "#192341",
    customer: { initials: "EH", name: "Esther Howard" },
    type: "Shipping",
    status: "Active",
    total: "$3,127.00",
    date: "Jun 19",
    people: "xxx@gmail.com",
  },
  {
    id: "#092540",
    customer: { initials: "DM", name: "David Miller" },
    type: "Pickups",
    status: "Active",
    total: "$864.00",
    date: "Jun 19",
    people: "yyy@gmail.com",
  },
  {
    id: "#192531",
    customer: { initials: "JM", name: "James Moore" },
    type: "Shipping",
    status: "Active",
    total: "$1,527.00",
    date: "Jun 19",
    people: "zzz@gmail.com",
  },
  {
    id: "#192571",
    customer: { initials: "EH", name: "Esther Howard" },
    type: "Shipping",
    status: "Active",
    total: "$3,127.00",
    date: "Jun 19",
    people: "xxx@gmail.com",
  },
  {
    id: "#192240",
    customer: { initials: "DM", name: "David Miller" },
    type: "Pickups",
    status: "Active",
    total: "$864.00",
    date: "Jun 19",
    people: "yyy@gmail.com",
  },
  {
    id: "#198539",
    customer: { initials: "JM", name: "James Moore" },
    type: "Shipping",
    status: "Active",
    total: "$1,527.00",
    date: "Jun 19",
    people: "zzz@gmail.com",
  },
  {
    id: "#192541",
    customer: { initials: "EH", name: "Esther Howard" },
    type: "Shipping",
    status: "Active",
    total: "$3,127.00",
    date: "Jun 19",
    people: "xxx@gmail.com",
  },
];

export default function PaymentsLayout() {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleOrderClick = (order) => {
    setActiveOrder(order);
    setShowOrderDetails(true);
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = (e) => {
    setSelectedOrders(
      e.target.checked ? contracts.map((contract) => contract.id) : []
    );
  };

  return (
    <div className="flex h-screen bg-background px-2">
      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto transition-all duration-300`}>
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Payments</h1>
            {!isSidebarVisible && (
              <ArrowLeft
                className="cursor-pointer text-foreground"
                onClick={() => setIsSidebarVisible(true)}
              />
            )}
          </div>

          {/* Filter and Search */}
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

          {/* Table */}
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-tableHeader">
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      className="rounded border border-border"
                      checked={selectedOrders.length === contracts.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                    Contract No.
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                    Vendor name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-primary">
                    Approver
                  </th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract, index) => (
                  <tr
                    key={index}
                    className="border-b border-border hover:bg-tableHeader cursor-pointer"
                    onClick={() => handleOrderClick(contract)}
                  >
                    <td
                      className="px-4 py-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        className="rounded border border-border"
                        checked={selectedOrders.includes(contract.id)}
                        onChange={() => handleSelectOrder(contract.id)}
                      />
                    </td>
                    <td className="px-4 py-4 text-xs text-foreground">
                      {contract.id}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center text-xs text-foreground">
                          {contract.customer.initials}
                        </div>
                        <span className="text-xs text-foreground">
                          {contract.customer.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-foreground">
                      {contract.type}
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 text-xs text-green-700 bg-green-50 dark:text-green-400 dark:bg-green-900 rounded-full">
                        {contract.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-foreground">
                      {contract.total}
                    </td>
                    <td className="px-4 py-4 text-xs text-foreground">
                      {contract.date}
                    </td>
                    <td className="px-4 py-4 text-xs text-foreground">
                      {contract.people}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination />
        </div>
      </div>

      {/* Right Sidebar - Statistics */}
      {isSidebarVisible && (
        <Statistics setIsSidebarVisible={setIsSidebarVisible} />
      )}

      {/* Popups and Toolbars */}
      {showOrderDetails && (
        <OrderDetailsPopup
          order={activeOrder}
          onClose={() => setShowOrderDetails(false)}
        />
      )}

      {selectedOrders.length > 0 && (
        <SelectionToolbar selectedCount={selectedOrders.length} />
      )}
    </div>
  );
}
