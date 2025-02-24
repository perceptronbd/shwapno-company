import { Toaster } from "@/shared-components";
import HeaderWrapper from "./components/HeaderWrapper";

export default function CompanyLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="bg-background-primary relative flex min-h-screen flex-col items-center justify-center">
      <HeaderWrapper />
      {children}
      <Toaster />
    </div>
  );
}
