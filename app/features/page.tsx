"use client";

import Link from "next/link";
import {
  Target, MessageSquare, FileText, Link as LinkIcon, Bookmark, Receipt,
  CheckCircle, ArrowRight, Check, X
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  {
    title: "Generate professional scopes in under 2 minutes.",
    body: "Tell Pricis your service type, project details, and client context. Get a full scope document — with deliverables, timeline, and pricing — instantly. No guessing. No templates to fill out from scratch.",
    bullets: [
      "Calibrated for Nigerian and African market rates",
      "Covers 15+ service categories",
      "Fully editable before sending",
    ],
    icon: Target,
    label: "Scope Generator",
  },
  {
    title: "Meet Kova. Your AI negotiation co-pilot.",
    body: "When a client pushes back on your price, Kova helps you respond with confidence. Paste their message, describe the situation, or just ask — Kova reads the context and gives you exactly what you need: a strategy, a response draft, or a practice session.",
    bullets: [
      "Understands context — no mode selection needed",
      "Responds in your language",
      "Trained on real freelance negotiation scenarios",
    ],
    icon: MessageSquare,
    label: "Kova, the Negotiation Assistant",
    badge: "Powered by Kova™",
  },
  {
    title: "Send proposals that look like they came from an agency.",
    body: "Export any scope as a branded PDF in one click. Clean layouts, professional typography, and your pricing presented clearly. Clients take formatted proposals seriously.",
    bullets: [
      "Branded with Pricis design (Pro: add your own logo)",
      "Download instantly or share via link",
      "Client-ready in seconds",
    ],
    icon: FileText,
    label: "PDF Export",
  },
  {
    title: "Know the moment your client opens your proposal.",
    body: "Generate a unique link for each scope. Share it via WhatsApp, email, or anywhere. You'll get notified the moment they view it — so you know exactly when to follow up.",
    bullets: [
      "View tracking on every open",
      "No login required for clients",
      "Dedicated scope page with your branding (Pro)",
    ],
    icon: LinkIcon,
    label: "Client Share Links",
  },
  {
    title: "Start from a proven framework, not a blank page.",
    body: "Access a library of scope templates built for Nigerian freelancers across design, development, writing, marketing, and more. Save your own templates and reuse them for recurring project types.",
    bullets: [
      "20+ pre-built templates across industries",
      "Save and customize your own (Pro)",
      "Templates learn from your past scopes",
    ],
    icon: Bookmark,
    label: "Templates",
  },
  {
    title: "From scope to invoice in one flow.",
    body: "Once a scope is approved, generate a matching invoice in seconds. Pre-filled with your project details, pricing, and payment terms. Track payment status directly from your dashboard.",
    bullets: [
      "Auto-populated from your scope",
      "Add bank details, due dates, line items",
      "Track: Draft → Sent → Viewed → Paid",
    ],
    icon: Receipt,
    label: "Invoicing",
  },
];

const comparisonRows = [
  { feature: "African market pricing calibration", pricis: true, bonsai: false, honeybook: false, excel: false },
  { feature: "AI negotiation assistant", pricis: true, bonsai: false, honeybook: false, excel: false },
  { feature: "Naira (₦) native support", pricis: true, bonsai: false, honeybook: false, excel: true },
  { feature: "Scope + invoice in one flow", pricis: true, bonsai: true, honeybook: true, excel: false },
  { feature: "Client view tracking", pricis: true, bonsai: true, honeybook: true, excel: false },
  { feature: "Free tier available", pricis: true, bonsai: false, honeybook: false, excel: true },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="py-24 px-6 bg-bg-dark text-center">
        <div className="max-w-3xl mx-auto">
          <div className="font-body text-xs font-semibold tracking-[0.1em] uppercase text-primary mb-4">
            EVERYTHING YOU NEED
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-display leading-tight">
            The complete toolkit for freelancers who charge what they&apos;re <span className="text-primary">worth.</span>
          </h1>
          <p className="text-lg text-text-muted mb-10 leading-relaxed font-body max-w-2xl mx-auto">
            Pricis gives you AI-powered pricing, professional proposals, and negotiation support — built specifically for African markets.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto bg-primary hover:bg-primary-hover shadow-blue text-white font-semibold px-8 py-3.5 rounded-full transition-all font-body text-center">
              Get Started Free
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto bg-white/5 border border-white/15 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-full transition-all font-body text-center">
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Deep-Dives */}
      <div className="bg-surface text-text-dark">
        {features.map((feature, i) => (
          <section key={i} className={`py-20 px-6 ${i % 2 === 1 ? "bg-surface-secondary" : "bg-surface"}`}>
            <div className={`max-w-6xl mx-auto flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-16`}>
              {/* Text */}
              <div className="flex-1">
                <div className="w-14 h-14 rounded-2xl bg-primary-light flex items-center justify-center mb-6">
                  <feature.icon size={28} className="text-primary" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-primary font-body mb-2 block">
                  {String(i + 1).padStart(2, "0")} — {feature.label}
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-text-dark mb-4 font-display leading-tight">
                  {feature.title}
                </h2>
                <p className="text-text-secondary text-base leading-relaxed font-body mb-6">
                  {feature.body}
                </p>
                {feature.badge && (
                  <span className="inline-block bg-primary-light text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4 font-body">
                    {feature.badge}
                  </span>
                )}
                <ul className="space-y-3">
                  {feature.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-text-dark font-body">
                      <CheckCircle size={18} className="text-success flex-shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Screenshot placeholder */}
              <div className="flex-1 w-full">
                <div className="rounded-2xl bg-surface-secondary border border-border-light h-64 lg:h-80 flex items-center justify-center text-text-muted font-body text-sm">
                  {feature.label} Preview
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Comparison Table */}
        <section className="py-20 px-6 bg-surface">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark mb-4 font-display">
                How Pricis <span className="text-primary">compares.</span>
              </h2>
              <p className="text-text-secondary font-body text-lg">
                Built for African freelancers. Not retrofitted from a US tool.
              </p>
            </div>

            <div className="bg-surface border border-border-light rounded-2xl shadow-sm overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-border-light">
                    <th className="text-left py-4 px-6 font-semibold text-text-dark font-display text-sm">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-primary font-display text-sm">Pricis</th>
                    <th className="text-center py-4 px-4 font-semibold text-text-secondary font-display text-sm">Bonsai</th>
                    <th className="text-center py-4 px-4 font-semibold text-text-secondary font-display text-sm">HoneyBook</th>
                    <th className="text-center py-4 px-4 font-semibold text-text-secondary font-display text-sm">Excel / Manual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {comparisonRows.map((row, i) => (
                    <tr key={i}>
                      <td className="py-4 px-6 text-sm text-text-dark font-body font-medium">{row.feature}</td>
                      <td className="text-center py-4 px-4">
                        {row.pricis ? <Check size={18} className="text-green-500 mx-auto" /> : <X size={18} className="text-slate-300 mx-auto" />}
                      </td>
                      <td className="text-center py-4 px-4">
                        {row.bonsai ? <Check size={18} className="text-green-500 mx-auto" /> : <X size={18} className="text-slate-300 mx-auto" />}
                      </td>
                      <td className="text-center py-4 px-4">
                        {row.honeybook ? <Check size={18} className="text-green-500 mx-auto" /> : <X size={18} className="text-slate-300 mx-auto" />}
                      </td>
                      <td className="text-center py-4 px-4">
                        {row.excel ? <Check size={18} className="text-green-500 mx-auto" /> : <X size={18} className="text-slate-300 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted mt-4 text-center font-body">
              Competitor data based on publicly available information.
            </p>
          </div>
        </section>
      </div>

      {/* Dark CTA */}
      <section className="py-24 px-6 bg-bg-dark text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 font-display">
            Start free. Upgrade when you need <span className="text-primary">more.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto bg-primary hover:bg-primary-hover shadow-blue text-white font-semibold px-8 py-3.5 rounded-full transition-all font-body text-center">
              Get Started Free
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto bg-white/5 border border-white/15 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-full transition-all font-body text-center">
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
