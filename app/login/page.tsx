"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1D35] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#B8860B] mb-2">Pricis</h1>
          <p className="text-white/70">Sign in to your account</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={[
                  "w-full rounded-xl border bg-[#0B1D35] text-white",
                  "border-white/15 px-4 py-3 leading-relaxed",
                  "placeholder:text-white/40",
                  "focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent",
                ].join(" ")}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={[
                  "w-full rounded-xl border bg-[#0B1D35] text-white",
                  "border-white/15 px-4 py-3 leading-relaxed",
                  "placeholder:text-white/40",
                  "focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent",
                ].join(" ")}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={[
                "w-full inline-flex items-center justify-center gap-2",
                "px-6 py-3.5 font-bold rounded-lg transition-colors",
                isLoading
                  ? "bg-white/15 text-white/50 cursor-not-allowed"
                  : "bg-[#B8860B] text-[#0B1D35] hover:bg-[#c99414]",
              ].join(" ")}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-white/60">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-[#B8860B] hover:text-[#c99414] transition-colors font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
