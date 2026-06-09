"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Plus, ArrowLeft, ArrowRight, Check, ChevronRight, BarChart2, 
  Calendar, Eye, CheckCircle2, FileText, Download, Clock, Sparkles
} from "lucide-react";

interface ReportData {
  id: string;
  name: string;
  type: string;
  createdBy: string;
  lastRun: string;
  schedule: string;
  status: "Success" | "Pending" | "Error";
}

export default function AnalyticsPage() {
  const [view, setView] = useState<"dashboard" | "reports" | "report_details" | "wizard">("dashboard");
  
  // Wizard States
  const [wizardStep, setWizardStep] = useState(1);
  const [reportName, setReportName] = useState("Monthly Revenue Report");
  const [reportDesc, setReportDesc] = useState("Overview of revenue, deals, and performance metrics for the selected period.");
  const [reportType, setReportType] = useState("Custom Report");
  const [reportRange, setReportRange] = useState("This Month");
  const [frequency, setFrequency] = useState("Monthly");
  const [deliveryDay, setDeliveryDay] = useState("1st");
  const [deliveryTime, setDeliveryTime] = useState("09:00 AM");

  // Detail States
  const [activeReportTab, setActiveReportTab] = useState<"Overview" | "Revenue" | "Clients" | "Services" | "Activity">("Overview");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // List data
  const [reportsList, setReportsList] = useState<ReportData[]>([
    { id: "rep-1", name: "Monthly Revenue Report", type: "Custom", createdBy: "Alex John", lastRun: "May 31, 2024", schedule: "Monthly", status: "Success" },
    { id: "rep-2", name: "Sales Pipeline Report", type: "Custom", createdBy: "Alex John", lastRun: "May 31, 2024", schedule: "Weekly", status: "Success" },
    { id: "rep-3", name: "Client Performance Report", type: "Custom", createdBy: "Alex John", lastRun: "May 30, 2024", schedule: "Monthly", status: "Success" },
    { id: "rep-4", name: "Service Performance Report", type: "Custom", createdBy: "Alex John", lastRun: "May 28, 2024", schedule: "Monthly", status: "Success" },
    { id: "rep-5", name: "Team Performance Report", type: "Custom", createdBy: "Alex John", lastRun: "May 27, 2024", schedule: "Off", status: "Success" },
  ]);

  const handleCreateReport = () => {
    const newReport: ReportData = {
      id: `rep-${Date.now()}`,
      name: reportName,
      type: "Custom",
      createdBy: "Alex John",
      lastRun: "Today",
      schedule: frequency,
      status: "Success"
    };
    setReportsList([newReport, ...reportsList]);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* ----------------- DASHBOARD VIEW ----------------- */}
      {view === "dashboard" && (
        <>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-text-dark font-display">Analytics</h1>
              <p className="text-text-secondary text-sm font-body">Track performance, analyze trends, and make data-driven decisions.</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setView("reports")}
                className="bg-white border border-border-light text-text-dark px-4 py-2 rounded-xl text-xs font-semibold hover:bg-surface-secondary transition-colors shadow-sm"
              >
                Reports List
              </button>
              <button className="bg-white border border-border-light text-text-dark px-4 py-2 rounded-xl text-xs font-semibold hover:bg-surface-secondary transition-colors shadow-sm flex items-center gap-1.5">
                <Calendar size={14} /> May 1 - May 31, 2024
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Revenue", count: "₦2,450,000", desc: "↑ 28% vs Apr 1 - Apr 30", color: "text-text-dark" },
              { label: "Won Deals", count: "24", desc: "↑ 33% vs Apr 1 - Apr 30", color: "text-[#10B981]" },
              { label: "Conversion Rate", count: "16.7%", desc: "↑ 4.2% vs Apr 1 - Apr 30", color: "text-primary" },
              { label: "Avg. Deal Value", count: "₦102,083", desc: "↓ 6% vs Apr 1 - Apr 30", color: "text-danger" },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-border-light rounded-xl p-5 shadow-sm">
                <span className={`text-2xl font-bold font-display ${stat.color}`}>{stat.count}</span>
                <p className="text-sm font-semibold text-text-dark mt-1">{stat.label}</p>
                <p className="text-xs text-text-secondary mt-0.5">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Main Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Over Time Line Chart */}
            <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm lg:col-span-2 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-text-dark text-base font-display">Revenue Over Time</h3>
                <select className="bg-surface-secondary border border-border-light text-text-secondary text-xs rounded-lg px-2 py-1 outline-none font-semibold">
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </div>
              <div className="h-48 w-full relative">
                {/* SVG mock line chart */}
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  {/* Grid lines */}
                  <line x1="0" y1="20" x2="100" y2="20" stroke="#f1f5f9" strokeWidth="0.5" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#f1f5f9" strokeWidth="0.5" />
                  <line x1="0" y1="80" x2="100" y2="80" stroke="#f1f5f9" strokeWidth="0.5" />
                  
                  {/* Revenue Line (current period) */}
                  <path d="M 0 85 C 20 80, 40 45, 60 70 C 80 50, 90 20, 100 15" fill="none" stroke="#2563EB" strokeWidth="3" />
                  <circle cx="100" cy="15" r="3" fill="#2563EB" />
                  
                  {/* Previous period line */}
                  <path d="M 0 90 C 20 85, 40 65, 60 80 C 80 60, 90 40, 100 35" fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="3" />
                </svg>
                <div className="flex justify-between text-[10px] font-bold text-text-muted mt-2">
                  <span>May 1</span>
                  <span>May 6</span>
                  <span>May 11</span>
                  <span>May 16</span>
                  <span>May 21</span>
                  <span>May 26</span>
                  <span>May 31</span>
                </div>
              </div>
              <div className="flex gap-4 text-xs font-semibold mt-4">
                <div className="flex items-center gap-1.5 text-primary">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                  <span>Revenue (₦)</span>
                </div>
                <div className="flex items-center gap-1.5 text-text-muted">
                  <div className="w-2.5 h-2.5 rounded-full bg-text-muted"></div>
                  <span>Revenue (₦) (Previous 31 days)</span>
                </div>
              </div>
            </div>

            {/* Pipeline Overview Donut Chart */}
            <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-text-dark text-base font-display">Pipeline Overview</h3>
              </div>
              <div className="flex items-center justify-center relative h-36">
                <svg viewBox="0 0 36 36" className="w-32 h-32 transform -rotate-90">
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#F1F5F9" strokeWidth="3.5" />
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#3B82F6" strokeWidth="3.5" strokeDasharray="35 65" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#a855f7" strokeWidth="3.5" strokeDasharray="25 75" strokeDashoffset="-35" />
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#eab308" strokeWidth="3.5" strokeDasharray="20 80" strokeDashoffset="-60" />
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#10B981" strokeWidth="3.5" strokeDasharray="15 85" strokeDashoffset="-80" />
                  <circle cx="18" cy="18" r="15.9155" fill="none" stroke="#ef4444" strokeWidth="3.5" strokeDasharray="5 95" strokeDashoffset="-95" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-text-dark font-display leading-none">54</span>
                  <span className="text-[10px] text-text-secondary font-semibold mt-1">Total Deals</span>
                </div>
              </div>
              <div className="space-y-1.5 text-[11px] font-semibold text-text-secondary pt-4 border-t border-border-light/60">
                <div className="flex justify-between"><span>Scopes Generated</span><span className="font-bold text-text-dark">35 (20.3%)</span></div>
                <div className="flex justify-between"><span>Proposals Sent</span><span className="font-bold text-text-dark">16 (25.5%)</span></div>
                <div className="flex justify-between"><span>Opened</span><span className="font-bold text-text-dark">10 (12.8%)</span></div>
                <div className="flex justify-between"><span>Signed</span><span className="font-bold text-text-dark">5 (9.5%)</span></div>
                <div className="flex justify-between"><span>Paid</span><span className="font-bold text-text-dark">4 (6.4%)</span></div>
              </div>
            </div>
          </div>

          {/* Third Row tables */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top Services */}
            <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-text-dark text-sm font-display mb-4">Top Services by Revenue</h3>
              <div className="space-y-3">
                {[
                  { name: "UI/UX Design", value: "₦750,000" },
                  { name: "Web Development", value: "₦500,000" },
                  { name: "Brand Design", value: "₦300,000" },
                  { name: "Mobile App Design", value: "₦250,000" },
                  { name: "SEO & Content", value: "₦100,000" }
                ].map((s, i) => (
                  <div key={i} className="flex justify-between items-center text-xs font-semibold text-text-dark">
                    <span>{s.name}</span>
                    <span>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue by Client */}
            <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-text-dark text-sm font-display mb-4">Revenue by Client</h3>
              <div className="space-y-3">
                {[
                  { name: "Acme Corp", value: "₦1,200,000" },
                  { name: "TechNova Ltd.", value: "₦950,000" },
                  { name: "Greenlife NG", value: "₦750,000" },
                  { name: "StoreHub", value: "₦500,000" },
                  { name: "StartupX", value: "₦300,000" }
                ].map((c, i) => (
                  <div key={i} className="flex justify-between items-center text-xs font-semibold text-text-dark">
                    <span>{c.name}</span>
                    <span>{c.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deals by Status */}
            <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-text-dark text-sm font-display mb-4">Deals by Status</h3>
              <div className="space-y-3">
                {[
                  { name: "In Progress", count: 16 },
                  { name: "Under Review", count: 14 },
                  { name: "Pending Client", count: 10 },
                  { name: "Completed", count: 8 },
                  { name: "Overdue", count: 4 }
                ].map((d, i) => (
                  <div key={i} className="flex justify-between items-center text-xs font-semibold text-text-dark">
                    <span>{d.name}</span>
                    <span>{d.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ----------------- REPORTS LIST VIEW ----------------- */}
      {view === "reports" && (
        <>
          <div className="flex justify-between items-center border-b border-border-light pb-4">
            <button onClick={() => setView("dashboard")} className="flex items-center gap-2 text-text-secondary hover:text-text-dark transition-colors text-sm font-semibold">
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
            <button 
              onClick={() => { setView("wizard"); setWizardStep(1); }}
              className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-blue transition-colors animate-pulse"
            >
              <Plus size={18} /> New Report
            </button>
          </div>

          <div className="bg-white border border-border-light rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-border-light bg-surface-secondary/50">
              <input 
                type="text" 
                placeholder="Search reports..." 
                className="bg-white border border-border-light text-text-dark text-sm rounded-xl px-4 py-2 outline-none w-64 shadow-sm"
              />
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-secondary border-b border-border-light text-text-secondary text-xs uppercase tracking-wider font-semibold">
                    <th className="p-4">Report Name</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Created By</th>
                    <th className="p-4">Last Run</th>
                    <th className="p-4">Schedule</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light text-sm font-medium">
                  {reportsList.map((rep) => (
                    <tr key={rep.id} className="hover:bg-surface-secondary/50 cursor-pointer" onClick={() => {
                      setView("report_details");
                      setReportName(rep.name);
                      setFrequency(rep.schedule);
                    }}>
                      <td className="p-4 text-text-dark font-bold">{rep.name}</td>
                      <td className="p-4 text-text-secondary">{rep.type}</td>
                      <td className="p-4 text-text-secondary">{rep.createdBy}</td>
                      <td className="p-4 text-text-muted">{rep.lastRun}</td>
                      <td className="p-4 text-text-dark font-bold">{rep.schedule}</td>
                      <td className="p-4">
                        <span className="bg-green-50 text-[#10B981] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                          {rep.status}
                        </span>
                      </td>
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

      {/* ----------------- REPORT DETAILS VIEW ----------------- */}
      {view === "report_details" && (
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-border-light">
            <button onClick={() => setView("reports")} className="flex items-center gap-2 text-text-secondary hover:text-text-dark transition-colors text-sm font-semibold">
              <ArrowLeft size={16} /> Back to Reports
            </button>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsExportModalOpen(true)}
                className="bg-white border border-border-light text-text-dark hover:bg-slate-50 px-5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <Download size={14} /> Export
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center bg-white border border-border-light rounded-2xl p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-text-dark font-display">{reportName}</h2>
              <p className="text-xs text-[#10B981] font-semibold mt-1">✓ Scheduled {frequency}</p>
            </div>
            <span className="bg-green-50 text-[#10B981] text-[10px] font-bold px-3 py-1 rounded-full uppercase">Success</span>
          </div>

          {/* Details Navigation */}
          <div className="flex border-b border-border-light">
            {(["Overview", "Revenue", "Clients", "Services", "Activity"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveReportTab(tab)}
                className={`px-6 py-3 text-xs font-bold border-b-2 transition-colors ${
                  activeReportTab === tab 
                    ? "border-primary text-primary" 
                    : "border-transparent text-text-secondary hover:text-text-dark"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Tab: Overview */}
              {activeReportTab === "Overview" && (
                <div className="space-y-6">
                  {/* Mini Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Total Revenue", value: "₦2,450,000", change: "↑ 28% vs Apr 1 - Apr 30", color: "text-text-dark" },
                      { label: "Won Deals", value: "24", change: "↑ 33% vs Apr 1 - Apr 30", color: "text-[#10B981]" },
                      { label: "Avg Deal Value", value: "₦102,083", change: "↓ 6% vs Apr 1 - Apr 30", color: "text-danger" },
                      { label: "Conversion Rate", value: "16.7%", change: "↑ 4.2% vs Apr 1 - Apr 30", color: "text-primary" }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white border border-border-light rounded-xl p-4 shadow-sm text-center">
                        <span className={`text-lg font-bold font-display ${stat.color}`}>{stat.value}</span>
                        <p className="text-[10px] text-text-secondary font-bold uppercase mt-1">{stat.label}</p>
                        <p className="text-[9px] text-text-muted mt-0.5">{stat.change}</p>
                      </div>
                    ))}
                  </div>

                  {/* Revenue over time SVG mock */}
                  <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-text-dark text-sm font-display">Revenue Over Time</h3>
                    <div className="h-40 w-full relative">
                      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d="M 0 85 C 20 80, 40 45, 60 70 C 80 50, 90 20, 100 15" fill="none" stroke="#2563EB" strokeWidth="3" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {activeReportTab !== "Overview" && (
                <div className="bg-white border border-border-light rounded-2xl p-10 shadow-sm text-center">
                  <BarChart2 size={40} className="text-text-muted mx-auto mb-2" />
                  <h4 className="font-bold text-sm text-text-dark mb-1">{activeReportTab} Report Section</h4>
                  <p className="text-xs text-text-secondary">Fully compiled data is ready for export.</p>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ----------------- WIZARD FLOW ----------------- */}
      {view === "wizard" && (
        <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm max-w-2xl mx-auto">
          {/* Stepper Header */}
          <div className="flex justify-between items-center mb-8 border-b border-border-light pb-4">
            <span className="font-bold text-text-dark font-display text-lg">New Report</span>
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
                    {step === 1 ? "Details" : step === 2 ? "Metrics" : step === 3 ? "Schedule" : "Preview"}
                  </span>
                  {step < 4 && <div className="w-4 border-t border-border-light hidden md:block"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* STEP 1: Details */}
          {wizardStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-text-dark text-lg font-display mb-1">Tell us about your report</h3>
                <p className="text-text-secondary text-sm">Add basic information to get started.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Report Name</label>
                  <input 
                    type="text" 
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Description</label>
                  <textarea 
                    rows={4}
                    value={reportDesc}
                    onChange={(e) => setReportDesc(e.target.value)}
                    className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-medium resize-none leading-relaxed"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Report Type</label>
                    <select 
                      value={reportType}
                      onChange={(e) => setReportType(e.target.value)}
                      className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer"
                    >
                      <option>Custom Report</option>
                      <option>Financial Report</option>
                      <option>Project Metrics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Date Range</label>
                    <select 
                      value={reportRange}
                      onChange={(e) => setReportRange(e.target.value)}
                      className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer"
                    >
                      <option>This Month</option>
                      <option>Last 30 Days</option>
                      <option>This Quarter</option>
                      <option>This Year</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-between border-t border-border-light pt-6">
                <button onClick={() => setView("reports")} className="px-5 py-2.5 rounded-full border border-border-light text-text-secondary text-sm font-semibold hover:bg-surface-secondary">
                  Cancel
                </button>
                <button onClick={() => setWizardStep(2)} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Metrics */}
          {wizardStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-text-dark text-lg font-display mb-1">Select metrics</h3>
                <p className="text-text-secondary text-sm">Choose the metrics you want to include in your report.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Revenue Metrics */}
                <div className="space-y-3">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider border-b border-border-light pb-2">Revenue Metrics</span>
                  {[
                    "Total Revenue", "Average Deal Value", "Revenue Growth"
                  ].map((m) => (
                    <label key={m} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary h-4 w-4" />
                      <span className="text-xs font-semibold text-text-dark">{m}</span>
                    </label>
                  ))}
                </div>

                {/* Deal Metrics */}
                <div className="space-y-3">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider border-b border-border-light pb-2">Deal Metrics</span>
                  {[
                    "Total Deals", "Won Deals", "Lost Deals", "Conversion Rate"
                  ].map((m) => (
                    <label key={m} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded text-primary focus:ring-primary h-4 w-4" />
                      <span className="text-xs font-semibold text-text-dark">{m}</span>
                    </label>
                  ))}
                </div>

                {/* Time Metrics */}
                <div className="space-y-3">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider border-b border-border-light pb-2">Time Metrics</span>
                  {[
                    "Avg. Sales Cycle", "Time to Close", "Time to First Response"
                  ].map((m) => (
                    <label key={m} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary h-4 w-4" />
                      <span className="text-xs font-semibold text-text-dark">{m}</span>
                    </label>
                  ))}
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

          {/* STEP 3: Schedule */}
          {wizardStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-text-dark text-lg font-display mb-1">Schedule report</h3>
                <p className="text-text-secondary text-sm">Automate this report to receive it on a recurring basis.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Frequency</label>
                  <select 
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer"
                  >
                    <option>Monthly</option>
                    <option>Weekly</option>
                    <option>Daily</option>
                    <option>Off</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Day of Month</label>
                  <select 
                    value={deliveryDay}
                    onChange={(e) => setDeliveryDay(e.target.value)}
                    className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer"
                  >
                    <option>1st</option>
                    <option>15th</option>
                    <option>Last day</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Time</label>
                  <select 
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                    className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer"
                  >
                    <option>09:00 AM</option>
                    <option>12:00 PM</option>
                    <option>05:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between border-t border-border-light pt-6">
                <button onClick={() => setWizardStep(2)} className="px-5 py-2.5 rounded-full border border-border-light text-text-secondary text-sm font-semibold hover:bg-surface-secondary">
                  Back
                </button>
                <button onClick={() => setWizardStep(4)} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Preview */}
          {wizardStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-text-dark text-lg font-display mb-1">Preview your report</h3>
                <p className="text-text-secondary text-sm">Review how your report will look.</p>
              </div>

              <div className="bg-surface-secondary border border-border-light rounded-2xl p-6 space-y-4">
                <div className="border-b border-border-light/60 pb-4">
                  <h4 className="font-bold text-text-dark text-base">{reportName}</h4>
                  <p className="text-xs text-text-secondary mt-1">{reportDesc}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-text-dark">
                  <div>
                    <span className="text-text-secondary block">Report Type</span>
                    <span>{reportType}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary block">Schedule</span>
                    <span>{frequency === "Off" ? "Manual" : `${frequency} on the ${deliveryDay} at ${deliveryTime}`}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between border-t border-border-light pt-6">
                <button onClick={() => setWizardStep(3)} className="px-5 py-2.5 rounded-full border border-border-light text-text-secondary text-sm font-semibold hover:bg-surface-secondary">
                  Back
                </button>
                <button onClick={handleCreateReport} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                  Create Report
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-lg border border-border-light text-center space-y-4 animate-dropdown">
            <div className="w-12 h-12 bg-green-50 text-[#10B981] rounded-full flex items-center justify-center mx-auto">
              <Check size={24} />
            </div>
            <div>
              <h3 className="font-bold text-text-dark text-lg font-display">Report Scheduled!</h3>
              <p className="text-text-secondary text-xs mt-1.5 leading-relaxed">
                You will receive your &quot;{reportName}&quot; on the {deliveryDay} of every month at {deliveryTime} (WAT).
              </p>
            </div>
            <button 
              onClick={() => { setIsSuccessModalOpen(false); setView("reports"); }}
              className="w-full bg-primary hover:bg-primary-hover text-white py-2.5 rounded-xl text-xs font-bold transition-colors"
            >
              Go to Reports
            </button>
          </div>
        </div>
      )}

      {/* Export Format Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-lg border border-border-light relative animate-dropdown">
            <h3 className="font-bold text-text-dark text-lg font-display mb-2">Export Report</h3>
            <p className="text-text-secondary text-xs mb-4">Choose format to download</p>
            
            <div className="space-y-2.5 mb-6">
              {[
                { format: "PDF Document", desc: "Best for printing and sharing" },
                { format: "Excel Spreadsheet", desc: "Best for data analysis" },
                { format: "CSV (Comma Separated Values)", desc: "Raw data format" }
              ].map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => { setIsExportModalOpen(false); alert(`Exporting report as ${opt.format}...`); }}
                  className="w-full text-left p-3 border border-border-light rounded-xl hover:bg-surface-secondary transition-colors"
                >
                  <span className="text-xs font-bold text-text-dark block">{opt.format}</span>
                  <span className="text-[10px] text-text-secondary">{opt.desc}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={() => setIsExportModalOpen(false)}
              className="w-full bg-white border border-border-light hover:bg-surface-secondary text-text-dark py-2.5 rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
