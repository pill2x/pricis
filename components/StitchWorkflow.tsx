"use client";

import { ArrowRight } from "lucide-react";

export default function StitchWorkflow() {
  return (
    <section id="workflow" className="py-20 px-4 sm:px-8 border-t border-slate-200/80 bg-white">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        
        {/* Section Headline */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display text-[#0F172A] tracking-tight">
          Your client workflow shouldn&apos;t live in <span className="underline decoration-slate-300 decoration-2 underline-offset-4">six different tools</span>.
        </h2>

        {/* Workflow Comparison Transformation Visual */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          
          {/* Left Side: Scattered Tools */}
          <div className="w-full lg:w-1/2 p-6 rounded-2xl border border-slate-200/80 bg-[#FBFBFD] space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 text-left">
              Scattered Tools (Fragmented)
            </span>
            <div className="grid grid-cols-3 gap-2.5 font-body text-xs font-medium text-slate-500">
              <div className="bg-white border border-slate-200/80 py-2.5 px-3 rounded-lg shadow-2xs">Notes</div>
              <div className="bg-white border border-slate-200/80 py-2.5 px-3 rounded-lg shadow-2xs">Spreadsheet</div>
              <div className="bg-white border border-slate-200/80 py-2.5 px-3 rounded-lg shadow-2xs">Calculator</div>
              <div className="bg-white border border-slate-200/80 py-2.5 px-3 rounded-lg shadow-2xs">Document</div>
              <div className="bg-white border border-slate-200/80 py-2.5 px-3 rounded-lg shadow-2xs">Email</div>
              <div className="bg-white border border-slate-200/80 py-2.5 px-3 rounded-lg shadow-2xs">Invoice</div>
            </div>
          </div>

          {/* Central Blue Transition Arrow */}
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-[#2563EB] flex-shrink-0 shadow-2xs border border-blue-100">
            <ArrowRight size={22} strokeWidth={2.5} />
          </div>

          {/* Right Side: Pricis Unified System */}
          <div className="w-full lg:w-1/2 p-6 rounded-2xl border border-blue-200/80 bg-white shadow-sm space-y-3">
            <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider block mb-2 text-left flex items-center justify-between">
              <span>Pricis Operating System</span>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">Consolidated</span>
            </span>
            
            <div className="space-y-2.5 font-body text-xs font-medium">
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-slate-50 border border-slate-200/80 py-2.5 px-2 rounded-lg text-slate-700 font-semibold text-center">Scope</div>
                <div className="bg-slate-50 border border-slate-200/80 py-2.5 px-2 rounded-lg text-slate-700 font-semibold text-center">Price</div>
                <div className="bg-slate-50 border border-slate-200/80 py-2.5 px-2 rounded-lg text-slate-700 font-semibold text-center">Proposal</div>
                <div className="bg-blue-50 border border-[#2563EB] py-2.5 px-2 rounded-lg text-[#2563EB] font-bold text-center shadow-2xs">Negotiate</div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-slate-50 border border-slate-200/80 py-2.5 px-2 rounded-lg text-slate-700 font-semibold text-center">Manage</div>
                <div className="bg-slate-50 border border-slate-200/80 py-2.5 px-2 rounded-lg text-slate-700 font-semibold text-center">Deliver</div>
                <div className="bg-slate-50 border border-slate-200/80 py-2.5 px-2 rounded-lg text-slate-700 font-semibold text-center">Paid</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
