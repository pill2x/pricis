"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Bell, ChevronRight, Download, Target, MessageSquare, Plus, 
  FileText, Loader2, X, Trash2, CheckCircle2, Clock, RefreshCw, XCircle 
} from "lucide-react";
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
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUserAndQuotes();
  }, []);

  const fetchUserAndQuotes = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    
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

  const deleteQuote = async (quoteId: string) => {
    try {
      await supabase.from("quotes").delete().eq("id", quoteId);
      setQuotes(prev => prev.filter(q => q.id !== quoteId));
      if (selectedQuote?.id === quoteId) setSelectedQuote(null);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const getTierPrice = (quote: Quote) => {
    switch (quote.selected_tier) {
      case "conservative": return quote.price_conservative;
      case "standard": return quote.price_standard;
      case "premium": return quote.price_premium;
      default: return quote.price_standard;
    }
  };

  const getStatus = (index: number) => {
    const statuses = [
      { text: "Viewed", bgClass: "bg-success/10", textClass: "text-success" },
      { text: "Draft", bgClass: "bg-gray-100", textClass: "text-text-secondary" },
      { text: "Sent", bgClass: "bg-primary-light", textClass: "text-primary" }
    ];
    return statuses[index % statuses.length];
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 sm:mb-10 pt-12 sm:pt-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-text-dark mb-1 font-display">
            Welcome back, {user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'User'} 👋
          </h1>
          <p className="text-text-secondary text-sm font-body">Let&apos;s create a scope or continue where you left off.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-text-muted hover:text-text-dark transition-colors">
            <Bell size={22} />
          </button>
          <Link href="/generate" className="hidden sm:flex bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full text-sm font-semibold items-center gap-2 transition-colors shadow-blue font-body">
            <Plus size={18} /> New Scope
          </Link>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-surface border border-border-light rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start group">
          <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
            <Target className="text-primary group-hover:text-white" size={24} />
          </div>
          <h3 className="font-bold text-text-dark mb-1.5 text-lg font-display">Scope Generator</h3>
          <p className="text-sm text-text-secondary mb-6 font-body">Create accurate scopes, pricing and timelines.</p>
          <Link href="/generate" className="bg-primary hover:bg-primary-hover text-white w-full py-3 rounded-full text-sm font-semibold transition-colors text-center shadow-sm font-body">
            Start New
          </Link>
        </div>
        
        <div className="bg-surface border border-border-light rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start group">
          <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
            <MessageSquare className="text-primary group-hover:text-white" size={24} />
          </div>
          <h3 className="font-bold text-text-dark mb-1.5 text-lg font-display">Negotiation Assistant</h3>
          <p className="text-sm text-text-secondary mb-6 font-body">Get help with strategy, messages and practice.</p>
          <button className="bg-transparent border-[1.5px] border-border-light text-text-dark hover:bg-gray-50 w-full py-3 rounded-full text-sm font-semibold transition-colors font-body">
            Open Assistant
          </button>
        </div>
      </div>

      {/* Recent Scopes Table */}
      <div>
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="font-semibold text-text-dark text-lg font-display">Recent Scopes</h3>
          <Link href="/dashboard/scopes" className="text-primary text-sm font-semibold hover:text-primary-hover font-body">View all →</Link>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : quotes.length === 0 ? (
          <div className="text-center py-20 bg-surface border border-border-light rounded-lg shadow-sm">
            <FileText className="h-10 w-10 mx-auto mb-3 text-text-muted" />
            <h2 className="text-lg font-bold text-text-dark mb-1 font-display">No scopes yet</h2>
            <p className="text-sm text-text-secondary mb-6 font-body">Generate your first scope to see it here.</p>
            <Link href="/generate" className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-blue font-body">
              Create Scope
            </Link>
          </div>
        ) : (
          <div className="bg-surface border border-border-light rounded-lg overflow-hidden shadow-sm">
            <div className="divide-y divide-border-light">
              {quotes.map((quote, index) => {
                const status = getStatus(index);
                return (
                  <div 
                    key={quote.id} 
                    onClick={() => setSelectedQuote(quote)}
                    className="flex items-center justify-between p-3 sm:p-4 hover:bg-surface-secondary cursor-pointer transition-colors group"
                  >
                    <div className="text-xs sm:text-sm font-bold text-text-dark truncate pr-2 sm:pr-4 flex-1 font-body">
                      {quote.project_title}
                    </div>
                    <div className="flex items-center gap-2 sm:gap-6 md:gap-10 flex-shrink-0">
                      <div className="text-xs sm:text-sm font-semibold text-text-dark text-right font-body">
                        ₦{getTierPrice(quote).toLocaleString()}
                      </div>
                      <div className={`hidden sm:block text-xs font-semibold px-3 py-1 rounded-full w-16 text-center font-body ${status.bgClass} ${status.textClass}`}>
                        {status.text}
                      </div>
                      <ChevronRight size={18} className="text-text-muted group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-surface rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg border border-border-light">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-6 border-b border-border-light sticky top-0 bg-surface z-10 rounded-t-xl">
              <h2 className="font-bold text-xl text-text-dark pr-8 font-display">{selectedQuote.project_title}</h2>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-2 rounded-full hover:bg-surface-secondary text-text-muted transition-colors absolute right-4 top-4"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex gap-2 mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-surface-secondary text-text-secondary font-body">
                  {getIndustryLabel(selectedQuote.industry)}
                </div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary-light text-primary font-body">
                  {selectedQuote.selected_tier} selected
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
                {(['conservative', 'standard', 'premium'] as const).map((tier) => (
                  <div
                    key={tier}
                    className={`rounded-lg p-3 sm:p-4 border flex sm:flex-col items-center sm:items-start justify-between sm:justify-start ${selectedQuote.selected_tier === tier ? 'border-primary bg-primary-light' : 'border-border-light bg-surface'}`}
                  >
                    <p className="text-xs font-semibold uppercase text-text-secondary sm:mb-1 font-body">{tier}</p>
                    <p className={`font-extrabold text-lg font-display ${selectedQuote.selected_tier === tier ? 'text-primary' : 'text-text-dark'}`}>
                      ₦{(selectedQuote[`price_${tier}` as keyof Quote] as number)?.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Scope sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="rounded-lg p-5 border border-border-light bg-surface-secondary">
                  <div className="text-xs font-semibold uppercase text-text-secondary mb-4 flex items-center gap-2 tracking-wide font-body">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> Deliverables
                  </div>
                  {selectedQuote.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 py-1.5">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-primary" />
                      <span className="text-sm font-medium text-text-dark font-body">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg p-5 border border-border-light bg-surface-secondary">
                  <div className="text-xs font-semibold uppercase text-text-secondary mb-4 flex items-center gap-2 tracking-wide font-body">
                    <XCircle className="h-4 w-4 text-danger" /> Out of Scope
                  </div>
                  {selectedQuote.out_of_scope.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 py-1.5">
                      <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-danger" />
                      <span className="text-sm font-medium text-text-dark font-body">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end pt-6 border-t border-border-light">
                <button
                  onClick={() => deleteQuote(selectedQuote.id)}
                  className="text-sm font-semibold text-danger hover:bg-danger/10 px-4 py-2 rounded-full transition-colors font-body text-center"
                >
                  Delete Scope
                </button>
                
                <PDFDownloadLink
                  document={<ScopePDF scope={selectedQuote} selectedTier={selectedQuote.selected_tier as any} />}
                  fileName={`pricis-scope-${Date.now()}.pdf`}
                >
                  {({ loading }) => (
                    <button
                      type="button"
                      className="bg-primary hover:bg-primary-hover text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-colors flex items-center justify-center gap-2 shadow-blue font-body w-full sm:w-auto"
                    >
                      <Download className="h-4 w-4" />
                      {loading ? "Preparing PDF..." : "Export PDF"}
                    </button>
                  )}
                </PDFDownloadLink>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile FAB for New Scope */}
      <Link 
        href="/generate" 
        className="sm:hidden fixed bottom-6 right-6 z-40 bg-primary hover:bg-primary-hover text-white w-14 h-14 rounded-full shadow-lg shadow-primary/30 flex items-center justify-center transition-all active:scale-95"
      >
        <Plus size={24} />
      </Link>
    </>
  );
}
