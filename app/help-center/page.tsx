"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Rocket, Target, MessageSquare, CreditCard, Settings, FileText,
  ChevronDown, ChevronUp, Search
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  { id: "getting-started", title: "Getting Started", icon: Rocket },
  { id: "scope-generator", title: "Scope Generator", icon: Target },
  { id: "kova", title: "Kova Negotiation AI", icon: MessageSquare },
  { id: "billing", title: "Billing & Plans", icon: CreditCard },
  { id: "account", title: "Account & Settings", icon: Settings },
  { id: "invoices", title: "Invoices & Sharing", icon: FileText },
];

const faqs = {
  "getting-started": [
    {
      q: "How do I create my first scope?",
      a: "Click 'New Scope' from your dashboard, choose your service type, answer a few questions about your client and project, and Pricis will generate a full scope in seconds."
    },
    {
      q: "Do I need to sign up to use Pricis?",
      a: "You can generate one scope without signing up. To save your work and access your dashboard, you'll need a free account."
    }
  ],
  "scope-generator": [
    {
      q: "Can I edit the scope after it's generated?",
      a: "Yes — everything is fully editable. Click any section to update text, pricing, timeline, or deliverables."
    },
    {
      q: "What are the scope statuses (Draft, Sent, Viewed)?",
      a: "Draft = not yet shared. Sent = you've sent the link or PDF. Viewed = client has opened your scope link."
    }
  ],
  "kova": [
    {
      q: "What is Kova?",
      a: "Kova is Pricis's negotiation AI. It helps you respond to client pushback, craft counter-offers, or practice a negotiation before it happens. Just describe your situation and Kova handles the rest."
    },
    {
      q: "Does Kova work in other languages?",
      a: "Yes. Kova detects the language you're writing in and responds accordingly."
    }
  ],
  "billing": [
    {
      q: "When does my free tier reset?",
      a: "On the 1st of every month. Your scope, Kova, and invoice quotas all reset together."
    },
    {
      q: "How do I upgrade to Pro?",
      a: "Go to Settings → Billing in your dashboard, or click 'Upgrade to Pro' in the sidebar."
    }
  ]
};

export default function HelpCenterPage() {
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    setOpenIndex(null);
  };

  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="py-24 px-6 bg-bg-dark text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-10 font-display leading-tight">
            How can we help?
          </h1>
          
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
            <input 
              type="text" 
              placeholder="Search for answers..." 
              className="w-full bg-bg-dark-3 border border-border rounded-full py-4 pl-12 pr-6 text-white placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors font-body"
            />
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 px-6 bg-surface text-text-dark">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border text-center transition-all ${
                  activeCategory === cat.id 
                    ? "bg-surface-secondary border-primary shadow-sm" 
                    : "bg-surface border-border-light hover:border-primary/50"
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${
                  activeCategory === cat.id ? "bg-primary text-white" : "bg-primary-light text-primary"
                }`}>
                  <cat.icon size={24} />
                </div>
                <h3 className="font-semibold text-text-dark font-display text-sm md:text-base">
                  {cat.title}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs for Active Category */}
      <section className="py-16 px-6 bg-surface-secondary text-text-dark border-t border-border-light min-h-[400px]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-text-dark font-display mb-8">
            {categories.find(c => c.id === activeCategory)?.title}
          </h2>

          <div className="bg-surface border border-border-light rounded-2xl shadow-sm overflow-hidden">
            <div className="divide-y divide-border-light">
              {(faqs[activeCategory as keyof typeof faqs] || []).length > 0 ? (
                (faqs[activeCategory as keyof typeof faqs] || []).map((faq, i) => (
                  <button
                    key={i}
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full py-5 px-6 flex items-start justify-between gap-4 text-left group hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-dark font-display text-base group-hover:text-primary transition-colors">{faq.q}</h3>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          openIndex === i ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <p className="text-sm text-text-secondary leading-relaxed font-body pr-8">{faq.a}</p>
                      </div>
                    </div>
                    <div className="mt-1 flex-shrink-0">
                      {openIndex === i ? (
                        <ChevronUp size={18} className="text-primary" />
                      ) : (
                        <ChevronDown size={18} className="text-text-muted group-hover:text-primary transition-colors" />
                      )}
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-12 px-6 text-center text-text-secondary font-body">
                  More articles coming soon to this category.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-24 px-6 bg-surface text-text-dark text-center border-t border-border-light">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-text-dark font-display mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-text-secondary font-body mb-8">
            Our support team is ready to help you with any questions.
          </p>
          <Link href="/contact" className="inline-flex bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-3.5 rounded-full transition-all font-body shadow-sm">
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
