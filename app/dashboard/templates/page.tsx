"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, ArrowLeft, Check, Trash2, ChevronRight, Star, FileText, 
  Copy, Download, Lock, RefreshCw, Key, Settings, HelpCircle, 
  ArrowUpRight, Play, Eye, Info, Sparkles, MessageSquare, Clipboard,
  SendHorizontal, Brain, Code, PenTool, BookOpen, Layers, Edit, 
  Save, EyeOff, CheckCircle2, DollarSign, Calendar, Mail, FileCheck
} from "lucide-react";

interface Template {
  id: string;
  title: string;
  category: "Web Development" | "Design" | "Branding" | "Marketing" | "Writing" | "Consulting";
  desc: string;
  priceRange: string;
  pro: boolean;
  popular: boolean;
}

interface UserTemplate {
  id: string;
  title: string;
  category: string;
  projectsUsed: number;
  lastUpdated: string;
}

export default function TemplatesDashboardPage() {
  const router = useRouter();
  const [activeSubTab, setActiveSubTab] = useState<"all" | "my">("all");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Flow State: "list" | "details" | "wizard_scope" | "wizard_create" | "success"
  const [flow, setFlow] = useState<"list" | "details" | "wizard_scope" | "wizard_create" | "success">("list");
  
  // Selected Template for details or generation
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // Stepper Wizard states for "New Scope from Template"
  const [wizardScopeStep, setWizardScopeStep] = useState(1);
  const [projTitle, setProjTitle] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [projType, setProjType] = useState("Website Redesign");
  const [timeline, setTimeline] = useState("4 weeks");
  const [startDate, setStartDate] = useState("2024-05-20");
  const [notes, setNotes] = useState("They prefer a clean, modern design with blue as the primary color.");
  const [pricingTier, setPricingTier] = useState<"conservative" | "standard" | "premium">("standard");

  // Stepper Wizard states for "Create New Template"
  const [wizardCreateStep, setWizardCreateStep] = useState(1);
  const [newTemplateName, setNewTemplateName] = useState("My Custom Template");
  const [newTemplateCat, setNewTemplateCat] = useState("Web Development");
  const [newTemplateDesc, setNewTemplateDesc] = useState("A custom template built for clients.");
  const [newTemplateVisibility, setNewTemplateVisibility] = useState<"private" | "public">("private");
  const [newTemplatePriceType, setNewTemplatePriceType] = useState<"free" | "pro">("free");

  // Mock template list
  const templates: Template[] = [
    { id: "temp-1", title: "Website Redesign", category: "Web Development", desc: "Complete website redesign with modern UI/UX and responsive design.", priceRange: "₦300,000 - ₦1,500,000", pro: false, popular: true },
    { id: "temp-2", title: "Landing Page Design", category: "Design", desc: "High-conversion redesign with modern UI/UX and sitemap layouts.", priceRange: "₦150,000 - ₦500,000", pro: false, popular: true },
    { id: "temp-3", title: "E-commerce Website", category: "Web Development", desc: "Full e-commerce setup with product catalog, cart and checkout.", priceRange: "₦500,000 - ₦3,000,000", pro: true, popular: false },
    { id: "temp-4", title: "Brand Identity Design", category: "Branding", desc: "Logo design, color palette, typography and brand guidelines.", priceRange: "₦200,000 - ₦800,000", pro: false, popular: false },
    { id: "temp-5", title: "SEO Content Strategy", category: "Marketing", desc: "High-level content strategy and content plan for websites.", priceRange: "₦150,000 - ₦600,000", pro: false, popular: false },
    { id: "temp-6", title: "Social Media Management", category: "Marketing", desc: "Monthly social media management and content creation.", priceRange: "₦100,000 - ₦400,000", pro: false, popular: false },
    { id: "temp-7", title: "Mobile App Design", category: "Design", desc: "UI/UX design for mobile applications (up to 10 screens).", priceRange: "₦400,000 - ₦2,000,000", pro: true, popular: false },
    { id: "temp-8", title: "Copywriting - Website", category: "Writing", desc: "Website copywriting for up to 5 pages.", priceRange: "₦80,000 - ₦250,000", pro: false, popular: false }
  ];

  // User created templates list
  const [userTemplates, setUserTemplates] = useState<UserTemplate[]>([
    { id: "utemp-1", title: "My Website Redesign Template", category: "Web Development", projectsUsed: 12, lastUpdated: "May 18, 2024" },
    { id: "utemp-2", title: "Startup Landing Page Scope", category: "Design", projectsUsed: 8, lastUpdated: "May 10, 2024" },
    { id: "utemp-3", title: "Brand Identity Package", category: "Branding", projectsUsed: 5, lastUpdated: "May 5, 2024" },
    { id: "utemp-4", title: "Monthly Social Media Retainer", category: "Marketing", projectsUsed: 7, lastUpdated: "Apr 28, 2024" },
    { id: "utemp-5", title: "SEO Content Strategy Template", category: "Marketing", projectsUsed: 3, lastUpdated: "Apr 20, 2024" }
  ]);

  const categories = ["All", "Web Development", "Design", "Branding", "Marketing", "Writing", "Consulting"];

  const filteredTemplates = templates.filter(t => {
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = (temp: Template) => {
    setSelectedTemplate(temp);
    setProjTitle(`${temp.title} for Acme Corp`);
    setProjDesc(temp.desc);
    setClientName("Acme Corp");
    setClientEmail("hello@acmecorp.com");
    setWizardScopeStep(1);
    setFlow("wizard_scope");
  };

  const handleSaveCustomTemplate = () => {
    const newUTemp: UserTemplate = {
      id: `utemp-${Date.now()}`,
      title: newTemplateName,
      category: newTemplateCat,
      projectsUsed: 0,
      lastUpdated: "Today"
    };
    setUserTemplates([newUTemp, ...userTemplates]);
    setFlow("list");
    setActiveSubTab("my");
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      
      {/* ----------------- LIST VIEW ----------------- */}
      {flow === "list" && (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-[#0F172A] font-display">Templates</h1>
              <p className="text-text-secondary text-sm font-body">Start from a template or create your own.</p>
            </div>
            <button 
              onClick={() => { setWizardCreateStep(1); setFlow("wizard_create"); }}
              className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-blue transition-all"
            >
              <Plus size={16} /> New Template
            </button>
          </div>

          {/* Sub Navigation tabs (All templates vs My templates) */}
          <div className="flex border-b border-[#E5EAF2]">
            <button 
              onClick={() => setActiveSubTab("all")}
              className={`px-6 py-3 text-xs font-bold border-b-2 transition-colors ${
                activeSubTab === "all" ? "border-primary text-primary" : "border-transparent text-text-secondary hover:text-[#0F172A]"
              }`}
            >
              All Templates
            </button>
            <button 
              onClick={() => setActiveSubTab("my")}
              className={`px-6 py-3 text-xs font-bold border-b-2 transition-colors ${
                activeSubTab === "my" ? "border-primary text-primary" : "border-transparent text-text-secondary hover:text-[#0F172A]"
              }`}
            >
              My Templates
            </button>
          </div>

          {activeSubTab === "all" ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
              {/* Left sidebar categories */}
              <div className="col-span-1 bg-white border border-[#E5EAF2] rounded-2xl p-4 shadow-sm h-fit space-y-1">
                <span className="block text-[10px] font-black text-text-secondary uppercase tracking-widest mb-3 px-2 font-display">Categories</span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      activeCategory === cat ? "bg-[#EFF6FF] text-primary" : "text-text-secondary hover:text-[#0F172A] hover:bg-slate-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Right template grid */}
              <div className="md:col-span-3 space-y-6">
                {/* Search Bar */}
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="Search templates..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-grow bg-white border border-[#E5EAF2] text-text-dark text-xs rounded-xl px-4 py-2 outline-none shadow-sm focus:border-primary transition-colors font-semibold"
                  />
                  <button className="bg-white border border-[#E5EAF2] text-text-secondary text-xs font-bold px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                    Filter
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredTemplates.map((temp) => (
                    <div 
                      key={temp.id}
                      className="bg-white border border-[#E5EAF2] rounded-2xl p-5 hover:shadow-md transition-all flex flex-col justify-between min-h-[180px] shadow-sm relative"
                    >
                      <div className="space-y-3.5">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] bg-slate-100 text-text-secondary px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">{temp.category}</span>
                          <div className="flex gap-1.5">
                            {temp.popular && (
                              <span className="bg-emerald-50 text-[#10B981] border border-emerald-100 text-[8px] font-black px-1.5 py-0.5 rounded uppercase font-display">Popular</span>
                            )}
                            {temp.pro && (
                              <span className="bg-[#FF9F43]/15 text-[#FF9F43] border border-[#FF9F43]/20 text-[8px] font-black px-1.5 py-0.5 rounded uppercase font-display">Pro</span>
                            )}
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-[#0F172A] font-display">{temp.title}</h3>
                          <p className="text-xs text-text-secondary mt-1 font-semibold leading-relaxed font-body line-clamp-2">{temp.desc}</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-t border-[#E5EAF2]/60 pt-3 mt-4 text-xs font-bold">
                        <span className="text-text-muted">{temp.priceRange}</span>
                        <button 
                          onClick={() => { setSelectedTemplate(temp); setFlow("details"); }}
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          View Template <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Create blank card */}
                  <button 
                    onClick={() => { setWizardCreateStep(1); setFlow("wizard_create"); }}
                    className="bg-slate-50 border border-dashed border-[#E5EAF2] hover:border-primary/40 rounded-2xl p-5 hover:bg-slate-100/50 transition-colors flex flex-col justify-center items-center gap-3 text-center min-h-[180px]"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Plus size={18} />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-[#0F172A] block font-display">Create Blank Template</span>
                      <p className="text-[10px] text-text-secondary mt-1 font-semibold max-w-[180px] leading-relaxed">Start from scratch and build your own custom layout.</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* MY TEMPLATES TABLE LIST */
            <div className="bg-white border border-[#E5EAF2] rounded-2xl overflow-hidden shadow-sm text-left">
              <div className="p-4 border-b border-[#E5EAF2] flex justify-between items-center bg-[#F8FAFC]">
                <input 
                  type="text" 
                  placeholder="Search my templates..." 
                  className="bg-white border border-[#E5EAF2] text-text-dark text-xs rounded-xl px-4 py-2 outline-none w-64 shadow-sm font-semibold"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-body">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-[#E5EAF2] text-text-secondary text-[10px] uppercase tracking-wider font-bold">
                      <th className="p-4">Template Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Projects Using</th>
                      <th className="p-4">Last Updated</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5EAF2] text-xs font-semibold">
                    {userTemplates.map((utemp) => (
                      <tr key={utemp.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 text-[#0F172A] font-bold">{utemp.title}</td>
                        <td className="p-4 text-text-secondary">{utemp.category}</td>
                        <td className="p-4 text-[#0F172A] font-bold">{utemp.projectsUsed}</td>
                        <td className="p-4 text-text-muted">{utemp.lastUpdated}</td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => {
                              const match = templates.find(t => t.title.toLowerCase() === utemp.title.replace("My ", "").replace(" Template", "").toLowerCase()) || templates[0];
                              handleUseTemplate(match);
                            }}
                            className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-3.5 py-1.5 rounded-full font-bold transition-all"
                          >
                            Use Template
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* ----------------- TEMPLATE DETAILS OVERVIEW SCREEN ----------------- */}
      {flow === "details" && selectedTemplate && (
        <div className="space-y-6 max-w-4xl mx-auto text-left animate-fade-in">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-[#E5EAF2] pb-4">
            <button onClick={() => setFlow("list")} className="flex items-center gap-2 text-text-secondary hover:text-[#0F172A] transition-colors text-sm font-bold">
              <ArrowLeft size={16} /> Back to Templates
            </button>
            <div className="flex gap-2">
              <button 
                onClick={() => handleUseTemplate(selectedTemplate)}
                className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-blue"
              >
                Use Template
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Left overview */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-[#0F172A] font-display">{selectedTemplate.title}</h2>
                  <span className="text-[10px] bg-slate-100 text-text-secondary px-2.5 py-0.5 rounded-full font-bold">{selectedTemplate.category}</span>
                </div>
                <p className="text-xs text-text-secondary font-semibold font-body leading-relaxed">{selectedTemplate.desc}</p>
              </div>

              {/* What's included */}
              <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-xs text-[#0F172A] uppercase tracking-wider font-display">What's Included</h3>
                <ul className="text-xs font-semibold text-[#0F172A] space-y-3 pl-1">
                  {[
                    { label: "Project Overview", desc: "Brief scope introduction and alignment goals." },
                    { label: "Design Deliverables", desc: "Wireframes, high-fidelity layouts, sitemaps, and typography files." },
                    { label: "Timeline & Milestones", desc: "Expected deliverables scheduled over 4-6 weeks." },
                    { label: "Investment Summary", desc: "Conservative, Standard, and Premium pricing tiers." },
                    { label: "Terms & Conditions", desc: "Default client contract parameters and feedback loops." }
                  ].map((inc, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <div className="w-5 h-5 rounded-full bg-green-50 text-[#10B981] border border-green-100 flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5">✓</div>
                      <div>
                        <span className="font-bold block">{inc.label}</span>
                        <span className="text-[10px] text-text-secondary font-medium">{inc.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4 font-body">
                <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Template Summary</span>
                <div className="space-y-3.5 border-b border-[#E5EAF2] pb-4 text-xs font-semibold text-text-secondary">
                  <div className="flex justify-between">
                    <span>Category</span>
                    <span className="text-[#0F172A] font-bold">{selectedTemplate.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price Range</span>
                    <span className="text-[#0F172A] font-bold">{selectedTemplate.priceRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. Timeline</span>
                    <span className="text-[#0F172A] font-bold">4 - 6 weeks</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleUseTemplate(selectedTemplate)}
                  className="w-full bg-[#EFF6FF] hover:bg-blue-100 text-[#2563EB] py-2.5 rounded-xl text-xs font-bold transition-all text-center"
                >
                  Create Scope from Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- STEPPER WIZARD: USE TEMPLATE TO GENERATE SCOPE ----------------- */}
      {flow === "wizard_scope" && selectedTemplate && (
        <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm max-w-4xl mx-auto text-left animate-fade-in">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 border-b border-[#E5EAF2] pb-4">
            <span className="font-bold text-[#0F172A] font-display text-lg">New Scope from Template</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center gap-1.5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    wizardScopeStep === step 
                      ? "bg-primary text-white" 
                      : wizardScopeStep > step 
                      ? "bg-primary/10 text-primary" 
                      : "bg-[#F8FAFC] text-text-muted border border-[#E5EAF2]"
                  }`}>
                    {wizardScopeStep > step ? <Check size={13} /> : step}
                  </div>
                  <span className={`text-xs font-semibold hidden md:inline ${
                    wizardScopeStep === step ? "text-primary" : "text-text-muted"
                  }`}>
                    {step === 1 ? "Template" : step === 2 ? "Project Details" : step === 3 ? "Pricing" : step === 4 ? "Review" : "Finish"}
                  </span>
                  {step < 5 && <div className="w-4 border-t border-[#E5EAF2] hidden md:block"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* STEP 1: Verify Template Selected */}
          {wizardScopeStep === 1 && (
            <div className="space-y-6">
              <div className="border border-[#E5EAF2] rounded-2xl p-6 bg-[#F8FAFC]">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-base text-[#0F172A] font-display">{selectedTemplate.title}</h3>
                    <p className="text-xs text-text-secondary font-semibold font-body leading-relaxed mt-1">{selectedTemplate.desc}</p>
                  </div>
                  <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 border border-primary/20 rounded-md font-bold uppercase">{selectedTemplate.category}</span>
                </div>
              </div>
              
              <div className="flex justify-between border-t border-[#E5EAF2] pt-6">
                <button onClick={() => setFlow("list")} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50">Cancel</button>
                <button onClick={() => setWizardScopeStep(2)} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">Next</button>
              </div>
            </div>
          )}

          {/* STEP 2: Customize Project Details */}
          {wizardScopeStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Let's customize your project</h3>
                <p className="text-text-secondary text-sm font-body">Add details so we can customize your scope document.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-5 font-semibold text-xs text-[#0F172A]">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Project Title</label>
                  <input 
                    type="text" 
                    value={projTitle}
                    onChange={(e) => setProjTitle(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Project Description</label>
                  <textarea 
                    rows={3}
                    value={projDesc}
                    onChange={(e) => setProjDesc(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-2.5 outline-none resize-none leading-relaxed focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Client Name</label>
                  <input 
                    type="text" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Client Email</label>
                  <input 
                    type="email" 
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Project Type</label>
                  <select 
                    value={projType}
                    onChange={(e) => setProjType(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none cursor-pointer focus:border-primary focus:bg-white transition-colors"
                  >
                    <option>Website Redesign</option>
                    <option>UI/UX Design</option>
                    <option>E-commerce Setup</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Timeline</label>
                  <select 
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none cursor-pointer focus:border-primary focus:bg-white transition-colors"
                  >
                    <option>4 weeks</option>
                    <option>6 weeks</option>
                    <option>8 weeks</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Start Date</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors cursor-pointer"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Additional Notes</label>
                  <textarea 
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-2.5 outline-none resize-none leading-relaxed focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="flex justify-between border-t border-[#E5EAF2] pt-6">
                <button onClick={() => setWizardScopeStep(1)} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50">Back</button>
                <button onClick={() => setWizardScopeStep(3)} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">Next</button>
              </div>
            </div>
          )}

          {/* STEP 3: Choose Pricing Option */}
          {wizardScopeStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Choose your pricing option</h3>
                <p className="text-text-secondary text-sm font-body">Select a tier to target client budgets.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: "conservative", title: "Conservative", price: "₦450,000", desc: "Essential solution. Best for smaller projects." },
                  { id: "standard", title: "Standard", price: "₦650,000", desc: "Balanced option. Recommended value choice." },
                  { id: "premium", title: "Premium", price: "₦950,000", desc: "Comprehensive package for enterprise parameters." }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setPricingTier(tier.id as any)}
                    className={`p-5 rounded-2xl border text-left flex flex-col justify-between min-h-[160px] transition-all ${
                      pricingTier === tier.id 
                        ? "border-primary bg-[#EFF6FF] shadow-sm" 
                        : "border-[#E5EAF2] bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="space-y-2">
                      <span className="block text-xs font-bold text-text-secondary uppercase">{tier.title}</span>
                      <p className="text-[10px] text-text-muted leading-relaxed font-semibold">{tier.desc}</p>
                    </div>
                    <span className="text-xl font-black text-[#0F172A] font-display mt-4 block">{tier.price}</span>
                  </button>
                ))}
              </div>

              <div className="flex justify-between border-t border-[#E5EAF2] pt-6">
                <button onClick={() => setWizardScopeStep(2)} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50">Back</button>
                <button onClick={() => setWizardScopeStep(4)} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">Next</button>
              </div>
            </div>
          )}

          {/* STEP 4: Review Scope */}
          {wizardScopeStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Review your scope</h3>
                <p className="text-text-secondary text-sm font-body">Make sure all details match your agreement expectations.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Details list */}
                <div className="md:col-span-2 border border-[#E5EAF2] rounded-2xl p-6 bg-[#F8FAFC] space-y-4 text-xs font-semibold text-text-secondary text-left">
                  <div>
                    <span className="block text-[10px] font-bold text-text-muted uppercase">Project Title</span>
                    <span className="text-sm font-bold text-[#0F172A] block mt-1">{projTitle}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-text-muted uppercase">Description</span>
                    <p className="text-[#0F172A] leading-relaxed mt-1">{projDesc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[10px] font-bold text-text-muted uppercase">Client</span>
                      <span className="text-[#0F172A] font-bold mt-1 block">{clientName} ({clientEmail})</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-text-muted uppercase">Start Date</span>
                      <span className="text-[#0F172A] font-bold mt-1 block">{startDate}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing Summary card */}
                <div className="border border-[#E5EAF2] rounded-2xl p-5 bg-white shadow-sm flex flex-col justify-between h-fit text-left text-xs font-semibold text-text-secondary">
                  <span className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-4 font-display">Pricing Summary</span>
                  <div className="space-y-3.5 border-b border-[#E5EAF2] pb-4 mb-4">
                    <div className="flex justify-between">
                      <span>Selected Tier</span>
                      <span className="text-[#0F172A] font-bold uppercase">{pricingTier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount</span>
                      <span className="text-[#0F172A] font-black text-sm">
                        {pricingTier === "conservative" ? "₦450,000" : pricingTier === "standard" ? "₦650,000" : "₦950,000"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Timeline</span>
                      <span className="text-[#0F172A] font-bold">{timeline}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setWizardScopeStep(5)}
                    className="w-full bg-primary hover:bg-primary-hover text-white py-2.5 rounded-xl text-xs font-bold transition-all text-center shadow-blue"
                  >
                    Generate Scope
                  </button>
                </div>
              </div>

              <div className="flex justify-between border-t border-[#E5EAF2] pt-6">
                <button onClick={() => setWizardScopeStep(3)} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50">Back</button>
              </div>
            </div>
          )}

          {/* STEP 5: Success Outcome */}
          {wizardScopeStep === 5 && (
            <div className="space-y-6 text-center animate-fade-in py-6">
              <div className="w-14 h-14 bg-emerald-50 text-[#10B981] border border-emerald-100 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Check size={28} />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-[#0F172A] text-xl font-display">Your scope is ready!</h3>
                <p className="text-text-secondary text-xs font-semibold max-w-md mx-auto font-body">Your scope has been created successfully using the {selectedTemplate.title} template.</p>
              </div>

              <div className="max-w-md mx-auto space-y-3 pt-4">
                <button 
                  onClick={() => router.push("/dashboard/scopes")}
                  className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl text-xs font-bold transition-all shadow-blue"
                >
                  View Scope
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => alert("Copied scope link!")}
                    className="bg-white border border-[#E5EAF2] hover:bg-slate-50 text-[#0F172A] py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
                  >
                    Share Link
                  </button>
                  <button 
                    onClick={() => alert("Downloading PDF...")}
                    className="bg-white border border-[#E5EAF2] hover:bg-slate-50 text-[#0F172A] py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
                  >
                    Download PDF
                  </button>
                </div>
                <button 
                  onClick={() => {
                    setFlow("list");
                    router.push("/dashboard/invoices");
                  }}
                  className="w-full bg-[#EFF6FF] hover:bg-blue-100 text-[#2563EB] py-3 rounded-xl text-xs font-bold transition-all"
                >
                  Create Invoice
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ----------------- STEPPER WIZARD: CREATE CUSTOM TEMPLATE ----------------- */}
      {flow === "wizard_create" && (
        <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm max-w-4xl mx-auto text-left animate-fade-in">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 border-b border-[#E5EAF2] pb-4">
            <span className="font-bold text-[#0F172A] font-display text-lg">Create New Template</span>
            <div className="flex gap-2">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center gap-1.5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    wizardCreateStep === step 
                      ? "bg-primary text-white" 
                      : wizardCreateStep > step 
                      ? "bg-primary/10 text-primary" 
                      : "bg-[#F8FAFC] text-text-muted border border-[#E5EAF2]"
                  }`}>
                    {wizardCreateStep > step ? <Check size={13} /> : step}
                  </div>
                  <span className={`text-xs font-semibold hidden md:inline ${
                    wizardCreateStep === step ? "text-primary" : "text-text-muted"
                  }`}>
                    {step === 1 ? "Build Outline" : step === 2 ? "Template Details" : "Preview"}
                  </span>
                  {step < 3 && <div className="w-4 border-t border-[#E5EAF2] hidden md:block"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* STEP 1: Builder Outline */}
          {wizardCreateStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1">Add scope template sections</h3>
                <p className="text-text-secondary text-sm font-body">Design templates outline variables to prefill dynamic values.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 font-semibold text-xs text-[#0F172A]">
                {/* Outlines builder */}
                <div className="md:col-span-2 space-y-4">
                  <div className="border border-[#E5EAF2] rounded-2xl p-4 bg-[#F8FAFC] space-y-3">
                    <span className="block text-[10px] font-bold text-text-secondary uppercase">Project Overview</span>
                    <textarea 
                      rows={4}
                      defaultValue="Thanks for sharing your needs. {project_description}. We will execute the deliverables under {timeline} starting {start_date}."
                      className="w-full bg-white border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-2.5 outline-none resize-none leading-relaxed focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="border border-[#E5EAF2] rounded-2xl p-4 bg-[#F8FAFC] space-y-3">
                    <span className="block text-[10px] font-bold text-text-secondary uppercase">Design Deliverables</span>
                    <input 
                      type="text" 
                      defaultValue="{project_title} UI Layout Mockups" 
                      className="w-full bg-white border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-2.5 outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                {/* Variables Sidebar helper */}
                <div className="border border-[#E5EAF2] rounded-2xl p-5 bg-white shadow-sm space-y-4 h-fit">
                  <span className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider font-display">Template Variables</span>
                  <div className="space-y-2 text-[10px] font-bold text-text-secondary">
                    {["{project_title}", "{project_description}", "{client_name}", "{timeline}", "{start_date}", "{budget}"].map((variable, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => alert(`Variables ${variable} copied to clipboard!`)}
                        className="w-full flex justify-between items-center bg-[#F8FAFC] border border-[#E5EAF2] px-2.5 py-1.5 rounded-lg hover:border-primary/20 transition-all font-body text-left"
                      >
                        <span className="text-primary">{variable}</span>
                        <Copy size={10} className="text-text-muted" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between border-t border-[#E5EAF2] pt-6">
                <button onClick={() => setFlow("list")} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50">Cancel</button>
                <button onClick={() => setWizardCreateStep(2)} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">Next</button>
              </div>
            </div>
          )}

          {/* STEP 2: Template Details settings */}
          {wizardCreateStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1 font-display">Template Details</h3>
                <p className="text-text-secondary text-sm font-body">Set options, tags, and template visibility.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-5 font-semibold text-xs text-[#0F172A]">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Template Name</label>
                  <input 
                    type="text" 
                    value={newTemplateName}
                    onChange={(e) => setNewTemplateName(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none focus:border-primary focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Category</label>
                  <select 
                    value={newTemplateCat}
                    onChange={(e) => setNewTemplateCat(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none cursor-pointer focus:border-primary focus:bg-white transition-colors"
                  >
                    <option>Web Development</option>
                    <option>Design</option>
                    <option>Branding</option>
                    <option>Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-secondary uppercase mb-2">Price Type</label>
                  <select 
                    value={newTemplatePriceType}
                    onChange={(e) => setNewTemplatePriceType(e.target.value as any)}
                    className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none cursor-pointer focus:border-primary focus:bg-white transition-colors"
                  >
                    <option value="free">Free Template</option>
                    <option value="pro">Pro Only</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#0F172A] uppercase mb-2">Template Visibility</label>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setNewTemplateVisibility("private")}
                      className={`flex-1 p-3 border rounded-xl flex items-center justify-between transition-all ${
                        newTemplateVisibility === "private" ? "border-primary bg-[#EFF6FF]" : "border-[#E5EAF2] hover:bg-slate-50"
                      }`}
                    >
                      <span className="font-bold">Private (Only me)</span>
                      <Lock size={14} className="text-text-secondary" />
                    </button>
                    <button 
                      onClick={() => setNewTemplateVisibility("public")}
                      className={`flex-1 p-3 border rounded-xl flex items-center justify-between transition-all ${
                        newTemplateVisibility === "public" ? "border-primary bg-[#EFF6FF]" : "border-[#E5EAF2] hover:bg-slate-50"
                      }`}
                    >
                      <span className="font-bold">Public (Other freelancers can use)</span>
                      <Sparkles size={14} className="text-text-secondary" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between border-t border-[#E5EAF2] pt-6">
                <button onClick={() => setWizardCreateStep(1)} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50">Back</button>
                <button onClick={() => setWizardCreateStep(3)} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue">Next</button>
              </div>
            </div>
          )}

          {/* STEP 3: Preview Outline */}
          {wizardCreateStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-[#0F172A] text-lg font-display mb-1 font-display">Preview Template Details</h3>
                <p className="text-text-secondary text-sm font-body">Double check all variables outline parameters.</p>
              </div>

              <div className="border border-[#E5EAF2] rounded-2xl p-6 bg-[#F8FAFC] space-y-4 text-xs font-semibold text-[#0F172A] text-left">
                <div className="flex justify-between border-b border-[#E5EAF2]/60 pb-3">
                  <div>
                    <span className="text-[10px] text-text-muted uppercase">Template Name</span>
                    <span className="text-sm font-bold text-[#0F172A] block mt-1">{newTemplateName}</span>
                  </div>
                  <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-md uppercase font-bold">{newTemplateCat}</span>
                </div>
                <div>
                  <span className="text-[10px] text-text-muted uppercase block">Visibility</span>
                  <span className="text-[#0F172A] font-bold mt-1 block uppercase">{newTemplateVisibility}</span>
                </div>
              </div>

              <div className="flex justify-between border-t border-[#E5EAF2] pt-6">
                <button onClick={() => setWizardCreateStep(2)} className="px-5 py-2.5 rounded-full border border-[#E5EAF2] text-text-secondary text-sm font-semibold hover:bg-slate-50">Back</button>
                <button onClick={handleSaveCustomTemplate} className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-blue flex items-center gap-1.5">
                  <Save size={14} /> Save Template
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
