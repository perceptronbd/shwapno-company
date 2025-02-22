import { Drawer, Icons } from "@/shared-components";
import Image from "next/image";
import { SidebarLink } from "./SidebarLink";

type IconType = (typeof Icons)[keyof typeof Icons];

interface NavLinks {
  topLinks: { name: string; href: string; Icon: IconType }[];
  bottomLinks: { name: string; href: string; Icon: IconType }[];
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  NavLinks: NavLinks;
  direction?: "left" | "right";
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  NavLinks,
  direction,
}) => {
  return (
    <Drawer
      className="w-full bg-primary-400"
      buttonClassName="bg-transparent text-white hover:text-secondary-500 h-6 w-6"
      isOpen={isOpen}
      onClose={onClose}
      orientation="horizontal"
      direction={direction}
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
