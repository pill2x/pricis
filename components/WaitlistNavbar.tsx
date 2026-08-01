"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";

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
    <header className="sticky top-0 z-50 bg-[#080D1A]/90 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/waitlist" className="flex items-center gap-2 group">
          <Logo variant="dark" />
          <span className="hidden sm:inline-block bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[11px] font-semibold px-2.5 py-0.5 rounded-full font-body">
            Waitlist Edition
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#why-join"
            onClick={(e) => scrollToSection(e, "why-join")}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors font-body"
          >
            Why Join
          </a>
          <a
            href="#features"
            onClick={(e) => scrollToSection(e, "features")}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors font-body"
          >
            Features
          </a>
          <a
            href="#countdown"
            onClick={(e) => scrollToSection(e, "countdown")}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors font-body flex items-center gap-1.5"
          >
            <Sparkles size={14} className="text-blue-400" /> Launch Timer
          </a>
          <a
            href="#faq"
            onClick={(e) => scrollToSection(e, "faq")}
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors font-body"
          >
            FAQ
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={scrollToWaitlist}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-all shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_25px_rgba(37,99,235,0.5)] flex items-center gap-2 font-body"
          >
            <span>Join Waitlist</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D1526] border-b border-white/10 px-6 py-6 space-y-4 animate-fade-in">
          <a
            href="#why-join"
            onClick={(e) => scrollToSection(e, "why-join")}
            className="block text-base font-medium text-slate-200 hover:text-white py-1 font-body"
          >
            Why Join
          </a>
          <a
            href="#features"
            onClick={(e) => scrollToSection(e, "features")}
            className="block text-base font-medium text-slate-200 hover:text-white py-1 font-body"
          >
            Features
          </a>
          <a
            href="#countdown"
            onClick={(e) => scrollToSection(e, "countdown")}
            className="block text-base font-medium text-slate-200 hover:text-white py-1 font-body"
          >
            Launch Timer
          </a>
          <a
            href="#faq"
            onClick={(e) => scrollToSection(e, "faq")}
            className="block text-base font-medium text-slate-200 hover:text-white py-1 font-body"
          >
            FAQ
          </a>
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={scrollToWaitlist}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl text-center flex items-center justify-center gap-2 font-body"
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
