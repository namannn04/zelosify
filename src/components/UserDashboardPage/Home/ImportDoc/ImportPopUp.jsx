"use client";

import { useState } from "react";
import { ChevronDown, Upload, Globe, FileText, AtSign } from "lucide-react";
import Link from "next/link";

export default function ImportPopUp({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState(null);

  if (!isOpen) return null;

  const importMethods = [
    {
      id: "crawl",
      icon: <Globe className="w-6 h-6 text-primary" />,
      title: "Crawl webpages starting from a URL",
      description: "Crawl and scan up to 1000 webpages from a URL",
    },
    {
      id: "urls",
      icon: <FileText className="w-6 h-6 text-primary" />,
      title: "List of specific URLs",
      description: "Only scan content from certain webpages",
    },
    {
      id: "file",
      icon: <AtSign className="w-6 h-6 text-primary" />,
      title: "Import from file",
      description: "Upload your training data directly from a file",
    },
  ];

  const handleNext = () => {
    if (step === 1 && selectedMethod) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
        <div className="bg-background border border-border rounded-lg shadow-xl">
          {/* Header */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground">
              Import training data
            </h2>

            {/* Steps */}
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm 
                    ${
                      step === 1
                        ? "bg-ring text-white"
                        : "bg-border text-secondary"
                    }`}
                >
                  1
                </div>
                <span className={step === 1 ? "text-ring" : "text-secondary"}>
                  Select method
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm 
                    ${
                      step === 2
                        ? "bg-ring text-white"
                        : "bg-border text-secondary"
                    }`}
                >
                  2
                </div>
                <span className={step === 2 ? "text-ring" : "text-secondary"}>
                  Import data
                </span>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6">
            {step === 1 ? (
              /* Step 1: Select Method */
              <div className="space-y-4">
                {importMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 rounded-lg cursor-pointer border
                      ${
                        selectedMethod === method.id
                          ? "border-ring bg-ring/10"
                          : "border-border hover:border-secondary"
                      }`}
                    onClick={() => setSelectedMethod(method.id)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-border">
                        {method.icon}
                      </div>
                      <div>
                        <h3
                          className={`font-medium ${
                            selectedMethod === method.id
                              ? "text-ring"
                              : "text-foreground"
                          }`}
                        >
                          {method.title}
                        </h3>
                        <p className="text-secondary text-sm">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                <p className="text-sm text-secondary mt-6">
                  Want to request more methods to import training data? Let our{" "}
                  <Link href="/" className="text-ring hover:underline">
                    Zelosify
                  </Link>{" "}
                  team know{" "}
                  <Link href="/contact" className="text-ring hover:underline">
                    using our in-app chat!
                  </Link>
                </p>
              </div>
            ) : (
              /* Step 2: Import Data */
              <div className="space-y-6">
                {/* Upload Area */}
                <div className="border-2 border-border border-dashed rounded-lg p-2">
                  <div className="flex flex-col items-center text-center">
                    <Upload className="w-8 h-8 text-secondary mb-4" />
                    <h3 className="text-lg font-medium text-foreground">
                      Upload files
                    </h3>
                    <p className="text-secondary">or drag and drop them here</p>
                    <p className="text-sm text-secondary mt-2">
                      Currently supports PDFs (up to 100 pages), text files
                      (CSV, JSON, Markdown, etc.), and images
                    </p>
                  </div>
                </div>

                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-secondary mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Name your data"
                    className="w-full bg-background rounded-lg border border-border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* Access Control */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">
                    Who can access this resource's data?
                  </label>
                  <button className="w-full flex items-center justify-between rounded-lg border border-border px-3 py-2 text-left">
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-secondary" />
                      <span>Everyone</span>
                    </div>
                    <ChevronDown className="w-5 h-5 text-secondary" />
                  </button>
                </div>

                {/* Agent Selection */}
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">
                    Which agents can immediately use this data?
                  </label>
                  <button className="w-full flex items-center justify-between rounded-lg border border-border px-3 py-2 text-left text-secondary">
                    <span>Select agents</span>
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border px-6 py-4 flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-primary"
            >
              Cancel
            </button>
            <div className="flex gap-3">
              {step === 2 && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-sm text-primary"
                >
                  Back
                </button>
              )}
              <button
                onClick={step === 1 ? handleNext : onClose}
                disabled={step === 1 && !selectedMethod}
                className={`px-4 py-2 text-sm rounded-lg
                  ${
                    step === 1
                      ? "bg-foreground text-background disabled:bg-gray-500"
                      : "bg-foreground text-background"
                  }`}
              >
                {step === 1 ? "Next" : "Import"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
