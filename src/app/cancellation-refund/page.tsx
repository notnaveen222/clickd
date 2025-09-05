export default function CancellationRefundPage() {
  return (
    <div className="flex grow justify-center items-center pt-2 mb-10 ">
      <div className="border border-gray-200 gap-y-6 p-5 mx-5 flex flex-col items-start rounded-xl shadow-md max-w-4xl">
        <div className="font-semibold text-4xl mb-10 w-full text-center">
          Cancellation & Refund Policy
        </div>

        {/* Overview */}
        <section>
          <h2 className="font-semibold text-xl mb-2">Overview</h2>
          <p>
            This page explains how cancellations and refunds work for our
            virtual photobooth and print fulfillment service. Please read
            carefully before placing an order.
          </p>
        </section>

        {/* Cancellation Policy */}
        <section>
          <h2 className="font-semibold text-xl mb-2">1. Cancellation Policy</h2>
          <ul className="list-disc list-inside mb-2">
            <li>
              <span className="font-medium">24-Hour Window:</span> You may
              request a cancellation within{" "}
              <span className="font-medium">24 hours</span> of placing your
              order and{" "}
              <span className="font-medium">before it has shipped</span>.
            </li>
            <li>
              <span className="font-medium">
                No Cancellations After Shipping:
              </span>{" "}
              Once your order has been shipped, cancellations are not permitted.
            </li>
            <li>
              <span className="font-medium">How to Cancel:</span> Submit a
              request via email or our customer service contact method with your
              order number and reason for cancellation.
            </li>
            <li>
              <span className="font-medium">Right to Refuse:</span> We may
              refuse cancellation requests made after the 24-hour window or once
              shipping has begun.
            </li>
          </ul>
          <p className="text-sm text-gray-600">
            Note: Because prints are personalized products, we begin processing
            soon after purchase.
          </p>
        </section>

        {/* Refund Policy */}
        <section>
          <h2 className="font-semibold text-xl mb-2">2. Refund Policy</h2>
          <p className="mb-2">
            Refunds are provided only for{" "}
            <span className="font-medium">genuine reasons</span> as determined
            solely by us. Eligible cases typically include:
          </p>
          <ul className="list-disc list-inside mb-2">
            <li>Defective or damaged products received</li>
            <li>Incorrect items or quantities due to our error</li>
            <li>
              Failure to deliver (carrier-verified) to the provided address
            </li>
          </ul>
          <p className="mb-2">
            <span className="font-medium">Non-eligible cases</span> include (but
            are not limited to):
          </p>
          <ul className="list-disc list-inside mb-2">
            <li>
              Customer dissatisfaction with photo quality, color, or personal
              appearance
            </li>
            <li>Color variance between screens and prints</li>
            <li>
              Content issues with user-submitted photos (cropping, resolution,
              orientation)
            </li>
            <li>Requests made after the stated timelines</li>
          </ul>
          <p>
            If a refund is approved, it will be processed to the original
            payment method within{" "}
            <span className="font-medium">5–10 business days</span>.
          </p>
        </section>

        {/* Request Steps */}
        <section>
          <h2 className="font-semibold text-xl mb-2">
            3. How to Request a Cancellation or Refund
          </h2>
          <ol className="list-decimal list-inside mb-2">
            <li>
              Prepare your order number and a brief description of the issue.
            </li>
            <li>
              Contact us via email or our support channel (see Contact section
              below) within the applicable window.
            </li>
            <li>
              For damaged/defective items, include clear photos of the product
              and packaging.
            </li>
          </ol>
          <p className="text-sm text-gray-600">
            We may request additional information to verify and resolve your
            claim.
          </p>
        </section>

        {/* Timelines */}
        <section>
          <h2 className="font-semibold text-xl mb-2">4. Timelines</h2>
          <ul className="list-disc list-inside">
            <li>
              <span className="font-medium">Cancellation:</span> Within 24 hours
              of purchase and prior to shipping.
            </li>
            <li>
              <span className="font-medium">Refund Requests:</span> Within{" "}
              <span className="font-medium">10 days</span> of delivery for
              eligible reasons.
            </li>
            <li>
              <span className="font-medium">Refund Processing:</span> 5–10
              business days after approval.
            </li>
          </ul>
        </section>

        {/* Replacements / Reshipments */}
        <section>
          <h2 className="font-semibold text-xl mb-2">
            5. Replacements & Reshipments
          </h2>
          <p className="mb-2">
            For eligible issues (e.g., defective prints, incorrect items), we
            may offer a{" "}
            <span className="font-medium">replacement or reshipment</span>{" "}
            instead of a refund at our discretion.
          </p>
          <ul className="list-disc list-inside">
            <li>
              If replacement is approved, we’ll reproduce and ship the corrected
              items at no extra cost.
            </li>
            <li>
              If reshipment is needed due to carrier issues verified by us,
              we’ll coordinate with the carrier to resolve.
            </li>
          </ul>
        </section>

        {/* Shipping Issues */}
        <section>
          <h2 className="font-semibold text-xl mb-2">6. Shipping Issues</h2>
          <ul className="list-disc list-inside">
            <li>
              <span className="font-medium">Delays:</span> We are not
              responsible for delays caused by carriers. Refunds are not issued
              for carrier delays.
            </li>
            <li>
              <span className="font-medium">Risk of Loss:</span> Passes to you
              upon delivery to the shipping address provided.
            </li>
            <li>
              <span className="font-medium">Non-Delivery:</span> If tracking
              shows undelivered, contact us within 30 days so we can investigate
              with the carrier.
            </li>
          </ul>
        </section>

        {/* Personalized Products Note */}
        <section>
          <h2 className="font-semibold text-xl mb-2">
            7. Personalized Product Notice
          </h2>
          <p>
            Our prints are personalized and made to order. Minor variations in
            trimming, alignment, and color reproduction can occur and are not
            considered defects.
          </p>
        </section>

        {/* Liability */}
        <section>
          <h2 className="font-semibold text-xl mb-2">8. Liability</h2>
          <p>
            Our liability is limited to the amount paid for your order. We are
            not liable for indirect, incidental, or consequential damages.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="font-semibold text-xl mb-2">9. Contact</h2>
          <p>
            To request a cancellation or refund, or for questions about this
            policy, contact:
            <br />
            <span className="font-medium">clickd.ofc@gmail.com</span>
            <br />
            <span className="font-medium">+91 99628 70308</span>
            <br />
          </p>
        </section>

        {/* Updates */}
        <section>
          <h2 className="font-semibold text-xl mb-2">
            10. Updates to This Policy
          </h2>
          <p>
            We may update this Cancellation & Refund Policy from time to time.
            Changes take effect upon posting on this page.
          </p>
        </section>
      </div>
    </div>
  );
}
