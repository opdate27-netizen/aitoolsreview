import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy — AI Tools Review",
  description: "Privacy policy for AI Tools Review. Learn how we collect, use, and protect your data.",
}

const LAST_UPDATED = "March 4, 2026"
const SITE_NAME = "AI Tools Review"
const SITE_URL = "https://aitoolsreview.vercel.app"
const CONTACT_EMAIL = "opdate27@icloud.com"

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Privacy Policy</h1>
        <p className="text-zinc-500 text-sm">Last updated: {LAST_UPDATED}</p>
      </div>

      <div className="space-y-10 text-zinc-300 leading-relaxed">

        <section>
          <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
          <p>
            Welcome to {SITE_NAME} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We operate
            the website located at {SITE_URL}. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website.
          </p>
          <p className="mt-3">
            Please read this policy carefully. If you disagree with its terms, please discontinue
            use of the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
          <h3 className="font-semibold text-zinc-200 mb-2">Information you provide voluntarily</h3>
          <p className="mb-3">
            We collect information you voluntarily provide when you:
          </p>
          <ul className="list-disc list-inside space-y-1 text-zinc-400 mb-4 ml-2">
            <li>Subscribe to our email list via the newsletter signup or free guide form</li>
            <li>Contact us directly via email</li>
          </ul>
          <p>This may include your email address and name.</p>

          <h3 className="font-semibold text-zinc-200 mt-5 mb-2">Information collected automatically</h3>
          <p>
            When you visit our site, we may automatically collect certain information about your
            device and usage, including your IP address, browser type, pages visited, and time
            spent on pages. This is collected through standard web analytics tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
          <p className="mb-3">We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-2">
            <li>Send you our newsletter and free guide if you subscribed</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Improve our website content and user experience</li>
            <li>Monitor site usage and analytics</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p className="mt-3">
            We will never sell, rent, or share your email address with third parties for
            marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">4. Affiliate Links & Third Parties</h2>
          <p className="mb-3">
            Our website contains affiliate links to third-party products and services. When you
            click these links and make a purchase, we may earn a commission at no additional cost
            to you.
          </p>
          <p>
            These third-party sites have their own privacy policies. We have no responsibility
            or liability for their content or activities. We encourage you to review the privacy
            policies of any third-party sites you visit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">5. Cookies</h2>
          <p className="mb-3">
            Our website may use cookies and similar tracking technologies to improve your
            browsing experience. Cookies are small data files stored on your device.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is
            being sent. However, if you do not accept cookies, some portions of our site may
            not function properly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">6. Data Retention</h2>
          <p>
            We retain your email address for as long as you remain subscribed to our newsletter.
            You may unsubscribe at any time by clicking the unsubscribe link in any email we
            send, or by contacting us directly. Upon unsubscribing, your data will be removed
            from our mailing list within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">7. Your Rights</h2>
          <p className="mb-3">Depending on your location, you may have the right to:</p>
          <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-2">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, please contact us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-violet-400 hover:text-violet-300">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">8. Children&apos;s Privacy</h2>
          <p>
            Our website is not directed to children under the age of 13. We do not knowingly
            collect personal information from children under 13. If you believe we have
            inadvertently collected such information, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any
            changes by updating the &quot;Last updated&quot; date at the top of this page.
            Your continued use of the site after any changes constitutes acceptance of the
            new policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">10. Contact Us</h2>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <div className="mt-3 bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-sm">
            <p className="text-white font-medium">{SITE_NAME}</p>
            <p className="text-zinc-400 mt-1">
              Email:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-violet-400 hover:text-violet-300">
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="text-zinc-400">Website: {SITE_URL}</p>
          </div>
        </section>

      </div>
    </main>
  )
}
