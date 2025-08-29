"use client";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
export default function FailurePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderID = searchParams.get("orderId");
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="bg-red-600 flex justify-center flex-col items-center rounded-xl py-10 px-10 text-white">
        <Image
          src="/cross.png"
          alt="success tick icon"
          width={512}
          height={512}
          className="h-20 w-fit mb-2"
        />
        <div className="text-3xl font-semibold mb-2">Order Failed!</div>
        <div className="font-semibold w-10/12 text-center mb-1">
          If money has been debited in your account, dont worry. please contact
          us.
        </div>
        <div className="font-medium">
          Your OrderID: <span className="font-semibold">{orderID}</span>
        </div>
        <div className="flex gap-x-2">
          <button
            className="border-2 mt-4 border-white cursor-pointer rounded-lg bg-transparent px-2 py-1 font-semibold hover:bg-white hover:text-red-600 transition-all duration-200"
            onClick={() => router.push("/contact")}
          >
            Contact
          </button>
          <button
            className="border-2 mt-4 border-white cursor-pointer rounded-lg bg-transparent px-2 py-1 font-semibold hover:bg-white hover:text-red-600 transition-all duration-200"
            onClick={() => router.push("/")}
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
}
