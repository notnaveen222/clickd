import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const params = await searchParams;
  const orderId = params.orderId ?? "";

  return (
    <div className="flex grow items-center justify-center px-2">
      <Card className="flex flex-col items-center rounded-xl bg-green-500 px-8 py-10 text-white sm:px-10">
        <Image
          src="/check.png"
          alt="success tick icon"
          width={80}
          height={80}
          className="mb-2"
        />
        <div className="mb-2 text-center text-3xl font-semibold">
          Your Order is Confirmed!
        </div>
        <div className="mb-1 w-10/12 text-center font-semibold">
          {"We've received your order, will be shipped in 3-5 business days."}
        </div>
        <div className="mb-1 w-10/12 text-center font-semibold">
          {"We'll send you the confirmation mail shortly"}
        </div>
        <div className="font-medium">
          Your OrderID: <span className="font-semibold">{orderId}</span>
        </div>
        <Button
          asChild
          variant="outline"
          className="mt-4 h-auto rounded-lg border-2 border-white bg-transparent px-3 py-1.5 font-semibold text-white hover:bg-white hover:text-green-600"
        >
          <Link href="/">Back to home</Link>
        </Button>
      </Card>
    </div>
  );
}
