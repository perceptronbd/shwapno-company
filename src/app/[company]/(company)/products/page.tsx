import ProductHeader from "@/components/product/product-header";
import { dummyProducts } from "@/components/product/product-table/data";
import ProductTable from "@/components/product/product-table/ProductTable";
import React from "react";

const Product = () => {
  return (
    <div>
      <ProductHeader />
      <ProductTable data={dummyProducts} />
    </div>
  );
};

export default Product;
