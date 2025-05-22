"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileIcon, X, AlertCircle } from "lucide-react";
import { cn } from "@/shared-components";
import { Text } from "@/shared-components/src/components/texts/text";

interface DragDropUploaderProps {
  onFileChange: (file: File | null) => void;
  accept?: string[];
  maxSize?: number;
  error?: string;
}

export function FileUploader({
  onFileChange,
  accept = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
    "application/vnd.ms-excel.sheet.macroEnabled.12",
  ],
  maxSize = 20 * 1024 * 1024, // 20MB default
  error,
}: DragDropUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        setFileError(null);
        onFileChange(selectedFile);
      }
    },
    [onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    maxFiles: 1,
    onDropRejected: (rejections) => {
      const rejection = rejections[0];
      if (rejection.errors[0].code === "file-too-large") {
        setFileError(`File is too large. Max size is ${maxSize / (1024 * 1024)}MB`);
      } else if (rejection.errors[0].code === "file-invalid-type") {
        setFileError("Invalid file type. Please upload an Excel file.");
      } else {
        setFileError(rejection.errors[0].message);
      }
      onFileChange(null);
    },
  });

  const handleRemove = () => {
    setFile(null);
    setFileError(null);
    onFileChange(null);
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={cn(
          "flex min-h-32 flex-col items-center justify-center rounded-md border-2 border-dashed p-6 transition-colors",
          isDragActive
            ? "border-primary-300 bg-primary-50"
            : "border-gray-300 hover:border-primary-300",
          (error || fileError) && "border-red-500",
          file && "bg-neutral-50"
        )}
      >
        <input {...getInputProps()} />
        
        {file ? (
          <div className="flex w-full flex-col items-center gap-2">
            <div className="flex w-full items-center justify-between rounded-md bg-white p-3 shadow-sm">
              <div className="flex items-center gap-2">
                <FileIcon className="h-6 w-6 text-primary-500" />
                <div className="flex flex-col">
                  <Text variant="bodySmall" weight="medium" className="text-neutral-800">
                    {file.name}
                  </Text>
                  <Text variant="bodyXSmall" className="text-neutral-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </Text>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="rounded-full p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <Text variant="bodyXSmall" className="text-neutral-500">
              Click or drag to replace
            </Text>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <UploadCloud className="h-10 w-10 text-neutral-400" />
            <Text variant="bodySmall" weight="medium" className="text-neutral-700">
              {isDragActive ? "Drop the file here" : "Drag and drop your Excel file"}
            </Text>
            <Text variant="bodyXSmall" className="text-neutral-500">
              or click to browse (.xls, .xlsx, .xlsb, .xlsm)
            </Text>
          </div>
        )}
      </div>
      
      {(error || fileError) && (
        <div className="mt-2 flex items-center gap-2 text-red-500">
          <AlertCircle className="h-4 w-4" />
          <Text variant="bodySmall">{error || fileError}</Text>
        </div>
      )}
    </div>
  );
}
