"use client";

import { Loader } from "@/components/loader";
import StockViewCard from "@/components/stock/stock-view-card";
import { useGetStockByIdQuery } from "@/stores/services/stock.service";
import { useParams } from "next/navigation";
import React from "react";

const StockDetailsPage = () => {
  const params = useParams();
  const id = params.id as string;
  const { data, isFetching } = useGetStockByIdQuery(id);

  if (isFetching) return <Loader />;

  return <div>{data && <StockViewCard stock={data} onClose={() => {}} />}</div>;
};

export default StockDetailsPage;
