import { Text } from "@/shared-components";
import { Ban } from "lucide-react";
import { ReactNode } from "react";

interface ErrorComponentProps {
  icon?: ReactNode;
  title?: string;
  text?: string;
}

export const ErrorComponent = ({
  icon = <Ban size={100} strokeWidth={2} className="text-neutral-400" />,
  title = "Error: 404",
  text = "An error occurred."
}: ErrorComponentProps) => {
  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col items-center justify-center">
      {icon}
      <Text variant="headerLarge" className="text-neutral-400">
        {title}
      </Text>
      <Text className="text-neutral-400">{text}</Text>
    </div>
  );
};
