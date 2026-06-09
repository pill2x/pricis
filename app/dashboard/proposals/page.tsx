"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Plus, FileText, ArrowLeft, Copy, ExternalLink, Check, Trash2, 
  Eye, CheckCircle2, ChevronRight, BarChart2, Calendar, Share2, Download, Lock
} from "lucide-react";

interface ProposalData {
  id: string;
  projectTitle: string;
  clientName: string;
  amount: number;
  status: "Opened" | "Reviewing" | "Signed" | "Sent" | "Expired";
  created: string;
  openCount: number;
  timeSpent: string;
  avgTime: string;
  timeline: string;
}

export default function ProposalsPage() {
  const [view, setView] = useState<"list" | "details" | "wizard" | "export">("list");
  
  // Detail views
  const [selectedProposal, setSelectedProposal] = useState<ProposalData | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<"Overview" | "Analytics" | "Activity" | "Files">("Overview");

  // Wizard States
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedScopeId, setSelectedScopeId] = useState("scope-1");
  const [proposalTitle, setProposalTitle] = useState("Website Redesign Proposal");
  const [introMsg, setIntroMsg] = useState("Thank you for considering us for your project. We are excited about the opportunity to work with Acme Corp and help achieve your goals.");
  const [paymentTerms, setPaymentTerms] = useState("50% upfront, 50% on completion");
  
  // List data
  const [proposalsList, setProposalsList] = useState<ProposalData[]>([
    {
      id: "prop-1",
      projectTitle: "Website Redesign Project",
      clientName: "Acme Corp",
      amount: 1200000,
      status: "Opened",
      created: "May 15, 2024",
      openCount: 7,
      timeSpent: "22m 45s",
      avgTime: "3m 15s",
      timeline: "4 weeks"
    },
    {
      id: "prop-2",
      projectTitle: "Mobile App Design",
      clientName: "TechNova Ltd.",
      amount: 850000,
      status: "Reviewing",
      created: "May 10, 2024",
      openCount: 3,
      timeSpent: "12m 10s",
      avgTime: "4m 03s",
      timeline: "6 weeks"
    },
    {
      id: "prop-3",
      projectTitle: "Brand Identity Design",
      clientName: "Greenlife NG",
      amount: 450000,
      status: "Signed",
      created: "May 8, 2024",
      openCount: 2,
      timeSpent: "8m 50s",
      avgTime: "4m 25s",
      timeline: "3 weeks"
    },
    {
      id: "prop-4",
      projectTitle: "UI/UX Design System",
      clientName: "StartupX",
      amount: 300000,
      status: "Sent",
      created: "May 3, 2024",
      openCount: 1,
      timeSpent: "2m 15s",
      avgTime: "2m 15s",
      timeline: "2 weeks"
    },
    {
      id: "prop-5",
      projectTitle: "E-commerce Website",
      clientName: "StoreHub",
      amount: 500000,
      status: "Expired",
      created: "Apr 28, 2024",
      openCount: 0,
      timeSpent: "0s",
      avgTime: "0s",
      timeline: "4 weeks"
    }
  ]);

  const [isCopied, setIsCopied] = useState(false);
  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://pricis.co/p/prop_3f2e8h2");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCreateProposal = () => {
    const scopeMap: Record<string, { title: string, amount: number, client: string }> = {
      "scope-1": { title: "Acme Corp Website Redesign", amount: 1200000, client: "Acme Corp" },
      "scope-2": { title: "Mobile App Design for TechNova", amount: 850000, client: "TechNova Ltd." },
      "scope-3": { title: "Brand Identity Design for Greenlife", amount: 450000, client: "Greenlife NG" },
    };
    const scopeInfo = scopeMap[selectedScopeId] || scopeMap["scope-1"];

    const newProposal: ProposalData = {
      id: `prop-${Date.now()}`,
      projectTitle: proposalTitle || scopeInfo.title,
      clientName: scopeInfo.client,
      amount: scopeInfo.amount,
      status: "Sent",
      created: "Today",
      openCount: 0,
      timeSpent: "0s",
      avgTime: "0s",
      timeline: "4 weeks"
    };

    setProposalsList([newProposal, ...proposalsList]);
    setWizardStep(4);
  };

  return (
    <div className="space-y-6">
      {/* ----------------- LIST VIEW ----------------- */}
      {view === "list" && (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-text-dark font-display">Proposals</h1>
              <p className="text-text-secondary text-sm font-body">Manage and track all your live proposal links in real time.</p>
            </div>
            <button 
              onClick={() => { setView("wizard"); setWizardStep(1); }}
              className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-blue transition-colors"
            >
              <Plus size={18} /> New Proposal
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Proposals", count: "24", desc: "↑ 20% vs last month", color: "text-primary" },
              { label: "Open Rate", count: "62.5%", desc: "↑ 8.3% vs last month", color: "text-[#10B981]" },
              { label: "Avg. Time to Signature", count: "5.3 days", desc: "↓ 1.2 days vs last month", color: "text-purple-500" },
              { label: "Total Value in Proposals", count: "₦8,450,000", desc: "↑ 28% vs last month", color: "text-text-dark" },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-border-light rounded-xl p-5 shadow-sm">
                <span className={`text-2xl font-bold font-display ${stat.color}`}>{stat.count}</span>
                <p className="text-sm font-semibold text-text-dark mt-1">{stat.label}</p>
                <p className="text-xs text-text-secondary mt-0.5">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Table list */}
          <div className="bg-white border border-border-light rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-border-light flex justify-between items-center gap-4">
              <input 
                type="text" 
                placeholder="Search proposals..." 
                className="bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2 outline-none w-64"
              />
              <button className="bg-white border border-border-light text-text-secondary text-xs font-semibold px-4 py-2 rounded-xl hover:bg-surface-secondary transition-colors">
                Filter
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-secondary border-b border-border-light text-text-secondary text-xs uppercase tracking-wider font-semibold">
                    <th className="p-4">Project Name</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Created</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light text-sm font-medium">
                  {proposalsList.map((prop) => (
                    <tr key={prop.id} className="hover:bg-surface-secondary/50 cursor-pointer" onClick={() => {
                      setSelectedProposal(prop);
                      setView("details");
                      setActiveDetailTab("Overview");
                    }}>
                      <td className="p-4 text-text-dark font-bold">{prop.projectTitle}</td>
                      <td className="p-4 text-text-secondary">{prop.clientName}</td>
                      <td className="p-4 text-text-dark font-bold">₦{prop.amount.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          prop.status === "Signed" ? "bg-emerald-50 text-emerald-600" :
                          prop.status === "Opened" ? "bg-green-50 text-[#10B981]" :
                          prop.status === "Reviewing" ? "bg-amber-50 text-amber-600" :
                          prop.status === "Sent" ? "bg-blue-50 text-primary" :
                          "bg-slate-100 text-text-secondary"
                        }`}>{prop.status}</span>
                      </td>
                      <td className="p-4 text-text-muted">{prop.created}</td>
                      <td className="p-4 text-text-muted hover:text-primary transition-colors">
                        <ChevronRight size={18} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ----------------- DETAILS VIEW ----------------- */}
      {view === "details" && selectedProposal && (
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-border-light">
            <button onClick={() => setView("list")} className="flex items-center gap-2 text-text-secondary hover:text-text-dark transition-colors text-sm font-semibold">
              <ArrowLeft size={16} /> Back to Proposals
            </button>
            <div className="flex gap-3 w-full sm:w-auto">
              <button 
                onClick={handleCopyLink}
                className="flex-1 sm:flex-none bg-surface-secondary border border-border-light text-text-dark hover:bg-slate-100 px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
              >
                {isCopied ? "Link Copied!" : "Copy Link"}
              </button>
              <button 
                onClick={() => setView("export")}
                className="flex-grow sm:flex-grow-0 bg-white border border-border-light text-text-dark hover:bg-slate-50 px-5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <Download size={14} /> Export
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center bg-white border border-border-light rounded-2xl p-6 shadow-sm">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold text-lg">
                AC
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-dark font-display">{selectedProposal.projectTitle}</h2>
                <p className="text-xs text-text-secondary mt-1">{selectedProposal.clientName} • Sent on {selectedProposal.created}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              selectedProposal.status === "Signed" ? "bg-emerald-50 text-emerald-600" :
              selectedProposal.status === "Opened" ? "bg-green-50 text-[#10B981]" :
              selectedProposal.status === "Sent" ? "bg-blue-50 text-primary" :
              "bg-slate-100 text-text-secondary"
            }`}>{selectedProposal.status}</span>
          </div>

          {/* Details Navigation */}
          <div className="flex border-b border-border-light">
            {(["Overview", "Analytics", "Activity", "Files"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveDetailTab(tab)}
                className={`px-6 py-3 text-xs font-bold border-b-2 transition-colors ${
                  activeDetailTab === tab 
                    ? "border-primary text-primary" 
                    : "border-transparent text-text-secondary hover:text-text-dark"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Details Content panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Tab: Overview */}
              {activeDetailTab === "Overview" && (
                <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm space-y-6">
                  <div className="bg-surface-secondary border border-border-light rounded-2xl p-8 text-center space-y-4">
                    <h1 className="text-2xl font-bold text-text-dark font-display">{selectedProposal.projectTitle}</h1>
                    <p className="text-xs text-text-secondary">Prepared for: <span className="font-bold">{selectedProposal.clientName}</span></p>
                    <div className="border-t border-border-light pt-4 max-w-md mx-auto text-xs text-left text-text-secondary leading-relaxed">
                      This proposal includes the scope of work, investment summary, project timeline, and formal terms of engagement.
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Analytics */}
              {activeDetailTab === "Analytics" && (
                <div className="space-y-6">
                  {/* Performance stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Opened", value: `${selectedProposal.openCount} times` },
                      { label: "Total Time Spent", value: selectedProposal.timeSpent },
                      { label: "Last Opened", value: "2 hours ago" },
                      { label: "Avg. Time per Visit", value: selectedProposal.avgTime },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white border border-border-light rounded-xl p-4 shadow-sm text-center">
                        <p className="text-[10px] text-text-secondary font-semibold uppercase">{stat.label}</p>
                        <p className="text-sm font-bold text-text-dark mt-1">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Section View Percentage charts */}
                  <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold text-text-dark text-sm mb-4">Sections Viewed Analysis</h3>
                    <div className="space-y-4">
                      {[
                        { section: "1. Project Overview", percent: 100 },
                        { section: "2. Deliverables", percent: 85 },
                        { section: "3. Timeline & Milestones", percent: 75 },
                        { section: "4. Investment", percent: 65 },
                        { section: "5. Terms & Conditions", percent: 40 },
                      ].map((sec, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-text-dark">{sec.section}</span>
                            <span className="text-text-secondary">{sec.percent}%</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${sec.percent}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Activity */}
              {activeDetailTab === "Activity" && (
                <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm space-y-6">
                  <h3 className="font-bold text-text-dark text-sm mb-4">Activity Timeline</h3>
                  <div className="space-y-4 relative pl-4 border-l border-border-light">
                    {[
                      { title: "Proposal signed", time: "May 18, 2024 at 4:15 PM", viewer: "Client", note: "Viewed for 4m 22s", status: "Signed" },
                      { title: "Proposal viewed", time: "May 17, 2024 at 11:05 AM", viewer: "Client", note: "Viewed for 5m 10s", status: "Opened" },
                      { title: "Proposal viewed", time: "May 16, 2024 at 2:10 PM", viewer: "Client", note: "Viewed for 3m 45s", status: "Opened" },
                      { title: "Proposal sent to client", time: "May 15, 2024 at 11:42 AM", viewer: "System", note: "" }
                    ].map((activity, i) => (
                      <div key={i} className="relative mb-6">
                        <div className="absolute -left-[22px] top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-primary flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        </div>
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <span className="text-xs font-bold text-text-dark">{activity.title}</span>
                            <p className="text-[10px] text-text-secondary mt-0.5">{activity.time} by {activity.viewer}</p>
                            {activity.note && <p className="text-[10px] text-primary font-semibold mt-1">{activity.note}</p>}
                          </div>
                          {activity.status && (
                            <span className="text-[9px] bg-slate-100 text-text-secondary font-bold px-2 py-0.5 rounded-full uppercase">
                              {activity.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Files */}
              {activeDetailTab === "Files" && (
                <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-text-dark text-sm mb-4 font-display">Attachments</h3>
                  <div className="space-y-2">
                    {[
                      { name: "AcmeCorp_BrandGuidelines.pdf", size: "2.4 MB" },
                      { name: "WebsiteRedesign_Sitemap.png", size: "850 KB" }
                    ].map((f, i) => (
                      <div key={i} className="flex justify-between items-center p-3 border border-border-light rounded-xl hover:bg-surface-secondary transition-colors">
                        <div className="flex gap-2.5 items-center">
                          <FileText size={18} className="text-primary" />
                          <span className="text-xs font-semibold text-text-dark">{f.name}</span>
                        </div>
                        <span className="text-xs text-text-secondary">{f.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right details sidebar */}
            <div className="space-y-6">
              <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm space-y-6">
                <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Proposal Summary</span>
                <div className="space-y-3.5 border-b border-border-light pb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-text-secondary">Total Value</span>
                    <span className="font-bold text-text-dark">₦{selectedProposal.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-text-secondary">Timeline</span>
                    <span className="font-bold text-text-dark">{selectedProposal.timeline}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold text-text-secondary">Valid Until</span>
                    <span className="font-bold text-text-dark">June 15, 2024</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full bg-[#EFF6FF] hover:bg-blue-100 text-[#2563EB] py-2.5 rounded-xl text-xs font-bold transition-colors">
                    Convert to Invoice
                  </button>
                  <button className="w-full bg-slate-50 hover:bg-slate-100 text-text-secondary py-2.5 rounded-xl text-xs font-bold border border-border-light transition-colors">
                    Archive Proposal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- WIZARD FLOW ----------------- */}
      {view === "wizard" && (
        <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm max-w-4xl mx-auto">
          {/* Stepper Header */}
          <div className="flex justify-between items-center mb-8 border-b border-border-light pb-4">
            <span className="font-bold text-text-dark font-display text-lg">New Proposal</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center gap-1.5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    wizardStep === step 
                      ? "bg-primary text-white" 
                      : wizardStep > step 
                      ? "bg-primary/10 text-primary" 
                      : "bg-surface-secondary text-text-muted border border-border-light"
                  }`}>
                    {wizardStep > step ? <Check size={14} /> : step}
                  </div>
                  <span className={`text-xs font-semibold hidden md:inline ${
                    wizardStep === step ? "text-primary" : "text-text-muted"
                  }`}>
                    {step === 1 ? "Choose Scope" : step === 2 ? "Customize" : step === 3 ? "Review" : "Share"}
                  </span>
                  {step < 4 && <div className="w-4 border-t border-border-light hidden md:block"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* STEP 1: Choose Scope */}
          {wizardStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-text-dark text-lg font-display mb-1">Choose a scope to create your proposal</h3>
                <p className="text-text-secondary text-sm">Select a saved scope to prefill your proposal template.</p>
              </div>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {[
                  { id: "scope-1", title: "Website Redesign for Acme Corp", client: "Acme Corp", amount: 1200000, date: "May 15, 2024", tag: "UI/UX Design" },
                  { id: "scope-2", title: "Mobile App Design for TechNova", client: "TechNova Ltd.", amount: 850000, date: "May 10, 2024", tag: "Mobile App" },
                  { id: "scope-3", title: "Brand Identity Design for Greenlife", client: "Greenlife NG", amount: 450000, date: "May 8, 2024", tag: "Brand Identity", badge: "Signed" }
                ].map((scope) => (
                  <button
                    key={scope.id}
                    onClick={() => setSelectedScopeId(scope.id)}
                    className={`w-full text-left p-4 border rounded-xl flex items-center justify-between transition-all ${
                      selectedScopeId === scope.id 
                        ? "border-primary bg-primary/5 shadow-sm" 
                        : "border-border-light bg-white hover:bg-surface-secondary/50"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-text-dark text-sm">{scope.title}</span>
                        <span className="text-[10px] bg-slate-100 text-text-secondary px-2 py-0.5 rounded-full font-bold">{scope.tag}</span>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">{scope.client} • Created on {scope.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-text-dark text-sm">₦{scope.amount.toLocaleString()}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        selectedScopeId === scope.id ? "border-primary" : "border-border-light"
                      }`}>
                        {selectedScopeId === scope.id && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between border-t border-border-light pt-6">
                <button onClick={() => setView("list")} className="px-5 py-2.5 rounded-full border border-border-light text-text-secondary text-sm font-semibold hover:bg-surface-secondary">
                  Cancel
                </button>
                <button onClick={() => setWizardStep(2)} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Customize */}
          {wizardStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-text-dark text-lg font-display mb-1">Customize your proposal</h3>
                <p className="text-text-secondary text-sm">Edit content, set pricing and payment terms.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Form fields */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Proposal Title</label>
                    <input 
                      type="text" 
                      value={proposalTitle}
                      onChange={(e) => setProposalTitle(e.target.value)}
                      className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Introduction Message</label>
                    <textarea 
                      rows={4}
                      value={introMsg}
                      onChange={(e) => setIntroMsg(e.target.value)}
                      className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-medium resize-none leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Payment Terms</label>
                    <input 
                      type="text" 
                      value={paymentTerms}
                      onChange={(e) => setPaymentTerms(e.target.value)}
                      className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-medium"
                    />
                  </div>
                </div>

                {/* Live Preview card */}
                <div className="border border-border-light rounded-2xl p-5 bg-surface-secondary flex flex-col justify-between">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-4">Live Preview</span>
                  <div className="bg-white border border-border-light rounded-xl p-4 shadow-sm text-center flex-grow flex flex-col justify-center space-y-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto text-primary text-sm font-bold">AC</div>
                    <span className="font-bold text-xs text-text-dark block line-clamp-2">{proposalTitle}</span>
                    <span className="text-[10px] text-text-secondary">Prepared for Acme Corp</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between border-t border-border-light pt-6">
                <button onClick={() => setWizardStep(1)} className="px-5 py-2.5 rounded-full border border-border-light text-text-secondary text-sm font-semibold hover:bg-surface-secondary">
                  Back
                </button>
                <button onClick={() => setWizardStep(3)} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Review */}
          {wizardStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-text-dark text-lg font-display mb-1">Review your proposal</h3>
                <p className="text-text-secondary text-sm">Make sure everything looks perfect before sending.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Proposal mock cover page */}
                <div className="md:col-span-2 border border-border-light rounded-2xl p-8 bg-surface-secondary flex flex-col justify-between text-center min-h-[300px]">
                  <div className="space-y-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary text-xl font-bold">AC</div>
                    <h2 className="text-2xl font-bold text-text-dark font-display">{proposalTitle}</h2>
                    <p className="text-xs text-text-secondary">Prepared for <span className="font-bold">Acme Corp</span> | Prepared by <span className="font-bold">Alex John</span></p>
                    <p className="text-xs text-text-muted mt-2">May 15, 2024</p>
                  </div>
                  <div className="max-w-md mx-auto text-xs text-text-secondary leading-relaxed border-t border-border-light/60 pt-4 mt-6">
                    {introMsg}
                  </div>
                </div>

                {/* Pricing and parameters summary */}
                <div className="border border-border-light rounded-2xl p-5 bg-white shadow-sm flex flex-col justify-between h-fit">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-4">Summary</span>
                  <div className="space-y-3 border-b border-border-light pb-4 mb-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-text-secondary">Total Value</span>
                      <span className="font-bold text-text-dark text-sm">₦1,200,000</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-text-secondary">Timeline</span>
                      <span className="font-bold text-text-dark">4 weeks</span>
                    </div>
                    <div className="flex justify-between items-start text-xs">
                      <span className="font-semibold text-text-secondary">Payment Terms</span>
                      <span className="font-bold text-text-dark text-right max-w-[120px]">{paymentTerms}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-text-muted leading-relaxed">
                    By clicking send, your client will receive an email containing a link to view and sign this proposal.
                  </span>
                </div>
              </div>

              <div className="flex justify-between border-t border-border-light pt-6">
                <button onClick={() => setWizardStep(2)} className="px-5 py-2.5 rounded-full border border-border-light text-text-secondary text-sm font-semibold hover:bg-surface-secondary">
                  Back
                </button>
                <button onClick={handleCreateProposal} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                  Send Proposal
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Share */}
          {wizardStep === 4 && (
            <div className="space-y-6">
              <div className="text-center py-6 space-y-2">
                <div className="w-14 h-14 bg-green-50 text-[#10B981] rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Check size={28} />
                </div>
                <h3 className="font-bold text-text-dark text-xl font-display">Share your proposal</h3>
                <p className="text-text-secondary text-xs">Your live proposal link is ready to share.</p>
              </div>

              <div className="max-w-md mx-auto space-y-6">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    readOnly
                    value="https://pricis.co/p/prop_3f2e8h2" 
                    className="flex-grow bg-surface-secondary border border-border-light text-text-dark text-xs font-semibold rounded-xl px-4 py-2.5 outline-none select-all"
                  />
                  <button 
                    onClick={handleCopyLink}
                    className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-xl text-xs font-bold transition-colors"
                  >
                    {isCopied ? "Copied" : "Copy Link"}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {["WhatsApp", "Email", "LinkedIn"].map((p) => (
                    <button 
                      key={p}
                      onClick={() => alert(`Shared via ${p}!`)}
                      className="border border-border-light p-3 rounded-xl hover:bg-surface-secondary text-xs font-bold text-text-dark text-center transition-colors"
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <div className="bg-surface-secondary border border-border-light rounded-xl p-4 flex justify-between items-center">
                  <div>
                    <span className="block text-xs font-bold text-text-dark">Track Engagement</span>
                    <span className="block text-[10px] text-text-secondary mt-0.5">Get notified when client opens the proposal</span>
                  </div>
                  <div className="w-9 h-5 bg-primary rounded-full relative p-0.5 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-border-light">
                  <button 
                    onClick={() => { setView("list"); setSelectedProposal(null); }}
                    className="flex-1 bg-white border border-border-light hover:bg-surface-secondary text-text-dark py-2.5 rounded-xl text-xs font-bold transition-colors text-center"
                  >
                    Go to Proposals
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ----------------- EXPORT DIALOG VIEW ----------------- */}
      {view === "export" && (
        <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm max-w-md mx-auto space-y-6">
          <div className="border-b border-border-light pb-4">
            <h3 className="font-bold text-text-dark text-lg font-display">Export Proposal</h3>
            <p className="text-text-secondary text-xs">Choose format to download or share</p>
          </div>

          <div className="space-y-3">
            {[
              { format: "PDF Document", desc: "Best for printing and sharing", icon: Download },
              { format: "Web Link (View Only)", desc: "Shareable link for client", icon: Share2 },
              { format: "Password-Protected PDF", desc: "Add password to protect document", icon: Lock }
            ].map((opt, i) => (
              <button 
                key={i}
                onClick={() => alert(`Exporting as ${opt.format}...`)}
                className="w-full text-left p-3.5 border border-border-light rounded-xl hover:bg-surface-secondary transition-colors flex items-center justify-between"
              >
                <div className="flex gap-3 items-center">
                  <div className="w-9 h-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                    <opt.icon size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-text-dark block">{opt.format}</span>
                    <span className="text-[10px] text-text-secondary">{opt.desc}</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-text-muted" />
              </button>
            ))}
          </div>

          <div className="flex justify-between border-t border-border-light pt-6">
            <button onClick={() => setView("list")} className="px-5 py-2.5 rounded-full border border-border-light text-text-secondary text-sm font-semibold hover:bg-surface-secondary">
              Cancel
            </button>
            <button onClick={() => { setView("list"); alert("Proposal successfully exported!"); }} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
              Export
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
