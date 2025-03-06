"use client";

import { useState } from "react";
import { ActionMenu } from "@/components/action-menu";
import { Product } from "@/stores/states/product.state";
import { Row } from "@tanstack/react-table";
import { CustomToast, Modal } from "@/shared-components";
import ProductViewCard from "../product-view-card";
import { useDeleteProductMutation } from "@/stores/services/product.service";
import DeleteModal from "../delete-modal";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/routes";
import { toast } from "sonner";

interface ActionCellProps {
  product: Product;
  row: Row<Product>;
}

const ActionCell: React.FC<ActionCellProps> = ({ product, row }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteProduct] = useDeleteProductMutation();
  const router = useRouter();

  const handleAction = (action: "View" | "Edit" | "Delete" | "See Log") => {
    switch (action) {
      case "View":
        router.push(ROUTES.PRODUCT_DETAILS(product.id));
        break;
      case "Edit":
        router.push(ROUTES.PRODUCT_EDIT(product.id));
        break;
      case "Delete":
        setDeleteModalOpen(true);
        break;
      case "See Log":
        setIsModalOpen(true);
        break;
      default:
        toast(<CustomToast title="Invalid action" type="error" />);
    }
  };

  return (
    <>
      <ActionMenu<Product, "View" | "Edit" | "Delete" | "See Log">
        options={["View", "Edit", "Delete", "See Log"]}
        onSelect={handleAction}
        row={row}
      />
      <Modal
        className="w-full px-5"
        isOpen={isModalOpen}
        onClose={setIsModalOpen}
        isCrossVisible={false}
      >
        <ProductViewCard product={product} onClose={setIsModalOpen} />
      </Modal>
      <Modal
        className="w-full px-5"
        isOpen={deleteModalOpen}
        onClose={setDeleteModalOpen}
        isCrossVisible={false}
      >
        <DeleteModal
          id={product.id}
          deleteProduct={deleteProduct}
          setDeleteModalOpen={setDeleteModalOpen}
        />
      </Modal>
    </>
  );
};

export default ActionCell;
