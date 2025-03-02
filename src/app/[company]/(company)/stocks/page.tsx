"use client";

import StockHeader from "@/components/stock/stock-header";
import StockTable from "@/components/stock/stock-table.tsx/stock-table";
import { useGetStocksQuery } from "@/stores/services/stock.service";
import React, { useState } from "react";

const StockPage = () => {
  const { data: stocks, isLoading } = useGetStocksQuery({ page: 1, limit: 10 });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProducts = stocks?.data.stocks?.filter((stock) =>
    stock.product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <StockHeader setSearchTerm={setSearchTerm} />
      <StockTable stockData={filteredProducts || []} />
    </div>
  );
};

export default StockPage;
