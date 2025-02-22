"use client";

import { cn } from "@/shared-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company } from "../../../../../utils/constants";

interface SidebarLinkProps {
  name: string;
  href: string;
  Icon: React.ComponentType;
}

export const SidebarLink: React.FC<SidebarLinkProps> = ({
  name,
  href,
  Icon,
}) => {
  const pathname = usePathname();

  const fullHref = `/${company}${href}`;

  return (
    <Link
      href={fullHref}
      className={cn(
        "flex items-center gap-3 rounded-md px-4 py-3 text-lg transition",
        pathname === fullHref
          ? "bg-white font-medium text-black"
          : "hover:bg-gray-800",
      )}
    >
      <Icon />
      {name}
    </Link>
  );
};
