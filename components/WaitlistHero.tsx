"use client";

import { useState } from "react";
import { 
  CheckCircle2, Mail, ArrowRight, Sparkles, MessageSquare, 
  FileText, Receipt, FolderKanban, BarChart3, Lock, Send, Mic, Loader2, Check
} from "lucide-react";
import Logo from "@/components/Logo";
import { joinWaitlist } from "@/app/actions/db";


interface WaitlistHeroProps {
  onSuccess?: (email: string, totalCount?: number) => void;
}

export default function WaitlistHero({ onSuccess }: WaitlistHeroProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Freelancer");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
    alreadySubscribed?: boolean;
    count?: number;
  }>({
    type: "idle",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus({ type: "error", message: "Please enter a valid work email address." });
      return;
    }

    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await joinWaitlist(email, role);
      if (res.success) {
        setStatus({
          type: "success",
          message: res.message || "Welcome to the Pricis wait-list!",
          alreadySubscribed: res.alreadySubscribed,
          count: res.count,
        });
        if (onSuccess) onSuccess(email, res.count);
      } else {
        setStatus({ type: "error", message: "Something went wrong. Please try again." });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "success", message: "You're on the wait-list! We'll notify you soon." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative pt-8 pb-20 px-4 sm:px-8 overflow-hidden bg-[#F8FAFC]">
      {/* Background Subtle Gradient & Glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[550px] bg-blue-400/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: Hero Copy & Waitlist Input */}
        <div className="lg:col-span-6 text-left space-y-6">
          
          {/* Green "Coming Soon" Capsule Badge */}
          <div className="inline-flex items-center gap-2 bg-[#EBFBF5] border border-[#12B38F]/30 rounded-full px-3.5 py-1 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#12B38F] animate-pulse"></span>
            <span className="text-xs sm:text-sm text-[#12B38F] font-bold font-body tracking-wide">
              Coming Soon
            </span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight font-display leading-[1.12] text-[#0F172A]">
            The AI Workspace for <br />
            <span className="text-[#2563EB]">
              Smarter Business Growth
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg leading-relaxed font-body text-[#64748B] max-w-xl">
            Pricis unifies your projects, proposals, clients, invoices and negotiations — with AI that understands your business and works alongside you.
          </p>

          {/* 3 Green Checkmark Bullet Points */}
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold text-slate-700 font-body py-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#12B38F]" />
              <span>Work faster</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#12B38F]" />
              <span>Close more deals</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-[#12B38F]" />
              <span>Get paid sooner</span>
            </div>
          </div>

          {/* Waitlist Form Component */}
          <div id="hero-waitlist-form" className="pt-2 max-w-lg">
            {status.type === "success" ? (
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-blue-100 text-slate-900 text-left animate-fade-in-up">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">✓</div>
                  <h3 className="text-lg font-bold font-display">{status.alreadySubscribed ? "Already Subscribed!" : "Spot Secured! 🎉"}</h3>
                </div>
                <p className="text-sm text-slate-600 font-body mb-3">{status.message}</p>
                <button
                  onClick={() => setStatus({ type: "idle", message: "" })}
                  className="text-xs font-semibold text-blue-600 hover:underline font-body"
                >
                  Submit another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-full transition-all focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10">
                  <div className="flex items-center gap-3 px-4 flex-1">
                    <Mail size={20} className="text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your work email"
                      className="w-full bg-transparent font-body text-sm sm:text-base focus:outline-none text-slate-900 placeholder-slate-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-7 py-3 rounded-full transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-600/30 disabled:opacity-75 flex-shrink-0 font-body text-sm sm:text-base"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Joining...</span>
                      </>
                    ) : (
                      <>
                        <span>Join Waitlist</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>

                {status.type === "error" && (
                  <p className="text-red-500 text-xs font-semibold font-body text-left pl-4">
                    {status.message}
                  </p>
                )}

                {/* Lock icon note matching provided mockup image */}
                <div className="flex items-center gap-2 text-xs text-slate-500 font-body pl-3 pt-1">
                  <Lock size={13} className="text-slate-400" />
                  <span>No spam. Early access. Exclusive launch benefits.</span>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Mouth-Watering Visual Orbit Stack */}
        <div className="lg:col-span-6 relative flex justify-center items-center py-6">
          
          {/* Ambient Blue Glowing Halo behind Showcase */}
          <div className="absolute inset-0 m-auto w-[420px] h-[420px] border border-blue-400/20 rounded-full bg-blue-500/5 blur-xl pointer-events-none"></div>
          <div className="absolute inset-0 m-auto w-[520px] h-[520px] border border-blue-400/10 rounded-full pointer-events-none"></div>

          <div className="relative w-full max-w-[620px] flex items-center justify-end">
            
            {/* Left Orbiting Pill Badges Stack */}
            <div className="hidden sm:flex flex-col gap-3 absolute -left-10 z-30 font-body text-xs">
              
              {/* Badge 1: Smart Proposals */}
              <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-lg flex items-center gap-3 w-48 hover:scale-105 transition-transform cursor-pointer">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">
                  <FileText size={16} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-900 leading-tight">Smart Proposals</div>
                  <div className="text-[10px] text-slate-500">Win more deals</div>
                </div>
              </div>

              {/* Badge 2: AI Negotiations */}
              <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-lg flex items-center gap-3 w-48 hover:scale-105 transition-transform cursor-pointer">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold flex-shrink-0">
                  <Sparkles size={16} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-900 leading-tight">AI Negotiations</div>
                  <div className="text-[10px] text-slate-500">Close with confidence</div>
                </div>
              </div>

              {/* Badge 3: Automated Invoicing */}
              <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-lg flex items-center gap-3 w-48 hover:scale-105 transition-transform cursor-pointer">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold flex-shrink-0">
                  <Receipt size={16} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-900 leading-tight">Automated Invoicing</div>
                  <div className="text-[10px] text-slate-500">Get paid on time</div>
                </div>
              </div>

              {/* Badge 4: Unified Projects */}
              <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-lg flex items-center gap-3 w-48 hover:scale-105 transition-transform cursor-pointer">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold flex-shrink-0">
                  <FolderKanban size={16} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-900 leading-tight">Unified Projects</div>
                  <div className="text-[10px] text-slate-500">Deliver with clarity</div>
                </div>
              </div>

              {/* Badge 5: Actionable Analytics */}
              <div className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 shadow-lg flex items-center gap-3 w-48 hover:scale-105 transition-transform cursor-pointer">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold flex-shrink-0">
                  <BarChart3 size={16} />
                </div>
                <div className="text-left">
                  <div className="font-bold text-slate-900 leading-tight">Actionable Analytics</div>
                  <div className="text-[10px] text-slate-500">Make data-driven decisions</div>
                </div>
              </div>

            </div>

            {/* Main Center Dashboard Preview Modal */}
            <div className="w-full max-w-[460px] bg-white rounded-3xl border border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] p-4 text-xs font-body z-20 relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <Logo variant="dark" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">Good morning, Alex! 👋</span>
                </div>
              </div>

              {/* Revenue & Pipeline metrics summary */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-medium">Total Earnings</span>
                  <span className="text-sm font-extrabold text-slate-900 font-display">₦2,450,000</span>
                  <span className="text-[9px] font-bold text-emerald-600 block mt-0.5">↑ 28% vs last month</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 block font-medium">Outstanding</span>
                  <span className="text-sm font-extrabold text-amber-600 font-display">₦1,250,000</span>
                  <span className="text-[9px] font-bold text-rose-500 block mt-0.5">₦350,000 overdue</span>
                </div>
              </div>

              {/* Pipeline sequence */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-3">
                <div className="text-[10px] font-bold text-slate-500 mb-1.5">Proposal Pipeline</div>
                <div className="grid grid-cols-5 gap-1 text-center font-bold text-[10px]">
                  <div className="bg-white p-1 rounded">24 <span className="block text-[8px] font-normal text-slate-400">Scopes</span></div>
                  <div className="bg-blue-50 text-blue-700 p-1 rounded">16 <span className="block text-[8px] font-normal text-blue-500">Sent</span></div>
                  <div className="bg-indigo-50 text-indigo-700 p-1 rounded">9 <span className="block text-[8px] font-normal text-indigo-500">Opened</span></div>
                  <div className="bg-purple-50 text-purple-700 p-1 rounded">5 <span className="block text-[8px] font-normal text-purple-500">Signed</span></div>
                  <div className="bg-emerald-50 text-emerald-700 p-1 rounded">4 <span className="block text-[8px] font-normal text-emerald-500">Paid</span></div>
                </div>
              </div>

              {/* Active Projects donut indicator */}
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block text-xs">Active Projects</span>
                  <span className="text-[10px] text-slate-500">8 In-Progress · 12 Completed</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs">
                  29
                </div>
              </div>
            </div>

            {/* Bottom Right Floating Overlay: Negotiation AI Chat Box */}
            <div className="absolute -right-4 -bottom-10 w-[270px] bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-2xl p-3.5 z-30 font-body text-[11px]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <div className="w-5 h-5 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Sparkles size={12} />
                  </div>
                  <span>Negotiation AI</span>
                </div>
                <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full text-[9px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live
                </div>
              </div>

              <div className="space-y-2 mb-2">
                {/* User Prompt */}
                <div className="bg-slate-100 text-slate-700 p-2 rounded-xl text-[10px] text-right ml-4">
                  Help me negotiate a better payment term for this client...
                </div>

                {/* AI Response */}
                <div className="bg-blue-50/80 border border-blue-100 text-slate-800 p-2 rounded-xl text-[10px]">
                  <p className="font-semibold text-blue-700 mb-1">Got it. Here&apos;s a stronger counter offer strategy:</p>
                  <ul className="space-y-1 text-[9.5px]">
                    <li className="flex items-center gap-1 text-slate-700"><Check size={10} className="text-emerald-600" /> Position value around faster delivery</li>
                    <li className="flex items-center gap-1 text-slate-700"><Check size={10} className="text-emerald-600" /> Offer 40% upfront, 40% on milestone</li>
                    <li className="flex items-center gap-1 text-slate-700"><Check size={10} className="text-emerald-600" /> Add 5% early payment incentive</li>
                  </ul>
                </div>
              </div>

              {/* Chat Input Bar */}
              <div className="flex items-center justify-between p-1.5 bg-slate-50 border border-slate-200 rounded-xl text-[10px] text-slate-400">
                <span>Ask anything about your deal...</span>
                <div className="flex items-center gap-1">
                  <Mic size={12} className="text-slate-400" />
                  <div className="w-4 h-4 bg-blue-600 text-white rounded-md flex items-center justify-center">
                    <Send size={8} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
