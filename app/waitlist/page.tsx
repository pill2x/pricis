"use client";

import { useState, useEffect } from "react";
import { 
  Zap, Tag, Gift, Lock, ChevronDown, ChevronUp, 
  Sparkles, MessageSquare, Target, Star
} from "lucide-react";
import WaitlistNavbar from "@/components/WaitlistNavbar";
import CountdownTimer from "@/components/CountdownTimer";
import WaitlistForm from "@/components/WaitlistForm";
import WaitlistDashboardPreview from "@/components/WaitlistDashboardPreview";
import Footer from "@/components/Footer";
import { fetchWaitlistCount } from "@/app/actions/db";

export default function WaitlistPage() {
  const [waitlistCount, setWaitlistCount] = useState<number>(1482);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.body.style.backgroundColor = "#FFFFFF";
    document.documentElement.style.backgroundColor = "#FFFFFF";

    const loadCount = async () => {
      try {
        const res = await fetchWaitlistCount();
        if (res?.count) {
          setWaitlistCount(res.count);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadCount();

    return () => {
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  const handleWaitlistSuccess = (email: string, totalCount?: number) => {
    if (totalCount) setWaitlistCount(totalCount);
  };

  const faqs = [
    {
      q: "When will Pricis officially launch?",
      a: "Pricis is scheduled to launch in mid-September 2026. Waitlist members get early VIP access 48 hours before the public release."
    },
    {
      q: "Is joining the wait-list completely free?",
      a: "Yes! Joining the wait-list is 100% free with no credit card required. You'll also unlock an exclusive 50% discount for your first year of Pricis Pro."
    },
    {
      q: "What makes Pricis different from general AI tools?",
      a: "Pricis is specifically engineered for freelancers, agencies, and service providers. It generates realistic pricing calibrated for real market conditions, professional scope documents, and negotiation strategy to protect your profit margins."
    },
    {
      q: "How will I know when my early access is ready?",
      a: "We will send an invitation directly to your work email address as soon as early access opens, along with your private login link."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-body selection:bg-blue-100 selection:text-blue-900 transition-colors duration-200">
      {/* Navbar */}
      <WaitlistNavbar />

      {/* HERO SECTION (Asymmetric Split Layout with Light Dot Pattern) */}
      <section className="relative pt-12 pb-20 px-4 sm:px-8 overflow-hidden bg-[#F8FAFC] bg-dot-pattern-light">
        {/* Subtle Ambient Light Glow */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[350px] rounded-full blur-[140px] pointer-events-none bg-blue-400/10"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column (Hero Headline, Copy & Waitlist Form) */}
          <div className="lg:col-span-7 text-left">
            {/* Mint Green Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#EBFBF5] border border-[#12B38F]/30 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#12B38F] animate-pulse"></span>
              <span className="text-xs sm:text-sm text-[#12B38F] font-bold font-body tracking-wide">
                Coming Soon
              </span>
            </div>

            {/* Main Headline (Updated per requested copy) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight font-display leading-[1.12] text-[#0F172A]">
              The Operating System <br className="hidden sm:inline" />
              <span className="text-[#2563EB]">
                For Client Businesses
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg mb-8 leading-relaxed font-body max-w-xl text-[#64748B]">
              Pricis brings your projects, proposals, clients, invoices and negotiations together — with AI that works for you.
            </p>

            {/* Waitlist Form Card */}
            <div className="mb-8">
              <WaitlistForm onSuccess={handleWaitlistSuccess} />
            </div>

            {/* Live Subscriber Pill */}
            <div className="inline-flex items-center gap-3 border rounded-full px-4 py-2 text-xs sm:text-sm font-body shadow-sm bg-white border-slate-200 text-slate-700">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 40}`} alt="User Avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <span>
                Join <strong className="text-slate-900 font-bold">{waitlistCount.toLocaleString()}</strong> professionals on the wait-list
              </span>
            </div>
          </div>

          {/* Right Column (Floating Interactive Cards over Light Dot Pattern) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Card 1: WhatsApp AI Negotiation Copilot Teaser */}
            <div className="p-6 rounded-3xl border shadow-xl transition-all hover:-translate-y-1 bg-white border-slate-200/90">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                    <MessageSquare size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-display text-slate-900">AI Negotiation Copilot</h4>
                    <span className="text-[11px] text-emerald-600 font-semibold font-body">Live Strategy Assistant</span>
                  </div>
                </div>
                <span className="bg-emerald-50 text-emerald-600 text-[10px] font-extrabold px-2 py-0.5 rounded-full font-body">ACTIVE</span>
              </div>

              <div className="p-3.5 rounded-2xl text-xs font-body mb-3 border bg-slate-50 border-slate-200 text-slate-700">
                <p className="font-semibold mb-1 text-blue-600">Client Pushback:</p>
                <p className="italic">&quot;Can we do 20% discount on this website scope?&quot;</p>
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-emerald-600 font-body pt-1">
                <span className="flex items-center gap-1.5"><Sparkles size={14} /> AI Counter-Strategy Ready</span>
                <span className="text-slate-400 font-normal">Generated in 1.4s</span>
              </div>
            </div>

            {/* Card 2: Scope & Pricing Intelligence Card */}
            <div className="p-6 rounded-3xl border shadow-xl transition-all hover:-translate-y-1 bg-white border-slate-200/90">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Target size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold font-display text-slate-900">Scope Generator</h4>
                    <span className="text-[11px] text-slate-500 font-body">Automated Proposal Engine</span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-blue-600 font-body">₦1,250,000</span>
              </div>

              <div className="space-y-2 text-xs font-body">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Market Rate Accuracy</span>
                  <span className="font-bold text-emerald-600">98.4% Calibrated</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-600">Client Proposal PDF</span>
                  <span className="font-semibold text-blue-600">Instant Export →</span>
                </div>
              </div>
            </div>

            {/* Card 3: VIP Launch Badge */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 rounded-3xl shadow-lg flex items-center justify-between font-body">
              <div className="flex items-center gap-3">
                <Star size={22} className="text-amber-300" />
                <div>
                  <h4 className="text-sm font-bold font-display">50% Off First Year Pro</h4>
                  <p className="text-xs text-blue-100">Exclusive perk for waitlist members</p>
                </div>
              </div>
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                VIP Perk
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* DEDICATED LAUNCH COUNTDOWN TIMER SECTION */}
      <section id="countdown" className="py-16 px-4 sm:px-8 border-y bg-white border-slate-200/80">
        <div className="max-w-5xl mx-auto">
          <CountdownTimer targetDate="2026-09-15T12:00:00Z" />
        </div>
      </section>

      {/* DASHBOARD PREVIEW MODAL SECTION */}
      <section className="py-20 px-4 max-w-6xl mx-auto bg-[#F8FAFC]">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display mb-3 text-slate-900">
            Designed for Speed, Precision, and Control
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base font-body text-slate-500">
            Here is a sneak peek of your future workspace inside Pricis.
          </p>
        </div>
        <WaitlistDashboardPreview />
      </section>

      {/* ASYMMETRIC WHY JOIN SECTION */}
      <section id="why-join" className="py-24 px-4 sm:px-8 max-w-7xl mx-auto bg-white">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column Title & Mission */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 text-left space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-blue-600 font-body">WHY JOIN NOW</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight leading-tight text-slate-900">
              Why join the wait-list?
            </h2>
            <p className="text-base font-body leading-relaxed text-slate-600">
              Be part of the exclusive launch cohort shaping the future of AI workspace tools for service providers.
            </p>
            <div className="pt-2">
              <div className="w-12 h-1 bg-[#2563EB] rounded-full"></div>
            </div>
          </div>

          {/* Right Column Grid (4 Feature Cards) */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6 text-left">
            {/* Card 1: Early Access */}
            <div className="border rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md bg-white border-slate-200/90 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-6 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold font-display mb-2 text-slate-900">Early Access</h3>
              <p className="text-sm leading-relaxed font-body text-slate-500">
                Get early access to Pricis before the official launch.
              </p>
            </div>

            {/* Card 2: Exclusive Offers */}
            <div className="border rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md bg-white border-slate-200/90 group">
              <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                <Tag size={28} />
              </div>
              <h3 className="text-xl font-bold font-display mb-2 text-slate-900">Exclusive Offers</h3>
              <p className="text-sm leading-relaxed font-body text-slate-500">
                Enjoy special launch pricing and exclusive bonuses.
              </p>
            </div>

            {/* Card 3: Shape the Product */}
            <div className="border rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md bg-white border-slate-200/90 group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Gift size={28} />
              </div>
              <h3 className="text-xl font-bold font-display mb-2 text-slate-900">Shape the Product</h3>
              <p className="text-sm leading-relaxed font-body text-slate-500">
                Your feedback helps us build what you truly need.
              </p>
            </div>

            {/* Card 4: Stay Ahead */}
            <div className="border rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md bg-white border-slate-200/90 group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Lock size={28} />
              </div>
              <h3 className="text-xl font-bold font-display mb-2 text-slate-900">Stay Ahead</h3>
              <p className="text-sm leading-relaxed font-body text-slate-500">
                Be the first to experience the future of AI-powered work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SPLIT FAQ SECTION */}
      <section id="faq" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t bg-[#F8FAFC] border-slate-200">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display mb-4 text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-sm font-body leading-relaxed mb-6 text-slate-500">
              Got questions about early access, features, or launch timelines? We&apos;ve got answers.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-4 text-left">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border rounded-2xl overflow-hidden transition-colors bg-white border-slate-200"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-semibold text-base font-display text-slate-900">{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp size={20} className="text-[#2563EB] flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-sm font-body leading-relaxed border-t pt-3 border-slate-100 text-slate-600">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="py-16 px-4 max-w-5xl mx-auto my-12">
        <div className="relative rounded-3xl border p-8 sm:p-12 text-center transition-colors shadow-lg bg-white border-slate-200/90 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)]">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display mb-4 text-slate-900">
            Don&apos;t miss out on the future of work
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base font-body mb-8 text-slate-600">
            Join the wait-list today and be part of something amazing.
          </p>

          <WaitlistForm onSuccess={handleWaitlistSuccess} compact={true} />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
