"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Loader2, FileText, X, Trash2, Plus, Clock, CheckCircle2, RefreshCw, XCircle, Download } from "lucide-react";
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
      
      // Clear delete confirmation
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
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      `}</style>
      
      <div className="min-h-screen" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#060D18' }}>
        <div className="px-6 py-10 md:py-14 max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 
                className="font-black tracking-[-0.02em]"
                style={{ fontSize: '30px', color: '#F1F5F9' }}
              >
                My Scopes
              </h1>
              <p 
                className="mt-1"
                style={{ fontSize: '14px', color: '#94A3B8' }}
              >
                {quotes.length} saved scope{quotes.length !== 1 ? 's' : ''}
              </p>
            </div>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 font-semibold rounded-xl transition-colors"
              style={{
                backgroundColor: '#2563EB',
                color: 'white',
                fontSize: '14px',
                padding: '10px 20px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
            >
              New Scope
              <Plus className="h-4 w-4" />
            </Link>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex items-center justify-center" style={{ padding: '80px 0' }}>
              <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#B8860B' }} />
            </div>
          ) : quotes.length === 0 ? (
            <div className="text-center" style={{ padding: '80px 0' }}>
              <FileText className="h-12 w-12 mx-auto mb-4" style={{ color: '#475569' }} />
              <h2 
                className="text-xl font-semibold mt-4 mb-2"
                style={{ color: '#F1F5F9' }}
              >
                No scopes yet
              </h2>
              <p 
                className="text-sm max-w-xs mx-auto text-center"
                style={{ color: '#94A3B8' }}
              >
                Generate your first scope and it'll appear here.
              </p>
              <Link
                href="/generate"
                className="inline-block mt-6 font-semibold rounded-xl transition-colors"
                style={{
                  backgroundColor: '#2563EB',
                  color: 'white',
                  fontSize: '14px',
                  padding: '12px 24px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
              >
                Generate a Scope
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quotes.map((quote) => (
                <div
                  key={quote.id}
                  className="group rounded-2xl p-5 cursor-pointer transition-all relative"
                  style={{
                    backgroundColor: '#0C1827',
                    border: '1px solid rgba(255,255,255,0.08)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Delete button */}
                  <button
                    onClick={() => setDeletingQuote(quote.id)}
                    className="p-1.5 rounded-lg transition-all"
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      opacity: 0,
                      backgroundColor: 'rgba(6,13,24,0.8)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#475569',
                      zIndex: 10
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.color = '#EF4444';
                      e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)';
                      e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0';
                      e.currentTarget.style.color = '#475569';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.currentTarget.style.backgroundColor = 'rgba(6,13,24,0.8)';
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>

                  {/* Delete confirmation */}
                  {deletingQuote === quote.id && (
                    <div 
                      className="flex items-center justify-between gap-3 mb-3"
                      style={{
                        backgroundColor: 'rgba(239,68,68,0.08)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        borderRadius: '12px',
                        padding: '12px 16px'
                      }}
                    >
                      <div className="text-xs" style={{ color: '#EF4444' }}>
                        Delete this scope?
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => deleteQuote(quote.id)}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg"
                          style={{
                            backgroundColor: 'rgba(239,68,68,0.15)',
                            color: '#EF4444'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.25)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.15)'}
                        >
                          Yes, delete
                        </button>
                        <button
                          onClick={() => setDeletingQuote(null)}
                          className="text-xs font-medium px-3 py-1.5 rounded-lg"
                          style={{
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            color: '#94A3B8'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Top row */}
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        color: '#94A3B8'
                      }}
                    >
                      {getIndustryLabel(quote.industry)}
                    </div>
                    <div style={{ width: '28px', height: '28px' }} />
                  </div>

                  {/* Title */}
                  <h3 
                    className="font-bold mb-1 leading-snug"
                    style={{ 
                      fontSize: '16px', 
                      color: '#F1F5F9',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {quote.project_title}
                  </h3>

                  {/* Date */}
                  <p 
                    className="text-xs mb-4"
                    style={{ color: '#475569' }}
                  >
                    {formatDate(quote.created_at)}
                  </p>

                  {/* Divider */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: '16px' }} />

                  {/* Pricing row */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div>
                      <p 
                        className="text-xs uppercase tracking-wide"
                        style={{ color: '#475569', marginBottom: '2px' }}
                      >
                        Conservative
                      </p>
                      <p 
                        className="text-sm font-bold"
                        style={{ color: '#F1F5F9' }}
                      >
                        ₦{quote.price_conservative.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p 
                        className="text-xs uppercase tracking-wide"
                        style={{ color: '#475569', marginBottom: '2px' }}
                      >
                        Standard
                      </p>
                      <p 
                        className="text-sm font-bold"
                        style={{ 
                          color: quote.selected_tier === 'standard' ? '#2563EB' : '#F1F5F9'
                        }}
                      >
                        ₦{quote.price_standard.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p 
                        className="text-xs uppercase tracking-wide"
                        style={{ color: '#475569', marginBottom: '2px' }}
                      >
                        Premium
                      </p>
                      <p 
                        className="text-sm font-bold"
                        style={{ color: '#F1F5F9' }}
                      >
                        ₦{quote.price_premium.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between mt-4">
                    <div
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: 'rgba(37,99,235,0.1)',
                        border: '1px solid rgba(37,99,235,0.2)',
                        color: '#2563EB'
                      }}
                    >
                      {quote.selected_tier} selected
                    </div>
                    
                    <button
                      onClick={() => handleViewQuote(quote)}
                      className="text-xs font-medium transition-colors"
                      style={{ color: '#94A3B8' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#2563EB'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                    >
                      View →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {selectedQuote && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(4px)'
            }}
          >
            <div 
              className="relative"
              style={{
                backgroundColor: '#0C1827',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                maxWidth: '672px',
                width: '100%',
                margin: '0 16px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 40px 80px rgba(0,0,0,0.6)'
              }}
            >
              {/* Header */}
              <div 
                className="flex items-start justify-between gap-4"
                style={{ 
                  padding: '24px 24px 16px',
                  borderBottom: '1px solid rgba(255,255,255,0.06)'
                }}
              >
                <h2 
                  className="font-black tracking-[-0.02em]"
                  style={{ fontSize: '24px', color: '#F1F5F9' }}
                >
                  {selectedQuote.project_title}
                </h2>
                <button
                  onClick={() => setSelectedQuote(null)}
                  className="p-1 rounded-lg transition-colors"
                  style={{ color: '#94A3B8' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F1F5F9';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#94A3B8';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div style={{ padding: '20px 24px' }}>
                {/* Industry + tier row */}
                <div className="flex gap-2 mb-5">
                  <div
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      color: '#94A3B8'
                    }}
                  >
                    {getIndustryLabel(selectedQuote.industry)}
                  </div>
                  <div
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs"
                    style={{
                      backgroundColor: 'rgba(37,99,235,0.1)',
                      border: '1px solid rgba(37,99,235,0.2)',
                      color: '#2563EB'
                    }}
                  >
                    {selectedQuote.selected_tier} selected
                  </div>
                </div>

                {/* Pricing section */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: selectedQuote.selected_tier === 'conservative' ? 'rgba(37,99,235,0.06)' : '#0C1827',
                      border: selectedQuote.selected_tier === 'conservative' ? 'rgba(37,99,235,0.5)' : 'rgba(255,255,255,0.08)',
                      borderWidth: '1px'
                    }}
                  >
                    <p 
                      className="text-xs tracking-widest uppercase font-medium mb-1"
                      style={{ color: '#94A3B8' }}
                    >
                      Conservative
                    </p>
                    <p 
                      className="font-black tracking-[-0.02em]"
                      style={{ fontSize: '24px', color: '#F1F5F9' }}
                    >
                      ₦{selectedQuote.price_conservative.toLocaleString()}
                    </p>
                  </div>
                  <div
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: selectedQuote.selected_tier === 'standard' ? 'rgba(37,99,235,0.06)' : '#0C1827',
                      border: selectedQuote.selected_tier === 'standard' ? 'rgba(37,99,235,0.5)' : 'rgba(255,255,255,0.08)',
                      borderWidth: '1px'
                    }}
                  >
                    <p 
                      className="text-xs tracking-widest uppercase font-medium mb-1"
                      style={{ color: '#94A3B8' }}
                    >
                      Standard
                    </p>
                    <p 
                      className="font-black tracking-[-0.02em]"
                      style={{ fontSize: '24px', color: '#F1F5F9' }}
                    >
                      ₦{selectedQuote.price_standard.toLocaleString()}
                    </p>
                  </div>
                  <div
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: selectedQuote.selected_tier === 'premium' ? 'rgba(37,99,235,0.06)' : '#0C1827',
                      border: selectedQuote.selected_tier === 'premium' ? 'rgba(37,99,235,0.5)' : 'rgba(255,255,255,0.08)',
                      borderWidth: '1px'
                    }}
                  >
                    <p 
                      className="text-xs tracking-widest uppercase font-medium mb-1"
                      style={{ color: '#94A3B8' }}
                    >
                      Premium
                    </p>
                    <p 
                      className="font-black tracking-[-0.02em]"
                      style={{ fontSize: '24px', color: '#F1F5F9' }}
                    >
                      ₦{selectedQuote.price_premium.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Scope sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Deliverables */}
                  <div 
                    className="rounded-xl p-5"
                    style={{ backgroundColor: '#0C1827', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div className="text-sm font-semibold uppercase tracking-wide mb-3 flex items-center gap-2" style={{ color: '#94A3B8' }}>
                      <CheckCircle2 className="h-4 w-4" />
                      Deliverables
                    </div>
                    {selectedQuote.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 py-1">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#2563EB' }} />
                        <span className="text-sm leading-relaxed" style={{ color: '#F1F5F9' }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Timeline */}
                  <div 
                    className="rounded-xl p-5"
                    style={{ backgroundColor: '#0C1827', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div className="text-sm font-semibold uppercase tracking-wide mb-3 flex items-center gap-2" style={{ color: '#94A3B8' }}>
                      <Clock className="h-4 w-4" />
                      Timeline
                    </div>
                    <div className="flex items-start gap-2 py-1">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#2563EB' }} />
                      <span className="text-sm leading-relaxed" style={{ color: '#F1F5F9' }}>
                        {selectedQuote.timeline}
                      </span>
                    </div>
                  </div>

                  {/* Revision Policy */}
                  <div 
                    className="rounded-xl p-5"
                    style={{ backgroundColor: '#0C1827', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div className="text-sm font-semibold uppercase tracking-wide mb-3 flex items-center gap-2" style={{ color: '#94A3B8' }}>
                      <RefreshCw className="h-4 w-4" />
                      Revision Policy
                    </div>
                    <div className="flex items-start gap-2 py-1">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#2563EB' }} />
                      <span className="text-sm leading-relaxed" style={{ color: '#F1F5F9' }}>
                        {selectedQuote.revision_policy}
                      </span>
                    </div>
                  </div>

                  {/* Out of Scope */}
                  <div 
                    className="rounded-xl p-5"
                    style={{ backgroundColor: '#0C1827', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    <div className="text-sm font-semibold uppercase tracking-wide mb-3 flex items-center gap-2" style={{ color: '#94A3B8' }}>
                      <XCircle className="h-4 w-4" />
                      Out of Scope
                    </div>
                    {selectedQuote.out_of_scope.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 py-1">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#EF4444', opacity: 0.7 }} />
                        <span className="text-sm leading-relaxed" style={{ color: '#EF4444', opacity: 0.7 }}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action row */}
                <div 
                  className="flex gap-3 justify-end pt-5"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <button
                    onClick={() => setDeletingQuote(selectedQuote.id)}
                    className="text-sm font-medium rounded-lg transition-colors"
                    style={{
                      color: '#EF4444',
                      padding: '8px 16px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    Delete
                  </button>
                  
                  <PDFDownloadLink
                    document={<ScopePDF scope={selectedQuote} selectedTier={selectedQuote.selected_tier as any} />}
                    fileName={`pricis-scope-${Date.now()}.pdf`}
                  >
                    {({ loading }) => (
                      <button
                        type="button"
                        className="font-medium rounded-xl transition-colors flex items-center gap-2"
                        style={{
                          border: '1px solid rgba(255,255,255,0.12)',
                          color: '#F1F5F9',
                          fontSize: '14px',
                          padding: '10px 20px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <Download className="h-4 w-4" />
                        {loading ? "Preparing..." : "Export PDF"}
                      </button>
                    )}
                  </PDFDownloadLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
