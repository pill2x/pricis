"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Plus, ArrowLeft, ArrowRight, Check, Trash2, ChevronRight, 
  Settings, Key, RefreshCw, AlertCircle, Link2, CheckCircle2, ShieldAlert, Sparkles,
  Users, Mail, Phone, ExternalLink, Briefcase, FileText, Receipt, Landmark, Eye, MoreHorizontal, Search
} from "lucide-react";
import { supabaseAuth } from "@/lib/auth";
import { fetchClients, createClient, deleteClient } from "@/app/actions/db";

// Client Avatar Mock matching the provided mockup designs
const getClientAvatar = (name: string, size: "sm" | "md" = "sm") => {
  const sizeClasses = size === "sm" ? "w-8 h-8 rounded-lg" : "w-12 h-12 rounded-xl";
  const acmeTextClass = size === "sm" ? "text-[6px] tracking-tighter" : "text-[9px] tracking-tight";
  
  if (name === "Acme Corp") {
    return (
      <div className={`${sizeClasses} bg-black text-white flex flex-col items-center justify-center font-display uppercase leading-none select-none font-black ${acmeTextClass} p-0.5`}>
        <span>ACME</span>
        <span>CORP</span>
      </div>
    );
  }
  if (name === "TechNova Ltd.") {
    return (
      <div className={`${sizeClasses} bg-[#00A896] text-white flex items-center justify-center font-bold select-none font-display ${size === "sm" ? "text-xs" : "text-lg"}`}>
        TN
      </div>
    );
  }
  if (name === "Greenlife NG") {
    return (
      <div className={`${sizeClasses} bg-[#1B5E20] text-white flex items-center justify-center font-bold select-none font-display ${size === "sm" ? "text-xs" : "text-lg"}`}>
        G
      </div>
    );
  }
  if (name === "StartupX") {
    return (
      <div className={`${sizeClasses} bg-[#0D47A1] text-white flex items-center justify-center font-bold select-none font-display ${size === "sm" ? "text-xs" : "text-lg"}`}>
        SX
      </div>
    );
  }
  if (name === "StoreHub") {
    return (
      <div className={`${sizeClasses} bg-[#E65100] text-white flex items-center justify-center font-bold select-none font-display ${size === "sm" ? "text-xs" : "text-lg"}`}>
        SH
      </div>
    );
  }
  // Default fallback
  return (
    <div className={`${sizeClasses} bg-primary/10 text-primary flex items-center justify-center font-bold select-none font-display ${size === "sm" ? "text-xs" : "text-lg"}`}>
      {name.split(' ').map(n => n[0]).join('')}
    </div>
  );
};

interface ClientData {
  id: string;
  name: string;
  industry: string;
  projectsCount: number;
  totalRevenue: number;
  outstanding: number;
  lastActivity: string;
  status: "Active" | "Inactive" | "Prospect";
  contactPerson: string;
  email: string;
  phone: string;
  companySize: string;
  website: string;
  linkedin: string;
  clientSince: string;
  notes: string;
}

export default function ClientsPage() {
  const [view, setView] = useState<"list" | "wizard" | "details" | "edit" | "delete">("list");
  const [userId, setUserId] = useState<string | null>(null);
  
  // Wizard States
  const [wizardStep, setWizardStep] = useState(1);
  const [clientName, setClientName] = useState("KudaTech");
  const [industry, setIndustry] = useState("Technology");
  const [contactPerson, setContactPerson] = useState("Tola Adeyemi");
  const [email, setEmail] = useState("tola@kudatech.com");
  const [phone, setPhone] = useState("+234 805 789 0123");
  const [companySize, setCompanySize] = useState("10 - 50 employees");
  const [website, setWebsite] = useState("www.kudatech.com");
  const [clientStatus, setClientStatus] = useState<"Active" | "Inactive">("Active");

  // Additional info states
  const [billingEmail, setBillingEmail] = useState("billing@kudatech.com");
  const [billingPhone, setBillingPhone] = useState("+234 805 789 0123");
  const [taxId, setTaxId] = useState("12345678-0001");
  const [currency, setCurrency] = useState("NGN - Nigerian Naira (₦)");
  const [addressStreet, setAddressStreet] = useState("12 Adeola Odeku Street");
  const [addressCity, setAddressCity] = useState("Victoria Island");
  const [addressState, setAddressState] = useState("Lagos");
  const [addressCountry, setAddressCountry] = useState("Nigeria");

  // Details States
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [activeDetailTab, setActiveDetailTab] = useState<"Overview" | "Projects" | "Proposals" | "Invoices" | "Activity">("Overview");
  
  // Success Alert banner
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  
  // Edit Client modal tab state
  const [editTab, setEditTab] = useState<"info" | "billing" | "address" | "notes">("info");

  const [clientsList, setClientsList] = useState<ClientData[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("new") === "true") {
      setView("wizard");
      setWizardStep(1);
    }

    async function loadClients() {
      const { data: { session } } = await supabaseAuth.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        const list = await fetchClients(session.user.id);
        if (list && list.length > 0) {
          const mapped: ClientData[] = list.map((c: any) => ({
            id: c.id,
            name: c.name,
            industry: c.industry || "Technology",
            projectsCount: 0,
            totalRevenue: 0,
            outstanding: 0,
            lastActivity: "Just now",
            status: c.relationship === "Prospect" ? "Prospect" : "Active",
            contactPerson: c.name,
            email: c.email,
            phone: c.phone || "",
            companySize: c.business_size || "Startup",
            website: "",
            linkedin: "",
            clientSince: new Date(c.created_at).toLocaleDateString(),
            notes: ""
          }));
          setClientsList(mapped);
        } else {
          setClientsList([]);
        }
      }
    }
    loadClients();
  }, []);

  const handleAddClient = async () => {
    let newId = `client-${Date.now()}`;
    if (userId) {
      const saved = await createClient(
        userId,
        clientName,
        email,
        phone,
        addressCountry,
        clientStatus === "Active" ? "Active" : "Prospect",
        companySize,
        "Normal",
        "Friendly"
      );
      if (saved) {
        newId = (saved as any).id;
      }
    }

    const newClient: ClientData = {
      id: newId,
      name: clientName,
      industry: industry,
      projectsCount: 0,
      totalRevenue: 0,
      outstanding: 0,
      lastActivity: "Just now",
      status: clientStatus === "Active" ? "Active" : "Inactive",
      contactPerson: contactPerson,
      email: email,
      phone: phone,
      companySize: companySize,
      website: website,
      linkedin: `linkedin.com/company/${clientName.toLowerCase().replace(" ", "")}`,
      clientSince: "Today",
      notes: "Newly connected client."
    };
    setClientsList([newClient, ...clientsList]);
    setShowSuccessBanner(true);
    setView("list");
  };

  const handleDeleteClient = async () => {
    if (selectedClient) {
      if (userId && !selectedClient.id.startsWith("client-")) {
        await deleteClient(selectedClient.id, userId);
      }
      setClientsList(clientsList.filter(c => c.id !== selectedClient.id));
      setSelectedClient(null);
      setView("list");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Success Banner */}
      {showSuccessBanner && (
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex justify-between items-center text-xs font-bold text-[#10B981] shadow-sm">
          <div className="flex gap-2 items-center">
            <CheckCircle2 size={16} />
            <span>Client added successfully! {clientName} has been added to your clients.</span>
          </div>
          <button onClick={() => setShowSuccessBanner(false)} className="text-[#10B981] hover:text-green-800">
            ✕
          </button>
        </div>
      )}

      {/* ----------------- LIST VIEW ----------------- */}
      {view === "list" && (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-[#0F172A] font-display">Clients</h1>
              <p className="text-text-secondary text-sm font-body">Manage your clients and relationships in one place.</p>
            </div>
            <button 
              onClick={() => { setView("wizard"); setWizardStep(1); }}
              className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-blue transition-all"
            >
              <Plus size={16} /> Add Client
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Clients", count: "28", desc: "↑ 27% vs last month", color: "text-[#0F172A]" },
              { label: "Active Clients", count: "18", desc: "↑ 30% vs last month", color: "text-emerald-600" },
              { label: "Total Revenue", count: "₦18,450,000", desc: "↑ 32% vs last month", color: "text-primary" },
              { label: "Outstanding", count: "₦2,450,000", desc: "↑ 15% vs last month", color: "text-warning" },
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
              <input 
                type="text" 
                placeholder="Search clients..." 
                className="bg-white border border-[#E5EAF2] text-text-dark text-xs rounded-xl px-4 py-2 outline-none w-full sm:w-64 shadow-sm focus:border-primary transition-colors font-semibold"
              />
              <div className="flex gap-2 text-[10px] font-bold overflow-x-auto pb-1 sm:pb-0">
                {["All Clients (28)", "Active (18)", "Inactive (6)", "Prospects (4)"].map((cat) => (
                  <button key={cat} className={`px-3.5 py-1.5 rounded-xl border transition-colors whitespace-nowrap ${
                    cat.startsWith("All") ? "bg-primary text-white border-transparent" : "bg-white border-[#E5EAF2] text-text-secondary hover:bg-slate-50"
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
                    <th className="p-4">Client</th>
                    <th className="p-4">Industry</th>
                    <th className="p-4">Total Projects</th>
                    <th className="p-4">Total Revenue</th>
                    <th className="p-4">Outstanding</th>
                    <th className="p-4">Last Activity</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EAF2] text-xs font-semibold">
                  {clientsList.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-text-muted">
                        No clients found. Click "New Client" to add one.
                      </td>
                    </tr>
                  ) : (
                    clientsList.map((client) => (
                      <tr key={client.id} className="hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => {
                        setSelectedClient(client);
                        setView("details");
                        setActiveDetailTab("Overview");
                      }}>
                        <td className="p-4 flex items-center gap-3">
                          {getClientAvatar(client.name, "sm")}
                          <span className="font-bold text-[#0F172A]">{client.name}</span>
                        </td>
                        <td className="p-4 text-text-secondary">{client.industry}</td>
                        <td className="p-4 text-[#0F172A] font-bold">{client.projectsCount}</td>
                        <td className="p-4 text-[#0F172A] font-bold">₦{client.totalRevenue.toLocaleString()}</td>
                        <td className="p-4 text-danger font-bold">
                          {client.outstanding > 0 ? `₦${client.outstanding.toLocaleString()}` : "₦0"}
                        </td>
                        <td className="p-4 text-text-muted">{client.lastActivity}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            client.status === "Active" ? "bg-emerald-50 text-[#10B981] border-emerald-100" :
                            client.status === "Prospect" ? "bg-blue-50 text-primary border-blue-100" :
                            "bg-slate-100 text-text-secondary border-slate-200"
                          }`}>{client.status}</span>
                        </td>
                        <td className="p-4 text-text-muted hover:text-primary transition-colors text-right">
                          <ChevronRight size={16} className="inline" />
                        </td>
                      </tr>
                    ))
                  )}
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
            <span className="font-bold text-[#0F172A] font-display text-lg font-semibold">Add New Client</span>
            <div className="flex gap-2">
              {[1, 2, 3].map((step) => (
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
                    {step === 1 ? "Client Info" : step === 2 ? "Additional Info" : "Review"}
                  </span>
                  {step < 3 && <div className="w-4 border-t border-[#E5EAF2] hidden md:block"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* STEP 1: Client Info */}
          {wizardStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Tell us about your client</h3>
                <p className="text-text-secondary text-sm font-semibold">Add the basic information to get started.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Client Name *</label>
                  <input 
                    type="text" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Industry</label>
                  <select 
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors"
                  >
                    <option>Technology</option>
                    <option>Finance</option>
                    <option>E-commerce</option>
                    <option>Marketing</option>
                    <option>Design</option>
                    <option>Non-profit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Contact Person *</label>
                  <input 
                    type="text" 
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Email *</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Phone Number</label>
                  <input 
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Business Size</label>
                  <select 
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors"
                  >
                    <option>1 - 10 employees</option>
                    <option>10 - 50 employees</option>
                    <option>50 - 100 employees</option>
                    <option>100+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Website</label>
                  <input 
                    type="text" 
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Client Status</label>
                  <select 
                    value={clientStatus}
                    onChange={(e) => setClientStatus(e.target.value as any)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
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

          {/* STEP 2: Additional Info */}
          {wizardStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Additional information <span className="text-text-muted font-normal">(Optional)</span></h3>
                <p className="text-text-secondary text-sm font-semibold">Add more details to help you manage this client better.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Billing Email</label>
                    <input 
                      type="email" 
                      value={billingEmail}
                      onChange={(e) => setBillingEmail(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Billing Phone</label>
                    <input 
                      type="text" 
                      value={billingPhone}
                      onChange={(e) => setBillingPhone(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Tax ID / VAT No.</label>
                    <input 
                      type="text" 
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Client Currency</label>
                    <select 
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors"
                    >
                      <option>NGN - Nigerian Naira (₦)</option>
                      <option>USD - US Dollar ($)</option>
                      <option>GBP - Great Britain Pound (£)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Street Address</label>
                    <input 
                      type="text" 
                      value={addressStreet}
                      onChange={(e) => setAddressStreet(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">City</label>
                      <input 
                        type="text" 
                        value={addressCity}
                        onChange={(e) => setAddressCity(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">State</label>
                      <input 
                        type="text" 
                        value={addressState}
                        onChange={(e) => setAddressState(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Country</label>
                    <input 
                      type="text" 
                      value={addressCountry}
                      onChange={(e) => setAddressCountry(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                    />
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

          {/* STEP 3: Review */}
          {wizardStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Review client details</h3>
                <p className="text-text-secondary text-sm font-semibold">Verify the client profile before saving.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl p-5 space-y-3 text-xs font-semibold text-[#0F172A]">
                  <span className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider border-b border-[#E5EAF2] pb-2 mb-2">Client Information</span>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Client Name</span>
                    <span className="font-bold">{clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Industry</span>
                    <span>{industry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Contact Person</span>
                    <span>{contactPerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Email</span>
                    <span>{email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Phone</span>
                    <span>{phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Size</span>
                    <span>{companySize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Website</span>
                    <span className="truncate max-w-[150px]">{website}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Status</span>
                    <span className="text-emerald-600 font-bold">{clientStatus}</span>
                  </div>
                </div>

                <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl p-5 space-y-3 text-xs font-semibold text-[#0F172A]">
                  <span className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider border-b border-[#E5EAF2] pb-2 mb-2">Additional Information</span>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Billing Email</span>
                    <span>{billingEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Billing Phone</span>
                    <span>{billingPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Tax ID</span>
                    <span>{taxId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Currency</span>
                    <span>{currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Address</span>
                    <span className="text-right truncate max-w-[150px]">{addressStreet}, {addressCity}, {addressState}, {addressCountry}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between border-t border-[#E5EAF2] pt-6">
                <button onClick={() => setWizardStep(2)} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50 transition-colors">
                  Back
                </button>
                <button onClick={handleAddClient} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                  Create Client Profile
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ----------------- DETAILS VIEW ----------------- */}
      {view === "details" && selectedClient && (
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-[#E5EAF2]">
            <button onClick={() => setView("list")} className="flex items-center gap-2 text-text-secondary hover:text-[#0F172A] transition-colors text-sm font-bold">
              <ArrowLeft size={16} /> Back to Clients
            </button>
            <div className="flex gap-3 w-full sm:w-auto">
              <button 
                onClick={() => setView("edit")}
                className="bg-white border border-[#E5EAF2] text-[#0F172A] hover:bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold transition-colors flex-1 sm:flex-none text-center shadow-sm"
              >
                Edit Details
              </button>
              <button 
                onClick={() => setView("delete")}
                className="bg-white border border-danger/20 text-danger hover:bg-danger/5 px-4 py-2 rounded-xl text-xs font-bold transition-colors flex-1 sm:flex-none text-center"
              >
                Delete Client
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              {getClientAvatar(selectedClient.name, "md")}
              <div>
                <h2 className="text-xl font-bold text-[#0F172A] font-display">{selectedClient.name}</h2>
                <p className="text-xs text-text-secondary mt-1">{selectedClient.industry} • {addressCity}, {addressCountry}</p>
              </div>
            </div>
            <span className="bg-emerald-50 text-[#10B981] text-xs font-bold px-3 py-1 rounded-full uppercase border border-emerald-100">
              {selectedClient.status}
            </span>
          </div>

          {/* Details Navigation */}
          <div className="flex border-b border-[#E5EAF2]">
            {(["Overview", "Projects", "Proposals", "Invoices", "Activity"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveDetailTab(tab)}
                className={`px-6 py-3 text-xs font-bold border-b-2 transition-colors ${
                  activeDetailTab === tab 
                    ? "border-primary text-primary" 
                    : "border-transparent text-text-secondary hover:text-[#0F172A]"
                }`}
              >
                {tab === "Overview" ? "Overview" : tab === "Projects" ? "Projects (3)" : tab === "Proposals" ? "Proposals (3)" : tab === "Invoices" ? "Invoices (4)" : "Activity"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Tab: Overview */}
              {activeDetailTab === "Overview" && (
                <div className="space-y-6">
                  {/* Client Information card */}
                  <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-[#0F172A] text-sm font-display border-b border-[#E5EAF2] pb-3">Client Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-[#0F172A]">
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Contact Person</span>
                        <span>{selectedClient.contactPerson}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Email</span>
                        <div className="flex items-center gap-1.5">
                          <Mail size={12} className="text-text-muted" />
                          <span>{selectedClient.email}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Phone</span>
                        <div className="flex items-center gap-1.5">
                          <Phone size={12} className="text-text-muted" />
                          <span>{selectedClient.phone}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Company Size</span>
                        <span>{selectedClient.companySize}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Website</span>
                        <div className="flex items-center gap-1">
                          <Link href="#" className="text-primary hover:underline">{selectedClient.website}</Link>
                          <ExternalLink size={10} className="text-primary" />
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Linkedin</span>
                        <div className="flex items-center gap-1">
                          <Link href="#" className="text-primary hover:underline">{selectedClient.linkedin}</Link>
                          <ExternalLink size={10} className="text-primary" />
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Client Since</span>
                        <span>{selectedClient.clientSince}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-[#E5EAF2] pt-4 space-y-1">
                      <span className="text-[10px] text-text-secondary font-bold uppercase block">Notes</span>
                      <p className="text-xs text-text-secondary leading-relaxed font-medium">{selectedClient.notes}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: Projects */}
              {activeDetailTab === "Projects" && (
                <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-[#0F172A] text-sm font-display">Projects</h3>
                    <button className="bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors">
                      <Plus size={14} /> New Project
                    </button>
                  </div>
                  
                  <div className="space-y-3.5">
                    {[
                      { name: "Website Redesign", status: "In Progress", progress: 60, dueDate: "May 30, 2024", value: 1200000 },
                      { name: "Mobile App Design", status: "Under Review", progress: 85, dueDate: "Jun 15, 2024", value: 850000 },
                      { name: "Brand Identity Design", status: "Completed", progress: 100, dueDate: "Apr 20, 2024", value: 450000 }
                    ].map((p, i) => (
                      <div key={i} className="flex justify-between items-center p-3.5 border border-[#E5EAF2] rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-[#0F172A] block">{p.name}</span>
                          <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${
                            p.status === "Completed" ? "bg-green-50 text-[#10B981]" :
                            p.status === "In Progress" ? "bg-blue-50 text-primary" :
                            "bg-amber-50 text-amber-600"
                          }`}>{p.status}</span>
                        </div>
                        <div className="w-1/3 flex items-center gap-2">
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${p.progress}%` }}></div>
                          </div>
                          <span className="text-[10px] font-bold text-[#0F172A]">{p.progress}%</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-[#0F172A] block">₦{p.value.toLocaleString()}</span>
                          <span className="text-[10px] text-text-muted font-normal">Due: {p.dueDate}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Proposals */}
              {activeDetailTab === "Proposals" && (
                <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-[#0F172A] text-sm font-display mb-4">Proposals</h3>
                  <div className="space-y-3.5">
                    {[
                      { name: "Website Redesign Proposal", status: "Opened", date: "May 15, 2024", value: 1200000 },
                      { name: "Mobile App Contract Proposal", status: "Sent", date: "May 10, 2024", value: 850000 },
                      { name: "Brand Identity Design Agreement", status: "Signed", date: "May 8, 2024", value: 450000 }
                    ].map((p, i) => (
                      <div key={i} className="flex justify-between items-center p-3.5 border border-[#E5EAF2] rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                        <div>
                          <span className="text-xs font-bold text-[#0F172A] block">{p.name}</span>
                          <span className="text-[10px] text-text-secondary block mt-0.5">Created on {p.date}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-bold text-[#0F172A]">₦{p.value.toLocaleString()}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            p.status === "Signed" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                            p.status === "Opened" ? "bg-green-50 text-[#10B981] border-green-100" :
                            "bg-blue-50 text-primary border-blue-100"
                          }`}>{p.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Invoices */}
              {activeDetailTab === "Invoices" && (
                <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-[#0F172A] text-sm font-display mb-4">Invoices</h3>
                  <div className="space-y-3.5">
                    {[
                      { num: "INV-2024-0012", date: "May 12, 2024", amount: 600000, status: "Paid", dueDate: "May 26, 2024" },
                      { num: "INV-2024-0011", date: "Apr 28, 2024", amount: 450000, status: "Paid", dueDate: "May 12, 2024" },
                      { num: "INV-2024-0010", date: "Apr 10, 2024", amount: 1200000, status: "Paid", dueDate: "Apr 24, 2024" },
                      { num: "INV-2024-0009", date: "Mar 20, 2024", amount: 1200000, status: "Paid", dueDate: "Apr 3, 2024" }
                    ].map((inv, i) => (
                      <div key={i} className="flex justify-between items-center p-3.5 border border-[#E5EAF2] rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                        <div>
                          <span className="text-xs font-bold text-[#0F172A] block">{inv.num}</span>
                          <span className="text-[10px] text-text-secondary block mt-0.5">Invoice date: {inv.date}</span>
                        </div>
                        <div className="flex items-center gap-6 text-xs font-semibold">
                          <span className="text-[#0F172A] font-bold">₦{inv.amount.toLocaleString()}</span>
                          <span className="bg-green-50 text-[#10B981] border border-green-100 px-2.5 py-0.5 rounded-full font-bold">
                            {inv.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Activity */}
              {activeDetailTab === "Activity" && (
                <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-6">
                  <h3 className="font-bold text-[#0F172A] text-sm font-display mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { desc: "Invoice INV-2024-0012 was paid", time: "2h ago", icon: Receipt, color: "text-[#10B981]", bg: "bg-green-50" },
                      { desc: "Website redesign proposal opened", time: "5h ago", icon: Eye, color: "text-primary", bg: "bg-blue-50" },
                      { desc: "Project milestone approved", time: "1d ago", icon: CheckCircle2, color: "text-primary", bg: "bg-blue-50" },
                      { desc: "New project 'Mobile App Design' created", time: "3d ago", icon: Briefcase, color: "text-purple-500", bg: "bg-purple-50" }
                    ].map((act, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className={`w-8 h-8 rounded-full ${act.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <act.icon size={14} className={act.color} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#0F172A] leading-tight">{act.desc}</p>
                          <span className="text-[10px] text-text-muted mt-0.5 block">{act.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Details Financial Summary Sidebar */}
            <div className="space-y-6">
              <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-6">
                <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Financial Summary</span>
                <div className="space-y-3.5 border-b border-[#E5EAF2] pb-4">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-text-secondary font-display">Total Revenue</span>
                    <span className="font-bold text-[#0F172A]">₦5,200,000</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-text-secondary font-display">Paid</span>
                    <span className="font-bold text-emerald-600">₦4,550,000</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-text-secondary font-display">Outstanding</span>
                    <span className="font-bold text-warning">₦650,000</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-text-secondary font-display">Overdue</span>
                    <span className="font-bold text-danger">₦250,000</span>
                  </div>
                </div>

                <div className="space-y-2 text-[10px] text-text-muted leading-relaxed font-semibold">
                  Financial indicators display overall payments, unpaid billings, and active transaction history for this client.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- EDIT VIEW ----------------- */}
      {view === "edit" && selectedClient && (
        <div className="bg-white border border-[#E5EAF2] rounded-2xl overflow-hidden shadow-sm max-w-3xl mx-auto flex flex-col md:flex-row min-h-[500px]">
          {/* Tabs Sidebar */}
          <div className="w-full md:w-60 bg-[#F8FAFC] border-r border-[#E5EAF2] p-4 space-y-1">
            <span className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-4 px-3">Edit Sections</span>
            {[
              { id: "info", label: "Client Info" },
              { id: "billing", label: "Billing Info" },
              { id: "address", label: "Address" },
              { id: "notes", label: "Notes" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setEditTab(tab.id as any)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  editTab === tab.id 
                    ? "bg-[#EFF6FF] text-primary" 
                    : "text-text-secondary hover:text-text-dark hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
            <div className="pt-8 px-3">
              <button 
                onClick={() => setView("details")}
                className="text-xs font-semibold text-text-muted hover:text-[#0F172A] flex items-center gap-1"
              >
                <ArrowLeft size={12} /> Back to Details
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-grow p-6 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-[#E5EAF2] pb-4 mb-6">
                <h3 className="font-bold text-[#0F172A] text-lg font-display">
                  {editTab === "info" && "Client Information"}
                  {editTab === "billing" && "Billing Information"}
                  {editTab === "address" && "Address Details"}
                  {editTab === "notes" && "Client Notes"}
                </h3>
                <button onClick={() => setView("details")} className="text-text-muted hover:text-text-dark">✕</button>
              </div>

              {/* Tab: Client Info */}
              {editTab === "info" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Client Name *</label>
                    <input 
                      type="text" 
                      value={selectedClient.name}
                      onChange={(e) => setSelectedClient({ ...selectedClient, name: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Industry</label>
                    <select 
                      value={selectedClient.industry}
                      onChange={(e) => setSelectedClient({ ...selectedClient, industry: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors"
                    >
                      <option>Technology</option>
                      <option>Finance</option>
                      <option>E-commerce</option>
                      <option>Marketing</option>
                      <option>Design</option>
                      <option>Non-profit</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Contact Person *</label>
                    <input 
                      type="text" 
                      value={selectedClient.contactPerson}
                      onChange={(e) => setSelectedClient({ ...selectedClient, contactPerson: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Email *</label>
                    <input 
                      type="email" 
                      value={selectedClient.email}
                      onChange={(e) => setSelectedClient({ ...selectedClient, email: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Phone Number</label>
                    <input 
                      type="text" 
                      value={selectedClient.phone}
                      onChange={(e) => setSelectedClient({ ...selectedClient, phone: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Company Size</label>
                    <select 
                      value={selectedClient.companySize}
                      onChange={(e) => setSelectedClient({ ...selectedClient, companySize: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors"
                    >
                      <option>1 - 10 employees</option>
                      <option>10 - 50 employees</option>
                      <option>50 - 100 employees</option>
                      <option>100+ employees</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">Website</label>
                    <input 
                      type="text" 
                      value={selectedClient.website}
                      onChange={(e) => setSelectedClient({ ...selectedClient, website: e.target.value })}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#64748B] uppercase tracking-wider mb-2">Status</label>
                    <select 
                      value={selectedClient.status}
                      onChange={(e) => setSelectedClient({ ...selectedClient, status: e.target.value as any })}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Prospect">Prospect</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Tab: Billing Info */}
              {editTab === "billing" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Billing Email</label>
                    <input 
                      type="email" 
                      value={billingEmail}
                      onChange={(e) => setBillingEmail(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Billing Phone</label>
                    <input 
                      type="text" 
                      value={billingPhone}
                      onChange={(e) => setBillingPhone(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Tax ID</label>
                    <input 
                      type="text" 
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Currency</label>
                    <select 
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors"
                    >
                      <option>NGN - Nigerian Naira (₦)</option>
                      <option>USD - US Dollar ($)</option>
                      <option>GBP - Great Britain Pound (£)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Tab: Address */}
              {editTab === "address" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Street Address</label>
                    <input 
                      type="text" 
                      value={addressStreet}
                      onChange={(e) => setAddressStreet(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">City</label>
                    <input 
                      type="text" 
                      value={addressCity}
                      onChange={(e) => setAddressCity(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">State</label>
                    <input 
                      type="text" 
                      value={addressState}
                      onChange={(e) => setAddressState(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Country</label>
                    <input 
                      type="text" 
                      value={addressCountry}
                      onChange={(e) => setAddressCountry(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Tab: Notes */}
              {editTab === "notes" && (
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Notes & Additional Details</label>
                  <textarea 
                    rows={6}
                    value={selectedClient.notes}
                    onChange={(e) => setSelectedClient({ ...selectedClient, notes: e.target.value })}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium resize-none leading-relaxed focus:border-primary transition-colors"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-between border-t border-[#E5EAF2] pt-6 mt-8">
              <button onClick={() => setView("details")} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50 transition-colors">
                Cancel
              </button>
              <button 
                onClick={() => {
                  setClientsList(clientsList.map(c => c.id === selectedClient.id ? selectedClient : c));
                  setView("details");
                }}
                className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- DELETE VIEW ----------------- */}
      {view === "delete" && selectedClient && (
        <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm max-w-sm mx-auto text-center space-y-4">
          <ShieldAlert size={40} className="text-danger mx-auto" />
          <div>
            <h3 className="font-bold text-[#0F172A] text-lg font-display">Delete Client</h3>
            <p className="text-text-secondary text-xs mt-1.5 leading-relaxed font-semibold">
              Are you sure you want to delete <span className="font-bold text-[#0F172A]">{selectedClient.name}</span>? All client data, projects, proposals, and invoices will be permanently removed. This action cannot be undone.
            </p>
          </div>
          
          <div className="flex gap-3 pt-2">
            <button 
              onClick={() => setView("details")}
              className="flex-1 bg-white border border-[#E5EAF2] hover:bg-slate-50 text-[#0F172A] py-2.5 rounded-xl text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleDeleteClient}
              className="flex-1 bg-danger hover:bg-red-600 text-white py-2.5 rounded-xl text-xs font-bold transition-colors"
            >
              Delete Client
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
