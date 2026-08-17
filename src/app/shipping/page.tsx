import { Card, CardContent } from "@/components/ui/card";

export default function ShippingPage() {
  return (
    <div className="mb-10 flex grow justify-center px-3 pt-8 sm:mb-0 sm:pt-10">
      <Card className="mx-2 w-full max-w-3xl border-gray-200 p-6 shadow-md sm:p-10">
        <CardContent className="flex flex-col items-start gap-y-8 p-0 text-gray-700">
          <div className="w-full text-center text-4xl font-semibold text-gray-900">
            Shipping Policy
          </div>

          {/* Delivery */}
          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              1. Delivery
            </h2>
            <p>
              Orders are shipped to the address provided at checkout. Delivery
              times vary by location and will be shown during the order
              process.
            </p>
          </section>

          {/* Timelines */}
          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              2. Timelines
            </h2>
            <p>
              Standard shipping typically takes{" "}
              <span className="font-medium">3-5 business days</span>
              after dispatch. Expedited options may be available at extra
              cost.
            </p>
          </section>

          {/* Risk of Loss */}
          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              4. Risk of Loss
            </h2>
            <p>
              Responsibility for the package transfers to you upon delivery to
              the provided shipping address.
            </p>
          </section>

          {/* Delays */}
          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              5. Delays
            </h2>
            <p>
              We are not responsible for delays caused by carriers, weather,
              or unforeseen circumstances beyond our control.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              6. Contact
            </h2>
            <p>
              For shipping-related questions, contact us at:
              <br />
              <span className="font-medium">clickd.ofc@gmail.com</span>
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
