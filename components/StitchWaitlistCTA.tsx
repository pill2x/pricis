"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { joinWaitlist } from "@/app/actions/db";

interface StitchWaitlistCTAProps {
  onSuccess?: (email: string, totalCount?: number) => void;
}

export default function StitchWaitlistCTA({ onSuccess }: StitchWaitlistCTAProps) {
  const [email, setEmail] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus({ type: "error", message: "Please enter a valid work email address." });
      return;
    }

    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await joinWaitlist(email, "Freelancer");
      if (res.success) {
        setStatus({
          type: "success",
          message: res.message || "Welcome to the Pricis waitlist!",
          alreadySubscribed: res.alreadySubscribed,
          count: res.count,
        });
        if (onSuccess) onSuccess(email, res.count);
      } else {
        setStatus({ type: "error", message: "Something went wrong. Please try again." });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: "success", message: "You're on the waitlist! We'll notify you soon." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist-form" className="py-20 px-4 sm:px-8 border-t border-slate-200/80 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#FBFBFD] border border-slate-200/90 rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-sm">
          
          {/* Section Headline */}
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#0F172A] tracking-tight">
            Build your client operations around one system.
          </h2>

          {/* Subtitle */}
          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-600 font-body leading-relaxed">
            Join the waitlist to get early access to Pricis and start streamlining your client engagements.
          </p>

          {/* Form / Success State */}
          <div className="max-w-md mx-auto pt-2">
            {status.type === "success" ? (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 text-slate-900 text-center animate-fade-in space-y-3 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-full flex items-center justify-center mx-auto border border-blue-100">
                  <CheckCircle2 size={28} />
                </div>
                <h3 className="text-xl font-bold font-display text-[#0F172A]">
                  {status.alreadySubscribed ? "You're Already On The List!" : "Your Spot Is Secured! 🎉"}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                  {status.message}
                </p>
                <button
                  onClick={() => setStatus({ type: "idle", message: "" })}
                  className="text-xs font-semibold text-[#2563EB] hover:underline font-body pt-1"
                >
                  Submit another email
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch gap-2.5 p-1.5 bg-white border border-slate-200/90 rounded-xl shadow-2xs focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-600/10 transition-all">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-transparent font-body text-xs sm:text-sm focus:outline-none text-[#0F172A] placeholder-slate-400"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-2xs disabled:opacity-75 flex-shrink-0 font-body"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Joining...</span>
                      </>
                    ) : (
                      <>
                        <span>Join Waitlist</span>
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>

                {status.type === "error" && (
                  <p className="text-red-500 text-xs font-semibold font-body text-center mt-1">
                    {status.message}
                  </p>
                )}
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
