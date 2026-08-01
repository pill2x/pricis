"use client";

import { useState, useEffect } from "react";
import { 
  Zap, Tag, Gift, Lock, ChevronDown, ChevronUp, 
  Sparkles, CheckCircle2, ArrowRight
} from "lucide-react";
import WaitlistNavbar from "@/components/WaitlistNavbar";
import CountdownTimer from "@/components/CountdownTimer";
import WaitlistForm from "@/components/WaitlistForm";
import WaitlistDashboardPreview from "@/components/WaitlistDashboardPreview";
import Footer from "@/components/Footer";
import { fetchWaitlistCount } from "@/app/actions/db";

export default function WaitlistPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [waitlistCount, setWaitlistCount] = useState<number>(1482);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    // Sync background color with theme
    if (theme === "light") {
      document.body.style.backgroundColor = "#FFFFFF";
      document.documentElement.style.backgroundColor = "#FFFFFF";
    } else {
      document.body.style.backgroundColor = "#080D1A";
      document.documentElement.style.backgroundColor = "#080D1A";
    }

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
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const handleWaitlistSuccess = (email: string, totalCount?: number) => {
    if (totalCount) setWaitlistCount(totalCount);
  };

  const isLight = theme === "light";

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
    <div className={`min-h-screen transition-colors duration-200 font-body ${
      isLight ? "bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900" : "bg-[#080D1A] text-white selection:bg-blue-600 selection:text-white"
    }`}>
      {/* Navbar */}
      <WaitlistNavbar theme={theme} onToggleTheme={toggleTheme} />

      {/* HERO SECTION (Pixel-perfect match to provided mockup) */}
      <section className={`relative pt-12 pb-20 px-4 sm:px-6 overflow-hidden transition-colors ${
        isLight ? "bg-[#F8FAFC]" : "bg-[#080D1A]"
      }`}>
        {/* Background Subtle Dot Patterns (matching provided mockup image) */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute left-6 top-20 w-32 h-40 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="absolute right-6 top-20 w-32 h-40 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          
          {/* Badge: Coming Soon (Mint Green Pill) */}
          <div className="inline-flex items-center gap-2 bg-[#EBFBF5] border border-[#12B38F]/30 rounded-full px-4 py-1.5 mb-8 shadow-sm">
            <span className="text-xs sm:text-sm text-[#12B38F] font-bold font-body tracking-wide">
              Coming Soon
            </span>
          </div>

          {/* Main Headline */}
          <h1 className={`text-4xl sm:text-6xl md:text-6xl font-extrabold mb-6 tracking-tight font-display leading-[1.12] ${
            isLight ? "text-[#0F172A]" : "text-white"
          }`}>
            The AI Workspace for <br className="hidden sm:inline" />
            <span className="text-[#2563EB]">
              Smarter Business Growth
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-base sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-body font-normal ${
            isLight ? "text-[#64748B]" : "text-slate-300"
          }`}>
            Pricis brings your projects, proposals, clients, invoices and negotiations together — with AI that works for you.
          </p>

          {/* Waitlist Form Card */}
          <div className="mb-10">
            <WaitlistForm onSuccess={handleWaitlistSuccess} theme={theme} />
          </div>

          {/* Live Waitlist Counter Pill */}
          <div className={`inline-flex items-center justify-center gap-3 border rounded-full px-5 py-2.5 text-xs sm:text-sm font-body shadow-sm ${
            isLight ? "bg-white border-slate-200 text-slate-700" : "bg-slate-900 border-slate-800 text-slate-300"
          }`}>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 30}`} alt="User Avatar" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <span>
              Join <strong className={isLight ? "text-slate-900 font-bold" : "text-white font-bold"}>{waitlistCount.toLocaleString()}</strong> forward-thinking professionals on the wait-list
            </span>
          </div>
        </div>
      </section>

      {/* DEDICATED LAUNCH COUNTDOWN TIMER SECTION */}
      <section id="countdown" className={`py-12 border-y transition-colors ${
        isLight ? "bg-white border-slate-200/80" : "bg-[#0D1526]/60 border-white/10"
      }`}>
        <div className="max-w-4xl mx-auto px-4">
          <CountdownTimer targetDate="2026-09-15T12:00:00Z" theme={theme} />
        </div>
      </section>

      {/* DASHBOARD PREVIEW MODAL SECTION */}
      <section className={`py-16 px-4 max-w-6xl mx-auto transition-colors ${
        isLight ? "bg-white" : "bg-[#080D1A]"
      }`}>
        <div className="text-center mb-8">
          <h2 className={`text-2xl sm:text-4xl font-extrabold font-display mb-3 ${
            isLight ? "text-slate-900" : "text-white"
          }`}>
            Designed for Speed, Precision, and Control
          </h2>
          <p className={`max-w-xl mx-auto text-sm sm:text-base font-body ${
            isLight ? "text-slate-500" : "text-slate-400"
          }`}>
            Here is a sneak peek of your future workspace inside Pricis.
          </p>
        </div>
        <WaitlistDashboardPreview theme={theme} />
      </section>

      {/* WHY JOIN THE WAIT-LIST SECTION */}
      <section id="why-join" className={`py-20 px-4 max-w-6xl mx-auto transition-colors ${
        isLight ? "bg-[#F8FAFC]" : "bg-[#0D1526]/30"
      }`}>
        <div className="text-center mb-14">
          <h2 className={`text-3xl sm:text-4xl font-extrabold font-display mb-3 tracking-tight ${
            isLight ? "text-slate-900" : "text-white"
          }`}>
            Why join the wait-list?
          </h2>
          <div className="w-12 h-1 bg-[#2563EB] rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Early Access */}
          <div className={`border rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 shadow-sm group ${
            isLight ? "bg-white border-slate-200/80 hover:shadow-md" : "bg-[#0D1526] border-blue-500/20 hover:border-blue-500/50"
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-6 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
              <Zap size={28} />
            </div>
            <h3 className={`text-xl font-bold font-display mb-2 ${isLight ? "text-slate-900" : "text-white"}`}>Early Access</h3>
            <p className={`text-sm leading-relaxed font-body ${isLight ? "text-slate-500" : "text-slate-400"}`}>
              Get early access to Pricis before the official launch.
            </p>
          </div>

          {/* Card 2: Exclusive Offers */}
          <div className={`border rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 shadow-sm group ${
            isLight ? "bg-white border-slate-200/80 hover:shadow-md" : "bg-[#0D1526] border-blue-500/20 hover:border-blue-500/50"
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
              <Tag size={28} />
            </div>
            <h3 className={`text-xl font-bold font-display mb-2 ${isLight ? "text-slate-900" : "text-white"}`}>Exclusive Offers</h3>
            <p className={`text-sm leading-relaxed font-body ${isLight ? "text-slate-500" : "text-slate-400"}`}>
              Enjoy special launch pricing and exclusive bonuses.
            </p>
          </div>

          {/* Card 3: Shape the Product */}
          <div className={`border rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 shadow-sm group ${
            isLight ? "bg-white border-slate-200/80 hover:shadow-md" : "bg-[#0D1526] border-blue-500/20 hover:border-blue-500/50"
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Gift size={28} />
            </div>
            <h3 className={`text-xl font-bold font-display mb-2 ${isLight ? "text-slate-900" : "text-white"}`}>Shape the Product</h3>
            <p className={`text-sm leading-relaxed font-body ${isLight ? "text-slate-500" : "text-slate-400"}`}>
              Your feedback helps us build what you truly need.
            </p>
          </div>

          {/* Card 4: Stay Ahead */}
          <div className={`border rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 shadow-sm group ${
            isLight ? "bg-white border-slate-200/80 hover:shadow-md" : "bg-[#0D1526] border-blue-500/20 hover:border-blue-500/50"
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Lock size={28} />
            </div>
            <h3 className={`text-xl font-bold font-display mb-2 ${isLight ? "text-slate-900" : "text-white"}`}>Stay Ahead</h3>
            <p className={`text-sm leading-relaxed font-body ${isLight ? "text-slate-500" : "text-slate-400"}`}>
              Be the first to experience the future of AI-powered work.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className={`py-20 px-4 max-w-4xl mx-auto transition-colors ${
        isLight ? "bg-white" : "bg-[#080D1A]"
      }`}>
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-extrabold font-display mb-3 ${
            isLight ? "text-slate-900" : "text-white"
          }`}>
            Frequently Asked Questions
          </h2>
          <p className={`text-sm font-body ${isLight ? "text-slate-500" : "text-slate-400"}`}>
            Everything you need to know about the Pricis wait-list.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border rounded-2xl overflow-hidden transition-colors ${
                isLight ? "bg-white border-slate-200" : "bg-[#0D1526] border-white/10"
              }`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className={`font-semibold text-base font-display ${
                  isLight ? "text-slate-900" : "text-white"
                }`}>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp size={20} className="text-[#2563EB] flex-shrink-0" />
                ) : (
                  <ChevronDown size={20} className={isLight ? "text-slate-400 flex-shrink-0" : "text-slate-500 flex-shrink-0"} />
                )}
              </button>
              {openFaq === idx && (
                <div className={`px-6 pb-5 text-sm font-body leading-relaxed border-t pt-3 ${
                  isLight ? "border-slate-100 text-slate-600" : "border-white/5 text-slate-300"
                }`}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="py-16 px-4 max-w-5xl mx-auto my-12">
        <div className={`relative rounded-3xl border p-8 sm:p-12 text-center transition-colors shadow-lg ${
          isLight ? "bg-[#F8FAFC] border-slate-200/90" : "bg-gradient-to-r from-blue-900/40 via-blue-800/30 to-slate-900/60 border-blue-500/20"
        }`}>
          <h2 className={`text-2xl sm:text-4xl font-extrabold font-display mb-4 ${
            isLight ? "text-slate-900" : "text-white"
          }`}>
            Don&apos;t miss out on the future of work
          </h2>
          <p className={`max-w-xl mx-auto text-sm sm:text-base font-body mb-8 ${
            isLight ? "text-slate-600" : "text-slate-300"
          }`}>
            Join the wait-list today and be part of something amazing.
          </p>

          <WaitlistForm onSuccess={handleWaitlistSuccess} compact={true} theme={theme} />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
