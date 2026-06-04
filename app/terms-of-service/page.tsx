"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfServicePage() {
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
                <li><a href="#section-1" className="hover:text-primary transition-colors block">1. Acceptance of Terms</a></li>
                <li><a href="#section-2" className="hover:text-primary transition-colors block">2. Description of Service</a></li>
                <li><a href="#section-3" className="hover:text-primary transition-colors block">3. Account Registration</a></li>
                <li><a href="#section-4" className="hover:text-primary transition-colors block">4. Free and Paid Plans</a></li>
                <li><a href="#section-5" className="hover:text-primary transition-colors block">5. Acceptable Use</a></li>
                <li><a href="#section-6" className="hover:text-primary transition-colors block">6. Intellectual Property</a></li>
                <li><a href="#section-7" className="hover:text-primary transition-colors block">7. Limitation of Liability</a></li>
                <li><a href="#section-8" className="hover:text-primary transition-colors block">8. Termination</a></li>
                <li><a href="#section-9" className="hover:text-primary transition-colors block">9. Governing Law</a></li>
                <li><a href="#section-10" className="hover:text-primary transition-colors block">10. Contact</a></li>
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
            
            <h1 className="font-display font-bold text-text-dark text-4xl mb-8">Terms of Service</h1>
            
            <p className="mb-8">
              Welcome to Pricis. By accessing or using our website, services, and platform, you agree to be bound by these Terms of Service. Please read them carefully.
            </p>

            <h2 id="section-1" className="font-display font-semibold text-text-dark text-xl mt-12 mb-4 scroll-mt-24">1. Acceptance of Terms</h2>
            <p className="mb-8">
              By creating an account or using Pricis, you agree to these Terms. If you do not agree to these Terms, you may not use the service.
            </p>

            <h2 id="section-2" className="font-display font-semibold text-text-dark text-xl mt-12 mb-4 scroll-mt-24">2. Description of Service</h2>
            <p className="mb-8">
              Pricis provides tools for freelancers and service providers to generate project scopes, estimate pricing based on market data, draft proposals, and utilize AI for negotiation assistance.
            </p>

            <h2 id="section-3" className="font-display font-semibold text-text-dark text-xl mt-12 mb-4 scroll-mt-24">3. Account Registration</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>You must be 18 years or older, or have explicit parental consent, to use this service.</li>
              <li>You must provide accurate and complete information when creating an account.</li>
              <li>You are solely responsible for maintaining the security of your account and password. Pricis cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.</li>
            </ul>

            <h2 id="section-4" className="font-display font-semibold text-text-dark text-xl mt-12 mb-4 scroll-mt-24">4. Free and Paid Plans</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Free Tier:</strong> Usage is subject to the limits described on our Pricing page (e.g., maximum scopes per month). These limits reset on the 1st of every calendar month.</li>
              <li><strong>Paid Plans:</strong> Subscriptions (Pro, Business) are billed in advance on a monthly or annual basis via Paystack and are non-refundable except where required by law.</li>
            </ul>

            <h2 id="section-5" className="font-display font-semibold text-text-dark text-xl mt-12 mb-4 scroll-mt-24">5. Acceptable Use</h2>
            <p className="mb-4">You agree not to use Pricis to:</p>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>Generate fraudulent documents, invoices, or contracts.</li>
              <li>Resell, sublicense, or white-label the service without our explicit written permission (outside of standard Business plan features).</li>
              <li>Abuse the AI features (e.g., deploying automated scripts to make excessive API requests to Kova).</li>
            </ul>

            <h2 id="section-6" className="font-display font-semibold text-text-dark text-xl mt-12 mb-4 scroll-mt-24">6. Intellectual Property</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li><strong>Your Data:</strong> The scopes, proposals, and invoices you generate belong to you.</li>
              <li><strong>Our Templates:</strong> Pricis scope templates and UI designs are licensed to you for use within the platform. You may not extract and redistribute our templates as a competing product.</li>
            </ul>

            <h2 id="section-7" className="font-display font-semibold text-text-dark text-xl mt-12 mb-4 scroll-mt-24">7. Limitation of Liability</h2>
            <p className="mb-8">
              Pricis is a software tool, not a legal or financial advisor. Pricing suggestions and AI-generated negotiation scripts are provided for guidance purposes only. You must review all scopes and invoices before sending them to clients. Pricis is not liable for lost revenue, lost clients, or contract disputes resulting from your use of the platform.
            </p>

            <h2 id="section-8" className="font-display font-semibold text-text-dark text-xl mt-12 mb-4 scroll-mt-24">8. Termination</h2>
            <ul className="list-disc pl-6 mb-8 space-y-2">
              <li>You may delete your account at any time via your account settings.</li>
              <li>We reserve the right to suspend or terminate accounts that violate these Terms, particularly in cases of abuse or fraud, without prior notice or refund.</li>
            </ul>

            <h2 id="section-9" className="font-display font-semibold text-text-dark text-xl mt-12 mb-4 scroll-mt-24">9. Governing Law</h2>
            <p className="mb-8">
              These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, without regard to its conflict of law provisions.
            </p>

            <h2 id="section-10" className="font-display font-semibold text-text-dark text-xl mt-12 mb-4 scroll-mt-24">10. Contact</h2>
            <p className="mb-8">
              If you have any questions about these Terms, please contact us at: <a href="mailto:legal@pricis.co" className="text-primary hover:underline">legal@pricis.co</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
