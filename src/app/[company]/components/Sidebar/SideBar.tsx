"use client";

import { Drawer } from "@/shared-components";
import Image from "next/image";
import { NavLinks } from "./NavLinks";
import { SidebarLink } from "./SidebarLink";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer
      className="w-full bg-primary-400"
      buttonClassName="bg-transparent bg-secondary-400 text-white hover:text-secondary-500 h-6 w-6"
      isOpen={isOpen}
      onClose={onClose}
      orientation="horizontal"
    >
      <aside className="flex min-h-screen w-full flex-col bg-primary-400 px-4 py-12 text-white">
        {/* Logo */}
        <div className="mb-6 flex w-full justify-start">
          <Image
            src="/shwapno-logo.svg"
            alt="Logo"
            className="h-12 w-auto pl-4"
            width={88}
            height={48}
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-1 flex-col gap-2">
          {NavLinks.topLinks.map((link) => (
            <SidebarLink key={link.name} {...link} />
          ))}
        </nav>

        {/* Bottom Links */}
        <nav className="mt-auto flex flex-col gap-2 pt-4">
          {NavLinks.bottomLinks.map((link) => (
            <SidebarLink key={link.name} {...link} />
          ))}
        </nav>
      </aside>
    </Drawer>
  );
};

export default Sidebar;
