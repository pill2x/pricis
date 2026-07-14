"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  LockKeyhole, 
  PenTool, 
  Code, 
  FileSignature, 
  Target, 
  Briefcase, 
  Video, 
  Camera, 
  Search, 
  Plus, 
  Sparkles, 
  FolderHeart, 
  Zap,
  ArrowRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["All", "Design", "Development", "Writing", "Marketing", "Consulting", "Video", "Photography"];

const templates = [
  // FREE
  { id: 1, title: "Logo Design", category: "Design", icon: PenTool, desc: "Professional logo package for startups and SMEs.", price: "₦80k – ₦250k", pro: false, popular: true },
  { id: 2, title: "Social Media Content", category: "Marketing", icon: Target, desc: "Monthly social content management scope.", price: "₦120k – ₦350k", pro: false, popular: true },
  { id: 3, title: "Website Copywriting", category: "Writing", icon: FileSignature, desc: "5-page website copy scope.", price: "₦100k – ₦300k", pro: false, popular: true },
  { id: 4, title: "Photography Session", category: "Photography", icon: Camera, desc: "Commercial product or portrait photography.", price: "₦80k – ₦200k", pro: false, popular: false },
  { id: 5, title: "Video Editing", category: "Video", icon: Video, desc: "Short-form and long-form video editing scope.", price: "₦100k – ₦400k", pro: false, popular: false },
  // PRO
  { id: 6, title: "Brand Identity Design", category: "Design", icon: PenTool, desc: "Full branding package with guidelines.", price: "₦400k – ₦1.5M", pro: true, popular: true },
  { id: 7, title: "E-commerce Redesign", category: "Design", icon: PenTool, desc: "Full website redesign scope for retail.", price: "₦800k – ₦3M", pro: true, popular: false },
  { id: 8, title: "Mobile App UI/UX", category: "Design", icon: PenTool, desc: "Full app design scope with prototyping.", price: "₦1.2M – ₦5M", pro: true, popular: true },
  { id: 9, title: "SEO Content Strategy", category: "Marketing", icon: Target, desc: "3-month SEO content scope.", price: "₦250k – ₦800k", pro: true, popular: false },
  { id: 10, title: "Email Campaign", category: "Marketing", icon: Target, desc: "Monthly email marketing scope.", price: "₦150k – ₦400k", pro: true, popular: false },
  { id: 11, title: "Social Media Strategy", category: "Marketing", icon: Target, desc: "Full strategy + execution plan.", price: "₦300k – ₦900k", pro: true, popular: false },
  { id: 12, title: "PR & Communications", category: "Consulting", icon: Briefcase, desc: "Monthly PR retainer scope.", price: "₦350k – ₦1M", pro: true, popular: false },
  { id: 13, title: "Landing Page Dev", category: "Development", icon: Code, desc: "Single landing page development.", price: "₦300k – ₦900k", pro: true, popular: false },
  { id: 14, title: "Full Website Dev", category: "Development", icon: Code, desc: "Multi-page website development.", price: "₦800k – ₦4M", pro: true, popular: true },
  { id: 15, title: "Content Strategy", category: "Writing", icon: FileSignature, desc: "Editorial calendar + strategy.", price: "₦200k – ₦600k", pro: true, popular: false },
  { id: 16, title: "Consulting Retainer", category: "Consulting", icon: Briefcase, desc: "Monthly advisory and consulting.", price: "₦400k – ₦2M", pro: true, popular: false },
  { id: 17, title: "Event Coverage", category: "Photography", icon: Camera, desc: "Full event photography package.", price: "₦200k – ₦600k", pro: true, popular: false },
  { id: 18, title: "Motion Graphics", category: "Video", icon: Video, desc: "Animation + graphics scope.", price: "₦350k – ₦1.2M", pro: true, popular: false },
  { id: 19, title: "Podcast Production", category: "Video", icon: Video, desc: "Monthly podcast production scope.", price: "₦150k – ₦500k", pro: true, popular: false },
  { id: 20, title: "Illustration Package", category: "Design", icon: PenTool, desc: "Custom illustration scope.", price: "₦250k – ₦900k", pro: true, popular: false },
];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates.filter(t => {
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularTemplates = templates.filter(t => t.popular);

  return (
    <div className="min-h-screen bg-[#080D1A] text-white font-body selection:bg-primary selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-28 overflow-hidden bg-[#080D1A] text-white">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent rounded-full blur-[120px] opacity-80 pointer-events-none"></div>
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[128px] opacity-40 pointer-events-none"></div>
          <div className="absolute top-40 -right-40 w-96 h-96 bg-success/5 rounded-full blur-[128px] opacity-40 pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 mb-8 backdrop-blur-md shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">PROVEN STRUCTURES</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8 leading-tight text-white">
            Start from a proven <span className="text-primary">framework.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
            Pick from our pre-calibrated scope templates built specifically for Nigerian and African market dynamics. Tweak in seconds.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16 p-6 rounded-2xl bg-[#0D1526]/75 border border-white/10 backdrop-blur-md">
            <div className="text-center border-r border-white/10">
              <p className="text-2xl md:text-3xl font-black text-white font-display">20+</p>
              <p className="text-[10px] md:text-xs text-text-muted font-semibold uppercase tracking-wider mt-1">Ready Scopes</p>
            </div>
            <div className="text-center border-r border-white/10">
              <p className="text-2xl md:text-3xl font-black text-emerald-400 font-display">8</p>
              <p className="text-[10px] md:text-xs text-text-muted font-semibold uppercase tracking-wider mt-1">Categories</p>
            </div>
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-black text-blue-400 font-display">2,500+</p>
              <p className="text-[10px] md:text-xs text-text-muted font-semibold uppercase tracking-wider mt-1">Times Used</p>
            </div>
          </div>
          
          {/* Search and Filter Combo */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-text-muted" />
              <input 
                type="text"
                placeholder="Search logo, web development, copywriting..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0D1526]/75 border border-white/10 rounded-full pl-12 pr-6 py-3 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-primary transition-all shadow-inner"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-[#0D1526]/50 border border-white/5 w-fit mx-auto backdrop-blur-sm">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold font-body transition-all ${
                    activeCategory === cat 
                      ? "bg-primary text-white shadow-sm" 
                      : "text-text-muted hover:text-white hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Templates Horizontal Row */}
      {searchQuery === "" && activeCategory === "All" && (
        <section className="py-12 bg-[#F7F9FC] text-text-dark border-t border-b border-[#E5EAF2]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-2.5 mb-8 animate-fade-in-up">
              <FolderHeart className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-bold font-display text-[#0F172A]">Popular Templates</h2>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6 snap-x">
              {popularTemplates.map((t, idx) => (
                <div 
                  key={t.id} 
                  className="bg-white border border-[#E5EAF2] rounded-2xl p-6 min-w-[280px] md:min-w-[320px] snap-start flex flex-col justify-between hover:shadow-md transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center">
                        <t.icon size={20} />
                      </div>
                      <span className="text-[10px] font-bold text-text-secondary bg-[#F1F5F9] px-2.5 py-1 rounded border border-[#E2E8F0]">
                        {t.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-[#0F172A] font-display mb-1">{t.title}</h3>
                    <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed mb-4">{t.desc}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9] mt-2">
                    <span className="text-xs font-black text-[#0F172A]">{t.price}</span>
                    <Link 
                      href={t.pro ? "/pricing" : "/signup"}
                      className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline"
                    >
                      {t.pro ? "Get Pro Access" : "Use Scope"} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Template Grid */}
      <section className="py-20 px-6 bg-white text-text-dark">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Custom Creator Card */}
            {searchQuery === "" && (
              <div className="bg-[#F8FAFC] border-2 border-dashed border-[#CBD5E1] hover:border-primary/60 rounded-2xl p-8 flex flex-col justify-between items-center text-center transition-all duration-300 group cursor-pointer animate-fade-in-up">
                <div className="w-12 h-12 rounded-full bg-primary-light text-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Plus size={24} />
                </div>
                <div className="my-6">
                  <h3 className="text-lg font-bold text-[#0F172A] font-display mb-2">Create Custom Scope</h3>
                  <p className="text-xs text-text-secondary font-body leading-relaxed max-w-[220px]">
                    Create a blank scope format calibrated from your custom elements.
                  </p>
                </div>
                <Link href="/signup" className="w-full py-2.5 bg-white border border-[#CBD5E1] text-[#0F172A] hover:bg-slate-50 rounded-xl text-xs font-bold font-body transition-colors">
                  Build Custom Template
                </Link>
              </div>
            )}

            {filteredTemplates.map((template, idx) => (
              <div 
                key={template.id} 
                className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col relative group hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {template.pro && (
                  <div className="absolute inset-0 bg-[#0F172A]/5 backdrop-blur-[0.5px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 pointer-events-none">
                    <div className="bg-white/95 px-4 py-2 rounded-full shadow-lg border border-[#E5EAF2] flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <LockKeyhole size={13} className="text-primary" />
                      <span className="text-[10px] font-bold text-[#0F172A]">Unlock with Pro</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                    <template.icon size={22} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#F1F5F9] text-text-secondary text-xs font-semibold px-2.5 py-1 rounded-md font-body border border-[#E2E8F0]">
                      {template.category}
                    </span>
                    {template.pro && (
                      <span className="bg-amber-500/10 text-amber-600 p-1.5 rounded-md border border-amber-500/20">
                        <LockKeyhole size={14} className="stroke-[2.5]" />
                      </span>
                    )}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-[#0F172A] font-display mb-2">
                  {template.title}
                </h3>
                <p className="text-xs text-text-secondary font-body mb-6 leading-relaxed flex-1">
                  {template.desc}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#F1F5F9]">
                  <span className="text-sm font-black text-[#0F172A] font-display">
                    {template.price}
                  </span>
                  {template.pro ? (
                    <Link href="/pricing" className="text-xs font-bold bg-[#F8FAFC] border border-[#E5EAF2] hover:bg-slate-50 text-text-dark px-4 py-2 rounded-xl transition-colors font-body">
                      Upgrade to Use
                    </Link>
                  ) : (
                    <Link href="/signup" className="text-xs font-bold bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-xl transition-colors font-body shadow-sm">
                      Use Template
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-20 animate-fade-in">
              <p className="text-text-secondary font-medium">No templates match your search query.</p>
              <button 
                onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                className="mt-4 text-xs font-bold text-primary hover:underline"
              >
                Clear Search & Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How Templates Work */}
      <section className="py-24 px-6 bg-[#F7F9FC] text-text-dark border-t border-[#E5EAF2]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
            {[
              {
                step: "1",
                title: "Pick a template",
                desc: "Choose from our library of scopes built for Nigerian market rates and expectations."
              },
              {
                step: "2",
                title: "Pricis customizes it",
                desc: "Answer a few questions and Pricis adjusts the scope to your client and project context."
              },
              {
                step: "3",
                title: "Send or save",
                desc: "Use it immediately or save it as your own reusable template for future projects."
              }
            ].map((s, idx) => (
              <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-display font-bold text-lg mb-6 mx-auto md:mx-0 shadow-sm shadow-blue">
                  {s.step}
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] font-display mb-3">{s.title}</h3>
                <p className="text-xs text-text-secondary font-body leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Save Your Own CTA */}
      <section className="py-24 px-6 bg-[#080D1A] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-primary/10 via-primary/5 to-transparent rounded-full blur-[100px] opacity-80 pointer-events-none"></div>
        </div>
        <div className="max-w-2xl mx-auto relative z-10 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-display mb-4">
            Save your best scopes as templates.
          </h2>
          <p className="text-lg text-text-muted mb-8 leading-relaxed font-body">
            Pro users can save any generated scope as a reusable template. Perfect for recurring project types — set it up once, use it forever.
          </p>
          <Link href="/pricing" className="inline-flex bg-primary hover:bg-primary-hover shadow-blue text-white font-semibold px-8 py-3.5 rounded-full transition-all font-body">
            Upgrade to Pro
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
