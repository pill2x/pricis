"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  Target, 
  MessageSquare, 
  FileText, 
  Link as LinkIcon, 
  Folder, 
  Receipt,
  Play,
  Mail,
  Send,
  Lock,
  Plus,
  TrendingUp,
  Search,
  Check
} from "lucide-react";
import Logo from "@/components/Logo";

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState("Scope Generator");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const features = [
    { icon: Target, label: "Scope Generator" },
    { icon: MessageSquare, label: "Kova AI Negotiation" },
    { icon: FileText, label: "PDF Export" },
    { icon: LinkIcon, label: "Client Share Links" },
    { icon: Folder, label: "Templates" },
    { icon: Receipt, label: "Invoicing" },
  ];

  return (
    <div className="min-h-screen bg-bg-dark text-text-dark font-body selection:bg-primary selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-bg-dark text-white">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent rounded-full blur-[120px] opacity-80 pointer-events-none"></div>
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[128px] opacity-40 pointer-events-none"></div>
          <div className="absolute top-40 -right-40 w-96 h-96 bg-success/5 rounded-full blur-[128px] opacity-40 pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-inner">
              <span className="text-xs font-semibold tracking-wider text-primary-light uppercase text-blue-400">Everything you need</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8 leading-tight text-white">
              The complete toolkit for <br className="hidden md:block" />
              freelancers who charge <br className="hidden md:block" />
              what they're <span className="text-primary">worth.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
              Pricis gives you AI-powered pricing, professional proposals, and negotiation support — built specifically for African markets.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-full font-semibold transition-all shadow-blue flex items-center justify-center gap-2">
                Get Started Free
              </Link>
              <Link href="/pricing" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/15 text-white rounded-full font-semibold transition-all flex items-center justify-center gap-2">
                See Pricing <Play className="w-4 h-4 text-white/80" fill="currentColor" />
              </Link>
            </div>

            {/* Sub-nav pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto bg-bg-dark-2/60 p-2 rounded-2xl border border-white/5 backdrop-blur-md">
              {features.map((item, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveTab(item.label)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                    activeTab === item.label 
                      ? 'bg-primary border-primary text-white shadow-md' 
                      : 'bg-transparent border-transparent text-text-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature 01: Scope Generator */}
      <section className="py-24 bg-surface relative overflow-hidden border-b border-border-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Mockup Left */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/5 rounded-[2rem] transform -rotate-1 scale-105 blur-xl"></div>
              <div className="relative bg-white border border-border-light rounded-3xl shadow-xl overflow-hidden aspect-[1.3/1] flex">
                {/* Sidebar */}
                <div className="w-[180px] border-r border-border-light p-5 flex flex-col gap-5 bg-surface-secondary">
                  <div className="flex items-center gap-2.5 text-primary font-bold text-xs">
                    <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">1</span>
                    Service Type
                  </div>
                  <div className="flex items-center gap-2.5 text-text-muted font-semibold text-xs">
                    <span className="w-5 h-5 rounded-full border border-border-light flex items-center justify-center text-[10px]">2</span>
                    Client Read
                  </div>
                  <div className="flex items-center gap-2.5 text-text-muted font-semibold text-xs">
                    <span className="w-5 h-5 rounded-full border border-border-light flex items-center justify-center text-[10px]">3</span>
                    Project Details
                  </div>
                  <div className="flex items-center gap-2.5 text-text-muted font-semibold text-xs">
                    <span className="w-5 h-5 rounded-full border border-border-light flex items-center justify-center text-[10px]">4</span>
                    Scope Statement
                  </div>
                </div>
                {/* Panel Content */}
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-text-secondary">Service Type</span>
                    <h4 className="text-lg font-bold text-text-dark mt-1 mb-5">What service are you offering?</h4>
                    
                    <div className="relative mb-5">
                      <Search className="absolute left-3.5 top-3 w-4 h-4 text-text-muted" />
                      <input 
                        type="text" 
                        placeholder="Search services..." 
                        className="w-full bg-surface-secondary border border-border-light rounded-xl pl-10 pr-4 py-2.5 text-xs text-text-dark focus:outline-none focus:border-primary"
                        defaultValue="Branding"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="border-2 border-primary bg-primary-light rounded-xl p-3.5 flex items-center gap-3 cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary flex-shrink-0">
                          <Target className="w-4 h-4" />
                        </div>
                        <div className="text-xs font-bold text-text-dark">Branding & Identity</div>
                      </div>
                      
                      <div className="border border-border-light bg-white rounded-xl p-3.5 flex items-center gap-3 cursor-pointer hover:border-primary/40 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-surface-secondary flex items-center justify-center text-text-secondary flex-shrink-0">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        <div className="text-xs font-bold text-text-secondary">Website Design</div>
                      </div>

                      <div className="border border-border-light bg-white rounded-xl p-3.5 flex items-center gap-3 cursor-pointer hover:border-primary/40 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-surface-secondary flex items-center justify-center text-text-secondary flex-shrink-0">
                          <Target className="w-4 h-4" />
                        </div>
                        <div className="text-xs font-bold text-text-secondary">Mobile App Design</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-primary hover:underline cursor-pointer">View all 15+ Categories</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Right */}
            <div className="lg:pl-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-2xl font-display font-bold text-primary">01</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-text-dark leading-tight">
                Generate professional scopes in under 2 minutes.
              </h2>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Tell Pricis your service type, project details, and client context. Get a full scope document — with deliverables, timeline, and pricing — instantly. No guessing. No templates to fill out from scratch.
              </p>
              <ul className="space-y-4">
                {[
                  "Calibrated for Nigerian and African market rates",
                  "Covers 15+ service categories",
                  "Fully editable before sending"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5.5 h-5.5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-text-dark font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 02: Kova AI */}
      <section className="py-24 bg-surface-secondary relative overflow-hidden border-b border-border-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Left */}
            <div className="lg:pr-10 order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center text-success">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="text-2xl font-display font-bold text-success">02</span>
                <span className="bg-success/10 text-success text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Powered by Kova™</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-text-dark leading-tight">
                Meet Kova. Your AI negotiation co-pilot.
              </h2>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                When a client pushes back on your price, Kova helps you respond with confidence. Paste their message, describe the situation, or just ask — Kova reads the context and gives you exactly what you need: a strategy, a response draft, or a practice session.
              </p>
              <ul className="space-y-4">
                {[
                  "Understands context — no mode selection needed",
                  "Responds in your language",
                  "Trained on real freelance negotiation scenarios"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5.5 h-5.5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-text-dark font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mockup Right */}
            <div className="relative order-1 lg:order-2">
              <div className="absolute inset-0 bg-success/5 rounded-[2rem] transform rotate-1 scale-105 blur-xl"></div>
              <div className="relative bg-[#0F172A] rounded-3xl shadow-xl overflow-hidden aspect-[1.3/1] border border-slate-800 flex flex-col">
                {/* Chat Header */}
                <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-danger"></div>
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-xs font-bold text-slate-400 ml-2 font-display">Kova Negotiation Assistant</span>
                </div>
                {/* Chat Body */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4 font-body text-xs leading-relaxed">
                  <div className="flex flex-col items-end">
                    <div className="bg-slate-800 text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-[85%]">
                      <p className="font-semibold text-[10px] text-slate-400 mb-1">CLIENT MESSAGE</p>
                      Can your retainer be a bit lighter than what we had in mind?
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start">
                    <div className="bg-primary/20 border border-primary/30 text-white rounded-2xl rounded-tl-none px-4 py-3 max-w-[90%] space-y-3">
                      <div>
                        <p className="font-semibold text-[10px] text-primary-light mb-1">KOVA STRATEGY</p>
                        <p className="text-slate-300">Refocus on value and impact first, then address budget constraints constructively without immediately offering a discount.</p>
                      </div>
                      <div className="border-t border-slate-700/50 pt-2">
                        <p className="font-semibold text-[10px] text-success mb-1">DRAFT RESPONSE</p>
                        <p className="text-slate-200">"Thanks for being upfront about the budget. I want to make sure we deliver the best results for your project. If pricing is a blocker, we can adjust the scope by focusing on the core deliverables first, or..."</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Chat Footer */}
                <div className="bg-slate-900 border-t border-slate-800 p-4 flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Ask Kova anything..." 
                    className="flex-1 bg-slate-850 border border-slate-800 rounded-full px-4 py-2 text-xs text-white focus:outline-none focus:border-primary placeholder:text-slate-500"
                    disabled
                  />
                  <button className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white cursor-not-allowed">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 03: Professional Proposals */}
      <section className="py-24 bg-surface relative overflow-hidden border-b border-border-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Mockup Left */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/5 rounded-[2rem] transform -rotate-1 scale-105 blur-xl"></div>
              <div className="relative bg-[#F8FAFC] border border-border-light rounded-3xl shadow-xl overflow-hidden aspect-[1.3/1] flex p-6 gap-6">
                {/* Tool bar */}
                <div className="w-[120px] flex flex-col gap-2">
                  <button className="bg-white border border-border-light text-text-dark text-[11px] font-bold py-2.5 px-3 rounded-lg shadow-sm flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-primary" /> Download PDF
                  </button>
                  <button className="bg-white border border-border-light text-text-dark text-[11px] font-bold py-2.5 px-3 rounded-lg shadow-sm flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5 text-success" /> Share Link
                  </button>
                  <button className="bg-[#EEF2F6] border border-slate-200 text-text-secondary text-[10px] font-medium py-2 px-3 rounded-lg flex items-center gap-1">
                    Copy URL
                  </button>
                </div>
                {/* Document Body */}
                <div className="flex-1 bg-white border border-border-light shadow-sm rounded-xl p-6 flex flex-col justify-between font-body text-[10px]">
                  <div>
                    <div className="flex justify-between items-center border-b border-border-light pb-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Logo variant="dark" />
                      </div>
                      <span className="text-[9px] text-text-secondary font-medium">May 20, 2024</span>
                    </div>
                    
                    <h5 className="font-bold text-text-dark text-xs uppercase tracking-wider mb-1">Project Scope</h5>
                    <p className="text-text-secondary font-semibold text-xs mb-4">Brand Identity Design for Acme Ltd</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 bg-surface-secondary p-3 rounded-lg">
                      <div>
                        <p className="text-[8px] text-text-muted font-bold uppercase">Final Price</p>
                        <p className="font-bold text-text-dark text-xs mt-0.5">₦650,000</p>
                      </div>
                      <div>
                        <p className="text-[8px] text-text-muted font-bold uppercase">Timeline</p>
                        <p className="font-bold text-text-dark text-xs mt-0.5">4 Weeks</p>
                      </div>
                    </div>
                    
                    <h6 className="font-bold text-text-dark uppercase mb-1">Project Overview</h6>
                    <p className="text-text-secondary leading-relaxed">This project covers the full visual redesign and strategic positioning for Acme Ltd's fintech startup, focusing on building user trust.</p>
                  </div>
                  <div className="border-t border-border-light pt-3 text-right">
                    <span className="text-[9px] text-text-muted">Generated with Pricis</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Right */}
            <div className="lg:pl-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-2xl font-display font-bold text-primary">03</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-text-dark leading-tight">
                Send proposals that look like they came from an agency.
              </h2>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Export any scope as a beautifully formatted PDF in one click. Clean layouts, professional typography, and your pricing presented clearly. Clients take formatted proposals seriously.
              </p>
              <ul className="space-y-4">
                {[
                  "Branded with Pricis design (Pro: add your own logo)",
                  "Download instantly or share via link",
                  "Client-ready in seconds"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5.5 h-5.5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-text-dark font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 04: Client Tracking */}
      <section className="py-24 bg-surface-secondary relative overflow-hidden border-b border-border-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Left */}
            <div className="lg:pr-10 order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                  <LinkIcon className="w-6 h-6" />
                </div>
                <span className="text-2xl font-display font-bold text-primary">04</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-text-dark leading-tight">
                Know the moment your client opens your proposal.
              </h2>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Generate a unique link for each scope. Share it via WhatsApp, email, or anywhere. You'll get notified the moment they view it — so you know exactly when to follow up.
              </p>
              <ul className="space-y-4">
                {[
                  "View tracking on every open",
                  "No login required for clients",
                  "Dedicated scope page with your branding (Pro)"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5.5 h-5.5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-text-dark font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mockup Right */}
            <div className="relative order-1 lg:order-2">
              <div className="absolute inset-0 bg-primary/5 rounded-[2rem] transform rotate-1 scale-105 blur-xl"></div>
              <div className="relative bg-white border border-border-light rounded-3xl shadow-xl overflow-hidden aspect-[1.3/1] p-6 flex flex-col justify-between font-body text-xs text-text-dark">
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h5 className="font-bold text-sm">Scope Link Activity</h5>
                      <span className="text-[10px] text-primary font-semibold">pricis.app/scope/nASh28o</span>
                    </div>
                    <span className="text-[10px] text-text-muted hover:underline cursor-pointer">Open Link</span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mb-6 text-center">
                    <div className="bg-surface-secondary border border-border-light rounded-xl p-3">
                      <p className="text-[9px] text-text-muted font-bold uppercase">Views</p>
                      <p className="font-black text-lg text-text-dark mt-1">2 <span className="text-xs text-text-secondary font-medium">Times</span></p>
                    </div>
                    <div className="bg-surface-secondary border border-border-light rounded-xl p-3">
                      <p className="text-[9px] text-text-muted font-bold uppercase">Last Viewed</p>
                      <p className="font-bold text-[10px] text-text-dark mt-1">Today, 1:34 PM</p>
                    </div>
                    <div className="bg-surface-secondary border border-border-light rounded-xl p-3">
                      <p className="text-[9px] text-text-muted font-bold uppercase">First Viewed</p>
                      <p className="font-bold text-[10px] text-text-dark mt-1">Today, 11:45 AM</p>
                    </div>
                    <div className="bg-surface-secondary border border-border-light rounded-xl p-3">
                      <p className="text-[9px] text-text-muted font-bold uppercase">Avg Time</p>
                      <p className="font-black text-sm text-text-dark mt-1">3m 45s</p>
                    </div>
                  </div>
                  
                  <h6 className="font-bold text-[10px] text-text-dark uppercase mb-3">Recent Activity</h6>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] bg-slate-50 border border-slate-100 p-2.5 rounded-lg">
                      <span className="text-text-dark font-semibold">● Today, 1:34 PM · Viewed on Mobile</span>
                      <span className="text-text-secondary font-medium">Victoria Island, Lagos, NG</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] bg-slate-50 border border-slate-100 p-2.5 rounded-lg">
                      <span className="text-text-dark font-semibold">● Today, 11:45 AM · Viewed on Desktop</span>
                      <span className="text-text-secondary font-medium">Ikeja, Lagos, NG</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-text-muted">Tracking enabled · Real-time updates</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 05: Templates */}
      <section className="py-24 bg-surface relative overflow-hidden border-b border-border-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Mockup Left */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/5 rounded-[2rem] transform -rotate-1 scale-105 blur-xl"></div>
              <div className="relative bg-white border border-border-light rounded-3xl shadow-xl overflow-hidden aspect-[1.3/1] p-6 flex flex-col justify-between font-body text-xs text-text-dark">
                <div>
                  <div className="flex justify-between items-center mb-5">
                    <h5 className="font-bold text-sm">Templates Library</h5>
                    <button className="bg-primary text-white text-[10px] font-bold py-1.5 px-3 rounded-full flex items-center gap-1">
                      <Plus className="w-3 h-3" /> New template
                    </button>
                  </div>
                  
                  {/* Category Pills */}
                  <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1 text-[10px] font-bold">
                    <span className="bg-primary text-white px-3 py-1 rounded-full cursor-pointer">All</span>
                    <span className="bg-slate-100 text-slate-650 px-3 py-1 rounded-full cursor-pointer hover:bg-slate-200">Design</span>
                    <span className="bg-slate-100 text-slate-650 px-3 py-1 rounded-full cursor-pointer hover:bg-slate-200">Development</span>
                    <span className="bg-slate-100 text-slate-650 px-3 py-1 rounded-full cursor-pointer hover:bg-slate-200">Marketing</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border border-border-light rounded-xl p-3 hover:border-primary/55 cursor-pointer bg-white flex flex-col justify-between h-[85px]">
                      <div>
                        <h6 className="font-bold text-[11px] text-text-dark">Logo Design Scope</h6>
                        <span className="text-[9px] text-primary font-semibold mt-1 inline-block">Design</span>
                      </div>
                      <span className="text-[9px] text-text-muted">Used by 1.2k users</span>
                    </div>
                    
                    <div className="border border-border-light rounded-xl p-3 hover:border-primary/55 cursor-pointer bg-white flex flex-col justify-between h-[85px]">
                      <div>
                        <h6 className="font-bold text-[11px] text-text-dark">Website Redesign Scope</h6>
                        <span className="text-[9px] text-primary font-semibold mt-1 inline-block">Design</span>
                      </div>
                      <span className="text-[9px] text-text-muted">Used by 880 users</span>
                    </div>

                    <div className="border border-border-light rounded-xl p-3 hover:border-primary/55 cursor-pointer bg-white flex flex-col justify-between h-[85px]">
                      <div>
                        <h6 className="font-bold text-[11px] text-text-dark">Brand Identity Package</h6>
                        <span className="text-[9px] text-primary font-semibold mt-1 inline-block">Design</span>
                      </div>
                      <span className="text-[9px] text-text-muted">Used by 650 users</span>
                    </div>

                    <div className="border border-border-light rounded-xl p-3 hover:border-primary/55 cursor-pointer bg-slate-50 flex flex-col justify-between h-[85px]">
                      <div className="flex justify-between items-start">
                        <div>
                          <h6 className="font-bold text-[11px] text-text-muted">Mobile App UI Design</h6>
                          <span className="text-[9px] text-text-muted font-semibold mt-1 inline-block">Design</span>
                        </div>
                        <Lock className="w-3 h-3 text-text-muted mt-0.5" />
                      </div>
                      <span className="text-[9px] text-text-muted">Unlock in Pro</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Right */}
            <div className="lg:pl-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                  <Folder className="w-6 h-6" />
                </div>
                <span className="text-2xl font-display font-bold text-primary">05</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-text-dark leading-tight">
                Start from a proven framework, not a blank page.
              </h2>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Access a library of scope templates built for Nigerian freelancers across design, development, writing, marketing, and more. Save your own templates and reuse them for recurring project types.
              </p>
              <ul className="space-y-4">
                {[
                  "20+ pre-built templates across industries",
                  "Save and customize your own (Pro)",
                  "Templates learn from your past scopes"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5.5 h-5.5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-text-dark font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 06: Invoicing */}
      <section className="py-24 bg-surface-secondary relative overflow-hidden border-b border-border-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Left */}
            <div className="lg:pr-10 order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                  <Receipt className="w-6 h-6" />
                </div>
                <span className="text-2xl font-display font-bold text-primary">06</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-text-dark leading-tight">
                From scope to invoice in one flow.
              </h2>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Once a scope is approved, generate a matching invoice in seconds. Pre-filled with your project details, pricing, and payment terms. Track payment status directly from your dashboard.
              </p>
              <ul className="space-y-4">
                {[
                  "Auto-populated from your scope",
                  "Add bank details, due dates, line items",
                  "Track: Draft -> Sent -> Viewed -> Paid"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5.5 h-5.5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-text-dark font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mockup Right */}
            <div className="relative order-1 lg:order-2">
              <div className="absolute inset-0 bg-primary/5 rounded-[2rem] transform rotate-1 scale-105 blur-xl"></div>
              <div className="relative bg-white border border-border-light rounded-3xl shadow-xl overflow-hidden aspect-[1.3/1] p-6 flex flex-col justify-between font-body text-[10px] text-text-dark">
                <div>
                  <div className="flex justify-between items-center mb-5 border-b border-border-light pb-3">
                    <div>
                      <h5 className="font-bold text-xs">Invoice #INV-1034</h5>
                      <p className="text-[8px] text-text-secondary mt-0.5">May 20, 2024</p>
                    </div>
                    <span className="bg-success/15 text-success text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      ● Paid
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-[10px]">
                    <div>
                      <p className="text-[8px] text-text-muted font-bold uppercase">Bill To</p>
                      <p className="font-bold text-text-dark mt-0.5">Acme Ltd</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-text-muted font-bold uppercase">Project</p>
                      <p className="font-bold text-text-dark mt-0.5">Brand Identity Design</p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 mb-4 flex justify-between items-center">
                    <span className="text-[9px] text-text-secondary font-semibold">Total Amount Paid</span>
                    <span className="text-sm font-black text-text-dark">₦650,000</span>
                  </div>
                  
                  <div className="border border-border-light rounded-xl overflow-hidden text-[9px] font-medium divide-y divide-border-light">
                    <div className="bg-slate-50 grid grid-cols-3 p-2 font-bold text-text-secondary text-[8px] uppercase">
                      <span>Item</span>
                      <span>Description</span>
                      <span className="text-right">Amount</span>
                    </div>
                    <div className="grid grid-cols-3 p-2 text-text-dark font-semibold">
                      <span>Brand Strategy</span>
                      <span className="text-text-secondary">Research, positioning</span>
                      <span className="text-right">₦300,000</span>
                    </div>
                    <div className="grid grid-cols-3 p-2 text-text-dark font-semibold">
                      <span>Visual Identity</span>
                      <span className="text-text-secondary">Logo, assets, styles</span>
                      <span className="text-right">₦200,000</span>
                    </div>
                    <div className="grid grid-cols-3 p-2 text-text-dark font-semibold">
                      <span>Brand Guidelines</span>
                      <span className="text-text-secondary">Usage manual, assets</span>
                      <span className="text-right">₦150,000</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-[8px] text-text-muted">
                  <span>Paid on May 22, 2024</span>
                  <span>Thank you for your business!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 bg-surface text-text-dark border-b border-border-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight mb-4">How Pricis compares.</h2>
            <p className="text-lg text-text-secondary">Built for African freelancers. Not retrofitted from a US tool.</p>
          </div>
          
          <div className="overflow-x-auto rounded-2xl border border-border-light shadow-sm">
            <table className="w-full text-left font-body text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-border-light text-[10px] uppercase font-bold text-text-secondary tracking-wider">
                  <th className="p-5 font-semibold">Feature</th>
                  <th className="p-5 font-bold text-primary">Pricis</th>
                  <th className="p-5 font-semibold text-text-muted">Bonsai</th>
                  <th className="p-5 font-semibold text-text-muted">HoneyBook</th>
                  <th className="p-5 font-semibold text-text-muted">Excel / Manual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light font-medium text-text-dark">
                {[
                  { name: "African market pricing calibration", pricis: true, bonsai: false, honeybook: false, excel: false },
                  { name: "AI negotiation assistant", pricis: true, bonsai: false, honeybook: false, excel: false },
                  { name: "Naira (₦) native support", pricis: true, bonsai: false, honeybook: false, excel: true },
                  { name: "Scope + invoice in one flow", pricis: true, bonsai: true, honeybook: true, excel: false },
                  { name: "Client view tracking", pricis: true, bonsai: true, honeybook: true, excel: false },
                  { name: "Free tier available", pricis: true, bonsai: false, honeybook: false, excel: true },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-5 font-semibold text-sm">{row.name}</td>
                    <td className="p-5 text-success font-black text-sm">
                      {row.pricis ? <Check className="w-5 h-5" /> : "—"}
                    </td>
                    <td className="p-5 text-text-muted">
                      {row.bonsai ? <Check className="w-4 h-4 text-slate-450" /> : <span className="text-slate-300">✗</span>}
                    </td>
                    <td className="p-5 text-text-muted">
                      {row.honeybook ? <Check className="w-4 h-4 text-slate-450" /> : <span className="text-slate-300">✗</span>}
                    </td>
                    <td className="p-5 text-text-muted">
                      {row.excel ? <Check className="w-4 h-4 text-slate-450" /> : <span className="text-slate-300">✗</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-text-muted text-center mt-5">Comparison based on publicly available plan details and platform capabilities.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface text-text-dark border-b border-border-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight mb-4">Trust free. Upbalancers when you need more.</h2>
            <p className="text-lg text-text-secondary">Loved by freelancers and service providers across Africa</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Pricis helped me increase my proposal close rate by 40%. Clients take my prices more seriously now.",
                name: "Tayo A.",
                role: "Product Designer, Lagos",
                img: "https://i.pravatar.cc/100?img=11"
              },
              {
                quote: "The Negotiation Assistant is a game changer. I don't panic anymore when clients push back.",
                name: "Mary I.",
                role: "Copywriter, Abuja",
                img: "https://i.pravatar.cc/100?img=12"
              },
              {
                quote: "Finally, a tool that understands our market. The pricing is realistic and the scopes look so professional.",
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

      {/* Brands & Newsletter Section */}
      <section className="py-24 px-6 bg-surface-secondary text-text-dark" data-section="newsletter">
        <div className="max-w-7xl mx-auto">
          {/* Logo prove */}
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-300 mb-20 border-b border-border-light pb-16">
            <div className="font-bold text-lg tracking-tighter text-slate-700 font-display">● Techpoint</div>
            <div className="font-black text-lg tracking-widest text-slate-800 font-display">TECHCABAL</div>
            <div className="font-bold text-base text-slate-700 font-display">VENTURES PLATFORM</div>
            <div className="font-serif font-bold text-lg text-slate-800"><span className="bg-slate-800 text-white px-1">BUSINESS</span>DAY</div>
            <div className="font-bold text-xl tracking-tighter text-slate-800 font-display" style={{ fontStyle: 'italic' }}>YNaija</div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[10px] leading-tight text-slate-750 uppercase tracking-wider font-display">African<br/>Freelancers</span>
            </div>
            <div className="flex items-center gap-2 border-l border-border-light pl-6">
              <span className="text-xs font-bold text-success font-display">+2,500</span>
              <span className="text-[9px] text-text-secondary font-bold font-display uppercase tracking-wider">Freelancers trust Pricis</span>
            </div>
          </div>

          <div className="max-w-2xl mx-auto text-center">
            <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mx-auto mb-6">
              <Mail size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark font-display mb-4">
              Stay ahead of the <span className="text-primary">game</span>
            </h2>
            <p className="text-text-secondary font-body text-base mb-8 max-w-lg mx-auto leading-relaxed">
              Get weekly pricing tips, negotiation strategies, and product updates. Join 2,500+ freelancers who price smarter.
            </p>
            {subscribed ? (
              <div className="max-w-md mx-auto mb-4 bg-success/10 border border-success/20 text-success py-3 px-6 rounded-full font-semibold font-body shadow-sm">
                Thanks for subscribing! 🎉
              </div>
            ) : (
              <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-4" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 w-full bg-white border border-border-light rounded-full px-5 py-3 text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors shadow-sm"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-blue flex-shrink-0"
                >
                  Subscribe <Send size={16} />
                </button>
              </form>
            )}
            <p className="text-xs text-text-muted font-body">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
