"use client";

import { 
  Grid, FileText, MessageSquare, Receipt, Settings, Bell, Plus, 
  TrendingUp, Users, CheckCircle, ChevronRight, Sparkles 
} from "lucide-react";
import Logo from "@/components/Logo";

export default function WaitlistDashboardPreview() {
  return (
    <div className="w-full max-w-5xl mx-auto my-12 px-4">
      {/* Outer Glow Container */}
      <div className="relative rounded-3xl p-1 bg-gradient-to-b from-blue-500/20 via-slate-800/40 to-slate-900/60 shadow-[0_25px_70px_-15px_rgba(37,99,235,0.3)]">
        
        {/* Top Browser Bar */}
        <div className="bg-[#0F172A] rounded-t-[1.4rem] px-4 py-3 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-full px-4 py-1 text-xs text-slate-300 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            app.pricis.io/dashboard
          </div>
          <div className="text-xs text-slate-400 font-semibold font-body hidden sm:block">
            Pricis OS v2.0
          </div>
        </div>

        {/* Dashboard Frame */}
        <div className="bg-[#F8FAFC] text-slate-900 rounded-b-[1.4rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border-t border-slate-200">
          
          {/* Sidebar */}
          <div className="hidden md:flex w-52 bg-white border-r border-slate-200 p-4 flex-col justify-between flex-shrink-0">
            <div>
              <div className="mb-8 px-2 mt-2">
                <Logo variant="dark" />
              </div>

              <nav className="space-y-1 font-body">
                <div className="flex items-center gap-3 bg-blue-50 text-blue-600 px-3 py-2.5 rounded-xl font-bold text-xs">
                  <Grid size={16} /> Dashboard
                </div>
                {[
                  { icon: FileText, label: "Scopes" },
                  { icon: MessageSquare, label: "Proposals" },
                  { icon: Sparkles, label: "Negotiation AI" },
                  { icon: FileText, label: "Projects" },
                  { icon: Users, label: "Clients" },
                  { icon: Receipt, label: "Invoices" },
                  { icon: Settings, label: "Settings" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-500 px-3 py-2 rounded-xl font-medium text-xs hover:text-slate-900 hover:bg-slate-100 cursor-pointer transition-colors">
                    <item.icon size={16} /> {item.label}
                  </div>
                ))}
              </nav>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-3.5 text-xs font-body">
              <div className="font-bold flex items-center justify-between mb-1">
                <span>Pricis Pro</span>
                <span className="bg-emerald-500 text-slate-950 font-extrabold text-[9px] px-1.5 py-0.5 rounded">AI ACTIVE</span>
              </div>
              <p className="text-[11px] text-slate-400">Unlimited scopes & client negotiation copilot.</p>
            </div>
          </div>

          {/* Main Dashboard Area */}
          <div className="flex-1 p-5 sm:p-7 bg-[#F8FAFC]">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display flex items-center gap-2">
                  Good morning, Alex 👋
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-body">Here&apos;s what&apos;s happening with your business today.</p>
              </div>

              <div className="flex items-center gap-3">
                <button className="p-2 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-slate-900 shadow-sm">
                  <Bell size={18} />
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 shadow-md shadow-blue-500/20 font-body">
                  <Plus size={16} /> New Scope
                </button>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { icon: FileText, label: "New Scope", color: "bg-blue-50 text-blue-600" },
                { icon: MessageSquare, label: "New Proposal", color: "bg-indigo-50 text-indigo-600" },
                { icon: Receipt, label: "New Invoice", color: "bg-emerald-50 text-emerald-600" },
                { icon: Users, label: "Add Client", color: "bg-purple-50 text-purple-600" },
              ].map((act, i) => (
                <div key={i} className="bg-white border border-slate-200/80 rounded-xl p-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer">
                  <div className={`w-8 h-8 rounded-lg ${act.color} flex items-center justify-center flex-shrink-0`}>
                    <act.icon size={16} />
                  </div>
                  <span className="text-xs font-bold text-slate-800 font-body">{act.label}</span>
                </div>
              ))}
            </div>

            {/* Financial & Pipeline Cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Revenue Summary */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-xs text-slate-500 uppercase tracking-wider font-body">Revenue Summary</h3>
                  <span className="text-[11px] font-semibold text-slate-400 font-body">This Month ▾</span>
                </div>
                <div className="mb-3">
                  <span className="text-2xl font-extrabold text-slate-900 font-display">₦2,450,000</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full ml-2 font-body">↑ 28% vs last month</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 font-body text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Outstanding</span>
                    <span className="font-bold text-amber-600">₦1,250,000</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Overdue</span>
                    <span className="font-bold text-rose-500">₦350,000</span>
                  </div>
                </div>
              </div>

              {/* Proposal Pipeline */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-xs text-slate-500 uppercase tracking-wider font-body">Proposal Pipeline</h3>
                  <span className="text-[11px] font-semibold text-slate-400 font-body">This Month ▾</span>
                </div>

                <div className="grid grid-cols-5 gap-1 text-center font-body my-2">
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <span className="block text-[10px] text-slate-400 font-medium">Scopes</span>
                    <span className="text-sm font-extrabold text-slate-800">24</span>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <span className="block text-[10px] text-blue-600 font-medium">Proposals</span>
                    <span className="text-sm font-extrabold text-blue-700">16</span>
                  </div>
                  <div className="bg-indigo-50 p-2 rounded-lg">
                    <span className="block text-[10px] text-indigo-600 font-medium">Opened</span>
                    <span className="text-sm font-extrabold text-indigo-700">9</span>
                  </div>
                  <div className="bg-purple-50 p-2 rounded-lg">
                    <span className="block text-[10px] text-purple-600 font-medium">Signed</span>
                    <span className="text-sm font-extrabold text-purple-700">5</span>
                  </div>
                  <div className="bg-emerald-50 p-2 rounded-lg">
                    <span className="block text-[10px] text-emerald-600 font-medium">Paid</span>
                    <span className="text-sm font-extrabold text-emerald-700">4</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 pt-2 font-body">
                  <span>Conversion rate: <strong className="text-emerald-600">80.0%</strong></span>
                  <span>Avg deal cycle: <strong>4.2 days</strong></span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Active Projects & WhatsApp Copilot */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-xs text-slate-900 font-display">Active Projects (29)</h3>
                  <span className="text-xs text-blue-600 font-semibold font-body cursor-pointer hover:underline">View all →</span>
                </div>
                <div className="space-y-2 font-body text-xs">
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="font-semibold text-slate-800">Acme Corp Website Redesign</span>
                    </div>
                    <span className="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded text-[10px]">In Progress</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="font-semibold text-slate-800">TechNova Mobile App Scope</span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px]">Signed & Paid</span>
                  </div>
                </div>
              </div>

              {/* WhatsApp Copilot Card */}
              <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-2 right-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Coming Soon
                </div>
                <div>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                    <Sparkles size={16} />
                  </div>
                  <h4 className="font-extrabold text-sm font-display mb-1">WhatsApp AI Copilot</h4>
                  <p className="text-[11px] text-slate-300 font-body leading-relaxed">
                    AI negotiations that close more deals right inside WhatsApp.
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-emerald-800/40 text-[10px] text-emerald-300 font-semibold flex items-center justify-between">
                  <span>Included in Waitlist VIP</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
