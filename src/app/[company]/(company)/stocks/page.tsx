"use client";

import { Loader } from "@/components/loader";
import { PaginationComponent } from "@/components/pagination";
import StockHeader from "@/components/stock/stock-header";
import StockTable from "@/components/stock/stock-table.tsx/stock-table";
import { useAppSelector } from "@/stores/hook";
import { useGetStocksQuery } from "@/stores/services/stock.service";
import { selectSelectedBranchId } from "@/stores/slices/auth.slice";
import { Stock } from "@/stores/states/stock.states";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const StockPage = () => {
  const branchId = useAppSelector(selectSelectedBranchId);
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "1";
  // const limit = searchParams.get("limit") || "20;

  const { data: stocks, isLoading } = useGetStocksQuery(
    { branchId, query: { page: page } },
    {
      skip: !branchId,
    },
  );
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProducts = stocks?.data?.filter((stock: Stock) =>
    stock.product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <StockHeader setSearchTerm={setSearchTerm} />
      <StockTable stockData={filteredProducts || []} />

      <PaginationComponent meta={stocks?.meta ?? undefined} />
    </div>
  );
};

export default StockPage;
