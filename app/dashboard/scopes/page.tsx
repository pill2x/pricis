"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Plus, Target, FileText, ArrowLeft, ArrowRight, Copy, 
  ExternalLink, Check, Trash2, Calendar, FileCheck, CheckCircle2, ChevronRight, Eye
} from "lucide-react";

interface ScopeData {
  id: string;
  projectTitle: string;
  clientName: string;
  amount: number;
  status: string;
  created: string;
  service: string;
  relationship: string;
  businessSize: string;
  urgency: string;
  commStyle: string;
  description: string;
  revisions: string;
  timeline: string;
  deliverables: string[];
  pricingTier: string;
}

export default function ScopesPage() {
  const [view, setView] = useState<"list" | "wizard" | "details" | "client_view" | "invoice">("list");
  
  // Wizard States
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedService, setSelectedService] = useState("Web Development");
  const [clientRelationship, setClientRelationship] = useState("New Client");
  const [businessSize, setBusinessSize] = useState("Solo Founder");
  const [urgency, setUrgency] = useState("Normal");
  const [commStyle, setCommStyle] = useState("Friendly");
  
  const [projectTitle, setProjectTitle] = useState("Website Redesign for Acme Corp");
  const [projectDesc, setProjectDesc] = useState("Acme Corp needs a modern, conversion-focused website that reflects their brand, showcases their services and improves user experience across all devices.");
  const [revisions, setRevisions] = useState("2 included revisions");
  const [timeline, setTimeline] = useState("4 weeks");
  const [deliverables, setDeliverables] = useState([
    "Landing Page Design", "About Us Page", "Services Page", 
    "Blog Page", "Contact Page", "CMS Integration"
  ]);
  const [newDeliverable, setNewDeliverable] = useState("");
  const [pricingTier, setPricingTier] = useState("Standard");
  const [pricingAmount, setPricingAmount] = useState(500000);

  // Detail view states
  const [activeDetailTab, setActiveDetailTab] = useState("Overview");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // List data
  const [scopesList, setScopesList] = useState<ScopeData[]>([
    {
      id: "scope-1",
      projectTitle: "Acme Corp Website Redesign",
      clientName: "Acme Corp",
      amount: 600000,
      status: "Viewed",
      created: "May 12, 2024",
      service: "Web Development",
      relationship: "New Client",
      businessSize: "Solo Founder",
      urgency: "Normal",
      commStyle: "Friendly",
      description: "Acme Corp needs a modern, conversion-focused website.",
      revisions: "2 included revisions",
      timeline: "4 weeks",
      deliverables: ["Landing Page", "About Us", "Contact"],
      pricingTier: "Standard"
    },
    {
      id: "scope-2",
      projectTitle: "Mobile App Design",
      clientName: "KudaTech",
      amount: 750000,
      status: "Sent",
      created: "May 10, 2024",
      service: "UI/UX Design",
      relationship: "Returning Client",
      businessSize: "Startup",
      urgency: "Fast",
      commStyle: "Formal",
      description: "Mobile App mockup and UI system design.",
      revisions: "3 included revisions",
      timeline: "6 weeks",
      deliverables: ["App Mockups", "UI Library", "Prototype"],
      pricingTier: "Premium"
    },
    {
      id: "scope-3",
      projectTitle: "Brand Identity Design",
      clientName: "Greenlife NG",
      amount: 450000,
      status: "Draft",
      created: "May 8, 2024",
      service: "Brand Design",
      relationship: "New Client",
      businessSize: "Small Business",
      urgency: "Normal",
      commStyle: "Corporate",
      description: "Logo design, color guidelines, and brand assets.",
      revisions: "1 included revision",
      timeline: "3 weeks",
      deliverables: ["Logo", "Color Guidelines", "Assets"],
      pricingTier: "Conservative"
    }
  ]);

  const addDeliverable = () => {
    if (newDeliverable.trim()) {
      setDeliverables([...deliverables, newDeliverable.trim()]);
      setNewDeliverable("");
    }
  };

  const removeDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const handleCreateScope = () => {
    const newScope: ScopeData = {
      id: `scope-${Date.now()}`,
      projectTitle,
      clientName: "Acme Corp",
      amount: pricingAmount,
      status: "Draft",
      created: "Today",
      service: selectedService,
      relationship: clientRelationship,
      businessSize,
      urgency,
      commStyle,
      description: projectDesc,
      revisions,
      timeline,
      deliverables,
      pricingTier
    };
    setScopesList([newScope, ...scopesList]);
    setView("details");
    setActiveDetailTab("Overview");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://pricis.co/scopes/abc123");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* ----------------- LIST VIEW ----------------- */}
      {view === "list" && (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-text-dark font-display">Scopes</h1>
              <p className="text-text-secondary text-sm font-body">Create, manage and track your project scopes</p>
            </div>
            <button 
              onClick={() => { setView("wizard"); setWizardStep(1); }}
              className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-blue transition-colors"
            >
              <Plus size={18} /> New Scope
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Scopes", count: "124", desc: "All generated scopes" },
              { label: "Drafts", count: "18", desc: "Not yet shared" },
              { label: "Sent", count: "42", desc: "Waiting for client" },
              { label: "Viewed", count: "64", desc: "Client opened proposal" },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-border-light rounded-xl p-5 shadow-sm">
                <span className="text-2xl font-bold text-text-dark font-display">{stat.count}</span>
                <p className="text-sm font-semibold text-text-dark mt-1">{stat.label}</p>
                <p className="text-xs text-text-secondary mt-0.5">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Scopes Table */}
          <div className="bg-white border border-border-light rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-border-light flex justify-between items-center gap-4">
              <input 
                type="text" 
                placeholder="Search scopes..." 
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
                    <th className="p-4">Project</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Created</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light text-sm font-medium">
                  {scopesList.map((scope) => (
                    <tr key={scope.id} className="hover:bg-surface-secondary/50 cursor-pointer" onClick={() => {
                      setProjectTitle(scope.projectTitle);
                      setProjectDesc(scope.description);
                      setDeliverables(scope.deliverables);
                      setPricingAmount(scope.amount);
                      setPricingTier(scope.pricingTier);
                      setView("details");
                    }}>
                      <td className="p-4 text-text-dark font-bold">{scope.projectTitle}</td>
                      <td className="p-4 text-text-secondary">{scope.clientName}</td>
                      <td className="p-4 text-text-dark font-bold">₦{scope.amount.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          scope.status === "Viewed" ? "bg-green-50 text-[#10B981]" :
                          scope.status === "Sent" ? "bg-blue-50 text-primary" :
                          scope.status === "Approved" ? "bg-emerald-50 text-emerald-600" :
                          "bg-slate-100 text-text-secondary"
                        }`}>{scope.status}</span>
                      </td>
                      <td className="p-4 text-text-muted">{scope.created}</td>
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

      {/* ----------------- WIZARD FLOW ----------------- */}
      {view === "wizard" && (
        <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm max-w-4xl mx-auto">
          {/* Stepper Header */}
          <div className="flex justify-between items-center mb-8 border-b border-border-light pb-4">
            <span className="font-bold text-text-dark font-display text-lg">New Scope</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((step) => (
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
                    {step === 1 ? "Service" : step === 2 ? "Client" : step === 3 ? "Project" : step === 4 ? "Pricing" : "Review"}
                  </span>
                  {step < 5 && <div className="w-4 border-t border-border-light hidden md:block"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* STEP 1: Service */}
          {wizardStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-text-dark text-lg font-display mb-1">What service are you offering?</h3>
                <p className="text-text-secondary text-sm">Select the service that best matches your project.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "UI/UX Design", "Web Development", "Brand Design", "Copywriting",
                  "Marketing", "Photography", "Video Editing", "Consulting",
                  "Social Media", "Custom Service"
                ].map((serv) => (
                  <button 
                    key={serv}
                    onClick={() => setSelectedService(serv)}
                    className={`border p-4 rounded-xl flex items-center gap-3 font-semibold transition-all ${
                      selectedService === serv 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-border-light bg-white text-text-dark hover:bg-surface-secondary"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      selectedService === serv ? "bg-primary text-white" : "bg-slate-100 text-text-secondary"
                    }`}>
                      <Target size={18} />
                    </div>
                    <span className="text-sm">{serv}</span>
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

          {/* STEP 2: Client */}
          {wizardStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-text-dark text-lg font-display mb-1">Tell us about your client</h3>
                <p className="text-text-secondary text-sm">This helps us tailor the scope and pricing.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Client Relationship */}
                <div className="space-y-3">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Client Relationship</span>
                  {["New Client", "Returning Client"].map((r) => (
                    <label key={r} className="flex items-center gap-3 p-3 border border-border-light rounded-xl cursor-pointer hover:bg-surface-secondary/50">
                      <input 
                        type="radio" 
                        name="relationship" 
                        checked={clientRelationship === r}
                        onChange={() => setClientRelationship(r)}
                        className="text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="text-sm font-semibold text-text-dark">{r}</span>
                    </label>
                  ))}
                </div>

                {/* Business Size */}
                <div className="space-y-3">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Business Size</span>
                  <div className="grid grid-cols-2 gap-2">
                    {["Solo Founder", "Small Business", "Startup", "SME", "Enterprise"].map((size) => (
                      <label key={size} className="flex items-center gap-2.5 p-3 border border-border-light rounded-xl cursor-pointer hover:bg-surface-secondary/50">
                        <input 
                          type="radio" 
                          name="size" 
                          checked={businessSize === size}
                          onChange={() => setBusinessSize(size)}
                          className="text-primary focus:ring-primary h-4 w-4"
                        />
                        <span className="text-xs font-semibold text-text-dark">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Urgency */}
                <div className="space-y-3">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Urgency</span>
                  <div className="flex gap-4">
                    {["Normal", "Fast", "Rush"].map((u) => (
                      <label key={u} className="flex-1 flex items-center justify-center gap-2 p-3 border border-border-light rounded-xl cursor-pointer hover:bg-surface-secondary/50">
                        <input 
                          type="radio" 
                          name="urgency" 
                          checked={urgency === u}
                          onChange={() => setUrgency(u)}
                          className="text-primary focus:ring-primary h-4 w-4"
                        />
                        <span className="text-sm font-semibold text-text-dark">{u}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Communication Style */}
                <div className="space-y-3">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Communication Style</span>
                  <div className="flex gap-4">
                    {["Friendly", "Formal", "Corporate"].map((c) => (
                      <label key={c} className="flex-1 flex items-center justify-center gap-2 p-3 border border-border-light rounded-xl cursor-pointer hover:bg-surface-secondary/50">
                        <input 
                          type="radio" 
                          name="comm" 
                          checked={commStyle === c}
                          onChange={() => setCommStyle(c)}
                          className="text-primary focus:ring-primary h-4 w-4"
                        />
                        <span className="text-xs font-semibold text-text-dark">{c}</span>
                      </label>
                    ))}
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

          {/* STEP 3: Project */}
          {wizardStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-text-dark text-lg font-display mb-1">Tell us about the project</h3>
                <p className="text-text-secondary text-sm">Add the details so we can generate an accurate scope.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Project Title</label>
                    <input 
                      type="text" 
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Project Description</label>
                    <textarea 
                      rows={5}
                      value={projectDesc}
                      onChange={(e) => setProjectDesc(e.target.value)}
                      className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-medium resize-none leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Revisions</label>
                      <select 
                        value={revisions}
                        onChange={(e) => setRevisions(e.target.value)}
                        className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer"
                      >
                        <option>1 included revision</option>
                        <option>2 included revisions</option>
                        <option>3 included revisions</option>
                        <option>Unlimited revisions</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Timeline</label>
                      <select 
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer"
                      >
                        <option>2 weeks</option>
                        <option>3 weeks</option>
                        <option>4 weeks</option>
                        <option>6 weeks</option>
                        <option>8 weeks</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Deliverables Column */}
                <div className="border border-border-light bg-surface-secondary rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-4">Deliverables</span>
                    <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                      {deliverables.map((del, index) => (
                        <div key={index} className="flex justify-between items-center bg-white p-2.5 border border-border-light rounded-xl">
                          <span className="text-xs font-bold text-text-dark">{del}</span>
                          <button 
                            type="button" 
                            onClick={() => removeDeliverable(index)}
                            className="text-text-muted hover:text-danger transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t border-border-light/60">
                    <input 
                      type="text" 
                      placeholder="Add custom deliverable..." 
                      value={newDeliverable}
                      onChange={(e) => setNewDeliverable(e.target.value)}
                      className="flex-grow bg-white border border-border-light text-text-dark text-xs rounded-xl px-3 py-2 outline-none font-medium"
                    />
                    <button 
                      type="button" 
                      onClick={addDeliverable}
                      className="bg-primary text-white p-2 rounded-xl hover:bg-primary-hover transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
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

          {/* STEP 4: Pricing */}
          {wizardStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-text-dark text-lg font-display mb-1">Choose your pricing tier</h3>
                <p className="text-text-secondary text-sm">AI-calibrated for Nigerian market rates.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { tier: "Conservative", desc: "Essential solution with core deliverables", price: 450000 },
                  { tier: "Standard", desc: "Recommended. Balanced approach for most projects", price: 500000, recommended: true },
                  { tier: "Premium", desc: "Comprehensive solution with extra value", price: 700000 }
                ].map((t) => (
                  <button
                    key={t.tier}
                    onClick={() => { setPricingTier(t.tier); setPricingAmount(t.price); }}
                    className={`border p-6 rounded-2xl flex flex-col justify-between text-left relative transition-all ${
                      pricingTier === t.tier 
                        ? "border-primary bg-primary/5 shadow-sm" 
                        : "border-border-light bg-white hover:bg-surface-secondary/50"
                    }`}
                  >
                    {t.recommended && (
                      <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                        Recommended
                      </span>
                    )}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-bold text-text-dark text-base">{t.tier}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          pricingTier === t.tier ? "border-primary" : "border-border-light"
                        }`}>
                          {pricingTier === t.tier && <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>}
                        </div>
                      </div>
                      <p className="text-xs text-text-secondary mb-6 leading-relaxed">{t.desc}</p>
                    </div>
                    <span className="text-2xl font-bold text-text-dark font-display">
                      ₦{t.price.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>

              {/* What's included block */}
              <div className="bg-surface-secondary border border-border-light rounded-2xl p-5">
                <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-3">What's included in {pricingTier}</span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {deliverables.slice(0, 4).map((d, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-text-dark">
                      <CheckCircle2 size={14} className="text-[#10B981]" />
                      <span>{d}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-xs font-semibold text-text-dark">
                    <CheckCircle2 size={14} className="text-[#10B981]" />
                    <span>{revisions}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-text-dark">
                    <CheckCircle2 size={14} className="text-[#10B981]" />
                    <span>{timeline} delivery</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between border-t border-border-light pt-6">
                <button onClick={() => setWizardStep(3)} className="px-5 py-2.5 rounded-full border border-border-light text-text-secondary text-sm font-semibold hover:bg-surface-secondary">
                  Back
                </button>
                <button onClick={() => setWizardStep(5)} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                  Next
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Review */}
          {wizardStep === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-text-dark text-lg font-display mb-1">Review your scope</h3>
                <p className="text-text-secondary text-sm">Review everything before generating your scope.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Details Tab Panel */}
                <div className="md:col-span-2 border border-border-light rounded-2xl p-6 flex gap-6">
                  {/* Internal tabs */}
                  <div className="w-1/3 flex flex-col border-r border-border-light pr-4 gap-1">
                    {["Overview", "Deliverables", "Timeline", "Revisions", "Out of Scope", "Pricing"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setActiveDetailTab(t)}
                        className={`text-left text-xs font-bold p-2.5 rounded-lg transition-colors ${
                          activeDetailTab === t ? "bg-primary/10 text-primary" : "text-text-secondary hover:bg-surface-secondary"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {/* Tab content */}
                  <div className="w-2/3 space-y-4">
                    {activeDetailTab === "Overview" && (
                      <div>
                        <h4 className="font-bold text-sm text-text-dark mb-1">Project Overview</h4>
                        <div className="space-y-3">
                          <div>
                            <span className="text-[10px] font-bold text-text-secondary uppercase">Project Title</span>
                            <p className="text-xs font-semibold text-text-dark mt-0.5">{projectTitle}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-text-secondary uppercase">Client Type</span>
                            <p className="text-xs font-semibold text-text-dark mt-0.5">{clientRelationship} — {businessSize}</p>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-text-secondary uppercase">Description</span>
                            <p className="text-xs text-text-secondary leading-relaxed mt-0.5">{projectDesc}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {activeDetailTab === "Deliverables" && (
                      <div>
                        <h4 className="font-bold text-sm text-text-dark mb-3">Deliverables</h4>
                        <ul className="space-y-2">
                          {deliverables.map((d, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs font-semibold text-text-dark">
                              <CheckCircle2 size={14} className="text-[#10B981]" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {activeDetailTab !== "Overview" && activeDetailTab !== "Deliverables" && (
                      <div className="flex items-center justify-center h-full text-xs font-bold text-text-muted py-8">
                        {activeDetailTab} settings configured correctly.
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Sidebar: Pricing Summary */}
                <div className="border border-border-light rounded-2xl p-5 bg-surface-secondary flex flex-col justify-between h-fit">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-4">Pricing Summary</span>
                  <div className="space-y-3.5 border-b border-border-light/60 pb-4 mb-4">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-text-secondary">Tier</span>
                      <span className="font-bold text-text-dark">{pricingTier}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-text-secondary">Amount</span>
                      <span className="font-bold text-text-dark">₦{pricingAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-text-secondary">Timeline</span>
                      <span className="font-bold text-text-dark">{timeline}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-text-secondary">Revisions</span>
                      <span className="font-bold text-text-dark">{revisions}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-text-muted leading-relaxed">
                    Once generated, you can copy the shareable link and send it directly to your client.
                  </span>
                </div>
              </div>

              <div className="flex justify-between border-t border-border-light pt-6">
                <button onClick={() => setWizardStep(4)} className="px-5 py-2.5 rounded-full border border-border-light text-text-secondary text-sm font-semibold hover:bg-surface-secondary">
                  Back
                </button>
                <div className="flex gap-3">
                  <button onClick={() => setView("list")} className="px-5 py-2.5 rounded-full border border-border-light text-text-secondary text-sm font-semibold hover:bg-surface-secondary">
                    Save Draft
                  </button>
                  <button onClick={handleCreateScope} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                    Generate Scope
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ----------------- SCOPE DETAILS VIEW ----------------- */}
      {view === "details" && (
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-border-light">
            <button onClick={() => setView("list")} className="flex items-center gap-2 text-text-secondary hover:text-text-dark transition-colors text-sm font-semibold">
              <ArrowLeft size={16} /> Back to Scopes
            </button>
            <div className="flex gap-3 w-full sm:w-auto">
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="flex-1 sm:flex-none bg-surface-secondary border border-border-light text-text-dark hover:bg-slate-100 px-5 py-2 rounded-xl text-sm font-semibold transition-colors"
              >
                Share
              </button>
              <button className="flex-grow sm:flex-grow-0 bg-white border border-border-light text-text-dark hover:bg-slate-50 px-5 py-2 rounded-xl text-sm font-semibold transition-colors">
                Export PDF
              </button>
              <button 
                onClick={() => setView("invoice")}
                className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-blue transition-colors"
              >
                Convert to Invoice
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-3">
            <div>
              <h2 className="text-2xl font-bold text-text-dark font-display">{projectTitle}</h2>
              <p className="text-xs text-text-secondary mt-1">Created Today • Prepared by Alex John</p>
            </div>
            <span className="bg-green-50 text-[#10B981] text-xs font-bold px-3 py-1 rounded-full border border-green-100">Viewed</span>
          </div>

          {/* Details Content & Summary */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Tab Panel */}
              <div className="bg-white border border-border-light rounded-2xl overflow-hidden shadow-sm">
                <div className="flex border-b border-border-light bg-surface-secondary">
                  {["Overview", "Deliverables", "Timeline", "Revisions", "Out of Scope", "Pricing"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveDetailTab(t)}
                      className={`flex-1 text-center text-xs font-bold py-3 transition-colors ${
                        activeDetailTab === t 
                          ? "bg-white border-b-2 border-primary text-primary" 
                          : "text-text-secondary hover:bg-slate-50"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="p-6 space-y-6">
                  {activeDetailTab === "Overview" && (
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-sm text-text-dark mb-1">Project Overview</h4>
                        <p className="text-xs text-text-secondary leading-relaxed">{projectDesc}</p>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-text-dark mb-2">Deliverables Included</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {deliverables.map((d, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs font-semibold text-text-dark">
                              <CheckCircle2 size={14} className="text-[#10B981]" />
                              <span>{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {activeDetailTab !== "Overview" && (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <FileText size={40} className="text-text-muted mb-2" />
                      <h4 className="font-bold text-sm text-text-dark mb-1">{activeDetailTab} Details</h4>
                      <p className="text-xs text-text-secondary">Fully configured for {pricingTier} package.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Client Activity Tab */}
              <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-text-dark text-base font-display mb-4">Client Activity</h3>
                <div className="space-y-4">
                  {[
                    { time: "Today, 11:04 AM", desc: "Client viewed the proposal", icon: Eye, color: "text-[#10B981]", bg: "bg-green-50" },
                    { time: "Yesterday, 4:15 PM", desc: "Proposal link opened", icon: ExternalLink, color: "text-primary", bg: "bg-blue-50" },
                    { time: "2 days ago, 10:20 AM", desc: "Proposal link sent to client", icon: FileCheck, color: "text-purple-500", bg: "bg-purple-50" }
                  ].map((act, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className={`w-8 h-8 rounded-full ${act.bg} flex items-center justify-center flex-shrink-0`}>
                        <act.icon size={14} className={act.color} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-text-muted">{act.time}</span>
                        <p className="text-xs font-semibold text-text-dark mt-0.5">{act.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Scope Summary Right Sidebar */}
            <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm h-fit space-y-6">
              <h3 className="font-bold text-text-dark text-base font-display">Scope Summary</h3>
              <div className="space-y-4 border-b border-border-light pb-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-text-secondary">Total Value</span>
                  <span className="font-bold text-text-dark text-base">₦{pricingAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-text-secondary">Timeline</span>
                  <span className="font-bold text-text-dark">{timeline}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-text-secondary">Revisions</span>
                  <span className="font-bold text-text-dark">{revisions}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-text-secondary">Created</span>
                  <span className="font-bold text-text-dark">May 12, 2024</span>
                </div>
              </div>

              <div className="space-y-3.5">
                <button 
                  onClick={() => setView("client_view")}
                  className="w-full bg-surface-secondary hover:bg-slate-100 text-text-dark py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-border-light transition-colors"
                >
                  <ExternalLink size={14} /> Open Client Page
                </button>
              </div>
            </div>
          </div>

          {/* Share Modal Dialog */}
          {isShareModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-lg border border-border-light relative animate-dropdown">
                <h3 className="font-bold text-text-dark text-lg font-display mb-2">Generate Client Link</h3>
                <p className="text-text-secondary text-xs mb-5">Share this link with your client to view the scope.</p>
                
                <div className="flex gap-2 mb-6">
                  <input 
                    type="text" 
                    readOnly
                    value="https://pricis.co/scopes/abc123" 
                    className="flex-grow bg-surface-secondary border border-border-light text-text-dark text-xs font-semibold rounded-xl px-4 py-2.5 outline-none select-all"
                  />
                  <button 
                    onClick={handleCopyLink}
                    className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                  >
                    {isCopied ? "Copied" : "Copy"}
                  </button>
                </div>

                <div className="border-t border-border-light pt-4 space-y-4">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Link Activity</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface-secondary rounded-xl p-3 text-center border border-border-light/60">
                      <span className="text-xl font-bold text-text-dark font-display">3</span>
                      <p className="text-[10px] text-text-secondary font-bold uppercase mt-1">Total Views</p>
                    </div>
                    <div className="bg-surface-secondary rounded-xl p-3 text-center border border-border-light/60">
                      <span className="text-xs font-bold text-text-dark font-display block py-1.5">Today, 11:04 AM</span>
                      <p className="text-[10px] text-text-secondary font-bold uppercase mt-1">Last Viewed</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-border-light">
                  <button 
                    onClick={() => setView("client_view")}
                    className="flex-1 bg-surface-secondary hover:bg-slate-100 text-text-dark py-2.5 rounded-xl text-xs font-bold transition-colors"
                  >
                    Open Page
                  </button>
                  <button 
                    onClick={() => setIsShareModalOpen(false)}
                    className="flex-1 bg-white border border-border-light hover:bg-surface-secondary text-text-dark py-2.5 rounded-xl text-xs font-bold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ----------------- CLIENT PAGE VIEW ----------------- */}
      {view === "client_view" && (
        <div className="max-w-3xl mx-auto space-y-8 bg-white border border-border-light rounded-3xl p-8 sm:p-12 shadow-sm relative">
          <button onClick={() => setView("details")} className="absolute top-6 left-6 text-text-secondary hover:text-text-dark flex items-center gap-1.5 text-xs font-bold bg-surface-secondary border border-border-light/80 rounded-full px-3 py-1.5 transition-colors">
            <ArrowLeft size={14} /> Back to Dashboard
          </button>
          
          <div className="text-center pt-8 space-y-4">
            <span className="bg-primary-light text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Scope Proposal</span>
            <h1 className="text-4xl font-extrabold text-text-dark font-display">{projectTitle}</h1>
            <p className="text-sm text-text-secondary">Prepared by <span className="font-bold text-text-dark">Alex John</span> | Freelance UI/UX Designer</p>
          </div>

          <div className="grid grid-cols-3 gap-4 border-y border-border-light py-6">
            <div className="text-center">
              <span className="text-[10px] font-bold text-text-secondary uppercase">Project Value</span>
              <p className="text-xl font-bold text-text-dark font-display mt-1">₦{pricingAmount.toLocaleString()}</p>
            </div>
            <div className="text-center border-x border-border-light">
              <span className="text-[10px] font-bold text-text-secondary uppercase">Timeline</span>
              <p className="text-xl font-bold text-[#2563EB] font-display mt-1">{timeline}</p>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-text-secondary uppercase">Revisions</span>
              <p className="text-xl font-bold text-text-dark font-display mt-1">{revisions.split(' ')[0]} Included</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-text-dark text-lg mb-2">Project Overview</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{projectDesc}</p>
            </div>

            <div>
              <h3 className="font-bold text-text-dark text-lg mb-4">Included Deliverables</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {deliverables.map((del, i) => (
                  <div key={i} className="flex gap-3 bg-surface-secondary border border-border-light/60 p-3.5 rounded-xl items-center">
                    <CheckCircle2 size={16} className="text-[#10B981] flex-shrink-0" />
                    <span className="text-xs font-bold text-text-dark">{del}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center border-t border-border-light pt-8 mt-10">
            <button className="bg-primary hover:bg-primary-hover text-white font-bold text-sm px-12 py-3.5 rounded-full shadow-blue transition-all">
              Accept & Sign Proposal
            </button>
          </div>
        </div>
      )}

      {/* ----------------- INVOICE VIEW ----------------- */}
      {view === "invoice" && (
        <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm max-w-3xl mx-auto space-y-6">
          <div className="flex justify-between items-center border-b border-border-light pb-4">
            <div>
              <h3 className="font-bold text-text-dark text-lg font-display">Create Invoice</h3>
              <p className="text-text-secondary text-xs">Auto-filled from this scope</p>
            </div>
            <button onClick={() => setView("details")} className="text-text-muted hover:text-text-dark p-2 transition-colors">
              ✕
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Client</label>
              <input 
                type="text" 
                value="Acme Corp" 
                readOnly
                className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-semibold"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Invoice Date</label>
                <input 
                  type="text" 
                  value="May 12, 2024" 
                  readOnly
                  className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-semibold text-center"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Due Date</label>
                <input 
                  type="text" 
                  value="May 26, 2024" 
                  readOnly
                  className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-semibold text-center"
                />
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="border border-border-light rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-surface-secondary border-b border-border-light text-text-secondary text-xs uppercase font-semibold">
                  <th className="p-3">Description</th>
                  <th className="p-3 w-16 text-center">Qty</th>
                  <th className="p-3 w-32 text-right">Rate</th>
                  <th className="p-3 w-32 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="font-semibold text-text-dark">
                <tr>
                  <td className="p-3 text-xs leading-normal">
                    <p className="font-bold">{projectTitle}</p>
                    <p className="text-[10px] text-text-secondary font-normal mt-0.5">{selectedService} Package</p>
                  </td>
                  <td className="p-3 text-center">1</td>
                  <td className="p-3 text-right">₦{pricingAmount.toLocaleString()}</td>
                  <td className="p-3 text-right">₦{pricingAmount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment details block */}
          <div className="bg-surface-secondary border border-border-light rounded-xl p-4 text-xs font-semibold text-text-dark space-y-1">
            <span className="block text-[10px] font-bold text-text-secondary uppercase mb-2">Payment Instructions</span>
            <p>GTBank</p>
            <p>Account Name: Alex John</p>
            <p className="text-text-secondary font-normal">Account Number: 0123456789</p>
          </div>

          <div className="flex justify-between border-t border-border-light pt-6">
            <button onClick={() => setView("details")} className="px-5 py-2.5 rounded-full border border-border-light text-text-secondary text-sm font-semibold hover:bg-surface-secondary">
              Save Draft
            </button>
            <div className="flex gap-3">
              <button 
                onClick={() => { setView("list"); alert("Link successfully generated and copied to clipboard!"); }}
                className="bg-white border border-border-light hover:bg-surface-secondary text-text-dark px-5 py-2.5 rounded-full text-sm font-semibold transition-colors"
              >
                Generate Link
              </button>
              <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue transition-colors">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
