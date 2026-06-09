"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, ChevronRight, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Can I change plans anytime?",
      a: "Yes, you can upgrade, downgrade, or cancel your plan at any time from your account settings page."
    },
    {
      q: "Is there a limit on projects or clients?",
      a: "The Free plan allows up to 5 scopes per month. Pro and Business plans offer completely unlimited scopes and client shares."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major debit/credit cards, bank transfers, and USSD via our secure payment gateway (Paystack)."
    },
    {
      q: "Is my data safe with Pricis?",
      a: "Yes, we use industry-standard encryption to protect your account details, scopes, invoices, and client negotiation data."
    },
    {
      q: "Do you offer refunds?",
      a: "If you're unsatisfied with your subscription, contact our support team within 14 days of purchase for a full refund."
    }
  ];

  return (
    <div className="min-h-screen bg-bg-dark text-text-dark font-body selection:bg-primary selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-28 overflow-hidden bg-bg-dark text-white text-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent rounded-full blur-[120px] opacity-80 pointer-events-none"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">Simple, Transparent Pricing</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-8 leading-tight">
            Choose the plan that<br />
            fits your <span className="text-primary">journey.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-muted mb-12 max-w-xl mx-auto leading-relaxed">
            Start free. Upgrade anytime. Cancel anytime.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 bg-bg-dark-2/65 p-1 rounded-full border border-white/10 w-fit mx-auto backdrop-blur-md">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                !isYearly ? "bg-primary text-white shadow" : "text-text-muted hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                isYearly ? "bg-primary text-white shadow" : "text-text-muted hover:text-white"
              }`}
            >
              Yearly 
              <span className="bg-success/20 text-success text-[10px] font-bold px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 px-6 bg-bg-dark text-white relative z-10 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto mb-16">
            
            {/* Free */}
            <div className="bg-white border border-border-light p-8 rounded-3xl shadow-md flex flex-col justify-between text-text-dark">
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-1 font-display">Free</h3>
                <p className="text-sm text-text-secondary mb-6 font-body">For getting started</p>
                <div className="mb-8 border-b border-border-light pb-6">
                  <span className="text-5xl font-black text-text-dark font-display">₦0</span>
                  <span className="text-sm text-text-secondary block mt-1 font-medium">Always free</span>
                </div>
                <ul className="space-y-4 mb-8 text-sm">
                  {[
                    "Generate scopes (limited)",
                    "Access basic templates",
                    "Share scopes (limited)",
                    "Basic negotiation tips",
                    "Community support"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-text-secondary font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/signup" className="w-full py-3.5 rounded-full font-bold border-2 border-border-light text-text-dark hover:bg-slate-50 transition-colors text-center block text-sm">
                Get Started Free
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-white border-2 border-primary px-8 pb-8 rounded-3xl shadow-xl flex flex-col justify-between relative text-text-dark transform lg:-translate-y-4">
              <div className="flex justify-center w-full transform -translate-y-1/2 mb-[-12px]">
                <span className="inline-block bg-primary text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-blue">
                  Most Popular
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-1 font-display mt-1">Pro</h3>
                <p className="text-sm text-text-secondary mb-6 font-body">For growing professionals</p>
                <div className="mb-8 border-b border-border-light pb-6">
                  <span className="text-5xl font-black text-text-dark font-display">
                    ₦{isYearly ? "6,000" : "7,500"}
                  </span>
                  <span className="text-sm text-text-secondary font-semibold">/month</span>
                  <span className="text-xs text-text-muted block mt-1 font-medium">Billed {isYearly ? "₦72,000 yearly" : "monthly"}</span>
                </div>
                <ul className="space-y-4 mb-8 text-sm">
                  {[
                    "Everything in Free",
                    "Unlimited scopes",
                    "AI Negotiation Assistant (all modes)",
                    "PDF export (branded)",
                    "Client share links with tracking",
                    "Saved templates (unlimited)",
                    "Invoice generation",
                    "Priority email support"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-text-dark font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <Link href="/signup" className="w-full py-3.5 rounded-full font-bold bg-primary hover:bg-primary-hover text-white transition-colors text-center block text-sm shadow-blue">
                  Start Pro Trial
                </Link>
                <div className="flex items-center justify-center gap-1.5 text-xs text-success font-semibold">
                  <Check className="w-4 h-4" /> 7-day free trial · Cancel anytime
                </div>
              </div>
            </div>

            {/* Business */}
            <div className="bg-white border border-border-light p-8 rounded-3xl shadow-md flex flex-col justify-between text-text-dark">
              <div>
                <h3 className="text-2xl font-bold text-text-dark mb-1 font-display">Business</h3>
                <p className="text-sm text-text-secondary mb-6 font-body">For teams and agencies</p>
                <div className="mb-8 border-b border-border-light pb-6">
                  <span className="text-5xl font-black text-text-dark font-display">
                    ₦{isYearly ? "12,000" : "15,000"}
                  </span>
                  <span className="text-sm text-text-secondary font-semibold">/month</span>
                  <span className="text-xs text-text-muted block mt-1 font-medium">Billed {isYearly ? "₦144,000 yearly" : "monthly"}</span>
                </div>
                <ul className="space-y-4 mb-8 text-sm">
                  {[
                    "Everything in Pro",
                    "Team collaboration",
                    "Custom branding",
                    "Client permissions",
                    "Advanced analytics",
                    "Priority support",
                    "Dedicated account manager"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-text-secondary font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/contact" className="w-full py-3.5 rounded-full font-bold border-2 border-border-light text-text-dark hover:bg-slate-50 transition-colors text-center block text-sm">
                Contact Sales
              </Link>
            </div>

          </div>

          {/* Features Bar */}
          <div className="max-w-4xl mx-auto bg-primary/10 border border-primary/20 rounded-2xl py-4 px-6 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-primary-light text-blue-400">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-success" /> All plans include:</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> Secure payments</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> 99.9% uptime</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> Data privacy</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-primary" /> Built for Africa</span>
          </div>
        </div>
      </section>

      {/* Plan Comparisons */}
      <section className="py-24 bg-surface text-text-dark border-b border-border-light">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight mb-4">Compare plans</h2>
            <p className="text-lg text-text-secondary">Find the perfect features for your workflow.</p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-border-light shadow-sm">
            <table className="w-full text-left font-body text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-border-light text-[10px] uppercase font-bold text-text-secondary tracking-wider">
                  <th className="p-5 font-semibold text-sm text-text-dark">Compare plans</th>
                  <th className="p-5 font-bold">Free</th>
                  <th className="p-5 font-bold text-primary">Pro</th>
                  <th className="p-5 font-bold">Business</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light font-medium text-text-dark">
                {[
                  { name: "Scopes per month", free: "5", pro: "Unlimited", bus: "Unlimited" },
                  { name: "AI Negotiation Assistant", free: "Basic tips", pro: "All modes", bus: "All modes" },
                  { name: "Templates", free: "Basic library", pro: "Unlimited", bus: "Unlimited + custom" },
                  { name: "Client share links", free: "5 per month", pro: "Unlimited", bus: "Unlimited" },
                  { name: "View tracking", free: false, pro: true, bus: true },
                  { name: "PDF export", free: "Watermarked", pro: "Branded", bus: "Branded + custom" },
                  { name: "Invoicing", free: false, pro: true, bus: true },
                  { name: "Team members", free: "1", pro: "1", bus: "Unlimited" },
                  { name: "Custom branding", free: false, pro: false, bus: true },
                  { name: "Priority support", free: false, pro: true, bus: true },
                  { name: "Dedicated account manager", free: false, pro: false, bus: true },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-5 font-semibold text-sm">{row.name}</td>
                    <td className="p-5 text-text-secondary">
                      {typeof row.free === "boolean" ? (row.free ? <Check className="w-5 h-5 text-success" /> : "—") : row.free}
                    </td>
                    <td className="p-5 text-primary font-bold text-sm">
                      {typeof row.pro === "boolean" ? (row.pro ? <Check className="w-5 h-5 text-primary" /> : "—") : row.pro}
                    </td>
                    <td className="p-5 text-text-dark">
                      {typeof row.bus === "boolean" ? (row.bus ? <Check className="w-5 h-5 text-success" /> : "—") : row.bus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trial FAQ Accordion */}
      <section className="py-24 bg-surface-secondary text-text-dark relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* CTA Box */}
            <div className="bg-bg-dark text-white rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-between h-full shadow-lg">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-white/5 border border-white/10 px-3.5 py-1 rounded-full mb-6 inline-block">Not Sure Yet?</span>
                <h3 className="text-3xl md:text-4xl font-display font-bold leading-tight mb-4 text-white">
                  Try Pro free for <br />
                  <span className="text-primary">7 days.</span>
                </h3>
                <p className="text-sm text-text-muted mb-8 leading-relaxed">
                  Explore all Pro features risk-free. No credit card required.
                </p>
                <ul className="space-y-3.5 mb-8 text-xs font-semibold text-text-muted">
                  <li className="flex items-center gap-2"><Check className="text-success w-4.5 h-4.5" /> Full access to all Pro features</li>
                  <li className="flex items-center gap-2"><Check className="text-success w-4.5 h-4.5" /> Cancel anytime, no obligations</li>
                </ul>
              </div>
              <div>
                <Link href="/signup" className="bg-primary hover:bg-primary-hover text-white text-sm font-bold py-3.5 px-8 rounded-full flex items-center justify-center gap-2 w-full sm:w-auto shadow-blue transition-colors mb-2">
                  Start Pro Free Trial <ChevronRight className="w-4 h-4" />
                </Link>
                <p className="text-[10px] text-text-muted text-center sm:text-left mt-2">No credit card required</p>
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h3 className="text-2xl font-bold font-display text-text-dark mb-8">Frequently asked questions</h3>
              <div className="divide-y divide-border-light border-y border-border-light">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="py-4">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between text-left font-bold text-sm text-text-dark py-2 group hover:text-primary transition-colors focus:outline-none"
                    >
                      <span>{faq.q}</span>
                      {openFaq === idx ? (
                        <ChevronUp className="w-5 h-5 text-primary" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
                      )}
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-350 ease-in-out ${
                        openFaq === idx ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="text-xs text-text-secondary leading-relaxed pr-6 pb-2">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
