"use client";

import { ArrowLeft, Share2, MoreHorizontal, Brain, Send, ChevronDown, Check, Sparkles } from "lucide-react";

export default function StitchSabee() {
  return (
    <section className="py-20 px-4 sm:px-8 border-t border-slate-200/80 bg-white">
      <div className="max-w-7xl mx-auto bg-[#FBFBFD] border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT COLUMN: Text Content & Value Prop */}
          <div className="lg:col-span-5 text-left space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB] font-body bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              <Sparkles size={14} className="text-[#2563EB]" />
              <span>Introducing SaBee</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#0F172A] tracking-tight leading-tight">
              Negotiate with confidence, not guesswork.
            </h2>

            {/* Paragraph */}
            <p className="text-sm sm:text-base text-slate-600 font-body leading-relaxed">
              SaBee provides context-aware assistance during negotiations, helping you maintain margins without the AI hype. It analyzes client messages and suggests responses that protect your scope and pricing.
            </p>

            {/* Checklist */}
            <div className="space-y-3 font-body text-xs sm:text-sm font-semibold text-slate-700 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center flex-shrink-0 border border-blue-200">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span>Margin-protect alerts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center flex-shrink-0 border border-blue-200">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span>Scope-reduction suggestions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-[#2563EB] flex items-center justify-center flex-shrink-0 border border-blue-200">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span>Professional pushback templates</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: SaBee Negotiation AI Workspace Modal */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-sm text-left font-body">
              
              {/* Top Bar: Back link & Actions */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-4 text-xs">
                <div className="flex items-center gap-2 font-semibold text-slate-600 cursor-pointer hover:text-slate-900">
                  <ArrowLeft size={14} />
                  <span>Back to Conversations</span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-2xs hover:bg-slate-50 flex items-center gap-1">
                    <Share2 size={12} /> Share
                  </button>
                  <button className="bg-white border border-slate-200 text-slate-700 p-1 rounded-md shadow-2xs hover:bg-slate-50">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>

              {/* Negotiation Header Card */}
              <div className="bg-slate-50/50 border border-slate-200/80 rounded-xl p-3.5 mb-4">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <h3 className="text-base font-bold font-display text-slate-900">New Negotiation</h3>
                  <span className="bg-blue-50 text-[#2563EB] text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-blue-100">
                    ACTIVE
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Related Scope: <strong className="text-slate-800 font-semibold">Acme Corp Website Redesign</strong> • <span className="text-[#2563EB] cursor-pointer hover:underline">View Scope</span>
                </p>
              </div>

              {/* Inner 2-Column Workspace Grid */}
              <div className="grid md:grid-cols-12 gap-4">
                
                {/* Left Column: Conversation Workspace */}
                <div className="md:col-span-7 bg-slate-50/30 border border-slate-200/80 rounded-xl p-3.5 flex flex-col justify-between space-y-4">
                  
                  {/* Conversation History */}
                  <div className="space-y-3">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                      CONVERSATION HISTORY
                    </span>

                    {/* AI Assistant Welcome Bubble */}
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 font-bold text-[11px] flex items-center justify-center flex-shrink-0">
                        K
                      </div>
                      <div className="bg-white border border-slate-200/80 p-3 rounded-xl text-[11px] text-slate-800 leading-relaxed shadow-2xs">
                        <p className="font-semibold text-slate-900">
                          Hi! I&apos;m Kova, your AI negotiation assistant. Paste the client&apos;s message below and I&apos;ll help you respond with confidence.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Message Input Box */}
                  <div className="pt-3 border-t border-slate-200/60 space-y-2">
                    <div className="border border-slate-200 rounded-lg p-2.5 bg-white focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all">
                      <textarea
                        rows={2}
                        readOnly
                        placeholder="Paste client message or describe the situation..."
                        className="w-full bg-transparent text-[11px] text-slate-800 placeholder-slate-400 focus:outline-none resize-none"
                      ></textarea>

                      <div className="flex flex-wrap items-center justify-between gap-1.5 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1.5">
                          <button className="bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-semibold px-2 py-1 rounded shadow-2xs hover:bg-slate-100">
                            Attach context
                          </button>
                          <button className="bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-semibold px-2 py-1 rounded shadow-2xs hover:bg-slate-100 flex items-center gap-1">
                            <span>Professional</span>
                            <ChevronDown size={10} />
                          </button>
                        </div>

                        <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[11px] font-bold px-3 py-1 rounded-lg flex items-center gap-1 shadow-2xs transition-colors">
                          <span>Send to Kova</span>
                          <Send size={10} />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column: Context & Tips Panel */}
                <div className="md:col-span-5 space-y-3">
                  
                  {/* Context Card */}
                  <div className="bg-slate-50/50 border border-slate-200/80 rounded-xl p-3 space-y-2.5">
                    <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CONTEXT</span>
                      <span className="text-[10px] font-semibold text-[#2563EB] cursor-pointer hover:underline">Edit</span>
                    </div>

                    <div className="space-y-2 text-[10.5px]">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 font-medium">Project</span>
                        <span className="font-bold text-slate-900 text-right truncate max-w-[110px]">Acme Corp Website</span>
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
                        <span className="bg-amber-50 text-amber-700 text-[9px] font-extrabold px-2 py-0.5 rounded border border-amber-200">
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
                  <div className="bg-blue-50/60 border border-blue-200/70 rounded-xl p-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#2563EB] font-display">
                      <Brain size={13} />
                      <span>Kova Tips</span>
                    </div>
                    <p className="text-[10px] text-slate-600 leading-relaxed font-body">
                      Clients often push back on price. Focus on value, outcomes and ROI. Avoid justifying your rate.
                    </p>
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
