import { Toaster } from "@/shared-components";
import HeaderWrapper from "./components/HeaderWrapper";

export default function CompanyLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white">
      <HeaderWrapper />
      {children}
      <Toaster />
    </div>
  );
}
