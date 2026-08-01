"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Zap, Tag, Gift, Lock, CheckCircle2, ChevronDown, ChevronUp, 
  Sparkles, ArrowRight, ShieldCheck, Star, Users, MessageSquare 
} from "lucide-react";
import WaitlistNavbar from "@/components/WaitlistNavbar";
import CountdownTimer from "@/components/CountdownTimer";
import WaitlistForm from "@/components/WaitlistForm";
import WaitlistDashboardPreview from "@/components/WaitlistDashboardPreview";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { fetchWaitlistCount } from "@/app/actions/db";

export default function WaitlistPage() {
  const [waitlistCount, setWaitlistCount] = useState<number>(1482);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    // Set background styling
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
      q: "What makes Pricis different from general AI writing tools?",
      a: "Pricis is specifically engineered for freelancers, agencies, and service providers. It generates realistic pricing calibrated for real market conditions, professional scope documents, and negotiation strategy to protect your profit margins."
    },
    {
      q: "How will I know when my early access is ready?",
      a: "We will send an invitation directly to your work email address as soon as early access opens, along with your private login link."
    }
  ];

  return (
    <div className="min-h-screen bg-[#080D1A] text-white font-body selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <WaitlistNavbar />

      {/* Main Hero Section */}
      <section className="relative pt-8 pb-16 px-4 sm:px-6 overflow-hidden">
        {/* Background Gradients & Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/10 to-indigo-600/20 rounded-full blur-[140px] pointer-events-none z-0"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          
          {/* Badge: Coming Soon */}
          <div className="inline-flex items-center gap-2.5 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm shadow-inner">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs sm:text-sm text-emerald-400 font-semibold font-body tracking-wide">
              Coming Soon
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight font-display leading-[1.15] max-w-4xl mx-auto">
            The AI Workspace for <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-sm">
              Smarter Business Growth
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed font-body font-normal">
            Pricis brings your projects, proposals, clients, invoices and negotiations together — with AI that works for you.
          </p>

          {/* Waitlist Join Card Container */}
          <div className="mb-12">
            <WaitlistForm onSuccess={handleWaitlistSuccess} />
          </div>

          {/* Live Waitlist Subscriber counter */}
          <div className="inline-flex items-center justify-center gap-3 bg-slate-900/80 border border-slate-800 rounded-full px-5 py-2 text-xs sm:text-sm text-slate-300 font-body shadow-lg">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-slate-900 bg-slate-700 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="User Avatar" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span>
              Join <strong className="text-white font-bold">{waitlistCount.toLocaleString()}</strong> forward-thinking teams on the waitlist
            </span>
          </div>
        </div>
      </section>

      {/* Countdown Timer Section */}
      <section className="py-4">
        <CountdownTimer targetDate="2026-09-15T12:00:00Z" />
      </section>

      {/* Social Proof / Trusted By Logos */}
      <section className="py-12 border-y border-white/10 bg-[#0D1526]/80">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-8 font-body">
            Trusted by forward-thinking teams
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300 text-slate-300 font-display font-bold text-lg sm:text-xl">
            <div className="flex items-center gap-2"><Sparkles size={18} className="text-blue-400" /> Acme Corp</div>
            <div className="flex items-center gap-2"><Star size={18} className="text-cyan-400" /> TechNova</div>
            <div className="flex items-center gap-2"><Zap size={18} className="text-amber-400" /> KudaTech</div>
            <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-400" /> Greenlife NG</div>
            <div className="flex items-center gap-2"><Users size={18} className="text-purple-400" /> StoreHub</div>
          </div>
        </div>
      </section>

      {/* Interactive App Mockup Preview */}
      <section className="py-16 px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display mb-3">
            Designed for Speed, Precision, and Control
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base font-body">
            Here is an early sneak peek of your future workspace inside Pricis.
          </p>
        </div>
        <WaitlistDashboardPreview />
      </section>

      {/* Why Join the Wait-list Section */}
      <section id="why-join" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display mb-4 tracking-tight">
            Why join the wait-list?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg font-body">
            Be part of the exclusive cohort shaping the future of AI workspace tools.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Early Access */}
          <div className="bg-[#0D1526] border border-blue-500/20 rounded-3xl p-6 sm:p-8 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg group">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold text-white font-display mb-2">Early Access</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-body">
              Get early access to Pricis before the official public launch.
            </p>
          </div>

          {/* Card 2: Exclusive Offers */}
          <div className="bg-[#0D1526] border border-blue-500/20 rounded-3xl p-6 sm:p-8 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg group">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
              <Tag size={28} />
            </div>
            <h3 className="text-xl font-bold text-white font-display mb-2">Exclusive Offers</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-body">
              Enjoy special launch pricing and exclusive lifetime bonuses.
            </p>
          </div>

          {/* Card 3: Shape the Product */}
          <div className="bg-[#0D1526] border border-blue-500/20 rounded-3xl p-6 sm:p-8 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg group">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Gift size={28} />
            </div>
            <h3 className="text-xl font-bold text-white font-display mb-2">Shape the Product</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-body">
              Your feedback directly influences feature priorities before release.
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

      {/* Features Showcase Section */}
      <section id="features" className="py-20 px-4 bg-[#0D1526]/50 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-blue-400 font-bold font-body">
              Built For Modern Teams & Professionals
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display mt-2">
              Everything you need in one place
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#080D1A] border border-white/10 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4 font-bold">01</div>
              <h3 className="text-lg font-bold text-white font-display mb-2">AI Scope & Quote Generator</h3>
              <p className="text-xs text-slate-400 font-body leading-relaxed">
                Generate accurate client proposals with scope boundaries, milestone breakdowns, and market pricing in seconds.
              </p>
            </div>

            <div className="bg-[#080D1A] border border-white/10 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-cyan-600/20 text-cyan-400 flex items-center justify-center mb-4 font-bold">02</div>
              <h3 className="text-lg font-bold text-white font-display mb-2">Negotiation AI Assistant</h3>
              <p className="text-xs text-slate-400 font-body leading-relaxed">
                Real-time negotiation playbooks to handle price objections, counter offers, and close deals with confidence.
              </p>
            </div>

            <div className="bg-[#080D1A] border border-white/10 p-6 rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-4 font-bold">03</div>
              <h3 className="text-lg font-bold text-white font-display mb-2">Invoice & Client Management</h3>
              <p className="text-xs text-slate-400 font-body leading-relaxed">
                Track proposal opens, send branded invoices, and keep your client pipeline organized without extra effort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 max-w-4xl mx-auto">
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

      {/* Bottom CTA Banner */}
      <section className="py-16 px-4 max-w-5xl mx-auto my-12">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-900/60 via-blue-700/40 to-cyan-900/60 border border-blue-500/30 p-8 sm:p-12 overflow-hidden shadow-2xl text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>

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
