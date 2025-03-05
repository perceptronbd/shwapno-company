"use client";

import { ActionMenu } from "@/components/action-menu";

import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { COMPANY } from "@/utils/constants";
import { Order } from "@/stores/states/order.state";
import { useUpdateOrderStatusMutation } from "@/stores/services/order.service";
import { useState } from "react";
import { Modal } from "@/shared-components";
import PopupModal from "../popup-modal";

interface ActionCellProps {
  order: Order;
  row: Row<Order>;
}

const ActionCell: React.FC<ActionCellProps> = ({ order, row }) => {
  const router = useRouter();
  const [updateStatus, { isLoading }] = useUpdateOrderStatusMutation();
  const [isApproveModalOpen, setIsApproveModalOpen] = useState<boolean>(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState<boolean>(false);

  const handleApprove = async (id: string) => {
    try {
      const response = await updateStatus({ id, status: "COMPLETED" });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecline = async (id: string) => {
    try {
      const response = await updateStatus({ id, status: "CANCELLED" });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAction = (action: "View" | "Approve" | "Decline") => {
    switch (action) {
      case "View":
        router.push(`/${COMPANY}/orders/details/${order.id}`);
        break;
      case "Approve":
        setIsApproveModalOpen(true);
        break;
      case "Decline":
        setIsDeclineModalOpen(true);
        break;
      default:
        console.warn("Unknown action:", action);
    }
  };

  return (
    <>
      <ActionMenu<Order, "View" | "Approve" | "Decline">
        options={["View", "Approve", "Decline"]}
        onSelect={handleAction}
        row={row}
      />
      <Modal
        isOpen={isApproveModalOpen}
        onClose={setIsApproveModalOpen}
        className="w-full px-5"
        isCrossVisible={false}
      >
        <PopupModal
          label="Approve Order"
          header="Are you sure you want to approve this order?"
          id={order.id}
          toastMessage="Order approved successfully"
          button="Approve"
          handleAction={() => handleApprove(order.id)}
          setPopupModalOpen={setIsApproveModalOpen}
          loading={isLoading}
        />
      </Modal>
      <Modal
        isOpen={isDeclineModalOpen}
        onClose={setIsDeclineModalOpen}
        className="w-full px-5"
        isCrossVisible={false}
      >
        <PopupModal
          label="Decline Order"
          header="Are you sure you want to decline this order?"
          id={order.id}
          toastMessage="Order declined successfully"
          button="Decline"
          handleAction={() => handleDecline(order.id)}
          setPopupModalOpen={setIsDeclineModalOpen}
          loading={isLoading}
        />
      </Modal>
    </>
  );
};

export default ActionCell;
