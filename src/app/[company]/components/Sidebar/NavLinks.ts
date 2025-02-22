import { Icons } from "@/shared-components";

export const NavLinks = {
  topLinks: [
    {
      name: "Dashboard",
      href: "/",
      Icon: Icons.Home,
    },
    {
      name: "Orders",
      href: "/order",
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
