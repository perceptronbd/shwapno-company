import DataTable from "../../../components/order/order-table/DataTable";
import { orders } from "../../../components/order/order-table/dummyData";

const Order = () => {
  return (
    <div className="h-screen w-full bg-white px-4">
      <DataTable data={orders} />
    </div>
  );
};

export default Order;
