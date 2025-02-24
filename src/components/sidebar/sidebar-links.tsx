"use client";

import { cn } from "@/shared-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY } from "../../../utils/constants";
import { LucideIcon } from "lucide-react";

interface SidebarLinkProps {
  name: string;
  href: string;
  Icon?: LucideIcon;
  onClose?: () => void;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({
  name,
  href,
  Icon,
  onClose,
}) => {
  const pathname = usePathname();

  const fullHref = `/${COMPANY}${href}`;

  return (
    <Link
      onClick={onClose}
      href={fullHref}
      className={cn(
        "flex items-center gap-3 rounded-md px-4 py-3 text-lg transition",
        pathname === fullHref
          ? "bg-white font-medium text-black"
          : "hover:bg-gray-800",
      )}
    >
      {Icon && <Icon size={20} />}
      {name}
    </Link>
  );
};
