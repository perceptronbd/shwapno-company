"use client";

import ProductHeader from "@/components/product/product-header";
import ProductTable from "@/components/product/product-table/product-table";
import { useGetProductsQuery } from "@/stores/services/product.service";
import React, { useState } from "react";

const Product = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  const [searchTerm, setSearchTerm] = useState<string>("");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div>
      <ProductHeader setSearchTerm={setSearchTerm} />
      <ProductTable productData={filteredProducts || []} />
    </div>
  );
};

export default Product;
