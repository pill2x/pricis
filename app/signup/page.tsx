"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle, User, Briefcase, Mail, Lock, ArrowRight } from "lucide-react";
import { supabaseAuth } from "@/lib/auth";
import { insertProfile } from "@/app/actions/db";
import Logo from "@/components/Logo";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    document.body.style.backgroundColor = "#F8FAFC";
    document.documentElement.style.backgroundColor = "#F8FAFC";
    return () => {
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
    };
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Create user account
      const { data: authData, error: authError } = await supabaseAuth.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      if (authData.user) {
        // Create profile
        let profileError = null;
        try {
          await insertProfile(
            authData.user.id,
            authData.user.email || "",
            fullName,
            businessName
          );
        } catch (e) {
          profileError = e;
        }

        if (profileError) {
          setError("Account created but profile setup failed");
        } else {
          router.push("/dashboard");
        }
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center px-4 py-6 md:py-8 bg-[#F8FAFC] overflow-hidden font-body text-text-dark selection:bg-primary-light">
      
      {/* Scoping Blueprint Grid Pattern Background (Resonates with design, pricing, and structure) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.025)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_10%,#F8FAFC_85%)] pointer-events-none" />
      
      {/* Subtle Glowing Blur Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-primary/5 blur-[80px] md:blur-[130px] pointer-events-none animate-pulse duration-[8000ms]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-purple-500/5 blur-[80px] md:blur-[130px] pointer-events-none animate-pulse duration-[10000ms]"></div>

      {/* Top Logo */}
      <Link href="/" className="mb-5 block z-10 transition-transform duration-300 hover:scale-105">
        <Logo variant="dark" />
      </Link>

      {/* Main Glassmorphic Light Card */}
      <div className="w-full max-w-md bg-white border border-border-light rounded-[24px] p-6 md:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] relative z-10">
        
        {/* Card Header */}
        <div className="mb-5">
          <h1 className="font-extrabold tracking-tight text-3xl text-text-dark font-display">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Start generating professional scopes for free.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-text-secondary group-focus-within:text-primary transition-colors">
                <User size={16} />
              </span>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm bg-white border border-border-light text-text-dark outline-none focus:border-primary focus:ring-4 focus:ring-primary-light transition-all font-body placeholder:text-text-muted"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Business Name */}
          <div>
            <div className="flex justify-between items-baseline mb-1.5">
              <label htmlFor="businessName" className="block text-xs font-bold text-text-secondary uppercase tracking-wider">
                Business Name
              </label>
              <span className="text-[10px] text-text-muted font-bold">Optional</span>
            </div>
            <div className="relative group">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-text-secondary group-focus-within:text-primary transition-colors">
                <Briefcase size={16} />
              </span>
              <input
                id="businessName"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm bg-white border border-border-light text-text-dark outline-none focus:border-primary focus:ring-4 focus:ring-primary-light transition-all font-body placeholder:text-text-muted"
                placeholder="Your Studio / Freelance name"
              />
            </div>
            <p className="text-[10px] mt-1 text-text-secondary font-medium">
              Shown on your scopes, proposals, and invoices.
            </p>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
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
                className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm bg-white border border-border-light text-text-dark outline-none focus:border-primary focus:ring-4 focus:ring-primary-light transition-all font-body placeholder:text-text-muted"
                placeholder="you@email.com"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-xs font-bold text-text-secondary uppercase tracking-wider mb-1.5">
              Password
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
                minLength={8}
                className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm bg-white border border-border-light text-text-dark outline-none focus:border-primary focus:ring-4 focus:ring-primary-light transition-all font-body placeholder:text-slate-400"
                placeholder="Min. 8 characters"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-danger/5 border border-danger/20 text-danger animate-fadeIn">
              <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
              <span className="text-xs font-semibold">{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-bold text-sm py-2.5 rounded-full transition-all duration-300 shadow-blue mt-2 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]
              ${isLoading ? 'bg-primary/50 text-white/70 cursor-not-allowed' : 'bg-primary hover:bg-primary-hover text-white'}
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 pt-4 border-t border-border-light text-center">
          <p className="text-sm text-text-secondary">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-primary hover:text-primary-hover transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-6 text-xs text-center text-slate-600 max-w-xs leading-normal">
        By signing up, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
