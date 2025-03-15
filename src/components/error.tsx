import { Text } from "@/shared-components";
import { Ban } from "lucide-react";

export const ErrorComponent = () => {
  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col items-center justify-center">
      <Ban size={100} strokeWidth={2} className="text-neutral-400" />
      <Text variant="headerLarge" className="text-neutral-400">
        Error: 404
      </Text>
      <Text className="text-neutral-400">An error occurred.</Text>
    </div>
  );
};
