"use client";

import { useState } from "react";
import { ActionMenu } from "@/components/action-menu";

import { Row } from "@tanstack/react-table";
import { Modal } from "@/shared-components";
import { useRouter } from "next/navigation";

import { Stock } from "@/stores/states/stock.states";
import StockViewCard from "../stock-view-card";
import { useDeleteStockMutation } from "@/stores/services/stock.service";
import DeleteModal from "../delete-modal";
import { ROUTES } from "@/utils/routes";

interface ActionCellProps {
  stock: Stock;
  row: Row<Stock>;
}

const ActionCell: React.FC<ActionCellProps> = ({ stock, row }) => {
  const [deleteStock] = useDeleteStockMutation();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleAction = (action: "View" | "Edit" | "Delete" | "See Log") => {
    switch (action) {
      case "View":
        router.push(ROUTES.STOCK_DETAILS(stock.id));
        break;
      case "Edit":
        router.push(ROUTES.STOCK_EDIT(stock.id));
        break;
      case "Delete":
        setDeleteModalOpen(true);
        break;
      case "See Log":
        setIsModalOpen(true);
        break;
      default:
    }
  };

  return (
    <>
      <ActionMenu<Stock, "View" | "Edit" | "Delete" | "See Log">
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
        <StockViewCard stock={stock} onClose={setIsModalOpen} />
      </Modal>
      <Modal
        className="w-full px-5"
        isOpen={deleteModalOpen}
        onClose={setDeleteModalOpen}
        isCrossVisible={false}
      >
        <DeleteModal
          id={stock.id}
          deleteStock={deleteStock}
          setDeleteModalOpen={setDeleteModalOpen}
        />
      </Modal>
    </>
  );
};

export default ActionCell;
