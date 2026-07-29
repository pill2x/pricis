"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Plus, ArrowLeft, Check, Trash2, ChevronRight, 
  Settings, Key, RefreshCw, AlertCircle, Link2, CheckCircle2, 
  ShieldAlert, Sparkles, MessageSquare, SendHorizontal, Brain, 
  Search, PenTool, Users, Copy, Download, Lock, CheckCircle,
  MoreHorizontal, HelpCircle, ArrowUpRight, Volume2, Mic, Play, Smile, Loader2
} from "lucide-react";
import { supabaseAuth } from "@/lib/auth";
import { fetchConversations, fetchMessages, createNegotiation, insertMessage, deleteNegotiation } from "@/app/actions/db";

interface Negotiation {
  id: string;
  title: string;
  scope: string;
  status: "Active" | "Resolved" | "Practice";
  lastMessage: string;
  updated: string;
}

export default function NegotiationAIPage() {
  const [view, setView] = useState<"list" | "chat" | "options_hub" | "draft_response" | "practice_mode" | "resolved">("list");
  const [userId, setUserId] = useState<string | null>(null);
  const [aiResponseText, setAiResponseText] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedMode, setSelectedMode] = useState("draft");
  
  // Negotiations List
  const [negotiations, setNegotiations] = useState<Negotiation[]>([]);

  useEffect(() => {
    async function loadNegotiations() {
      const { data: { session } } = await supabaseAuth.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        const list = await fetchConversations(session.user.id);
        if (list && list.length > 0) {
          const mapped: Negotiation[] = list.map((n: any) => ({
            id: n.id,
            title: n.title || "Objection Thread",
            scope: n.context || "Acme Corp Website Redesign",
            status: n.status as any || "Active",
            lastMessage: "Conversation loaded",
            updated: new Date(n.created_at).toLocaleDateString()
          }));
          setNegotiations(mapped);
        } else {
          setNegotiations([
            { id: "neg-1", title: "Client pushback on price", scope: "Acme Corp Website Redesign", status: "Active", lastMessage: "Client: That seems a bit high...", updated: "2h ago" },
            { id: "neg-2", title: "Scope reduction request", scope: "Mobile App Design", status: "Active", lastMessage: "Client: Can we reduce the number of...", updated: "1d ago" }
          ]);
        }
      }
    }
    loadNegotiations();
  }, []);

  const [selectedNeg, setSelectedNeg] = useState<Negotiation | null>({
    id: "neg-1", 
    title: "Client pushback on price", 
    scope: "Acme Corp Website Redesign", 
    status: "Active", 
    lastMessage: "Client: That seems a bit high...", 
    updated: "2h ago"
  });

  // Chat/Objection Input
  const [objectionText, setObjectionText] = useState("Thanks for the proposal. To be honest, the price seems a bit high for our budget. Is there any way you can reduce it?");
  const [tone, setTone] = useState("Professional");

  // Interactive Practice states
  const [practiceHistory, setPracticeHistory] = useState([
    { role: "kova", content: "Thanks for the proposal. To be honest, the price seems a bit high for our budget. Is there any way you can reduce it?" }
  ]);
  const [practiceInput, setPracticeInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // General State Helpers
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "Resolved" | "Practice">("All");

  const handleSendToKova = () => {
    if (objectionText.trim()) {
      setView("options_hub");
    }
  };

  const loadAiResponse = async (mode: string) => {
    setSelectedMode(mode);
    setIsAiLoading(true);
    setView("draft_response");
    try {
      const apiMode = mode === "counter_offer" ? "analyze" : (mode === "value_justification" ? "coach" : "draft");
      const res = await fetch("/api/negotiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: apiMode,
          context: selectedNeg?.scope || "Acme Corp Website Redesign",
          messages: [{ role: "user", content: objectionText }],
          userName: "Alex"
        })
      });
      const data = await res.json();
      if (data.message) {
        setAiResponseText(data.message);
        if (selectedNeg && !selectedNeg.id.startsWith("neg-")) {
          await insertMessage(selectedNeg.id, "user", objectionText);
          await insertMessage(selectedNeg.id, "assistant", data.message);
        }
      } else {
        setAiResponseText("Sorry, I could not generate a response at this time.");
      }
    } catch (e) {
      setAiResponseText("An error occurred while connecting to Kova AI.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSendPracticeReply = async () => {
    if (practiceInput.trim()) {
      const updatedHistory = [...practiceHistory, { role: "user", content: practiceInput }];
      setPracticeHistory(updatedHistory);
      setPracticeInput("");
      setIsTyping(true);

      try {
        const res = await fetch("/api/negotiate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mode: "roleplay",
            context: selectedNeg?.scope || "Practice Session",
            messages: updatedHistory.map(h => ({ role: h.role === "kova" ? "assistant" : "user", content: h.content })),
            userName: "Alex"
          })
        });
        const data = await res.json();
        if (data.message) {
          setPracticeHistory([
            ...updatedHistory,
            { role: "kova", content: data.message }
          ]);
          if (selectedNeg && !selectedNeg.id.startsWith("neg-")) {
            await insertMessage(selectedNeg.id, "user", practiceInput);
            await insertMessage(selectedNeg.id, "assistant", data.message);
          }
        } else {
          setPracticeHistory([
            ...updatedHistory,
            { role: "kova", content: "I'm sorry, I encountered a connection issue." }
          ]);
        }
      } catch (e) {
        setPracticeHistory([
          ...updatedHistory,
          { role: "kova", content: "I'm sorry, I encountered a connection issue." }
        ]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleResolveNegotiation = () => {
    if (selectedNeg) {
      const updatedList = negotiations.map(n => 
        n.id === selectedNeg.id ? { ...n, status: "Resolved" as const, lastMessage: "Outcome: Client accepted proposal." } : n
      );
      setNegotiations(updatedList);
      setSelectedNeg({ ...selectedNeg, status: "Resolved", lastMessage: "Outcome: Client accepted proposal." });
      setView("resolved");
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* ----------------- LIST VIEW ----------------- */}
      {view === "list" && (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-[#0F172A] font-display">Negotiation AI</h1>
              <p className="text-text-secondary text-sm font-body">Get help from Kova, your AI negotiation assistant.</p>
            </div>
            <button 
              onClick={() => {
                const newId = `neg-${Date.now()}`;
                const newNeg: Negotiation = {
                  id: newId,
                  title: "New Negotiation",
                  scope: "Acme Corp Website Redesign",
                  status: "Active",
                  lastMessage: "Kova: Paste the client message...",
                  updated: "Just now"
                };
                setNegotiations([newNeg, ...negotiations]);
                setSelectedNeg(newNeg);
                setObjectionText("");
                setView("chat");
              }}
              className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-blue transition-all"
            >
              <Plus size={16} /> New Conversation
            </button>
          </div>

          {/* Stats metrics panel */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Conversations", count: 12, desc: "All time", color: "text-[#0F172A]" },
              { label: "Active", count: 5, desc: "In progress", color: "text-blue-600" },
              { label: "Resolved", count: 4, desc: "Completed", color: "text-emerald-600" },
              { label: "Practice", count: 3, desc: "Role-play sessions", color: "text-purple-600" },
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
            <div className="p-4 border-b border-[#E5EAF2] flex justify-between items-center gap-4 bg-[#F8FAFC]">
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="bg-white border border-[#E5EAF2] text-text-dark text-xs rounded-xl px-4 py-2 outline-none w-64 shadow-sm focus:border-primary transition-colors font-semibold"
              />
              <div className="flex gap-2 text-[10px] font-bold">
                {(["All", "Active", "Resolved", "Practice"] as const).map((cat) => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveTab(cat)}
                    className={`px-3.5 py-1.5 rounded-xl border transition-colors ${
                      activeTab === cat ? "bg-primary text-white border-transparent" : "bg-white border-[#E5EAF2] text-text-secondary hover:bg-slate-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-body">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E5EAF2] text-text-secondary text-[10px] uppercase tracking-wider font-bold">
                    <th className="p-4">Conversation</th>
                    <th className="p-4">Related Scope</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Last Message</th>
                    <th className="p-4">Updated</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EAF2] text-xs font-semibold">
                  {negotiations
                    .filter(n => activeTab === "All" || n.status === activeTab)
                    .map((neg) => (
                      <tr key={neg.id} className="hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => {
                        setSelectedNeg(neg);
                        if (neg.status === "Resolved") {
                          setView("resolved");
                        } else {
                          setView("chat");
                        }
                      }}>
                        <td className="p-4 text-[#0F172A] font-bold flex items-center gap-2">
                          <MessageSquare size={16} className="text-text-secondary" />
                          {neg.title}
                        </td>
                        <td className="p-4 text-text-secondary">{neg.scope}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            neg.status === "Resolved" ? "bg-emerald-50 text-[#10B981] border-emerald-100" :
                            neg.status === "Active" ? "bg-blue-50 text-primary border-blue-100" :
                            "bg-purple-50 text-purple-600 border-purple-100"
                          }`}>{neg.status}</span>
                        </td>
                        <td className="p-4 text-text-muted truncate max-w-xs">{neg.lastMessage}</td>
                        <td className="p-4 text-text-muted">{neg.updated}</td>
                        <td className="p-4 text-text-muted hover:text-primary transition-colors text-right" onClick={(e) => e.stopPropagation()}>
                          <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                            <MoreHorizontal size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ----------------- CHAT WORKSPACE VIEW ----------------- */}
      {view === "chat" && selectedNeg && (
        <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-[#E5EAF2] pb-4">
            <button onClick={() => setView("list")} className="flex items-center gap-2 text-text-secondary hover:text-[#0F172A] transition-colors text-sm font-bold">
              <ArrowLeft size={16} /> Back to Conversations
            </button>
            <div className="flex gap-2">
              <button className="bg-white border border-[#E5EAF2] text-[#0F172A] hover:bg-slate-50 px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-sm">Share</button>
              <button className="bg-white border border-[#E5EAF2] text-[#0F172A] p-2 rounded-xl text-xs font-bold transition-colors shadow-sm"><MoreHorizontal size={16} /></button>
            </div>
          </div>

          <div className="flex justify-between items-center bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm">
            <div className="text-left">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#0F172A] font-display">{selectedNeg.title}</h2>
                <span className="bg-blue-50 text-primary border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Active</span>
              </div>
              <p className="text-xs text-text-secondary mt-1 font-semibold">Related Scope: <span className="font-bold text-primary hover:underline cursor-pointer">{selectedNeg.scope} • View Scope</span></p>
            </div>
          </div>

          {/* Chat main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
            
            {/* Center Chat Block */}
            <div className="lg:col-span-2 bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[400px]">
              <div className="space-y-4 flex-grow overflow-y-auto mb-6">
                <span className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">Conversation History</span>
                
                {/* Chat bubbles */}
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs flex-shrink-0 font-display">K</div>
                  <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-2xl p-4 text-xs font-semibold text-[#0F172A] max-w-lg leading-relaxed">
                    Hi! I'm Kova, your AI negotiation assistant. Paste the client's message below and I'll help you respond with confidence.
                  </div>
                </div>

                {objectionText && (
                  <div className="flex gap-3 items-start justify-end">
                    <div className="bg-[#EFF6FF] border border-blue-100 rounded-2xl p-4 text-xs font-semibold text-[#0F172A] max-w-lg leading-relaxed">
                      <p className="text-[9px] text-[#2563EB] uppercase font-bold mb-1">Client Objection</p>
                      {objectionText}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs flex-shrink-0">C</div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-[#E5EAF2] pt-4 space-y-3">
                <textarea 
                  rows={3}
                  value={objectionText}
                  onChange={(e) => setObjectionText(e.target.value)}
                  placeholder="Paste client message or describe the situation..."
                  className="w-full bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-2.5 outline-none font-medium resize-none leading-relaxed focus:border-primary transition-colors"
                />
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <button className="bg-[#F8FAFC] hover:bg-slate-50 border border-[#E5EAF2] text-text-secondary px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors">Attach context</button>
                    <select 
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="bg-[#F8FAFC] hover:bg-slate-50 border border-[#E5EAF2] text-text-secondary px-2.5 py-1.5 rounded-lg text-[10px] font-bold outline-none cursor-pointer"
                    >
                      <option>Professional</option>
                      <option>Casual</option>
                      <option>Persuasive</option>
                    </select>
                  </div>
                  
                  <button 
                    onClick={handleSendToKova}
                    className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-blue transition-colors flex items-center gap-1.5"
                  >
                    Send to Kova <SendHorizontal size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right details Sidebar */}
            <div className="space-y-6">
              {/* Context Panel */}
              <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-[#E5EAF2] pb-2">
                  <span className="block text-xs font-bold text-text-secondary uppercase tracking-wider">Context</span>
                  <button className="text-primary text-[10px] font-bold hover:underline">Edit</button>
                </div>
                
                <div className="space-y-3 text-xs font-semibold text-[#0F172A]">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Project</span>
                    <span>{selectedNeg.scope}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Scope Value</span>
                    <span>₦500,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Client Type</span>
                    <span>SME</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Relationship</span>
                    <span>New Client</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Stage</span>
                    <span className="text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase">Negotiating</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Timeline</span>
                    <span>4 weeks</span>
                  </div>
                </div>
              </div>

              {/* Kova Tips card */}
              <div className="bg-[#EFF6FF] border border-blue-100 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-xs">
                  <Brain size={16} />
                  <span>Kova Tips</span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed font-semibold">
                  Clients often push back on price. Focus on value, outcomes and ROI. Avoid justifying your rate.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ----------------- KOVA OPTIONS HUB VIEW ----------------- */}
      {view === "options_hub" && selectedNeg && (
        <div className="max-w-3xl mx-auto space-y-8 py-4 animate-fade-in">
          <button onClick={() => setView("chat")} className="flex items-center gap-2 text-text-secondary hover:text-[#0F172A] transition-colors text-sm font-bold">
            <ArrowLeft size={16} /> Back to Chat
          </button>

          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto shadow-sm">
              <Brain size={24} />
            </div>
            <h2 className="text-xl font-bold text-[#0F172A] font-display">Kova AI Advisor</h2>
            <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed font-semibold">
              I understand the budget is a concern. Here are some ways you can respond. Choose one to get started.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-left">
            {[
              { id: "draft_response", icon: PenTool, title: "Draft Response", desc: "Get a ready-to-send response customized for your client.", color: "text-[#2563EB]", bg: "bg-blue-50" },
              { id: "counter_offer", icon: Search, title: "Counter Offer", desc: "Offer alternative pricing, phases or scope reductions.", color: "text-emerald-600", bg: "bg-green-50" },
              { id: "value_justification", icon: Brain, title: "Value Justification", desc: "Reinforce the value, benefits, and ROI of your work.", color: "text-amber-600", bg: "bg-amber-50" },
              { id: "practice_mode", icon: Users, title: "Practice Mode", desc: "Role-play this conversation with Kova acting as the client.", color: "text-purple-600", bg: "bg-purple-50" }
            ].map((opt) => (
              <button 
                key={opt.id}
                onClick={() => {
                  if (opt.id === "practice_mode") { 
                    setPracticeHistory([{ role: "kova", content: objectionText }]); 
                    setView("practice_mode"); 
                  } else {
                    loadAiResponse(opt.id);
                  }
                }}
                className="bg-white border border-[#E5EAF2] rounded-2xl p-6 text-left hover:shadow-md transition-shadow group flex items-start gap-4 shadow-sm"
              >
                <div className={`w-10 h-10 rounded-xl ${opt.bg} ${opt.color} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                  <opt.icon size={20} />
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-sm text-[#0F172A] block group-hover:text-primary transition-colors font-display">{opt.title}</span>
                  <p className="text-xs text-text-secondary leading-relaxed font-semibold">{opt.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ----------------- DRAFT RESPONSE VIEW ----------------- */}
      {view === "draft_response" && selectedNeg && (
        <div className="space-y-6 max-w-5xl mx-auto animate-fade-in text-left">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-[#E5EAF2] pb-4">
            <button onClick={() => setView("options_hub")} className="flex items-center gap-2 text-text-secondary hover:text-[#0F172A] transition-colors text-sm font-bold">
              <ArrowLeft size={16} /> Back to Options
            </button>
            <span className="text-xs font-bold text-text-secondary uppercase">Draft Response</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Draft column */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Draft Box */}
              <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b border-[#E5EAF2] pb-4">
                  <div>
                    <h3 className="font-bold text-[#0F172A] text-sm font-display">Kova's Suggested Response</h3>
                    <p className="text-[10px] text-text-secondary mt-0.5 font-semibold">Use this response or edit it before sending.</p>
                  </div>
                  <div className="flex gap-2">
                    <select 
                      value={tone}
                      onChange={(e) => setTone(e.target.value)}
                      className="bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] px-2 py-1 rounded-lg text-[10px] font-bold outline-none cursor-pointer"
                    >
                      <option>Tone: Professional</option>
                      <option>Tone: Casual</option>
                      <option>Tone: Persuasive</option>
                    </select>
                    <button className="bg-white border border-[#E5EAF2] p-1.5 rounded-lg text-text-dark hover:bg-slate-50 transition-colors"><RefreshCw size={12} /></button>
                  </div>
                </div>

                {/* Response text body */}
                <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-2xl p-6 text-xs font-semibold text-[#0F172A] leading-relaxed space-y-4 min-h-[150px] flex flex-col justify-center">
                  {isAiLoading ? (
                    <div className="flex flex-col items-center justify-center space-y-2 py-8 text-primary">
                      <Loader2 className="w-8 h-8 animate-spin" />
                      <span className="text-text-secondary text-xs">Consulting Kova AI...</span>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap">{aiResponseText || "No response generated yet."}</div>
                  )}
                </div>

                {/* Explanation notes */}
                <div className="space-y-3 pt-2">
                  <span className="block text-[10px] font-bold text-text-secondary uppercase">Why this works:</span>
                  <ul className="text-xs font-semibold text-text-secondary space-y-2 list-disc pl-4">
                    <li><span className="text-[#0F172A] font-bold">Acknowledges concern:</span> Validating their budget constraint builds empathy.</li>
                    <li><span className="text-[#0F172A] font-bold">Reinforces value:</span> Reminds them of the business goal without arguing.</li>
                    <li><span className="text-[#0F172A] font-bold">Opens door for options:</span> Steers the convo to a scope adjustment instead of giving a discount.</li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-3 border-t border-[#E5EAF2] pt-6">
                  <button 
                    onClick={() => { navigator.clipboard.writeText(aiResponseText); alert("Copied suggested response!"); }}
                    className="bg-white hover:bg-slate-50 border border-[#E5EAF2] text-[#0F172A] px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Copy size={14} /> Copy
                  </button>
                  <button className="bg-white hover:bg-slate-50 border border-[#E5EAF2] text-[#0F172A] px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm">
                    Edit Response
                  </button>
                  <button 
                    onClick={handleResolveNegotiation}
                    className="flex-grow bg-primary hover:bg-primary-hover text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-blue text-center"
                  >
                    Send Response
                  </button>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4">
                <span className="block text-xs font-bold text-text-secondary uppercase border-b border-[#E5EAF2] pb-2 font-display">Conversation Goal</span>
                <p className="text-xs text-text-secondary leading-relaxed font-semibold">
                  Find a solution that fits the client's budget without devaluing your work.
                </p>
              </div>
              
              <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4">
                <span className="block text-xs font-bold text-text-secondary uppercase border-b border-[#E5EAF2] pb-2 font-display">Context</span>
                <div className="space-y-2 text-xs font-semibold text-text-secondary">
                  <p>Client: <span className="text-[#0F172A] font-bold">Acme Corp</span></p>
                  <p>Project: <span className="text-[#0F172A] font-bold">{selectedNeg.scope}</span></p>
                  <p>Original Value: <span className="text-[#0F172A] font-bold">₦500,000</span></p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ----------------- PRACTICE ROLEPLAY MODE VIEW ----------------- */}
      {view === "practice_mode" && selectedNeg && (
        <div className="space-y-6 max-w-5xl mx-auto animate-fade-in text-left">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-[#E5EAF2] pb-4">
            <button onClick={() => setView("options_hub")} className="flex items-center gap-2 text-text-secondary hover:text-[#0F172A] transition-colors text-sm font-bold">
              <ArrowLeft size={16} /> Back to Options
            </button>
            <button 
              onClick={handleResolveNegotiation}
              className="text-danger hover:text-red-700 text-xs font-bold transition-all"
            >
              End Practice
            </button>
          </div>

          <div className="flex justify-between items-center bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-[#0F172A] font-display">Practice Mode</h2>
              <p className="text-xs text-text-secondary mt-1 font-semibold">Role-play the conversation with Kova and improve your negotiation skills.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Roleplay Chat box */}
            <div className="lg:col-span-2 bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[450px]">
              
              <div className="space-y-4 flex-grow overflow-y-auto mb-6">
                <span className="block text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">Practice Session</span>
                
                {practiceHistory.map((msg, i) => (
                  <div key={i} className={`flex gap-3 items-start ${msg.role === "user" ? "justify-end" : ""}`}>
                    {msg.role === "kova" && (
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs flex-shrink-0 font-display">K</div>
                    )}
                    <div className={`p-4 rounded-2xl text-xs font-semibold leading-relaxed max-w-md ${
                      msg.role === "user" 
                        ? "bg-primary text-white" 
                        : "bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A]"
                    }`}>
                      {msg.role === "kova" && <p className="text-[9px] uppercase font-bold text-purple-600 mb-1">Kova (Client)</p>}
                      {msg.content}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs flex-shrink-0 font-display">You</div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs flex-shrink-0 animate-pulse font-display">K</div>
                    <div className="bg-[#F8FAFC] border border-[#E5EAF2] rounded-2xl px-4 py-3 text-xs text-text-secondary flex gap-1 items-center">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="border-t border-[#E5EAF2] pt-4 flex gap-2">
                <input 
                  type="text" 
                  value={practiceInput}
                  onChange={(e) => setPracticeInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendPracticeReply()}
                  placeholder="Type your response here..."
                  className="flex-grow bg-[#F8FAFC] border border-[#E5EAF2] text-[#0F172A] text-xs rounded-xl px-4 py-3 outline-none font-semibold focus:border-primary transition-colors"
                />
                <button 
                  onClick={handleSendPracticeReply}
                  className="bg-primary hover:bg-primary-hover text-white px-5 py-3 rounded-xl text-xs font-bold shadow-blue transition-colors flex items-center gap-1.5"
                >
                  Send Response
                </button>
              </div>

            </div>

            {/* Right tips card */}
            <div className="space-y-6">
              <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4">
                <span className="block text-xs font-bold text-text-secondary uppercase border-b border-[#E5EAF2] pb-2 font-display">Practice Tips</span>
                
                {[
                  { title: "Stay Calm", desc: "Don't take it personally. Stay professional." },
                  { title: "Focus on Value", desc: "Talk about outcomes, not just deliverables." },
                  { title: "Offer Options", desc: "Provide alternatives, not discounts." }
                ].map((tip, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="font-bold text-xs text-[#0F172A] block font-display">{tip.title}</span>
                    <p className="text-[11px] text-text-secondary leading-relaxed font-semibold">{tip.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ----------------- RESOLVED SUMMARY VIEW ----------------- */}
      {view === "resolved" && selectedNeg && (
        <div className="space-y-6 max-w-5xl mx-auto animate-fade-in text-left">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-[#E5EAF2] pb-4">
            <button onClick={() => setView("list")} className="flex items-center gap-2 text-text-secondary hover:text-[#0F172A] transition-colors text-sm font-bold">
              <ArrowLeft size={16} /> Back to Conversations
            </button>
            <span className="text-xs font-bold text-text-secondary uppercase">Resolved Outcome</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Main details column */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Green outcome banner card */}
              <div className="bg-green-50 border border-green-100 rounded-2xl p-6 shadow-sm text-xs space-y-3 font-semibold text-[#0F172A]">
                <span className="block text-[10px] bg-green-200 text-[#10B981] font-bold px-2 py-0.5 rounded-full uppercase w-fit">Outcome</span>
                <h3 className="text-sm font-bold text-[#0F172A] font-display mt-2">Client accepted the proposal at ₦500,000</h3>
                <p className="text-text-secondary leading-relaxed mt-1 font-semibold">
                  Great job! You successfully resolved the price objection by offering phased scoping options.
                </p>
              </div>

              {/* Kova feedback takeaways */}
              <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-purple-600 font-bold text-xs mb-2">
                  <Brain size={16} />
                  <span>Kova Analysis</span>
                </div>
                <p className="text-xs font-bold text-[#0F172A]">Excellent! You handled that well.</p>
                
                <div className="space-y-3 pt-2">
                  <span className="block text-[10px] font-bold text-text-secondary uppercase">Key takeaways:</span>
                  {[
                    "You acknowledged their concern",
                    "You reinforced value",
                    "You offered options",
                    "You maintained your rate"
                  ].map((takeaway, idx) => (
                    <div key={idx} className="flex gap-2.5 items-center text-xs font-semibold text-[#0F172A]">
                      <div className="w-5 h-5 rounded-full bg-green-50 text-[#10B981] border border-green-100 flex items-center justify-center"><Check size={12} /></div>
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E5EAF2] pt-6 mt-6 flex justify-between items-center text-xs font-bold text-text-secondary">
                  <span>How was this conversation?</span>
                  <div className="flex gap-2">
                    <button className="bg-[#F8FAFC] border border-[#E5EAF2] hover:bg-slate-50 p-2 rounded-lg text-[#0F172A] transition-colors">👍</button>
                    <button className="bg-[#F8FAFC] border border-[#E5EAF2] hover:bg-slate-50 p-2 rounded-lg text-[#0F172A] transition-colors">👎</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              
              {/* Context Summary card */}
              <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-4">
                <span className="block text-xs font-bold text-text-secondary uppercase border-b border-[#E5EAF2] pb-2 font-display">Context Summary</span>
                <div className="space-y-3 text-xs font-semibold text-[#0F172A]">
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Project</span>
                    <span>{selectedNeg.scope}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Scope Value</span>
                    <span>₦500,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Client Type</span>
                    <span>SME</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Relationship</span>
                    <span>New Client</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Stage</span>
                    <span className="text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md text-[10px] uppercase">Negotiation Won</span>
                  </div>
                </div>
              </div>

              {/* Analytics card */}
              <div className="bg-white border border-[#E5EAF2] rounded-2xl p-6 shadow-sm space-y-3">
                <span className="block text-xs font-bold text-text-secondary uppercase border-b border-[#E5EAF2] pb-2 font-display">Conversation Analytics</span>
                <div className="space-y-2.5 text-xs font-semibold text-[#0F172A]">
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Duration</span>
                    <span>10 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Messages</span>
                    <span>6</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary font-display">Outcome</span>
                    <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full text-[10px] font-bold">Won</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setView("list")}
                  className="w-full bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2.5 rounded-xl transition-colors shadow-blue mt-4"
                >
                  Start a New Conversation
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}