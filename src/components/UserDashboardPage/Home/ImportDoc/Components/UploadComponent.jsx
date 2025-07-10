"use client";
import { Checkbox } from "@/components/UI/shadcn/checkbox";
import { Input } from "@/components/UI/shadcn/input";
import { Label } from "@/components/UI/shadcn/label";
import { Upload, X } from "lucide-react";
import React from "react";

export default function UploadComponent({
  uploading,
  selectedFiles,
  setSelectedFiles,
  setUploadName,
  uploadName,
  visibleRoles,
  selectAll,
  setVisibleRoles,
  setSelectAll,
}) {
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

  return (
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
              disabled={uploading}
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
                <div className="flex items-center space-x-2 truncate">
                  <span className="text-sm truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="text-muted-foreground hover:text-destructive focus:outline-none"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-secondary"
          htmlFor="upload-name"
        >
          Upload Name
        </label>
        <Input
          id="upload-name"
          value={uploadName}
          onChange={(e) => setUploadName(e.target.value)}
          placeholder="Q2 Vendor Contracts"
          disabled={uploading}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-secondary">
          Visible to Roles
        </label>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="select-all"
              checked={selectAll}
              onCheckedChange={handleSelectAllChange}
              disabled={uploading}
            />
            <Label htmlFor="select-all" className="text-sm font-medium">
              Select All
            </Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="role-vendor-manager"
                checked={visibleRoles.vendorManager}
                onCheckedChange={() => handleRoleChange("vendorManager")}
                disabled={uploading}
              />
              <Label htmlFor="role-vendor-manager" className="text-sm">
                Vendor Manager
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="role-business-stakeholder"
                checked={visibleRoles.businessStakeholder}
                onCheckedChange={() => handleRoleChange("businessStakeholder")}
                disabled={uploading}
              />
              <Label htmlFor="role-business-stakeholder" className="text-sm">
                Business Stakeholder
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="role-admin"
                checked={visibleRoles.admin}
                onCheckedChange={() => handleRoleChange("admin")}
                disabled={uploading}
              />
              <Label htmlFor="role-admin" className="text-sm">
                Admin
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
