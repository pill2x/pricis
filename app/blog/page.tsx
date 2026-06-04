"use client";

import { useState } from "react";
import { BookOpen, Send } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="py-24 px-6 bg-bg-dark text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-display leading-tight">
            The Pricis Blog
          </h1>
          <p className="text-lg text-text-muted mb-10 leading-relaxed font-body max-w-2xl mx-auto">
            Pricing strategy, negotiation playbooks, and freelance growth — for African service providers.
          </p>
        </div>
      </section>

      {/* Coming Soon State */}
      <section className="py-24 px-6 bg-surface text-text-dark text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-primary-light rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
            <BookOpen size={32} className="text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark font-display mb-6">
            First post coming soon.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed font-body mb-10">
            We're writing about the things that actually matter to African freelancers — how to price a rebrand in Lagos, how to respond when a client ghosts after seeing your quote, and why 'exposure' isn't a payment method.
          </p>
          
          <div className="max-w-md mx-auto">
            {submitted ? (
              <div className="bg-success/10 text-success font-medium py-4 rounded-xl text-sm font-body">
                Thanks for subscribing! We'll notify you when we launch.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 bg-surface border border-border-light rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary font-body"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-xl transition-colors font-body text-sm shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Notify Me <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Topics Preview */}
      <section className="py-24 px-6 bg-surface-secondary text-text-dark border-t border-border-light">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark font-display mb-4">
              What we'll be writing about.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Pricing for Nigerian Clients",
              "Handling Scope Creep",
              "Negotiation Scripts That Work",
              "Building a Rate Card",
              "Client Red Flags",
              "Raising Your Rates Without Losing Clients"
            ].map((topic, i) => (
              <div key={i} className="bg-surface border border-border-light rounded-xl p-6 text-center shadow-sm hover:border-primary/30 transition-colors">
                <span className="font-semibold text-text-dark font-display text-base">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
