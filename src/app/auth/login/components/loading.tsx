import Image from "next/image";

export default function LoginLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-primary-400">
      <Image
        alt="shwapno-logo"
        src={"/shwapno-logo.svg"}
        width={200}
        height={100}
        priority
      />
    </div>
  );
}
