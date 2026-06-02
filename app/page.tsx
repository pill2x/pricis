"use client";

import Link from "next/link";
import { 
  Target, FileText, Share2, Download, MessageSquare, Play, CheckCircle2,
  ChevronRight, LayoutDashboard, Settings, Receipt, Link as LinkIcon, 
  LayoutTemplate, PenTool, ChevronDown, Check,
  Twitter, Linkedin, Instagram, ArrowRight, Code, FileSignature, Users,
  Grid, UserCheck, FileText as FileTextIcon, Star, DownloadCloud, Bookmark, TrendingUp,
  ChevronUp, Mail, Send
} from "lucide-react";
import Logo from "@/components/Logo";
import { useState } from "react";

const Navbar = () => (
  <nav className="sticky top-0 z-50 w-full h-[64px] bg-bg-dark/95 backdrop-blur-sm border-b border-border">
    <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
      <Link href="/">
        <Logo variant="muted" />
      </Link>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted font-body">
        <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">Features <ChevronDown size={14}/></div>
        <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
        <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">Resources <ChevronDown size={14}/></div>
        <Link href="#templates" className="hover:text-white transition-colors">Templates</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login" className="text-sm font-medium text-text-white hover:text-gray-200 transition-colors bg-white/10 border border-white/15 rounded-full px-5 py-2 hover:bg-white/20">
          Log in
        </Link>
        <Link href="/signup" className="text-sm font-semibold bg-primary hover:bg-primary-hover shadow-blue text-white px-5 py-2 rounded-full transition-all">
          Get Started Free
        </Link>
      </div>
    </div>
  </nav>
);

const DashboardMockup = () => (
  <div className="relative mx-auto w-full max-w-[850px] text-left flex justify-center lg:justify-end lg:block">
    <div 
      className="relative w-full aspect-[1.57/1] max-w-[850px] flex-shrink-0"
      style={{ containerType: 'inline-size' }}
    >
      <div 
        className="absolute top-0 left-0 origin-top-left"
        style={{ 
          width: '850px', 
          height: '541px', 
          transform: 'scale(calc(100cqw / 850))' 
        }}
      >
        {/* Dashboard Modal */}
        <div className="w-full h-full shadow-2xl rounded-[2rem] border border-border-light bg-surface flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-[220px] bg-surface border-r border-border-light p-4 flex flex-col justify-between">
            <div>
              <div className="mb-10 px-2 mt-2">
                <Logo variant="dark" />
              </div>
              <nav className="space-y-1.5">
                <div className="flex items-center gap-3 bg-primary-light text-primary px-3 py-2.5 rounded-lg font-semibold text-sm font-body">
                  <Grid size={18} /> Dashboard
                </div>
                {[
                  { icon: FileTextIcon, label: "Scopes" },
                  { icon: MessageSquare, label: "Negotiations" },
                  { icon: Bookmark, label: "Templates" },
                  { icon: Receipt, label: "Invoices" },
                  { icon: Settings, label: "Settings" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-text-secondary px-3 py-2.5 rounded-lg font-medium text-sm font-body hover:text-text-dark hover:bg-surface-secondary cursor-pointer transition-colors">
                    <item.icon size={18} /> {item.label}
                  </div>
                ))}
              </nav>
            </div>
            
            {/* Upgrade Card */}
            <div className="bg-surface border border-border-light p-4 rounded-xl flex items-start gap-3 shadow-sm cursor-pointer hover:border-border transition-all">
              <div className="mt-0.5 w-6 h-6 flex items-center justify-center flex-shrink-0">
                 <span className="text-xl leading-none">👑</span>
              </div>
              <div>
                <div className="text-sm font-bold text-text-dark font-body">Upgrade to Pro</div>
                <div className="text-xs text-text-secondary mt-0.5 font-body">Unlock all features</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-[#F9FAFB] p-10 overflow-hidden relative">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-text-dark font-display mb-1.5">Welcome back, Daniel 👋</h1>
                <p className="text-text-secondary text-base font-body">Let&apos;s create a scope or continue where you left off.</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm font-body">
                  + New Scope
                </button>
              </div>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-2 gap-5 mb-10 pr-[200px]">
              <div className="bg-surface border border-border-light rounded-xl p-6 shadow-sm flex flex-col items-start">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-5">
                  <Target className="text-success" size={24} />
                </div>
                <h3 className="font-bold text-text-dark mb-1 font-body text-base">Scope Generator</h3>
                <p className="text-xs text-text-secondary mb-auto h-8 font-body leading-relaxed">Create accurate scopes, pricing and timelines.</p>
                <button className="bg-primary text-white w-full py-2.5 rounded-lg text-sm font-semibold transition-colors font-body hover:bg-primary-hover mt-8">Start New</button>
              </div>
              <div className="bg-surface border border-border-light rounded-xl p-6 shadow-sm flex flex-col items-start">
                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-5">
                  <TrendingUp className="text-primary" size={24} />
                </div>
                <h3 className="font-bold text-text-dark mb-1 font-body text-base">Negotiation Assistant</h3>
                <p className="text-xs text-text-secondary mb-auto h-8 font-body leading-relaxed">Get help with strategy, messages and practice.</p>
                <button className="bg-primary text-white w-full py-2.5 rounded-lg text-sm font-semibold transition-colors font-body hover:bg-primary-hover mt-8">Open Assistant</button>
              </div>
            </div>

            {/* Recent Scopes List */}
            <div className="pr-[200px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-text-dark font-display text-lg">Recent Scopes</h3>
                <span className="text-primary text-sm font-semibold hover:text-primary-hover cursor-pointer font-body">View all</span>
              </div>
              <div className="divide-y divide-border-light border-y border-border-light">
                {[
                  { title: "Brand Identity Design for Fintech Startup", price: "₦650,000", status: "Viewed", statusClass: "bg-success/10 text-success" },
                  { title: "Website Redesign for E-commerce Store", price: "₦1,250,000", status: "Draft", statusClass: "bg-gray-100 text-text-secondary" },
                  { title: "Social Media Management (3 Months)", price: "₦450,000", status: "Sent", statusClass: "bg-primary-light text-primary" },
                ].map((scope, i) => (
                  <div key={i} className="flex items-center justify-between py-3.5 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="text-sm font-bold text-text-dark truncate pr-4 font-body flex-1">{scope.title}</div>
                    <div className="flex items-center gap-6 flex-shrink-0">
                      <div className="text-sm font-semibold text-text-dark w-20 text-right font-body">{scope.price}</div>
                      <div className={`text-xs font-semibold px-2 py-1 rounded-full w-16 text-center font-body ${scope.statusClass}`}>{scope.status}</div>
                      <ChevronRight size={16} className="text-text-muted group-hover:text-primary" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Mockup (Overlapping) */}
        <div className="absolute -right-12 -bottom-16 w-[260px] h-[520px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border-[8px] border-[#1a1a1a] overflow-hidden flex flex-col z-20 ring-1 ring-gray-200/50">
          {/* Notch */}
          <div className="w-[120px] h-[24px] bg-[#1a1a1a] absolute top-0 left-1/2 -translate-x-1/2 rounded-b-[16px] z-30 flex justify-center items-end pb-1 gap-2">
            <div className="w-10 h-1.5 rounded-full bg-[#333]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#333]"></div>
          </div>
          
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[11px] font-medium text-gray-800 z-20 relative bg-white">
            <span>9:41</span>
            <div className="flex gap-1.5 items-center">
              <div className="w-3.5 h-2.5 border border-gray-800 rounded-[2px] relative">
                <div className="absolute right-[-2px] top-[2px] w-[1px] h-1 bg-gray-800"></div>
              </div>
            </div>
          </div>

          <div className="bg-white px-5 pb-5 pt-2 relative flex-1 flex flex-col">
            <div className="text-[11px] font-semibold text-gray-500 mb-1 font-body">Scope Summary</div>
            <div className="text-[13px] font-medium text-gray-900 mb-4 font-body">Total Price</div>
            <div className="text-3xl font-extrabold text-gray-900 mb-1 font-display tracking-tight">₦650,000</div>
            <div className="text-[11px] text-gray-500 mb-6 bg-gray-50 border border-gray-100 inline-block px-2.5 py-1 rounded-md font-body font-medium w-fit">Valid 30 days</div>
            
            <button className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl mb-3 shadow-md shadow-blue-600/20 font-body hover:bg-blue-700 transition-colors text-[13px]">View Scope</button>
            <button className="w-full bg-white border-2 border-gray-100 text-gray-800 font-semibold py-2.5 rounded-xl mb-6 hover:bg-gray-50 transition-colors font-body text-[13px]">Share Link</button>
            
            <div className="text-[11px] font-bold text-gray-900 mb-1 font-body">Next Step</div>
            <div className="text-[11px] text-gray-500 mb-3 font-body">Send to client or download your PDF.</div>
            
            <div className="space-y-2 mt-auto">
              <div className="flex items-center justify-between p-3.5 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 cursor-pointer transition-all group">
                <div className="flex items-center gap-3 text-[13px] font-medium text-gray-800 font-body group-hover:text-blue-600">
                  <DownloadCloud size={16} className="text-gray-400 group-hover:text-blue-600" /> Download PDF
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-600" />
              </div>
              <div className="flex items-center justify-between p-3.5 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 cursor-pointer transition-all group">
                <div className="flex items-center gap-3 text-[13px] font-medium text-gray-800 font-body group-hover:text-blue-600">
                  <LinkIcon size={16} className="text-gray-400 group-hover:text-blue-600" /> Copy Link
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Hero = () => (
  <section className="pt-20 lg:pt-28 pb-32 lg:pb-28 px-6 w-full bg-bg-dark relative z-10 min-h-[calc(100vh-64px)] flex items-center border-b border-border overflow-x-clip">
    <div className="max-w-[1400px] w-full mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
      {/* Left Column */}
      <div className="w-full lg:w-[45%] text-left z-20 flex-shrink-0 lg:pl-10 xl:pl-16">
        <div className="inline-flex items-center gap-2 bg-bg-dark-3 border border-border rounded-full px-4 py-1.5 mb-8">
          <div className="w-2 h-2 rounded-full bg-success"></div>
          <span className="text-sm text-text-muted font-medium font-body">Built for African freelancers & service providers</span>
        </div>
        
        <h1 className="text-[clamp(2.5rem,5vw,3.5rem)] leading-[1.15] font-extrabold text-white mb-6 tracking-tight font-display">
          Know what to charge.<br/>
          Negotiate with <span className="text-primary">confidence.</span>
        </h1>
        
        <p className="text-lg text-text-muted mb-10 leading-relaxed font-body max-w-xl">
          Generate accurate scopes, professional proposals, and strong responses when clients push back on price.
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-12 text-xs text-white font-medium font-body">
          <div className="flex items-center gap-3 bg-bg-dark-3/50 px-2.5 py-2 rounded-xl hover:bg-bg-dark-3 transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Target size={18} className="text-primary" />
            </div>
            <div className="leading-tight text-left">Scope<br/>Generator</div>
          </div>
          <div className="flex items-center gap-3 bg-bg-dark-3/50 px-2.5 py-2 rounded-xl hover:bg-bg-dark-3 transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
              <MessageSquare size={18} className="text-success" />
            </div>
            <div className="leading-tight text-left">Negotiation<br/>Assistant</div>
          </div>
          <div className="flex items-center gap-3 bg-bg-dark-3/50 px-2.5 py-2 rounded-xl hover:bg-bg-dark-3 transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
              <FileText size={18} className="text-text-muted" />
            </div>
            <div className="leading-tight text-left">PDF<br/>Export</div>
          </div>
          <div className="flex items-center gap-3 bg-bg-dark-3/50 px-2.5 py-2 rounded-xl hover:bg-bg-dark-3 transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
              <LinkIcon size={18} className="text-success" />
            </div>
            <div className="leading-tight text-left">Client<br/>Share Links</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <Link href="/signup" className="w-full sm:w-auto bg-primary hover:bg-primary-hover shadow-blue text-white font-semibold px-8 py-3.5 rounded-full transition-all font-body text-center">
            Get Started Free
          </Link>
          <Link href="#how-it-works" className="w-full sm:w-auto bg-white/5 border border-white/15 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-full transition-all flex items-center justify-center gap-2 font-body">
            See How it Works <Play size={18} fill="currentColor" className="opacity-70" />
          </Link>
        </div>
        
        <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-text-muted font-body">
          <CheckCircle2 size={16} className="text-success" />
          <span>No credit card required</span>
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:flex-1 w-full relative min-h-[440px] lg:min-h-[600px] mt-8 lg:mt-0 flex justify-center lg:block pr-4 lg:pr-0 pl-0 sm:pl-4 lg:pl-0">
        <div className="w-full max-w-[600px] sm:max-w-[700px] lg:max-w-none lg:absolute lg:left-8 xl:left-12 lg:top-1/2 lg:-translate-y-1/2">
          <DashboardMockup />
        </div>
      </div>
    </div>
  </section>
);

const SocialProof = () => (
  <section className="py-8 border-b border-border bg-bg-dark-2">
    <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
      <p className="text-sm text-text-muted mb-6 font-body text-center">
        Trusted by freelancers and service providers across Africa
      </p>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-10 h-10 rounded-full border-[3px] border-bg-dark-2 bg-slate-200 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-success font-body text-base leading-tight">+2,500</span>
            <span className="text-text-muted font-body text-sm leading-tight">Freelancers</span>
          </div>
        </div>
        
        <div className="hidden md:block w-px h-8 bg-border"></div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-text-muted font-medium font-body text-sm">
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><PenTool size={16} /> Designers</div>
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><Code size={16} /> Developers</div>
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><Target size={16} /> Marketers</div>
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><FileSignature size={16} /> Writers</div>
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"><Users size={16} /> Consultants</div>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto text-center bg-surface" id="how-it-works">
    <div className="font-body text-xs font-semibold tracking-[0.1em] uppercase text-primary mb-3">HOW IT WORKS</div>
    <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark mb-16 font-display">
      From uncertainty to a <span className="text-primary">confident quote</span> in minutes.
    </h2>

    <div className="flex flex-col lg:flex-row items-center justify-center gap-4 relative">
      {[
        { step: "1", title: "Choose Your Service", desc: "Select the service you offer from our library.", icon: Grid },
        { step: "2", title: "Client Read", desc: "Answer 4 quick questions about your client.", icon: UserCheck },
        { step: "3", title: "Add Project Details", desc: "Share key details about the project and deliverables.", icon: FileTextIcon },
        { step: "4", title: "Get Your Scope", desc: "Receive a professional scope, price, and timeline.", icon: Star }
      ].map((item, i) => (
        <div key={i} className="flex items-center">
          <div className="bg-surface p-6 text-left relative flex flex-col w-[260px]">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-blue mb-4 font-display">
              {item.step}
            </div>
            <div className="mb-4 text-primary bg-primary-light w-12 h-12 flex items-center justify-center rounded-xl">
               <item.icon size={24} />
            </div>
            <h3 className="font-semibold text-text-dark mb-2 text-lg font-display leading-tight">{item.title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed font-body">{item.desc}</p>
          </div>
          {i < 3 && <ChevronRight className="hidden lg:block text-border-light mx-2 flex-shrink-0" size={24} />}
        </div>
      ))}
    </div>
  </section>
);

const Features = () => (
  <section className="py-24 px-6 bg-surface-secondary border-t border-border-light" id="features">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
      <div className="sticky top-24">
        <div className="font-body text-xs font-semibold tracking-[0.1em] uppercase text-primary mb-3">POWERFUL FEATURES</div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark mb-6 leading-tight font-display">
          Everything you need to price, propose and <span className="text-success">protect</span> your value.
        </h2>
        <p className="text-text-secondary mb-8 leading-relaxed font-body text-lg">
          Pricis combines pricing intelligence with negotiation support so you can charge right and stand firm.
        </p>
        <Link href="#features" className="text-primary font-semibold flex items-center gap-2 hover:gap-3 transition-all w-fit font-body">
          Explore all features <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {[
          { icon: Target, title: "Accurate Pricing", desc: "AI-powered pricing calibrated for African markets and client context." },
          { icon: MessageSquare, title: "Negotiation Assistant", desc: "Four modes to help you respond, counter and close with confidence." },
          { icon: FileTextIcon, title: "Professional Proposals", desc: "Beautiful scopes that build trust and show the value of your work." },
          { icon: LinkIcon, title: "Client Share Links", desc: "Share scopes via link and know when your client views them." },
          { icon: Download, title: "PDF Export", desc: "Download branded PDFs and send them your way." },
          { icon: Bookmark, title: "Saved Templates", desc: "Save and reuse your best scopes to work faster and smarter." }
        ].map((feature, i) => (
          <div key={i} className="bg-surface border border-border-light rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
              <feature.icon size={24} />
            </div>
            <h3 className="font-semibold text-text-dark mb-2 font-display text-lg">{feature.title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed font-body">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 px-6 max-w-7xl mx-auto bg-surface">
    <div className="text-center mb-12">
      <div className="font-body text-xs font-semibold tracking-[0.1em] uppercase text-primary mb-3">LOVED BY FREELANCERS</div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark leading-tight font-display">
        They price better. They negotiate better. They <span className="text-primary">win more.</span>
      </h2>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        { quote: "Pricis helped me increase my proposal close rate by 40%. Clients take my prices more seriously now.", name: "Tayo A.", role: "Product Designer, Lagos", img: "11" },
        { quote: "The Negotiation Assistant is a game changer. I don't panic anymore when clients push back.", name: "Mary I.", role: "Copywriter, Abuja", img: "12" },
        { quote: "Finally, a tool that understands our market. The pricing is realistic and the scopes look so professional.", name: "Emeka P.", role: "Web Developer, Enugu", img: "13" }
      ].map((t, i) => (
        <div key={i} className="bg-surface border border-border-light rounded-lg shadow-sm p-6 flex flex-col justify-between">
          <div className="text-primary mb-4">
            <MessageSquare size={24} fill="currentColor" className="opacity-20" />
          </div>
          <p className="text-base text-text-dark mb-8 leading-relaxed font-body">&quot;{t.quote}&quot;</p>
          <div className="flex items-center gap-3 mt-auto">
            <img src={`https://i.pravatar.cc/100?img=${t.img}`} alt={t.name} className="w-10 h-10 rounded-full bg-gray-200" />
            <div>
              <div className="font-semibold text-text-dark text-sm font-display">{t.name}</div>
              <div className="text-sm text-text-secondary font-body">{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);


const Logos = () => (
  <section className="py-12 border-y border-border-light bg-surface-secondary">
    <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-center gap-10 md:gap-16">
      <div className="font-bold text-xl tracking-tighter text-slate-700 font-display flex items-center gap-1"><span className="text-slate-800">●</span>Techpoint<span className="font-normal text-sm ml-1 text-slate-500">africa</span></div>
      <div className="font-black text-xl tracking-widest text-slate-800 font-display">TECHCABAL</div>
      <div className="flex items-center gap-2 font-bold text-lg text-slate-700 font-display"><div className="w-6 h-6 rounded-full border-2 border-slate-700 flex items-center justify-center text-xs font-bold">✓</div> VENTURES PLATFORM</div>
      <div className="font-serif font-bold text-xl text-slate-800 bg-slate-200 px-3 py-1 rounded"><span className="bg-slate-800 text-white px-1">BUSINESS</span>DAY</div>
      <div className="font-bold text-2xl tracking-tighter text-slate-800 font-display" style={{fontStyle: 'italic'}}>YNaija</div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center"><Users size={16} className="text-success"/></div>
        <div className="text-[10px] font-bold leading-tight text-slate-700 uppercase tracking-wide font-display">African<br/>Freelancers<br/>Union</div>
      </div>
      <div className="flex items-center gap-3 border-l border-border-light pl-10">
        <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
          <Users size={20} className="text-success" />
        </div>
        <div className="text-sm font-semibold text-text-dark font-body leading-tight">
          <span className="text-success font-bold">+2,500</span> Freelancers and<br/>service providers trust Pricis
        </div>
      </div>
    </div>
  </section>
);

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  
  return (
    <section className="py-24 px-6 bg-surface-secondary" id="pricing">
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <div className="font-body text-xs font-semibold tracking-[0.1em] uppercase text-primary mb-3">SIMPLE, AFFORDABLE PRICING</div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark mb-8 font-display">
          Start free. <span className="text-primary">Upgrade</span> when you&apos;re ready to scale.
        </h2>

        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-semibold font-body ${!isYearly ? 'text-text-dark' : 'text-text-secondary'}`}>Monthly</span>
          <button 
            onClick={() => setIsYearly(!isYearly)}
            className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors ${isYearly ? 'bg-success' : 'bg-primary'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${isYearly ? 'translate-x-6' : ''}`}></div>
          </button>
          <span className={`text-sm font-semibold font-body flex items-center gap-2 ${isYearly ? 'text-text-dark' : 'text-text-secondary'}`}>
            Yearly 
            <span className="bg-success/10 text-success rounded-full px-2 py-0.5 text-xs font-semibold">Save 20%</span>
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 text-left max-w-6xl mx-auto">
        {/* Free */}
        <div className="bg-surface border border-border-light p-8 rounded-lg shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-text-dark mb-1 font-display">Free</h3>
          <p className="text-sm text-text-secondary mb-6 font-body">For getting started</p>
          <div className="mb-6">
            <span className="text-4xl font-extrabold text-text-dark font-display">₦0</span>
            <span className="text-sm text-text-secondary block mt-1 font-body">Always free</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1 font-body">
            <li className="flex items-start gap-3 text-sm text-text-dark"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Generate scopes</li>
            <li className="flex items-start gap-3 text-sm text-text-dark"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Access basic templates</li>
            <li className="flex items-start gap-3 text-sm text-text-dark"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Share scopes (limited)</li>
          </ul>
          <Link href="/signup" className="w-full py-2.5 rounded-full font-semibold border-[1.5px] border-border-light text-text-dark hover:bg-gray-50 transition-colors text-center block font-body">Get Started Free</Link>
        </div>

        {/* Pro */}
        <div className="bg-surface border-2 border-primary px-8 pb-8 rounded-lg shadow-lg flex flex-col relative transform lg:-translate-y-4">
          <div className="flex justify-center w-full transform -translate-y-1/2 mb-[-12px]">
            <span className="inline-block bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full font-body shadow-blue whitespace-nowrap">
              Most Popular
            </span>
          </div>
          <h3 className="text-xl font-bold text-text-dark mb-1 font-display mt-1">Pro</h3>
          <p className="text-sm text-text-secondary mb-6 font-body">For growing professionals</p>
          <div className="mb-6">
            <span className="text-4xl font-extrabold text-text-dark font-display">₦{isYearly ? '6,000' : '7,500'}</span>
            <span className="text-sm text-text-secondary font-medium font-body">/month</span>
            <span className="text-sm text-text-secondary block mt-1 font-body">Billed {isYearly ? 'yearly' : 'monthly'}</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1 font-body">
            <li className="flex items-start gap-3 text-sm text-text-dark"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> <strong>Everything in Free</strong></li>
            <li className="flex items-start gap-3 text-sm text-text-dark"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Negotiation Assistant (All modes)</li>
            <li className="flex items-start gap-3 text-sm text-text-dark"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> PDF export</li>
            <li className="flex items-start gap-3 text-sm text-text-dark"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Client share links with view tracking</li>
            <li className="flex items-start gap-3 text-sm text-text-dark"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Saved templates</li>
          </ul>
          <Link href="/signup" className="w-full py-2.5 rounded-full font-semibold bg-primary hover:bg-primary-hover text-white transition-colors shadow-blue text-center block font-body">Start Pro Trial</Link>
        </div>

        {/* Business */}
        <div className="bg-surface border border-border-light p-8 rounded-lg shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-text-dark mb-1 font-display">Business</h3>
          <p className="text-sm text-text-secondary mb-6 font-body">For teams and agencies</p>
          <div className="mb-6">
            <span className="text-4xl font-extrabold text-text-dark font-display">₦{isYearly ? '12,000' : '15,000'}</span>
            <span className="text-sm text-text-secondary font-medium font-body">/month</span>
            <span className="text-sm text-text-secondary block mt-1 font-body">Billed {isYearly ? 'yearly' : 'monthly'}</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1 font-body">
            <li className="flex items-start gap-3 text-sm text-text-dark"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> <strong>Everything in Pro</strong></li>
            <li className="flex items-start gap-3 text-sm text-text-dark"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Team collaboration</li>
            <li className="flex items-start gap-3 text-sm text-text-dark"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Priority support</li>
            <li className="flex items-start gap-3 text-sm text-text-dark"><Check size={18} className="text-primary flex-shrink-0 mt-0.5" /> Custom templates</li>
          </ul>
          <Link href="/contact" className="w-full py-2.5 rounded-full font-semibold border-[1.5px] border-border-light text-text-dark hover:bg-gray-50 transition-colors text-center block font-body">Contact Sales</Link>
        </div>
      </div>

      {/* 7-day free trial note */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <CheckCircle2 size={18} className="text-success" />
        <span className="text-sm font-medium text-text-secondary font-body">7-day free trial  ·  Cancel anytime</span>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs = [
    {
      q: "Is Pricis really free to start?",
      a: "Yes! Our Free plan lets you generate scopes, access basic templates, and share scopes with clients at no cost. No credit card required."
    },
    {
      q: "How does the Negotiation Assistant work?",
      a: "The Negotiation Assistant uses AI to help you respond to client pushback. It offers four modes: Draft Response, Counter Offer, Objection Handler, and Practice Roleplay — so you're always prepared."
    },
    {
      q: "Can I cancel my Pro subscription anytime?",
      a: "Absolutely. You can cancel anytime from your dashboard settings. Your Pro features will remain active until the end of your billing period."
    },
    {
      q: "What currencies and markets does Pricis support?",
      a: "Pricis is calibrated for African markets, with pricing in Naira (₦). We're expanding to support more African currencies and markets soon."
    },
    {
      q: "How accurate is the AI-generated pricing?",
      a: "Our pricing engine is trained on real market data from African freelancers and service providers. It factors in your experience level, client type, project complexity, and local market rates."
    },
    {
      q: "Can I share my scope with clients?",
      a: "Yes! Pro users can generate shareable links with view tracking, so you know exactly when your client opens your proposal. You can also export to PDF."
    }
  ];

  return (
    <section className="py-24 px-6 bg-surface" id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="font-body text-xs font-semibold tracking-[0.1em] uppercase text-primary mb-3">FAQ</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark font-display">
            Frequently Asked <span className="text-primary">Questions</span>
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
  );
};

const Newsletter = () => (
  <section className="py-24 px-6 bg-surface-secondary border-t border-border-light">
    <div className="max-w-2xl mx-auto text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary-light flex items-center justify-center mx-auto mb-6">
        <Mail size={28} className="text-primary" />
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark font-display mb-4">
        Stay ahead of the <span className="text-primary">game</span>
      </h2>
      <p className="text-text-secondary font-body text-lg mb-8 leading-relaxed">
        Get weekly pricing tips, negotiation strategies, and product updates. Join 2,500+ freelancers who price smarter.
      </p>
      <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
        <input 
          type="email" 
          placeholder="Enter your email address" 
          className="flex-1 bg-surface border border-border-light rounded-full px-5 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-text-dark placeholder:text-text-muted transition-all font-body"
        />
        <button type="submit" className="bg-primary hover:bg-primary-hover shadow-blue text-white font-semibold px-6 py-3 rounded-full transition-all font-body flex items-center justify-center gap-2 whitespace-nowrap">
          Subscribe <Send size={16} />
        </button>
      </form>
      <p className="text-xs text-text-muted mt-4 font-body">No spam, ever. Unsubscribe anytime.</p>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-bg-dark border-t border-border pt-20 pb-8 px-6 text-text-muted text-sm font-body">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
      <div className="lg:col-span-2">
        <Link href="/" className="mb-6 block">
          <Logo variant="light" />
        </Link>
        <p className="mb-8 font-medium text-text-muted text-base leading-relaxed max-w-sm">
          Price with confidence. Negotiate with clarity.
        </p>
        <div className="flex items-center gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"><Twitter size={18} /></a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"><Linkedin size={18} /></a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors"><Instagram size={18} /></a>
        </div>
      </div>
      
      <div>
        <h4 className="text-white font-semibold mb-6 tracking-wide">Product</h4>
        <ul className="space-y-4 font-medium">
          <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
          <li><Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
          <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
          <li><Link href="#templates" className="hover:text-primary transition-colors">Templates</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-6 tracking-wide">Resources</h4>
        <ul className="space-y-4 font-medium">
          <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
          <li><Link href="#" className="hover:text-primary transition-colors">Pricing Guide</Link></li>
          <li><Link href="#" className="hover:text-primary transition-colors">Negotiation Tips</Link></li>
          <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-6 tracking-wide">Company</h4>
        <ul className="space-y-4 font-medium">
          <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
          <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
          <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
        </ul>
      </div>
    </div>

    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border text-xs font-medium">
      <p>© 2024 Pricis. All rights reserved.</p>
      <div className="flex gap-6 mt-4 md:mt-0">
        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans selection:bg-primary-light">
      <Navbar />
      <div className="overflow-hidden">
        <Hero />
      </div>
      <SocialProof />
      <div className="bg-surface text-text-dark">
        <HowItWorks />
        <Features />
        <Testimonials />
        <Logos />
        <Pricing />
        <FAQ />
        <Newsletter />
      </div>
      <Footer />
    </div>
  );
}
