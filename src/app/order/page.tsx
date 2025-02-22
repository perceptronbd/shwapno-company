"use client";

import { useLazyGetProfileQuery } from "@/stores/services/user.service";
import { DataTable } from "./components/order-table/DataTable";
import { orders } from "./components/order-table/dummyData";
import { Button } from "@/shared-components";
import { Icons } from "../../../utils";

const Order = () => {
  const [trigger, { data, error, isLoading }] = useLazyGetProfileQuery();
  const fetchData = () => trigger();

  if (isLoading) return <div>Loading...</div>;
  console.log(data, error);
  return (
    <div className="h-screen w-full bg-white px-4">
      <DataTable data={orders} />
      <Button onClick={fetchData}>Fetch Data</Button>
      <Icons.Bell />
    </div>
  );
};

export default Order;
