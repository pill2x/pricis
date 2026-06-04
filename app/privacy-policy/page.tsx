"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-surface text-text-dark font-sans">
      <Navbar />

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Sticky Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <span className="inline-block bg-surface-secondary border border-border-light text-text-secondary text-xs font-semibold px-3 py-1 rounded-full mb-4 font-body">
                Last updated: January 2025
              </span>
              <h3 className="font-bold text-text-dark font-display mb-4 text-lg">Table of Contents</h3>
              <ul className="space-y-3 font-body text-sm text-text-secondary">
                <li><a href="#section-1" className="hover:text-primary transition-colors block">1. Information We Collect</a></li>
                <li><a href="#section-2" className="hover:text-primary transition-colors block">2. How We Use Your Information</a></li>
                <li><a href="#section-3" className="hover:text-primary transition-colors block">3. Data Storage</a></li>
                <li><a href="#section-4" className="hover:text-primary transition-colors block">4. Your Rights</a></li>
                <li><a href="#section-5" className="hover:text-primary transition-colors block">5. Cookies</a></li>
                <li><a href="#section-6" className="hover:text-primary transition-colors block">6. Third-Party Services</a></li>
                <li><a href="#section-7" className="hover:text-primary transition-colors block">7. Changes to This Policy</a></li>
                <li><a href="#section-8" className="hover:text-primary transition-colors block">8. Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 max-w-3xl prose prose-slate max-w-none font-body text-text-secondary leading-relaxed">
            <div className="lg:hidden mb-12">
              <span className="inline-block bg-surface-secondary border border-border-light text-text-secondary text-xs font-semibold px-3 py-1 rounded-full font-body">
                Last updated: January 2025
              </span>
            </div>
            
            <h1 className="font-display font-bold text-text-dark text-4xl mb-8">Privacy Policy</h1>
            
            <p className="mb-8">
              At Pricis, we are committed to protecting your privacy and ensuring that your personal information is handled securely and responsibly. This Privacy Policy outlines how we collect, use, and protect your data when you use our platform.
            </p>

            <h2 id="section-1" className="font-display font-semibold text-text-dark text-xl mt-12 mb-4 scroll-mt-24">1. Information We Collect</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Account information:</strong> Your name, email address, and business details when you sign up.</li>
              <li><strong>Usage data:</strong> Information on how you interact with the platform, such as features used and scopes generated.</li>
              <li><strong>Client data:</strong> Project details, client names, and context you input to generate scopes or use Kova.</li>
              <li><strong>Payment information:</strong> Payment processing is handled securely by Paystack. Pricis does not store your full card details.</li>
            </ul>

            <h2 id="section-2" className="font-display font-semibold text-text-dark text-xl mt-12 mb-4 scroll-mt-24">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>To provide, maintain, and improve the Pricis service.</li>
              <li>To send product updates, security alerts, and support messages (you can opt out of marketing emails).</li>
              <li>To detect and prevent fraudulent activity.</li>
              <li><strong>We never sell your data to third parties.</strong></li>
            </ul>

            <h2 id="section-3" className="font-display font-semibold text-text-dark text-xl mt-12 mb-4 scroll-mt-24">3. Data Storage</h2>
            <p className="mb-8">
              Your data is stored securely on Supabase, which relies on robust AWS infrastructure. Access to data is strictly controlled via authentication and row-level security policies.
            </p>

            <h2 id="section-4" className="font-display font-semibold text-text-dark text-xl mt-12 mb-4 scroll-mt-24">4. Your Rights</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Right to access:</strong> You can request a copy of the personal data we hold about you.</li>
              <li><strong>Right to delete:</strong> You can delete your account and associated data at any time from your settings.</li>
              <li><strong>Right to export:</strong> You can request an export of your scopes and invoices.</li>
            </ul>

            <h2 id="section-5" className="font-display font-semibold text-text-dark text-xl mt-12 mb-4 scroll-mt-24">5. Cookies</h2>
            <p className="mb-8">
              We use functional cookies exclusively to manage authentication sessions and save your preferences. We do not use third-party advertising or tracking cookies on the core platform.
            </p>

            <h2 id="section-6" className="font-display font-semibold text-text-dark text-xl mt-12 mb-4 scroll-mt-24">6. Third-Party Services</h2>
            <p className="mb-4">We rely on trusted third-party providers to operate Pricis:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Supabase:</strong> For database and authentication infrastructure.</li>
              <li><strong>Paystack:</strong> For secure payment processing.</li>
              <li><strong>Anthropic/OpenAI:</strong> For powering Kova and the scope generator. Note: Client data you enter is sent to these APIs for processing but is <em>never</em> used to train their underlying models.</li>
              <li><strong>Vercel:</strong> For secure application hosting.</li>
            </ul>

            <h2 id="section-7" className="font-display font-semibold text-text-dark text-xl mt-12 mb-4 scroll-mt-24">7. Changes to This Policy</h2>
            <p className="mb-8">
              We may update this policy periodically. If we make material changes, we will notify you via the email address associated with your account before the changes take effect.
            </p>

            <h2 id="section-8" className="font-display font-semibold text-text-dark text-xl mt-12 mb-4 scroll-mt-24">8. Contact</h2>
            <p className="mb-8">
              If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:privacy@pricis.co" className="text-primary hover:underline">privacy@pricis.co</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
