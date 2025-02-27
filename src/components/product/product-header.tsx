import { Button, Input, Text } from "@/shared-components";
import { FilePlus, Filter, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { COMPANY } from "../../../utils/constants";

const ProductHeader = ({
  setSearchTerm,
}: {
  setSearchTerm: (value: string) => void;
}) => {
  const router = useRouter();
  return (
    <>
      <div className="mt-5 flex h-12 items-center justify-between">
        <Text variant="titleLarge" weight="bold">
          Product List
        </Text>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push(`/${COMPANY}/products/add`)}
            size="sm"
          >
            <FilePlus /> Add
          </Button>
          <Button size="sm" variant="outline">
            Add CSV
          </Button>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between gap-6">
        <div className="flex h-full items-center gap-2 rounded-md border-2 border-neutral-200 bg-white px-4">
          <Search size={24} />
          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="h-10 border-none"
          />
        </div>
        <Filter size={24} />
      </div>
    </>
  );
};

export default ProductHeader;
