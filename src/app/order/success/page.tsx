"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    setOrderId(searchParams.get("orderId"));
  }, [searchParams]);
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="bg-green-500 flex justify-center flex-col items-center rounded-xl py-10 px-10 text-white">
        <Image
          src="/check.png"
          alt="success tick icon"
          width={512}
          height={512}
          className="h-20 w-fit mb-2"
        />
        <div className="text-3xl font-semibold mb-2">
          Your Order is Confirmed!
        </div>
        <div className="font-semibold w-10/12 text-center mb-1">
          We've received your order, will be shipped in 3-5 business days.
        </div>
        <div className="font-medium">
          Your OrderID: <span className="font-semibold">{orderId}</span>
        </div>
        <button
          className="border-2 mt-4 border-white cursor-pointer rounded-lg bg-transparent px-2 py-1 font-semibold hover:bg-white hover:text-green-500 transition-all duration-200"
          onClick={() => router.push("/")}
        >
          Back to home
        </button>
      </div>
    </div>
  );
}
