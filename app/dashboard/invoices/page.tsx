"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Plus, ArrowLeft, ArrowRight, Check, Trash2, ChevronRight, 
  Eye, CheckCircle2, FileText, Calendar, Receipt, Download, 
  Share2, RefreshCw, Sparkles, BarChart2, MoreHorizontal, Printer, X
} from "lucide-react";

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
  const [invoicesList, setInvoicesList] = useState<InvoiceData[]>([
    { id: "inv-1", num: "INV-2024-0012", client: "Acme Corp", clientEmail: "alex@acmecorp.com", scopeProject: "Website Redesign", amount: 500000, dueDate: "May 26, 2024", status: "Paid", created: "May 12, 2024" },
    { id: "inv-2", num: "INV-2024-0011", client: "KudaTech", clientEmail: "tola@kudatech.com", scopeProject: "Mobile App Design", amount: 750000, dueDate: "May 30, 2024", status: "Sent", created: "May 10, 2024" },
    { id: "inv-3", num: "INV-2024-0010", client: "Greenlife NG", clientEmail: "efe@greenlife.org", scopeProject: "Brand Identity", amount: 450000, dueDate: "May 20, 2024", status: "Viewed", created: "May 8, 2024" },
    { id: "inv-4", num: "INV-2024-0009", client: "StoreHub", clientEmail: "nkechi@storehub.ng", scopeProject: "E-commerce Website", amount: 1200000, dueDate: "May 15, 2024", status: "Overdue", created: "May 1, 2024" },
    { id: "inv-5", num: "INV-2024-0008", client: "StartupX", clientEmail: "tunde@startupx.com", scopeProject: "SEO & Content Strategy", amount: 300000, dueDate: "May 10, 2024", status: "Draft", created: "Apr 30, 2024" }
  ]);

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  };

  const handleCreateInvoice = () => {
    const newInvoice: InvoiceData = {
      id: `inv-${Date.now()}`,
      num: invoiceNum,
      client: selectedClient,
      clientEmail: clientEmail,
      scopeProject: selectedScope,
      amount: calculateTotal(),
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

  return (
    <div className="space-y-6">
      {/* ----------------- LIST VIEW ----------------- */}
      {view === "list" && (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-text-dark font-display">Invoices</h1>
              <p className="text-text-secondary text-sm font-body">Create, manage and track your invoices</p>
            </div>
            <button 
              onClick={() => { setView("wizard"); setWizardStep(1); }}
              className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-blue transition-colors"
            >
              <Plus size={18} /> New Invoice
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Invoiced", count: "₦3,250,000", desc: "All time" },
              { label: "Paid", count: "₦1,850,000", desc: "57% of total", color: "text-[#10B981]" },
              { label: "Outstanding", count: "₦950,000", desc: "29% of total", color: "text-warning" },
              { label: "Draft", count: "₦450,000", desc: "14% of total", color: "text-text-secondary" },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-border-light rounded-xl p-5 shadow-sm">
                <span className={`text-2xl font-bold font-display ${stat.color}`}>{stat.count}</span>
                <p className="text-xs font-semibold text-text-dark mt-1">{stat.label}</p>
                <p className="text-[10px] text-text-secondary mt-0.5">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Table list */}
          <div className="bg-white border border-border-light rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-border-light flex justify-between items-center gap-4 bg-surface-secondary/50">
              <input 
                type="text" 
                placeholder="Search invoices..." 
                className="bg-white border border-border-light text-text-dark text-sm rounded-xl px-4 py-2 outline-none w-64 shadow-sm"
              />
              <div className="flex gap-2 text-xs font-semibold">
                {["All", "Draft", "Sent", "Viewed", "Paid", "Overdue"].map((cat) => (
                  <button key={cat} className={`px-3.5 py-1.5 rounded-xl border transition-colors ${
                    cat === "All" ? "bg-primary text-white border-transparent" : "bg-white border-border-light text-text-secondary hover:bg-surface-secondary"
                  }`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-secondary border-b border-border-light text-text-secondary text-xs uppercase tracking-wider font-semibold">
                    <th className="p-4">Invoice</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Scope / Project</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Due Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Created</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light text-sm font-medium">
                  {invoicesList.map((inv) => (
                    <tr key={inv.id} className="hover:bg-surface-secondary/50 cursor-pointer" onClick={() => {
                      setSelectedInvoice(inv);
                      setView("details");
                      setActiveDetailTab("Overview");
                    }}>
                      <td className="p-4 text-text-dark font-bold">{inv.num}</td>
                      <td className="p-4 text-text-secondary">{inv.client}</td>
                      <td className="p-4 text-text-secondary">{inv.scopeProject}</td>
                      <td className="p-4 text-text-dark font-bold">₦{inv.amount.toLocaleString()}</td>
                      <td className="p-4 text-text-muted">{inv.dueDate}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          inv.status === "Paid" ? "bg-green-50 text-[#10B981]" :
                          inv.status === "Sent" ? "bg-blue-50 text-primary" :
                          inv.status === "Viewed" ? "bg-amber-50 text-amber-600" :
                          inv.status === "Overdue" ? "bg-red-50 text-danger" :
                          "bg-slate-100 text-text-secondary"
                        }`}>{inv.status}</span>
                      </td>
                      <td className="p-4 text-text-muted">{inv.created}</td>
                      <td className="p-4 text-text-muted hover:text-primary transition-colors" onClick={(e) => e.stopPropagation()}>
                        <button className="p-1 rounded hover:bg-slate-100">
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-border-light flex justify-between items-center bg-surface-secondary/20 text-xs text-text-secondary font-semibold">
              <span>Showing 1 to 5 of 24 invoices</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((page) => (
                  <button key={page} className={`w-8 h-8 rounded-lg border ${
                    page === 1 ? "bg-primary text-white border-transparent" : "bg-white border-border-light text-text-secondary hover:bg-slate-100"
                  }`}>{page}</button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* ----------------- WIZARD FLOW ----------------- */}
      {view === "wizard" && (
        <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm max-w-5xl mx-auto space-y-6">
          {/* Stepper Header */}
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 border-b border-border-light pb-4 gap-4">
            <span className="font-bold text-text-dark font-display text-lg font-semibold">Create Invoice</span>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center gap-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    wizardStep === step 
                      ? "bg-primary text-white" 
                      : wizardStep > step 
                      ? "bg-primary/10 text-primary" 
                      : "bg-surface-secondary text-text-muted border border-border-light"
                  }`}>
                    {wizardStep > step ? <Check size={12} /> : step}
                  </div>
                  <span className={`text-[10px] font-bold ${
                    wizardStep === step ? "text-primary" : "text-text-muted"
                  }`}>
                    {step === 1 ? "Details" : step === 2 ? "Line Items" : step === 3 ? "Preview" : step === 4 ? "Send" : "Done"}
                  </span>
                  {step < 5 && <div className="w-3 border-t border-border-light"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Wizard Body: Split Form + Sidebar layout (except step 5) */}
          {wizardStep < 5 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Form content */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* STEP 1: Details */}
                {wizardStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-text-dark text-lg font-display mb-1">Invoice Details</h3>
                      <p className="text-text-secondary text-sm">Add the basic information for your invoice.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Client</label>
                        <select 
                          value={selectedClient}
                          onChange={(e) => handleClientChange(e.target.value)}
                          className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer"
                        >
                          <option>Acme Corp</option>
                          <option>KudaTech</option>
                          <option>Greenlife NG</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Related Scope</label>
                        <select 
                          value={selectedScope}
                          onChange={(e) => setSelectedScope(e.target.value)}
                          className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer"
                        >
                          <option>{selectedScope}</option>
                          <option>Mobile App Mockups</option>
                          <option>Brand Identity Guidelines</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Invoice Date</label>
                        <input 
                          type="text" 
                          value={invoiceDate}
                          onChange={(e) => setInvoiceDate(e.target.value)}
                          className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-medium text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Due Date</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-medium text-center"
                          />
                          <span className="bg-primary/5 text-primary text-[10px] font-bold px-2 py-3 rounded-xl flex-shrink-0 self-center">14 days</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Currency</label>
                        <select 
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-semibold cursor-pointer"
                        >
                          <option>NGN - Nigerian Naira (₦)</option>
                          <option>USD - US Dollar ($)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Invoice Number</label>
                        <input 
                          type="text" 
                          value={invoiceNum}
                          onChange={(e) => setInvoiceNum(e.target.value)}
                          className="w-full bg-surface-secondary border border-border-light text-text-dark text-sm rounded-xl px-4 py-2.5 outline-none font-medium"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Line Items */}
                {wizardStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-text-dark text-lg font-display mb-1">Add line items</h3>
                      <p className="text-text-secondary text-sm">Add the items, services or milestones for this invoice.</p>
                    </div>

                    <div className="border border-border-light rounded-xl overflow-hidden shadow-sm">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead>
                          <tr className="bg-surface-secondary border-b border-border-light text-text-secondary text-xs uppercase font-semibold">
                            <th className="p-3">Description</th>
                            <th className="p-3 w-16 text-center">Qty</th>
                            <th className="p-3 w-32 text-right font-display">Rate (₦)</th>
                            <th className="p-3 w-32 text-right font-display">Amount (₦)</th>
                            <th className="p-3 w-16 text-center">Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item, idx) => (
                            <tr key={idx} className="border-b border-border-light last:border-0 font-semibold text-text-dark">
                              <td className="p-3 text-xs">{item.description}</td>
                              <td className="p-3 text-center">{item.qty}</td>
                              <td className="p-3 text-right">₦{item.rate.toLocaleString()}</td>
                              <td className="p-3 text-right">₦{(item.qty * item.rate).toLocaleString()}</td>
                              <td className="p-3 text-center">
                                <button 
                                  onClick={() => setItems(items.filter((_, i) => i !== idx))}
                                  className="text-text-muted hover:text-danger transition-colors p-1"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-border-light/60">
                      <input 
                        type="text" 
                        placeholder="Website Design (Home, About, Contact)"
                        value={newItemDesc}
                        onChange={(e) => setNewItemDesc(e.target.value)}
                        className="flex-grow bg-surface-secondary border border-border-light text-text-dark text-xs rounded-xl px-3 py-2.5 outline-none font-medium"
                      />
                      <div className="flex gap-2">
                        <input 
                          type="number" 
                          placeholder="Rate"
                          value={newItemRate || ""}
                          onChange={(e) => setNewItemRate(Number(e.target.value))}
                          className="w-28 bg-surface-secondary border border-border-light text-text-dark text-xs rounded-xl px-3 py-2.5 outline-none font-medium text-right"
                        />
                        <button 
                          onClick={handleAddItem}
                          className="bg-primary text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-primary-hover transition-colors whitespace-nowrap"
                        >
                          + Add Line Item
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Preview */}
                {wizardStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-text-dark text-lg font-display mb-1">Review your invoice</h3>
                      <p className="text-text-secondary text-sm">Please review your invoice details before sending.</p>
                    </div>

                    {/* Branded Invoice Sheet */}
                    <div className="border border-border-light rounded-2xl p-8 bg-white text-xs space-y-6 shadow-sm">
                      <div className="flex justify-between items-start border-b border-border-light pb-6">
                        <div>
                          <span className="font-black text-lg tracking-tight text-text-dark font-display">pricis.</span>
                          <div className="text-[10px] text-text-secondary mt-2 space-y-0.5">
                            <p>Alex John</p>
                            <p>Freelance UI/UX Designer</p>
                            <p>alexjohn@example.com</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <h4 className="font-bold text-sm text-text-dark">{invoiceNum}</h4>
                          <span className="bg-slate-100 text-text-secondary px-2 py-0.5 rounded text-[9px] font-bold uppercase block mt-1 w-fit ml-auto">Draft</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-text-dark font-semibold">
                        <div>
                          <span className="text-[10px] text-text-secondary uppercase font-bold block mb-1">Bill To:</span>
                          <p className="text-xs font-bold">{selectedClient}</p>
                          <p className="text-text-muted mt-0.5 font-normal">{clientEmail}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-text-secondary uppercase font-bold block mb-1">Invoice Info:</span>
                          <p>Date: {invoiceDate}</p>
                          <p className="mt-0.5">Due Date: {dueDate}</p>
                          <p className="mt-0.5">Terms: {paymentTerms}</p>
                        </div>
                      </div>

                      <div className="border-t border-b border-border-light py-4">
                        <table className="w-full text-left text-[11px] font-semibold text-text-dark">
                          <thead>
                            <tr className="text-[10px] text-text-secondary uppercase font-bold border-b border-border-light pb-2">
                              <th className="pb-2">Description</th>
                              <th className="pb-2 w-16 text-center">Qty</th>
                              <th className="pb-2 w-28 text-right">Rate</th>
                              <th className="pb-2 w-28 text-right">Amount</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border-light/40">
                            {items.map((it, idx) => (
                              <tr key={idx} className="py-2.5">
                                <td className="py-2.5 text-xs">{it.description}</td>
                                <td className="py-2.5 text-center">{it.qty}</td>
                                <td className="py-2.5 text-right">₦{it.rate.toLocaleString()}</td>
                                <td className="py-2.5 text-right">₦{(it.qty * it.rate).toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex justify-end text-xs font-bold text-text-dark">
                        <div className="w-48 space-y-2 border-t border-border-light pt-2">
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Subtotal</span>
                            <span>₦{calculateTotal().toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-t border-border-light pt-2 text-sm">
                            <span>Total</span>
                            <span>₦{calculateTotal().toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Send */}
                {wizardStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-bold text-text-dark text-lg font-display mb-1">Send invoice to client</h3>
                      <p className="text-text-secondary text-sm">Choose how you want to send this invoice.</p>
                    </div>

                    <div className="space-y-3">
                      {[
                        { id: "link", label: "Share Invoice Link", desc: "Send a secure link your client can view and pay." },
                        { id: "email", label: "Email Invoice", desc: "Send invoice as a PDF attachment." },
                        { id: "pdf", label: "Download PDF", desc: "Download and send manually." }
                      ].map((opt) => (
                        <label key={opt.id} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                          sendMethod === opt.id ? "border-primary bg-primary/5" : "border-border-light hover:bg-slate-50"
                        }`}>
                          <input 
                            type="radio" 
                            name="sendMethod"
                            checked={sendMethod === opt.id}
                            onChange={() => setSendMethod(opt.id)}
                            className="text-primary h-4 w-4" 
                          />
                          <div>
                            <span className="block text-xs font-bold text-text-dark">{opt.label}</span>
                            <span className="block text-[10px] text-text-secondary mt-0.5">{opt.desc}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons for Wizard Steps 1-4 */}
                <div className="flex justify-between border-t border-border-light pt-6 mt-8">
                  {wizardStep === 1 ? (
                    <button onClick={() => setView("list")} className="px-5 py-2.5 rounded-full border border-border-light text-text-secondary text-sm font-semibold hover:bg-surface-secondary">
                      Cancel
                    </button>
                  ) : (
                    <button onClick={() => setWizardStep(wizardStep - 1)} className="px-5 py-2.5 rounded-full border border-border-light text-text-secondary text-sm font-semibold hover:bg-surface-secondary">
                      Back
                    </button>
                  )}
                  {wizardStep < 4 ? (
                    <button onClick={() => setWizardStep(wizardStep + 1)} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                      Next
                    </button>
                  ) : (
                    <button onClick={handleCreateInvoice} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">
                      Send Invoice
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: Dynamic Summary Sidebar */}
              <div className="space-y-6">
                <div className="bg-surface-secondary border border-border-light rounded-2xl p-6 shadow-sm space-y-6">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Summary</span>
                  
                  {/* Step 1 Details Metadata */}
                  {wizardStep === 1 && (
                    <div className="space-y-3.5 text-xs font-semibold text-text-dark border-b border-border-light pb-4">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Client</span>
                        <span>{selectedClient}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Project</span>
                        <span>{selectedScope}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Invoice Date</span>
                        <span>{invoiceDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Due Date</span>
                        <span>{dueDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Invoice No.</span>
                        <span>{invoiceNum}</span>
                      </div>
                    </div>
                  )}

                  {/* Steps 2-4 Pricing Subtotals */}
                  {wizardStep >= 2 && (
                    <div className="space-y-3 text-xs font-semibold text-text-dark border-b border-border-light pb-4">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Subtotal</span>
                        <span>₦{calculateTotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Discount</span>
                        <span>0%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Tax</span>
                        <span>0%</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold border-t border-border-light pt-2">
                        <span>Total</span>
                        <span>₦{calculateTotal().toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  {/* Step 4 Send Message Draft inside Sidebar */}
                  {wizardStep === 4 && (
                    <div className="space-y-2">
                      <span className="block text-[10px] font-bold text-text-secondary uppercase">Message to client</span>
                      <textarea 
                        rows={6}
                        defaultValue={`Hi ${selectedClient},\n\nPlease find attached invoice ${invoiceNum} for the ${selectedScope} project.\n\nLet me know if you have any questions.\n\nThank you!`}
                        className="w-full bg-white border border-border-light text-text-dark text-[11px] rounded-xl px-3 py-2 outline-none font-medium resize-none leading-relaxed"
                      />
                    </div>
                  )}

                  <div className="text-[10px] text-text-muted leading-relaxed">
                    Invoice creation details updates dynamically. Complete all steps to generate share links and PDFs.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* STEP 5: Done */
            <div className="max-w-md mx-auto text-center py-10 space-y-6">
              <div className="w-16 h-16 rounded-full bg-green-50 text-[#10B981] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h3 className="font-bold text-text-dark text-xl font-display">Invoice Created & Sent!</h3>
                <p className="text-text-secondary text-sm mt-2 leading-relaxed">
                  Invoice <span className="font-bold text-text-dark">{invoiceNum}</span> has been successfully created and sent to <span className="font-bold text-text-dark">{selectedClient}</span> ({clientEmail}).
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => { setView("details"); setActiveDetailTab("Overview"); }}
                  className="flex-1 bg-white border border-border-light hover:bg-slate-50 text-text-dark py-2.5 rounded-xl text-xs font-bold transition-colors"
                >
                  View Details
                </button>
                <button 
                  onClick={() => setView("list")}
                  className="flex-grow bg-primary hover:bg-primary-hover text-white py-2.5 rounded-xl text-xs font-bold transition-colors shadow-blue"
                >
                  Go to Invoices List
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ----------------- DETAILS VIEW ----------------- */}
      {view === "details" && selectedInvoice && (
        <div className="space-y-6 max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-border-light">
            <button onClick={() => setView("list")} className="flex items-center gap-2 text-text-secondary hover:text-text-dark transition-colors text-sm font-semibold">
              <ArrowLeft size={16} /> Back to Invoices
            </button>
            <div className="flex gap-2 w-full sm:w-auto">
              <button 
                onClick={() => alert("Invoice link copied!")}
                className="bg-white border border-border-light text-text-dark hover:bg-slate-50 px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex-1 sm:flex-none flex items-center justify-center gap-1.5"
              >
                <Share2 size={12} /> Share
              </button>
              <button className="bg-white border border-border-light text-text-dark hover:bg-slate-50 px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex-1 sm:flex-none flex items-center justify-center gap-1.5">
                <Download size={12} /> Download PDF
              </button>
              <button 
                onClick={() => setView("client_view")}
                className="bg-[#E8F8F0] text-[#10B981] border border-green-100 hover:bg-green-100 px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex-1 sm:flex-none"
              >
                Client View
              </button>
            </div>
          </div>

          {/* Invoice Basic Card */}
          <div className="flex justify-between items-center bg-white border border-border-light rounded-2xl p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-text-dark font-display">{selectedInvoice.num}</h2>
              <p className="text-xs text-text-secondary mt-1">{selectedInvoice.client} • {selectedInvoice.scopeProject}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              selectedInvoice.status === "Paid" ? "bg-green-50 text-[#10B981]" : "bg-blue-50 text-primary"
            }`}>{selectedInvoice.status}</span>
          </div>

          {/* Details Tabs */}
          <div className="flex border-b border-border-light">
            {(["Overview", "Activity", "Payments"] as const).map((tab) => (
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Main column */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Tab: Overview */}
              {activeDetailTab === "Overview" && (
                <div className="space-y-6">
                  {/* Overview details card */}
                  <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-text-dark text-sm font-display border-b border-border-light pb-3">Invoice Overview</h3>
                    <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-text-dark">
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Invoice Number</span>
                        <span>{selectedInvoice.num}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Status</span>
                        <span className="text-[#10B981] font-bold">{selectedInvoice.status}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Invoice Date</span>
                        <span>{selectedInvoice.created}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Due Date</span>
                        <span>{selectedInvoice.dueDate}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Client</span>
                        <span>{selectedInvoice.client}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-text-secondary uppercase block mb-1">Client Email</span>
                        <span>{selectedInvoice.clientEmail}</span>
                      </div>
                    </div>
                  </div>

                  {/* Line items list */}
                  <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm space-y-4">
                    <h3 className="font-bold text-text-dark text-sm font-display border-b border-border-light pb-3">Line Items</h3>
                    <table className="w-full text-left text-xs font-semibold text-text-dark">
                      <thead>
                        <tr className="text-[10px] text-text-secondary uppercase font-bold border-b border-border-light pb-2">
                          <th className="pb-2">Description</th>
                          <th className="pb-2 w-16 text-center">Qty</th>
                          <th className="pb-2 w-24 text-right">Rate</th>
                          <th className="pb-2 w-24 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-light/40">
                        {items.map((it, idx) => (
                          <tr key={idx}>
                            <td className="py-3 text-xs">{it.description}</td>
                            <td className="py-3 text-center">{it.qty}</td>
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
                <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm space-y-6">
                  <h3 className="font-bold text-text-dark text-sm font-display mb-4">Timeline History</h3>
                  <div className="space-y-6 pl-4 border-l border-border-light relative ml-2">
                    {[
                      { event: "Payment received", time: "May 16, 2024 - 10:32 AM", desc: "₦500,000 via Bank Transfer", dot: "bg-[#10B981]" },
                      { event: "Client viewed the invoice", time: "May 14, 2024 - 10:28 AM", desc: "Viewed by IP 102.89.34.12 (Lagos, NG)", dot: "bg-amber-500" },
                      { event: "Invoice sent", time: "May 12, 2024 - 02:15 PM", desc: "Sent via link to client@acmecorp.com", dot: "bg-primary" },
                      { event: "Invoice created", time: "May 12, 2024 - 02:10 PM", desc: "Created as draft by Alex John", dot: "bg-slate-400" }
                    ].map((act, i) => (
                      <div key={i} className="relative pl-4">
                        <div className={`absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full ${act.dot} ring-4 ring-white`}></div>
                        <span className="text-xs font-bold text-text-dark block leading-none">{act.event}</span>
                        <span className="text-[10px] text-text-muted mt-1 block">{act.time}</span>
                        <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">{act.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Payments */}
              {activeDetailTab === "Payments" && (
                <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="font-bold text-text-dark text-sm font-display">Payments Log</h3>
                  <div className="border border-border-light rounded-xl p-4 flex justify-between items-center text-xs font-semibold text-text-dark">
                    <div>
                      <span className="text-[10px] text-text-secondary uppercase">Date</span>
                      <p className="mt-0.5">May 16, 2024</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-secondary uppercase">Method</span>
                      <p className="mt-0.5">Bank Transfer</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-secondary uppercase">Reference</span>
                      <p className="mt-0.5">0123456789</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-text-secondary uppercase">Amount Paid</span>
                      <p className="mt-0.5 font-bold text-[#10B981]">₦500,000</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right details sidebar columns */}
            <div className="space-y-6">
              
              {/* Payment Info Card */}
              {activeDetailTab === "Overview" && (
                <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm space-y-4">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider border-b border-border-light pb-2">Payment Info</span>
                  <div className="space-y-3 text-xs font-semibold text-text-dark">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Payment Method</span>
                      <span>Bank Transfer</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Reference</span>
                      <span>0123456789</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Bank Name</span>
                      <span>GTBank</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Transaction ID</span>
                      <span>@123456789</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Invoice Info Card (shown in Activity/Payments) */}
              {activeDetailTab !== "Overview" && (
                <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm space-y-4">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider border-b border-border-light pb-2">Invoice Info</span>
                  <div className="space-y-3 text-xs font-semibold text-text-dark">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Invoice No.</span>
                      <span>{selectedInvoice.num}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Status</span>
                      <span className="text-[#10B981] font-bold">{selectedInvoice.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Total Amount</span>
                      <span>₦{selectedInvoice.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Paid Amount</span>
                      <span className="text-[#10B981]">₦{selectedInvoice.amount.toLocaleString()}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setView("client_view")}
                    className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2 rounded-xl transition-colors shadow-blue mt-2"
                  >
                    View Invoice
                  </button>
                </div>
              )}

              {/* Actions Box */}
              <div className="bg-white border border-border-light rounded-2xl p-6 shadow-sm space-y-3">
                <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider border-b border-border-light pb-2">Actions</span>
                <button 
                  onClick={() => alert("Marked as unpaid!")}
                  className="w-full bg-white hover:bg-slate-50 border border-border-light text-text-dark text-xs font-bold py-2 rounded-xl transition-colors"
                >
                  Mark as unpaid
                </button>
                <button 
                  onClick={() => alert("Invoice duplicated!")}
                  className="w-full bg-white hover:bg-slate-50 border border-border-light text-text-dark text-xs font-bold py-2 rounded-xl transition-colors"
                >
                  Duplicate invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- CLIENT VIEW ----------------- */}
      {view === "client_view" && selectedInvoice && (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row relative">
          
          {/* Left Side: Dark Info Panel */}
          <div className="w-full md:w-80 bg-bg-dark text-white p-8 md:p-12 flex flex-col justify-between border-r border-white/5">
            <div className="space-y-8">
              <button 
                onClick={() => setView("details")}
                className="text-xs font-bold text-text-muted hover:text-white flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3.5 py-2 transition-colors w-fit"
              >
                <ArrowLeft size={14} /> Back to Dashboard
              </button>
              
              <div>
                <span className="font-black text-2xl tracking-tight text-white font-display">pricis.</span>
                <div className="mt-8 space-y-4 text-xs font-medium text-text-muted">
                  <div>
                    <span className="text-[10px] text-white uppercase font-bold block mb-1">Invoice From:</span>
                    <p className="text-white font-bold text-sm">Alex John</p>
                    <p className="mt-0.5">Freelance UI/UX Designer</p>
                    <p className="mt-0.5">alex@pricis.co</p>
                    <p className="mt-0.5">+234 801 234 5678</p>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <p>Got questions about this invoice?</p>
                    <button className="text-primary hover:underline font-bold mt-1.5 block">Chat with us</button>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-text-muted mt-8">© 2025 Pricis. All rights reserved.</p>
          </div>

          {/* Right Side: Invoice Document sheet */}
          <div className="flex-1 p-6 md:p-12 overflow-y-auto flex items-center justify-center bg-slate-100">
            <div className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-12 shadow-md relative overflow-hidden">
              
              {/* Paid Stamp watermark */}
              <div className="absolute top-10 right-10 rotate-12 border-4 border-[#10B981] text-[#10B981] font-black uppercase text-xl px-4 py-2 rounded-xl select-none opacity-40 z-0">
                Paid
              </div>

              {/* Action Buttons top header */}
              <div className="flex justify-end gap-2 mb-8 border-b border-border-light pb-6 relative z-10">
                <button 
                  onClick={() => window.print()}
                  className="bg-white border border-border-light hover:bg-slate-50 text-text-dark text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Printer size={14} /> Print
                </button>
                <button 
                  onClick={() => alert("Downloading PDF...")}
                  className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-blue flex items-center gap-1.5"
                >
                  <Download size={14} /> Download PDF
                </button>
              </div>

              {/* Document Metadata */}
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-text-dark font-display">Invoice {selectedInvoice.num}</h1>
                    <p className="text-xs text-text-secondary mt-1">Status: <span className="text-[#10B981] font-bold">Paid</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-text-dark">
                  <div>
                    <span className="text-[10px] text-text-secondary uppercase font-bold block mb-1">Bill To:</span>
                    <p className="text-sm font-bold">{selectedInvoice.client}</p>
                    <p className="text-text-muted mt-0.5 font-normal">{selectedInvoice.clientEmail}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-text-secondary uppercase font-bold block mb-1">Details:</span>
                    <p>Invoice Date: {selectedInvoice.created}</p>
                    <p className="mt-0.5">Due Date: {selectedInvoice.dueDate}</p>
                    <p className="mt-0.5">Payment Terms: {paymentTerms}</p>
                  </div>
                </div>

                {/* Table */}
                <div className="border-t border-b border-border-light py-6">
                  <table className="w-full text-left text-xs font-semibold text-text-dark">
                    <thead>
                      <tr className="text-[10px] text-text-secondary uppercase font-bold border-b border-border-light pb-2">
                        <th className="pb-2">Description</th>
                        <th className="pb-2 w-16 text-center">Qty</th>
                        <th className="pb-2 w-24 text-right">Rate</th>
                        <th className="pb-2 w-24 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-light/40">
                      {items.map((it, idx) => (
                        <tr key={idx}>
                          <td className="py-3 text-xs">{it.description}</td>
                          <td className="py-3 text-center">{it.qty}</td>
                          <td className="py-3 text-right">₦{it.rate.toLocaleString()}</td>
                          <td className="py-3 text-right">₦{(it.qty * it.rate).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pricing subtotal */}
                <div className="flex justify-end text-xs font-bold text-text-dark pt-2">
                  <div className="w-56 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Subtotal</span>
                      <span>₦{calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t-2 border-text-dark pt-2 text-sm">
                      <span>Total Paid</span>
                      <span className="text-[#10B981] font-bold">₦{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
