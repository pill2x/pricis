"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  FileText, MessageSquare, Settings, LogOut, Menu, X, 
  LayoutDashboard, Bookmark, Receipt, Star, Crown,
  FileCheck, Briefcase, Users, BarChart2, Puzzle
} from "lucide-react";
import { supabaseAuth } from "@/lib/auth";
import Logo from "@/components/Logo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabaseAuth.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    setUser(user);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabaseAuth.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-secondary flex items-center justify-center">
        <div className="text-primary font-medium flex items-center gap-2 font-body">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          Loading workspace...
        </div>
      </div>
    );
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: FileText, label: "Scopes", href: "/dashboard/scopes" },
    { icon: FileCheck, label: "Proposals", href: "/dashboard/proposals" },
    { icon: MessageSquare, label: "Negotiation AI", href: "/dashboard/negotiate" },
    { icon: Bookmark, label: "Templates", href: "/dashboard/templates" },
    { icon: Briefcase, label: "Projects", href: "/dashboard/projects" },
    { icon: Users, label: "Clients", href: "/dashboard/clients" },
    { icon: Receipt, label: "Invoices", href: "/dashboard/invoices" },
    { icon: BarChart2, label: "Analytics", href: "/dashboard/analytics" },
    { icon: Puzzle, label: "Integrations", href: "/dashboard/integrations" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="min-h-screen bg-surface-secondary flex font-body text-text-dark">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed left-0 top-0 h-full w-[220px] bg-surface border-r border-border-light flex-col py-6 px-4 z-40 select-none">
        <div className="mb-10 px-2">
          <Link href="/dashboard">
            <Logo variant="dark" />
          </Link>
        </div>
        
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all relative ${
                  active 
                    ? "bg-[#EFF6FF] text-primary" 
                    : "text-text-secondary hover:text-text-dark hover:bg-surface-secondary"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-md animate-fade-in"></span>
                )}
                <item.icon size={18} className={active ? "text-primary" : "text-text-secondary"} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 space-y-4 border-t border-border-light">
          {/* Upgrade Card */}
          <Link href="/pricing" className="flex items-center gap-3 px-3 py-2.5 cursor-pointer group hover:bg-surface-secondary rounded-lg transition-all border border-transparent hover:border-border-light">
            <div className="text-amber-500 bg-amber-50 p-1.5 rounded-lg border border-amber-100 group-hover:scale-110 transition-transform">
              <Crown size={16} fill="currentColor" />
            </div>
            <div>
              <div className="text-xs font-bold text-[#0F172A] font-display flex items-center gap-1">
                Upgrade to Pro
              </div>
              <div className="text-[10px] text-text-secondary mt-0.5 font-semibold uppercase tracking-wider">Unlock all features</div>
            </div>
          </Link>
          
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors text-sm font-semibold w-full"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 z-50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed left-0 top-0 h-full w-[280px] bg-surface border-r border-border-light flex flex-col py-6 px-4" onClick={(e) => e.stopPropagation()}>
            <div className="mb-10 px-2 flex justify-between items-center">
              <Logo variant="dark" />
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="text-text-secondary hover:text-text-dark p-2 rounded-lg hover:bg-surface-secondary transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <nav className="flex-1 space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-semibold transition-all relative ${
                      active 
                        ? "bg-[#EFF6FF] text-primary" 
                        : "text-text-secondary hover:text-text-dark hover:bg-surface-secondary"
                    }`}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-md"></span>
                    )}
                    <item.icon size={20} className={active ? "text-primary" : "text-text-secondary"} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 space-y-4 border-t border-border-light">
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 cursor-pointer group hover:bg-surface-secondary rounded-lg transition-all">
                <div className="text-amber-500 bg-amber-50 p-2 rounded-lg border border-amber-100">
                  <Crown size={20} fill="currentColor" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0F172A] font-display">Upgrade to Pro</div>
                  <div className="text-[10px] text-text-secondary mt-0.5 font-semibold uppercase tracking-wider">Unlock all features</div>
                </div>
              </Link>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-text-secondary hover:text-danger hover:bg-danger/10 transition-colors text-base font-semibold w-full"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-[220px] min-h-screen">
        {/* Mobile Sticky Top Header */}
        <div className="md:hidden sticky top-0 w-full h-14 bg-surface border-b border-border-light flex items-center justify-between px-4 z-30">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-text-dark p-2 hover:bg-surface-secondary rounded-lg transition-colors"
          >
            <Menu size={22} />
          </button>
          <Logo variant="dark" />
          <div className="w-9"></div> {/* Balancer spacer */}
        </div>

        <main className="w-full p-4 sm:p-6 md:p-10 pb-24 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
