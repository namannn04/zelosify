import { ArrowRight } from "lucide-react";
import React from "react";

export default function Statistics({ setIsSidebarVisible }) {
  return (
    <div className="flex-[0.25] border-l border-dashed border-gray-200 p-4">
      <div className="space-y-6">
        {/* TOTAL BILL PAYABLE */}
        <div className="text-center">
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <ArrowRight
                onClick={() => setIsSidebarVisible(false)}
                role="button"
              />
            </div>
            <div className="flex flex-col items-left justify-between mb-4">
              <h3 className="text-lg font-bold text-left">
                TOTAL BILL PAYABLE
              </h3>
              <button className="text-sm text-gray-500 text-left">Jan ▾</button>
            </div>
          </div>
          <div className="relative inline-block">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="none"
                stroke="#f3f4f6"
                strokeWidth="8"
              />
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="none"
                stroke="#047857"
                strokeWidth="8"
                strokeDasharray="377"
                strokeDashoffset="94"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold">$2.2m</span>
              <span className="text-xs text-gray-500">242 contracts</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-xl font-bold">$864,600</span>
            <p className="text-sm text-gray-500">95 shipments</p>
          </div>
          <div>
            <span className="text-xl font-bold">$1.34m</span>
            <p className="text-sm text-gray-500">147 pickups</p>
          </div>
        </div>

        {/* Total Budget */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500">TOTAL BUDGET</h3>
          </div>
          <div className="space-y-2">
            <div className="w-full h-2 flex rounded-full overflow-hidden">
              <div
                className="bg-green-500 h-full"
                style={{ width: "89%" }}
              ></div>

              <div
                className="bg-gray-400 h-full"
                style={{ width: "11%" }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs text-gray-600">Paid</span>
              </div>
              <span className="text-xs text-gray-600">89%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                <span className="text-xs text-gray-600">Available</span>
              </div>
              <span className="text-xs text-gray-600">11%</span>
            </div>
          </div>
        </div>

        {/* Overview */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500">OVERVIEW</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xl font-bold">$2,246.75</span>
                <p className="text-sm text-gray-500">Average</p>
              </div>
              <div>
                <span className="text-xl font-bold">$2.2m</span>
                <p className="text-sm text-gray-500">Total revenue</p>
              </div>
            </div>
            {/* <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xl font-bold">16 min</span>
              <p className="text-sm text-gray-500">Processing time</p>
            </div>
            <div>
              <span className="text-xl font-bold">1.7</span>
              <p className="text-sm text-gray-500">Avg. items/order</p>
            </div>
          </div> */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xl font-bold">0.32%</span>
                <p className="text-sm text-gray-500">Pending contracts</p>
              </div>
              <div>
                <span className="text-xl font-bold">0.51%</span>
                <p className="text-sm text-gray-500">Rejection rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
