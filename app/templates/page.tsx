"use client";

import Link from "next/link";
import { useState } from "react";
import { LockKeyhole, PenTool, Code, FileSignature, Target, Briefcase, Video, Camera } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["All", "Design", "Development", "Writing", "Marketing", "Consulting", "Video", "Photography"];

const templates = [
  // FREE
  { id: 1, title: "Logo Design", category: "Design", icon: PenTool, desc: "Professional logo package for startups and SMEs.", price: "₦80k – ₦250k", pro: false },
  { id: 2, title: "Social Media Content", category: "Marketing", icon: Target, desc: "Monthly social content management scope.", price: "₦120k – ₦350k", pro: false },
  { id: 3, title: "Website Copywriting", category: "Writing", icon: FileSignature, desc: "5-page website copy scope.", price: "₦100k – ₦300k", pro: false },
  { id: 4, title: "Photography Session", category: "Photography", icon: Camera, desc: "Commercial product or portrait photography.", price: "₦80k – ₦200k", pro: false },
  { id: 5, title: "Video Editing", category: "Video", icon: Video, desc: "Short-form and long-form video editing scope.", price: "₦100k – ₦400k", pro: false },
  // PRO
  { id: 6, title: "Brand Identity Design", category: "Design", icon: PenTool, desc: "Full branding package with guidelines.", price: "₦400k – ₦1.5M", pro: true },
  { id: 7, title: "E-commerce Redesign", category: "Design", icon: PenTool, desc: "Full website redesign scope for retail.", price: "₦800k – ₦3M", pro: true },
  { id: 8, title: "Mobile App UI/UX", category: "Design", icon: PenTool, desc: "Full app design scope with prototyping.", price: "₦1.2M – ₦5M", pro: true },
  { id: 9, title: "SEO Content Strategy", category: "Marketing", icon: Target, desc: "3-month SEO content scope.", price: "₦250k – ₦800k", pro: true },
  { id: 10, title: "Email Campaign", category: "Marketing", icon: Target, desc: "Monthly email marketing scope.", price: "₦150k – ₦400k", pro: true },
  { id: 11, title: "Social Media Strategy", category: "Marketing", icon: Target, desc: "Full strategy + execution plan.", price: "₦300k – ₦900k", pro: true },
  { id: 12, title: "PR & Communications", category: "Consulting", icon: Briefcase, desc: "Monthly PR retainer scope.", price: "₦350k – ₦1M", pro: true },
  { id: 13, title: "Landing Page Dev", category: "Development", icon: Code, desc: "Single landing page development.", price: "₦300k – ₦900k", pro: true },
  { id: 14, title: "Full Website Dev", category: "Development", icon: Code, desc: "Multi-page website development.", price: "₦800k – ₦4M", pro: true },
  { id: 15, title: "Content Strategy", category: "Writing", icon: FileSignature, desc: "Editorial calendar + strategy.", price: "₦200k – ₦600k", pro: true },
  { id: 16, title: "Consulting Retainer", category: "Consulting", icon: Briefcase, desc: "Monthly advisory and consulting.", price: "₦400k – ₦2M", pro: true },
  { id: 17, title: "Event Coverage", category: "Photography", icon: Camera, desc: "Full event photography package.", price: "₦200k – ₦600k", pro: true },
  { id: 18, title: "Motion Graphics", category: "Video", icon: Video, desc: "Animation + graphics scope.", price: "₦350k – ₦1.2M", pro: true },
  { id: 19, title: "Podcast Production", category: "Video", icon: Video, desc: "Monthly podcast production scope.", price: "₦150k – ₦500k", pro: true },
  { id: 20, title: "Illustration Package", category: "Design", icon: PenTool, desc: "Custom illustration scope.", price: "₦250k – ₦900k", pro: true },
];

export default function TemplatesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTemplates = activeCategory === "All" 
    ? templates 
    : templates.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="py-20 px-6 bg-bg-dark text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-display leading-tight">
            Start from a proven <span className="text-primary">framework.</span>
          </h1>
          <p className="text-lg text-text-muted mb-12 leading-relaxed font-body max-w-2xl mx-auto">
            20+ scope templates built for Nigerian and African freelancers. Pick one, customize it, send it.
          </p>
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 bg-bg-dark-2 p-2 rounded-2xl w-fit mx-auto border border-border">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold font-body transition-all ${
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
      </section>

      {/* Template Grid */}
      <section className="py-16 px-6 bg-surface-secondary text-text-dark border-t border-border-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="bg-surface border border-border-light rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col relative group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-primary">
                    <template.icon size={24} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-surface-secondary text-text-secondary text-xs font-semibold px-2.5 py-1 rounded-md font-body border border-border-light">
                      {template.category}
                    </span>
                    {template.pro && (
                      <LockKeyhole size={16} className="text-text-muted" />
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-text-dark font-display mb-2">
                  {template.title}
                </h3>
                <p className="text-sm text-text-secondary font-body mb-6 leading-relaxed flex-1">
                  {template.desc}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border-light">
                  <span className="text-sm font-semibold text-text-dark font-display">
                    {template.price}
                  </span>
                  {template.pro ? (
                    <Link href="/pricing" className="text-xs font-semibold bg-white border border-border-light hover:bg-gray-50 text-text-dark px-4 py-2 rounded-lg transition-colors font-body">
                      Upgrade to Use
                    </Link>
                  ) : (
                    <Link href="/signup" className="text-xs font-semibold bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-colors font-body shadow-sm">
                      Use Template
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Templates Work */}
      <section className="py-24 px-6 bg-surface text-text-dark">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-center md:text-left">
            <div>
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-display font-bold text-lg mb-6 mx-auto md:mx-0 shadow-sm">
                1
              </div>
              <h3 className="text-xl font-bold text-text-dark font-display mb-3">Pick a template</h3>
              <p className="text-text-secondary font-body leading-relaxed text-sm">
                Choose from our library of scopes built for Nigerian market rates and expectations.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-display font-bold text-lg mb-6 mx-auto md:mx-0 shadow-sm">
                2
              </div>
              <h3 className="text-xl font-bold text-text-dark font-display mb-3">Pricis customizes it</h3>
              <p className="text-text-secondary font-body leading-relaxed text-sm">
                Answer a few questions and Pricis adjusts the scope to your client and project context.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-display font-bold text-lg mb-6 mx-auto md:mx-0 shadow-sm">
                3
              </div>
              <h3 className="text-xl font-bold text-text-dark font-display mb-3">Send or save</h3>
              <p className="text-text-secondary font-body leading-relaxed text-sm">
                Use it immediately or save it as your own reusable template for future projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Save Your Own CTA */}
      <section className="py-24 px-6 bg-surface-secondary text-text-dark border-t border-border-light text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark font-display mb-4">
            Save your best scopes as templates.
          </h2>
          <p className="text-lg text-text-secondary mb-8 leading-relaxed font-body">
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
