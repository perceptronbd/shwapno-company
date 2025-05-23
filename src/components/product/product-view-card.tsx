import { Button, Text } from "@/shared-components";
import { Product } from "@/stores/states/product.state";
import { formatDate } from "../../utils/format-time";

interface ProductViewCardProps {
  product: Product;
  onClose: (value: boolean) => void;
}

const ProductViewCard = ({ product, onClose }: ProductViewCardProps) => {
  return (
    <div className="w-full rounded-base bg-white px-3 py-5">
      <Text
        weight="bold"
        variant="titleLarge"
        className="mt-2 text-center text-gray-600"
      >
        Product Details
      </Text>
      <hr className="my-2 border-gray-300 px-4" />

      <div className="mt-6 space-y-1 text-neutral-500">
        <Text weight="bold" variant="bodyBase">
          {product.name}
        </Text>
        <Text variant="bodySmall">
          <span className="font-semibold">code:</span>{" "}
          <span className="font-bold">{product.barcode}</span>
        </Text>
        <Text variant="bodySmall">
          <span className="font-semibold">category:</span> {product.category}
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
          {formatDate(product.createdAt)}
        </Text>
        <Text className="flex flex-col" variant="bodyBase">
          <span className="text-sm font-semibold">Updated at:</span>-{" "}
          {formatDate(product.updatedAt)}
        </Text>
      </div>

      <div className="mt-6 flex justify-center">
        <Button size="md" onClick={() => onClose(false)}>
          OK
        </Button>
      </div>
    </div>
  );
};

export default ProductViewCard;
