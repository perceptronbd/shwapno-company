import { useState } from "react";
import { EllipsisVertical, LucideIcon } from "lucide-react";
import { Row } from "@tanstack/react-table";

interface ActionMenuProps<T, A extends string> {
  row: Row<T>;
  options: A[];
  onSelect: (option: A, row: Row<T>) => void;
  Button?: LucideIcon;
}

export const ActionMenu = <T, A extends string>({
  row,
  options,
  onSelect,
  Button = EllipsisVertical,
}: ActionMenuProps<T, A>) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}>
        <Button />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 rounded-md bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => {
                onSelect(option, row);
                setOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
