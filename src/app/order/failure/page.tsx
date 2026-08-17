import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function FailurePage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const params = await searchParams;
  const orderId = params.orderId ?? "";

  return (
    <div className="flex grow flex-col items-center justify-center px-2">
      <Card className="flex flex-col items-center rounded-xl bg-red-600 px-8 py-10 text-white sm:px-10">
        <Image
          src="/cross.png"
          alt="payment failed icon"
          width={80}
          height={80}
          className="mb-2"
        />
        <div className="mb-2 text-3xl font-semibold">Order Failed</div>
        <div className="mb-1 w-10/12 text-center font-semibold">
          {
            "If an amount was debited, don't worry—please contact us and we'll help."
          }
        </div>

        <div className="font-medium">
          Your Order ID:{" "}
          <span className="font-semibold">{orderId || "N/A"}</span>
        </div>

        <div className="mt-4 flex gap-x-2">
          <Button
            asChild
            variant="outline"
            className="h-auto rounded-lg border-2 border-white bg-transparent px-3 py-1.5 font-semibold text-white hover:bg-white hover:text-red-600"
          >
            <Link href="/contact">Contact</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-auto rounded-lg border-2 border-white bg-transparent px-3 py-1.5 font-semibold text-white hover:bg-white hover:text-red-600"
          >
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
