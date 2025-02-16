import { columns, orderData } from "./components/order-table/columns";
import { DataTable } from "./components/order-table/DataTable";

const Order = () => {
  return (
    <div className="h-screen w-full bg-white px-4">
      <DataTable columns={columns} data={orderData} />
    </div>
  );
};

export default Order;
