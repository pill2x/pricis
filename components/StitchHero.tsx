"use client";

import { Search, Filter, ChevronRight, Plus, Grid, FileText, MessageSquare, Bookmark, FolderKanban, Users, Receipt, BarChart3, Settings, Crown, LogOut } from "lucide-react";
import Logo from "@/components/Logo";

export default function StitchHero() {
  const scrollToWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("waitlist-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      const input = element.querySelector("input");
      if (input) input.focus();
    }
  };

  const scrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("workflow");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="product" className="pt-12 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-8 text-center bg-[#FBFBFD] bg-dot-pattern-light relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-5 sm:space-y-6 relative z-10">
        
        {/* Eyebrow */}
        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-slate-500 font-body">
          Client Operations, Precisely.
        </p>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-[#0F172A] leading-[1.15]">
          Run every client engagement from quote to payment.
        </h1>

        {/* Supporting Paragraph */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-slate-600 font-body leading-relaxed">
          Pricis brings pricing, proposals, negotiation, client management, delivery, and payments into one workspace — so service businesses can spend less time managing operations and more time doing the work.
        </p>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={scrollToWaitlist}
            className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-lg shadow-sm transition-all active:scale-95 font-body"
          >
            Join the waitlist
          </button>
          <button
            onClick={scrollToHowItWorks}
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-lg border border-slate-300 shadow-sm transition-all font-body"
          >
            See how it works
          </button>
        </div>

        {/* Product UI Visualization Window (Proposals List Dashboard Modal) */}
        <div className="pt-8 sm:pt-10 max-w-6xl mx-auto">
          <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] text-left font-body">
            
            <div className="grid lg:grid-cols-12 min-h-[560px]">
              
              {/* Left Sidebar */}
              <div className="lg:col-span-3 border-r border-slate-200/80 p-5 bg-white flex flex-col justify-between hidden md:flex">
                <div>
                  <div className="mb-8">
                    <Logo variant="dark" />
                  </div>

                  <nav className="space-y-1 text-xs">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-slate-500 hover:text-slate-900 cursor-pointer">
                      <Grid size={16} /> Dashboard
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-slate-500 hover:text-slate-900 cursor-pointer">
                      <FileText size={16} /> Scopes
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg font-bold text-[#2563EB] bg-blue-50/80 border border-blue-100">
                      <FileText size={16} /> Proposals
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-slate-500 hover:text-slate-900 cursor-pointer">
                      <MessageSquare size={16} /> Negotiation AI
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-slate-500 hover:text-slate-900 cursor-pointer">
                      <Bookmark size={16} /> Templates
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-slate-500 hover:text-slate-900 cursor-pointer">
                      <FolderKanban size={16} /> Projects
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-slate-500 hover:text-slate-900 cursor-pointer">
                      <Users size={16} /> Clients
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-slate-500 hover:text-slate-900 cursor-pointer">
                      <Receipt size={16} /> Invoices
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-slate-500 hover:text-slate-900 cursor-pointer">
                      <BarChart3 size={16} /> Analytics
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-slate-500 hover:text-slate-900 cursor-pointer">
                      <Settings size={16} /> Settings
                    </div>
                  </nav>
                </div>

                {/* Bottom Upgrade Card & Sign Out */}
                <div className="space-y-3 pt-6 border-t border-slate-100">
                  <div className="border border-slate-200 p-3 rounded-xl flex items-center gap-2.5 bg-slate-50/50">
                    <Crown size={18} className="text-amber-500 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-slate-900">Upgrade to Pro</div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Unlock all features</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium px-2 cursor-pointer hover:text-slate-900">
                    <LogOut size={14} /> Sign Out
                  </div>
                </div>
              </div>

              {/* Main Content Area: Proposals Management View */}
              <div className="lg:col-span-9 p-4 sm:p-8 bg-[#FBFBFD] flex flex-col justify-between">
                <div>
                  {/* Header Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div>
                      <h1 className="text-xl sm:text-3xl font-extrabold font-display text-slate-900">Proposals</h1>
                      <p className="text-xs sm:text-sm text-slate-500 font-body">
                        Manage and track all your live proposal links in real time.
                      </p>
                    </div>

                    <button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full flex items-center gap-1.5 transition-colors shadow-2xs font-body">
                      <Plus size={15} /> New Proposal
                    </button>
                  </div>

                  {/* 4 Metric Summary Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-2xs">
                      <span className="text-xl sm:text-2xl font-extrabold font-display text-slate-900 block mb-1">24</span>
                      <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Total Proposals</span>
                      <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-600 block mt-1">↑ 20% vs last month</span>
                    </div>

                    <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-2xs">
                      <span className="text-xl sm:text-2xl font-extrabold font-display text-emerald-600 block mb-1">62.5%</span>
                      <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Open Rate</span>
                      <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-600 block mt-1">↑ 8.5% vs last month</span>
                    </div>

                    <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-2xs">
                      <span className="text-xl sm:text-2xl font-extrabold font-display text-purple-600 block mb-1">5.3 days</span>
                      <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Avg. Time to Signature</span>
                      <span className="text-[9px] sm:text-[10px] font-semibold text-purple-600 block mt-1">↓ 1.2 days vs last month</span>
                    </div>

                    <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-4 shadow-2xs">
                      <span className="text-xl sm:text-2xl font-extrabold font-display text-slate-900 block mb-1">₦8,450,000</span>
                      <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Total Value in Proposals</span>
                      <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-600 block mt-1">↑ 28% vs last month</span>
                    </div>
                  </div>

                  {/* Search and Filter Bar */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 w-full max-w-xs shadow-2xs">
                      <Search size={14} className="text-slate-400" />
                      <input
                        type="text"
                        readOnly
                        placeholder="Search proposals..."
                        className="bg-transparent text-xs text-slate-700 placeholder-slate-400 focus:outline-none w-full"
                      />
                    </div>

                    <button className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-2xs hover:bg-slate-50">
                      <Filter size={14} className="text-slate-400" /> Filter
                    </button>
                  </div>

                  {/* Proposals Table */}
                  <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            <th className="py-3 px-4">Project Name</th>
                            <th className="py-3 px-4">Client</th>
                            <th className="py-3 px-4">Amount</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Created</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs font-body">
                          <tr className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-3 px-4 font-bold text-slate-900">Website Redesign Project</td>
                            <td className="py-3 px-4 text-slate-600">Acme Corp</td>
                            <td className="py-3 px-4 font-bold text-slate-900">₦1,200,000</td>
                            <td className="py-3 px-4">
                              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                                Opened
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-400">May 15, 2024</td>
                            <td className="py-3 px-4 text-right text-slate-400"><ChevronRight size={14} className="ml-auto" /></td>
                          </tr>

                          <tr className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-3 px-4 font-bold text-slate-900">Mobile App Design</td>
                            <td className="py-3 px-4 text-slate-600">TechNova Ltd.</td>
                            <td className="py-3 px-4 font-bold text-slate-900">₦850,000</td>
                            <td className="py-3 px-4">
                              <span className="bg-purple-50 text-purple-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-purple-100">
                                Reviewing
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-400">May 10, 2024</td>
                            <td className="py-3 px-4 text-right text-slate-400"><ChevronRight size={14} className="ml-auto" /></td>
                          </tr>

                          <tr className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-3 px-4 font-bold text-slate-900">Brand Identity Design</td>
                            <td className="py-3 px-4 text-slate-600">Greenlife NG</td>
                            <td className="py-3 px-4 font-bold text-slate-900">₦450,000</td>
                            <td className="py-3 px-4">
                              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-100">
                                Signed
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-400">May 8, 2024</td>
                            <td className="py-3 px-4 text-right text-slate-400"><ChevronRight size={14} className="ml-auto" /></td>
                          </tr>

                          <tr className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-3 px-4 font-bold text-slate-900">UI/UX Design System</td>
                            <td className="py-3 px-4 text-slate-600">StartupX</td>
                            <td className="py-3 px-4 font-bold text-slate-900">₦300,000</td>
                            <td className="py-3 px-4">
                              <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-100">
                                Sent
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-400">May 3, 2024</td>
                            <td className="py-3 px-4 text-right text-slate-400"><ChevronRight size={14} className="ml-auto" /></td>
                          </tr>

                          <tr className="hover:bg-slate-50/60 transition-colors">
                            <td className="py-3 px-4 font-bold text-slate-900">E-commerce Website</td>
                            <td className="py-3 px-4 text-slate-600">StoreHub</td>
                            <td className="py-3 px-4 font-bold text-slate-900">₦500,000</td>
                            <td className="py-3 px-4">
                              <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-200">
                                Expired
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-400">Apr 28, 2024</td>
                            <td className="py-3 px-4 text-right text-slate-400"><ChevronRight size={14} className="ml-auto" /></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
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
