"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, Brain, Search, PenTool, Users } from "lucide-react";
import { supabaseAuth } from "@/lib/auth";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const modes = [
  {
    id: "coach",
    icon: Brain,
    title: "Strategy Coach",
    description: "Get tactics & talking points",
  },
  {
    id: "analyze",
    icon: Search,
    title: "Analyze Offer",
    description: "Paste an offer, get counters",
  },
  {
    id: "draft",
    icon: PenTool,
    title: "Draft Message",
    description: "Craft negotiation emails",
  },
  {
    id: "roleplay",
    icon: Users,
    title: "Roleplay Practice",
    description: "Spar with the other side",
  },
];

const contexts = [
  "Job Offer",
  "Freelance Project",
  "Raise/Promotion",
  "Contract Renewal",
];

const modeExamples = {
  coach: "I have a freelance offer for ₦150k but I was expecting ₦250k. What's my strategy?",
  analyze: "Paste your offer details: rate, deliverables, timeline, payment terms...",
  draft: "Help me write an email countering a ₦50k/project rate with ₦120k",
  roleplay: "Hi, I'm here to discuss the rate for this project...",
};

export default function NegotiatePage() {
  const router = useRouter();
  const [currentMode, setCurrentMode] = useState("coach");
  const [currentContext, setCurrentContext] = useState("Freelance Project");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderMessage = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];
    let listType: 'numbered' | 'bullet' | null = null;
    let keyIndex = 0;

    const flushList = () => {
      if (currentList.length > 0) {
        if (listType === 'numbered') {
          elements.push(
            <ol key={keyIndex++} className="list-decimal list-inside space-y-1 my-3">
              {currentList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ol>
          );
        } else {
          elements.push(
            <ul key={keyIndex++} className="list-disc list-inside space-y-1 my-3">
              {currentList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          );
        }
        currentList = [];
        listType = null;
      }
    };

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      
      // Empty line
      if (!trimmedLine) {
        flushList();
        elements.push(<br key={keyIndex++} />);
        return;
      }

      // Emoji section headers
      if (trimmedLine.match(/^[📊⚠️💡🎯]/)) {
        flushList();
        elements.push(
          <h3 key={keyIndex++} className="font-semibold text-[#B8860B] mt-4 mb-2">
            {trimmedLine}
          </h3>
        );
        return;
      }

      // Numbered list items
      const numberedMatch = trimmedLine.match(/^\d+\.\s+(.+)/);
      if (numberedMatch) {
        if (listType !== 'numbered') {
          flushList();
          listType = 'numbered';
        }
        currentList.push(numberedMatch[1].replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'));
        return;
      }

      // Bullet list items
      const bulletMatch = trimmedLine.match(/^[-•]\s+(.+)/);
      if (bulletMatch) {
        if (listType !== 'bullet') {
          flushList();
          listType = 'bullet';
        }
        currentList.push(bulletMatch[1].replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'));
        return;
      }

      // Regular paragraph with bold text
      flushList();
      const processedLine = trimmedLine.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      elements.push(
        <p key={keyIndex++} className="my-2" dangerouslySetInnerHTML={{ __html: processedLine }} />
      );
    });

    flushList();
    return elements;
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabaseAuth.auth.getUser();
      if (user) {
        router.push("/dashboard/negotiate");
      }
    };
    checkUser();
    scrollToBottom();
  }, [router]);

  const handleModeChange = (modeId: string) => {
    setCurrentMode(modeId);
    setMessages([]);
    setStarted(false);
    setInput("");
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setStarted(true);

    try {
      const response = await fetch("/api/negotiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          mode: currentMode,
          context: currentContext,
        }),
      });

      const data = await response.json();
      
      if (data.message) {
        const assistantMessage: Message = { role: "assistant", content: data.message };
        setMessages([...newMessages, assistantMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const currentModeData = modes.find(m => m.id === currentMode);

  return (
    <div className="min-h-screen bg-[#0B1D35] text-white">
      <div className="px-6 py-6 md:py-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Pricis
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Negotiation Assistant
          </h1>
          <p className="text-white/70 text-lg">
            Know your worth. Say it with confidence.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {modes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleModeChange(mode.id)}
              className={`rounded-xl border p-4 text-left transition-all ${
                currentMode === mode.id
                  ? "border-2 border-[#B8860B] bg-[#B8860B]/10"
                  : "border-white/10 bg-white/5 hover:border-white/25"
              }`}
            >
              <mode.icon className="h-6 w-6 text-[#B8860B] mb-3" />
              <h3 className="font-semibold mb-1">{mode.title}</h3>
              <p className="text-sm text-white/60">{mode.description}</p>
            </button>
          ))}
        </div>

        {/* Context Selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {contexts.map((context) => (
            <button
              key={context}
              onClick={() => setCurrentContext(context)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentContext === context
                  ? "bg-[#B8860B] text-[#0B1D35]"
                  : "border border-white/20 text-white hover:border-white/40"
              }`}
            >
              {context}
            </button>
          ))}
        </div>

        {/* Chat Area */}
        <div className="rounded-2xl border border-white/10 bg-[#0F2440] overflow-hidden">
          <div className="h-[500px] flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6">
              {!started && messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  {currentModeData && (
                    <>
                      <currentModeData.icon className="h-16 w-16 text-[#B8860B] mb-4" />
                      <h3 className="text-xl font-semibold mb-2">
                        {currentModeData.title}
                      </h3>
                      <p className="text-white/60 mb-6">
                        {currentModeData.description}
                      </p>
                      <div className="bg-white/5 rounded-lg p-4 max-w-md">
                        <p className="text-sm text-white/50 mb-2">Try something like:</p>
                        <p className="text-sm text-white/70 italic">
                          {modeExamples[currentMode as keyof typeof modeExamples]}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.role === "user"
                            ? "bg-[#B8860B] text-[#0B1D35]"
                            : "bg-white/5 text-white"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">🤝</span>
                            <span className="text-sm text-white/60">Assistant</span>
                          </div>
                        )}
                        {message.role === "user" ? (
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        ) : (
                          <div className="space-y-1">
                            {renderMessage(message.content)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🤝</span>
                          <span className="text-sm text-white/60">Assistant</span>
                        </div>
                        <div className="flex gap-1 mt-2">
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

            {/* Input Area */}
            <div className="border-t border-white/10 p-4">
              <div className="flex gap-3">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    started
                      ? "Continue the conversation..."
                      : "Type your message here..."
                  }
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
              <p className="text-xs text-white/40 mt-2">
                Press Enter to send · Shift+Enter for new line
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Tips */}
        <div className="flex flex-wrap gap-2 mt-6">
          {[
            "Be specific with numbers",
            "Share your market research",
            "Mention competing offers",
            "Know your walk-away point",
          ].map((tip) => (
            <div
              key={tip}
              className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/60 border border-white/10"
            >
              💡 {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
