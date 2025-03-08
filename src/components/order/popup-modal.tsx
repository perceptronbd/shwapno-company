import { Button, Text } from "@/shared-components";
import React from "react";
import { toast } from "sonner";

interface PopupModalProps {
  label: string;
  header: string;
  id: string;
  toastMessage: string;
  button: string;
  loading?: boolean;
  handleAction: (id: string) => void;
  setPopupModalOpen: (open: boolean) => void;
}

const PopupModal = ({
  label,
  header,
  id,
  toastMessage,
  button,
  loading,
  handleAction,
  setPopupModalOpen,
}: PopupModalProps) => {
  return (
    <div className="flex w-full flex-col bg-white p-4">
      <Text variant="titleSmall" weight="bold">
        {label}
      </Text>
      <Text className="mt-2">{header}</Text>
      <div className="mt-4 flex justify-end gap-2">
        <Button
          loading={loading}
          onClick={() => {
            setPopupModalOpen(false);
            handleAction(id);
            toast.success(`${toastMessage}`);
          }}
        >
          {button}
        </Button>
        <Button variant="outline" onClick={() => setPopupModalOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default PopupModal;
