"use client";

import ProductHeader from "@/components/product/product-header";
import { dummyProducts } from "@/components/product/product-table/data";
import ProductTable from "@/components/product/product-table/ProductTable";
import React, { useState } from "react";

const Product = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProducts = dummyProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <div>
      <ProductHeader setSearchTerm={setSearchTerm} />
      <ProductTable data={filteredProducts} />
    </div>
  );
};

export default Product;
