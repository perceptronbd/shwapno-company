import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <Image
        alt="shwapno-logo"
        src="/shwapno-icon.svg"
        fill={true}
        priority
        className="object-cover opacity-40"
      />
      {children}
    </div>
  );
}
