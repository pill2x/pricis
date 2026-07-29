"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Plus, Target, FileText, ArrowLeft, ArrowRight, Copy, 
  ExternalLink, Check, Trash2, Calendar, FileCheck, CheckCircle2, ChevronRight, Eye
} from "lucide-react";
import { supabaseAuth } from "@/lib/auth";
import { fetchQuotes, saveQuote, deleteQuote } from "@/app/actions/db";

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
  const [userId, setUserId] = useState<string | null>(null);
  
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
  const [scopesList, setScopesList] = useState<ScopeData[]>([]);

  useEffect(() => {
    async function loadScopes() {
      const { data: { session } } = await supabaseAuth.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        const list = await fetchQuotes(session.user.id);
        if (list && list.length > 0) {
          const mapped: ScopeData[] = list.map((q: any) => {
            const deliverablesArray = typeof q.deliverables === "string" ? JSON.parse(q.deliverables) : (Array.isArray(q.deliverables) ? q.deliverables : []);
            const amount = q.selected_tier === "Conservative" ? Number(q.price_conservative) : (q.selected_tier === "Premium" ? Number(q.price_premium) : Number(q.price_standard));
            return {
              id: q.id,
              projectTitle: q.project_title || "Untitled Project",
              clientName: "Client",
              amount: amount || 500000,
              status: "Draft",
              created: new Date(q.created_at).toLocaleDateString(),
              service: q.industry || "Web Development",
              relationship: q.experience_level || "New Client",
              businessSize: "Startup",
              urgency: "Normal",
              commStyle: "Friendly",
              description: q.project_description || "",
              revisions: q.revision_policy || "2 included revisions",
              timeline: q.timeline || "4 weeks",
              deliverables: deliverablesArray,
              pricingTier: q.selected_tier || "Standard"
            };
          });
          setScopesList(mapped);
        } else {
          setScopesList([
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
            }
          ]);
        }
      }
    }
    loadScopes();
  }, []);

  const addDeliverable = () => {
    if (newDeliverable.trim()) {
      setDeliverables([...deliverables, newDeliverable.trim()]);
      setNewDeliverable("");
    }
  };

  const removeDeliverable = (index: number) => {
    setDeliverables(deliverables.filter((_, i) => i !== index));
  };

  const handleCreateScope = async () => {
    let newId = `scope-${Date.now()}`;
    if (userId) {
      const saved = await saveQuote(
        userId,
        selectedService,
        clientRelationship,
        projectDesc,
        projectTitle,
        deliverables,
        timeline,
        revisions,
        [], // out of scope
        pricingAmount * 0.9, // conservative
        pricingAmount, // standard
        pricingAmount * 1.3, // premium
        "Generated standard quote",
        pricingTier
      );
      if (saved) {
        newId = (saved as any).id;
      }
    }

    const newScope: ScopeData = {
      id: newId,
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
    <div className="space-y-8 animate-fade-in-up">
      {/* ----------------- LIST VIEW ----------------- */}
      {view === "list" && (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-[#0F172A] font-display">Scopes</h1>
              <p className="text-text-secondary text-sm font-body">Create, manage and track your project scopes</p>
            </div>
            <button 
              onClick={() => { setView("wizard"); setWizardStep(1); }}
              className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-blue transition-all"
            >
              <Plus size={16} /> New Scope
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Scopes", count: "124", desc: "All generated scopes", color: "text-[#0F172A]" },
              { label: "Drafts", count: "18", desc: "Not yet shared", color: "text-primary" },
              { label: "Sent", count: "42", desc: "Waiting for client", color: "text-blue-600" },
              { label: "Viewed", count: "64", desc: "Client opened proposal", color: "text-emerald-600" },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <span className={`text-2xl font-black font-display ${stat.color}`}>{stat.count}</span>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mt-2">{stat.label}</p>
                <p className="text-[10px] text-text-muted mt-1 font-semibold">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Scopes Table */}
          <div className="bg-white border border-[#E5EAF2] rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-[#E5EAF2] flex justify-between items-center gap-4 bg-[#F8FAFC]">
              <input 
                type="text" 
                placeholder="Search scopes..." 
                className="bg-white border border-[#E5EAF2] text-text-dark text-xs rounded-xl px-4 py-2 outline-none w-64 shadow-sm focus:border-primary transition-colors font-semibold"
              />
              <button className="bg-white border border-[#E5EAF2] text-text-secondary text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                Filter
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-body">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E5EAF2] text-text-secondary text-[10px] uppercase tracking-wider font-bold">
                    <th className="p-4">Project</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Created</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EAF2] text-xs font-semibold">
                  {scopesList.map((scope) => (
                    <tr key={scope.id} className="hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => {
                      setProjectTitle(scope.projectTitle);
                      setProjectDesc(scope.description);
                      setDeliverables(scope.deliverables);
                      setPricingAmount(scope.amount);
                      setPricingTier(scope.pricingTier);
                      setView("details");
                    }}>
                      <td className="p-4 text-[#0F172A] font-bold">{scope.projectTitle}</td>
                      <td className="p-4 text-text-secondary">{scope.clientName}</td>
                      <td className="p-4 text-[#0F172A] font-bold">₦{scope.amount.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          scope.status === "Viewed" ? "bg-emerald-50 text-[#10B981] border-emerald-100" :
                          scope.status === "Sent" ? "bg-blue-50 text-primary border-blue-100" :
                          scope.status === "Approved" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                          "bg-slate-100 text-text-secondary border-slate-200"
                        }`}>{scope.status}</span>
                      </td>
                      <td className="p-4 text-text-muted">{scope.created}</td>
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
        <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm max-w-4xl mx-auto text-left animate-fade-in">
          {/* Stepper Header */}
          <div className="flex justify-between items-center mb-8 border-b border-[#E5EAF2] pb-4">
            <span className="font-bold text-[#0F172A] font-display text-lg">New Scope</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((step) => (
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
                    {step === 1 ? "Service" : step === 2 ? "Client" : step === 3 ? "Project" : step === 4 ? "Pricing" : "Review"}
                  </span>
                  {step < 5 && <div className="w-4 border-t border-[#E5EAF2] hidden md:block"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* STEP 1: Service */}
          {wizardStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">What service are you offering?</h3>
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
                    className={`border p-4 rounded-2xl flex items-center gap-3 font-semibold transition-all ${
                      selectedService === serv 
                        ? "border-primary bg-[#EFF6FF] text-primary" 
                        : "border-[#E5EAF2] bg-white text-[#0F172A] hover:bg-slate-50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      selectedService === serv ? "bg-primary text-white" : "bg-slate-100 text-text-secondary"
                    }`}>
                      <Target size={16} />
                    </div>
                    <span className="text-sm font-display">{serv}</span>
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

          {/* STEP 2: Client */}
          {wizardStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Tell us about your client</h3>
                <p className="text-text-secondary text-sm">This helps us tailor the scope and pricing.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Client Relationship */}
                <div className="space-y-3">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Client Relationship</span>
                  {["New Client", "Returning Client"].map((r) => (
                    <label key={r} className="flex items-center gap-3 p-3.5 border border-[#E5EAF2] rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
                      <input 
                        type="radio" 
                        name="relationship" 
                        checked={clientRelationship === r}
                        onChange={() => setClientRelationship(r)}
                        className="text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="text-sm font-semibold text-[#0F172A]">{r}</span>
                    </label>
                  ))}
                </div>

                {/* Business Size */}
                <div className="space-y-3">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Business Size</span>
                  <div className="grid grid-cols-2 gap-2">
                    {["Solo Founder", "Small Business", "Startup", "SME", "Enterprise"].map((size) => (
                      <label key={size} className="flex items-center gap-2.5 p-3 border border-[#E5EAF2] rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
                        <input 
                          type="radio" 
                          name="size" 
                          checked={businessSize === size}
                          onChange={() => setBusinessSize(size)}
                          className="text-primary focus:ring-primary h-4 w-4"
                        />
                        <span className="text-xs font-bold text-[#0F172A]">{size}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Urgency */}
                <div className="space-y-3">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Urgency</span>
                  <div className="flex gap-4">
                    {["Normal", "Fast", "Rush"].map((u) => (
                      <label key={u} className="flex-1 flex items-center justify-center gap-2 p-3 border border-[#E5EAF2] rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
                        <input 
                          type="radio" 
                          name="urgency" 
                          checked={urgency === u}
                          onChange={() => setUrgency(u)}
                          className="text-primary focus:ring-primary h-4 w-4"
                        />
                        <span className="text-sm font-semibold text-[#0F172A]">{u}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Communication Style */}
                <div className="space-y-3">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Communication Style</span>
                  <div className="flex gap-4">
                    {["Friendly", "Formal", "Corporate"].map((c) => (
                      <label key={c} className="flex-1 flex items-center justify-center gap-2 p-3 border border-[#E5EAF2] rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
                        <input 
                          type="radio" 
                          name="comm" 
                          checked={commStyle === c}
                          onChange={() => setCommStyle(c)}
                          className="text-primary focus:ring-primary h-4 w-4"
                        />
                        <span className="text-xs font-bold text-[#0F172A]">{c}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between border-t border-[#E5EAF2] pt-6">
                <button onClick={() => setWizardStep(1)} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50 transition-colors">
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
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Tell us about the project</h3>
                <p className="text-text-secondary text-sm">Add the details so we can generate an accurate scope.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Project Title</label>
                    <input 
                      type="text" 
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Project Description</label>
                    <textarea 
                      rows={5}
                      value={projectDesc}
                      onChange={(e) => setProjectDesc(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-2.5 outline-none font-medium resize-none leading-relaxed focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Revisions</label>
                      <input 
                        type="text" 
                        value={revisions}
                        onChange={(e) => setRevisions(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Timeline</label>
                      <input 
                        type="text" 
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Deliverables checklist */}
                <div className="border border-[#E5EAF2] bg-[#F8FAFC] rounded-2xl p-5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Deliverables</span>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={newDeliverable}
                        onChange={(e) => setNewDeliverable(e.target.value)}
                        placeholder="Add deliverable..."
                        className="flex-grow bg-white border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-3 py-2 outline-none font-medium focus:border-primary transition-colors"
                      />
                      <button onClick={addDeliverable} className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm">
                        Add
                      </button>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {deliverables.map((del, index) => (
                        <div key={index} className="flex justify-between items-center bg-white border border-[#E5EAF2] px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#0F172A]">
                          <span>{del}</span>
                          <button onClick={() => removeDeliverable(index)} className="text-text-muted hover:text-danger transition-colors font-bold text-sm">
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
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

          {/* STEP 4: Pricing */}
          {wizardStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Choose your pricing tier</h3>
                <p className="text-text-secondary text-sm">AI-calibrated for Nigerian market rates.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: "Conservative", desc: "Essential solution with core deliverables", price: 450000, value: "Conservative" },
                  { name: "Standard", desc: "Balanced approach for most projects", price: 500000, value: "Standard", recommend: true },
                  { name: "Premium", desc: "Comprehensive solution with extra value", price: 700000, value: "Premium" },
                ].map((tier) => (
                  <button 
                    key={tier.name}
                    onClick={() => { setPricingTier(tier.value); setPricingAmount(tier.price); }}
                    className={`border p-5 rounded-2xl flex flex-col justify-between text-left transition-all min-h-[12rem] relative ${
                      pricingTier === tier.value 
                        ? "border-primary bg-[#EFF6FF] shadow-sm" 
                        : "border-[#E5EAF2] bg-white hover:bg-slate-50"
                    }`}
                  >
                    {tier.recommend && (
                      <span className="bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full absolute -top-2.5 right-4 uppercase tracking-wider">Recommended</span>
                    )}
                    <div>
                      <span className="block font-black text-[#0F172A] text-sm font-display">{tier.name}</span>
                      <p className="text-[10px] text-text-secondary font-semibold mt-1 leading-normal">{tier.desc}</p>
                    </div>
                    <span className="block font-black text-[#0F172A] text-lg mt-4 font-display">₦{tier.price.toLocaleString()}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-between border-t border-[#E5EAF2] pt-6">
                <button onClick={() => setWizardStep(3)} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50 transition-colors">
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
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Review your scope</h3>
                <p className="text-text-secondary text-sm">Review everything before generating your scope.</p>
              </div>

              <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-2xl p-6 space-y-4">
                <div className="flex gap-4 items-center border-b border-[#E5EAF2] pb-4">
                  <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                    <FileText size={20} />
                  </div>
                  <div>
                    <span className="font-bold text-[#0F172A] text-sm block font-display">{projectTitle}</span>
                    <span className="text-[10px] text-text-secondary font-semibold">Service: {selectedService}</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs font-semibold text-[#0F172A]">
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Client Relationship</span>
                    <span>{clientRelationship}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Business Size</span>
                    <span>{businessSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Urgency</span>
                    <span>{urgency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Pricing Tier</span>
                    <span>{pricingTier} (₦{pricingAmount.toLocaleString()})</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between border-t border-[#E5EAF2] pt-6">
                <button onClick={() => setWizardStep(4)} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50 transition-colors">
                  Back
                </button>
                <button onClick={handleCreateScope} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                  Generate Scope
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ----------------- DETAILS VIEW ----------------- */}
      {view === "details" && (
        <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-[#E5EAF2]">
            <button onClick={() => setView("list")} className="flex items-center gap-2 text-text-secondary hover:text-[#0F172A] transition-colors text-sm font-bold">
              <ArrowLeft size={16} /> Back to Scopes
            </button>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="bg-white border border-[#E5EAF2] text-[#0F172A] hover:bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                Share Scope
              </button>
              <button 
                onClick={() => setView("invoice")}
                className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-blue"
              >
                Create Invoice
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <FileText size={22} />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-[#0F172A] font-display">{projectTitle}</h2>
                  <span className="bg-emerald-50 text-[#10B981] border border-emerald-100 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">Viewed</span>
                </div>
                <p className="text-xs text-text-secondary mt-1 font-semibold">Created May 12, 2024</p>
              </div>
            </div>
          </div>

          {/* Details Navigation */}
          <div className="flex border-b border-[#E5EAF2]">
            {(["Overview", "Deliverables", "Timeline", "Revisions", "Pricing"] as const).map((tab) => (
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Tab Content blocks */}
              <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4">
                {activeDetailTab === "Overview" && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-[#0F172A] text-base font-display">Project Overview</h3>
                    <p className="text-xs text-text-secondary leading-relaxed font-semibold">{projectDesc}</p>
                  </div>
                )}

                {activeDetailTab === "Deliverables" && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-[#0F172A] text-base font-display">Included Deliverables</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {deliverables.map((del, i) => (
                        <div key={i} className="flex gap-2.5 items-center p-3.5 bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl text-xs font-semibold text-[#0F172A]">
                          <CheckCircle2 size={16} className="text-[#10B981]" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeDetailTab === "Timeline" && (
                  <div className="space-y-4 font-body">
                    <h3 className="font-bold text-[#0F172A] text-base font-display">Estimated Timeline</h3>
                    <p className="text-xs text-text-secondary font-semibold">The project is estimated to take <span className="text-[#2563EB] font-bold">{timeline}</span> to complete.</p>
                  </div>
                )}

                {activeDetailTab === "Revisions" && (
                  <div className="space-y-4 font-body">
                    <h3 className="font-bold text-[#0F172A] text-base font-display">Revision Policy</h3>
                    <p className="text-xs text-text-secondary font-semibold">This scope proposal includes <span className="font-bold text-[#0F172A]">{revisions}</span>.</p>
                  </div>
                )}

                {activeDetailTab === "Pricing" && (
                  <div className="space-y-4 font-body">
                    <h3 className="font-bold text-[#0F172A] text-base font-display">Pricing Details</h3>
                    <p className="text-xs text-text-secondary font-semibold">Total estimated project value: <span className="font-black text-[#0F172A]">₦{pricingAmount.toLocaleString()}</span> (Tier: {pricingTier})</p>
                  </div>
                )}
              </div>

              {/* Client Activity Tab */}
              <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-[#0F172A] text-base font-display mb-4">Client Activity</h3>
                <div className="space-y-4">
                  {[
                    { time: "Today, 11:04 AM", desc: "Client viewed the proposal", icon: Eye, color: "text-[#10B981]", bg: "bg-green-50 border-green-100" },
                    { time: "Yesterday, 4:15 PM", desc: "Proposal link opened", icon: ExternalLink, color: "text-primary", bg: "bg-blue-50 border-blue-100" },
                    { time: "2 days ago, 10:20 AM", desc: "Proposal link sent to client", icon: FileCheck, color: "text-purple-500", bg: "bg-purple-50 border-purple-100" }
                  ].map((act, i) => (
                    <div key={i} className="flex gap-4 items-start text-xs font-semibold">
                      <div className={`w-8 h-8 rounded-full ${act.bg.split(' ')[0]} border ${act.bg.split(' ')[1] || ''} flex items-center justify-center flex-shrink-0`}>
                        <act.icon size={14} className={act.color} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-text-muted">{act.time}</span>
                        <p className="text-xs font-bold text-[#0F172A] mt-0.5">{act.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Scope Summary Right Sidebar */}
            <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm h-fit space-y-6">
              <h3 className="font-bold text-[#0F172A] text-base font-display">Scope Summary</h3>
              <div className="space-y-4 border-b border-[#E5EAF2] pb-4 font-body">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-text-secondary font-display">Total Value</span>
                  <span className="font-bold text-[#0F172A] text-sm">₦{pricingAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-text-secondary font-display">Timeline</span>
                  <span className="font-bold text-[#0F172A]">{timeline}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-text-secondary font-display">Revisions</span>
                  <span className="font-bold text-[#0F172A]">{revisions}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-text-secondary font-display">Created</span>
                  <span className="font-bold text-[#0F172A]">May 12, 2024</span>
                </div>
              </div>

              <div className="space-y-3.5">
                <button 
                  onClick={() => setView("client_view")}
                  className="w-full bg-[#F8FAFC] hover:bg-slate-50 text-[#0F172A] py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-[#E5EAF2] transition-colors"
                >
                  <ExternalLink size={14} /> Open Client Page
                </button>
              </div>
            </div>
          </div>

          {/* Share Modal Dialog */}
          {isShareModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-lg border border-[#E5EAF2] relative animate-dropdown text-left font-body">
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-2">Generate Client Link</h3>
                <p className="text-text-secondary text-xs mb-5 font-semibold">Share this link with your client to view the scope.</p>
                
                <div className="flex gap-2 mb-6">
                  <input 
                    type="text" 
                    readOnly
                    value="https://pricis.co/scopes/abc123" 
                    className="flex-grow bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs font-semibold rounded-xl px-4 py-2.5 outline-none select-all"
                  />
                  <button 
                    onClick={handleCopyLink}
                    className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-blue"
                  >
                    {isCopied ? "Copied" : "Copy"}
                  </button>
                </div>

                <div className="border-t border-[#E5EAF2] pt-4 space-y-4">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Link Activity</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#F8FAFC] rounded-xl p-3.5 text-center border border-[#E5EAF2]">
                      <span className="text-xl font-bold text-[#0F172A] font-display">3</span>
                      <p className="text-[10px] text-text-secondary font-bold uppercase mt-1">Total Views</p>
                    </div>
                    <div className="bg-[#F8FAFC] rounded-xl p-3.5 text-center border border-[#E5EAF2]">
                      <span className="text-xs font-bold text-[#0F172A] font-display block py-1.5">Today, 11:04 AM</span>
                      <p className="text-[10px] text-text-secondary font-bold uppercase mt-1">Last Viewed</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-[#E5EAF2]">
                  <button 
                    onClick={() => setView("client_view")}
                    className="flex-1 bg-[#F8FAFC] hover:bg-slate-50 text-[#0F172A] py-2.5 rounded-xl text-xs font-bold border border-[#E5EAF2] transition-colors"
                  >
                    Open Page
                  </button>
                  <button 
                    onClick={() => setIsShareModalOpen(false)}
                    className="flex-1 bg-white border border-[#E5EAF2] hover:bg-slate-50 text-[#0F172A] py-2.5 rounded-xl text-xs font-bold transition-colors"
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
        <div className="max-w-3xl mx-auto space-y-8 bg-white border border-[#E5EAF2] rounded-3xl p-8 sm:p-12 shadow-sm relative text-left">
          <button onClick={() => setView("details")} className="absolute top-6 left-6 text-text-secondary hover:text-[#0F172A] flex items-center gap-1.5 text-xs font-bold bg-[#F8FAFC] border border-[#E5EAF2] rounded-full px-3 py-1.5 transition-colors">
            <ArrowLeft size={14} /> Back to Dashboard
          </button>
          
          <div className="text-center pt-8 space-y-4">
            <span className="bg-[#EFF6FF] text-[#2563EB] border border-blue-100 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Scope Proposal</span>
            <h1 className="text-4xl font-extrabold text-[#0F172A] font-display">{projectTitle}</h1>
            <p className="text-sm text-text-secondary">Prepared by <span className="font-bold text-[#0F172A]">Alex John</span> | Freelance UI/UX Designer</p>
          </div>

          <div className="grid grid-cols-3 gap-4 border-y border-[#E5EAF2] py-6">
            <div className="text-center">
              <span className="text-[10px] font-bold text-text-secondary uppercase">Project Value</span>
              <p className="text-xl font-bold text-[#0F172A] font-display mt-1">₦{pricingAmount.toLocaleString()}</p>
            </div>
            <div className="text-center border-x border-[#E5EAF2]">
              <span className="text-[10px] font-bold text-text-secondary uppercase">Timeline</span>
              <p className="text-xl font-bold text-[#2563EB] font-display mt-1">{timeline}</p>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-text-secondary uppercase">Revisions</span>
              <p className="text-xl font-bold text-[#0F172A] font-display mt-1">{revisions.split(' ')[0]} Included</p>
            </div>
          </div>

          <div className="space-y-6 font-semibold">
            <div>
              <h3 className="font-bold text-[#0F172A] text-lg mb-2">Project Overview</h3>
              <p className="text-sm text-text-secondary leading-relaxed font-semibold">{projectDesc}</p>
            </div>

            <div>
              <h3 className="font-bold text-[#0F172A] text-lg mb-4">Included Deliverables</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {deliverables.map((del, i) => (
                  <div key={i} className="flex gap-3 bg-[#F8FAFC] border border-[#E5EAF2] p-3.5 rounded-xl items-center">
                    <CheckCircle2 size={16} className="text-[#10B981] flex-shrink-0" />
                    <span className="text-xs font-bold text-[#0F172A]">{del}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center border-t border-[#E5EAF2] pt-8 mt-10">
            <button className="bg-primary hover:bg-primary-hover text-white font-bold text-sm px-12 py-3.5 rounded-full shadow-blue transition-all">
              Accept & Sign Proposal
            </button>
          </div>
        </div>
      )}

      {/* ----------------- INVOICE VIEW ----------------- */}
      {view === "invoice" && (
        <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm max-w-3xl mx-auto space-y-6 text-left">
          <div className="flex justify-between items-center border-b border-[#E5EAF2] pb-4">
            <div>
              <h3 className="font-bold text-[#0F172A] text-lg font-display">Create Invoice</h3>
              <p className="text-text-secondary text-xs font-semibold">Auto-filled from this scope</p>
            </div>
            <button onClick={() => setView("details")} className="text-text-muted hover:text-text-dark font-bold p-2 transition-colors">
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
                className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 font-body">
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Invoice Date</label>
                <input 
                  type="text" 
                  value="May 12, 2024" 
                  readOnly
                  className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold text-center"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Due Date</label>
                <input 
                  type="text" 
                  value="May 26, 2024" 
                  readOnly
                  className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold text-center"
                />
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="border border-[#E5EAF2] rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm border-collapse font-body">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E5EAF2] text-text-secondary text-[10px] uppercase font-bold">
                  <th className="p-3">Description</th>
                  <th className="p-3 w-16 text-center">Qty</th>
                  <th className="p-3 w-32 text-right">Rate</th>
                  <th className="p-3 w-32 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="font-semibold text-[#0F172A] text-xs">
                <tr>
                  <td className="p-3 text-xs leading-normal">
                    <p className="font-bold">{projectTitle}</p>
                    <p className="text-[10px] text-text-secondary font-semibold mt-0.5">{selectedService} Package</p>
                  </td>
                  <td className="p-3 text-center">1</td>
                  <td className="p-3 text-right">₦{pricingAmount.toLocaleString()}</td>
                  <td className="p-3 text-right font-black">₦{pricingAmount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment details block */}
          <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl p-4 text-xs font-semibold text-[#0F172A] space-y-1">
            <span className="block text-[10px] font-bold text-text-secondary uppercase mb-2">Payment Instructions</span>
            <p className="font-bold">GTBank</p>
            <p>Account Name: Alex John</p>
            <p className="text-text-secondary font-semibold">Account Number: 0123456789</p>
          </div>

          <div className="flex justify-between border-t border-[#E5EAF2] pt-6">
            <button onClick={() => setView("details")} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50 transition-colors">
              Save Draft
            </button>
            <div className="flex gap-3">
              <button 
                onClick={() => { setView("list"); alert("Link successfully generated and copied to clipboard!"); }}
                className="bg-white border border-[#E5EAF2] hover:bg-slate-50 text-[#0F172A] px-5 py-2.5 rounded-full text-sm font-semibold transition-colors border"
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
