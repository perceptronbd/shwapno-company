import React, { useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";
import { cn, Input, Radio } from "@/shared-components";

const products = [
  { label: "Product 1", value: "product1" },
  { label: "Product 2", value: "product2" },
  { label: "Product 3", value: "product3" },
  { label: "Product 4", value: "product4" },
];

export const AddStock = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full">
      {/* Dropdown Input */}
      <div
        className={cn(
          "relative flex items-center justify-between rounded-lg border bg-white px-4",
          dropdownOpen ? "border-red-500" : "border-gray-300",
        )}
        onClick={() => setDropdownOpen(true)}
      >
        <Input
          type="text"
          placeholder="Product Name"
          className="w-full border-none outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setDropdownOpen(true)}
        />
        {dropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>

      {/* Dropdown List */}
      {dropdownOpen && (
        <div className="mt-2 rounded-lg border bg-white p-2 shadow-md">
          {filteredProducts.length > 0 ? (
            <Radio
              options={filteredProducts}
              name="product"
              value={selectedProduct ?? ""}
              onValueChange={(val) => {
                setSelectedProduct(val);
                setSearchQuery(
                  products.find((p) => p.value === val)?.label ?? "",
                );
                setDropdownOpen(false);
              }}
            />
          ) : (
            <p className="p-2 text-sm text-gray-500">No product found</p>
          )}
        </div>
      )}
    </div>
  );
};
