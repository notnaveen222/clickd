import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getLayouts } from "@/lib/layouts";

export const revalidate = 0;

export default async function PricingPage() {
  const layouts = await getLayouts();

  return (
    <div className="flex grow items-center justify-center px-3 py-8 sm:py-0">
      <Card className="mx-2 w-full max-w-3xl border-gray-200 p-6 shadow-md sm:p-10">
        <CardContent className="flex flex-col items-center gap-6 p-0">
          <div className="flex flex-col items-center gap-1 text-center">
            <div className="mb-1 flex size-10 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
              <Camera className="size-5" />
            </div>
            <div className="text-4xl font-semibold">Pricing</div>
            <div className="text-sub-text font-medium">
              These are our current available strip layouts and their respective
              pricing
            </div>
            <div className="text-sub-text font-medium">
              A lot more coming soon !!!
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {layouts.map((layout) => (
              <div
                key={layout.id}
                className="flex flex-col items-center rounded-lg border border-gray-200 p-4 text-center transition-all hover:shadow-md"
              >
                <div className="flex aspect-[2/3] w-full items-center justify-center rounded bg-gray-100">
                  <Image
                    src={layout.image_url}
                    alt={layout.name}
                    width={150}
                    height={250}
                    className="my-5"
                  />
                </div>
                <h3 className="font-semibold text-gray-900">{layout.name}</h3>
                <p className="mb-2 text-sm text-gray-600">
                  {layout.description}
                </p>
                <div className="rounded-lg bg-brand-blue px-2 font-semibold text-white">
                  ₹{layout.price}
                </div>
              </div>
            ))}
          </div>

          <Button asChild size="lg" className="rounded-full px-6">
            <Link href="/order">Order Now</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
