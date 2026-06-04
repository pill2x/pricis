"use client";

import Link from "next/link";
import { Twitter, Linkedin, Instagram, Send, Mail } from "lucide-react";
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
      <section className="py-24 px-6 bg-surface-secondary border-t border-border-light" data-section="newsletter">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-12 h-12 rounded-xl bg-primary-light text-primary flex items-center justify-center mx-auto mb-6">
            <Mail size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark font-display mb-4">
            Stay ahead of the <span className="text-primary">game</span>
          </h2>
          <p className="text-text-secondary font-body text-base mb-8 max-w-lg mx-auto leading-relaxed">
            Get weekly pricing tips, negotiation strategies, and product updates. Join 2,500+ freelancers who price smarter.
          </p>
          {subscribed ? (
            <div className="max-w-md mx-auto mb-4 bg-success/10 border border-success/20 text-success py-3 px-6 rounded-full font-semibold font-body shadow-sm">
              Thanks for subscribing! 🎉
            </div>
          ) : (
            <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-4" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 w-full bg-white border border-border-light rounded-full px-5 py-3 text-sm text-text-dark placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors shadow-sm"
                required
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-blue flex-shrink-0"
              >
                Subscribe <Send size={16} />
              </button>
            </form>
          )}
          <p className="text-xs text-text-muted font-body">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-dark border-t border-border pt-20 pb-8 px-6 text-text-muted text-sm font-body" data-section="footer">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 block">
              <Logo variant="muted" />
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
