"use client";

import StockHeader from "@/components/stock/stock-header";
import StockTable from "@/components/stock/stock-table.tsx/stock-table";
import { useGetStocksQuery } from "@/stores/services/stock.service";
import React, { useState } from "react";

const StockPage = () => {
  const { data: stocks, isLoading } = useGetStocksQuery();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProducts = stocks?.filter((stock) =>
    stock.product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  console.log(filteredProducts);

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
