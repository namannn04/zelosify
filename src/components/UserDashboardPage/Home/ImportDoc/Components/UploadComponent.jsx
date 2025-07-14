"use client";
import { Checkbox } from "@/components/UI/shadcn/checkbox";
import { Input } from "@/components/UI/shadcn/input";
import { Label } from "@/components/UI/shadcn/label";
import { Upload, X } from "lucide-react";
import React, { useState, useCallback } from "react";

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
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const pdfFiles = files.filter(
      (file) =>
        file.type === "application/pdf" && file.size <= 100 * 1024 * 1024
    );

    setSelectedFiles(pdfFiles);
  };

  /**
   * Handles drag events with visual feedback
   */
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  /**
   * Handles drop event
   */
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const files = Array.from(e.dataTransfer.files);
      const pdfFiles = files.filter(
        (file) =>
          file.type === "application/pdf" && file.size <= 100 * 1024 * 1024
      );

      setSelectedFiles(pdfFiles);
    },
    [setSelectedFiles]
  );

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
      businessUser: newSelectAll,
      admin: newSelectAll,
    });
  };

  return (
    <div className="space-y-6">
      <div
        className={`border-dashed border-2 ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 dark:border-gray-600"
        } rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 ${
          uploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() =>
          !uploading && document.getElementById("pdf-file-upload").click()
        }
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !uploading) {
            e.preventDefault();
            document.getElementById("pdf-file-upload").click();
          }
        }}
        aria-label="Drag and drop PDF files here or click to upload"
      >
        <div className="flex flex-col items-center text-center">
          <Upload
            className={`w-10 h-10 mx-auto mb-2 ${
              dragActive ? "text-primary" : "text-gray-400"
            } transition-colors`}
          />

          <div className="text-gray-600 dark:text-gray-300">
            <p className="font-medium">
              {dragActive ? "Drop files here" : "Drag and drop PDF files here"}
            </p>
            <p className="text-sm text-gray-500">or click to browse</p>
          </div>

          {/* Hidden file input for click functionality */}
          <input
            id="pdf-file-upload"
            type="file"
            multiple
            className="hidden"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            disabled={uploading}
          />
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
          placeholder="Eg. Q2 Vendor Contracts"
          disabled={uploading}
          className="w-full placeholder:text-secondary/70"
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
                id="role-business-user"
                checked={visibleRoles.businessUser}
                onCheckedChange={() => handleRoleChange("businessUser")}
                disabled={uploading}
              />
              <Label htmlFor="role-business-user" className="text-sm">
                Business User
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
