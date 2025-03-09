import { Layers, Package, Package2 } from "lucide-react";
import { ROUTES } from "./routes";

export const NavLinks = {
  topLinks: [
    // {
    //   name: "Dashboard",
    //   href: `/${COMPANY}`,
    //   Icon: Home,
    // },
    {
      name: "Orders",
      href: ROUTES.ORDERS,
      Icon: Package,
    },
    // {
    //   name: "Invoice",
    //   href: `/${COMPANY}/invoice`,
    //   Icon: NotepadText,
    // },
    // {
    //   name: "Sales",
    //   href: "/sales",
    //   Icon: FileText,
    // },
    {
      name: "Stock",
      href: ROUTES.STOCKS,
      Icon: Layers,
    },
    {
      name: "Products",
      href: ROUTES.PRODUCTS,
      Icon: Package2,
    },
  ],
  bottomLinks: [
    // {
    //   name: "Employee",
    //   href: "/employee",
    //   Icon: Users2,
    // },
    // {
    //   name: "QR Code",
    //   href: "/settings",
    //   Icon: QrCode,
    // },
    // {
    //   name: "Settings",
    //   href: "/settings",
    //   Icon: Settings,
    // },
  ],
};
