"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle, Sparkles, CheckCircle2, ChevronRight, ShieldCheck, Mail, Lock } from "lucide-react";
import { supabaseAuth } from "@/lib/auth";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabaseAuth.auth.getSession();
      if (session) {
        router.push("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabaseAuth.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError(null);
    try {
      const { error } = await supabaseAuth.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) {
        setError((error as any).message);
      }
    } catch {
      setError("Failed to redirect to Google authentication.");
    } finally {
      setIsGoogleLoading(false);
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
          <Link href="/signup" className="text-xs font-bold text-primary hover:underline">
            Create Account
          </Link>
        </div>

        {/* Center Form */}
        <div className="max-w-md w-full mx-auto my-auto space-y-8 pt-10 pb-10 text-left">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#0F172A] font-display">
              Welcome back
            </h1>
            <p className="text-text-secondary text-sm font-medium leading-relaxed">
              Login to access your Pricis client operations dashboard.
            </p>
          </div>

          {/* Social Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#E5EAF2] hover:bg-[#F8FAFC] rounded-xl text-sm font-bold text-[#0F172A] transition-all"
          >
            {isGoogleLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            ) : (
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            )}
            <span>{isGoogleLoading ? "Connecting..." : "Continue with Google"}</span>
          </button>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-[#E5EAF2]"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-text-muted uppercase">Or email login</span>
            <div className="flex-grow border-t border-[#E5EAF2]"></div>
          </div>

          <form onSubmit={handleSignIn} className="space-y-5">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                Email
              </label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-text-secondary group-focus-within:text-primary transition-colors">
                  <Mail size={16} />
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm bg-white border border-[#E5EAF2] text-[#0F172A] outline-none focus:border-primary focus:ring-4 focus:ring-primary-light transition-all placeholder:text-text-muted font-semibold"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-baseline">
                <label htmlFor="password" className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                  Password
                </label>
                <Link href="/forgot" className="text-[10px] font-bold text-primary hover:underline">
                  Forgot?
                </Link>
              </div>
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

            {error && (
              <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-danger/5 border border-danger/20 text-danger text-xs font-semibold animate-fade-in">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className={`w-full font-bold text-sm py-3 rounded-full transition-all flex items-center justify-center gap-2 mt-2
                ${isLoading ? 'bg-primary/50 text-white cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-white shadow-blue'}
              `}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>
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
        {/* Scoping blueprint pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        {/* Glow Spheres */}
        <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px] pointer-events-none"></div>

        {/* Header Tag */}
        <div className="flex justify-between items-center relative z-10">
          <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-wider">
            <Sparkles size={11} className="text-primary animate-pulse" /> Client Operations Copilot
          </span>
          <span className="text-white/40 text-xs font-bold font-display uppercase tracking-widest">Stage 1 MVP Online</span>
        </div>

        {/* Visual Graphic Workspace showcase */}
        <div className="relative w-full max-w-xl mx-auto z-10 select-none animate-fade-in pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial-gradient from-primary/10 to-transparent pointer-events-none"></div>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[28px] p-8 space-y-6 shadow-2xl relative">
            {/* Fake Dashboard Header */}
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

            {/* Simulated Widgets */}
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

            {/* Dotted conversion funnel preview */}
            <div className="space-y-3">
              <span className="text-[10px] text-white/40 font-bold block uppercase tracking-wider">Proposal Pipeline Conversion</span>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-primary to-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Quote */}
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
