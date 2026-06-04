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
    <div className="min-h-screen bg-bg-dark text-text-dark font-body selection:bg-primary selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-bg-dark text-white text-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent rounded-full blur-[120px] opacity-80 pointer-events-none"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
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
              See Pricing <Play className="w-4 h-4" fill="currentColor" />
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline Steps Section */}
      <section className="py-24 bg-surface relative overflow-hidden border-b border-border-light">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative space-y-32">
            
            {/* Timeline Line */}
            <div className="absolute left-[24px] top-6 bottom-6 w-0.5 border-l border-dashed border-slate-200 z-0"></div>

            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row items-start gap-8 md:gap-16 z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold font-display text-lg shadow-blue flex-shrink-0 z-10">
                1
              </div>
              <div className="flex-1 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-dark font-display mb-4">Tell us about your service</h3>
                  <p className="text-base text-text-secondary leading-relaxed">
                    Choose your service type from 15+ categories. Select the closest option to ensure we apply the correct market datasets and pricing variables.
                  </p>
                </div>
                {/* Mockup Card */}
                <div className="bg-white border border-border-light rounded-2xl shadow-md p-6">
                  <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4">Choose Your Service</h4>
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
                    <input 
                      type="text" 
                      placeholder="Search services..." 
                      className="w-full bg-surface-secondary border border-border-light rounded-xl pl-9 pr-4 py-2 text-xs text-text-dark focus:outline-none"
                      disabled
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                    <span className="bg-primary/10 border border-primary text-primary px-3 py-2 rounded-xl">Branding & Identity</span>
                    <span className="bg-slate-55 border border-border-light text-text-secondary px-3 py-2 rounded-xl">Web Design</span>
                    <span className="bg-slate-55 border border-border-light text-text-secondary px-3 py-2 rounded-xl">SEO & Marketing</span>
                    <span className="bg-slate-55 border border-border-light text-text-secondary px-3 py-2 rounded-xl">Content Writing</span>
                    <span className="bg-slate-55 border border-border-light text-text-secondary px-3 py-2 rounded-xl">Mobile App Design</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row items-start gap-8 md:gap-16 z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold font-display text-lg shadow-blue flex-shrink-0 z-10">
                2
              </div>
              <div className="flex-1 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-dark font-display mb-4">We read your client</h3>
                  <p className="text-base text-text-secondary leading-relaxed">
                    Answer 4 quick questions about your client. We'll calibrate the pricing and negotiation buffer based on their business profile, relationship history, and style.
                  </p>
                </div>
                {/* Mockup Card */}
                <div className="bg-white border border-border-light rounded-2xl shadow-md p-6 space-y-3 font-body text-xs">
                  <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Client Read</h4>
                  <p className="text-[10px] text-text-muted mb-3">Help us understand your client so we can tailor the best price and strategy.</p>
                  
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                    <span className="text-text-secondary font-semibold">👤 Who is client?</span>
                    <span className="bg-white border border-border-light px-2.5 py-1 rounded-md text-[10px] font-bold text-text-dark">SME</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                    <span className="text-text-secondary font-semibold">💸 Budget perception?</span>
                    <span className="bg-white border border-border-light px-2.5 py-1 rounded-md text-[10px] font-bold text-text-dark">Growing</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                    <span className="text-text-secondary font-semibold">🤝 Client relationship?</span>
                    <span className="bg-white border border-border-light px-2.5 py-1 rounded-md text-[10px] font-bold text-text-dark">New client</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                    <span className="text-text-secondary font-semibold">⏱️ Urgency level?</span>
                    <span className="bg-white border border-border-light px-2.5 py-1 rounded-md text-[10px] font-bold text-text-dark">Normal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row items-start gap-8 md:gap-16 z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold font-display text-lg shadow-blue flex-shrink-0 z-10">
                3
              </div>
              <div className="flex-1 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center mb-4">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-dark font-display mb-4">Add project details</h3>
                  <p className="text-base text-text-secondary leading-relaxed">
                    Define the project scope. Enter key deliverables, milestones, revisions policy, and choose your estimated timeline. The more information provided, the more accurate the calibration.
                  </p>
                </div>
                {/* Mockup Card */}
                <div className="bg-white border border-border-light rounded-2xl shadow-md p-6 space-y-4 font-body text-xs text-text-dark">
                  <div>
                    <label className="font-bold block mb-1">What are you working on?</label>
                    <input 
                      type="text" 
                      className="w-full bg-slate-50 border border-border-light rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                      defaultValue="Brand identity design for a fintech startup."
                      disabled
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1.5">Key deliverables</label>
                    <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                      <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full flex items-center gap-1">Logo Design <span className="text-[8px] opacity-75">—</span></span>
                      <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full flex items-center gap-1">Brand Guidelines <span className="text-[8px] opacity-75">—</span></span>
                      <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1.5 rounded-full flex items-center gap-1">Social Media Kit <span className="text-[8px] opacity-75">—</span></span>
                    </div>
                  </div>
                  <div>
                    <label className="font-bold block mb-1">Timeline</label>
                    <select className="w-full bg-slate-50 border border-border-light rounded-xl px-4 py-2 text-xs focus:outline-none" disabled>
                      <option>4 Weeks</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col md:flex-row items-start gap-8 md:gap-16 z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold font-display text-lg shadow-blue flex-shrink-0 z-10">
                4
              </div>
              <div className="flex-1 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center mb-4">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-dark font-display mb-4">Get your scope & price</h3>
                  <p className="text-base text-text-secondary leading-relaxed">
                    Receive your curated scope package pre-calibrated with optimal market rates, structured phases, out-of-scope policies, and an itemized breakdown.
                  </p>
                </div>
                {/* Mockup Card */}
                <div className="bg-white border border-border-light rounded-2xl shadow-md p-6 font-body text-xs">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-[10px] text-text-muted font-bold uppercase">Recommended Price</p>
                      <p className="font-black text-2xl text-text-dark mt-1">₦650,000</p>
                      <p className="text-[9px] text-text-muted mt-0.5">Valid for 30 days</p>
                    </div>
                    <span className="bg-slate-50 border border-border-light text-[9px] font-bold text-text-secondary py-1 px-2 rounded-md">Price Breakdown</span>
                  </div>
                  
                  {/* Graph */}
                  <div className="space-y-2 border-t border-border-light pt-4 text-[10px] font-semibold text-text-dark">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Market Rate</span>
                      <span>₦520,000</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-slate-450 h-full w-[80%] rounded-full"></div>
                    </div>
                    <div className="flex justify-between items-center text-success">
                      <span>Scope Adjustment</span>
                      <span>+₦130,000</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-success h-full w-[20%] rounded-full"></div>
                    </div>
                    <div className="flex justify-between items-center font-bold border-t border-border-light pt-2 text-primary">
                      <span>Your Price</span>
                      <span>₦650,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative flex flex-col md:flex-row items-start gap-8 md:gap-16 z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white font-bold font-display text-lg shadow-blue flex-shrink-0 z-10">
                5
              </div>
              <div className="flex-1 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center mb-4">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-dark font-display mb-4">Propose, negotiate & get paid</h3>
                  <p className="text-base text-text-secondary leading-relaxed">
                    Generate proposal links, track when clients open them, counter objections with Kova AI support, and convert approved scopes to invoice items instantly.
                  </p>
                </div>
                {/* Mockup Card */}
                <div className="bg-white border border-border-light rounded-2xl shadow-md p-6 font-body text-xs">
                  <h4 className="text-xs font-bold text-text-dark mb-4">What's next?</h4>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0"><LinkIcon className="w-4 h-4" /></div>
                      <div>
                        <p className="font-bold text-[10px] text-text-dark">Share Proposal</p>
                        <p className="text-[8px] text-text-secondary mt-0.5">Send via link or PDF</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                      <div className="w-7 h-7 rounded-lg bg-success/10 text-success flex items-center justify-center flex-shrink-0"><Eye className="w-4 h-4" /></div>
                      <div>
                        <p className="font-bold text-[10px] text-text-dark">Track Views</p>
                        <p className="text-[8px] text-text-secondary mt-0.5">Get notified when opened</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                      <div className="w-7 h-7 rounded-lg bg-primary-light text-primary flex items-center justify-center flex-shrink-0"><MessageSquare className="w-4 h-4" /></div>
                      <div>
                        <p className="font-bold text-[10px] text-text-dark">Negotiate</p>
                        <p className="text-[8px] text-text-secondary mt-0.5">Use Kova to respond confidently</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                      <div className="w-7 h-7 rounded-lg bg-success/10 text-success flex items-center justify-center flex-shrink-0"><Receipt className="w-4 h-4" /></div>
                      <div>
                        <p className="font-bold text-[10px] text-text-dark">Create Invoice</p>
                        <p className="text-[8px] text-text-secondary mt-0.5">Generate invoice in one click</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Grid: Everything you need */}
      <section className="py-24 bg-surface-secondary text-text-dark border-b border-border-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight mb-4">Everything you need, in one flow.</h2>
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
              <div key={i} className="bg-white border border-border-light p-6 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-shadow">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-text-dark mb-2 font-display">{f.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface text-text-dark border-b border-border-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight mb-4">Loved by freelancers across Africa</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Pricis helped me go from undercharging to charging confidently. My proposal close rate increased by 40%.",
                name: "Tayo A.",
                role: "Product Designer, Lagos",
                img: "https://i.pravatar.cc/100?img=11"
              },
              {
                quote: "Kova is a game changer. I don't panic anymore when clients push back on price. I know how to respond.",
                name: "Mary I.",
                role: "Copywriter, Abuja",
                img: "https://i.pravatar.cc/100?img=12"
              },
              {
                quote: "The pricing feels realistic for our market. And the proposals look so professional. My clients always comment on them.",
                name: "Emeka P.",
                role: "Web Developer, Enugu",
                img: "https://i.pravatar.cc/105?img=13"
              }
            ].map((t, i) => (
              <div key={i} className="bg-surface-secondary border border-border-light p-8 rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow">
                <p className="text-sm font-semibold leading-relaxed mb-6 italic text-text-dark">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white object-cover" />
                  <div>
                    <h5 className="font-bold text-xs text-text-dark font-display">{t.name}</h5>
                    <p className="text-[10px] text-text-secondary font-medium mt-0.5">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners section */}
      <section className="py-12 border-b border-border-light bg-surface-secondary">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-75 grayscale">
          <div className="font-bold text-lg tracking-tighter text-slate-705 font-display">● Techpoint</div>
          <div className="font-black text-lg tracking-widest text-slate-800 font-display">TECHCABAL</div>
          <div className="font-bold text-base text-slate-705 font-display">VENTURES PLATFORM</div>
          <div className="font-serif font-bold text-lg text-slate-800"><span className="bg-slate-800 text-white px-1">BUSINESS</span>DAY</div>
          <div className="font-bold text-xl tracking-tighter text-slate-800 font-display" style={{ fontStyle: 'italic' }}>YNaija</div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[10px] leading-tight text-slate-705 uppercase tracking-wider font-display">African<br/>Freelancers</span>
          </div>
          <div className="flex items-center gap-2 border-l border-border-light pl-6">
            <span className="text-xs font-bold text-success font-display">+2,500</span>
            <span className="text-[9px] text-text-secondary font-bold font-display uppercase tracking-wider">Freelancers trust Pricis</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-bg-dark text-white text-center">
        <div className="max-w-3xl mx-auto">
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
