"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Menu, X } from "lucide-react";

export default function WaitlistNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById("waitlist-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      const input = element.querySelector("input");
      if (input) input.focus();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FBFBFD]/90 backdrop-blur-md border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Pricis Official Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Logo variant="dark" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-9 font-body">
          <a
            href="#product"
            onClick={(e) => scrollToSection(e, "product")}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider"
          >
            Product
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => scrollToSection(e, "how-it-works")}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider"
          >
            How It Works
          </a>
          <a
            href="#built-for"
            onClick={(e) => scrollToSection(e, "built-for")}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider"
          >
            For Teams
          </a>
        </nav>

        {/* Desktop Primary CTA Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={scrollToWaitlist}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all shadow-sm active:scale-95 font-body"
          >
            Join the waitlist
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 px-6 py-6 space-y-4 bg-white animate-fade-in">
          <a
            href="#product"
            onClick={(e) => scrollToSection(e, "product")}
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 py-2 font-body"
          >
            Product
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => scrollToSection(e, "how-it-works")}
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 py-2 font-body"
          >
            How It Works
          </a>
          <a
            href="#built-for"
            onClick={(e) => scrollToSection(e, "built-for")}
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 py-2 font-body"
          >
            For Teams
          </a>
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={scrollToWaitlist}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider py-3 rounded-full text-center font-body shadow-sm"
            >
              Join the waitlist
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
