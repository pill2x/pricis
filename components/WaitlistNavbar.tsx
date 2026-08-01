"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Menu, X, ArrowRight } from "lucide-react";

export default function WaitlistNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById("hero-waitlist-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      const input = element.querySelector("input");
      if (input) input.focus();
    }
  };

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="sticky top-0 z-50 transition-colors duration-200 border-b bg-white/90 backdrop-blur-md border-slate-200/80 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/waitlist" className="flex items-center gap-2 group">
          <Logo variant="dark" />
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 font-body">
          <a
            href="#why-join"
            onClick={(e) => scrollToSection(e, "why-join")}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Why Join
          </a>
          <a
            href="#features"
            onClick={(e) => scrollToSection(e, "features")}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Features
          </a>
          <a
            href="#countdown"
            onClick={(e) => scrollToSection(e, "countdown")}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Launch Timer
          </a>
          <a
            href="#faq"
            onClick={(e) => scrollToSection(e, "faq")}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Action Button: Join Waitlist Pill */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={scrollToWaitlist}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-all shadow-[0_4px_16px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.45)] active:scale-95 font-body flex items-center gap-2"
          >
            <span>Join Waitlist</span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b px-6 py-6 space-y-4 animate-fade-in bg-white border-slate-200 text-slate-900">
          <a
            href="#why-join"
            onClick={(e) => scrollToSection(e, "why-join")}
            className="block text-base font-medium py-1 font-body"
          >
            Why Join
          </a>
          <a
            href="#features"
            onClick={(e) => scrollToSection(e, "features")}
            className="block text-base font-medium py-1 font-body"
          >
            Features
          </a>
          <a
            href="#countdown"
            onClick={(e) => scrollToSection(e, "countdown")}
            className="block text-base font-medium py-1 font-body"
          >
            Launch Timer
          </a>
          <a
            href="#faq"
            onClick={(e) => scrollToSection(e, "faq")}
            className="block text-base font-medium py-1 font-body"
          >
            FAQ
          </a>
          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={scrollToWaitlist}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3 rounded-full text-center flex items-center justify-center gap-2 font-body shadow-md shadow-blue-500/20"
            >
              <span>Join Waitlist</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
