export default function PrivacyPage() {
  return (
    <div className="flex grow justify-center items-center pt-2  mb-10 sm:mb-0">
      <div className="border border-gray-200 gap-y-6 p-5 mx-5 flex flex-col items-start rounded-xl shadow-md max-w-4xl">
        <div className="font-semibold text-4xl mb-10 w-full text-center">
          Privacy Policy
        </div>

        {/* 1. Information We Collect */}
        <section>
          <h2 className="font-semibold text-xl mb-2">
            1. Information We Collect
          </h2>
          <h3 className="font-medium">Personal Information</h3>
          <ul className="list-disc list-inside mb-2">
            <li>Name and contact details (email, phone, address)</li>
            <li>
              Payment information (processed securely through third-party
              providers)
            </li>
            <li>Shipping and billing addresses</li>
            <li>Communication records with customer service</li>
          </ul>

          <h3 className="font-medium">Photo Data</h3>
          <ul className="list-disc list-inside mb-2">
            <li>Digital photos captured through our virtual photobooth</li>
            <li>
              Metadata associated with photos (timestamp, device information)
            </li>
            <li>Print preferences and customization choices</li>
          </ul>

          <h3 className="font-medium">Technical Information</h3>
          <ul className="list-disc list-inside">
            <li>IP address and device information</li>
            <li>Browser type and version</li>
            <li>Usage analytics and service interaction data</li>
          </ul>
        </section>

        {/* 2. How We Use Your Information */}
        <section>
          <h2 className="font-semibold text-xl mb-2">
            2. How We Use Your Information
          </h2>
          <h3 className="font-medium">Primary Uses</h3>
          <ul className="list-disc list-inside mb-2">
            <li>Process and fulfill your print orders</li>
            <li>Communicate about your orders and provide customer service</li>
            <li>Process payments securely</li>
            <li>Ship products to your specified address</li>
          </ul>

          <h3 className="font-medium">Secondary Uses</h3>
          <ul className="list-disc list-inside">
            <li>Improve our service quality and user experience</li>
            <li>Send promotional communications (with your consent)</li>
            <li>Comply with legal obligations</li>
            <li>Protect against fraud and ensure service security</li>
          </ul>
        </section>

        {/* 3. Photo Data Handling */}
        <section>
          <h2 className="font-semibold text-xl mb-2">3. Photo Data Handling</h2>
          <h3 className="font-medium">Automatic Deletion</h3>
          <p className="mb-2">
            All photos are automatically deleted from our servers within 3 days
            of order completion. This includes original photos and any processed
            versions. Photos are permanently removed with no recovery possible.
          </p>
          <h3 className="font-medium">Processing Period</h3>
          <p>
            Photos are temporarily stored only for the time needed to process
            and fulfill your order. During this period, photos are stored
            securely with encryption. Access is limited to authorized personnel
            involved in order fulfillment.
          </p>
        </section>

        {/* 4. Data Retention */}
        <section>
          <h2 className="font-semibold text-xl mb-2">4. Data Retention</h2>
          <h3 className="font-medium">Non-Photo Data</h3>
          <p className="mb-2">
            Order information, contact details, and transaction records are
            retained for business and legal purposes. This data is kept for up
            to 7 years for accounting, tax, and legal compliance. Payment
            information is handled by our payment processors and not stored on
            our servers.
          </p>
          <h3 className="font-medium">Safety and Security Purposes</h3>
          <p>
            We retain certain data to prevent fraud, resolve disputes, and
            ensure service security. This includes order history, communication
            records, and account information.
          </p>
        </section>

        {/* 5. Data Sharing and Disclosure */}
        <section>
          <h2 className="font-semibold text-xl mb-2">
            5. Data Sharing and Disclosure
          </h2>
          <h3 className="font-medium">Service Providers</h3>
          <p className="mb-2">
            We share information with trusted third parties who assist in our
            operations:
          </p>
          <ul className="list-disc list-inside mb-2">
            <li>Payment processors for transaction handling</li>
            <li>Shipping companies for order delivery</li>
            <li>Cloud storage providers (for temporary photo storage only)</li>
            <li>Customer service platforms</li>
          </ul>
          <h3 className="font-medium">Legal Requirements</h3>
          <p className="mb-2">
            We may disclose information when required by law or to comply with
            legal processes or government requests, protect our rights and
            property, prevent fraud or security threats, and protect user
            safety.
          </p>
          <h3 className="font-medium">No Sale of Personal Data</h3>
          <p>
            We do not sell, rent, or trade your personal information to third
            parties.
          </p>
        </section>

        {/* 6. Data Security */}
        <section>
          <h2 className="font-semibold text-xl mb-2">6. Data Security</h2>
          <ul className="list-disc list-inside">
            <li>All data is encrypted in transit and at rest</li>
            <li>We use industry-standard security measures</li>
            <li>
              Access to personal information is restricted to authorized
              personnel only
            </li>
            <li>Regular security audits and updates are performed</li>
          </ul>
        </section>

        {/* 7. Your Rights */}
        <section>
          <h2 className="font-semibold text-xl mb-2">7. Your Rights</h2>
          <h3 className="font-medium">Access and Control</h3>
          <ul className="list-disc list-inside mb-2">
            <li>Request information about data we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>
              Request deletion of your account and associated data (subject to
              legal retention)
            </li>
          </ul>
          <h3 className="font-medium">Communication Preferences</h3>
          <ul className="list-disc list-inside">
            <li>Opt out of promotional communications at any time</li>
            <li>
              Update your contact preferences through your account or by
              contacting us
            </li>
          </ul>
        </section>

        {/* 8. Cookies and Tracking */}
        <section>
          <h2 className="font-semibold text-xl mb-2">
            8. Cookies and Tracking
          </h2>
          <p>
            We use cookies to improve website functionality and user experience.
            Analytics cookies help us understand how our service is used. You
            can control cookie settings through your browser.
          </p>
        </section>

        {/* 9. Third-Party Links */}
        <section>
          <h2 className="font-semibold text-xl mb-2">9. Third-Party Links</h2>
          <p>
            Our service may contain links to third-party websites. We are not
            responsible for the privacy practices of these external sites.
          </p>
        </section>

        {/* 10. Children's Privacy */}
        <section>
          <h2 className="font-semibold text-xl mb-2">10. Childrens Privacy</h2>
          <p>
            Our service is not intended for children under 13. We do not
            knowingly collect personal information from children. If we become
            aware of such collection, we will delete the information
            immediately.
          </p>
        </section>

        {/* 11. International Data Transfers */}
        <section>
          <h2 className="font-semibold text-xl mb-2">
            11. International Data Transfers
          </h2>
          <p>
            If you are located outside our primary operating country, your
            information may be transferred and processed in other countries
            where our service providers operate.
          </p>
        </section>

        {/* 12. Policy Changes */}
        <section>
          <h2 className="font-semibold text-xl mb-2">12. Policy Changes</h2>
          <p>
            We may update this privacy policy from time to time. We will notify
            users of significant changes through email or prominent website
            notices.
          </p>
        </section>
      </div>
    </div>
  );
}
