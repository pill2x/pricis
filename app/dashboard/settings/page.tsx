"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertTriangle, CheckCircle2, LogOut, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Profile {
  full_name: string;
  business_name: string;
  email: string;
  auto_save_quotes?: boolean;
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    business_name: "",
    email: "",
    auto_save_quotes: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching profile:", error);
      } else if (data) {
        setProfile({
          full_name: data.full_name || "",
          business_name: data.business_name || "",
          email: data.email || user.email || "",
          auto_save_quotes: data.auto_save_quotes !== undefined ? data.auto_save_quotes : true,
        });
      } else {
        // Profile doesn't exist, create it
        setProfile({
          full_name: "",
          business_name: "",
          email: user.email || "",
          auto_save_quotes: true,
        });
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // For now, only save the basic profile fields (auto_save_quotes column needs to be added to database)
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          email: profile.email,
          full_name: profile.full_name,
          business_name: profile.business_name,
        });

      if (error) {
        console.error("Error saving profile:", error);
        setErrorMessage("Failed to save profile");
      } else {
        setSuccessMessage("Profile updated successfully.");
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleDeleteAccount = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 3000);
  };

  if (loading) {
    return (
      <>
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        `}</style>
        
        <div className="min-h-screen flex items-center justify-center" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#060D18' }}>
          <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#B8860B' }} />
        </div>
      </>
    );
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      `}</style>
      
      <div className="min-h-screen" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#060D18' }}>
        <div className="px-6 py-10 max-w-4xl mx-auto">
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-black tracking-[-0.02em]" style={{ fontSize: '48px', color: '#F1F5F9' }}>
              Settings
            </h1>
            <p className="mt-1 text-sm" style={{ color: '#94A3B8' }}>
              Manage your profile and account.
            </p>
          </div>

          {/* SECTION 1 — PROFILE */}
          <div className="mb-5 overflow-hidden rounded-2xl" style={{ backgroundColor: '#0C1827', border: '1px solid rgba(255,255,255,0.08)' }}>
            
            {/* Section Header */}
            <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-sm font-semibold" style={{ color: '#F1F5F9' }}>
                Profile Information
              </div>
              <div className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>
                Update your name and business details.
              </div>
            </div>

            {/* Section Content */}
            <div className="px-6 py-5">
              <div className="space-y-4">
                
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium mb-1.5" style={{ color: '#94A3B8' }}>
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={profile.full_name}
                    onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    className="w-full rounded-xl transition-all"
                    style={{
                      backgroundColor: '#060D18',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '12px 16px',
                      fontSize: '14px',
                      color: '#F1F5F9',
                      outline: 'none'
                    }}
                    placeholder="Enter your full name"
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(37,99,235,0.6)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Business Name */}
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium mb-1.5" style={{ color: '#94A3B8' }}>
                    Business Name
                  </label>
                  <input
                    id="businessName"
                    type="text"
                    value={profile.business_name}
                    onChange={(e) => setProfile({ ...profile, business_name: e.target.value })}
                    className="w-full rounded-xl transition-all"
                    style={{
                      backgroundColor: '#060D18',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '12px 16px',
                      fontSize: '14px',
                      color: '#F1F5F9',
                      outline: 'none'
                    }}
                    placeholder="Enter your business name (optional)"
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(37,99,235,0.6)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <p className="text-xs mt-1" style={{ color: '#475569' }}>
                    Shown on your exported scope PDFs
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: '#94A3B8' }}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="w-full rounded-xl"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '12px 16px',
                      fontSize: '14px',
                      color: '#475569',
                      cursor: 'not-allowed'
                    }}
                    placeholder="Your email address"
                  />
                  <p className="text-xs mt-1" style={{ color: '#475569' }}>
                    Email cannot be changed
                  </p>
                </div>

                {/* Auto-save Quotes Toggle - Temporarily Hidden */}
                {/* 
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium" style={{ color: '#94A3B8' }}>
                      Auto-save generated quotes
                    </label>
                    <button
                      onClick={() => setProfile({ ...profile, auto_save_quotes: !profile.auto_save_quotes })}
                      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
                      style={{
                        backgroundColor: profile.auto_save_quotes ? '#2563EB' : 'rgba(255,255,255,0.08)'
                      }}
                    >
                      <span
                        className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                        style={{
                          transform: profile.auto_save_quotes ? 'translateX(20px)' : 'translateX(2px)'
                        }}
                      />
                    </button>
                  </div>
                  <p className="text-xs" style={{ color: '#475569' }}>
                    When enabled, quotes are automatically saved to your dashboard
                  </p>
                </div>
                */}
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl mt-4" style={{ backgroundColor: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', color: '#10B981' }}>
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm">{successMessage}</span>
                </div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl mt-4" style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#EF4444' }}>
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">{errorMessage}</span>
                </div>
              )}

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={saving}
                className="font-semibold text-sm px-6 py-2.5 rounded-xl transition-all mt-2"
                style={{
                  backgroundColor: saving ? 'rgba(37,99,235,0.5)' : '#2563EB',
                  color: 'white',
                  cursor: saving ? 'not-allowed' : 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (!saving) e.currentTarget.style.backgroundColor = '#1D4ED8';
                }}
                onMouseLeave={(e) => {
                  if (!saving) e.currentTarget.style.backgroundColor = '#2563EB';
                }}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>

          {/* SECTION 2 — ACCOUNT */}
          <div className="mb-5 overflow-hidden rounded-2xl" style={{ backgroundColor: '#0C1827', border: '1px solid rgba(255,255,255,0.08)' }}>
            
            {/* Section Header */}
            <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-sm font-semibold" style={{ color: '#F1F5F9' }}>
                Account
              </div>
              <div className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>
                Manage your session.
              </div>
            </div>

            {/* Section Content */}
            <div className="px-6 py-5">
              <div className="space-y-3">
                
                {/* Account Info Row */}
                <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div>
                    <div className="text-sm" style={{ color: '#94A3B8' }}>Signed in as</div>
                    <div className="text-sm font-medium mt-0.5" style={{ color: '#F1F5F9' }}>
                      {profile.email}
                    </div>
                  </div>
                </div>

                {/* Sign Out Row */}
                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="text-sm font-medium" style={{ color: '#F1F5F9' }}>
                      Sign Out
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>
                      You'll be redirected to homepage.
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 font-medium text-sm px-4 py-2 rounded-xl transition-all"
                    style={{
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#94A3B8'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                      e.currentTarget.style.color = '#F1F5F9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = '#94A3B8';
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3 — DANGER ZONE */}
          <div className="mb-5 overflow-hidden rounded-2xl" style={{ backgroundColor: '#0C1827', border: '1px solid rgba(239,68,68,0.15)' }}>
            
            {/* Section Header */}
            <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-sm font-semibold" style={{ color: '#EF4444' }}>
                Danger Zone
              </div>
              <div className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>
                These actions are permanent.
              </div>
            </div>

            {/* Section Content */}
            <div className="px-6 py-5">
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-medium" style={{ color: '#F1F5F9' }}>
                    Delete Account
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>
                    Permanently delete your account and all saved scopes. Cannot be undone.
                  </div>
                </div>
                <button
                  onClick={handleDeleteAccount}
                  className="font-medium text-sm px-4 py-2 rounded-xl transition-all"
                  style={{
                    border: '1px solid rgba(239,68,68,0.3)',
                    color: '#EF4444'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Toast */}
        {showComingSoon && (
          <div className="fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50" style={{ backgroundColor: '#B8860B', color: '#0B1D35' }}>
            <AlertTriangle className="h-4 w-4" />
            <span>Coming soon</span>
          </div>
        )}
      </div>
    </>
  );
}
