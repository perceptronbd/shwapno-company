import {
  FileText,
  Home,
  Layers,
  NotepadText,
  Package,
  Package2,
  QrCode,
  Settings,
  Users2,
} from "lucide-react";

export const NavLinks = {
  topLinks: [
    {
      name: "Dashboard",
      href: "/",
      Icon: Home,
    },
    {
      name: "Orders",
      href: "/order",
      Icon: Package,
    },
    {
      name: "Invoice",
      href: "/invoice",
      Icon: NotepadText,
    },
    {
      name: "Sales",
      href: "/sales",
      Icon: FileText,
    },
    {
      name: "Stock",
      href: "/stock",
      Icon: Layers,
    },
    {
      name: "Products",
      href: "/products",
      Icon: Package2,
    },
  ],
  bottomLinks: [
    {
      name: "Employee",
      href: "/employee",
      Icon: Users2,
    },
    {
      name: "QR Code",
      href: "/settings",
      Icon: QrCode,
    },
    {
      name: "Settings",
      href: "/settings",
      Icon: Settings,
    },
  ],
};
