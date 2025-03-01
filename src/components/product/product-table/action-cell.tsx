"use client";

import { useEffect, useState } from "react";
import { ActionMenu } from "@/components/action-menu";
import { Product } from "@/stores/states/product.state";
import { Row } from "@tanstack/react-table";
import { Modal } from "@/shared-components";
import ProductViewCard from "../product-view-card";
import { useDeleteProductMutation } from "@/stores/services/product.service";
import DeleteModal from "../DeleteModal";
import { useRouter } from "next/navigation";
import { COMPANY } from "@/utils/constants";

interface ActionCellProps {
  product: Product;
  row: Row<Product>;
}

const ActionCell: React.FC<ActionCellProps> = ({ product, row }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [deleteProduct, { isSuccess }] = useDeleteProductMutation();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      console.log("Product deleted successfully!");
    }
  }, [isSuccess]);

  const handleAction = (action: "View" | "Edit" | "Delete" | "See Log") => {
    switch (action) {
      case "View":
        router.push(`/${COMPANY}/products/details/${product.id}`);
        break;
      case "Edit":
        router.push(`/${COMPANY}/products/edit/${product.id}`);
        break;
      case "Delete":
        setDeleteModalOpen(true);
        break;
      case "See Log":
        setIsModalOpen(true);
        console.log("Viewing log for product:", product);
        break;
      default:
        console.warn("Unknown action:", action);
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
