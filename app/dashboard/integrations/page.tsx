"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Plus, ArrowLeft, ArrowRight, Check, Trash2, ChevronRight, 
  Settings, Key, RefreshCw, AlertCircle, Link2, CheckCircle2, ShieldAlert, Sparkles, Search
} from "lucide-react";

interface IntegrationData {
  id: string;
  name: string;
  category: string;
  status: "Connected" | "Disconnected" | "Error";
  connectedBy: string;
  connectedOn: string;
  logo: string;
}

export default function IntegrationsPage() {
  const [view, setView] = useState<"list" | "wizard" | "details">("list");
  
  // Detail states
  const [selectedApp, setSelectedApp] = useState<IntegrationData | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<"Overview" | "Configuration" | "Activity" | "Webhooks">("Overview");
  
  // Wizard States
  const [wizardStep, setWizardStep] = useState(1);
  const [chosenApp, setChosenApp] = useState("Google Drive");
  const [connectionName, setConnectionName] = useState("Google Drive - Pricis");
  const [proposalFolder, setProposalFolder] = useState("Pricis/Proposals");
  const [invoiceFolder, setInvoiceFolder] = useState("Pricis/Invoices");
  const [autoSync, setAutoSync] = useState(true);
  const [shareFiles, setShareFiles] = useState(true);

  // Modals
  const [isTestConnectionModalOpen, setIsTestConnectionModalOpen] = useState(false);
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);
  const [isReauthorizeModalOpen, setIsReauthorizeModalOpen] = useState(false);

  const [integrationsList, setIntegrationsList] = useState<IntegrationData[]>([
    { id: "int-1", name: "Google Drive", category: "Storage", status: "Connected", connectedBy: "Alex John", connectedOn: "May 28, 2024", logo: "📁" },
    { id: "int-2", name: "Slack", category: "Communication", status: "Connected", connectedBy: "Alex John", connectedOn: "May 27, 2024", logo: "💬" },
    { id: "int-3", name: "QuickBooks", category: "Accounting", status: "Connected", connectedBy: "Alex John", connectedOn: "May 25, 2024", logo: "🏦" },
    { id: "int-4", name: "Zapier", category: "Automation", status: "Connected", connectedBy: "Alex John", connectedOn: "May 20, 2024", logo: "⚡" },
    { id: "int-5", name: "Dropbox", category: "Storage", status: "Disconnected", connectedBy: "-", connectedOn: "-", logo: "📦" },
    { id: "int-6", name: "HubSpot", category: "CRM", status: "Connected", connectedBy: "Alex John", connectedOn: "May 18, 2024", logo: "🎯" },
    { id: "int-7", name: "Mailchimp", category: "Marketing", status: "Connected", connectedBy: "Alex John", connectedOn: "May 15, 2024", logo: "🐒" },
    { id: "int-8", name: "Trello", category: "Project Management", status: "Disconnected", connectedBy: "-", connectedOn: "-", logo: "📋" }
  ]);

  const handleConnectIntegration = () => {
    // Check if it's already in the list
    const exists = integrationsList.find(i => i.name === chosenApp);
    if (exists) {
      setIntegrationsList(
        integrationsList.map(i => 
          i.name === chosenApp 
            ? { ...i, status: "Connected", connectedBy: "Alex John", connectedOn: "Today" } 
            : i
        )
      );
    } else {
      const newInt: IntegrationData = {
        id: `int-${Date.now()}`,
        name: chosenApp,
        category: "Utility",
        status: "Connected",
        connectedBy: "Alex John",
        connectedOn: "Today",
        logo: "🔌"
      };
      setIntegrationsList([...integrationsList, newInt]);
    }
    setView("list");
  };

  const handleDisconnect = () => {
    if (selectedApp) {
      setIntegrationsList(
        integrationsList.map(i => 
          i.id === selectedApp.id 
            ? { ...i, status: "Disconnected", connectedBy: "-", connectedOn: "-" } 
            : i
        )
      );
      setIsDisconnectModalOpen(false);
      setView("list");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* ----------------- LIST VIEW ----------------- */}
      {view === "list" && (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-[#0F172A] font-display">Integrations</h1>
              <p className="text-text-secondary text-sm font-body">Connect your favorite tools and automate your workflows.</p>
            </div>
            <button 
              onClick={() => { setView("wizard"); setWizardStep(1); }}
              className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-blue transition-all"
            >
              <Plus size={16} /> New Integration
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Integrations", count: "12", desc: "↑ 20% vs last month", color: "text-[#0F172A]" },
              { label: "Connected", count: "8", desc: "↑ 14% vs last month", color: "text-emerald-600" },
              { label: "Available", count: "24", desc: "—", color: "text-primary" },
              { label: "Errors", count: "2", desc: "↓ 2 vs last month", color: "text-danger" },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <span className={`text-2xl font-black font-display ${stat.color}`}>{stat.count}</span>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mt-2">{stat.label}</p>
                <p className="text-[10px] text-text-muted mt-1 font-semibold">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Table list */}
          <div className="bg-white border border-[#E5EAF2] rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-[#E5EAF2] flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-[#F8FAFC]">
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-text-muted" />
                <input 
                  type="text" 
                  placeholder="Search integrations..." 
                  className="bg-white border border-[#E5EAF2] text-text-dark text-xs rounded-xl pl-9 pr-4 py-2 outline-none w-full shadow-sm focus:border-primary transition-colors font-semibold"
                />
              </div>
              <div className="flex gap-2 text-[10px] font-bold overflow-x-auto pb-1 sm:pb-0">
                {["All", "Popular", "Storage", "Accounting", "CRM", "Marketing"].map((cat) => (
                  <button key={cat} className={`px-3.5 py-1.5 rounded-xl border transition-colors whitespace-nowrap ${
                    cat === "All" ? "bg-primary text-white border-transparent" : "bg-white border-[#E5EAF2] text-text-secondary hover:bg-slate-50"
                  }`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-body">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E5EAF2] text-text-secondary text-[10px] uppercase tracking-wider font-bold">
                    <th className="p-4">Integration</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Connected By</th>
                    <th className="p-4">Connected On</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EAF2] text-xs font-semibold">
                  {integrationsList.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => {
                      setSelectedApp(app);
                      setView("details");
                      setActiveDetailTab("Overview");
                    }}>
                      <td className="p-4 flex items-center gap-3">
                        <span className="text-2xl">{app.logo}</span>
                        <span className="font-bold text-[#0F172A]">{app.name}</span>
                      </td>
                      <td className="p-4 text-text-secondary">{app.category}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          app.status === "Connected" ? "bg-emerald-50 text-[#10B981] border-emerald-100" :
                          app.status === "Error" ? "bg-rose-50 text-danger border-rose-100 animate-pulse" :
                          "bg-slate-100 text-text-secondary border-slate-200"
                        }`}>{app.status}</span>
                      </td>
                      <td className="p-4 text-text-secondary">{app.connectedBy}</td>
                      <td className="p-4 text-text-muted">{app.connectedOn}</td>
                      <td className="p-4 text-text-muted hover:text-primary transition-colors text-right">
                        <ChevronRight size={16} className="inline" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ----------------- WIZARD FLOW ----------------- */}
      {view === "wizard" && (
        <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm max-w-2xl mx-auto animate-fade-in">
          {/* Stepper Header */}
          <div className="flex justify-between items-center mb-8 border-b border-[#E5EAF2] pb-4">
            <span className="font-bold text-[#0F172A] font-display text-lg font-semibold">New Integration</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center gap-1.5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    wizardStep === step 
                      ? "bg-primary text-white" 
                      : wizardStep > step 
                      ? "bg-primary/10 text-primary" 
                      : "bg-[#F8FAFC] text-text-muted border border-[#E5EAF2]"
                  }`}>
                    {wizardStep > step ? <Check size={13} /> : step}
                  </div>
                  <span className={`text-xs font-semibold hidden md:inline ${
                    wizardStep === step ? "text-primary" : "text-text-muted"
                  }`}>
                    {step === 1 ? "Select App" : step === 2 ? "Connect" : step === 3 ? "Configure" : "Review"}
                  </span>
                  {step < 4 && <div className="w-4 border-t border-[#E5EAF2] hidden md:block"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* STEP 1: Select App */}
          {wizardStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Choose an app to integrate with Pricis</h3>
                <p className="text-text-secondary text-sm">Select one of the popular apps below to start.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Google Drive", logo: "📁" },
                  { name: "Slack", logo: "💬" },
                  { name: "QuickBooks", logo: "🏦" },
                  { name: "Zapier", logo: "⚡" },
                  { name: "Dropbox", logo: "📦" },
                  { name: "HubSpot", logo: "🎯" },
                  { name: "Mailchimp", logo: "🐒" },
                  { name: "Trello", logo: "📋" }
                ].map((app) => (
                  <button
                    key={app.name}
                    onClick={() => { setChosenApp(app.name); setConnectionName(`${app.name} - Pricis`); }}
                    className={`border p-4 rounded-2xl flex flex-col items-center justify-center gap-2 text-center transition-all ${
                      chosenApp === app.name 
                        ? "border-primary bg-[#EFF6FF] shadow-sm" 
                        : "border-[#E5EAF2] bg-white hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-3xl">{app.logo}</span>
                    <span className="font-bold text-[#0F172A] text-xs font-display">{app.name}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-between border-t border-[#E5EAF2] pt-6">
                <button onClick={() => setView("list")} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button onClick={() => setWizardStep(2)} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Connect */}
          {wizardStep === 2 && (
            <div className="space-y-6 text-center py-4">
              <span className="text-4xl">📁</span>
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-2">Connect your {chosenApp} account</h3>
                <p className="text-text-secondary text-xs max-w-md mx-auto leading-relaxed font-semibold">
                  Pricis requires permission to access your {chosenApp} account. This allows us to sync scopes, invoices, and folders.
                </p>
              </div>

              <div className="max-w-md mx-auto border border-[#E5EAF2] rounded-2xl p-5 bg-[#F8FAFC] text-left text-xs font-semibold text-[#0F172A] space-y-2.5">
                <div className="flex gap-2 items-center">
                  <CheckCircle2 size={14} className="text-[#10B981]" />
                  <span>Store and manage proposal documents</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckCircle2 size={14} className="text-[#10B981]" />
                  <span>Access files for proposals and projects</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckCircle2 size={14} className="text-[#10B981]" />
                  <span>Save invoices and attachments</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CheckCircle2 size={14} className="text-[#10B981]" />
                  <span>Auto-backup important data</span>
                </div>
              </div>

              <div className="pt-4 max-w-sm mx-auto space-y-3">
                <button 
                  onClick={() => setWizardStep(3)}
                  className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl text-sm font-bold shadow-blue transition-colors flex items-center justify-center gap-2"
                >
                  Connect with Google
                </button>
                <span className="block text-[10px] text-text-muted mt-2 font-semibold">🔒 Your data is fully encrypted and secure.</span>
              </div>

              <div className="flex justify-between border-t border-[#E5EAF2] pt-6 mt-8">
                <button onClick={() => setWizardStep(1)} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50 transition-colors">
                  Back
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Configure */}
          {wizardStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Configure {chosenApp} Integration</h3>
                <p className="text-text-secondary text-sm">Set up how this integration will work with Pricis.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Connection Name</label>
                  <input 
                    type="text" 
                    value={connectionName}
                    onChange={(e) => setConnectionName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Default Drive</label>
                  <select className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors">
                    <option>My Drive</option>
                    <option>Shared Team Drive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Folder for Proposals</label>
                  <input 
                    type="text" 
                    value={proposalFolder}
                    onChange={(e) => setProposalFolder(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Folder for Invoices</label>
                  <input 
                    type="text" 
                    value={invoiceFolder}
                    onChange={(e) => setInvoiceFolder(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center bg-[#F8FAFC] p-4 border border-[#E5EAF2] rounded-xl font-semibold text-xs">
                  <div>
                    <span className="block font-bold text-[#0F172A]">Auto-sync new files</span>
                    <span className="block text-[10px] text-text-secondary font-medium">Automatically sync created documents to storage</span>
                  </div>
                  <div 
                    onClick={() => setAutoSync(!autoSync)}
                    className={`w-9 h-5 rounded-full relative p-0.5 cursor-pointer transition-colors ${autoSync ? "bg-primary" : "bg-slate-300"}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${autoSync ? "right-0.5" : "left-0.5"}`}></div>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-[#F8FAFC] p-4 border border-[#E5EAF2] rounded-xl font-semibold text-xs">
                  <div>
                    <span className="block font-bold text-[#0F172A]">Share files with team</span>
                    <span className="block text-[10px] text-text-secondary font-medium">Enable viewing permissions for team members</span>
                  </div>
                  <div 
                    onClick={() => setShareFiles(!shareFiles)}
                    className={`w-9 h-5 rounded-full relative p-0.5 cursor-pointer transition-colors ${shareFiles ? "bg-primary" : "bg-slate-300"}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${shareFiles ? "right-0.5" : "left-0.5"}`}></div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between border-t border-[#E5EAF2] pt-6">
                <button onClick={() => setWizardStep(2)} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50 transition-colors">
                  Back
                </button>
                <button onClick={() => setWizardStep(4)} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review */}
          {wizardStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Review and Connect</h3>
                <p className="text-text-secondary text-sm font-semibold">Please review your integration settings before completing.</p>
              </div>

              <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-2xl p-6 space-y-4 text-left">
                <div className="flex gap-4 items-center border-b border-[#E5EAF2] pb-4">
                  <span className="text-4xl">📁</span>
                  <div>
                    <span className="font-bold text-[#0F172A] text-sm block">{chosenApp} Connection</span>
                    <span className="text-[10px] text-text-secondary font-semibold">Active Drive: My Drive</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-xs font-semibold text-[#0F172A]">
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Connection Name</span>
                    <span>{connectionName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Proposals Folder</span>
                    <span>{proposalFolder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Invoices Folder</span>
                    <span>{invoiceFolder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Auto-sync New Files</span>
                    <span>{autoSync ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Share with Team</span>
                    <span>{shareFiles ? "Yes" : "No"}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between border-t border-[#E5EAF2] pt-6">
                <button onClick={() => setWizardStep(3)} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50 transition-colors">
                  Back
                </button>
                <button onClick={handleConnectIntegration} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                  Connect Integration
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ----------------- DETAILS VIEW ----------------- */}
      {view === "details" && selectedApp && (
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-[#E5EAF2]">
            <button onClick={() => setView("list")} className="flex items-center gap-2 text-text-secondary hover:text-[#0F172A] transition-colors text-sm font-bold">
              <ArrowLeft size={16} /> Back to Integrations
            </button>
            
            <div className="flex gap-2 w-full sm:w-auto">
              <button 
                onClick={() => setIsTestConnectionModalOpen(true)}
                className="bg-white border border-[#E5EAF2] text-[#0F172A] hover:bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold transition-colors flex-1 sm:flex-none"
              >
                Test Connection
              </button>
              <button 
                onClick={() => setIsReauthorizeModalOpen(true)}
                className="bg-white border border-[#E5EAF2] text-[#0F172A] hover:bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold transition-colors flex-1 sm:flex-none"
              >
                Reauthorize
              </button>
              <button 
                onClick={() => setIsDisconnectModalOpen(true)}
                className="bg-red-50 hover:bg-red-100 text-danger border border-red-100 px-4 py-2 rounded-xl text-xs font-bold transition-colors flex-1 sm:flex-none"
              >
                Disconnect
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm">
            <span className="text-4xl">{selectedApp.logo}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#0F172A] font-display">{selectedApp.name}</h2>
                <span className="bg-emerald-50 text-[#10B981] border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Connected</span>
              </div>
              <p className="text-xs text-text-secondary mt-1 font-semibold">Connected by {selectedApp.connectedBy} • {selectedApp.connectedOn}</p>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-[#E5EAF2]">
            {(["Overview", "Configuration", "Activity", "Webhooks"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveDetailTab(tab)}
                className={`px-6 py-3 text-xs font-bold border-b-2 transition-colors ${
                  activeDetailTab === tab 
                    ? "border-primary text-primary" 
                    : "border-transparent text-text-secondary hover:text-[#0F172A]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Tab: Overview */}
              {activeDetailTab === "Overview" && (
                <div className="space-y-6">
                  {/* Grid numbers */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Files Synced", count: "128" },
                      { label: "Storage Used", count: "2.4 GB" },
                      { label: "Last Sync", count: "2 min ago" },
                      { label: "Status", count: "Healthy", color: "text-[#10B981]" }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white border border-[#E5EAF2] rounded-xl p-4 shadow-sm text-center">
                        <span className={`text-xl font-bold font-display ${stat.color}`}>{stat.count}</span>
                        <p className="text-[10px] text-text-secondary font-bold uppercase mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Overview details */}
                  <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-[#0F172A] text-sm font-display">Overview</h3>
                    <p className="text-xs text-text-secondary leading-relaxed font-semibold">
                      Google Drive integration allows you to store and manage files seamlessly. All generated proposals, contracts and invoices are automatically uploaded and organized.
                    </p>
                    <div className="border-t border-[#E5EAF2] pt-4 space-y-3">
                      <span className="block text-xs font-bold text-text-secondary uppercase">Permissions Granted</span>
                      {[
                        "View and manage files in Google Drive",
                        "Create and upload files",
                        "View folders and file metadata"
                      ].map((perm, i) => (
                        <div key={i} className="flex gap-2 items-center text-xs font-semibold text-[#0F172A]">
                          <CheckCircle2 size={14} className="text-[#10B981]" />
                          <span>{perm}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Configuration */}
              {activeDetailTab === "Configuration" && (
                <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-5">
                  <h3 className="font-bold text-[#0F172A] text-sm font-display mb-4">Configuration Settings</h3>
                  {[
                    { label: "Connection Name", value: connectionName },
                    { label: "Default Drive", value: "My Drive" },
                    { label: "Folder for Proposals", value: proposalFolder },
                    { label: "Folder for Invoices", value: invoiceFolder },
                    { label: "File Upload Preference", value: "PDF & Original Formats" }
                  ].map((config, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-[#E5EAF2] last:border-0 font-semibold text-xs text-[#0F172A]">
                      <div>
                        <span className="text-[10px] font-bold text-text-secondary uppercase">{config.label}</span>
                        <p className="text-xs font-bold text-[#0F172A] mt-0.5">{config.value}</p>
                      </div>
                      <button className="bg-white border border-[#E5EAF2] text-[#0F172A] hover:bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors">
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Activity */}
              {activeDetailTab === "Activity" && (
                <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-[#0F172A] text-sm font-display mb-4">Integration Activity</h3>
                  <div className="space-y-4">
                    {[
                      { event: "File created", details: "Proposal_ABC_2024.pdf", date: "May 31, 2024 10:30 AM", status: "Success" },
                      { event: "File updated", details: "Invoice_INV-2024-0012.pdf", date: "May 31, 2024 09:15 AM", status: "Success" },
                      { event: "File deleted", details: "Old_Proposal.pdf", date: "May 30, 2024 04:45 PM", status: "Success" },
                      { event: "Permission changed", details: "Shared with ruth.alex@gmail.com", date: "May 30, 2024 03:20 PM", status: "Success" },
                      { event: "File created", details: "Contract_ABC_2024.pdf", date: "May 30, 2024 11:05 AM", status: "Success" },
                    ].map((act, i) => (
                      <div key={i} className="flex justify-between items-start pb-4 border-b border-[#E5EAF2] last:border-0 last:pb-0 text-xs font-semibold">
                        <div>
                          <span className="text-[#0F172A] block">{act.event}</span>
                          <span className="text-text-secondary font-normal block mt-0.5">{act.details}</span>
                          <span className="text-[10px] text-text-muted font-normal block mt-1">{act.date}</span>
                        </div>
                        <span className="bg-green-50 text-[#10B981] border border-green-100 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                          {act.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Webhooks */}
              {activeDetailTab === "Webhooks" && (
                <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-6">
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-sm font-display mb-1">Webhooks</h3>
                    <p className="text-text-secondary text-xs font-semibold">Get real-time updates when events happen in {selectedApp.name}.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Webhook URL</span>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          readOnly
                          value="https://api.pricis.co/v1/integrations/google-drive/webhook" 
                          className="flex-grow bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs font-semibold rounded-xl px-4 py-2.5 outline-none select-all"
                        />
                        <button className="bg-white border border-[#E5EAF2] text-[#0F172A] px-4 py-2.5 rounded-xl text-xs font-bold transition-colors">
                          Copy
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-[#E5EAF2] pt-4 space-y-3">
                      <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Events Trigger</span>
                      {[
                        { name: "File created", checked: true },
                        { name: "File updated", checked: true },
                        { name: "File deleted", checked: false },
                        { name: "Permission changed", checked: false },
                      ].map((evt, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={evt.checked}
                            onChange={() => {}}
                            className="rounded text-primary focus:ring-primary h-4 w-4"
                          />
                          <span className="text-xs font-semibold text-[#0F172A]">{evt.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Test Connection Modal */}
      {isTestConnectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-lg border border-[#E5EAF2] relative animate-dropdown text-left">
            <h3 className="font-bold text-[#0F172A] text-lg font-display mb-2">Test Connection</h3>
            <p className="text-text-secondary text-xs mb-4">Verifying your integration connection...</p>
            
            <div className="space-y-3.5 mb-6 text-xs font-semibold text-[#0F172A]">
              {[
                "Authentication", "Access Permissions", "Data Sync", "Webhook Delivery"
              ].map((test, i) => (
                <div key={i} className="flex justify-between items-center border-b border-[#E5EAF2] pb-2.5">
                  <span>{test}</span>
                  <span className="text-[#10B981] font-bold">✓ Success</span>
                </div>
              ))}
            </div>

            <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center mb-6">
              <span className="text-xs font-bold text-[#10B981] block font-display">All tests passed successfully!</span>
              <span className="text-[10px] text-[#10B981]/80 block mt-0.5 font-semibold">Your integration is working perfectly.</span>
            </div>

            <button 
              onClick={() => setIsTestConnectionModalOpen(false)}
              className="w-full bg-primary hover:bg-primary-hover text-white py-2.5 rounded-xl text-xs font-bold transition-colors shadow-blue"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Disconnect Modal */}
      {isDisconnectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-lg border border-[#E5EAF2] relative animate-dropdown text-center space-y-4">
            <ShieldAlert size={40} className="text-danger mx-auto" />
            <div>
              <h3 className="font-bold text-[#0F172A] text-lg font-display">Disconnect Integration</h3>
              <p className="text-text-secondary text-xs mt-1.5 leading-relaxed font-semibold">
                Are you sure you want to disconnect {selectedApp?.name}? This will stop automatic backups and syncing.
              </p>
            </div>
            
            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => setIsDisconnectModalOpen(false)}
                className="flex-1 bg-white border border-[#E5EAF2] hover:bg-slate-50 text-[#0F172A] py-2.5 rounded-xl text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDisconnect}
                className="flex-1 bg-danger hover:bg-red-600 text-white py-2.5 rounded-xl text-xs font-bold transition-colors"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reauthorize Modal */}
      {isReauthorizeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-lg border border-[#E5EAF2] relative animate-dropdown text-center space-y-4">
            <RefreshCw size={40} className="text-primary mx-auto animate-spin" />
            <div>
              <h3 className="font-bold text-[#0F172A] text-lg font-display">Reauthorize Connection</h3>
              <p className="text-text-secondary text-xs mt-1.5 leading-relaxed font-semibold">
                Your session or token may have expired. Please re-authorize to restore sync permissions.
              </p>
            </div>
            
            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => setIsReauthorizeModalOpen(false)}
                className="flex-1 bg-white border border-[#E5EAF2] hover:bg-slate-50 text-[#0F172A] py-2.5 rounded-xl text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => { setIsReauthorizeModalOpen(false); alert("Connection reauthorized successfully!"); }}
                className="flex-1 bg-primary hover:bg-primary-hover text-white py-2.5 rounded-xl text-xs font-bold transition-colors shadow-blue"
              >
                Reauthorize
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
