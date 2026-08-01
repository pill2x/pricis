"use client";

import { useState, useEffect } from "react";
import { 
  Zap, Tag, Gift, Lock, ChevronDown, ChevronUp, 
  Sparkles, CheckCircle2 
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
    document.body.style.backgroundColor = "#080D1A";
    document.documentElement.style.backgroundColor = "#080D1A";

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
      a: "Pricis is scheduled to launch in mid-September 2026. Waitlist members get early VIP access 48 hours before the public launch."
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
    <div className="min-h-screen bg-[#080D1A] text-white font-body selection:bg-blue-600 selection:text-white">
      {/* Navigation Bar */}
      <WaitlistNavbar />

      {/* Main Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[450px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/10 to-indigo-600/20 rounded-full blur-[130px] pointer-events-none z-0"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm shadow-inner">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs sm:text-sm text-emerald-400 font-semibold font-body tracking-wide">
              Coming Soon
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight font-display leading-[1.12]">
            The AI Workspace for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Smarter Business Growth
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed font-body font-normal">
            Pricis brings your projects, proposals, clients, invoices and negotiations together — with AI that works for you.
          </p>

          {/* Waitlist Form Component */}
          <div className="mb-10">
            <WaitlistForm onSuccess={handleWaitlistSuccess} />
          </div>

          {/* Live Waitlist Subscriber Pill */}
          <div className="inline-flex items-center justify-center gap-3 bg-slate-900/90 border border-slate-800 rounded-full px-5 py-2.5 text-xs sm:text-sm text-slate-300 font-body shadow-lg">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-slate-900 bg-slate-700 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 22}`} alt="User Avatar" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span>
              Join <strong className="text-white font-bold">{waitlistCount.toLocaleString()}</strong> forward-thinking teams on the wait-list
            </span>
          </div>
        </div>
      </section>

      {/* DEDICATED COUNTDOWN TIMER SECTION */}
      <section id="countdown" className="py-12 border-y border-white/10 bg-[#0D1526]/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-4">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-bold font-body flex items-center justify-center gap-1.5">
              <Sparkles size={14} className="text-cyan-400" /> Launch Schedule
            </span>
          </div>
          <CountdownTimer targetDate="2026-09-15T12:00:00Z" />
        </div>
      </section>

      {/* DASHBOARD PREVIEW MODAL SECTION */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display mb-4 tracking-tight">
            Designed for Speed, Precision, and Control
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base font-body">
            Get a preview of your future workspace inside Pricis.
          </p>
        </div>
        <WaitlistDashboardPreview />
      </section>

      {/* WHY JOIN THE WAIT-LIST SECTION */}
      <section id="why-join" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display mb-4 tracking-tight">
            Why join the wait-list?
          </h2>
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mb-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Early Access */}
          <div className="bg-[#0D1526] border border-blue-500/20 rounded-3xl p-6 sm:p-8 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg group">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold text-white font-display mb-2">Early Access</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-body">
              Get early access to Pricis before the official launch.
            </p>
          </div>

          {/* Card 2: Exclusive Offers */}
          <div className="bg-[#0D1526] border border-blue-500/20 rounded-3xl p-6 sm:p-8 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg group">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
              <Tag size={28} />
            </div>
            <h3 className="text-xl font-bold text-white font-display mb-2">Exclusive Offers</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-body">
              Enjoy special launch pricing and exclusive bonuses.
            </p>
          </div>

          {/* Card 3: Shape the Product */}
          <div className="bg-[#0D1526] border border-blue-500/20 rounded-3xl p-6 sm:p-8 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg group">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Gift size={28} />
            </div>
            <h3 className="text-xl font-bold text-white font-display mb-2">Shape the Product</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-body">
              Your feedback helps us build what you truly need.
            </p>
          </div>

          {/* Card 4: Stay Ahead */}
          <div className="bg-[#0D1526] border border-blue-500/20 rounded-3xl p-6 sm:p-8 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Lock size={28} />
            </div>
            <h3 className="text-xl font-bold text-white font-display mb-2">Stay Ahead</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-body">
              Be the first to experience the future of AI-powered work.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 px-4 max-w-4xl mx-auto border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm font-body">
            Everything you need to know about the Pricis wait-list.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="bg-[#0D1526] border border-white/10 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-semibold text-white text-base font-display">{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp size={20} className="text-blue-400 flex-shrink-0" />
                ) : (
                  <ChevronDown size={20} className="text-slate-400 flex-shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-5 text-sm text-slate-300 font-body leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="py-16 px-4 max-w-5xl mx-auto my-12">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-slate-900/60 border border-blue-500/20 p-8 sm:p-12 overflow-hidden shadow-2xl text-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display mb-4">
            Don&apos;t miss out on the future of work
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base font-body mb-8">
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
