"use client";

import Link from "next/link";
import { Linkedin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="py-24 px-6 bg-bg-dark text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-display leading-tight">
            Built for the African freelancer. <br className="hidden md:block" />
            <span className="text-primary">By someone who gets it.</span>
          </h1>
          <p className="text-lg text-text-muted mb-10 leading-relaxed font-body max-w-2xl mx-auto">
            Pricis was born from a simple frustration: talented African freelancers were doing world-class work and charging far less than they were worth — not from lack of skill, but lack of tools.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6 bg-surface text-text-dark">
        <div className="max-w-3xl mx-auto text-lg text-text-secondary font-body leading-relaxed space-y-6">
          <p>
            Nigerian freelancers — designers, developers, writers, consultants — are some of the most talented in the world. But most of them have never had a tool that understands their market.
          </p>
          <p>
            The pricing tools that exist were built for US and European rates, and the negotiation support? Nonexistent.
          </p>
          <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 text-2xl font-display font-bold text-text-dark leading-snug">
            We're not trying to be Bonsai or HoneyBook. We're building the tool those platforms never thought to build — the one for us.
          </blockquote>
          <p>
            Pricis changes that. We built a scope generator calibrated for African market reality, and a negotiation AI (Kova) that helps freelancers hold their ground when clients push back.
          </p>
          <p>
            We're early. The product is live, the community is growing, and we're just getting started.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-surface-secondary text-text-dark border-t border-border-light">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark font-display mb-4">
              What we stand for
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-surface border border-border-light p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-text-dark mb-4 font-display">Built for Africa First</h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body">
                Not adapted from the West. Built from Lagos, for Lagos — and every other city where freelancers are doing serious work.
              </p>
            </div>
            <div className="bg-surface border border-border-light p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-text-dark mb-4 font-display">Honest Tools</h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body">
                We don't hide limits in fine print. We tell you exactly what you get on every plan.
              </p>
            </div>
            <div className="bg-surface border border-border-light p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-text-dark mb-4 font-display">Freelancer Sovereignty</h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body">
                Your pricing is your power. Pricis is here to protect it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-surface text-text-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark font-display">
              The team
            </h2>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-surface border border-border-light p-8 rounded-2xl shadow-sm max-w-sm text-center">
              <div className="w-24 h-24 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-display font-bold text-primary">D</span>
              </div>
              <h3 className="text-xl font-bold text-text-dark mb-1 font-display">Daniel</h3>
              <p className="text-sm font-semibold text-primary mb-4 font-body">Founder & Builder</p>
              <p className="text-sm text-text-secondary leading-relaxed font-body mb-6">
                Product thinker and builder. Building Pricis to give African freelancers the pricing and negotiation tools they've always needed.
              </p>
              <a href="#" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-surface-secondary text-text-muted hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dark CTA */}
      <section className="py-24 px-6 bg-bg-dark text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 font-display">
            Ready to join us?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup" className="w-full sm:w-auto bg-primary hover:bg-primary-hover shadow-blue text-white font-semibold px-8 py-3.5 rounded-full transition-all font-body text-center">
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
