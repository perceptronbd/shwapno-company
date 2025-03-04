"use client";

import { ActionMenu } from "@/components/action-menu";

import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { COMPANY } from "@/utils/constants";
import { Order } from "@/stores/states/order.state";

interface ActionCellProps {
  order: Order;
  row: Row<Order>;
}

const ActionCell: React.FC<ActionCellProps> = ({ order, row }) => {
  const router = useRouter();

  const handleAction = (action: "View" | "Approve" | "Decline") => {
    switch (action) {
      case "View":
        router.push(`/${COMPANY}/stocks/details/${order.id}`);
        break;
      case "Approve":
        break;
      case "Decline":
        break;
      default:
        console.warn("Unknown action:", action);
    }
  };

  return (
    <ActionMenu<Order, "View" | "Approve" | "Decline">
      options={["View", "Approve", "Decline"]}
      onSelect={handleAction}
      row={row}
    />
  );
};

export default ActionCell;
