"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/UI/shadcn/dialog";
import { Checkbox } from "@/components/UI/shadcn/checkbox";
import { Label } from "@/components/UI/shadcn/label";

export default function ImportPopUp({ isOpen, onClose }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadName, setUploadName] = useState("");
  const [visibleRoles, setVisibleRoles] = useState({
    vendorManager: false,
    businessStakeholder: false,
    admin: false,
  });
  const [selectAll, setSelectAll] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const pdfFiles = files.filter(
      (file) =>
        file.type === "application/pdf" && file.size <= 100 * 1024 * 1024
    );

    setSelectedFiles(pdfFiles);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const files = Array.from(e.dataTransfer.files);
    const pdfFiles = files.filter(
      (file) =>
        file.type === "application/pdf" && file.size <= 100 * 1024 * 1024
    );

    setSelectedFiles(pdfFiles);
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRoleChange = (role) => {
    setVisibleRoles((prev) => {
      const updatedRoles = {
        ...prev,
        [role]: !prev[role],
      };

      const allSelected = Object.values(updatedRoles).every((value) => value);
      setSelectAll(allSelected);

      return updatedRoles;
    });
  };

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setVisibleRoles({
      vendorManager: newSelectAll,
      businessStakeholder: newSelectAll,
      admin: newSelectAll,
    });
  };

  const handleImport = () => {
    console.log("Files to upload:", selectedFiles);
    console.log("Upload name:", uploadName);
    console.log("Visible to roles:", visibleRoles);

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent aria-label="Import new contracts" className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Import new contracts
          </DialogTitle>
          <DialogDescription className="text-sm">
            Supports PDF files only (up to 100MB per file)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div
            className="border-2 border-border border-dashed rounded-lg p-6"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center text-center">
              <Upload className="w-8 h-8 text-secondary mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Upload PDF files
              </h3>
              <p className="text-secondary mb-2">or drag and drop them here</p>

              <label className="mt-4 px-4 py-2 bg-foreground text-background rounded-md cursor-pointer hover:bg-foreground/90 transition-colors">
                Browse Files
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,application/pdf"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-secondary">
                Selected Files ({selectedFiles.length})
              </label>
              <div className="max-h-36 overflow-y-auto space-y-2 p-2 border border-border rounded-lg">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-secondary/10 p-2 rounded"
                  >
                    <span className="text-sm truncate">{file.name}</span>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="text-secondary hover:text-primary"
                      aria-label={`Remove ${file.name}`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="uploadName"
              className="block text-sm font-medium text-secondary mb-1"
            >
              Name this contract upload (optional)
            </label>
            <input
              type="text"
              id="uploadName"
              value={uploadName}
              onChange={(e) => setUploadName(e.target.value)}
              placeholder="e.g., Q2 Vendor Contracts"
              className="w-full bg-background rounded-lg border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Assign visibility to roles
            </label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="selectAll"
                  checked={selectAll}
                  onCheckedChange={handleSelectAllChange}
                />
                <Label htmlFor="selectAll" className="text-sm cursor-pointer">
                  All
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vendorManager"
                  checked={visibleRoles.vendorManager}
                  onCheckedChange={() => handleRoleChange("vendorManager")}
                />
                <Label
                  htmlFor="vendorManager"
                  className="text-sm cursor-pointer"
                >
                  Vendor Manager
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="businessStakeholder"
                  checked={visibleRoles.businessStakeholder}
                  onCheckedChange={() =>
                    handleRoleChange("businessStakeholder")
                  }
                />
                <Label
                  htmlFor="businessStakeholder"
                  className="text-sm cursor-pointer"
                >
                  Business Stakeholder
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="admin"
                  checked={visibleRoles.admin}
                  onCheckedChange={() => handleRoleChange("admin")}
                />
                <Label htmlFor="admin" className="text-sm cursor-pointer">
                  Admin
                </Label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between items-center">
          <button onClick={onClose} className="px-4 py-2 text-sm text-primary">
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={selectedFiles.length === 0}
            className="px-4 py-2 text-sm bg-foreground text-background rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Import
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
