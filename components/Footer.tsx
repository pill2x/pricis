"use client";

import Link from "next/link";
import { Twitter, Linkedin, Instagram, Send } from "lucide-react";
import Logo from "@/components/Logo";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <>
      {/* Newsletter Section */}
      <section className="py-24 px-6 bg-bg-dark border-t border-border" data-section="newsletter">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-display mb-4">
            Ready to price with <span className="text-primary">confidence?</span>
          </h2>
          <p className="text-text-muted font-body text-lg mb-8 leading-relaxed">
            Join thousands of freelancers who now charge what they&apos;re worth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/signup"
              className="w-full sm:w-auto bg-primary hover:bg-primary-hover shadow-blue text-white font-semibold px-8 py-3.5 rounded-full transition-all font-body text-center"
            >
              Get Started Free
            </Link>
            <Link
              href="/pricing"
              className="w-full sm:w-auto bg-white/5 border border-white/15 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-full transition-all font-body text-center"
            >
              See Pricing
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-text-muted font-body">
            <span className="flex items-center gap-1.5">
              <span className="text-success">✓</span> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-success">✓</span> Free forever plan
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-success">✓</span> Upgrade anytime
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-dark border-t border-border pt-20 pb-8 px-6 text-text-muted text-sm font-body" data-section="footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 block">
              <Logo variant="light" />
            </Link>
            <p className="mb-8 font-medium text-text-muted text-base leading-relaxed max-w-sm">
              Price with <span className="text-primary">confidence</span>.
              <br />
              Negotiate with <span className="text-success">clarity</span>.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide">Product</h4>
            <ul className="space-y-4 font-medium">
              <li><Link href="/features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="/templates" className="hover:text-primary transition-colors">Templates</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide">Resources</h4>
            <ul className="space-y-4 font-medium">
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/pricing-guide" className="hover:text-primary transition-colors">Pricing Guide</Link></li>
              <li><Link href="/negotiation-tips" className="hover:text-primary transition-colors">Negotiation Tips</Link></li>
              <li><Link href="/help-center" className="hover:text-primary transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide">Company</h4>
            <ul className="space-y-4 font-medium">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>

            <h4 className="text-white font-semibold mb-4 mt-8 tracking-wide">Stay in the loop</h4>
            {subscribed ? (
              <p className="text-success text-sm font-medium">Thanks for subscribing! 🎉</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-white placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-full text-xs font-semibold transition-colors flex-shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border text-xs font-medium">
          <p>© 2025 Pricis. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
