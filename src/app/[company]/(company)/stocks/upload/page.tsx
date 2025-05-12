"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Text } from "@/shared-components/src/components/texts/text";
import { Button } from "@/shared-components/src/components/buttons/button";
import {
  useUploadStockFileMutation,
  useGetUploadJobStatusQuery,
} from "@/stores/services/stock.service";
import { toast } from "sonner";
import { Progress } from "@/components/stock/progress";
import { FileInput } from "@/components/file-input";

// Define the form schema with Zod
const uploadSchema = z.object({
  file: z
    .instanceof(File, { message: "Excel file is required" })
    .refine((file) => {
      const acceptedTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
      ];
      return acceptedTypes.includes(file.type);
    }, "Only Excel files are allowed (.xls, .xlsx)"),
});

type UploadFormValues = z.infer<typeof uploadSchema>;

const UploadStock = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  // RTK Query hooks
  const [uploadStockFile, { isLoading: isUploadLoading }] =
    useUploadStockFileMutation();
  const {
    data: jobStatus,
    isLoading: isStatusLoading,
    refetch: refetchJobStatus,
  } = useGetUploadJobStatusQuery(jobId || "", {
    skip: !jobId,
    pollingInterval: jobId ? 5000 : 0, // Poll every 5 seconds if we have a jobId
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
  });

  const handleFileChange = (file: File | null) => {
    if (file) {
      setValue("file", file, { shouldValidate: true });
      setUploadedFile(file);
    } else {
      // Reset the form when file is removed
      reset({ file: undefined }, { keepErrors: false });
      clearErrors("file");
      setUploadedFile(null);
    }
  };

  const onSubmit = async (data: UploadFormValues) => {
    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", data.file);

      const response = await uploadStockFile(formData).unwrap();

      if (response.success) {
        setJobId(response.data.id);
        toast.success("File upload started. Processing your data...");
      } else {
        toast.error("Failed to start upload process");
      }
    } catch (error) {
      console.error(
        "Error uploading file:",
        error instanceof Error ? error.message : "Unknown error",
      );
      toast.error("Error uploading file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // When job is complete, reset form
  useEffect(() => {
    if (jobStatus?.data?.status === "completed") {
      toast.success("Stock data processed successfully!");
      reset();
      setUploadedFile(null);
      setJobId(null);
    } else if (jobStatus?.data?.status === "failed") {
      toast.error(
        "Failed to process stock data. Please check for errors and try again.",
      );
      setJobId(null);
    }
  }, [jobStatus, reset]);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Text variant="titleLarge" weight="bold" className="mb-2">
          Upload Stock Data
        </Text>
        <Text variant="bodyMedium" className="text-gray-600">
          Upload your Excel file containing stock data
        </Text>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FileInput
            name="file"
            register={register}
            required
            label="Upload Stock Excel File"
            maxSize={20 * 1024 * 1024}
            onFileChange={handleFileChange}
            fileTypeMessage="Stock data Excel files only (.xlsb)"
            accept=".xlsb"
          />

          {errors.file && (
            <Text variant="bodySmall" className="text-red-500">
              {errors.file.message}
            </Text>
          )}

          {jobId && jobStatus?.data && (
            <div className="mt-4">
              <Text variant="bodyMedium" weight="medium" className="mb-2">
                Processing Status: {jobStatus.data.status}
              </Text>
              <Progress
                value={jobStatus.data.progress}
                max={100}
                className="mb-2"
              />
              <Text variant="bodySmall" className="text-gray-500">
                Processed {jobStatus.data.processed} of {jobStatus.data.total}{" "}
                records ({Math.round(jobStatus.data.progress)}%)
              </Text>
              {jobStatus.data.errors.length > 0 && (
                <div className="mt-2">
                  <Text
                    variant="bodySmall"
                    className="font-medium text-red-500"
                  >
                    Errors ({jobStatus.data.errors.length}):
                  </Text>
                  <ul className="mt-1 list-disc pl-5 text-sm text-red-500">
                    {jobStatus.data.errors.slice(0, 5).map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                    {jobStatus.data.errors.length > 5 && (
                      <li>
                        ...and {jobStatus.data.errors.length - 5} more errors
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={
                isUploading || isUploadLoading || !!jobId || !uploadedFile
              }
              loading={isUploading || isUploadLoading}
              variant="primary"
              size="md"
            >
              {isUploading || isUploadLoading
                ? "Uploading..."
                : "Upload Stock Data"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadStock;
