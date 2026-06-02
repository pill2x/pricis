"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle, Target } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      if (authData.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: authData.user.id,
            email: authData.user.email,
            full_name: fullName,
            business_name: businessName,
          });

        if (profileError) {
          setError("Account created but profile setup failed");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-slate-50 font-sans text-slate-900">
      
      {/* Top Logo */}
      <Link href="/" className="mb-8 flex items-center gap-2">
        <Target className="text-primary" size={28} />
        <span className="font-bold text-2xl tracking-tight text-slate-900">pricis</span>
      </Link>

      {/* Main Card */}
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        
        {/* Card Header */}
        <div className="mb-8">
          <h1 className="font-black tracking-[-0.02em] text-3xl text-slate-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Start generating professional scopes for free.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-1.5 text-slate-900">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full rounded-xl px-4 py-3 text-sm bg-white border border-slate-200 text-slate-900 outline-none focus:border-primary focus:ring-4 focus:ring-blue-500/10 transition-all"
              placeholder="John Doe"
            />
          </div>

          {/* Business Name */}
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium mb-1.5 text-slate-900">
              Business Name
            </label>
            <input
              id="businessName"
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm bg-white border border-slate-200 text-slate-900 outline-none focus:border-primary focus:ring-4 focus:ring-blue-500/10 transition-all"
              placeholder="Your Studio / Freelance name"
            />
            <p className="text-xs mt-1.5 text-slate-400">
              (Optional — shown on your scopes)
            </p>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-slate-900">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl px-4 py-3 text-sm bg-white border border-slate-200 text-slate-900 outline-none focus:border-primary focus:ring-4 focus:ring-blue-500/10 transition-all"
              placeholder="you@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1.5 text-slate-900">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full rounded-xl px-4 py-3 text-sm bg-white border border-slate-200 text-slate-900 outline-none focus:border-primary focus:ring-4 focus:ring-blue-500/10 transition-all"
              placeholder="Min. 8 characters"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-bold text-sm py-3.5 rounded-xl transition-all shadow-md mt-2 flex items-center justify-center gap-2
              ${isLoading ? 'bg-blue-400 text-white cursor-not-allowed' : 'bg-primary hover:bg-blue-600 text-white shadow-blue-500/25'}
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account →"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-primary hover:text-blue-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-center text-slate-400">
        By signing up, you agree to our terms.
      </p>
    </div>
  );
}
