"use client";

import { useState } from "react";
import { ActionMenu } from "@/components/action-menu";
import { Product } from "@/stores/states/product.state";
import { Row } from "@tanstack/react-table";
import { Modal } from "@/shared-components";
import ProductViewCard from "../product-view-card";

interface ActionCellProps {
  product: Product;
  row: Row<Product>;
}

const ActionCell: React.FC<ActionCellProps> = ({ product, row }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAction = (action: "View" | "Edit" | "Delete" | "See Log") => {
    switch (action) {
      case "View":
        setIsModalOpen(true);
        break;
      case "Edit":
        console.log("Editing product:", product);
        break;
      case "Delete":
        console.log("Deleting product:", product);
        break;
      case "See Log":
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
    </>
  );
};

export default ActionCell;
