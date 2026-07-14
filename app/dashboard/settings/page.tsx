"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  User, Palette, CreditCard, Sliders, Users, Puzzle, Bell, Shield,
  ArrowLeft, Upload, CheckCircle2, Info, LucideIcon, Download,
  Check, Lock, RefreshCw, Key, Settings
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"home" | "profile" | "branding" | "billing" | "preferences" | "team" | "integrations" | "notifications" | "security">("home");
  const [showSavedSuccess, setShowSavedSuccess] = useState(false);

  // Profile Form States
  const [fullName, setFullName] = useState("Alex John");
  const [email, setEmail] = useState("alexjohn@example.com");
  const [phone, setPhone] = useState("+234 801 234 5678");
  const [country, setCountry] = useState("Nigeria");
  const [timezone, setTimezone] = useState("(GMT+1) West Africa Time");

  // Branding Form States
  const [brandName, setBrandName] = useState("Alex John Studio");
  const [primaryColor, setPrimaryColor] = useState("#2563EB");
  const [secondaryColor, setSecondaryColor] = useState("#1E40AF");
  const [brandFont, setBrandFont] = useState("Inter");
  const [footerNote, setFooterNote] = useState("Thank you for the opportunity to work together.");

  // Preferences Form States
  const [currency, setCurrency] = useState("NGN - Nigerian Naira (₦)");
  const [paymentTerms, setPaymentTerms] = useState("50% upfront, 50% on completion");
  const [revisionLimit, setRevisionLimit] = useState("2 revisions");
  const [timeline, setTimeline] = useState("4 weeks");
  const [projectStart, setProjectStart] = useState("Upon payment");
  const [validity, setValidity] = useState("Default validity");

  // Security Form States
  const [currentPassword, setCurrentPassword] = useState("••••••••");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);

  // Notifications Form States
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [emailScopeViewed, setEmailScopeViewed] = useState(true);
  const [emailInvoiceViewed, setEmailInvoiceViewed] = useState(true);
  const [emailInvoicePaid, setEmailInvoicePaid] = useState(true);
  const [emailKovaMessage, setEmailKovaMessage] = useState(true);
  const [emailWeeklySummary, setEmailWeeklySummary] = useState(false);
  const [inAppAll, setInAppAll] = useState(true);

  // Integrations states
  const [connectedApps, setConnectedApps] = useState({
    calendar: false,
    drive: false,
    dropbox: false,
    slack: false,
    zapier: false
  });

  const handleSaveChanges = () => {
    setShowSavedSuccess(true);
  };

  const handleToggleApp = (appKey: keyof typeof connectedApps) => {
    setConnectedApps({
      ...connectedApps,
      [appKey]: !connectedApps[appKey]
    });
  };

  const renderTabButton = (
    tabId: typeof activeTab, 
    label: string, 
    Icon: LucideIcon, 
    isPro: boolean = false
  ) => {
    const isSelected = activeTab === tabId;
    return (
      <button
        onClick={() => { setActiveTab(tabId); setShowSavedSuccess(false); }}
        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
          isSelected 
            ? "bg-[#EFF6FF] text-primary" 
            : "text-text-secondary hover:text-[#0F172A] hover:bg-slate-50"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <Icon size={15} className={isSelected ? "text-primary" : "text-text-secondary"} />
          <span>{label}</span>
        </div>
        {isPro && (
          <span className="bg-[#FF9F43]/15 text-[#FF9F43] text-[8px] font-black px-1.5 py-0.5 rounded uppercase font-display border border-[#FF9F43]/20">Pro</span>
        )}
      </button>
    );
  };

  // ----------------- GRID HUB STATE -----------------
  if (activeTab === "home") {
    return (
      <div className="space-y-6 text-left animate-fade-in-up">
        <div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] font-display tracking-tight">Settings</h1>
          <p className="text-text-secondary text-sm font-medium mt-1 font-body">Manage your profiles, preferences and account.</p>
        </div>

        {/* 8-Card Settings Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { id: "profile", label: "Profile", desc: "Manage your personal information and account details.", icon: User, bg: "bg-purple-50 text-purple-600 border-purple-100" },
            { id: "branding", label: "Branding", desc: "Customize your brand and how you appear on proposals.", icon: Palette, bg: "bg-blue-50 text-blue-600 border-blue-100", isPro: true },
            { id: "billing", label: "Billing & Plan", desc: "View your plan details, usage and billing history.", icon: CreditCard, bg: "bg-indigo-50 text-indigo-600 border-indigo-100" },
            { id: "preferences", label: "Preferences", desc: "Manage your preferences and default settings.", icon: Sliders, bg: "bg-emerald-50 text-emerald-600 border-emerald-100" },
            { id: "team", label: "Team", desc: "Invite team members and manage roles.", icon: Users, bg: "bg-green-50 text-green-600 border-green-100", isPro: true },
            { id: "integrations", label: "Integrations", desc: "Connect Pricis with your favorite tools.", icon: Puzzle, bg: "bg-orange-50 text-orange-600 border-orange-100", isPro: true },
            { id: "notifications", label: "Notifications", desc: "Choose how and when you want to be notified.", icon: Bell, bg: "bg-amber-50 text-amber-600 border-amber-100" },
            { id: "security", label: "Security", desc: "Manage your password and security settings.", icon: Shield, bg: "bg-teal-50 text-teal-600 border-teal-100" }
          ].map((card) => (
            <button
              key={card.id}
              onClick={() => setActiveTab(card.id as typeof activeTab)}
              className="bg-white border border-[#E5EAF2] rounded-2xl p-6 text-left hover:shadow-md hover:border-primary/20 transition-all group flex flex-col justify-between min-h-[160px]"
            >
              <div className="space-y-4 w-full">
                <div className="flex justify-between items-start w-full">
                  <div className={`w-10 h-10 rounded-xl ${card.bg} border flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <card.icon size={20} />
                  </div>
                  {card.isPro && (
                    <span className="bg-[#FF9F43]/15 text-[#FF9F43] text-[9px] font-black px-2 py-0.5 rounded uppercase font-display border border-[#FF9F43]/20">Pro</span>
                  )}
                </div>
                <div>
                  <span className="font-bold text-sm text-[#0F172A] block group-hover:text-primary transition-colors font-display">{card.label}</span>
                  <p className="text-xs text-text-secondary mt-1 font-semibold leading-normal font-body">{card.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ----------------- SUB-PAGES TAB VIEW -----------------
  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in text-left">
      {/* Breadcrumbs Navigation */}
      <div className="flex justify-between items-center border-b border-[#E5EAF2] pb-4">
        <button 
          onClick={() => { setActiveTab("home"); setShowSavedSuccess(false); }} 
          className="flex items-center gap-1.5 text-text-secondary hover:text-[#0F172A] transition-colors text-xs font-bold"
        >
          <ArrowLeft size={14} /> Back to Settings
        </button>
        <div className="text-[11px] font-black uppercase tracking-wider text-text-secondary font-display">
          Settings &gt; <span className="text-[#0F172A]">{activeTab}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Column Sidebar Tabs Navigation */}
        <div className="hidden md:block md:col-span-1 bg-white border border-[#E5EAF2] rounded-2xl p-4 shadow-sm space-y-1 h-fit">
          <span className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-3 px-2 font-display">Directory</span>
          {renderTabButton("profile", "Profile", User)}
          {renderTabButton("branding", "Branding", Palette, true)}
          {renderTabButton("billing", "Billing & Plan", CreditCard)}
          {renderTabButton("preferences", "Preferences", Sliders)}
          {renderTabButton("team", "Team", Users, true)}
          {renderTabButton("integrations", "Integrations", Puzzle, true)}
          {renderTabButton("notifications", "Notifications", Bell)}
          {renderTabButton("security", "Security", Shield)}
        </div>

        {/* Right Column Content Panel */}
        <div className="col-span-1 md:col-span-3 bg-white border border-[#E5EAF2] rounded-2xl p-6 md:p-8 shadow-sm flex flex-col justify-between min-h-[480px]">
          
          {/* Saved Success splash state */}
          {showSavedSuccess ? (
            <div className="max-w-md mx-auto text-center py-16 space-y-6 flex flex-col items-center justify-center my-auto">
              <div className="relative">
                <div className="absolute -top-3 -left-3 w-4 h-4 rounded-full bg-emerald-400/20 animate-ping"></div>
                <div className="absolute -bottom-2 -right-4 w-3 h-3 rounded-full bg-blue-400/30 animate-pulse"></div>
                <div className="absolute top-1 -right-4 w-2 h-2 rounded-full bg-amber-400/40"></div>
                
                <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 text-green-500 flex items-center justify-center shadow-inner">
                  <CheckCircle2 size={36} className="animate-bounce" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-[#0F172A] text-xl font-display">Settings saved!</h3>
                <p className="text-text-secondary text-xs font-semibold max-w-xs leading-relaxed font-body">
                  Your changes have been saved successfully.
                </p>
              </div>
              <button 
                onClick={() => { setShowSavedSuccess(false); router.push("/dashboard"); }}
                className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full text-xs font-bold shadow-blue transition-all"
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <div>
              {/* TAB: PROFILE */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Profile</h3>
                    <p className="text-text-secondary text-xs font-semibold font-body">Manage your personal information and account details.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 font-semibold">
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Full Name</label>
                      <input 
                        type="text" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Email Address</label>
                      <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Phone Number</label>
                      <input 
                        type="text" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Country</label>
                      <select 
                        value={country} 
                        onChange={(e) => setCountry(e.target.value)} 
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none cursor-pointer focus:border-primary focus:bg-white transition-colors"
                      >
                        <option>Nigeria</option>
                        <option>Ghana</option>
                        <option>Kenya</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Timezone</label>
                      <select 
                        value={timezone} 
                        onChange={(e) => setTimezone(e.target.value)} 
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none cursor-pointer focus:border-primary focus:bg-white transition-colors"
                      >
                        <option>(GMT+1) West Africa Time</option>
                        <option>(GMT) Greenwich Mean Time</option>
                        <option>(GMT+3) East Africa Time</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#E5EAF2] flex items-center gap-5">
                    <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden flex-shrink-0 border border-[#E5EAF2]">
                      <img src="https://i.pravatar.cc/100?img=12" alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1.5 text-left">
                      <span className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider">Profile Photo</span>
                      <p className="text-[10px] text-text-muted font-bold font-body">JPG, PNG or GIF. Max size 2MB.</p>
                      <button className="text-xs font-bold text-primary hover:underline block text-left">Upload New Photo</button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: BRANDING */}
              {activeTab === "branding" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Branding</h3>
                    <p className="text-text-secondary text-xs font-semibold font-body">Customize your brand and how you appear on proposals.</p>
                  </div>

                  {/* Pro Alert Box */}
                  <div className="bg-[#EFF6FF] border border-blue-100 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-semibold text-[#0F172A]">
                    <div className="flex gap-2.5 items-start sm:items-center">
                      <Info size={16} className="text-primary flex-shrink-0 mt-0.5 sm:mt-0" />
                      <span>Branding is a Pro feature. Upgrade to customize your proposals.</span>
                    </div>
                    <button className="bg-primary hover:bg-primary-hover text-white text-[10px] font-black px-4.5 py-2 rounded-xl whitespace-nowrap shadow-blue transition-colors">Upgrade to Pro</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 font-semibold">
                    <div className="md:col-span-1 border-2 border-dashed border-[#E5EAF2] hover:border-primary/40 rounded-2xl p-6 text-center flex flex-col justify-center items-center gap-2 hover:bg-slate-50 cursor-pointer min-h-[150px] transition-colors">
                      <Upload size={22} className="text-text-secondary" />
                      <span className="block text-xs font-bold text-[#0F172A]">Upload Logo</span>
                      <p className="text-[10px] text-text-muted font-bold">PNG, JPG or SVG. Max 2MB.</p>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Brand Name</label>
                        <input 
                          type="text" 
                          value={brandName} 
                          onChange={(e) => setBrandName(e.target.value)} 
                          className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors" 
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Primary Color</label>
                          <div className="flex gap-2 bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl p-2 items-center">
                            <input 
                              type="color" 
                              value={primaryColor} 
                              onChange={(e) => setPrimaryColor(e.target.value)} 
                              className="w-7 h-7 border-0 rounded-lg cursor-pointer outline-none bg-transparent flex-shrink-0" 
                            />
                            <input 
                              type="text" 
                              value={primaryColor} 
                              onChange={(e) => setPrimaryColor(e.target.value)} 
                              className="w-full text-xs font-bold text-[#0F172A] bg-transparent outline-none uppercase font-body" 
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Secondary Color</label>
                          <div className="flex gap-2 bg-[#F8FAFC] border border-[#E5EAF2] rounded-xl p-2 items-center">
                            <input 
                              type="color" 
                              value={secondaryColor} 
                              onChange={(e) => setSecondaryColor(e.target.value)} 
                              className="w-7 h-7 border-0 rounded-lg cursor-pointer outline-none bg-transparent flex-shrink-0" 
                            />
                            <input 
                              type="text" 
                              value={secondaryColor} 
                              onChange={(e) => setSecondaryColor(e.target.value)} 
                              className="w-full text-xs font-bold text-[#0F172A] bg-transparent outline-none uppercase font-body" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-semibold">
                    <div className="md:col-span-1">
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Brand Font</label>
                      <select 
                        value={brandFont} 
                        onChange={(e) => setBrandFont(e.target.value)} 
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none cursor-pointer focus:border-primary focus:bg-white transition-colors"
                      >
                        <option>Inter</option>
                        <option>Sora</option>
                        <option>Outfit</option>
                        <option>DM Sans</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Footer Note on Proposals</label>
                      <textarea 
                        value={footerNote} 
                        onChange={(e) => setFooterNote(e.target.value)} 
                        rows={2} 
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-2.5 outline-none resize-none leading-relaxed focus:border-primary focus:bg-white transition-colors" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: BILLING & PLAN */}
              {activeTab === "billing" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Billing & Plan</h3>
                    <p className="text-text-secondary text-xs font-semibold font-body">View your plan details, usage and billing history.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Current Plan Card */}
                    <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <span className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider">Current Plan</span>
                          <span className="bg-primary/10 text-primary text-[9px] font-black px-2 py-0.5 rounded uppercase font-display border border-[#EFF6FF]">Pro Plan</span>
                        </div>
                        <h2 className="text-3xl font-extrabold text-[#0F172A] font-display mt-3">₦7,500 <span className="text-xs text-text-secondary font-medium font-body">/ month</span></h2>
                        <p className="text-[10px] text-text-muted mt-1.5 font-bold">Next invoice: July 1, 2026</p>
                      </div>

                      {/* Benefits bullets list */}
                      <ul className="text-xs font-bold text-[#0F172A] space-y-2 pt-2 text-left">
                        {["Unlimited scopes", "Unlimited invoices", "Unlimited Kova AI messages", "Custom branding enabled", "Client view tracking"].map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-emerald-50 text-[#10B981] border border-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 text-[10px]">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button className="bg-white border border-[#E5EAF2] hover:bg-slate-50 text-[#0F172A] text-xs font-bold py-3 rounded-xl transition-all shadow-sm w-full mt-4">Manage Subscription</button>
                    </div>

                    {/* Usage Limits Panel */}
                    <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 space-y-5 shadow-sm text-xs font-bold text-[#0F172A]">
                      <div className="flex justify-between items-center border-b border-[#E5EAF2] pb-2.5">
                        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Usage This Month</span>
                        <button className="text-primary text-[10px] font-bold hover:underline">Details</button>
                      </div>
                      
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px]">
                          <span>Scopes Generated</span>
                          <span>12 / Unlimited</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "35%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px]">
                          <span>Invoices</span>
                          <span>8 / Unlimited</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "22%" }}></div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px]">
                          <span>Kova AI Messages</span>
                          <span>36 / Unlimited</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: "15%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Billing History Table */}
                  <div className="space-y-3 border-t border-[#E5EAF2] pt-6 font-semibold">
                    <span className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider">Billing History</span>
                    <div className="border border-[#E5EAF2] rounded-xl overflow-hidden shadow-sm">
                      <table className="w-full text-left text-xs font-semibold text-[#0F172A]">
                        <thead>
                          <tr className="bg-[#F8FAFC] border-b border-[#E5EAF2] text-text-secondary text-[10px] uppercase font-bold">
                            <th className="p-3.5">Date</th>
                            <th className="p-3.5">Amount</th>
                            <th className="p-3.5">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5EAF2]">
                          {[
                            { date: "May 1, 2026", amount: "₦7,500" },
                            { date: "Apr 1, 2026", amount: "₦7,500" },
                            { date: "Mar 1, 2026", amount: "₦7,500" }
                          ].map((inv, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                              <td className="p-3.5 font-medium">{inv.date}</td>
                              <td className="p-3.5 font-bold">{inv.amount}</td>
                              <td className="p-3.5">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-600 border border-green-100">Paid</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: PREFERENCES */}
              {activeTab === "preferences" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Preferences</h3>
                    <p className="text-text-secondary text-xs font-semibold font-body">Manage your preferences and default settings.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 font-semibold">
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Default Currency</label>
                      <select 
                        value={currency} 
                        onChange={(e) => setCurrency(e.target.value)} 
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none cursor-pointer focus:border-primary focus:bg-white transition-colors"
                      >
                        <option>NGN - Nigerian Naira (₦)</option>
                        <option>USD - US Dollar ($)</option>
                        <option>KES - Kenyan Shilling (KSh)</option>
                        <option>GHS - Ghanaian Cedi (₵)</option>
                      </select>
                      <p className="text-[10px] mt-1.5 text-text-secondary font-medium">This will be the default currency for new scopes and invoices.</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Default Payment Terms</label>
                      <select 
                        value={paymentTerms} 
                        onChange={(e) => setPaymentTerms(e.target.value)} 
                        className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none cursor-pointer focus:border-primary focus:bg-white transition-colors"
                      >
                        <option>50% upfront, 50% on completion</option>
                        <option>100% upfront payment</option>
                        <option>Net 14 days</option>
                        <option>Net 30 days</option>
                      </select>
                      <p className="text-[10px] mt-1.5 text-text-secondary font-medium">This will be the default payment terms for new invoices.</p>
                    </div>
                    
                    <div className="md:col-span-2 pt-4 border-t border-[#E5EAF2] mt-2 text-left">
                      <span className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-4 font-display">Default Scope Settings</span>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-text-secondary uppercase mb-2">Default Revision</label>
                          <select 
                            value={revisionLimit} 
                            onChange={(e) => setRevisionLimit(e.target.value)} 
                            className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-primary focus:bg-white transition-colors"
                          >
                            <option>2 revisions</option>
                            <option>3 revisions</option>
                            <option>5 revisions</option>
                            <option>Unlimited</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-text-secondary uppercase mb-2">Default Timeline</label>
                          <select 
                            value={timeline} 
                            onChange={(e) => setTimeline(e.target.value)} 
                            className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-primary focus:bg-white transition-colors"
                          >
                            <option>4 weeks</option>
                            <option>6 weeks</option>
                            <option>8 weeks</option>
                            <option>12 weeks</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-text-secondary uppercase mb-2">Default Project Start</label>
                          <select 
                            value={projectStart} 
                            onChange={(e) => setProjectStart(e.target.value)} 
                            className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-primary focus:bg-white transition-colors"
                          >
                            <option>Upon payment</option>
                            <option>Immediate</option>
                            <option>Flexible</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-text-secondary uppercase mb-2">Default Validity</label>
                          <select 
                            value={validity} 
                            onChange={(e) => setValidity(e.target.value)} 
                            className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-primary focus:bg-white transition-colors"
                          >
                            <option>Default validity</option>
                            <option>15 days</option>
                            <option>30 days</option>
                            <option>60 days</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: TEAM */}
              {activeTab === "team" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-[#E5EAF2] pb-4">
                    <div>
                      <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1 flex items-center gap-1.5">
                        Team 
                        <span className="bg-[#FF9F43]/15 text-[#FF9F43] text-[9px] font-black px-2 py-0.5 rounded uppercase font-display border border-[#FF9F43]/20">Pro</span>
                      </h3>
                      <p className="text-text-secondary text-xs font-semibold font-body">Invite team members and manage roles.</p>
                    </div>
                    <button className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-blue">+ Invite Member</button>
                  </div>

                  <div className="border border-[#E5EAF2] rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs font-semibold text-[#0F172A] font-body">
                      <thead>
                        <tr className="bg-[#F8FAFC] border-b border-[#E5EAF2] text-text-secondary text-[10px] uppercase font-bold">
                          <th className="p-3.5">Member</th>
                          <th className="p-3.5">Role</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5">Joined</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5EAF2]">
                        {[
                          { name: "Alex John (You)", role: "Owner", status: "Active", joined: "May 12, 2026" },
                          { name: "Jane Doe", role: "Editor", status: "Active", joined: "May 14, 2026" },
                          { name: "Mark Smith", role: "Viewer", status: "Active", joined: "May 16, 2026" },
                          { name: "Tobi Johnson", role: "Viewer", status: "Pending", joined: "May 20, 2026", isPending: true }
                        ].map((member, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="p-3.5 font-bold text-[#0F172A]">{member.name}</td>
                            <td className="p-3.5 text-text-secondary font-medium">{member.role}</td>
                            <td className="p-3.5">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                member.isPending 
                                  ? "bg-amber-50 text-amber-600 border-amber-100 animate-pulse" 
                                  : "bg-green-50 text-green-600 border-green-100"
                              }`}>{member.status}</span>
                            </td>
                            <td className="p-3.5 text-text-muted font-medium">{member.joined}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Roles Details */}
                  <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-2xl p-6 space-y-3 shadow-sm text-xs font-semibold text-text-dark text-left">
                    <span className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider border-b border-[#E5EAF2] pb-2 font-display">Roles & Permissions</span>
                    <div className="space-y-2 pt-1 leading-relaxed font-body">
                      <p><span className="text-[#0F172A] font-bold">Owner:</span> Full access to all features, client management, and billing settings.</p>
                      <p><span className="text-[#0F172A] font-bold">Editor:</span> Can create and edit scopes, proposals, invoices and templates.</p>
                      <p><span className="text-[#0F172A] font-bold">Viewer:</span> Read-only access to view scopes, invoices, and activity feed.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: INTEGRATIONS */}
              {activeTab === "integrations" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1 flex items-center gap-1.5">
                      Integrations 
                      <span className="bg-[#FF9F43]/15 text-[#FF9F43] text-[9px] font-black px-2 py-0.5 rounded uppercase font-display border border-[#FF9F43]/20">Pro</span>
                    </h3>
                    <p className="text-text-secondary text-xs font-semibold font-body">Connect Pricis with your favorite tools.</p>
                  </div>

                  <div className="space-y-3.5">
                    {[
                      { key: "calendar", name: "Google Calendar", desc: "Sync meetings, deadlines, and project schedules.", icon: "📅" },
                      { key: "drive", name: "Google Drive", desc: "Save and access files from Google Drive.", icon: "💾" },
                      { key: "dropbox", name: "Dropbox", desc: "Attach files from your Dropbox account.", icon: "📦" },
                      { key: "slack", name: "Slack", desc: "Receive real-time notifications in your Slack channels.", icon: "💬" },
                      { key: "zapier", name: "Zapier", desc: "Automate your workflows by connecting to 5,000+ apps.", icon: "⚡" }
                    ].map((app) => (
                      <div key={app.key} className="flex justify-between items-center p-4 border border-[#E5EAF2] rounded-2xl hover:shadow-sm hover:border-primary/20 transition-all bg-white">
                        <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 bg-[#F8FAFC] border border-[#E5EAF2] text-xl rounded-xl flex items-center justify-center flex-shrink-0 shadow-inner">{app.icon}</div>
                          <div className="space-y-0.5 text-left">
                            <span className="font-bold text-xs text-[#0F172A] block font-display">{app.name}</span>
                            <p className="text-[11px] text-text-secondary font-medium leading-normal font-body">{app.desc}</p>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => handleToggleApp(app.key as keyof typeof connectedApps)}
                          className={`text-xs font-bold px-4 py-2 rounded-xl border transition-all ${
                            connectedApps[app.key as keyof typeof connectedApps]
                              ? "bg-green-50 text-green-600 border-green-200 hover:bg-green-100"
                              : "bg-white text-[#0F172A] border-[#E5EAF2] hover:bg-slate-50 shadow-sm"
                          }`}
                        >
                          {connectedApps[app.key as keyof typeof connectedApps] ? "Connected" : "Connect"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: NOTIFICATIONS */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Notifications</h3>
                    <p className="text-text-secondary text-xs font-semibold font-body">Choose how and when you want to be notified.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    {/* Email Settings */}
                    <div className="md:col-span-2 space-y-4 text-xs font-semibold text-[#0F172A]">
                      <span className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider border-b border-[#E5EAF2] pb-2 font-display">Email Notifications</span>
                      
                      {[
                        { label: "Receive updates via email", state: emailUpdates, setState: setEmailUpdates },
                        { label: "Scope viewed by client", state: emailScopeViewed, setState: setEmailScopeViewed },
                        { label: "Invoice viewed by client", state: emailInvoiceViewed, setState: setEmailInvoiceViewed },
                        { label: "Invoice paid", state: emailInvoicePaid, setState: setEmailInvoicePaid },
                        { label: "New message from Kova AI", state: emailKovaMessage, setState: setEmailKovaMessage },
                        { label: "Weekly activity digest", state: emailWeeklySummary, setState: setEmailWeeklySummary }
                      ].map((notify, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2 border-b border-[#E5EAF2]/60 last:border-0">
                          <span className="font-semibold text-[#0F172A]">{notify.label}</span>
                          <input 
                            type="checkbox" 
                            checked={notify.state} 
                            onChange={(e) => notify.setState(e.target.checked)}
                            className="rounded border-[#E5EAF2] text-primary focus:ring-primary h-4.5 w-4.5 cursor-pointer transition-colors"
                          />
                        </div>
                      ))}

                      <div className="pt-5 border-t border-[#E5EAF2] flex justify-between items-center mt-4 text-left">
                        <div>
                          <span className="block text-xs font-bold text-[#0F172A] font-display">In-App Notifications</span>
                          <span className="text-[10px] text-text-secondary block font-semibold mt-0.5 font-body">Receive real-time notifications inside Pricis dashboard</span>
                        </div>
                        <input 
                          type="checkbox" 
                          checked={inAppAll} 
                          onChange={(e) => setInAppAll(e.target.checked)}
                          className="rounded border-[#E5EAF2] text-primary focus:ring-primary h-4.5 w-4.5 cursor-pointer transition-colors"
                        />
                      </div>
                    </div>

                    {/* Sidebar Tip */}
                    <div className="md:col-span-1 bg-[#F8FAFC] border border-[#E5EAF2] rounded-2xl p-6 shadow-sm flex flex-col justify-center items-center text-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-lg">🔔</div>
                      <div>
                        <span className="font-bold text-xs text-[#0F172A] block font-display">Stay in the loop</span>
                        <p className="text-[10px] text-text-secondary mt-1 font-semibold leading-relaxed font-body">We will only send you important alerts regarding client views, comments, and payment actions.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SECURITY */}
              {activeTab === "security" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Security</h3>
                    <p className="text-text-secondary text-xs font-semibold font-body">Manage your password and security settings.</p>
                  </div>

                  <div className="space-y-5 border-b border-[#E5EAF2] pb-6 pt-2">
                    <span className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider font-display">Change Password</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-semibold">
                      <div>
                        <label className="block text-xs font-bold text-text-secondary mb-2">Current Password</label>
                        <input 
                          type="password" 
                          value={currentPassword} 
                          onChange={(e) => setCurrentPassword(e.target.value)} 
                          className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-secondary mb-2">New Password</label>
                        <input 
                          type="password" 
                          value={newPassword} 
                          onChange={(e) => setNewPassword(e.target.value)} 
                          className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors" 
                          placeholder="Min. 8 characters" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-text-secondary mb-2">Confirm New Password</label>
                        <input 
                          type="password" 
                          value={confirmPassword} 
                          onChange={(e) => setConfirmPassword(e.target.value)} 
                          className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors" 
                        />
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => { 
                        if (newPassword !== confirmPassword) {
                          alert("New passwords do not match!");
                          return;
                        }
                        setCurrentPassword("••••••••"); 
                        setNewPassword(""); 
                        setConfirmPassword(""); 
                        handleSaveChanges(); 
                      }} 
                      className="bg-white border border-[#E5EAF2] hover:bg-slate-50 text-[#0F172A] text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-sm"
                    >
                      Update Password
                    </button>
                  </div>

                  {/* Two Factor Switch */}
                  <div className="flex justify-between items-center py-3 text-left">
                    <div>
                      <span className="block text-xs font-bold text-[#0F172A] font-display">Two-Factor Authentication</span>
                      <span className="text-[10px] text-text-secondary block font-semibold mt-0.5 font-body">Protect your account with an additional security code on logins.</span>
                    </div>
                    <button 
                      onClick={() => setTwoFactor(!twoFactor)}
                      className={`relative inline-flex h-6.5 w-12 items-center rounded-full transition-colors outline-none cursor-pointer ${
                        twoFactor ? "bg-[#10B981]" : "bg-slate-200"
                      }`}
                    >
                      <span className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white transition-transform ${
                        twoFactor ? "translate-x-6.5" : "translate-x-1"
                      }`} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bottom actions save bar */}
          {!showSavedSuccess && ["profile", "branding", "preferences", "notifications"].includes(activeTab) && (
            <div className="flex justify-end pt-5 border-t border-[#E5EAF2] mt-6">
              <button 
                onClick={handleSaveChanges}
                className="bg-primary hover:bg-primary-hover text-white px-7 py-3 rounded-full text-xs font-bold shadow-blue transition-all"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
