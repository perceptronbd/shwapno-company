"use client";

import { Loader } from "@/components/loader";
import { PaginationComponent } from "@/components/pagination";
import ProductHeader from "@/components/product/product-header";
import ProductTable from "@/components/product/product-table/product-table";
import { useGetProductsQuery } from "@/stores/services/product.service";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Product = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;

  const { data: products, isLoading } = useGetProductsQuery({
    page: page,
    limit: limit,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProducts = products?.data?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <ProductHeader setSearchTerm={setSearchTerm} />
      <ProductTable productData={filteredProducts || []} />

      <PaginationComponent meta={products?.meta ?? undefined} />
    </div>
  );
};

export default Product;
