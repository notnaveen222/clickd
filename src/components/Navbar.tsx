"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router = useRouter();
  return (
    <div className="w-full h-[80px] border-b border-b-black/15 flex items-center justify-between px-10">
      <Image
        onClick={() => router.push("/")}
        src="/clickd2.svg"
        alt="clickd Logo"
        height={125}
        width={125}
        className="cursor-pointer"
      />
      <div className="hidden sm:flex gap-x-10 text-lg items-center font-semibold">
        <div className="cursor-pointer">Pricing</div>
        <div className="cursor-pointer">Contact</div>
        <div
          onClick={() => router.push("/order")}
          className="text-lg font-semibold cursor-pointer px-4 py-2 text-white rounded-full bg-brand-blue"
        >
          Get Started
        </div>
      </div>
    </div>
  );
}
