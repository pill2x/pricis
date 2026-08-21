"use client";

import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="border-t border-slate-200/80 bg-white py-12 px-4 sm:px-8 font-body">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        
        {/* Left Column: Logo & Tagline */}
        <div className="space-y-2 text-left">
          <Link href="/" className="inline-block">
            <Logo variant="dark" />
          </Link>
          <p className="text-xs text-slate-500 font-medium">
            Client operations, precisely.
          </p>
        </div>

        {/* Right Column: Footer Links */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-semibold text-slate-500">
          <a
            href="#product"
            onClick={(e) => scrollToSection(e, "product")}
            className="hover:text-slate-900 transition-colors"
          >
            Product
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => scrollToSection(e, "how-it-works")}
            className="hover:text-slate-900 transition-colors"
          >
            Pricing
          </a>
          <Link href="/terms-of-service" className="hover:text-slate-900 transition-colors">
            Terms
          </Link>
          <Link href="/privacy-policy" className="hover:text-slate-900 transition-colors">
            Privacy
          </Link>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900 transition-colors"
          >
            Twitter
          </a>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
        <p>© {new Date().getFullYear()} Pricis Inc. All rights reserved.</p>
        <p>Built for ambitious service businesses.</p>
      </div>
    </footer>
  );
}
