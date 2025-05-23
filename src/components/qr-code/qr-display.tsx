import Image from "next/image";
import { Button, Text } from "@/shared-components";
import { Branch } from "@/stores/states/branch.state";
import { ScanLine } from "lucide-react";

interface QRDisplayProps {
  branch?: Branch;
  isLoading: boolean;
  onGenerateQR: () => void;
}

const QRDisplay = ({ branch, isLoading, onGenerateQR }: QRDisplayProps) => {
  return (
    <div className="flex w-full max-w-md flex-col items-center rounded-lg bg-white p-6 shadow-md">
      <Text variant="titleLarge" weight="bold" className="mb-4 text-center">
        Branch QR Code
      </Text>

      {branch?.qrURL ? (
        <div className="mb-4 flex flex-col items-center">
          <div className="relative mb-4 h-64 w-64">
            <Image
              src={branch.qrURL}
              alt="Branch QR Code"
              fill
              className="object-contain"
            />
          </div>
          <Text variant="bodyBase" className="mb-2 text-center">
            Branch: {branch.name}
          </Text>
          <Text variant="bodySmall" className="text-center text-neutral-500">
            Last updated: {new Date(branch.updatedAt).toLocaleString()}
          </Text>
        </div>
      ) : (
        <>
          <div className="mb-4 flex h-64 w-64 flex-col items-center justify-center rounded-lg bg-neutral-100">
            <ScanLine
              className="size-full text-neutral-400"
              strokeWidth={1.25}
            />
          </div>
          <Text
            variant="bodyBase"
            className="mb-4 text-center text-neutral-500"
          >
            No QR code available for {branch?.name ?? "this branch"}
          </Text>
          <Button
            className="w-full"
            onClick={onGenerateQR}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate QR Code"}
          </Button>
        </>
      )}
    </div>
  );
};

export default QRDisplay;
