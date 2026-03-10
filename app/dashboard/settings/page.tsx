"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertTriangle } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Profile {
  full_name: string;
  business_name: string;
  email: string;
}

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    business_name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
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
        });
      } else {
        // Profile doesn't exist, create it
        setProfile({
          full_name: "",
          business_name: "",
          email: user.email || "",
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
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

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
      }
    } catch (err) {
      console.error("Error:", err);
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
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#B8860B]" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">Settings</h1>

      {/* Profile Section */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-6">Profile</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              className="w-full rounded-lg border bg-[#0B1D35] text-white border-white/15 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label htmlFor="businessName" className="block text-sm font-medium mb-2">
              Business Name
            </label>
            <input
              id="businessName"
              type="text"
              value={profile.business_name}
              onChange={(e) => setProfile({ ...profile, business_name: e.target.value })}
              className="w-full rounded-lg border bg-[#0B1D35] text-white border-white/15 px-4 py-3 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent"
              placeholder="Enter your business name (optional)"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={profile.email}
              disabled
              className="w-full rounded-lg border bg-[#0B1D35] text-white/50 border-white/15 px-4 py-3 cursor-not-allowed"
              placeholder="Your email address"
            />
            <p className="text-xs text-white/40 mt-1">
              Email cannot be changed here. Contact support if needed.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#B8860B] text-[#0B1D35] font-bold rounded-lg hover:bg-[#c99414] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Account Section */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-6">Account</h2>
        
        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 text-white/80 hover:text-white hover:border-white/25 transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Danger Zone */}
      <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
        <h2 className="text-lg font-semibold mb-6 text-red-400">Danger Zone</h2>
        
        <button
          onClick={handleDeleteAccount}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500 text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <AlertTriangle className="h-4 w-4" />
          Delete Account
        </button>
        
        <p className="text-sm text-white/50 mt-2">
          This action cannot be undone. All your data will be permanently deleted.
        </p>
      </div>

      {/* Coming Soon Toast */}
      {showComingSoon && (
        <div className="fixed bottom-4 right-4 bg-[#B8860B] text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <AlertTriangle className="h-4 w-4" />
          <span>Coming soon</span>
        </div>
      )}
    </div>
  );
}
