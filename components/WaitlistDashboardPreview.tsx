"use client";

import { 
  Target, FileText as FileTextIcon, MessageSquare, Receipt, Settings, 
  ChevronRight, Bookmark, TrendingUp, Grid, DownloadCloud, Link as LinkIcon, Menu
} from "lucide-react";
import Logo from "@/components/Logo";

export default function WaitlistDashboardPreview() {
  return (
    <div className="w-full max-w-[850px] mx-auto my-8 text-left">
      {/* DESKTOP MOCKUP (Scaled, Fixed Width) */}
      <div className="hidden lg:block relative mx-auto w-full max-w-[850px] text-left flex justify-center">
        <div 
          className="relative w-full aspect-[1.57/1] max-w-[850px] flex-shrink-0"
          style={{ containerType: 'inline-size' }}
        >
          <div 
            className="absolute top-0 left-0 origin-top-left dashboard-mock-scale"
            style={{ 
              width: '850px', 
              height: '541px'
            }}
          >
            {/* Dashboard Modal */}
            <div className="w-full h-full rounded-[2rem] border flex overflow-hidden transition-colors shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border-slate-200 bg-white">
              {/* Sidebar */}
              <div className="w-[220px] border-r p-4 flex flex-col justify-between transition-colors bg-white border-slate-200">
                <div>
                  <div className="mb-10 px-2 mt-2">
                    <Logo variant="dark" />
                  </div>
                  <nav className="space-y-1.5 font-body">
                    <div className="flex items-center gap-3 bg-blue-50 text-blue-600 px-3 py-2.5 rounded-lg font-semibold text-sm">
                      <Grid size={18} /> Dashboard
                    </div>
                    {[
                      { icon: FileTextIcon, label: "Scopes" },
                      { icon: MessageSquare, label: "Negotiations" },
                      { icon: Bookmark, label: "Templates" },
                      { icon: Receipt, label: "Invoices" },
                      { icon: Settings, label: "Settings" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm cursor-pointer transition-colors text-slate-500 hover:text-slate-900 hover:bg-slate-50">
                        <item.icon size={18} /> {item.label}
                      </div>
                    ))}
                  </nav>
                </div>
                
                {/* Upgrade Card */}
                <div className="border p-4 rounded-xl flex items-start gap-3 shadow-sm cursor-pointer transition-all font-body bg-white border-slate-200 hover:border-slate-300">
                  <div className="mt-0.5 w-6 h-6 flex items-center justify-center flex-shrink-0">
                     <span className="text-xl leading-none">👑</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Upgrade to Pro</div>
                    <div className="text-xs text-slate-500 mt-0.5">Unlock all features</div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 bg-[#F9FAFB] p-10 overflow-hidden relative">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 font-display mb-1.5">Welcome back, Alex 👋</h1>
                    <p className="text-slate-500 text-base font-body">Let&apos;s create a scope or continue where you left off.</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm font-body">
                      + New Scope
                    </button>
                  </div>
                </div>

                {/* Action Cards */}
                <div className="grid grid-cols-2 gap-5 mb-10 pr-[200px]">
                  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col items-start font-body">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                      <Target size={24} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1 text-base">Scope Generator</h3>
                    <p className="text-xs text-slate-500 mb-auto h-8 leading-relaxed">Create accurate scopes, pricing and timelines.</p>
                    <button className="bg-blue-600 text-white w-full py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-blue-700 mt-8">Start New</button>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col items-start font-body">
                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                      <TrendingUp size={24} />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1 text-base">Negotiation Assistant</h3>
                    <p className="text-xs text-slate-500 mb-auto h-8 leading-relaxed">Get help with strategy, messages and practice.</p>
                    <button className="bg-blue-600 text-white w-full py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-blue-700 mt-8">Open Assistant</button>
                  </div>
                </div>

                {/* Recent Scopes List */}
                <div className="pr-[200px]">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-900 font-display text-lg">Recent Scopes</h3>
                    <span className="text-blue-600 text-sm font-semibold hover:text-blue-700 cursor-pointer font-body">View all</span>
                  </div>
                  <div className="divide-y divide-slate-200 border-y border-slate-200">
                    {[
                      { title: "Brand Identity Design for Fintech Startup", price: "₦650,000", status: "Viewed", statusClass: "bg-emerald-50 text-emerald-600" },
                      { title: "Website Redesign for E-commerce Store", price: "₦1,250,000", status: "Draft", statusClass: "bg-slate-100 text-slate-600" },
                      { title: "Social Media Management (3 Months)", price: "₦450,000", status: "Sent", statusClass: "bg-blue-50 text-blue-600" },
                    ].map((scope, i) => (
                      <div key={i} className="flex items-center justify-between py-3.5 hover:bg-slate-50 transition-colors cursor-pointer group">
                        <div className="text-sm font-bold text-slate-900 truncate pr-4 font-body flex-1">{scope.title}</div>
                        <div className="flex items-center gap-6 flex-shrink-0">
                          <div className="text-sm font-semibold text-slate-900 w-20 text-right font-body">{scope.price}</div>
                          <div className={`text-xs font-semibold px-2 py-1 rounded-full w-16 text-center font-body ${scope.statusClass}`}>{scope.status}</div>
                          <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Scope Card (Overlapping Overlay) */}
            <div className="absolute -right-12 -bottom-16 w-[260px] h-[520px] bg-white rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)] border-[8px] border-[#1a1a1a] overflow-hidden flex flex-col z-20 ring-1 ring-slate-200/50">
              {/* Notch */}
              <div className="w-[120px] h-[24px] bg-[#1a1a1a] absolute top-0 left-1/2 -translate-x-1/2 rounded-b-[16px] z-30 flex justify-center items-end pb-1 gap-2">
                <div className="w-10 h-1.5 rounded-full bg-[#333]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#333]"></div>
              </div>
              
              {/* Status Bar */}
              <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[11px] font-medium text-slate-800 z-20 relative bg-white">
                <span>9:41</span>
                <div className="flex gap-1.5 items-center">
                  <div className="w-3.5 h-2.5 border border-slate-800 rounded-[2px] relative">
                    <div className="absolute right-[-2px] top-[2px] w-[1px] h-1 bg-slate-800"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white px-5 pb-5 pt-2 relative flex-1 flex flex-col">
                <div className="text-[11px] font-semibold text-slate-500 mb-1 font-body">Scope Summary</div>
                <div className="text-[13px] font-medium text-slate-900 mb-4 font-body">Total Price</div>
                <div className="text-3xl font-extrabold text-slate-900 mb-1 font-display tracking-tight">₦650,000</div>
                <div className="text-[11px] text-slate-500 mb-6 bg-slate-50 border border-slate-100 inline-block px-2.5 py-1 rounded-md font-body font-medium w-fit">Valid 30 days</div>
                
                <button className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-xl mb-3 shadow-md shadow-blue-600/20 font-body hover:bg-blue-700 transition-colors text-[13px]">View Scope</button>
                <button className="w-full bg-white border-2 border-slate-100 text-slate-800 font-semibold py-2.5 rounded-xl mb-6 hover:bg-slate-50 transition-colors font-body text-[13px]">Share Link</button>
                
                <div className="text-[11px] font-bold text-slate-900 mb-1 font-body">Next Step</div>
                <div className="text-[11px] text-slate-500 mb-3 font-body">Send to client or download your PDF.</div>
                
                <div className="space-y-2 mt-auto font-body">
                  <div className="flex items-center justify-between p-3.5 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 cursor-pointer transition-all group">
                    <div className="flex items-center gap-3 text-[13px] font-medium text-slate-800 group-hover:text-blue-600">
                      <DownloadCloud size={16} className="text-slate-400 group-hover:text-blue-600" /> Download PDF
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-3.5 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 cursor-pointer transition-all group">
                    <div className="flex items-center gap-3 text-[13px] font-medium text-slate-800 group-hover:text-blue-600">
                      <LinkIcon size={16} className="text-slate-400 group-hover:text-blue-600" /> Copy Link
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MOCKUP (Natively Responsive) */}
      <div className="lg:hidden relative mx-auto w-full max-w-[850px] text-left">
        <div className="w-full rounded-2xl border flex flex-col overflow-hidden relative z-10 bg-white border-slate-200 shadow-xl">
          <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white">
            <Logo variant="dark" />
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center cursor-pointer">
              <Menu size={16} className="text-blue-600" />
            </div>
          </div>

          <div className="p-5 bg-[#F9FAFB]">
            <h1 className="text-xl font-extrabold text-slate-900 font-display mb-1">Welcome back, Alex 👋</h1>
            <p className="text-slate-500 text-sm font-body mb-6">Let&apos;s create a scope or continue where you left off.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 font-body">
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <Target size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Scope Generator</h3>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">Create accurate scopes, pricing and timelines.</p>
                <button className="bg-blue-600 text-white w-full py-2 rounded-lg text-xs font-semibold hover:bg-blue-700">Start New</button>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <TrendingUp size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">Negotiation Assistant</h3>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">Get help with strategy, messages and practice.</p>
                <button className="bg-blue-600 text-white w-full py-2 rounded-lg text-xs font-semibold hover:bg-blue-700">Open Assistant</button>
              </div>
            </div>

            <div className="font-body">
              <h3 className="font-bold text-slate-900 font-display text-base mb-3">Recent Scopes</h3>
              <div className="divide-y divide-slate-200 border-y border-slate-200">
                {[
                  { title: "Brand Identity Design for Fintech", price: "₦650,000", status: "Viewed" },
                  { title: "Website Redesign for E-commerce", price: "₦1,250,000", status: "Draft" },
                  { title: "Social Media Management (3 Months)", price: "₦450,000", status: "Sent" },
                ].map((scope, i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div className="text-xs font-bold text-slate-900 truncate pr-2 flex-1">{scope.title}</div>
                    <div className="text-xs font-semibold text-slate-900">{scope.price}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
