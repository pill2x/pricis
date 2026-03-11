"use client";

import React, { useState, useEffect, useRef } from "react";
import { Brain, Search, PenTool, Users, Send, Plus, X, MessageSquare, SendHorizontal, ChevronLeft, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  mode: string;
  context: string;
  created_at: string;
}

const modes = [
  { id: "coach", icon: Brain, title: "Strategy Coach", description: "Get tactics & talking points" },
  { id: "analyze", icon: Search, title: "Analyze Offer", description: "Paste an offer, get counters" },
  { id: "draft", icon: PenTool, title: "Draft Message", description: "Craft negotiation emails" },
  { id: "roleplay", icon: Users, title: "Roleplay Practice", description: "Spar with other side" },
];

const contexts = ["Job Offer", "Freelance Project", "Raise/Promotion", "Contract Renewal"];

export default function DashboardNegotiatePage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMode, setCurrentMode] = useState("coach");
  const [currentContext, setCurrentContext] = useState("Freelance Project");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentNegotiationId, setCurrentNegotiationId] = useState<string | null>(null);
  const [deletingConversation, setDeletingConversation] = useState<string | null>(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userNameRef = useRef<string>("there");

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchConversations = async () => {
    const { data, error } = await supabase
      .from("negotiations")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setConversations(data || []);
  };

  const fetchMessages = async (negotiationId: string): Promise<Message[]> => {
    const { data, error } = await supabase
      .from("negotiation_messages")
      .select("*")
      .eq("negotiation_id", negotiationId)
      .order("created_at", { ascending: true });
    if (error) return [];
    return data?.map(m => ({ role: m.role as "user" | "assistant", content: m.content })) || [];
  };

  const selectConversation = async (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setCurrentMode(conversation.mode);
    setCurrentContext(conversation.context);
    setCurrentNegotiationId(conversation.id);
    setStarted(false);
    setMessages([]);
    const msgs = await fetchMessages(conversation.id);
    setMessages(msgs);
    setStarted(true);
    setShowMobileSidebar(false);
  };

  const startNewConversation = () => {
    setSelectedConversation(null);
    setMessages([]);
    setCurrentNegotiationId(null);
    setStarted(false);
    setInput("");
    setShowMobileSidebar(false);
  };

  const deleteConversation = async (conversationId: string) => {
    const { error } = await supabase
      .from("negotiations")
      .delete()
      .eq("id", conversationId);
    if (error) { console.error("Delete error:", error.message); return; }
    setConversations(prev => prev.filter(c => c.id !== conversationId));
    if (selectedConversation?.id === conversationId) startNewConversation();
    setDeletingConversation(null);
  };

  const renderMessage = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];
    let listType: 'numbered' | 'bullet' | null = null;
    let keyIndex = 0;

    const flushList = () => {
      if (currentList.length === 0) return;
      if (listType === 'numbered') {
        elements.push(
          <ol key={keyIndex++} className="list-decimal list-inside space-y-1 my-3">
            {currentList.map((item, idx) => <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />)}
          </ol>
        );
      } else {
        elements.push(
          <ul key={keyIndex++} className="list-disc list-inside space-y-1 my-3">
            {currentList.map((item, idx) => <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />)}
          </ul>
        );
      }
      currentList = [];
      listType = null;
    };

    lines.forEach((line) => {
      const t = line.trim();
      if (!t) { flushList(); elements.push(<br key={keyIndex++} />); return; }
      if (t.match(/^[📊⚠️💡🎯]/)) {
        flushList();
        elements.push(<h3 key={keyIndex++} className="font-semibold mt-4 mb-2" style={{ color: '#B8860B' }}>{t}</h3>);
        return;
      }
      const numbered = t.match(/^\d+\.\s+(.+)/);
      if (numbered) {
        if (listType !== 'numbered') flushList();
        listType = 'numbered';
        currentList.push(numbered[1].replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'));
        return;
      }
      const bullet = t.match(/^[-•]\s+(.+)/);
      if (bullet) {
        if (listType !== 'bullet') flushList();
        listType = 'bullet';
        currentList.push(bullet[1].replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'));
        return;
      }
      flushList();
      elements.push(<p key={keyIndex++} className="my-2" dangerouslySetInnerHTML={{ __html: t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }} />);
    });

    flushList();
    return elements;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userContent = input.trim();
    const userMessage: Message = { role: "user", content: userContent };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setStarted(true);

    try {
      let negotiationId = currentNegotiationId;

      // Fetch user once at top
      const { data: { user: currentUser } } = await supabase.auth.getUser();

      // Only fetch name once per session
      if (userNameRef.current === "there" && currentUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", currentUser.id)
          .single();
        if (profile?.full_name) {
          userNameRef.current = profile.full_name.split(" ")[0];
        }
      }
      const userName = userNameRef.current;

      if (!negotiationId) {
        if (!currentUser) return;

        const { data: negotiation, error: negError } = await supabase
          .from("negotiations")
          .insert({
            title: userContent.substring(0, 40),
            mode: currentMode,
            context: currentContext,
            user_id: currentUser.id,
          })
          .select()
          .single();

        if (negError) { console.error("Negotiation create error:", negError.message); return; }

        negotiationId = negotiation.id;
        setCurrentNegotiationId(negotiationId);
        setSelectedConversation(negotiation);
        setConversations(prev => [negotiation, ...prev]);
      }

      // Save user message
      await supabase.from("negotiation_messages").insert({
        negotiation_id: negotiationId,
        role: "user",
        content: userContent,
      });

      // Get AI response
      const response = await fetch("/api/negotiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, mode: currentMode, context: currentContext, userName }),
      });

      const data = await response.json();

      if (data.message) {
        await supabase.from("negotiation_messages").insert({
          negotiation_id: negotiationId,
          role: "assistant",
          content: data.message,
        });

        setMessages([...newMessages, { role: "assistant", content: data.message }]);
      }
    } catch (error) {
      console.error("Send error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const getModeTitle = () => {
    const mode = modes.find(m => m.id === currentMode);
    return mode?.title || 'New Negotiation';
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      `}</style>
      
      <div className="h-screen overflow-hidden flex flex-col" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#060D18' }}>
        
        {/* Top Bar */}
        <div 
          className="flex-shrink-0 px-4 flex items-center justify-between"
          style={{ 
            height: '56px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            backgroundColor: 'rgba(6,13,24,0.9)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <button
            onClick={() => setShowMobileSidebar(true)}
            className="lg:hidden flex items-center gap-2 text-sm"
            style={{ color: '#94A3B8' }}
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
          
          <div className="hidden lg:block" />
          
          <div className="font-semibold text-sm" style={{ color: '#F1F5F9' }}>
            Negotiation Assistant
          </div>
          
          <div />
        </div>

        {/* Main Area */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Panel - Conversation History */}
          <div 
            className={`${showMobileSidebar ? 'block' : 'hidden'} lg:block lg:flex-shrink-0 flex flex-col`}
            style={{ width: '288px', backgroundColor: '#060D18', borderRight: '1px solid rgba(255,255,255,0.06)' }}
          >
            {/* Panel Header */}
            <div 
              className="flex-shrink-0 px-4 py-4 flex items-center justify-between"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#94A3B8' }}>
                Conversations
              </div>
              <button
                onClick={startNewConversation}
                className="flex items-center gap-1 font-semibold rounded-lg transition-colors"
                style={{
                  backgroundColor: 'rgba(37,99,235,0.12)',
                  border: '1px solid rgba(37,99,235,0.2)',
                  color: '#2563EB',
                  fontSize: '12px',
                  padding: '6px 12px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(37,99,235,0.18)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(37,99,235,0.12)'}
              >
                <Plus className="h-3 w-3" />
                New
              </button>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto" style={{ padding: '8px' }}>
              {conversations.length === 0 ? (
                <div className="text-center" style={{ padding: '32px 12px' }}>
                  <MessageSquare className="h-8 w-8 mx-auto mb-3" style={{ color: '#475569' }} />
                  <div className="text-xs" style={{ color: '#475569' }}>
                    No conversations yet
                  </div>
                </div>
              ) : (
                <div>
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className="rounded-xl cursor-pointer transition-all mb-1 relative group"
                      style={{
                        padding: '12px',
                        backgroundColor: selectedConversation?.id === conversation.id ? 'rgba(37,99,235,0.08)' : 'transparent',
                        border: selectedConversation?.id === conversation.id ? '1px solid rgba(37,99,235,0.15)' : 'transparent'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedConversation?.id !== conversation.id) {
                          e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedConversation?.id !== conversation.id) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      {/* Delete button */}
                      <button
                        onClick={() => setDeletingConversation(conversation.id)}
                        className="p-1.5 rounded-lg transition-all"
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
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

                      <div className="flex items-start justify-between">
                        <button
                          onClick={() => selectConversation(conversation)}
                          className="flex-1 text-left min-w-0"
                        >
                          <div className="text-sm font-medium line-clamp-1" style={{ color: '#F1F5F9' }}>
                            {conversation.title}
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <div className="text-xs" style={{ color: '#475569' }}>
                              {conversation.context}
                            </div>
                            <div className="text-xs" style={{ color: '#475569' }}>
                              {new Date(conversation.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </button>
                      </div>
                      
                      {deletingConversation === conversation.id && (
                        <div 
                          className="flex gap-2 mt-2 pt-2"
                          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                        >
                          <span className="text-xs" style={{ color: '#EF4444' }}>Delete?</span>
                          <button
                            onClick={() => deleteConversation(conversation.id)}
                            className="text-xs px-2 py-1 rounded-md"
                            style={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#EF4444' }}
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setDeletingConversation(null)}
                            className="text-xs px-2 py-1 rounded-md"
                            style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: '#94A3B8' }}
                          >
                            No
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Chat Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Chat Header */}
            <div 
              className="flex-shrink-0 px-6 py-4"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', backgroundColor: 'rgba(6,13,24,0.5)' }}
            >
              <div className="font-semibold" style={{ color: '#F1F5F9' }}>
                {selectedConversation ? selectedConversation.title : getModeTitle()}
              </div>
              {selectedConversation && (
                <div 
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs ml-2"
                  style={{
                    backgroundColor: 'rgba(37,99,235,0.1)',
                    border: '1px solid rgba(37,99,235,0.2)',
                    color: '#2563EB'
                  }}
                >
                  {selectedConversation.mode}
                </div>
              )}
            </div>

            {/* Mode Selector (show when starting new conversation) */}
            {!selectedConversation && (
              <div 
                className="flex-shrink-0 px-6 py-3 flex gap-2 overflow-x-auto"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                {modes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setCurrentMode(mode.id)}
                    className="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer"
                    style={{
                      backgroundColor: currentMode === mode.id ? 'rgba(37,99,235,0.12)' : 'rgba(255,255,255,0.04)',
                      border: currentMode === mode.id ? '1px solid rgba(37,99,235,0.25)' : 'transparent',
                      color: currentMode === mode.id ? '#2563EB' : '#94A3B8'
                    }}
                    onMouseEnter={(e) => {
                      if (currentMode !== mode.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (currentMode !== mode.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                      }
                    }}
                  >
                    {mode.title}
                  </button>
                ))}
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto" style={{ padding: '24px' }}>
              <div className="space-y-4">
                {!started && messages.length === 0 ? (
                  <div className="text-center" style={{ paddingTop: '48px' }}>
                    <div 
                      className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4"
                      style={{
                        backgroundColor: 'rgba(37,99,235,0.1)',
                        border: '1px solid rgba(37,99,235,0.2)'
                      }}
                    >
                      <MessageSquare className="h-6 w-6" style={{ color: '#2563EB' }} />
                    </div>
                    <div 
                      className="text-xl font-bold mt-4 mb-2"
                      style={{ color: '#F1F5F9' }}
                    >
                      Ready to negotiate?
                    </div>
                    <div 
                      className="text-sm leading-relaxed"
                      style={{ color: '#94A3B8' }}
                    >
                      Describe your situation below and I'll help you hold your ground.
                    </div>
                    
                    {/* Context Input */}
                    <div className="text-left mt-6">
                      <div className="text-sm font-medium mb-2" style={{ color: '#94A3B8' }}>
                        Give me some context (optional)
                      </div>
                      <textarea
                        value={currentContext}
                        onChange={(e) => setCurrentContext(e.target.value)}
                        rows={3}
                        className="w-full rounded-xl transition-all resize-none"
                        style={{
                          backgroundColor: '#0A1525',
                          border: '1px solid rgba(255,255,255,0.08)',
                          padding: '12px 16px',
                          fontSize: '14px',
                          color: '#F1F5F9',
                          outline: 'none'
                        }}
                        placeholder="Client offered ₦80k, I quoted ₦150k for a website..."
                        onFocus={(e) => {
                          e.target.style.borderColor = 'rgba(37,99,235,0.5)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        {message.role === "assistant" && (
                          <div 
                            className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center mr-3"
                            style={{
                              backgroundColor: 'rgba(37,99,235,0.1)',
                              border: '1px solid rgba(37,99,235,0.15)'
                            }}
                          >
                            <span className="text-xs font-bold" style={{ color: '#2563EB' }}>P</span>
                          </div>
                        )}
                        <div 
                          className="max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                          style={{
                            backgroundColor: message.role === "user" ? '#2563EB' : '#0C1827',
                            border: message.role === "assistant" ? '1px solid rgba(255,255,255,0.08)' : 'transparent',
                            color: message.role === "user" ? 'white' : '#F1F5F9',
                            borderTopRightRadius: message.role === "user" ? '4px' : '16px',
                            borderTopLeftRadius: message.role === "assistant" ? '4px' : '16px'
                          }}
                        >
                          {message.role === "user" ? (
                            <div>{message.content}</div>
                          ) : (
                            <div className="space-y-1">{renderMessage(message.content)}</div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {loading && (
                      <div className="flex justify-start">
                        <div 
                          className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center mr-3"
                          style={{
                            backgroundColor: 'rgba(37,99,235,0.1)',
                            border: '1px solid rgba(37,99,235,0.15)'
                          }}
                        >
                          <span className="text-xs font-bold" style={{ color: '#2563EB' }}>P</span>
                        </div>
                        <div 
                          className="rounded-2xl px-4 py-3"
                          style={{
                            backgroundColor: '#0C1827',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderTopLeftRadius: '4px'
                          }}
                        >
                          <div className="flex gap-1 items-center py-1">
                            <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#475569', animationDelay: '0ms' }} />
                            <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#475569', animationDelay: '100ms' }} />
                            <div className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#475569', animationDelay: '200ms' }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div 
              className="flex-shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)', backgroundColor: '#060D18', padding: '16px' }}
            >
              <div className="flex items-end gap-3" style={{ maxWidth: '1024px', margin: '0 auto' }}>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={started ? "Continue the conversation..." : "Describe your situation..."}
                  rows={1}
                  className="flex-1 rounded-xl transition-all resize-none"
                  style={{
                    backgroundColor: '#0C1827',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '12px 16px',
                    fontSize: '14px',
                    color: '#F1F5F9',
                    minHeight: '48px',
                    maxHeight: '200px',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(37,99,235,0.5)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: input.trim() && !loading ? '#2563EB' : 'rgba(255,255,255,0.05)',
                    cursor: input.trim() && !loading ? 'pointer' : 'not-allowed'
                  }}
                  onMouseEnter={(e) => {
                    if (input.trim() && !loading) {
                      e.currentTarget.style.backgroundColor = '#1D4ED8';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (input.trim() && !loading) {
                      e.currentTarget.style.backgroundColor = '#2563EB';
                    }
                  }}
                >
                  <SendHorizontal className="h-4 w-4" style={{ color: input.trim() && !loading ? 'white' : '#475569' }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}