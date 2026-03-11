"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";
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
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      `}</style>
      
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#F7F8FA' }}>
        
        {/* Top Logo */}
        <Link href="/" className="mb-8">
          <div className="font-bold text-xl" style={{ color: '#0A0F1E' }}>Pricis</div>
        </Link>

        {/* Main Card */}
        <div className="w-full max-w-md" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8EAED', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
          
          {/* Card Header */}
          <div className="mb-8">
            <h1 className="font-black tracking-[-0.02em]" style={{ fontSize: '32px', color: '#0A0F1E' }}>
              Create your account
            </h1>
            <p className="mt-2 text-sm" style={{ color: '#4B5563' }}>
              Start generating professional scopes for free.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignUp} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium mb-1.5" style={{ color: '#0A0F1E' }}>
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full rounded-xl px-4 py-3 text-sm transition-all"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8EAED',
                  color: '#0A0F1E',
                  outline: 'none'
                }}
                placeholder="John Doe"
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563EB';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E8EAED';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Business Name */}
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium mb-1.5" style={{ color: '#0A0F1E' }}>
                Business Name
              </label>
              <input
                id="businessName"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm transition-all"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8EAED',
                  color: '#0A0F1E',
                  outline: 'none'
                }}
                placeholder="Your Studio / Freelance name"
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563EB';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E8EAED';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>
                (Optional — shown on your scopes)
              </p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: '#0A0F1E' }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl px-4 py-3 text-sm transition-all"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8EAED',
                  color: '#0A0F1E',
                  outline: 'none'
                }}
                placeholder="you@email.com"
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563EB';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E8EAED';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1.5" style={{ color: '#0A0F1E' }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full rounded-xl px-4 py-3 text-sm transition-all"
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8EAED',
                  color: '#0A0F1E',
                  outline: 'none'
                }}
                placeholder="Min. 8 characters"
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563EB';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#E8EAED';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444' }}>
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full font-bold text-sm py-3.5 rounded-xl transition-all"
              style={{
                backgroundColor: isLoading ? 'rgba(37,99,235,0.5)' : '#2563EB',
                color: 'white',
                boxShadow: '0 4px 14px rgba(37,99,235,0.25)',
                marginTop: '8px',
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = '#1D4ED8';
              }}
              onMouseLeave={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = '#2563EB';
              }}
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
          <div className="mt-6 pt-6" style={{ borderTop: '1px solid #E8EAED' }}>
            <p className="text-center text-sm" style={{ color: '#4B5563' }}>
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold"
                style={{ color: '#2563EB' }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-center" style={{ color: '#9CA3AF' }}>
          By signing up, you agree to our terms.
        </p>
      </div>
    </>
  );
}
