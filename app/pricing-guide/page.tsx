"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PricingGuidePage() {
  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="py-24 px-6 bg-bg-dark text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-primary-light text-primary text-xs font-semibold px-3 py-1 rounded-full mb-6 font-body">
            15 min read
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-display leading-tight">
            The Nigerian Freelancer&apos;s Pricing Guide
          </h1>
          <p className="text-lg text-text-muted mb-10 leading-relaxed font-body max-w-2xl mx-auto">
            Everything you need to know about setting your rates, structuring your pricing, and charging what you&apos;re worth in the Nigerian market.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 bg-surface text-text-dark relative">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* Sticky Table of Contents (Desktop) */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-4">
              <h3 className="font-bold text-text-dark font-display mb-4 text-lg">In this guide</h3>
              <ul className="space-y-3 font-body text-sm text-text-secondary">
                <li><a href="#section-1" className="hover:text-primary transition-colors block">1. Why Pricing is Hard</a></li>
                <li><a href="#section-2" className="hover:text-primary transition-colors block">2. How to Set Your Base Rate</a></li>
                <li><a href="#section-3" className="hover:text-primary transition-colors block">3. Understanding Client Types</a></li>
                <li><a href="#section-4" className="hover:text-primary transition-colors block">4. Common Pricing Mistakes</a></li>
                <li><a href="#section-5" className="hover:text-primary transition-colors block">5. Rate Benchmarks</a></li>
                <li><a href="#section-6" className="font-semibold text-primary block mt-4">Using Pricis to Get it Right</a></li>
              </ul>
            </div>
          </div>

          {/* Article Body */}
          <div className="flex-1 max-w-3xl">
            <div className="prose prose-lg prose-slate max-w-none font-body text-text-secondary leading-relaxed">
              
              <h2 id="section-1" className="font-display font-bold text-text-dark text-3xl mt-12 mb-6 scroll-mt-24">1. Why Pricing is Hard for Nigerian Freelancers</h2>
              <p className="mb-4">
                Pricing is inherently difficult for freelancers anywhere, but doing it in Nigeria introduces unique complexities. We&apos;re dealing with extreme currency fluctuations, a wide disparity in client budgets, and a cultural expectation of haggling.
              </p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li><strong>The Western tool problem:</strong> Most pricing calculators assume you&apos;re charging in dollars for a US-based client.</li>
                <li><strong>Market rate confusion:</strong> Rates are highly opaque. You rarely know what your peers are charging.</li>
                <li><strong>The confidence gap:</strong> Many freelancers undervalue themselves out of fear of losing the gig entirely.</li>
                <li><strong>Social pressure:</strong> &quot;Please do it for me, I&apos;ll recommend you to others.&quot; (Also known as: exposure).</li>
              </ul>

              <h2 id="section-2" className="font-display font-bold text-text-dark text-3xl mt-12 mb-6 scroll-mt-24">2. How to Set Your Base Rate</h2>
              <p className="mb-4">Before you can quote for a specific project, you need a baseline. There are three main ways to establish this:</p>
              
              <h3 className="font-display font-bold text-text-dark text-xl mt-6 mb-3">The Cost-of-Living Method (Minimum viable rate)</h3>
              <p className="mb-4">Calculate your monthly expenses (rent, food, data, power, tools). Add 30% for savings/taxes. Divide by the number of billable hours you want to work. This is the absolute minimum you should accept.</p>
              
              <h3 className="font-display font-bold text-text-dark text-xl mt-6 mb-3">The Market Rate Method (Safe baseline)</h3>
              <p className="mb-4">Find out what peers with your exact skill level are charging. Match it. This is safe, but it makes you a commodity.</p>

              <h3 className="font-display font-bold text-text-dark text-xl mt-6 mb-3">The Value-Based Pricing Method (The goal)</h3>
              <p className="mb-8">Don&apos;t price based on hours. Price based on the value the work creates for the client. If your branding helps a startup raise $100k, a $5k fee is a bargain. This requires deep understanding of the client&apos;s business.</p>

              <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 text-2xl font-display font-bold text-primary leading-snug bg-primary/5 rounded-r-xl">
                &quot;Never let a client dictate your worth. Your rate is your rate. If they can&apos;t afford it, they are not your client right now.&quot;
              </blockquote>

              <h2 id="section-3" className="font-display font-bold text-text-dark text-3xl mt-12 mb-6 scroll-mt-24">3. Understanding Client Types</h2>
              <p className="mb-4">In the African market, who the client is matters just as much as what the project is.</p>
              <ul className="list-disc pl-6 mb-8 space-y-2">
                <li><strong>SME clients:</strong> Often have lower budgets but expect higher involvement and faster turnaround. Price with a clear boundary on revisions.</li>
                <li><strong>Corporate clients:</strong> Higher budgets, but excruciatingly slow payment processes (net-30 or net-60). Build a &quot;waiting buffer&quot; into your price.</li>
                <li><strong>Diaspora clients:</strong> Usually paying in foreign currency. They expect global standards. Price accordingly, but don&apos;t just multiply your Naira rate by the exchange rate—charge market rate for their locale.</li>
              </ul>

              <h2 id="section-4" className="font-display font-bold text-text-dark text-3xl mt-12 mb-6 scroll-mt-24">4. Common Pricing Mistakes</h2>
              <div className="space-y-4 mb-8">
                <p>❌ <strong>Charging per hour for creative work:</strong> As you get faster, you get paid less. That makes no sense. Switch to project-based pricing.</p>
                <p>❌ <strong>Not including revision limits:</strong> &quot;Unlimited revisions&quot; is the quickest path to burnout. State explicitly: &quot;Includes 2 rounds of revisions. Additional rounds billed at ₦X.&quot;</p>
                <p>❌ <strong>Discounting before they ask:</strong> Never negotiate with yourself. State your price confidently and stop talking.</p>
              </div>

              <h2 id="section-5" className="font-display font-bold text-text-dark text-3xl mt-12 mb-6 scroll-mt-24">5. Rate Benchmarks by Service</h2>
              <p className="mb-6">Based on our research across the Nigerian freelance market in 2024. These are project-based minimums.</p>
              
              <div className="bg-surface border border-border-light rounded-xl overflow-hidden mb-12 shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface-secondary border-b border-border-light">
                    <tr>
                      <th className="py-4 px-6 font-display text-text-dark">Service</th>
                      <th className="py-4 px-6 font-display text-text-dark">Entry Level</th>
                      <th className="py-4 px-6 font-display text-text-dark">Mid-Level</th>
                      <th className="py-4 px-6 font-display text-text-dark">Senior</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light">
                    <tr>
                      <td className="py-4 px-6 font-medium text-text-dark">Logo Design</td>
                      <td className="py-4 px-6">₦50k – ₦80k</td>
                      <td className="py-4 px-6">₦150k – ₦300k</td>
                      <td className="py-4 px-6">₦500k – ₦1.5M</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium text-text-dark">Website Design</td>
                      <td className="py-4 px-6">₦200k – ₦500k</td>
                      <td className="py-4 px-6">₦800k – ₦2M</td>
                      <td className="py-4 px-6">₦3M – ₦10M</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium text-text-dark">Copywriting (per page)</td>
                      <td className="py-4 px-6">₦15k – ₦30k</td>
                      <td className="py-4 px-6">₦50k – ₦100k</td>
                      <td className="py-4 px-6">₦150k – ₦300k</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium text-text-dark">Social Media (monthly)</td>
                      <td className="py-4 px-6">₦80k – ₦150k</td>
                      <td className="py-4 px-6">₦200k – ₦400k</td>
                      <td className="py-4 px-6">₦600k – ₦1.2M</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-medium text-text-dark">Video Editing (per video)</td>
                      <td className="py-4 px-6">₦30k – ₦80k</td>
                      <td className="py-4 px-6">₦150k – ₦350k</td>
                      <td className="py-4 px-6">₦500k – ₦1.5M</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div id="section-6" className="bg-primary-light border-2 border-primary/20 rounded-2xl p-8 mt-16 scroll-mt-24">
                <h2 className="font-display font-bold text-text-dark text-2xl mb-4">Stop guessing. Start using Pricis.</h2>
                <p className="mb-6 text-text-dark">
                  Memorizing benchmarks is hard. Figuring out exactly where your client fits on the scale is harder. Pricis takes your service, reads your client&apos;s context, and generates a calibrated price instantly.
                </p>
                <Link href="/signup" className="inline-flex bg-primary hover:bg-primary-hover shadow-blue text-white font-semibold px-6 py-3 rounded-full transition-all font-body text-sm">
                  Generate your first scope free →
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
