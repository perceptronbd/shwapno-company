import { Button, Text } from "@/shared-components";
import React from "react";
import { toast } from "sonner";

interface DeleteModalProps {
  id: string;
  deleteProduct: (id: string) => void;
  setDeleteModalOpen: (open: boolean) => void;
}

const DeleteModal = ({
  id,
  deleteProduct,
  setDeleteModalOpen,
}: DeleteModalProps) => {
  return (
    <div className="flex w-full flex-col bg-white p-4">
      <Text variant="titleSmall" weight="bold">
        Delete Product
      </Text>
      <Text className="mt-2">
        Are you sure you want to delete this product?
      </Text>
      <div className="mt-4 flex justify-end gap-2">
        <Button
          onClick={() => {
            setDeleteModalOpen(false);
            deleteProduct(id);
            toast.success("Product deleted successfully");
          }}
        >
          Delete
        </Button>
        <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
