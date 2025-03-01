import { useState } from "react";
import { EllipsisVertical, LucideIcon } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { Button } from "@/shared-components";

interface ActionMenuProps<T, A extends string> {
  row: Row<T>;
  options: A[];
  onSelect: (option: A, row: Row<T>) => void;
  Icon?: LucideIcon;
}

export const ActionMenu = <T, A extends string>({
  row,
  options,
  onSelect,
  Icon = EllipsisVertical,
}: ActionMenuProps<T, A>) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>
        <Icon />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 flex w-30 flex-col justify-center space-y-2 rounded-md bg-white p-2 shadow-lg">
          {options.map((option) => (
            <Button
              size="sm"
              variant="text"
              key={option}
              className="text-neutral-400 hover:bg-secondary-100 hover:text-primary-400"
              onClick={() => {
                console.log(option);
                onSelect(option, row);
                setOpen(false);
              }}
            >
              {option}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
