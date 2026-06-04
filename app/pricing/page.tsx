"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, RefreshCw, Zap, Shield, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const pricingFaqs = [
  {
    q: "Can I cancel my Pro subscription?",
    a: "Yes, anytime from your dashboard settings. Pro features remain active until the end of your billing cycle."
  },
  {
    q: "What happens when I hit my free tier limit?",
    a: "You'll see a clear prompt to upgrade. You won't lose any work — you just can't create new items until the month resets or you upgrade."
  },
  {
    q: "Is there a student or NGO discount?",
    a: "Yes — reach out via our contact page and we'll sort you out."
  },
  {
    q: "Do you accept bank transfer or card?",
    a: "Both. We support Paystack, which accepts cards, bank transfers, and USSD."
  },
  {
    q: "What's the difference between monthly and yearly billing?",
    a: "Yearly billing saves you 20% — that's 2 months free. You're billed once annually."
  },
  {
    q: "Can my team share one Pro account?",
    a: "For teams, the Business plan is the right fit. It supports up to 5 members with shared access."
  }
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="py-20 px-6 bg-bg-dark text-center">
        <div className="max-w-3xl mx-auto">
          <div className="font-body text-xs font-semibold tracking-[0.1em] uppercase text-primary mb-4">
            PRICING
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-display leading-tight">
            Simple pricing. No <span className="text-primary">surprises.</span>
          </h1>
          <p className="text-lg text-text-muted mb-12 leading-relaxed font-body max-w-xl mx-auto">
            Start free. Upgrade when you're ready to grow.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-semibold font-body ${!isYearly ? 'text-white' : 'text-text-muted'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors ${isYearly ? 'bg-success' : 'bg-primary'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${isYearly ? 'translate-x-6' : ''}`}></div>
            </button>
            <span className={`text-sm font-semibold font-body flex items-center gap-2 ${isYearly ? 'text-white' : 'text-text-muted'}`}>
              Yearly 
              <span className="bg-success/20 text-success rounded-full px-2 py-0.5 text-xs font-bold">Save 20%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 px-6 bg-bg-dark relative z-10">
        <div className="grid lg:grid-cols-3 gap-6 text-left max-w-6xl mx-auto">
          {/* Free */}
          <div className="bg-surface border border-border-light p-8 rounded-2xl shadow-sm flex flex-col text-text-dark">
            <h3 className="text-xl font-bold text-text-dark mb-1 font-display">Free</h3>
            <p className="text-sm text-text-secondary mb-6 font-body">For getting started</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-text-dark font-display">₦0</span>
              <span className="text-sm text-text-secondary font-medium font-body">/month</span>
              <span className="text-sm text-text-secondary block mt-1 font-body">Always free</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1 font-body">
              <li className="flex items-start gap-3 text-sm"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Generate up to 5 scopes/month</li>
              <li className="flex items-start gap-3 text-sm"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Access 20+ basic templates</li>
              <li className="flex items-start gap-3 text-sm"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Basic invoices (2/month)</li>
              <li className="flex items-start gap-3 text-sm"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Share scopes (limited, no tracking)</li>
              <li className="flex items-start gap-3 text-sm"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Kova: 10 messages/month</li>
              <li className="flex items-start gap-3 text-sm"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Community support</li>
            </ul>
            <Link href="/signup" className="w-full py-3 rounded-full font-semibold border-[1.5px] border-border-light text-text-dark hover:bg-gray-50 transition-colors text-center block font-body">Get Started Free</Link>
          </div>

          {/* Pro */}
          <div className="bg-surface border-2 border-primary px-8 pb-8 rounded-2xl shadow-xl flex flex-col relative transform lg:-translate-y-4 text-text-dark">
            <div className="flex justify-center w-full transform -translate-y-1/2 mb-[-12px]">
              <span className="inline-block bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full font-body shadow-blue whitespace-nowrap">
                Most Popular
              </span>
            </div>
            <h3 className="text-xl font-bold text-text-dark mb-1 font-display mt-1">Pro</h3>
            <p className="text-sm text-text-secondary mb-6 font-body">For growing professionals</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-text-dark font-display">₦{isYearly ? '6,000' : '7,500'}</span>
              <span className="text-sm text-text-secondary font-medium font-body">/month</span>
              <span className="text-sm text-text-secondary block mt-1 font-body">Billed {isYearly ? '₦72,000 yearly' : 'monthly'}</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1 font-body">
              <li className="flex items-start gap-3 text-sm font-semibold"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Everything in Free</li>
              <li className="flex items-start gap-3 text-sm"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Unlimited scope generation</li>
              <li className="flex items-start gap-3 text-sm"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Kova AI: unlimited messages</li>
              <li className="flex items-start gap-3 text-sm"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Unlimited saved custom templates</li>
              <li className="flex items-start gap-3 text-sm"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Unlimited invoices with branding</li>
              <li className="flex items-start gap-3 text-sm"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Client share links + view tracking</li>
              <li className="flex items-start gap-3 text-sm"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> PDF export (branded)</li>
              <li className="flex items-start gap-3 text-sm"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Priority email support</li>
            </ul>
            <Link href="/signup" className="w-full py-3 rounded-full font-semibold bg-primary hover:bg-primary-hover text-white transition-colors shadow-blue text-center block font-body">Start 7-Day Free Trial</Link>
          </div>

          {/* Business */}
          <div className="bg-surface border border-border-light p-8 rounded-2xl shadow-sm flex flex-col text-text-dark">
            <h3 className="text-xl font-bold text-text-dark mb-1 font-display">Business</h3>
            <p className="text-sm text-text-secondary mb-6 font-body">For teams and agencies</p>
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-text-dark font-display">₦{isYearly ? '12,000' : '15,000'}</span>
              <span className="text-sm text-text-secondary font-medium font-body">/month</span>
              <span className="text-sm text-text-secondary block mt-1 font-body">Billed {isYearly ? '₦144,000 yearly' : 'monthly'}</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1 font-body">
              <li className="flex items-start gap-3 text-sm font-semibold"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Everything in Pro</li>
              <li className="flex items-start gap-3 text-sm"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Up to 5 team members</li>
              <li className="flex items-start gap-3 text-sm"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Team scope collaboration</li>
              <li className="flex items-start gap-3 text-sm"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Custom workspace branding</li>
              <li className="flex items-start gap-3 text-sm"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Shared template library</li>
              <li className="flex items-start gap-3 text-sm"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Dedicated account manager</li>
            </ul>
            <Link href="/contact" className="w-full py-3 rounded-full font-semibold border-[1.5px] border-border-light text-text-dark hover:bg-gray-50 transition-colors text-center block font-body">Contact Sales</Link>
          </div>
        </div>
      </section>

      {/* Quota Explainer */}
      <section className="py-24 px-6 bg-surface-secondary text-text-dark border-t border-border-light">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark font-display mb-4">
              How free tier limits work.
            </h2>
            <p className="text-text-secondary font-body text-lg">
              We want you to get value before you pay. Here is how our fair-use limits work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-surface border border-border-light p-6 rounded-2xl shadow-sm text-center">
              <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <RefreshCw size={24} />
              </div>
              <h3 className="text-lg font-bold text-text-dark mb-2 font-display">Monthly Reset</h3>
              <p className="text-text-secondary text-sm leading-relaxed font-body">
                Your free tier quota resets on the 1st of every month. Scopes, Kova messages, and invoices all reset together.
              </p>
            </div>
            
            <div className="bg-surface border border-border-light p-6 rounded-2xl shadow-sm text-center">
              <div className="w-12 h-12 bg-success/10 text-success rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap size={24} />
              </div>
              <h3 className="text-lg font-bold text-text-dark mb-2 font-display">Upgrade Anytime</h3>
              <p className="text-text-secondary text-sm leading-relaxed font-body">
                Hitting your limit mid-project? Upgrade to Pro instantly — no waiting, no form to fill. Your work carries over.
              </p>
            </div>

            <div className="bg-surface border border-border-light p-6 rounded-2xl shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-lg font-bold text-text-dark mb-2 font-display">No Data Loss</h3>
              <p className="text-text-secondary text-sm leading-relaxed font-body">
                Downgrading from Pro? Your scopes, templates, and invoices are always saved. You just lose access to Pro-only features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-surface text-text-dark">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark font-display">
              Pricing FAQs
            </h2>
          </div>
          
          <div className="divide-y divide-border-light border-y border-border-light">
            {pricingFaqs.map((faq, i) => (
              <button
                key={i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-5 flex items-start justify-between gap-4 text-left group"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-text-dark font-display text-base group-hover:text-primary transition-colors">{faq.q}</h3>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openIndex === i ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-sm text-text-secondary leading-relaxed font-body pr-8">{faq.a}</p>
                  </div>
                </div>
                <div className="mt-1 flex-shrink-0">
                  {openIndex === i ? (
                    <ChevronUp size={18} className="text-primary" />
                  ) : (
                    <ChevronDown size={18} className="text-text-muted group-hover:text-primary transition-colors" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
