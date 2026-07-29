"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Bell, ChevronDown, Plus, Target, FileText, Receipt, UserPlus,
  Eye, CheckCircle2, MessageSquare, Calendar, Flag, Sparkles
} from "lucide-react";
import { supabaseAuth } from "@/lib/auth";
import { fetchInvoices, fetchProjects, fetchProposals } from "@/app/actions/db";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  
  // Dashboard Live Stats
  const [totalEarnings, setTotalEarnings] = useState(2450000);
  const [outstanding, setOutstanding] = useState(850000);
  const [overdue, setOverdue] = useState(150000);
  const [pipelineCounts, setPipelineCounts] = useState([24, 16, 9, 5, 4]);
  const [projectCounts, setProjectCounts] = useState({ inProgress: 8, review: 4, pending: 3, completed: 12, overdue: 2 });

  useEffect(() => {
    async function loadDashboardData() {
      const { data: { session } } = await supabaseAuth.auth.getSession();
      if (session?.user) {
        setUser(session.user);

        // Load Invoices totals
        const invoices = await fetchInvoices(session.user.id);
        if (invoices && invoices.length > 0) {
          let paidSum = 0;
          let sentSum = 0;
          let overdueSum = 0;
          invoices.forEach((inv: any) => {
            const amount = Number(inv.amount) || 0;
            if (inv.status === "Paid") {
              paidSum += amount;
            } else if (inv.status === "Overdue") {
              overdueSum += amount;
            } else {
              sentSum += amount;
            }
          });
          setTotalEarnings(paidSum || 2450000);
          setOutstanding((sentSum + overdueSum) || 850000);
          setOverdue(overdueSum || 150000);
        }

        // Load proposals pipeline counts
        const proposals = await fetchProposals(session.user.id);
        if (proposals && proposals.length > 0) {
          let draft = 0;
          let sent = 0;
          let opened = 0;
          let signed = 0;
          proposals.forEach((p: any) => {
            if (p.status === "Signed") signed++;
            else if (p.status === "Opened" || p.status === "Reviewing") opened++;
            else if (p.status === "Sent") sent++;
            else draft++;
          });
          setPipelineCounts([draft + sent + opened + signed, sent + opened + signed, opened + signed, signed, signed]); // Cumulative steps
        }

        // Load project counts
        const projects = await fetchProjects(session.user.id);
        if (projects && projects.length > 0) {
          let inProgress = 0;
          let review = 0;
          let pending = 0;
          let completed = 0;
          let overdue = 0;
          projects.forEach((p: any) => {
            if (p.status === "Completed") completed++;
            else if (p.status === "Review" || p.status === "Under Review") review++;
            else if (p.status === "On Hold") pending++;
            else if (p.status === "Overdue") overdue++;
            else inProgress++;
          });
          setProjectCounts({ inProgress, review, pending, completed, overdue });
        }
      }
    }
    loadDashboardData();
  }, []);

  const getChevronStyle = (index: number) => {
    if (index === 0) {
      return {
        clipPath: "polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)"
      };
    }
    return {
      clipPath: "polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%)"
    };
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-2 pt-12 sm:pt-0">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] mb-1 font-display">
            Good morning, {user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'Alex'}! 👋
          </h1>
          <p className="text-text-secondary text-sm font-body">Here&apos;s what&apos;s happening with your business today.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-text-muted hover:text-text-dark transition-colors p-2 rounded-full hover:bg-slate-100">
            <Bell size={20} />
          </button>
          <div className="relative group">
            <button className="hidden sm:flex bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full text-sm font-semibold items-center gap-2 transition-all shadow-blue font-body">
              <Plus size={16} /> New Scope <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Target, label: "New Scope", href: "/generate", color: "text-primary bg-primary-light" },
          { icon: FileText, label: "New Proposal", href: "/dashboard/proposals/new", color: "text-primary bg-primary-light" },
          { icon: Receipt, label: "New Invoice", href: "/dashboard/invoices/new", color: "text-primary bg-primary-light" },
          { icon: UserPlus, label: "Add Client", href: "/dashboard/clients/new", color: "text-primary bg-primary-light" }
        ].map((action, i) => (
          <Link 
            key={i} 
            href={action.href} 
            className="bg-white border border-[#E5EAF2] rounded-2xl p-5 flex items-center gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
              <action.icon size={18} />
            </div>
            <span className="font-bold text-[#0F172A] text-sm font-display">{action.label}</span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Summary */}
        <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 lg:col-span-1 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[#0F172A] text-lg font-display">Revenue Summary</h3>
              <select className="bg-slate-50 border border-[#E5EAF2] text-text-secondary text-xs rounded-lg px-2.5 py-1.5 outline-none font-semibold cursor-pointer">
                <option>This Month</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Left Side: Total Earnings */}
              <div>
                <p className="text-text-secondary text-xs font-semibold mb-1">Total Earnings</p>
                <h2 className="text-2xl font-black text-[#0F172A] font-display">₦{totalEarnings.toLocaleString()}</h2>
                <p className="text-xs font-bold mt-2">
                  <span className="text-success">↑ 28%</span> <span className="text-text-muted font-normal">vs last month</span>
                </p>
              </div>
              
              {/* Right Side: Outstanding & Overdue */}
              <div className="flex flex-col justify-between pl-4 border-l border-[#E5EAF2] space-y-4">
                <div>
                  <p className="text-text-secondary text-xs font-semibold mb-0.5">Outstanding</p>
                  <p className="text-warning text-lg font-bold font-display">₦{outstanding.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-text-secondary text-xs font-semibold mb-0.5">Overdue</p>
                  <p className="text-danger text-lg font-bold font-display">₦{overdue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sparkline */}
          <div className="h-16 w-full mt-6 relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-success/10 to-transparent"></div>
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M 0 75 C 30 75, 45 85, 60 55 C 75 25, 90 45, 100 25 L 100 100 L 0 100 Z" fill="rgba(34,197,94,0.08)" />
              <path d="M 0 75 C 30 75, 45 85, 60 55 C 75 25, 90 45, 100 25" fill="none" stroke="#22C55E" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>
        </div>

        {/* Proposal Pipeline */}
        <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 lg:col-span-2 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-[#0F172A] text-lg font-display">Proposal Pipeline</h3>
              <select className="bg-slate-50 border border-[#E5EAF2] text-text-secondary text-xs rounded-lg px-2.5 py-1.5 outline-none font-semibold cursor-pointer">
                <option>This Month</option>
              </select>
            </div>
            
            <div className="flex w-full items-stretch relative gap-1 md:gap-2">
              {[
                { label: "Scopes\nGenerated", count: pipelineCounts[0] },
                { label: "Proposals\nSent", count: pipelineCounts[1] },
                { label: "Opened", count: pipelineCounts[2] },
                { label: "Signed", count: pipelineCounts[3] },
                { label: "Paid", count: pipelineCounts[4] },
              ].map((step, i) => (
                <div 
                  key={i} 
                  style={getChevronStyle(i)}
                  className="flex-1 bg-[#F8FAFC] border border-[#E5EAF2] h-28 flex flex-col justify-center items-center shadow-inner select-none transition-all duration-300 hover:bg-slate-50"
                >
                  <p className="text-text-secondary text-[10px] md:text-xs font-semibold text-center px-1 mb-2 leading-tight whitespace-pre-line">
                    {step.label}
                  </p>
                  <p className="text-xl md:text-2xl font-black text-[#0F172A] font-display">
                    {step.count}
                  </p>
                </div>
              ))}
            </div>

            {/* Dotted Arrow indicators */}
            <div className="flex justify-between items-center mt-6 px-4">
              {[
                { percent: pipelineCounts[0] > 0 ? `${Math.round((pipelineCounts[1] / pipelineCounts[0]) * 100)}%` : "0%" },
                { percent: pipelineCounts[1] > 0 ? `${Math.round((pipelineCounts[2] / pipelineCounts[1]) * 100)}%` : "0%" },
                { percent: pipelineCounts[2] > 0 ? `${Math.round((pipelineCounts[3] / pipelineCounts[2]) * 100)}%` : "0%" },
                { percent: pipelineCounts[3] > 0 ? `${Math.round((pipelineCounts[4] / pipelineCounts[3]) * 100)}%` : "0%" },
              ].map((arrow, i) => (
                <div key={i} className="flex-1 flex items-center justify-center gap-1 mx-2">
                  <div className="flex-grow border-t border-dashed border-[#E5EAF2]"></div>
                  <span className="text-[10px] font-bold text-text-secondary bg-[#F8FAFC] border border-[#E5EAF2] px-2 py-0.5 rounded-md select-none">
                    {arrow.percent}
                  </span>
                  <div className="w-1.5 h-1.5 border-t border-r border-[#CBD5E1] rotate-45 flex-shrink-0 -ml-1"></div>
                  <div className="flex-grow border-t border-dashed border-[#E5EAF2]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Active Projects */}
        <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[#0F172A] text-lg font-display">Active Projects</h3>
              <Link href="/dashboard/projects" className="text-primary text-xs font-bold hover:underline">View all →</Link>
            </div>
            
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-3 flex-grow">
                {[
                  { label: "In Progress", count: projectCounts.inProgress, color: "bg-blue-500" },
                  { label: "Under Review", count: projectCounts.review, color: "bg-amber-500" },
                  { label: "Pending Client", count: projectCounts.pending, color: "bg-purple-500" },
                  { label: "Completed", count: projectCounts.completed, color: "bg-emerald-500" },
                  { label: "Overdue", count: projectCounts.overdue, color: "bg-red-500" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${stat.color}`}></div>
                      <span className="text-text-secondary">{stat.label}</span>
                    </div>
                    <span className="font-bold text-[#0F172A]">{stat.count}</span>
                  </div>
                ))}
              </div>
              
              {(() => {
                const totalProjects = projectCounts.completed + projectCounts.inProgress + projectCounts.review + projectCounts.pending + projectCounts.overdue;
                const pctCompleted = totalProjects > 0 ? (projectCounts.completed / totalProjects) * 100 : 0;
                const pctInProgress = totalProjects > 0 ? (projectCounts.inProgress / totalProjects) * 100 : 0;
                const pctReview = totalProjects > 0 ? (projectCounts.review / totalProjects) * 100 : 0;
                const pctPending = totalProjects > 0 ? (projectCounts.pending / totalProjects) * 100 : 0;
                const pctOverdue = totalProjects > 0 ? (projectCounts.overdue / totalProjects) * 100 : 0;

                return (
                  <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#F1F5F9" strokeWidth="3.5" />
                      
                      {/* Completed (Emerald) */}
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#10B981" strokeWidth="3.5" 
                              strokeDasharray={`${pctCompleted} ${100 - pctCompleted}`} strokeDashoffset="0" />
                      
                      {/* In Progress (Blue) */}
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#3B82F6" strokeWidth="3.5" 
                              strokeDasharray={`${pctInProgress} ${100 - pctInProgress}`} strokeDashoffset={`-${pctCompleted}`} />
                      
                      {/* Under Review (Amber) */}
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#F59E0B" strokeWidth="3.5" 
                              strokeDasharray={`${pctReview} ${100 - pctReview}`} strokeDashoffset={`-${pctCompleted + pctInProgress}`} />
                      
                      {/* Pending Client (Purple) */}
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#8B5CF6" strokeWidth="3.5" 
                              strokeDasharray={`${pctPending} ${100 - pctPending}`} strokeDashoffset={`-${pctCompleted + pctInProgress + pctReview}`} />
                      
                      {/* Overdue (Red) */}
                      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#EF4444" strokeWidth="3.5" 
                              strokeDasharray={`${pctOverdue} ${100 - pctOverdue}`} strokeDashoffset={`-${pctCompleted + pctInProgress + pctReview + pctPending}`} />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-[#0F172A] font-display leading-none">{totalProjects}</span>
                      <span className="text-[10px] text-text-secondary font-semibold mt-1">Total Projects</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[#0F172A] text-lg font-display">Recent Activity</h3>
              <Link href="/dashboard/activity" className="text-primary text-xs font-bold hover:underline">View all →</Link>
            </div>
            <div className="space-y-4">
              {[
                { icon: Eye, title: "Acme Corp proposal was opened", desc: "Website Redesign Proposal", time: "2h ago", color: "text-blue-500", bg: "bg-blue-50 border border-blue-100" },
                { icon: CheckCircle2, title: "Invoice INV-2024-0012 was paid", desc: "Acme Corp", time: "5h ago", color: "text-emerald-500", bg: "bg-emerald-50 border border-emerald-100" },
                { icon: FileText, title: "New scope created", desc: "Mobile App Design for TechNova", time: "1d ago", color: "text-blue-500", bg: "bg-blue-50 border border-blue-100" },
                { icon: CheckCircle2, title: "Milestone approved", desc: "Landing Page Design - TechNova", time: "1d ago", color: "text-emerald-500", bg: "bg-emerald-50 border border-emerald-100" },
                { icon: MessageSquare, title: "Kova negotiation session completed", desc: "Project: E-commerce Website", time: "2d ago", color: "text-purple-500", bg: "bg-purple-50 border border-purple-100" }
              ].map((activity, i) => (
                 <div key={i} className="flex gap-3.5 items-start">
                   <div className={`w-8 h-8 rounded-lg ${activity.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                     <activity.icon size={13} className={activity.color} />
                   </div>
                   <div className="flex-grow">
                     <p className="text-xs font-bold text-[#0F172A] leading-tight">{activity.title}</p>
                     <p className="text-[10px] text-text-secondary mt-0.5 font-medium">{activity.desc}</p>
                   </div>
                   <div className="text-[10px] text-text-muted font-bold pt-0.5 flex-shrink-0">{activity.time}</div>
                 </div>
              ))}
            </div>
          </div>
        </div>

        {/* WhatsApp Copilot */}
        <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 relative overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#0F172A] text-lg font-display flex items-center gap-2">
              WhatsApp Copilot
            </h3>
            <span className="bg-[#E8F8F0] text-[#28C76F] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Coming Soon</span>
          </div>
          
          <div className="flex-grow flex flex-col items-center justify-center text-center mt-2 mb-6">
            <div className="relative mb-4">
              <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🤖</span>
              </div>
              <Sparkles size={16} className="text-[#FF9F43] absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h4 className="font-bold text-[#0F172A] text-xs mb-1">AI negotiations that close more deals.</h4>
            <p className="text-[10px] text-text-secondary max-w-[200px] leading-relaxed">Get real-time negotiation support, smart replies, and objection handling.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 border border-[#E5EAF2] rounded-xl py-3 px-2 flex flex-col items-center shadow-inner">
              <span className="font-black text-2xl text-[#0F172A] font-display">0</span>
              <span className="text-[9px] text-text-secondary font-semibold uppercase tracking-wider mt-1 text-center leading-tight">Active<br/>Negotiations</span>
            </div>
            <div className="bg-slate-50 border border-[#E5EAF2] rounded-xl py-3 px-2 flex flex-col items-center shadow-inner">
              <span className="font-black text-2xl text-[#0F172A] font-display">0</span>
              <span className="text-[9px] text-text-secondary font-semibold uppercase tracking-wider mt-1 text-center leading-tight">Pending<br/>Approvals</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#E5EAF2] pt-4 mt-auto">
             <span className="text-[10px] font-semibold text-text-secondary">Be the first to try it out.</span>
             <button className="bg-primary hover:bg-primary-hover text-white text-[10px] font-bold px-4 py-2 rounded-full transition-colors shadow-sm">
               Join Waitlist
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* Top Clients */}
         <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#0F172A] text-lg font-display">Top Clients by Value</h3>
            <Link href="/dashboard/clients" className="text-primary text-xs font-bold hover:underline">View all →</Link>
          </div>
          <div className="space-y-4">
             {[
               { name: "Acme Corp", value: "₦1,200,000", width: "100%" },
               { name: "TechNova Ltd.", value: "₦950,000", width: "79%" },
               { name: "Greenlife NG", value: "₦750,000", width: "62.5%" },
               { name: "StartupX", value: "₦500,000", width: "41.6%" },
               { name: "StoreHub", value: "₦300,000", width: "25%" },
             ].map((client, i) => (
               <div key={i} className="flex items-center gap-4">
                 <span className="text-xs font-bold text-text-muted w-4">{i + 1}</span>
                 <span className="text-xs font-bold text-[#0F172A] w-28 truncate font-display">{client.name}</span>
                 <div className="flex-grow h-2.5 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: client.width }}></div>
                 </div>
                 <span className="text-xs font-bold text-[#0F172A] w-24 text-right">{client.value}</span>
               </div>
             ))}
          </div>
         </div>

         {/* Upcoming Reminders */}
         <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#0F172A] text-lg font-display">Upcoming Reminders</h3>
            <Link href="/dashboard/reminders" className="text-primary text-xs font-bold hover:underline">View all →</Link>
          </div>
          <div className="space-y-4">
            {[
              { date: "30 May", title: "Invoice INV-2024-0014 due in 3 days", desc: "TechNova Ltd.", type: "Due Soon", icon: Calendar, badge: "bg-amber-50 text-amber-600 border border-amber-100" },
              { date: "02 Jun", title: "Project deadline in 6 days", desc: "E-commerce Website - StoreHub", type: "Upcoming", icon: Flag, badge: "bg-blue-50 text-blue-600 border border-blue-100" },
              { date: "05 Jun", title: "Milestone review in 9 days", desc: "Mobile App Design - Acme Corp", type: "Upcoming", icon: Target, badge: "bg-blue-50 text-blue-600 border border-blue-100" },
            ].map((reminder, i) => (
              <div key={i} className="flex gap-4 items-start pb-4 border-b border-[#E5EAF2] last:border-0 last:pb-0">
                <div className="bg-blue-50 rounded-xl w-14 h-16 flex flex-col items-center justify-center text-[#2563EB] flex-shrink-0 border border-blue-100 shadow-sm">
                  <reminder.icon size={15} className="mb-1 text-primary" />
                  <div className="flex flex-col items-center leading-none">
                    <span className="text-xs font-bold text-blue-900">{reminder.date.split(' ')[0]}</span>
                    <span className="text-[9px] font-bold text-blue-500 uppercase mt-0.5">{reminder.date.split(' ')[1]}</span>
                  </div>
                </div>
                <div className="flex-grow pt-1">
                  <p className="text-xs font-bold text-[#0F172A]">{reminder.title}</p>
                  <p className="text-[10px] text-text-secondary mt-1 font-semibold">{reminder.desc}</p>
                </div>
                <div className="pt-1 flex-shrink-0">
                  <span className={`text-[9px] font-bold px-2.5 py-1 rounded-md ${reminder.badge}`}>
                    {reminder.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
         </div>
      </div>
    </div>
  );
}
