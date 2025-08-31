import Image from "next/image";
import Link from "next/link";

export default async function FailurePage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const params = await searchParams;
  const orderId = params.orderId ?? "";

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-red-600 flex flex-col items-center rounded-xl py-10 px-10 text-white">
        <Image
          src="/cross.png"
          alt="payment failed icon"
          width={80}
          height={80}
          className="mb-2"
        />
        <div className="text-3xl font-semibold mb-2">Order Failed</div>
        <div className="font-semibold w-10/12 text-center mb-1">
          {
            "If an amount was debited, don't worry—please contact us and we'll help."
          }
        </div>

        <div className="font-medium">
          Your Order ID:{" "}
          <span className="font-semibold">{orderId || "N/A"}</span>
        </div>

        <div className="flex gap-x-2 mt-4">
          <Link
            href="/contact"
            className="border-2 border-white rounded-lg bg-transparent px-3 py-1.5 font-semibold hover:bg-white hover:text-red-600 transition"
          >
            Contact
          </Link>
          <Link
            href="/"
            className="border-2 border-white rounded-lg bg-transparent px-3 py-1.5 font-semibold hover:bg-white hover:text-red-600 transition"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
