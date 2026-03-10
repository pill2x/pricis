"use client";

import React, { useState, useEffect, useRef } from "react";
import { Brain, Search, PenTool, Users, Send, Plus, X } from "lucide-react";
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
  { id: "roleplay", icon: Users, title: "Roleplay Practice", description: "Spar with the other side" },
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
  };

  const startNewConversation = () => {
    setSelectedConversation(null);
    setMessages([]);
    setCurrentNegotiationId(null);
    setStarted(false);
    setInput("");
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
        elements.push(<h3 key={keyIndex++} className="font-semibold text-[#B8860B] mt-4 mb-2">{t}</h3>);
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

      if (!negotiationId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: negotiation, error: negError } = await supabase
          .from("negotiations")
          .insert({
            title: userContent.substring(0, 40),
            mode: currentMode,
            context: currentContext,
            user_id: user.id,
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
        body: JSON.stringify({ messages: newMessages, mode: currentMode, context: currentContext }),
      });

      const data = await response.json();

      if (data.message) {
        // Save assistant message
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

  return (
    <div className="flex h-full">
      {/* Left Panel */}
      <div className="hidden lg:flex w-64 bg-[#080F1A] flex-col border-r border-white/10">
        <div className="p-4 border-b border-white/10">
          <h3 className="text-sm font-semibold text-white mb-3">Conversations</h3>
          <button
            onClick={startNewConversation}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#B8860B] text-[#0B1D35] font-medium rounded-lg hover:bg-[#c99414] transition-colors text-sm"
          >
            <Plus className="h-4 w-4" />
            New Conversation
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {conversations.length === 0 ? (
            <p className="text-center text-white/40 text-sm mt-6">No conversations yet</p>
          ) : (
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`group p-3 rounded-lg transition-colors ${
                    selectedConversation?.id === conversation.id
                      ? "bg-white/10 border-l-2 border-[#B8860B] pl-2"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <button
                      onClick={() => selectConversation(conversation)}
                      className="flex-1 text-left min-w-0"
                    >
                      <p className="text-sm text-white font-medium line-clamp-2 leading-snug">
                        {conversation.title}
                      </p>
                      <p className="text-xs text-white/40 mt-1">
                        {new Date(conversation.created_at).toLocaleDateString()}
                      </p>
                    </button>
                    {deletingConversation !== conversation.id && (
                      <button
                        onClick={() => setDeletingConversation(conversation.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10 flex-shrink-0"
                      >
                        <X className="h-3 w-3 text-white/50" />
                      </button>
                    )}
                  </div>
                  {deletingConversation === conversation.id && (
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/10">
                      <span className="text-xs text-white/50">Delete?</span>
                      <button
                        onClick={() => deleteConversation(conversation.id)}
                        className="text-xs text-green-400 hover:text-green-300 font-medium"
                      >
                        Yes
                      </button>
                      <span className="text-xs text-white/30">/</span>
                      <button
                        onClick={() => setDeletingConversation(null)}
                        className="text-xs text-red-400 hover:text-red-300 font-medium"
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

      {/* Right Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mode Selector */}
        <div className="p-4 border-b border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setCurrentMode(mode.id)}
                className={`rounded-xl border p-3 text-left transition-all ${
                  currentMode === mode.id
                    ? "border-2 border-[#B8860B] bg-[#B8860B]/10"
                    : "border-white/10 bg-white/5 hover:border-white/25"
                }`}
              >
                <mode.icon className="h-5 w-5 text-[#B8860B] mb-2" />
                <h4 className="font-semibold text-sm">{mode.title}</h4>
                <p className="text-xs text-white/60 mt-0.5">{mode.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Context Selector */}
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex flex-wrap gap-2">
            {contexts.map((context) => (
              <button
                key={context}
                onClick={() => setCurrentContext(context)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  currentContext === context
                    ? "bg-[#B8860B] text-[#0B1D35]"
                    : "border border-white/20 text-white hover:border-white/40"
                }`}
              >
                {context}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          {!started && messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              {React.createElement(modes.find(m => m.id === currentMode)!.icon, {
                className: "h-14 w-14 text-[#B8860B] mb-4"
              })}
              <h3 className="text-xl font-semibold text-white mb-2">
                {modes.find(m => m.id === currentMode)?.title}
              </h3>
              <p className="text-white/60 mb-6">
                {modes.find(m => m.id === currentMode)?.description}
              </p>
              <div className="bg-white/5 rounded-lg p-4 max-w-md">
                <p className="text-sm text-white/50 mb-2">Try something like:</p>
                <p className="text-sm text-white/70 italic">
                  I have a freelance offer for ₦150k but I was expecting ₦250k. What's my strategy?
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user" ? "bg-[#B8860B] text-[#0B1D35]" : "bg-white/5 text-white"
                  }`}>
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">🤝</span>
                        <span className="text-sm text-white/60">Assistant</span>
                      </div>
                    )}
                    {message.role === "user" ? (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    ) : (
                      <div className="space-y-1">{renderMessage(message.content)}</div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">🤝</span>
                      <span className="text-sm text-white/60">Assistant</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[#B8860B] rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-[#B8860B] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-[#B8860B] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-4">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={started ? "Continue the conversation..." : "Type your message here..."}
              rows={2}
              className="flex-1 rounded-lg border border-white/20 bg-[#0B1D35] text-white px-4 py-3 placeholder:text-white/40 focus:outline-none focus:border-[#B8860B] focus:border-2 resize-none"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="px-4 py-3 bg-[#B8860B] text-[#0B1D35] rounded-lg font-medium hover:bg-[#c99414] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="text-xs text-white/40 mt-2">Press Enter to send · Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  );
}