import HeaderWrapper from "@/components/header-wrapper";

export default function CompanyLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background-primary px-3">
      <HeaderWrapper />
      {children}
    </div>
  );
}
