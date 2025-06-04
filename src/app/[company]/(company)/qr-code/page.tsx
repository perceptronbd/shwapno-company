"use client";

import { Loader } from "@/components/loader";
import { toast } from "sonner";
import { CustomToast, Text } from "@/shared-components";
import {
  useCreateBranchQRMutation,
  useGetBranchByIdQuery,
} from "@/stores/services/branch.service";
import QRDisplay from "@/components/qr-code/qr-display";
import { useAppSelector } from "@/stores/hook";
import { selectSelectedBranchId } from "@/stores/slices/auth.slice";

const QRCodePage = () => {
  const branchId = useAppSelector(selectSelectedBranchId);

  const {
    data: branch,
    isLoading: isLoadingBranch,
    refetch,
  } = useGetBranchByIdQuery(branchId, { skip: !branchId });

  const [createBranchQR, { isLoading: isCreating }] =
    useCreateBranchQRMutation();

  const handleGenerateQR = async () => {
    if (!branchId) {
      toast(<CustomToast title="No branch selected" type="error" />);
      return;
    }

    try {
      await createBranchQR(branchId).unwrap();
      await refetch();
      toast(
        <CustomToast title="QR code generated successfully" type="success" />,
      );
    } catch (error) {
      toast(<CustomToast title="Failed to generate QR code" type="error" />);
      console.error("Error generating QR code:", error);
    }
  };

  const isLoading = isLoadingBranch || isCreating;

  if (!branchId) {
    return (
      <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <Text variant="bodyBase" className="text-center text-neutral-500">
            No branch selected. Please select a branch first.
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center">
      {isLoading ? (
        <Loader />
      ) : (
        <QRDisplay
          branch={branch}
          isLoading={isLoading}
          onGenerateQR={handleGenerateQR}
        />
      )}
    </div>
  );
};

export default QRCodePage;
