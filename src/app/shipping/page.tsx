export default function ShippingPage() {
  return (
    <div className="flex grow justify-center items-center pt-2 sm:pt-0 mb-10 sm:mb-0">
      <div className="border border-gray-200 gap-y-6 p-5 mx-5 flex flex-col items-start rounded-xl shadow-md max-w-3xl">
        <div className="font-semibold text-4xl mb-10 w-full text-center">
          Shipping Policy
        </div>

        {/* Delivery */}
        <section>
          <h2 className="font-semibold text-xl mb-2">1. Delivery</h2>
          <p>
            Orders are shipped to the address provided at checkout. Delivery
            times vary by location and will be shown during the order process.
          </p>
        </section>

        {/* Timelines */}
        <section>
          <h2 className="font-semibold text-xl mb-2">2. Timelines</h2>
          <p>
            Standard shipping typically takes{" "}
            <span className="font-medium">3-5 business days</span>
            after dispatch. Expedited options may be available at extra cost.
          </p>
        </section>

        {/* Risk of Loss */}
        <section>
          <h2 className="font-semibold text-xl mb-2">4. Risk of Loss</h2>
          <p>
            Responsibility for the package transfers to you upon delivery to the
            provided shipping address.
          </p>
        </section>

        {/* Delays */}
        <section>
          <h2 className="font-semibold text-xl mb-2">5. Delays</h2>
          <p>
            We are not responsible for delays caused by carriers, weather, or
            unforeseen circumstances beyond our control.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="font-semibold text-xl mb-2">6. Contact</h2>
          <p>
            For shipping-related questions, contact us at:
            <br />
            <span className="font-medium">clickd.ofc@gmail.com</span>
          </p>
        </section>
      </div>
    </div>
  );
}
