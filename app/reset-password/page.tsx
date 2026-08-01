"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle, CheckCircle2, Lock, Sparkles, ShieldCheck } from "lucide-react";
import Logo from "@/components/Logo";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Reset token is missing or invalid.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setError("Cannot reset password without a token.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to reset password.");
      } else {
        setIsSuccess(true);
      }
    } catch {
      setError("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 overflow-hidden font-body text-text-dark select-none bg-white">
      {/* Left side: Form Panel */}
      <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-12 lg:p-16 bg-white relative z-10 min-h-screen">
        {/* Top Header */}
        <div className="flex justify-between items-center w-full">
          <Link href="/" className="transition-transform duration-300 hover:scale-105">
            <Logo variant="dark" />
          </Link>
          <Link href="/login" className="text-xs font-bold text-primary hover:underline">
            Sign In
          </Link>
        </div>

        {/* Center Form */}
        <div className="max-w-md w-full mx-auto my-auto space-y-6 pt-10 pb-10 text-left">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A] font-display">
              Set new password
            </h1>
            <p className="text-text-secondary text-sm font-medium leading-relaxed">
              Enter your new secure account password below.
            </p>
          </div>

          {isSuccess ? (
            <div className="space-y-4 py-4">
              <div className="flex gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-sm">Password Updated</h3>
                  <p className="text-xs text-emerald-600/90 mt-1 leading-relaxed">
                    Your password has been successfully updated. You can now sign in using your new credentials.
                  </p>
                </div>
              </div>

              <Link
                href="/login"
                className="w-full font-bold text-sm py-3 rounded-full bg-primary hover:bg-primary-hover text-white shadow-blue flex items-center justify-center gap-2 mt-4"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  New Password
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-text-secondary group-focus-within:text-primary transition-colors">
                    <Lock size={16} />
                  </span>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm bg-white border border-[#E5EAF2] text-[#0F172A] outline-none focus:border-primary focus:ring-4 focus:ring-primary-light transition-all placeholder:text-text-muted font-semibold"
                    placeholder="Min. 8 characters"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="confirmPassword" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-text-secondary group-focus-within:text-primary transition-colors">
                    <Lock size={16} />
                  </span>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm bg-white border border-[#E5EAF2] text-[#0F172A] outline-none focus:border-primary focus:ring-4 focus:ring-primary-light transition-all placeholder:text-text-muted font-semibold"
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-danger/5 border border-danger/20 text-danger text-xs font-semibold animate-fade-in">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !token}
                className={`w-full font-bold text-sm py-3 rounded-full transition-all flex items-center justify-center gap-2 mt-4
                  ${(isLoading || !token) ? 'bg-primary/50 text-white cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-white shadow-blue'}
                `}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Resetting password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          )}
        </div>

        {/* Bottom footer */}
        <div className="flex justify-between items-center text-[10px] text-text-muted font-semibold border-t border-[#E5EAF2] pt-4 w-full">
          <span>© 2026 Pricis. All rights reserved.</span>
          <div className="flex gap-3">
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
          </div>
        </div>
      </div>

      {/* Right side: Premium Branding Panel */}
      <div className="lg:col-span-7 hidden lg:flex flex-col justify-between p-16 bg-gradient-to-tr from-[#0F172A] via-[#1E293B] to-[#0F172A] relative overflow-hidden select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none"></div>

        <div className="flex justify-between items-center relative z-10">
          <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-wider">
            <Sparkles size={11} className="text-primary animate-pulse" /> Client Operations Copilot
          </span>
          <span className="text-white/40 text-xs font-bold font-display uppercase tracking-widest">Stage 1 MVP Online</span>
        </div>

        <div className="relative w-full max-w-xl mx-auto z-10 select-none animate-fade-in pointer-events-none">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-8 space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                  <ShieldCheck size={16} className="text-white" />
                </div>
                <div>
                  <div className="w-24 h-2.5 bg-white/20 rounded-full"></div>
                  <div className="w-16 h-1.5 bg-white/10 rounded-full mt-1.5"></div>
                </div>
              </div>
              <span className="bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-[8px] font-bold px-2 py-0.5 rounded-md uppercase">PRO ACTIVE</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-2">
                <span className="text-[10px] text-white/50 block font-bold">TOTAL REVENUE</span>
                <span className="text-xl font-black text-white font-display">₦2,450,000</span>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-2">
                <span className="text-[10px] text-white/50 block font-bold">KOVA ADVICE ENGINE</span>
                <span className="text-xs font-bold text-white/80 block leading-relaxed">"Acknowledge the budget concern and reframe scope options."</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-left max-w-lg mt-8">
          <p className="text-white/90 text-sm font-medium leading-relaxed italic">
            "Pricis has completely transformed how we handle scope changes and client pricing objections. It's like having a senior operations partner on tap."
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white font-display">EM</div>
            <div>
              <span className="text-white text-xs font-bold block font-display">Emeka Promise</span>
              <span className="text-white/40 text-[10px] font-bold block mt-0.5">Founder, Greenlife NG</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
