"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Play, LayoutGrid, UserCheck, FileText, Target, Share2, MessageSquare,
  ChevronDown, ChevronUp
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const walkthroughSteps = [
  {
    icon: LayoutGrid,
    title: "Choose your service type",
    detail: "Select from 15+ categories including UI/UX Design, Web Development, Copywriting, Video Editing, Social Media Management, Photography, and more. Can't find yours? Use the closest match and customize.",
  },
  {
    icon: UserCheck,
    title: "Tell us about your client",
    detail: "Answer 4 quick questions: Is this a new or returning client? What's their business size? What's the project urgency? What's their communication style? This helps Pricis calibrate the right tone and pricing buffer.",
  },
  {
    icon: FileText,
    title: "Add your project details",
    detail: "Describe the project: scope of work, key deliverables, number of revisions, and any known complexity. The more context you give, the more accurate your scope will be.",
  },
  {
    icon: Target,
    title: "Get your scope",
    detail: "Pricis generates a full scope document with: recommended price range (conservative, standard, premium), project timeline, deliverables list, revision policy, and out-of-scope items. Edit anything before sending.",
  },
  {
    icon: Share2,
    title: "Send to your client",
    detail: "Export as a PDF or generate a share link. Your client gets a clean, professional page — no Pricis branding on their end (Pro). You get notified the moment they open it.",
  },
  {
    icon: MessageSquare,
    title: "Negotiate with Kova if needed",
    detail: "If the client pushes back, open Kova — Pricis's negotiation AI. Paste their message or describe the situation. Kova will help you respond, counter, or practice — in whatever language you need.",
  },
];

const faqs = [
  {
    q: "How long does it take to generate a scope?",
    a: "Most users complete their first scope in under 3 minutes. Once you're familiar with the flow, it takes about 60 seconds."
  },
  {
    q: "Can I edit the scope after it's generated?",
    a: "Yes — everything Pricis generates is fully editable. Use it as a starting point, then customize to match your exact project."
  },
  {
    q: "What if my service type isn't listed?",
    a: "Choose the closest category and describe your service in the project details. Pricis will calibrate accordingly. We're constantly expanding our service library."
  },
  {
    q: "How does Kova know what kind of help I need?",
    a: "Kova reads the context of your message. If you paste a client's pushback, Kova drafts a response. If you describe a situation, Kova gives strategy. No mode selection needed — just talk to it."
  },
  {
    q: "Does Pricis work for non-Nigerian freelancers?",
    a: "Yes. While Pricis is calibrated for Nigerian and African markets, it works for any freelancer. Currency and market context can be specified during scope generation."
  },
  {
    q: "Is my client data private?",
    a: "Yes. Client information you enter into Pricis is private to your account and never shared or used to train models without your consent."
  }
];

export default function HowItWorksPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="py-24 px-6 bg-bg-dark text-center">
        <div className="max-w-3xl mx-auto">
          <div className="font-body text-xs font-semibold tracking-[0.1em] uppercase text-primary mb-4">
            HOW IT WORKS
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-display leading-tight">
            From &quot;what do I charge?&quot; to <span className="text-primary">&quot;scope sent&quot;</span> in minutes.
          </h1>
          <p className="text-lg text-text-muted mb-10 leading-relaxed font-body max-w-2xl mx-auto">
            A walkthrough of how Pricis works — from your first scope to a paid project.
          </p>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-6 bg-surface text-text-dark">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark font-display mb-4">
              See Pricis in action.
            </h2>
            <p className="text-text-secondary font-body text-lg max-w-2xl mx-auto">
              Watch how a Lagos-based designer generates a scope, handles client pushback, and sends a professional invoice — in under 4 minutes.
            </p>
          </div>
          
          <div className="w-full rounded-3xl overflow-hidden bg-bg-dark-2 border border-border-light shadow-lg aspect-video flex items-center justify-center">
            {/* Placeholder for video iframe */}
            <div className="flex flex-col items-center gap-4 text-center p-12">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-blue cursor-pointer hover:scale-105 transition-transform">
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              </div>
              <p className="text-white font-display font-semibold text-lg">Tutorial video coming soon</p>
              <p className="text-text-muted font-body text-sm">In the meantime, try the live product below.</p>
              <Link href="/signup" className="bg-primary hover:bg-primary-hover shadow-blue text-white font-semibold px-6 py-2.5 rounded-full transition-all font-body mt-2">
                Try It Now — Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Walkthrough */}
      <section className="py-24 px-6 bg-surface-secondary text-text-dark relative">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-12 relative">
            {/* Desktop timeline line */}
            <div className="hidden md:block absolute left-6 top-10 bottom-10 w-px border-l-2 border-dashed border-border-light"></div>
            
            {walkthroughSteps.map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 md:gap-12 relative">
                {/* Step number marker (desktop) */}
                <div className="hidden md:flex w-12 h-12 rounded-full bg-primary flex-shrink-0 items-center justify-center text-white font-display font-bold shadow-sm z-10">
                  {i + 1}
                </div>
                
                {/* Content Card */}
                <div className="bg-surface border border-border-light rounded-2xl p-6 md:p-8 shadow-sm flex-1 relative">
                  {/* Step number marker (mobile) */}
                  <div className="md:hidden absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-display font-bold shadow-sm z-10 border-4 border-surface-secondary">
                    {i + 1}
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                      <step.icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-text-dark font-display leading-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-text-secondary text-base leading-relaxed font-body">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-surface text-text-dark">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark font-display">
              Common questions.
            </h2>
          </div>
          
          <div className="divide-y divide-border-light border-y border-border-light">
            {faqs.map((faq, i) => (
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
