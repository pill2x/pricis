"use client";

import { ArrowLeft, Share2, MoreHorizontal, Brain, Send, ChevronDown, Check, Sparkles } from "lucide-react";

export default function StitchSabee() {
  return (
    <section className="py-20 px-4 sm:px-8 border-t border-slate-200/80 bg-white">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl text-left space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB] font-body bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <Sparkles size={14} className="text-[#2563EB]" />
            <span>Introducing SaBee</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#0F172A] tracking-tight leading-tight">
            Negotiate with confidence, not guesswork.
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-body leading-relaxed">
            SaBee provides context-aware assistance during negotiations, helping you maintain margins without the AI hype. It analyzes client messages and suggests responses that protect your scope and pricing.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold text-slate-700 font-body pt-2">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-emerald-500" />
              <span>Margin-protect alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-emerald-500" />
              <span>Scope-reduction suggestions</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={16} className="text-emerald-500" />
              <span>Professional pushback templates</span>
            </div>
          </div>
        </div>

        {/* Product UI Visualization Window (Updated Negotiation AI Workspace Modal matching Image 4) */}
        <div className="bg-[#FBFBFD] border border-slate-200/90 rounded-3xl p-4 sm:p-8 shadow-sm text-left font-body">
          
          {/* Top Bar: Back link & Actions */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer hover:text-slate-900">
              <ArrowLeft size={16} />
              <span>Back to Conversations</span>
            </div>

            <div className="flex items-center gap-2">
              <button className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-3.5 py-1.5 rounded-lg shadow-2xs hover:bg-slate-50 flex items-center gap-1.5">
                <Share2 size={13} /> Share
              </button>
              <button className="bg-white border border-slate-200 text-slate-700 p-1.5 rounded-lg shadow-2xs hover:bg-slate-50">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          {/* Negotiation Header Card */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 mb-6 shadow-2xs">
            <div className="flex flex-wrap items-center gap-3 mb-1">
              <h3 className="text-xl font-bold font-display text-slate-900">New Negotiation</h3>
              <span className="bg-blue-50 text-[#2563EB] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-blue-100">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Related Scope: <strong className="text-slate-800 font-semibold">Acme Corp Website Redesign</strong> • <span className="text-[#2563EB] cursor-pointer hover:underline">View Scope</span>
            </p>
          </div>

          {/* Main 2-Column Grid */}
          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Left Column: Conversation Workspace */}
            <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs flex flex-col justify-between space-y-6">
              
              {/* Conversation History */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  CONVERSATION HISTORY
                </span>

                {/* AI Assistant Welcome Bubble */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                    K
                  </div>
                  <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl text-xs text-slate-800 max-w-lg leading-relaxed">
                    <p className="font-semibold text-slate-900">
                      Hi! I&apos;m Kova, your AI negotiation assistant. Paste the client&apos;s message below and I&apos;ll help you respond with confidence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Input Box */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50 focus-within:bg-white focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all">
                  <textarea
                    rows={3}
                    readOnly
                    placeholder="Paste client message or describe the situation..."
                    className="w-full bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none resize-none"
                  ></textarea>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <button className="bg-white border border-slate-200 text-slate-600 text-[11px] font-semibold px-3 py-1.5 rounded-lg shadow-2xs hover:bg-slate-50">
                        Attach context
                      </button>
                      <button className="bg-white border border-slate-200 text-slate-600 text-[11px] font-semibold px-3 py-1.5 rounded-lg shadow-2xs hover:bg-slate-50 flex items-center gap-1">
                        <span>Professional</span>
                        <ChevronDown size={12} />
                      </button>
                    </div>

                    <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold px-5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs transition-colors">
                      <span>Send to Kova</span>
                      <Send size={12} />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Context & Tips Panel */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Context Card */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">CONTEXT</span>
                  <span className="text-xs font-semibold text-[#2563EB] cursor-pointer hover:underline">Edit</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Project</span>
                    <span className="font-bold text-slate-900 text-right">Acme Corp Website Redesign</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Scope Value</span>
                    <span className="font-bold text-slate-900">₦500,000</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Client Type</span>
                    <span className="font-bold text-slate-900">SME</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Relationship</span>
                    <span className="font-bold text-slate-900">New Client</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Stage</span>
                    <span className="bg-amber-50 text-amber-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded border border-amber-200">
                      NEGOTIATING
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-medium">Timeline</span>
                    <span className="font-bold text-slate-900">4 weeks</span>
                  </div>
                </div>
              </div>

              {/* SaBee Tips Card */}
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 space-y-2 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-[#2563EB] font-display">
                  <Brain size={16} />
                  <span>Kova Tips</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-body">
                  Clients often push back on price. Focus on value, outcomes and ROI. Avoid justifying your rate.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
