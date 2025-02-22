import { Icons } from "@/shared-components";

type IconType = (typeof Icons)[keyof typeof Icons];

interface NavLinks {
  topLinks: { name: string; href: string; Icon: IconType }[];
  bottomLinks: { name: string; href: string; Icon: IconType }[];
}

export const NavLinks: NavLinks = {
  topLinks: [
    {
      name: "Dashboard",
      href: "/",
      Icon: Icons.Home,
    },
    {
      name: "Orders",
      href: "/orders",
      Icon: Icons.Package,
    },
    {
      name: "Invoice",
      href: "/invoice",
      Icon: Icons.NotepadText,
    },
    {
      name: "Sales",
      href: "/sales",
      Icon: Icons.FileText,
    },
    {
      name: "Stock",
      href: "/stock",
      Icon: Icons.Layers,
    },
    {
      name: "Products",
      href: "/products",
      Icon: Icons.Package2,
    },
  ],
  bottomLinks: [
    {
      name: "Employee",
      href: "/employee",
      Icon: Icons.Users2,
    },
    {
      name: "QR Code",
      href: "/settings",
      Icon: Icons.QrCode,
    },
    {
      name: "Settings",
      href: "/settings",
      Icon: Icons.Settings,
    },
  ],
};
