"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2, FileText, X, Trash2 } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { supabase } from "@/lib/supabase";
import ScopePDF from "@/components/ScopePDF";

interface Quote {
  id: string;
  industry: string;
  experience_level: string;
  project_description: string;
  project_title: string;
  deliverables: string[];
  timeline: string;
  revision_policy: string;
  out_of_scope: string[];
  price_conservative: number;
  price_standard: number;
  price_premium: number;
  pricing_rationale: string;
  selected_tier: string;
  created_at: string;
}

export default function DashboardPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [deletingQuote, setDeletingQuote] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const { data, error } = await supabase
        .from("quotes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching quotes:", error);
      } else {
        setQuotes(data || []);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewQuote = (quote: Quote) => {
    setSelectedQuote(quote);
  };

  const deleteQuote = async (quoteId: string) => {
    try {
      const { error } = await supabase
        .from("quotes")
        .delete()
        .eq("id", quoteId);

      if (error) {
        console.error("Error deleting quote:", error);
        return;
      }

      // Remove from local state
      setQuotes(prev => prev.filter(q => q.id !== quoteId));
      
      // Close modal if this quote was being viewed
      if (selectedQuote?.id === quoteId) {
        setSelectedQuote(null);
      }
      
      setDeletingQuote(null);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const getTierPrice = (quote: Quote) => {
    switch (quote.selected_tier) {
      case "conservative":
        return quote.price_conservative;
      case "standard":
        return quote.price_standard;
      case "premium":
        return quote.price_premium;
      default:
        return quote.price_standard;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getIndustryLabel = (industry: string) => {
    const labels: Record<string, string> = {
      ui_ux_design: "UI/UX Design",
      web_development: "Web Development",
      graphic_design: "Graphic Design",
      copywriting: "Copywriting",
      video_editing: "Video Editing",
      social_media: "Social Media",
      photography: "Photography",
    };
    return labels[industry] || industry;
  };

  return (
    <div className="min-h-screen bg-[#0B1D35] text-white">
      <div className="px-6 py-10 md:py-14 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              My Scopes
            </h1>
            <p className="mt-2 text-white/70">
              Your saved project scopes and quotes
            </p>
          </div>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#B8860B] text-[#0B1D35] font-bold rounded-lg hover:bg-[#c99414] transition-colors"
          >
            Generate New Scope
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-[#B8860B]" />
          </div>
        ) : quotes.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="h-16 w-16 text-white/20 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No scopes yet</h2>
            <p className="text-white/60 mb-6">
              Generate your first project scope to get started
            </p>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#B8860B] text-[#0B1D35] font-bold rounded-lg hover:bg-[#c99414] transition-colors"
            >
              Generate Your First One
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="group relative rounded-xl border border-white/8 bg-[#0F2440] p-5 hover:border-[#B8860B]/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#B8860B]/20 text-[#B8860B]">
                    {getIndustryLabel(quote.industry)}
                  </span>
                  <span className="text-xs text-white/50">
                    {formatDate(quote.created_at)}
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg line-clamp-2 mb-3">
                  {quote.project_title}
                </h3>
                <div className="mb-3">
                  <p className="text-[#B8860B] font-bold text-xl">
                    ₦{getTierPrice(quote).toLocaleString()}
                  </p>
                  <p className="text-xs text-white/50">
                    {quote.selected_tier.charAt(0).toUpperCase() + quote.selected_tier.slice(1).toLowerCase()} Rate
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleViewQuote(quote)}
                    className="text-[#B8860B] font-medium text-sm hover:text-[#c99414] transition-colors"
                  >
                    View Scope →
                  </button>
                  
                  {deletingQuote === quote.id ? (
                    <div className="flex items-center gap-1 bg-black/50 rounded px-2 py-1">
                      <button
                        onClick={() => deleteQuote(quote.id)}
                        className="text-xs text-green-400 hover:text-green-300"
                      >
                        Yes
                      </button>
                      <span className="text-xs text-white/50">/</span>
                      <button
                        onClick={() => setDeletingQuote(null)}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeletingQuote(quote.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10"
                    >
                      <Trash2 className="h-3 w-3 text-white/60" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0B1D35] rounded-2xl border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{selectedQuote.project_title}</h2>
                <button
                  onClick={() => setSelectedQuote(null)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-3">Deliverables</h3>
                  <ul className="list-disc pl-5 space-y-2 text-white/80">
                    {selectedQuote.deliverables.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">Timeline</h3>
                  <p className="text-white/80">{selectedQuote.timeline}</p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">Revision Policy</h3>
                  <p className="text-white/80">{selectedQuote.revision_policy}</p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">Out of Scope</h3>
                  <ul className="list-disc pl-5 space-y-2 text-white/80">
                    {selectedQuote.out_of_scope.map((o, idx) => (
                      <li key={idx}>{o}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">Pricing</h3>
                  <div className="grid gap-4">
                    <div className={`rounded-xl border p-4 ${
                      selectedQuote.selected_tier === 'conservative' 
                        ? 'border-2 border-[#B8860B] bg-[#B8860B]/10' 
                        : 'border border-white/10 bg-white/5'
                    }`}>
                      <p className="text-sm text-white/60">Conservative</p>
                      <p className="text-xl font-bold">₦{selectedQuote.price_conservative.toLocaleString()}</p>
                    </div>
                    <div className={`rounded-xl border p-4 ${
                      selectedQuote.selected_tier === 'standard' 
                        ? 'border-2 border-[#B8860B] bg-[#B8860B]/10' 
                        : 'border border-white/10 bg-white/5'
                    }`}>
                      <p className="text-sm text-white/60">Standard</p>
                      <p className="text-xl font-bold">₦{selectedQuote.price_standard.toLocaleString()}</p>
                    </div>
                    <div className={`rounded-xl border p-4 ${
                      selectedQuote.selected_tier === 'premium' 
                        ? 'border-2 border-[#B8860B] bg-[#B8860B]/10' 
                        : 'border border-white/10 bg-white/5'
                    }`}>
                      <p className="text-sm text-white/60">Premium</p>
                      <p className="text-xl font-bold">₦{selectedQuote.price_premium.toLocaleString()}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-3">Pricing Rationale</h3>
                  <p className="text-white/60 italic leading-relaxed">{selectedQuote.pricing_rationale}</p>
                </section>

                <div className="pt-6 border-t border-white/10">
                  <PDFDownloadLink
                    document={<ScopePDF scope={selectedQuote} selectedTier={selectedQuote.selected_tier as any} />}
                    fileName={`pricis-scope-${Date.now()}.pdf`}
                  >
                    {({ loading }) => (
                      <button
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#B8860B] text-[#0B1D35] font-bold rounded-lg hover:bg-[#c99414] transition-colors"
                      >
                        {loading ? "Preparing PDF..." : "Export PDF"}
                      </button>
                    )}
                  </PDFDownloadLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
