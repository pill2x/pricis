"use client";

import { useState } from "react";
import { Mail, Check, ArrowRight, Loader2, Sparkles, CheckCircle2 } from "lucide-react";
import { joinWaitlist } from "@/app/actions/db";

interface WaitlistFormProps {
  onSuccess?: (email: string, totalCount?: number) => void;
  compact?: boolean;
}

export default function WaitlistForm({ onSuccess, compact = false }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Freelancer");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
    alreadySubscribed?: boolean;
    count?: number;
  }>({
    type: "idle",
    message: "",
  });

  const roles = [
    { id: "Freelancer", label: "Freelancer / Solo" },
    { id: "Agency", label: "Agency / Studio" },
    { id: "Business", label: "Business Owner" },
    { id: "Creator", label: "Creator / Consultant" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus({ type: "error", message: "Please enter a valid work email address." });
      return;
    }

    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const brevoRes = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const brevoData = await brevoRes.json();

      const res = await joinWaitlist(email, role);

      if (brevoRes.ok || res.success) {
        setStatus({
          type: "success",
          message: res.message || "Welcome to the Pricis wait-list!",
          alreadySubscribed: res.alreadySubscribed,
          count: res.count,
        });
        if (onSuccess) onSuccess(email, res.count);
      } else {
        setStatus({ type: "error", message: brevoData.error || "Something went wrong. Please try again." });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (status.type === "success") {
    return (
      <div className="w-full max-w-xl mx-auto rounded-3xl p-8 shadow-xl border border-blue-100 text-slate-900 bg-white text-center animate-fade-in-up transition-colors">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-200">
          <CheckCircle2 size={36} className="text-blue-600 animate-bounce-short" />
        </div>
        <h3 className="text-2xl font-bold font-display mb-2 text-slate-900">
          {status.alreadySubscribed ? "You're Already On The List!" : "Your Spot Is Secured! 🎉"}
        </h3>
        <p className="font-body text-base mb-6 leading-relaxed text-slate-600">
          {status.message}
        </p>

        <div className="border border-slate-200 rounded-2xl p-4 mb-6 text-left bg-slate-50">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 font-body uppercase tracking-wider mb-1">
            <Sparkles size={14} /> VIP Perks Unlocked
          </div>
          <ul className="text-xs font-body space-y-2 mt-2 text-slate-700">
            <li className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> Priority access 48 hours before public launch</li>
            <li className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> Special launch pricing & exclusive bonuses</li>
            <li className="flex items-center gap-2"><Check size={14} className="text-blue-600" /> Direct invitation to private beta user group</li>
          </ul>
        </div>

        <button
          onClick={() => setStatus({ type: "idle", message: "" })}
          className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors font-body underline"
        >
          Register another email address
        </button>
      </div>
    );
  }

  return (
    <div id="hero-waitlist-form" className={`w-full ${compact ? "max-w-md" : "max-w-2xl"} mx-auto rounded-3xl p-6 sm:p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)] border border-slate-200/80 text-slate-900 bg-white text-left relative z-20 transition-colors`}>
      {!compact && (
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight mb-1.5 text-slate-900">
            Join the wait-list
          </h2>
          <p className="font-body text-sm sm:text-base text-slate-500">
            Be the first to experience Pricis when we launch.
          </p>
        </div>
      )}

      {/* Role Selection Pills */}
      {!compact && (
        <div className="mb-5">
          <label className="block text-xs font-bold font-body uppercase tracking-wider mb-2 text-center sm:text-left text-slate-400">
            Select your role:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold font-body transition-all text-center border ${
                  role === r.id
                    ? "bg-[#2563EB] text-white border-[#2563EB] shadow-sm"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Email Input Box matching hero mockup */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch gap-2.5 p-1.5 border border-slate-200 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 shadow-sm bg-white rounded-2xl transition-all">
          <div className="flex items-center gap-3 px-3 py-2 flex-1">
            <Mail size={20} className="text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your work email"
              className="w-full bg-transparent font-body text-sm sm:text-base focus:outline-none text-slate-900 placeholder-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-7 py-3 sm:py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 disabled:opacity-75 flex-shrink-0 font-body text-sm sm:text-base"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Joining...</span>
              </>
            ) : (
              <>
                <span>Join Waitlist</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>

        {status.type === "error" && (
          <p className="text-red-500 text-xs font-semibold font-body text-center mt-2">
            {status.message}
          </p>
        )}
      </form>

      {/* Checkmarks Footer matching hero mockup */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium font-body select-none text-slate-600">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-[#2563EB] text-white flex items-center justify-center flex-shrink-0">
            <Check size={10} strokeWidth={3} />
          </div>
          <span>No spam</span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-[#2563EB] text-white flex items-center justify-center flex-shrink-0">
            <Check size={10} strokeWidth={3} />
          </div>
          <span>Early access</span>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-[#2563EB] text-white flex items-center justify-center flex-shrink-0">
            <Check size={10} strokeWidth={3} />
          </div>
          <span>Exclusive launch offers</span>
        </div>
      </div>
    </div>
  );
}
