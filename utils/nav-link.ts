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
import { COMPANY } from "./constants";

export const NavLinks = {
  topLinks: [
    {
      name: "Dashboard",
      href: `/${COMPANY}`,
      Icon: Home,
    },
    {
      name: "Orders",
      href: `/${COMPANY}/orders`,
      Icon: Package,
    },
    {
      name: "Invoice",
      href: `/${COMPANY}/invoice`,
      Icon: NotepadText,
    },
    {
      name: "Sales",
      href: "/sales",
      Icon: FileText,
    },
    {
      name: "Stock",
      href: `/${COMPANY}/stocks`,
      Icon: Layers,
    },
    {
      name: "Products",
      href: `/${COMPANY}/products`,
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
