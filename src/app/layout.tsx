import type { Metadata } from "next";
import "./globals.css";

import ReduxProvider from "@/stores/redux-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Shwapno - Admin Panel",
  description: "Admin Panel for Shwapno Quick Retails.",
  icons: [
    {
      rel: "icon",
      url: "/shwapno-logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ReduxProvider>
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
