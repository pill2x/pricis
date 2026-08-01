"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, Menu, X, BookOpen, DollarSign, Lightbulb, HelpCircle, Users, Briefcase, Mail } from "lucide-react";
import Logo from "@/components/Logo";

const resourcesItems = [
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Pricing Guide", href: "/pricing-guide", icon: DollarSign },
  { label: "Negotiation Tips", href: "/negotiation-tips", icon: Lightbulb },
  { label: "Help Center", href: "/help-center", icon: HelpCircle },
];

const companyItems = [
  { label: "About Us", href: "/about", icon: Users },
  { label: "Careers", href: "/careers", icon: Briefcase },
  { label: "Contact Us", href: "/contact", icon: Mail },
];

type DropdownKey = "resources" | "company" | null;

const DropdownPanel = ({
  items,
  onClose,
}: {
  items: typeof resourcesItems;
  onClose: () => void;
}) => (
  <div
    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 min-w-[12rem] bg-surface border border-border-light rounded-2xl shadow-lg p-2 z-50 animate-dropdown"
  >
    {items.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        onClick={onClose}
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-surface-secondary text-text-dark text-sm font-body transition-colors"
      >
        <item.icon size={16} className="text-primary flex-shrink-0" />
        {item.label}
      </Link>
    ))}
  </div>
);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileExpanded, setMobileExpanded] = useState<DropdownKey>(null);

  // Smart scroll state
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const navRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const newsletterRef = useRef<HTMLElement | null>(null);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Smart scroll hide/show for mobile
  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;

    requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        setVisible(true);
        ticking.current = false;
        lastScrollY.current = currentScrollY;
        return;
      }

      // Find footer and newsletter by data attribute
      if (!footerRef.current) {
        footerRef.current = document.querySelector('[data-section="footer"]');
      }
      if (!newsletterRef.current) {
        newsletterRef.current = document.querySelector('[data-section="newsletter"]');
      }

      const footerRect = footerRef.current?.getBoundingClientRect();
      const newsletterRect = newsletterRef.current?.getBoundingClientRect();
      const viewportH = window.innerHeight;

      // Check if footer is in view
      const footerInView = footerRect && footerRect.top < viewportH;
      // Check if newsletter is in view (scrolled back up to it)
      const newsletterInView = newsletterRect && newsletterRect.top < viewportH && newsletterRect.bottom > 0;

      if (footerInView && !newsletterInView) {
        // In footer area but haven't scrolled back to newsletter — hide
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling down (towards hero) → show navbar
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        // Scrolling up (away from hero) → hide navbar
        setVisible(false);
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleDropdown = (key: DropdownKey) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  const toggleMobileExpanded = (key: DropdownKey) => {
    setMobileExpanded((prev) => (prev === key ? null : key));
  };

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-50 w-full bg-bg-dark/95 backdrop-blur-sm border-b border-border transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-[64px] flex items-center justify-between">
        <Link href="/">
          <Logo variant="muted" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted font-body">
          <Link href="/features" className="hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/how-it-works" className="hover:text-white transition-colors">
            How it Works
          </Link>
          <Link href="/pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>

          {/* Resources Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("resources")}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              Resources
              <ChevronDown
                size={14}
                className={`transition-transform duration-150 ${
                  activeDropdown === "resources" ? "rotate-180" : ""
                }`}
              />
            </button>
            {activeDropdown === "resources" && (
              <DropdownPanel items={resourcesItems} onClose={() => setActiveDropdown(null)} />
            )}
          </div>

          {/* Company Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("company")}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              Company
              <ChevronDown
                size={14}
                className={`transition-transform duration-150 ${
                  activeDropdown === "company" ? "rotate-180" : ""
                }`}
              />
            </button>
            {activeDropdown === "company" && (
              <DropdownPanel items={companyItems} onClose={() => setActiveDropdown(null)} />
            )}
          </div>

          <Link href="/templates" className="hover:text-white transition-colors">
            Templates
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/login"
            className="hidden sm:block text-sm font-medium text-white hover:text-gray-200 transition-colors bg-white/10 border border-white/15 rounded-full px-5 py-2"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="text-xs sm:text-sm font-semibold bg-primary hover:bg-primary-hover shadow-blue text-white px-4 sm:px-5 py-2 rounded-full transition-all whitespace-nowrap"
          >
            Get Started Free
          </Link>
          <button
            className="md:hidden text-text-muted p-1 ml-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute left-0 top-full w-full h-[calc(100vh-64px)] bg-bg-dark z-40 overflow-y-auto border-t border-border">
          <div className="px-6 py-6 space-y-1">
            <Link
              href="/features"
              className="block text-white hover:text-primary transition-colors py-3 font-medium text-base"
              onClick={() => setMobileOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/how-it-works"
              className="block text-white hover:text-primary transition-colors py-3 font-medium text-base"
              onClick={() => setMobileOpen(false)}
            >
              How it Works
            </Link>
            <Link
              href="/pricing"
              className="block text-white hover:text-primary transition-colors py-3 font-medium text-base"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>

            {/* Mobile Resources */}
            <div>
              <button
                onClick={() => toggleMobileExpanded("resources")}
                className="flex items-center justify-between w-full text-white hover:text-primary transition-colors py-3 font-medium text-base"
              >
                Resources
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-150 ${
                    mobileExpanded === "resources" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileExpanded === "resources" && (
                <div className="pl-4 pb-2 space-y-1">
                  {resourcesItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 py-2.5 text-text-muted hover:text-white transition-colors text-sm"
                    >
                      <item.icon size={16} className="text-primary" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Company */}
            <div>
              <button
                onClick={() => toggleMobileExpanded("company")}
                className="flex items-center justify-between w-full text-white hover:text-primary transition-colors py-3 font-medium text-base"
              >
                Company
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-150 ${
                    mobileExpanded === "company" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileExpanded === "company" && (
                <div className="pl-4 pb-2 space-y-1">
                  {companyItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 py-2.5 text-text-muted hover:text-white transition-colors text-sm"
                    >
                      <item.icon size={16} className="text-primary" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/templates"
              className="block text-white hover:text-primary transition-colors py-3 font-medium text-base"
              onClick={() => setMobileOpen(false)}
            >
              Templates
            </Link>

            {/* Mobile auth links */}
            <div className="pt-4 mt-4 border-t border-border space-y-3">
              <Link
                href="/login"
                className="block text-center text-sm font-medium text-white bg-white/10 border border-white/15 rounded-full px-5 py-2.5 hover:bg-white/20 transition-colors sm:hidden"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="block text-center text-sm font-semibold bg-primary hover:bg-primary-hover shadow-blue text-white px-5 py-2.5 rounded-full transition-all sm:hidden"
                onClick={() => setMobileOpen(false)}
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
