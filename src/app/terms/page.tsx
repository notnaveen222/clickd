export default function TermsPage() {
  return (
    <div className="flex grow justify-center items-center pt-2  mb-10 sm:mb-0">
      <div className="border border-gray-200 gap-y-6 p-5 mx-5 flex flex-col items-start rounded-xl shadow-md max-w-4xl">
        <div className="font-semibold text-4xl mb-10 w-full text-center">
          Terms and Conditions
        </div>

        {/* 1. Acceptance of Terms */}
        <section>
          <h2 className="font-semibold text-xl mb-2">1. Acceptance of Terms</h2>
          <p>
            By using our virtual photobooth service and ordering prints, you
            agree to be bound by these Terms and Conditions. If you do not agree
            to these terms, please do not use our service.
          </p>
        </section>

        {/* 2. Service Description */}
        <section>
          <h2 className="font-semibold text-xl mb-2">2. Service Description</h2>
          <p>
            We provide a virtual photobooth service that allows users to take
            photos and order physical prints delivered to their homes. Our
            service includes photo capture, editing options, and print
            fulfillment.
          </p>
        </section>

        {/* 3. Ordering and Payment */}
        <section>
          <h2 className="font-semibold text-xl mb-2">
            3. Ordering and Payment
          </h2>
          <ul className="list-disc list-inside">
            <li>All orders must be paid in full at the time of purchase</li>
            <li>
              We accept major credit cards and other payment methods as
              displayed on our platform
            </li>
            <li>Prices are subject to change without notice</li>
            <li>
              You are responsible for providing accurate billing and shipping
              information
            </li>
            <li>All sales are final once payment is processed</li>
          </ul>
        </section>

        {/* 4. Shipping and Delivery */}
        <section>
          <h2 className="font-semibold text-xl mb-2">
            4. Shipping and Delivery
          </h2>
          <ul className="list-disc list-inside">
            <li>
              We will ship your prints to the address provided during checkout
            </li>
            <li>
              Shipping times vary by location and will be communicated during
              the ordering process
            </li>
            <li>
              Risk of loss passes to you upon delivery to the shipping address
            </li>
            <li>
              We are not responsible for delays caused by shipping carriers
            </li>
            <li>Additional charges may apply for expedited shipping options</li>
          </ul>
        </section>

        {/* 5. Cancellation Policy */}
        <section>
          <h2 className="font-semibold text-xl mb-2">5. Cancellation Policy</h2>
          <ul className="list-disc list-inside">
            <li>
              No cancellations are permitted once your order has been shipped
            </li>
            <li>
              To cancel an order, you must contact us within 24 hours of placing
              your order and before shipping
            </li>
            <li>
              Cancellation requests must be submitted via email or our customer
              service contact method
            </li>
            <li>
              We reserve the right to refuse cancellation requests made after
              the 24-hour window
            </li>
          </ul>
        </section>

        {/* 6. Refund Policy */}
        <section>
          <h2 className="font-semibold text-xl mb-2">6. Refund Policy</h2>
          <ul className="list-disc list-inside">
            <li>
              No refunds will be issued except for genuine reasons as determined
              solely by us
            </li>
            <li>
              Genuine reasons may include: defective products, incorrect orders
              due to our error, or failure to deliver
            </li>
            <li>
              Refund requests must be submitted within 30 days of delivery
            </li>
            <li>
              Customer dissatisfaction with photo quality, color, or personal
              appearance is not grounds for refund
            </li>
            <li>
              If a refund is approved, it will be processed to the original
              payment method within 5-10 business days
            </li>
          </ul>
        </section>

        {/* 7. Product Quality */}
        <section>
          <h2 className="font-semibold text-xl mb-2">7. Product Quality</h2>
          <p>
            We strive to ensure high-quality prints but cannot guarantee exact
            color reproduction due to monitor variations. Photos are printed as
            captured through our virtual photobooth system. Minor variations in
            print quality are normal and not grounds for refund.
          </p>
        </section>

        {/* 8. User Responsibilities */}
        <section>
          <h2 className="font-semibold text-xl mb-2">
            8. User Responsibilities
          </h2>
          <ul className="list-disc list-inside">
            <li>You must be at least 13 years old to use our service</li>
            <li>Users under 18 must have parental consent</li>
            <li>
              You are responsible for ensuring photos comply with our content
              guidelines
            </li>
            <li>You must provide accurate contact and shipping information</li>
          </ul>
        </section>

        {/* 9. Prohibited Content */}
        <section>
          <h2 className="font-semibold text-xl mb-2">9. Prohibited Content</h2>
          <ul className="list-disc list-inside">
            <li>No inappropriate, offensive, or illegal content</li>
            <li>No copyrighted material without permission</li>
            <li>No content that violates privacy rights of others</li>
            <li>
              We reserve the right to refuse service for inappropriate content
            </li>
          </ul>
        </section>

        {/* 10. Liability Limitations */}
        <section>
          <h2 className="font-semibold text-xl mb-2">
            10. Liability Limitations
          </h2>
          <ul className="list-disc list-inside">
            <li>Our liability is limited to the amount paid for your order</li>
            <li>
              We are not liable for indirect, incidental, or consequential
              damages
            </li>
            <li>
              We are not responsible for lost or stolen packages after delivery
            </li>
          </ul>
        </section>

        {/* 11. Intellectual Property */}
        <section>
          <h2 className="font-semibold text-xl mb-2">
            11. Intellectual Property
          </h2>
          <p>
            You retain rights to your photos. By using our service, you grant us
            permission to process and print your photos. We may use anonymized
            usage data to improve our service.
          </p>
        </section>

        {/* 12. Modifications */}
        <section>
          <h2 className="font-semibold text-xl mb-2">12. Modifications</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will
            be effective immediately upon posting on our website.
          </p>
        </section>

        {/* 13. Contact Information */}
        <section>
          <h2 className="font-semibold text-xl mb-2">
            13. Contact Information
          </h2>
          <p>
            For questions about these terms or to request cancellations, contact
            us at:
            <br />
            <span className="font-medium">clickd.ofc@gmail.com</span>
            <br />
            <span className="font-medium">+91 99628 70308</span>
            <br />
          </p>
        </section>
      </div>
    </div>
  );
}
