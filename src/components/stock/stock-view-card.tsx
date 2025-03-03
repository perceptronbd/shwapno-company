import { Button, Text } from "@/shared-components";
import { Stock } from "@/stores/states/stock.states";
import { formatDate } from "@/utils/format-time";
import Image from "next/image";

interface StockViewCardProps {
  stock: Stock;
  onClose: (value: boolean) => void;
}

const StockViewCard = ({ stock, onClose }: StockViewCardProps) => {
  return (
    <div className="w-full rounded-lg border border-gray-300 bg-white p-5 shadow-md">
      {/* Title */}
      <Text
        weight="bold"
        variant="titleLarge"
        className="text-center text-black"
      >
        Stock Details
      </Text>
      <hr className="my-2 border-gray-300" />

      {/* Product Image & Details */}
      <div className="flex items-center gap-2">
        {stock.product.imgURL && (
          <Image src={stock.product.imgURL} alt="" width={130} height={120} />
        )}
        {/* Placeholder for Image */}
        <div className="mt-3 text-center text-neutral-600">
          <Text weight="bold" variant="bodyBase" className="text-black">
            product name
          </Text>
          <Text variant="bodySmall">
            <span className="font-semibold">code:</span> {stock.id}
          </Text>
          <Text variant="bodySmall">
            <span className="font-semibold">category:</span> Category Name
          </Text>
          <Text variant="bodySmall">
            <span className="font-semibold">Available Stock:</span>{" "}
            <span className="font-bold">{stock.quantity}</span>
          </Text>
        </div>
      </div>

      {/* Created & Updated Section */}
      <div className="mt-5 space-y-1 text-neutral-500">
        <Text variant="bodySmall">
          <span className="text-gray-400">Created at:</span>{" "}
          <span className="font-bold text-black">
            {formatDate(stock.createdAt)} - Asif Aslam
          </span>
        </Text>
        <Text variant="bodySmall">
          <span className="text-gray-400">Updated at:</span>{" "}
          <span className="font-bold text-black">
            {formatDate(stock.updatedAt)} - Asif Aslam
          </span>
        </Text>
      </div>

      {/* OK Button */}
      <div className="mt-6 flex justify-center">
        <Button onClick={() => onClose(false)}>OK</Button>
      </div>
    </div>
  );
};

export default StockViewCard;
