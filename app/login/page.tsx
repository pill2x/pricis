"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";
import { supabaseAuth } from "@/lib/auth";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabaseAuth.auth.getSession()
      if (session) {
        router.push('/dashboard')
      }
    }
    checkSession()

    document.body.style.backgroundColor = "#F8FAFC";
    document.documentElement.style.backgroundColor = "#F8FAFC";
    return () => {
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
    };
  }, [router])

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

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center px-4 py-12 bg-[#F8FAFC] overflow-hidden font-body text-text-dark selection:bg-primary-light">
      
      {/* Scoping Blueprint Grid Pattern Background (Resonates with design, pricing, and structure) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(37,99,235,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(37,99,235,0.025)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_10%,#F8FAFC_85%)] pointer-events-none" />
      
      {/* Subtle Glowing Blur Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-primary/5 blur-[80px] md:blur-[130px] pointer-events-none animate-pulse duration-[8000ms]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-purple-500/5 blur-[80px] md:blur-[130px] pointer-events-none animate-pulse duration-[10000ms]"></div>

      {/* Logo */}
      <Link href="/" className="mb-8 block z-10 transition-transform duration-300 hover:scale-105">
        <Logo variant="dark" />
      </Link>

      {/* Card */}
      <div className="w-full max-w-md bg-white border border-border-light rounded-[24px] p-8 md:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.03)] relative z-10">
        
        <div className="mb-8">
          <h1 className="font-extrabold tracking-tight text-3xl text-text-dark font-display">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-text-secondary font-body">
            Sign in to your Pricis account.
          </p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-text-dark font-body">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-[10px] px-3.5 py-2.5 text-sm bg-surface border-[1.5px] border-border-light text-text-dark outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)] transition-all font-body placeholder:text-text-muted"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1.5 text-text-dark font-body">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-[10px] px-3.5 py-2.5 text-sm bg-surface border-[1.5px] border-border-light text-text-dark outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)] transition-all font-body placeholder:text-text-muted"
              placeholder="Min. 8 characters"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-[10px] bg-danger/5 border border-danger/20 text-danger font-body">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-semibold text-sm py-3 rounded-full transition-all mt-2 flex items-center justify-center gap-2 font-body
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

        <div className="mt-6 pt-6 border-t border-border-light">
          <p className="text-center text-sm text-text-secondary font-body">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-primary hover:text-primary-hover transition-colors"
            >
              Create one free
            </Link>
          </p>
        </div>
      </div>

      <p className="mt-8 text-xs text-center text-slate-600 font-body">
        By signing in, you agree to our terms.
      </p>
    </div>
  );
}
