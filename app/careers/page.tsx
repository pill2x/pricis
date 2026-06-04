"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CareersPage() {
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
            We're building the team.
          </h1>
          <p className="text-lg text-text-muted mb-10 leading-relaxed font-body max-w-2xl mx-auto">
            Pricis is early-stage and moving fast. We're not hiring formally yet — but if you're exceptional and care about this problem, we want to hear from you.
          </p>
        </div>
      </section>

      {/* Not Hiring Yet */}
      <section className="py-24 px-6 bg-surface text-text-dark text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-8">🚀</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark font-display mb-6">
            No open roles right now.
          </h2>
          <p className="text-lg text-text-secondary leading-relaxed font-body mb-12">
            We're a small, focused team building fast. When we're ready to grow, we'll post here first — and we'll be looking for people who care deeply about the African creator economy.
          </p>
          
          <div className="bg-surface-secondary border border-border-light rounded-2xl p-8 max-w-md mx-auto">
            <h3 className="font-bold text-text-dark font-display mb-2 text-lg">Want to be notified when we hire?</h3>
            <p className="text-sm text-text-secondary font-body mb-6">Join our career waitlist.</p>
            
            {submitted ? (
              <div className="bg-success/10 text-success font-medium py-3 rounded-lg text-sm font-body">
                You're on the list! We'll keep in touch.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full bg-surface border border-border-light rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary font-body"
                />
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition-colors font-body text-sm shadow-sm"
                >
                  Notify Me
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-surface-secondary text-text-dark border-t border-border-light">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-dark font-display mb-4">
              What we value
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-surface border border-border-light p-8 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-text-dark mb-3 font-display">Craft over speed</h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body">
                We believe in moving fast, but not at the expense of quality. We take pride in building robust, elegant solutions.
              </p>
            </div>
            <div className="bg-surface border border-border-light p-8 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-text-dark mb-3 font-display">Context-awareness</h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body">
                Understanding the African market isn't optional, it's the job. We design and build for the realities of our users.
              </p>
            </div>
            <div className="bg-surface border border-border-light p-8 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-text-dark mb-3 font-display">Directness</h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body">
                We say what we mean. Clear, honest communication saves time and builds trust within the team.
              </p>
            </div>
            <div className="bg-surface border border-border-light p-8 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-text-dark mb-3 font-display">Ownership</h3>
              <p className="text-sm text-text-secondary leading-relaxed font-body">
                Everyone on this team is a builder, not just an executor. We take responsibility for outcomes, not just output.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
