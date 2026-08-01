"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Plus, ArrowLeft, ArrowRight, Check, Trash2, ChevronRight, 
  Eye, CheckCircle2, FileText, Calendar, Receipt, Download, 
  Share2, RefreshCw, Sparkles, BarChart2, MoreHorizontal, Printer, X, Search
} from "lucide-react";
import { supabaseAuth } from "@/lib/auth";
import { fetchInvoices, createInvoice, updateInvoiceStatus } from "@/app/actions/db";

interface InvoiceData {
  id: string;
  num: string;
  client: string;
  clientEmail: string;
  scopeProject: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Sent" | "Viewed" | "Overdue" | "Draft";
  created: string;
}

export default function InvoicesPage() {
  const [view, setView] = useState<"list" | "wizard" | "details" | "client_view">("list");
  const [userId, setUserId] = useState<string | null>(null);
  
  // Wizard States
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState("Acme Corp");
  const [clientEmail, setClientEmail] = useState("client@acmecorp.com");
  const [selectedScope, setSelectedScope] = useState("Website Redesign");
  const [invoiceDate, setInvoiceDate] = useState("May 12, 2024");
  const [dueDate, setDueDate] = useState("May 26, 2024");
  const [paymentTerms, setPaymentTerms] = useState("Net 14 days");
  const [currency, setCurrency] = useState("NGN - Nigerian Naira (₦)");
  const [invoiceNum, setInvoiceNum] = useState("INV-2024-0013");
  const [sendMethod, setSendMethod] = useState("link"); // link, email, pdf

  // Items List State
  const [items, setItems] = useState([
    { description: "Website Design (Home, About, Contact)", qty: 1, rate: 250000 },
    { description: "Responsive Development", qty: 1, rate: 150000 },
    { description: "CMS Integration", qty: 1, rate: 50000 },
    { description: "SEO Basic Setup", qty: 1, rate: 50000 }
  ]);
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemRate, setNewItemRate] = useState(0);

  // Detail View State
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceData | null>({
    id: "inv-1", 
    num: "INV-2024-0013", 
    client: "Acme Corp", 
    clientEmail: "client@acmecorp.com",
    scopeProject: "Website Redesign", 
    amount: 500000, 
    dueDate: "May 26, 2024", 
    status: "Paid", 
    created: "May 12, 2024"
  });
  const [activeDetailTab, setActiveDetailTab] = useState<"Overview" | "Activity" | "Payments">("Overview");

  // Invoices List
  const [invoicesList, setInvoicesList] = useState<InvoiceData[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("new") === "true") {
      setView("wizard");
      setWizardStep(1);
    }

    async function loadInvoices() {
      const { data: { session } } = await supabaseAuth.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        const list = await fetchInvoices(session.user.id);
        if (list && list.length > 0) {
          const mapped: InvoiceData[] = list.map((i: any) => ({
            id: i.id,
            num: i.invoice_number,
            client: "Client",
            clientEmail: "client@acmecorp.com",
            scopeProject: "Project Scope",
            amount: Number(i.amount),
            dueDate: new Date(i.due_date).toLocaleDateString(),
            status: i.status as any,
            created: new Date(i.created_at).toLocaleDateString()
          }));
          setInvoicesList(mapped);
        } else {
          setInvoicesList([]);
        }
      }
    }
    loadInvoices();
  }, []);

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  };

  const handleCreateInvoice = async () => {
    let newId = `inv-${Date.now()}`;
    const totalAmount = calculateTotal();
    if (userId) {
      const saved = await createInvoice(
        userId,
        null,
        invoiceNum,
        totalAmount,
        new Date(invoiceDate).toISOString().split('T')[0],
        new Date(dueDate).toISOString().split('T')[0],
        JSON.stringify(items),
        "Paystack checkout"
      );
      if (saved) {
        newId = (saved as any).id;
      }
    }

    const newInvoice: InvoiceData = {
      id: newId,
      num: invoiceNum,
      client: selectedClient,
      clientEmail: clientEmail,
      scopeProject: selectedScope,
      amount: totalAmount,
      dueDate: dueDate,
      status: "Sent",
      created: invoiceDate
    };
    setInvoicesList([newInvoice, ...invoicesList]);
    setSelectedInvoice(newInvoice);
    setWizardStep(5); // Go to Step 5 (Done)
  };

  const handleAddItem = () => {
    if (newItemDesc.trim() && newItemRate > 0) {
      setItems([...items, { description: newItemDesc, qty: 1, rate: newItemRate }]);
      setNewItemDesc("");
      setNewItemRate(0);
    }
  };

  const handleClientChange = (clientName: string) => {
    setSelectedClient(clientName);
    if (clientName === "Acme Corp") {
      setClientEmail("client@acmecorp.com");
      setSelectedScope("Website Redesign");
    } else if (clientName === "KudaTech") {
      setClientEmail("tola@kudatech.com");
      setSelectedScope("Mobile App Design");
    } else {
      setClientEmail("efe@greenlife.org");
      setSelectedScope("Brand Identity");
    }
  };

  const getStatusBadgeClass = (status: InvoiceData["status"]) => {
    switch (status) {
      case "Paid":
        return "bg-emerald-50 text-[#10B981] border-emerald-100";
      case "Sent":
        return "bg-blue-50 text-primary border-blue-100";
      case "Viewed":
        return "bg-purple-50 text-purple-600 border-purple-100";
      case "Overdue":
        return "bg-rose-50 text-danger border-rose-100";
      default:
        return "bg-slate-100 text-text-secondary border-slate-200";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* ----------------- LIST VIEW ----------------- */}
      {view === "list" && (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-[#0F172A] font-display">Invoices</h1>
              <p className="text-text-secondary text-sm font-body">Create, manage, and track client billings.</p>
            </div>
            <button 
              onClick={() => { setView("wizard"); setWizardStep(1); }}
              className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-blue transition-all"
            >
              <Plus size={16} /> New Invoice
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Invoiced", count: "₦2,450,000", desc: "Across 12 invoices", color: "text-[#0F172A]" },
              { label: "Total Paid", count: "₦1,200,000", desc: "6 invoices completed", color: "text-emerald-600" },
              { label: "Outstanding", count: "₦900,000", desc: "4 invoices pending", color: "text-warning" },
              { label: "Overdue", count: "₦350,000", desc: "2 invoices overdue", color: "text-[#EF4444]" }
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
                  placeholder="Search invoices..." 
                  className="bg-white border border-[#E5EAF2] text-text-dark text-xs rounded-xl pl-9 pr-4 py-2 outline-none w-full shadow-sm focus:border-primary transition-colors font-semibold"
                />
              </div>
              <div className="flex gap-2 text-[10px] font-bold overflow-x-auto pb-1 sm:pb-0">
                {["All", "Paid", "Sent", "Viewed", "Overdue", "Draft"].map((cat) => (
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
                    <th className="p-4">Invoice No.</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Project Scope</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EAF2] text-xs font-semibold">
                  {invoicesList.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-text-muted">
                        No invoices found. Click "New Invoice" to create one.
                      </td>
                    </tr>
                  ) : (
                    invoicesList.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => {
                        setSelectedInvoice(inv);
                        setView("details");
                        setActiveDetailTab("Overview");
                      }}>
                        <td className="p-4 text-[#0F172A] font-bold">{inv.num}</td>
                        <td className="p-4 text-[#0F172A] font-bold">{inv.client}</td>
                        <td className="p-4 text-text-secondary">{inv.scopeProject}</td>
                        <td className="p-4 text-[#0F172A] font-bold">₦{inv.amount.toLocaleString()}</td>
                        <td className="p-4 text-text-muted">{inv.dueDate}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadgeClass(inv.status)}`}>
                            {inv.status}
                          </span>
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
        <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm max-w-5xl mx-auto space-y-6 animate-fade-in">
          {/* Stepper Header */}
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 border-b border-[#E5EAF2] pb-4 gap-4">
            <span className="font-bold text-[#0F172A] font-display text-lg font-semibold">New Invoice</span>
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
                    {step === 1 ? "Client" : step === 2 ? "Details" : step === 3 ? "Line Items" : step === 4 ? "Review" : "Send"}
                  </span>
                  {step < 5 && <div className="w-3 border-t border-[#E5EAF2]"></div>}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left Hand: Config forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Select Client */}
              {wizardStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-base font-display">Client Information</h3>
                    <p className="text-text-secondary text-xs mt-1">Select the client for this invoice billing.</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">Select Client</label>
                      <select 
                        value={selectedClient}
                        onChange={(e) => handleClientChange(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors"
                      >
                        <option>Acme Corp</option>
                        <option>KudaTech</option>
                        <option>Greenlife NG</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">Client Email</label>
                      <input 
                        type="email" 
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">Project Scope Reference</label>
                      <select 
                        value={selectedScope}
                        onChange={(e) => setSelectedScope(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors"
                      >
                        <option>Website Redesign</option>
                        <option>Mobile App Design</option>
                        <option>Brand Identity</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Invoice Details */}
              {wizardStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-base font-display">Invoice Settings</h3>
                    <p className="text-text-secondary text-xs mt-1">Specify payment dates, terms, and currency.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">Invoice Number</label>
                      <input 
                        type="text" 
                        value={invoiceNum}
                        onChange={(e) => setInvoiceNum(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium text-center focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">Currency</label>
                      <select 
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors"
                      >
                        <option>NGN - Nigerian Naira (₦)</option>
                        <option>USD - US Dollar ($)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">Invoice Date</label>
                      <input 
                        type="text" 
                        value={invoiceDate}
                        onChange={(e) => setInvoiceDate(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium text-center focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">Due Date</label>
                      <input 
                        type="text" 
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-medium text-center focus:border-primary transition-colors"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">Payment Terms</label>
                      <select 
                        value={paymentTerms}
                        onChange={(e) => setPaymentTerms(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer focus:border-primary transition-colors"
                      >
                        <option>Net 14 days</option>
                        <option>Net 30 days</option>
                        <option>Due on Receipt</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Line Items */}
              {wizardStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-base font-display">Invoice Line Items</h3>
                    <p className="text-text-secondary text-xs mt-1">Add details of services and rates to bill.</p>
                  </div>
                  
                  <div className="border border-[#E5EAF2] rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#F8FAFC] border-b border-[#E5EAF2] text-text-secondary text-[10px] uppercase font-bold">
                          <th className="p-3">Description</th>
                          <th className="p-3 text-center">Qty</th>
                          <th className="p-3 text-right">Rate</th>
                          <th className="p-3 text-right">Total</th>
                          <th className="p-3 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5EAF2]">
                        {items.map((item, idx) => (
                          <tr key={idx} className="border-b border-[#E5EAF2] last:border-0 font-semibold text-[#0F172A] text-xs">
                            <td className="p-3">{item.description}</td>
                            <td className="p-3 text-center">{item.qty}</td>
                            <td className="p-3 text-right">₦{item.rate.toLocaleString()}</td>
                            <td className="p-3 text-right">₦{(item.qty * item.rate).toLocaleString()}</td>
                            <td className="p-3 text-center">
                              <button 
                                onClick={() => setItems(items.filter((_, i) => i !== idx))}
                                className="text-text-muted hover:text-danger p-1 rounded hover:bg-rose-50"
                              >
                                <Trash2 size={13} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-[#E5EAF2]">
                    <input 
                      type="text" 
                      placeholder="Add item description..." 
                      value={newItemDesc}
                      onChange={(e) => setNewItemDesc(e.target.value)}
                      className="flex-grow bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-3 py-2.5 outline-none font-medium focus:border-primary transition-colors"
                    />
                    <input 
                      type="number" 
                      placeholder="Rate (₦)" 
                      value={newItemRate || ""}
                      onChange={(e) => setNewItemRate(Number(e.target.value))}
                      className="w-28 bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-3 py-2.5 outline-none font-medium text-right focus:border-primary transition-colors"
                    />
                    <button 
                      onClick={handleAddItem}
                      className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {wizardStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-base font-display">Review Invoice</h3>
                    <p className="text-text-secondary text-xs mt-1">Review the compiled invoice document representation.</p>
                  </div>

                  <div className="border border-[#E5EAF2] rounded-2xl p-8 bg-white text-xs space-y-6 shadow-sm">
                    <div className="flex justify-between items-start border-b border-[#E5EAF2] pb-6">
                      <div>
                        <h2 className="text-lg font-black text-primary font-display">PRICIS</h2>
                        <p className="text-[10px] text-text-muted mt-0.5 uppercase tracking-wide">Digital Billing Invoice</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#0F172A]">{invoiceNum}</span>
                        <p className="text-[10px] text-text-secondary mt-1">Issued: {invoiceDate}</p>
                        <p className="text-[10px] text-text-secondary">Due Date: {dueDate}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-[#0F172A]">
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Billed To</span>
                        <span className="font-bold">{selectedClient}</span>
                        <span className="block text-text-secondary mt-0.5">{clientEmail}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Project Ref</span>
                        <span className="font-bold">{selectedScope}</span>
                      </div>
                    </div>

                    <div className="border-t border-b border-[#E5EAF2] py-4">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-[10px] text-text-secondary uppercase font-bold border-b border-[#E5EAF2] pb-2">
                            <th className="pb-2">Description</th>
                            <th className="pb-2 text-right">Qty</th>
                            <th className="pb-2 text-right">Rate</th>
                            <th className="pb-2 text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5EAF2] font-semibold text-[#0F172A]">
                          {items.map((it, i) => (
                            <tr key={i}>
                              <td className="py-2.5">{it.description}</td>
                              <td className="py-2.5 text-right">{it.qty}</td>
                              <td className="py-2.5 text-right">₦{it.rate.toLocaleString()}</td>
                              <td className="py-2.5 text-right">₦{(it.qty * it.rate).toLocaleString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end">
                      <div className="w-48 space-y-2 border-t border-[#E5EAF2] pt-2 font-semibold">
                        <div className="flex justify-between text-text-secondary text-[10px]">
                          <span>Subtotal</span>
                          <span>₦{calculateTotal().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t border-[#E5EAF2] pt-2 text-sm text-[#0F172A] font-bold">
                          <span>Total (₦)</span>
                          <span>₦{calculateTotal().toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Send method selection */}
              {wizardStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-base font-display">Send Invoice</h3>
                    <p className="text-text-secondary text-xs mt-1">Invoice was successfully created. Select how to share it.</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: "link", title: "Copy Link", desc: "Share secure web invoice link" },
                      { id: "email", title: "Send Email", desc: "Deliver straight to client inbox" },
                      { id: "pdf", title: "Download PDF", desc: "Get offline document copy" }
                    ].map((opt) => (
                      <button 
                        key={opt.id}
                        onClick={() => setSendMethod(opt.id)}
                        className={`p-4 border rounded-2xl text-center space-y-2 transition-all ${
                          sendMethod === opt.id ? "border-primary bg-[#EFF6FF]" : "border-[#E5EAF2] hover:bg-slate-50"
                        }`}
                      >
                        <span className="font-bold text-xs text-[#0F172A] block">{opt.title}</span>
                        <span className="text-[10px] text-text-secondary font-semibold leading-tight">{opt.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between border-t border-[#E5EAF2] pt-6 mt-8">
                {wizardStep === 1 ? (
                  <button onClick={() => setView("list")} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50 transition-colors">
                    Cancel
                  </button>
                ) : (
                  <button onClick={() => setWizardStep(wizardStep - 1)} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50 transition-colors">
                    Back
                  </button>
                )}
                
                {wizardStep < 4 ? (
                  <button onClick={() => setWizardStep(wizardStep + 1)} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                    Next
                  </button>
                ) : wizardStep === 4 ? (
                  <button onClick={handleCreateInvoice} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                    Finalize & Create
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      if (sendMethod === "link") alert("Invoice web link copied!");
                      if (sendMethod === "email") alert("Invoice email sent to client!");
                      if (sendMethod === "pdf") alert("Downloading invoice PDF document...");
                      setView("list");
                    }} 
                    className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue"
                  >
                    Finish
                  </button>
                )}
              </div>
            </div>

            {/* Right Hand: Invoice summary card */}
            <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-6">
              <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Summary</span>
              
              <div className="space-y-4">
                <div className="space-y-3.5 text-xs font-semibold text-[#0F172A] border-b border-[#E5EAF2] pb-4">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Client</span>
                    <span className="font-bold">{selectedClient}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Email</span>
                    <span className="truncate max-w-[120px]">{clientEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Project Reference</span>
                    <span>{selectedScope}</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs font-semibold text-[#0F172A] border-b border-[#E5EAF2] pb-4">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Invoice Date</span>
                    <span>{invoiceDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Due Date</span>
                    <span>{dueDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Terms</span>
                    <span>{paymentTerms}</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs font-semibold text-[#0F172A]">
                  <div className="flex justify-between text-sm font-bold border-t border-[#E5EAF2] pt-2">
                    <span>Total Bill</span>
                    <span>₦{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- DETAILS VIEW ----------------- */}
      {view === "details" && selectedInvoice && (
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-[#E5EAF2]">
            <button onClick={() => setView("list")} className="flex items-center gap-2 text-text-secondary hover:text-[#0F172A] transition-colors text-sm font-bold">
              <ArrowLeft size={16} /> Back to Invoices
            </button>
            <div className="flex gap-3 w-full sm:w-auto">
              <button 
                onClick={() => setView("client_view")}
                className="bg-white border border-[#E5EAF2] text-[#0F172A] hover:bg-slate-50 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex-1 sm:flex-none flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Eye size={14} className="text-text-secondary" /> Client View
              </button>
              <button className="bg-white border border-[#E5EAF2] text-[#0F172A] hover:bg-slate-50 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex-1 sm:flex-none flex items-center justify-center gap-1.5 shadow-sm">
                <Download size={14} className="text-text-secondary" /> Download PDF
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A] font-display">{selectedInvoice.num}</h2>
              <p className="text-xs text-text-secondary mt-1">{selectedInvoice.client} • Created {selectedInvoice.created}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadgeClass(selectedInvoice.status)}`}>
              {selectedInvoice.status}
            </span>
          </div>

          {/* Details Navigation */}
          <div className="flex border-b border-[#E5EAF2]">
            {(["Overview", "Activity", "Payments"] as const).map((tab) => (
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
                  {/* Invoice Summary */}
                  <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-[#0F172A] text-sm font-display border-b border-[#E5EAF2] pb-3">Invoice Overview</h3>
                    <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-[#0F172A]">
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Invoice Number</span>
                        <span>{selectedInvoice.num}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Project Scope</span>
                        <span>{selectedInvoice.scopeProject}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Billed To</span>
                        <span>{selectedInvoice.client}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Client Email</span>
                        <span>{selectedInvoice.clientEmail}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Invoice Date</span>
                        <span>{selectedInvoice.created}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Due Date</span>
                        <span>{selectedInvoice.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Line Items */}
                  <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-[#0F172A] text-sm font-display border-b border-[#E5EAF2] pb-3">Line Items</h3>
                    <table className="w-full text-left border-collapse font-body">
                      <thead>
                        <tr className="text-[10px] text-text-secondary uppercase font-bold border-b border-[#E5EAF2] pb-2">
                          <th className="pb-2">Description</th>
                          <th className="pb-2 text-right">Qty</th>
                          <th className="pb-2 text-right">Rate</th>
                          <th className="pb-2 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5EAF2] font-semibold text-[#0F172A] text-xs">
                        {items.map((it, i) => (
                          <tr key={i}>
                            <td className="py-3">{it.description}</td>
                            <td className="py-3 text-right">{it.qty}</td>
                            <td className="py-3 text-right">₦{it.rate.toLocaleString()}</td>
                            <td className="py-3 text-right">₦{(it.qty * it.rate).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab: Activity */}
              {activeDetailTab === "Activity" && (
                <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-[#0F172A] text-sm font-display mb-4">Invoice Timeline Activity</h3>
                  <div className="space-y-4">
                    {[
                      { title: "Invoice Paid", desc: "Payment received via bank transfer", time: "May 26, 2024 - 02:40 PM", status: "emerald" },
                      { title: "Invoice Viewed by Client", desc: "Alex Johnson opened invoice link", time: "May 13, 2024 - 09:12 AM", status: "purple" },
                      { title: "Invoice Sent", desc: "Delivered invoice link to alex@acmecorp.com", time: "May 12, 2024 - 05:00 PM", status: "blue" },
                      { title: "Invoice Created", desc: "Draft compiled by Alex John", time: "May 12, 2024 - 04:30 PM", status: "grey" }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="flex flex-col items-center">
                          <div className={`w-3.5 h-3.5 rounded-full border-2 border-white ring-4 ${
                            step.status === "emerald" ? "bg-emerald-500 ring-emerald-50" :
                            step.status === "purple" ? "bg-purple-500 ring-purple-50" :
                            step.status === "blue" ? "bg-blue-500 ring-blue-50" :
                            "bg-slate-400 ring-slate-50"
                          } z-10`} />
                          {i < 3 && <div className="w-0.5 h-12 bg-slate-100 -mt-1" />}
                        </div>
                        <div className="pt-0.5">
                          <h4 className="text-xs font-bold text-[#0F172A]">{step.title}</h4>
                          <p className="text-[10px] text-text-secondary mt-0.5">{step.desc}</p>
                          <span className="text-[9px] text-text-muted mt-1 block font-semibold">{step.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Payments */}
              {activeDetailTab === "Payments" && (
                <div className="bg-white border border-[#E5EAF2] rounded-2xl p-10 shadow-sm text-center">
                  <Receipt size={40} className="text-text-muted mx-auto mb-2" />
                  <h4 className="font-bold text-sm text-[#0F172A] mb-1">Payment Transactions</h4>
                  <p className="text-xs text-text-secondary">Fully matched with bank integrations.</p>
                </div>
              )}

            </div>

            {/* Right Details Financial Summary Sidebar */}
            <div className="space-y-6">
              <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-6">
                <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Financial Breakdown</span>
                <div className="space-y-3.5 border-b border-[#E5EAF2] pb-4">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-text-secondary font-display">Subtotal</span>
                    <span className="font-bold text-[#0F172A]">₦{selectedInvoice.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-text-secondary font-display">Tax (0%)</span>
                    <span className="font-bold text-[#0F172A]">₦0</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-text-secondary font-display">Total Bill</span>
                    <span className="font-bold text-[#0F172A]">₦{selectedInvoice.amount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2 text-[10px] text-text-muted leading-relaxed font-semibold">
                  This invoice is fully processed and finalized.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- CLIENT VIEW ----------------- */}
      {view === "client_view" && selectedInvoice && (
        <div className="space-y-6 max-w-4xl mx-auto animate-fade-in text-left">
          <div className="flex justify-between items-center pb-4 border-b border-[#E5EAF2]">
            <button onClick={() => setView("details")} className="flex items-center gap-2 text-text-secondary hover:text-[#0F172A] transition-colors text-sm font-bold">
              <ArrowLeft size={16} /> Back to Dashboard Admin
            </button>
            <button 
              onClick={() => alert("Simulating PDF download...")}
              className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-blue"
            >
              Download Offline Document
            </button>
          </div>

          <div className="bg-white border border-[#E5EAF2] rounded-3xl p-10 space-y-8 shadow-md relative">
            {/* Watermark/Logo */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-black text-primary tracking-wide font-display">PRICIS</h1>
                <p className="text-[10px] text-text-muted mt-1 leading-none uppercase tracking-widest font-semibold">Invoice Document</p>
              </div>
              <div className="text-right space-y-1">
                <span className="text-sm font-bold text-[#0F172A] block">{selectedInvoice.num}</span>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${getStatusBadgeClass(selectedInvoice.status)}`}>
                  {selectedInvoice.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 text-xs font-semibold text-[#0F172A]">
              <div>
                <span className="text-[10px] text-text-secondary uppercase block mb-1 tracking-wider">From</span>
                <span className="font-bold block">Pricis Consultants Ltd.</span>
                <span className="text-text-secondary block mt-0.5">finance@pricis.co</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-text-secondary uppercase block mb-1 tracking-wider">Billed To</span>
                <span className="font-bold block">{selectedInvoice.client}</span>
                <span className="text-text-secondary block mt-0.5">{selectedInvoice.clientEmail}</span>
              </div>
            </div>

            {/* Line items table */}
            <div className="border border-[#E5EAF2] rounded-xl overflow-hidden shadow-inner">
              <table className="w-full text-left border-collapse font-body">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E5EAF2] text-text-secondary text-[10px] uppercase font-bold">
                    <th className="p-3">Description</th>
                    <th className="p-3 text-right">Qty</th>
                    <th className="p-3 text-right">Rate</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EAF2] font-semibold text-[#0F172A] text-xs">
                  {items.map((it, i) => (
                    <tr key={i}>
                      <td className="p-3">{it.description}</td>
                      <td className="p-3 text-right">{it.qty}</td>
                      <td className="p-3 text-right">₦{it.rate.toLocaleString()}</td>
                      <td className="p-3 text-right font-bold">₦{(it.qty * it.rate).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-4">
              <div className="w-64 space-y-2 border-t border-[#E5EAF2] pt-3 text-xs font-semibold text-[#0F172A]">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span>₦{selectedInvoice.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-[#E5EAF2] pt-3 text-base text-[#0F172A] font-black font-display">
                  <span>Total Amount</span>
                  <span>₦{selectedInvoice.amount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#E5EAF2] pt-6 text-[10px] text-text-muted leading-relaxed font-semibold text-center">
              Thank you for your business. Please make bank transfers referencing the invoice number {selectedInvoice.num}.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
