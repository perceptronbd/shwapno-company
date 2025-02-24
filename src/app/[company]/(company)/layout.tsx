import HeaderWrapper from "@/components/header-wrapper";
import { Toaster } from "@/shared-components";

export default function CompanyLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background-primary">
      <HeaderWrapper />
      {children}
      <Toaster />
    </div>
  );
}
