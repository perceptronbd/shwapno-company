import { useState, useRef, useEffect } from "react";
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
  const [position, setPosition] = useState<"top" | "bottom" | "middle">("bottom");
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Calculate position when dropdown opens
  useEffect(() => {
    if (open && containerRef.current && dropdownRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight;

      // Find the table container
      const tableElement = containerRef.current.closest(".overflow-auto");

      if (tableElement) {
        const tableRect = tableElement.getBoundingClientRect();
        const tableBottom = tableRect.bottom;
        const tableTop = tableRect.top;
        const spaceInTable = tableBottom - containerRect.bottom;
        const spaceAbove = containerRect.top - tableTop;
        
        // Minimum space needed for comfortable viewing
        const minSpace = 10; // pixels

        // If not enough space below in the table, position above
        if (spaceInTable < dropdownHeight && spaceAbove > dropdownHeight) {
          setPosition("top");
        } 
        // If limited space both above and below, position in the middle
        else if (spaceInTable < dropdownHeight - minSpace && spaceAbove < dropdownHeight) {
          setPosition("middle");
        } 
        else {
          setPosition("bottom");
        }
      } else {
        // Fallback to viewport calculation if table not found
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - containerRect.bottom;

        if (spaceBelow < dropdownHeight && containerRect.top > dropdownHeight) {
          setPosition("top");
        } else if (spaceBelow < dropdownHeight - 10) {
          setPosition("middle");
        } else {
          setPosition("bottom");
        }
      }
    }
  }, [open]);

  // Handle click outside to close dropdown
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button onClick={() => setOpen(!open)}>
        <Icon />
      </button>
      {open && (
        <div
          ref={dropdownRef}
          className={`absolute z-50 flex w-30 flex-col justify-center space-y-2 rounded-md bg-white p-2 shadow-lg ${
            position === "top"
              ? "bottom-full right-0 mb-2"
              : position === "middle"
              ? "right-0 transform -translate-y-1/2"
              : "right-0 top-full mt-2"
          }`}
        >
          {options.map((option) => (
            <Button
              size="sm"
              variant="text"
              key={option}
              className="text-neutral-400 hover:bg-secondary-100 hover:text-primary-400"
              onClick={() => {
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
