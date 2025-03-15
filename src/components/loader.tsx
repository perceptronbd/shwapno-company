import { Text } from "@/shared-components";
import { LoaderCircle } from "lucide-react";

export const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-80">
      <div className="relative flex items-center justify-center">
        <LoaderCircle
          className="h-40 w-40 animate-spin text-secondary-400"
          strokeWidth={1.5}
        />
        <Text className="absolute text-lg font-medium text-secondary-300">
          Loading...
        </Text>
      </div>
    </div>
  );
};
