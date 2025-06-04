"use client";

import { ErrorComponent } from "@/components/error";
import { Loader } from "@/components/loader";
import { Button, Text } from "@/shared-components";
import { useGetProductByIdQuery } from "@/stores/services/product.service";
import { formatDate } from "@/utils/format-time";
import { ROUTES } from "@/utils/routes";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const ProductDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);

  if (isLoading) return <Loader />;
  if (error) return <ErrorComponent />;

  return (
    <div>
      <div className="w-full rounded-base bg-white px-3 py-5">
        <div className="mt-6 space-y-1 text-neutral-500">
          <div className="mb-8 aspect-square rounded-xl bg-neutral-100">
            {product?.imgURL ? (
              <Image
                alt="Product Image"
                src={product.imgURL}
                fill
                className="rounded-xl"
              />
            ) : (
              <ImageIcon className="h-full w-full" strokeWidth={1} />
            )}
          </div>
          <Text weight="bold" variant="titleLarge">
            {product?.name}
          </Text>
          <Text variant="bodySmall">
            <span className="font-semibold">code:</span>{" "}
            <span className="font-bold">{product?.barcode}</span>
          </Text>
          <Text variant="bodySmall">
            <span className="font-semibold">category:</span>{" "}
            {product?.category?.name}
          </Text>
          <Text variant="bodySmall">
            <span className="font-semibold">Available Stock:</span> 200
          </Text>
        </div>

        <div className="mt-5 space-y-1 text-neutral-500">
          <Text weight="bold" variant="bodyBase">
            Log
          </Text>
          <Text className="mt-2 flex flex-col" variant="bodyBase">
            <span className="text-sm font-semibold">Created at:</span>-{" "}
            {product && formatDate(product.createdAt)}
          </Text>
          <Text className="flex flex-col" variant="bodyBase">
            <span className="text-sm font-semibold">Updated at:</span>-{" "}
            {product && formatDate(product.updatedAt)}
          </Text>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            size="md"
            onClick={() => {
              router.replace(ROUTES.PRODUCTS);
            }}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
