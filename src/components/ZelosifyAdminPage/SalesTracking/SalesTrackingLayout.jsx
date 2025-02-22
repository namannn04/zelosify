"use client";

import { useState } from "react";
import {
  ChevronDown,
  Download,
  Plus,
  Check,
  Clock,
  Loader2,
} from "lucide-react";
import Pagination from "@/components/UI/Pagination";

// Sample data
const tasks = [
  {
    id: 1,
    description: "Prepare new quotation",
    company: "Brainlongue",
    taskType: "Call",
    status: "in-progress",
    priority: "urgent",
    date: "Nov 21, 2023",
    owners: ["LW", "AH", "DR"],
  },
  {
    id: 2,
    description: "6 weekly service call",
    company: "Hugeable",
    taskType: "Call",
    status: "completed",
    priority: "medium",
    date: "Nov 21, 2023",
    owners: ["AH", "RM"],
  },
  {
    id: 3,
    description: "Ask to the next event",
    company: "Sremtex",
    taskType: "Ask to Event",
    status: "not-started",
    priority: "low",
    date: "Nov 20, 2023",
    owners: ["ZD", "JF"],
  },
];

const StatusIcon = ({ status }) => {
  switch (status) {
    case "in-progress":
      return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
    case "completed":
      return <Check className="w-4 h-4 text-green-500" />;
    case "waiting":
      return <Clock className="w-4 h-4 text-yellow-500" />;
    default:
      return (
        <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600" />
      );
  }
};

const PriorityBadge = ({ priority }) => {
  const colors = {
    urgent: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300",
    high: "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300",
    medium: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
    low: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm capitalize ${colors[priority]}`}
    >
      {priority}
    </span>
  );
};

export default function TaskTable() {
  const [selectedTasks, setSelectedTasks] = useState([]);

  return (
    <div className="bg-background">
      <div className="flex justify-end items-center mb-6">
        <div className="flex gap-3">
          {/* Download Report Button */}
          <button className="px-4 py-2 border border-border rounded-lg flex items-center gap-2 bg-background text-foreground hover:bg-secondary/20 dark:hover:bg-secondary/40 transition-all duration-200">
            <Download className="w-4 h-4" />
            Download report
          </button>

          {/* Add Task Button */}
          <button className="px-4 py-2 bg-primary text-tertiary rounded-lg flex items-center gap-2 hover:bg-opacity-80 dark:hover:bg-opacity-90 transition-all duration-200">
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>
      </div>

      <div className="mb-6 flex items-center gap-4">
        {["Task", "Team", "User", "Time Filter"].map((filter, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-sm text-secondary">{filter}:</span>
            <button className="px-3 py-1.5 border border-border rounded-lg text-sm flex items-center gap-2 text-foreground hover:bg-secondary/10">
              {filter === "Task" ? "All tasks" : "Select"}
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr className="border-b border-border">
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 dark:border-gray-600"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTasks(tasks.map((t) => t.id));
                    } else {
                      setSelectedTasks([]);
                    }
                  }}
                />
              </th>
              {[
                "Description",
                "Companies",
                "Sales Type",
                "Sales Status",
                "Priority",
                "Sales Date",
                "Owner",
              ].map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-left text-sm font-medium text-secondary"
                >
                  {header}
                  <ChevronDown className="w-4 h-4 inline-block ml-1" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="border-b border-border hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 dark:border-gray-600"
                    checked={selectedTasks.includes(task.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedTasks([...selectedTasks, task.id]);
                      } else {
                        setSelectedTasks(
                          selectedTasks.filter((id) => id !== task.id)
                        );
                      }
                    }}
                  />
                </td>
                <td className="px-4 py-4 text-sm text-foreground">
                  {task.description}
                </td>
                <td className="px-4 py-4 text-sm text-foreground">
                  {task.company}
                </td>
                <td className="px-4 py-4 text-sm text-foreground">
                  {task.taskType}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 text-sm">
                    <StatusIcon status={task.status} />
                    <span className="capitalize text-foreground">
                      {task.status.replace("-", " ")}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <PriorityBadge priority={task.priority} />
                </td>
                <td className="px-4 py-4 text-sm text-foreground">
                  {task.date}
                </td>
                <td className="px-4 py-4">
                  <div className="flex -space-x-2">
                    {task.owners.map((owner, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-primary text-tertiary flex items-center justify-center text-sm font-medium ring-2 ring-white dark:ring-gray-800"
                      >
                        {owner}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination />
    </div>
  );
}
