import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import OrderDetailsPopup from "./OrderDetailsPopup";
import SelectionToolbar from "./SelectionToolbar";
import Statistics from "./Statistics";
import Filters from "./Filters";
import Pagination from "../../UI/Pagination";

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
    <div className="flex h-screen bg-white rounded-lg">
      {/* Main Content */}
      <div className={`flex-1 overflow-hidden transition-all duration-300`}>
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
            {!isSidebarVisible && (
              <ArrowLeft
                className="cursor-pointer"
                onClick={() => setIsSidebarVisible(true)}
              />
            )}
          </div>

          {/* Filters */}
          <Filters />

          {/* Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedOrders.length === contracts.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Contract No.
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Vendor name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                    People
                  </th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract) => (
                  <tr
                    key={contract.id}
                    className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleOrderClick(contract)}
                  >
                    <td
                      className="px-4 py-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedOrders.includes(contract.id)}
                        onChange={() => handleSelectOrder(contract.id)}
                      />
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-900">
                      {contract.id}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                          {contract.customer.initials}
                        </div>
                        <span className="text-xs text-gray-900">
                          {contract.customer.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-900">
                      {contract.type}
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 text-xs text-green-700 bg-green-50 rounded-full">
                        {contract.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-900">
                      {contract.total}
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-900">
                      {contract.date}
                    </td>
                    <td className="px-4 py-4 text-xs text-gray-900">
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
