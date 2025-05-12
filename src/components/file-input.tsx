"use client";
import React, { useCallback, useMemo, useState } from "react";
import { DropzoneInputProps, useDropzone } from "react-dropzone";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { CheckCircle, Upload } from "lucide-react";
import { cn } from "@/shared-components/src/utils/cn";
import { Text } from "@/shared-components/src/components/texts/text";

interface FileInputProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  required?: boolean;
  className?: string;
  label?: string;
  accept?: string;
  maxSize?: number;
  onFileChange?: (file: File | null) => void;
  fileTypeMessage?: string;
}

const mergeRefs =
  (...refs: React.Ref<HTMLInputElement>[]) =>
  (node: HTMLInputElement | null) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref && "current" in ref && node !== null) {
        (ref as React.RefObject<HTMLInputElement>).current = node;
      }
    });
  };

export const FileInput = <T extends FieldValues>({
  name,
  register,
  className,
  label = "Upload File",
  accept = ".xlsx,.xls",
  maxSize = 10485760, // 10MB default
  onFileChange,
  fileTypeMessage = "Excel files only (.xlsb)",
}: FileInputProps<T>) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getAcceptFromString = (
    acceptString: string,
  ): Record<string, string[]> => {
    const mimeTypes: Record<string, string[]> = {
      ".xlsx": [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ],
      ".xls": ["application/vnd.ms-excel"],
      ".xlsb": ["application/vnd.ms-excel.sheet.binary.macroEnabled.12"],
    };

    const result: Record<string, string[]> = {};
    const extensions = acceptString.split(",");

    extensions.forEach((ext) => {
      const trimmedExt = ext.trim();
      if (mimeTypes[trimmedExt]) {
        mimeTypes[trimmedExt].forEach((mime) => {
          if (!result[mime]) result[mime] = [];
          result[mime].push(trimmedExt);
        });
      }
    });

    return result;
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0];

        if (selectedFile.size > maxSize) {
          setError(`File size exceeds ${maxSize / 1024 / 1024}MB limit`);
          setFile(null);
          if (onFileChange) onFileChange(null);
          return;
        }

        setFile(selectedFile);
        setError(null);
        if (onFileChange) onFileChange(selectedFile);
      }
    },
    [maxSize, onFileChange],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: getAcceptFromString(accept),
    maxFiles: 1,
  });

  const { ref: rhfRef } = register(name);

  const inputProps = useMemo(
    () =>
      getInputProps() as DropzoneInputProps & {
        ref: React.Ref<HTMLInputElement>;
      },
    [getInputProps],
  );

  const mergedRef = useCallback(mergeRefs(rhfRef, inputProps.ref), [
    rhfRef,
    inputProps.ref,
  ]);

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium">
          <Text variant="bodyMedium" weight="medium" className="text-base">
            {label}
          </Text>
        </label>
      )}
      <div
        {...getRootProps()}
        className={cn(
          "flex min-h-32 flex-col items-center justify-center rounded-md border-2 border-dashed p-6 transition-colors",
          isDragActive
            ? "border-primary bg-primary/10"
            : "hover:border-primary border-gray-300",
          error && "border-red-500",
          className,
        )}
      >
        <input
          {...inputProps}
          name={name}
          ref={mergedRef}
          // Remove the `required` attribute
        />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          {file ? (
            <>
              <CheckCircle className="h-10 w-10 text-green-500" />
              <Text variant="bodySmall" weight="medium">
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </Text>
              <button
                type="button"
                className="cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={open}
              >
                <Text variant="bodyXSmall">Click to replace</Text>
              </button>
            </>
          ) : isDragActive ? (
            <>
              <Upload className="text-primary h-10 w-10" />
              <Text variant="bodySmall" weight="medium">
                Drop the Excel file here
              </Text>
            </>
          ) : (
            <>
              <Upload className="h-10 w-10 text-gray-400" />
              <button
                type="button"
                className="hover:text-primary cursor-pointer"
                onClick={open}
              >
                <Text variant="bodySmall" weight="medium">
                  Click to upload or drag and drop
                </Text>
              </button>
              <Text variant="bodyXSmall" className="text-gray-500">
                {fileTypeMessage}
              </Text>
            </>
          )}
        </div>
      </div>
      {error && (
        <Text variant="bodySmall" className="mt-2 text-red-500">
          {error}
        </Text>
      )}
    </div>
  );
};

export default FileInput;
