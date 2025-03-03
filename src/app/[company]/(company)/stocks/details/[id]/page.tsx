"use client";

import StockViewCard from "@/components/stock/stock-view-card";
import { useGetStockByIdQuery } from "@/stores/services/stock.service";
import { useParams } from "next/navigation";
import React from "react";

const StockDetailsPage = () => {
  const params = useParams();
  const id = params.id as string;
  const { data, isFetching, error } = useGetStockByIdQuery(id);

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  console.log("single stock data", data);

  return <div>{data && <StockViewCard stock={data} onClose={() => {}} />}</div>;
};

export default StockDetailsPage;
