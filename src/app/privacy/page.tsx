import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Perfect Sense Productions.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      <section className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl sm:text-5xl font-[200] tracking-[0.04em] leading-none mb-4">
          Privacy Policy
          <span
            className="inline-block w-[12px] h-[12px] sm:w-[14px] sm:h-[14px] bg-[#0a0a0a] rounded-full ml-1"
            style={{ verticalAlign: "-0.05em" }}
            aria-hidden="true"
          />
        </h1>
        <p className="text-sm font-[200] text-[#999] mb-16">
          Last updated: March 30, 2026
        </p>

        <div className="space-y-12 text-[15px] font-[200] leading-[1.9] text-[#555]">
          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">1. Introduction</h2>
            <p>
              Perfect Sense Productions (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website
              perfectsenseproductions.com (the &quot;Site&quot;). This Privacy Policy explains how we collect,
              use, disclose, and safeguard your information when you visit our Site. By using the Site,
              you agree to the terms of this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">2. Information We Collect</h2>
            <p className="mb-4">
              <strong className="font-[400] text-[#0a0a0a]">Personal Information You Provide.</strong>{" "}
              We may collect personal information that you voluntarily provide when you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Subscribe to our email newsletter or waitlist</li>
              <li>Contact us via email</li>
            </ul>
            <p className="mt-4">
              This information may include your email address.
            </p>
            <p className="mt-4">
              <strong className="font-[400] text-[#0a0a0a]">Automatically Collected Information.</strong>{" "}
              When you visit our Site, our hosting provider (Vercel, Inc.) may automatically collect
              certain information about your device and usage, including your IP address, browser type,
              operating system, referring URLs, pages viewed, and the dates and times of your visits.
              This information is collected through server logs and similar technologies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Send you newsletters, updates, and marketing communications you have opted into</li>
              <li>Respond to your inquiries and communications</li>
              <li>Improve and optimize our Site and user experience</li>
              <li>Monitor and analyze usage and trends</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">4. Sharing Your Information</h2>
            <p className="mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share
              your information with trusted third-party service providers who assist us in operating
              our Site and conducting our business, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="font-[400] text-[#0a0a0a]">Vercel, Inc.</strong> — website hosting and delivery</li>
              <li><strong className="font-[400] text-[#0a0a0a]">Email service providers</strong> — for newsletter delivery and management</li>
            </ul>
            <p className="mt-4">
              These providers are contractually obligated to use your information only as necessary
              to provide services to us. We may also disclose your information if required by law,
              court order, or governmental regulation, or to protect our rights, safety, or property.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">5. Cookies and Tracking Technologies</h2>
            <p>
              Our Site currently does not use cookies or third-party analytics services. If we introduce
              cookies or analytics tools in the future, this Privacy Policy will be updated accordingly.
              Our hosting provider may use essential cookies necessary for the functioning of the Site.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">6. Third-Party Links</h2>
            <p>
              Our Site contains links to third-party websites and services, including social media
              platforms such as TikTok, Instagram, and YouTube. We are not responsible for the privacy
              practices or content of those third-party sites. We encourage you to review the privacy
              policies of any third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">7. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes
              for which it was collected, including to satisfy any legal, accounting, or reporting
              requirements. When your information is no longer needed, we will securely delete or
              anonymize it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">8. Data Security</h2>
            <p>
              We implement reasonable administrative, technical, and physical security measures to
              protect your personal information. Our Site is served over HTTPS and hosted on
              infrastructure maintained by Vercel, Inc. However, no method of transmission over the
              Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">9. Your Rights and Choices</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Opt out of marketing emails at any time by clicking the &quot;unsubscribe&quot; link in any email we send</li>
              <li>Request access to, correction of, or deletion of your personal information</li>
              <li>Withdraw your consent to data processing at any time</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:hello@perfectsenseproductions.com" className="text-[#0a0a0a] underline">
                hello@perfectsenseproductions.com
              </a>.
              We will respond to your request within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">10. California Privacy Rights (CCPA)</h2>
            <p className="mb-4">
              If you are a California resident, the California Consumer Privacy Act (&quot;CCPA&quot;) provides
              you with additional rights regarding your personal information. Specifically, you have
              the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Know what personal information we collect, use, disclose, and sell</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of the sale of your personal information — though we do not sell personal information</li>
              <li>Non-discrimination for exercising your CCPA rights</li>
            </ul>
            <p className="mt-4">
              To submit a verifiable consumer request, please contact us at{" "}
              <a href="mailto:hello@perfectsenseproductions.com" className="text-[#0a0a0a] underline">
                hello@perfectsenseproductions.com
              </a>.
              We will verify your identity before processing your request and respond within 45 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">11. European Privacy Rights (GDPR)</h2>
            <p className="mb-4">
              If you are located in the European Economic Area (&quot;EEA&quot;), the United Kingdom, or
              Switzerland, you have certain rights under the General Data Protection Regulation
              (&quot;GDPR&quot;) and applicable local data protection laws. These include the right to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data and receive a copy of it</li>
              <li>Rectify inaccurate personal data</li>
              <li>Request erasure of your personal data (&quot;right to be forgotten&quot;)</li>
              <li>Restrict or object to our processing of your personal data</li>
              <li>Data portability — receive your data in a structured, commonly used, machine-readable format</li>
              <li>Withdraw consent at any time where processing is based on consent</li>
              <li>Lodge a complaint with your local data protection supervisory authority</li>
            </ul>
            <p className="mt-4">
              <strong className="font-[400] text-[#0a0a0a]">Legal Basis for Processing.</strong>{" "}
              We process your personal data based on: (a) your consent (e.g., when you subscribe to
              our newsletter); (b) our legitimate interests (e.g., to improve our Site and services);
              and (c) compliance with legal obligations.
            </p>
            <p className="mt-4">
              <strong className="font-[400] text-[#0a0a0a]">International Transfers.</strong>{" "}
              Your personal data may be transferred to and processed in the United States, where our
              servers and service providers are located. By using the Site, you consent to this
              transfer. We take reasonable steps to ensure your data is treated securely and in
              accordance with this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">12. Children&apos;s Privacy</h2>
            <p>
              Our Site is not directed to individuals under the age of 13. We do not knowingly collect
              personal information from children under 13. If we become aware that we have collected
              personal information from a child under 13, we will take steps to promptly delete that
              information. If you believe we may have collected information from a child under 13,
              please contact us at{" "}
              <a href="mailto:hello@perfectsenseproductions.com" className="text-[#0a0a0a] underline">
                hello@perfectsenseproductions.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">13. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this
              page with an updated &quot;Last updated&quot; date. We encourage you to review this Privacy Policy
              periodically. Your continued use of the Site after any changes constitutes your acceptance
              of the revised Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-[300] text-[#0a0a0a] mb-4">14. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our data practices,
              please contact us at:{" "}
              <a href="mailto:hello@perfectsenseproductions.com" className="text-[#0a0a0a] underline">
                hello@perfectsenseproductions.com
              </a>
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
