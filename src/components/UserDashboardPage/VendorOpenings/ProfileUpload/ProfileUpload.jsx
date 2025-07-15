"use client"
import React, { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Upload, X, FileText, CheckCircle } from "lucide-react";
import { useDropzone } from "react-dropzone";
import useVendorOpenings from "@/hooks/Dashboard/Vendor/useVendorOpenings";
import CircleLoader from "@/components/UI/loaders/CircleLoader";

export default function ProfileUpload() {
  const params = useParams();
  const router = useRouter();
  const { presignUploads, submitProfiles, loading, error } = useVendorOpenings();
  
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending' // pending, uploading, uploaded, error
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/vnd.ms-powerpoint': ['.ppt']
    },
    multiple: true
  });

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    try {
      const filenames = files.map(f => f.file.name);
      const presignedUrls = await presignUploads(params.id, filenames);
      
      // Upload files to S3
      const uploadPromises = files.map(async (fileObj, index) => {
        const presignedUrl = presignedUrls[index];
        if (!presignedUrl) return;

        try {
          const response = await fetch(presignedUrl.url, {
            method: 'PUT',
            body: fileObj.file,
            headers: {
              'Content-Type': fileObj.file.type,
            },
          });

          if (response.ok) {
            setFiles(prev => 
              prev.map(f => 
                f.id === fileObj.id 
                  ? { ...f, status: 'uploaded' }
                  : f
              )
            );
            setUploadedFiles(prev => [...prev, presignedUrl.key]);
            return presignedUrl.key;
          } else {
            throw new Error('Upload failed');
          }
        } catch (error) {
          setFiles(prev => 
            prev.map(f => 
              f.id === fileObj.id 
                ? { ...f, status: 'error' }
                : f
            )
          );
          throw error;
        }
      });

      await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) return;

    setSubmitting(true);
    try {
      await submitProfiles(params.id, uploadedFiles);
      router.push(`/user/vendor-openings/${params.id}`);
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push(`/user/vendor-openings/${params.id}`);
  };

  const getFileIcon = (fileName) => {
    if (fileName.toLowerCase().endsWith('.pdf')) {
      return <FileText className="h-8 w-8 text-red-500" />;
    }
    return <FileText className="h-8 w-8 text-blue-500" />;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploaded':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-foreground bg-background">
      <div className="px-6 py-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Opening Details
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Upload Candidate Profiles</h1>

          {/* Dropzone */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-border p-8 mb-6">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              {isDragActive ? (
                <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
                  Drop the files here...
                </p>
              ) : (
                <div>
                  <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Drag & drop files here, or click to select
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Supports PDF, PPT, and PPTX files
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-border p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Selected Files</h2>
              <div className="space-y-3">
                {files.map((fileObj) => (
                  <div
                    key={fileObj.id}
                    className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getFileIcon(fileObj.file.name)}
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {fileObj.file.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(fileObj.status)}
                      <button
                        onClick={() => removeFile(fileObj.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            {files.length > 0 && (
              <button
                onClick={handleUpload}
                disabled={uploading || submitting}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-colors"
              >
                {uploading ? (
                  <>
                    <CircleLoader classNameOne="h-5" classNameTwo="h-5 w-5" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    Upload Files
                  </>
                )}
              </button>
            )}

            {uploadedFiles.length > 0 && (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 transition-colors"
              >
                {submitting ? (
                  <>
                    <CircleLoader classNameOne="h-5" classNameTwo="h-5 w-5" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    Submit Profiles
                  </>
                )}
              </button>
            )}
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 