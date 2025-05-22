import { Button, Input, Text } from "@/shared-components";
import { ROUTES } from "@/utils/routes";
import { Filter, Plus, Search, Sheet } from "lucide-react";
import { useRouter } from "next/navigation";

const StockHeader = ({
  setSearchTerm,
}: {
  setSearchTerm: (value: string) => void;
}) => {
  const router = useRouter();
  return (
    <>
      <div className="mt-5 flex h-12 items-center justify-between">
        <Text variant="titleLarge" weight="bold">
          Stock List
        </Text>
        <div className="flex items-center gap-2">
          <Button onClick={() => router.push(ROUTES.STOCK_UPLOAD)} size="sm">
            <Sheet />
            Upload Excel
          </Button>
          <Button
            onClick={() => router.push(ROUTES.STOCK_ADD)}
            size="sm"
            variant="outline"
          >
            <Plus /> Add
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

export default StockHeader;
