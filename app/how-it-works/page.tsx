"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Play, 
  Search, 
  Check, 
  HelpCircle,
  TrendingUp, 
  MessageSquare, 
  FileText, 
  Link as LinkIcon, 
  Receipt,
  Users,
  Target,
  ArrowRight,
  Eye,
  CheckCircle2
} from "lucide-react";
import Logo from "@/components/Logo";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#080D1A] text-white font-body selection:bg-primary selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-[#080D1A] text-white text-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent rounded-full blur-[120px] opacity-80 pointer-events-none"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 mb-8 backdrop-blur-md">
            <span className="text-xs font-bold tracking-wider text-blue-400 uppercase">How It Works</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-8 leading-tight">
            From &quot;what do I charge?&quot;<br />
            to <span className="text-primary">&quot;payment received.&quot;</span>
          </h1>
          <p className="text-lg md:text-xl text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
            Pricis makes pricing, proposing, negotiating, and invoicing simple — so you can get paid what you're worth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-full font-semibold transition-all shadow-blue">
              Get Started Free
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/15 text-white rounded-full font-semibold transition-all flex items-center justify-center gap-2">
              See Pricing <Play className="w-4 h-4 text-white/80" fill="currentColor" />
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline Steps Section */}
      <section className="py-24 bg-white text-text-dark relative overflow-hidden border-b border-[#E5EAF2]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative space-y-32">
            
            {/* Timeline Line */}
            <div className="absolute left-[24px] top-6 bottom-6 w-0.5 border-l border-dashed border-slate-200 z-0"></div>

            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-start gap-8 md:gap-16 z-10 group animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold font-display text-lg shadow-blue flex-shrink-0 z-10 transition-transform duration-300 group-hover:scale-110">
                1
              </div>
              <div className="flex-1 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mb-6">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F172A] font-display mb-4">Tell us about your service</h3>
                  <p className="text-base text-text-secondary leading-relaxed font-body">
                    Choose your service type from 15+ categories. This helps us apply the right market data to calibrate accurate base rates.
                  </p>
                </div>
                {/* Mockup Card */}
                <div className="bg-white border border-[#E5EAF2] rounded-3xl shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4">Choose Your Service</h4>
                  <div className="relative mb-4">
                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-text-muted" />
                    <input 
                      type="text" 
                      placeholder="Search services..." 
                      className="w-full bg-slate-50 border border-[#E5EAF2] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#0F172A] focus:outline-none"
                      disabled
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                    <span className="bg-primary/10 border border-primary text-primary px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Branding & Identity
                    </span>
                    <span className="bg-white border border-[#E5EAF2] text-text-secondary px-3.5 py-2.5 rounded-xl">Web Design</span>
                    <span className="bg-white border border-[#E5EAF2] text-text-secondary px-3.5 py-2.5 rounded-xl">SEO & Marketing</span>
                    <span className="bg-white border border-[#E5EAF2] text-text-secondary px-3.5 py-2.5 rounded-xl">Content Writing</span>
                    <span className="bg-white border border-[#E5EAF2] text-text-secondary px-3.5 py-2.5 rounded-xl">Mobile App Design</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row items-start gap-8 md:gap-16 z-10 group animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold font-display text-lg shadow-blue flex-shrink-0 z-10 transition-transform duration-300 group-hover:scale-110">
                2
              </div>
              <div className="flex-1 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mb-6">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F172A] font-display mb-4">We read your client</h3>
                  <p className="text-base text-text-secondary leading-relaxed font-body">
                    Answer 4 quick questions about your client. We'll calibrate the pricing and negotiation buffer based on their business profile, relationship history, and style.
                  </p>
                </div>
                {/* Mockup Card */}
                <div className="bg-white border border-[#E5EAF2] rounded-3xl shadow-sm p-6 space-y-4 font-body text-xs text-[#0F172A] transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Client Read</h4>
                    <span className="bg-emerald-500/10 text-emerald-500 text-[9px] font-bold px-2 py-0.5 rounded-md">Calibrated</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                    <div className="bg-slate-55 border border-slate-100 p-3 rounded-2xl flex flex-col gap-1.5 hover:border-primary/30 transition-colors">
                      <span className="text-text-muted font-medium text-[8px] uppercase">Who is client?</span>
                      <span className="text-[#0F172A] flex items-center gap-1">👤 SME</span>
                    </div>
                    <div className="bg-slate-55 border border-slate-100 p-3 rounded-2xl flex flex-col gap-1.5 hover:border-primary/30 transition-colors">
                      <span className="text-text-muted font-medium text-[8px] uppercase">Budget perception?</span>
                      <span className="text-[#0F172A] flex items-center gap-1">💸 Growing</span>
                    </div>
                    <div className="bg-slate-55 border border-slate-100 p-3 rounded-2xl flex flex-col gap-1.5 hover:border-primary/30 transition-colors">
                      <span className="text-text-muted font-medium text-[8px] uppercase">Client relationship?</span>
                      <span className="text-[#0F172A] flex items-center gap-1">🤝 New client</span>
                    </div>
                    <div className="bg-slate-55 border border-slate-100 p-3 rounded-2xl flex flex-col gap-1.5 hover:border-primary/30 transition-colors">
                      <span className="text-text-muted font-medium text-[8px] uppercase">Urgency level?</span>
                      <span className="text-[#0F172A] flex items-center gap-1">⏱️ Normal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-start gap-8 md:gap-16 z-10 group animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold font-display text-lg shadow-blue flex-shrink-0 z-10 transition-transform duration-300 group-hover:scale-110">
                3
              </div>
              <div className="flex-1 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mb-6">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F172A] font-display mb-4">Add project details</h3>
                  <p className="text-base text-text-secondary leading-relaxed font-body">
                    Share key details about the project, deliverables, and timeline. The more details you provide, the more accurate the scope generation.
                  </p>
                </div>
                {/* Mockup Card */}
                <div className="bg-white border border-[#E5EAF2] rounded-3xl shadow-sm p-6 space-y-4 font-body text-xs text-[#0F172A] transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div>
                    <label className="font-bold text-text-secondary block mb-1">What are you working on?</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border border-[#E5EAF2] rounded-xl px-4 py-2.5 text-xs text-text-dark focus:outline-none"
                      defaultValue="Brand identity design for a fintech startup."
                      disabled
                    />
                  </div>
                  <div>
                    <label className="font-bold text-text-secondary block mb-1.5">Key deliverables</label>
                    <div className="flex flex-wrap gap-2 text-[9px] font-bold">
                      <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full flex items-center gap-1">Logo Design</span>
                      <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full flex items-center gap-1">Brand Guidelines</span>
                      <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full flex items-center gap-1">Social Media Kit</span>
                    </div>
                  </div>
                  <div>
                    <label className="font-bold text-text-secondary block mb-1">Timeline</label>
                    <div className="w-full bg-slate-50 border border-[#E5EAF2] rounded-xl px-4 py-2 text-xs text-text-dark font-semibold">
                      4 Weeks
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col md:flex-row items-start gap-8 md:gap-16 z-10 group animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold font-display text-lg shadow-blue flex-shrink-0 z-10 transition-transform duration-300 group-hover:scale-110">
                4
              </div>
              <div className="flex-1 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mb-6">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F172A] font-display mb-4">Get your scope & price</h3>
                  <p className="text-base text-text-secondary leading-relaxed font-body">
                    Receive a professional scope with a recommended price, breakdown, timeline, and policies.
                  </p>
                </div>
                {/* Mockup Card */}
                <div className="bg-white border border-[#E5EAF2] rounded-3xl shadow-sm p-6 font-body text-xs text-[#0F172A] relative overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-[9px] text-text-muted font-bold uppercase tracking-wider">Recommended Price</p>
                      <p className="font-black text-2xl text-text-dark mt-0.5">₦650,000</p>
                      <p className="text-[9px] text-emerald-500 font-semibold mt-0.5">Valid for 14 days</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-text-muted font-bold uppercase tracking-wider">Price Breakdown</p>
                      <p className="text-[10px] font-semibold text-text-secondary mt-1">Market Rate: ₦520,000</p>
                      <p className="text-[10px] font-semibold text-emerald-500">Scope Adjustment: +₦130,000</p>
                    </div>
                  </div>
                  
                  {/* Line Chart */}
                  <div className="h-28 w-full mt-4 relative">
                    <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M 0 35 Q 20 20 40 28 T 80 10 T 100 5 L 100 40 L 0 40 Z" 
                        fill="url(#chart-grad)"
                      />
                      <path 
                        d="M 0 35 Q 20 20 40 28 T 80 10 T 100 5" 
                        fill="none" 
                        stroke="#2563EB" 
                        strokeWidth="1.5"
                      />
                      {/* dots */}
                      <circle cx="0" cy="35" r="1.5" fill="#2563EB" />
                      <circle cx="20" cy="22" r="1.5" fill="#2563EB" />
                      <circle cx="40" cy="28" r="1.5" fill="#2563EB" />
                      <circle cx="80" cy="10" r="1.5" fill="#2563EB" />
                      <circle cx="100" cy="5" r="1.5" fill="#2563EB" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative flex flex-col md:flex-row items-start gap-8 md:gap-16 z-10 group animate-fade-in-up" style={{ animationDelay: "500ms" }}>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold font-display text-lg shadow-blue flex-shrink-0 z-10 transition-transform duration-300 group-hover:scale-110">
                5
              </div>
              <div className="flex-1 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mb-6">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F172A] font-display mb-4">Propose, negotiate & get paid</h3>
                  <p className="text-base text-text-secondary leading-relaxed font-body">
                    Use Kova to handle objections, share your proposal, track views, and convert to invoice when approved.
                  </p>
                </div>
                {/* Mockup Card */}
                <div className="bg-white border border-[#E5EAF2] rounded-3xl shadow-sm p-6 font-body text-xs text-[#0F172A] transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4">What's next?</h4>
                  <div className="flex items-center justify-between gap-2 mt-2">
                    <div className="flex flex-col items-center text-center flex-1">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2"><LinkIcon className="w-4.5 h-4.5" /></div>
                      <p className="font-bold text-[9px]">Share Proposal</p>
                      <p className="text-[7px] text-text-secondary mt-0.5">Send link/PDF</p>
                    </div>
                    <div className="text-slate-300 text-sm">→</div>
                    <div className="flex flex-col items-center text-center flex-1">
                      <div className="w-9 h-9 rounded-xl bg-success/10 text-success flex items-center justify-center mb-2"><Eye className="w-4.5 h-4.5" /></div>
                      <p className="font-bold text-[9px]">Track Views</p>
                      <p className="text-[7px] text-text-secondary mt-0.5">Get notified</p>
                    </div>
                    <div className="text-slate-300 text-sm">→</div>
                    <div className="flex flex-col items-center text-center flex-1">
                      <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-2"><MessageSquare className="w-4.5 h-4.5" /></div>
                      <p className="font-bold text-[9px]">Negotiate</p>
                      <p className="text-[7px] text-text-secondary mt-0.5">Use Kova AI</p>
                    </div>
                    <div className="text-slate-300 text-sm">→</div>
                    <div className="flex flex-col items-center text-center flex-1">
                      <div className="w-9 h-9 rounded-xl bg-success/10 text-success flex items-center justify-center mb-2"><Receipt className="w-4.5 h-4.5" /></div>
                      <p className="font-bold text-[9px]">Create Invoice</p>
                      <p className="text-[7px] text-text-secondary mt-0.5">1-click bill</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Grid: Everything you need */}
      <section className="py-24 bg-[#F7F9FC] text-text-dark border-b border-[#E5EAF2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight mb-4 text-[#0F172A]">Everything you need, in one flow.</h2>
            <p className="text-lg text-text-secondary">Focus on your craft. Let Pricis handle pricing and negotiations.</p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { icon: Target, title: "AI-Powered Pricing", desc: "Market-calibrated for African freelancers." },
              { icon: MessageSquare, title: "Negotiation Assistant", desc: "Kova helps you respond with absolute confidence." },
              { icon: FileText, title: "Professional Proposals", desc: "Beautiful scopes that build trust and show value." },
              { icon: LinkIcon, title: "Client Tracking", desc: "Know exactly when clients view your proposal." },
              { icon: Receipt, title: "Invoicing", desc: "From scope to payment — without the back-and-forth." },
            ].map((f, i) => (
              <div key={i} className="bg-white border border-[#E5EAF2] p-6 rounded-2xl flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-[#0F172A] mb-2 font-display">{f.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white text-text-dark border-b border-[#E5EAF2]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight mb-4 text-[#0F172A]">Loved by freelancers across Africa</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Pricis helped me go from undercharging to charging confidently. My proposal close rate increased by 40%.",
                name: "Tayo A.",
                role: "Product Designer, Lagos",
                img: "/images/tayo_a.png"
              },
              {
                quote: "Kova is a game changer. I don't panic anymore when clients push back on price. I know how to respond.",
                name: "Mary I.",
                role: "Copywriter, Abuja",
                img: "/images/mary_i.png"
              },
              {
                quote: "The pricing feels realistic for our market. And the proposals look so professional. My clients always comment on them.",
                name: "Emeka P.",
                role: "Web Developer, Enugu",
                img: "/images/emeka_p.png"
              }
            ].map((t, i) => (
              <div key={i} className="bg-[#F7F9FC] border border-[#E5EAF2] p-8 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <p className="text-sm font-semibold leading-relaxed mb-6 italic text-[#0F172A]">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white object-cover animate-fade-in" />
                  <div>
                    <h5 className="font-bold text-xs text-[#0F172A] font-display">{t.name}</h5>
                    <p className="text-[10px] text-text-secondary font-medium mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners section */}
      <section className="py-12 border-b border-[#E5EAF2] bg-[#F7F9FC]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          <div className="font-bold text-lg tracking-tighter text-slate-700 font-display">● Techpoint</div>
          <div className="font-black text-lg tracking-widest text-slate-800 font-display">TECHCABAL</div>
          <div className="font-bold text-base text-slate-700 font-display">VENTURES PLATFORM</div>
          <div className="font-serif font-bold text-lg text-slate-800"><span className="bg-slate-800 text-white px-1">BUSINESS</span>DAY</div>
          <div className="font-bold text-xl tracking-tighter text-slate-800 font-display" style={{ fontStyle: 'italic' }}>YNaija</div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[10px] leading-tight text-slate-700 uppercase tracking-wider font-display">African<br/>Freelancers</span>
          </div>
          <div className="flex items-center gap-2 border-l border-[#E5EAF2] pl-6">
            <span className="text-xs font-bold text-success font-display">+2,500</span>
            <span className="text-[9px] text-text-secondary font-bold font-display uppercase tracking-wider">Freelancers trust Pricis</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-[#080D1A] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-primary/10 via-primary/5 to-transparent rounded-full blur-[100px] opacity-80 pointer-events-none"></div>
        </div>
        <div className="max-w-3xl mx-auto relative z-10 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-6 leading-tight">
            Ready to price with <span className="text-primary">confidence?</span>
          </h2>
          <p className="text-lg text-text-muted mb-10 max-w-xl mx-auto leading-relaxed">
            Join thousands of freelancers who now charge what they're worth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/signup" className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-hover text-white rounded-full font-semibold transition-all shadow-blue">
              Get Started Free
            </Link>
            <Link href="/pricing" className="w-full sm:w-auto px-8 py-3.5 bg-white/5 border border-white/15 hover:bg-white/10 text-white rounded-full font-semibold transition-all flex items-center justify-center gap-2">
              See Pricing
            </Link>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-text-muted font-semibold">
            <span className="flex items-center gap-1.5"><Check className="text-success w-4 h-4" /> No credit card required</span>
            <span className="flex items-center gap-1.5"><Check className="text-success w-4 h-4" /> Free forever plan</span>
            <span className="flex items-center gap-1.5"><Check className="text-success w-4 h-4" /> Upgrade anytime</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
