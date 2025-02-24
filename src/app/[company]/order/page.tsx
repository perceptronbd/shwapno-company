import ExpandableTable from "./components/ExpandableTable";
import { DataTable } from "./components/order-table/DataTable";
import { orders } from "./components/order-table/dummyData";

const Order = () => {
  return (
    <div className="h-screen w-full bg-white px-4">
      <ExpandableTable />
    </div>
  );
};

export default Order;
