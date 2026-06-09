"use client";

import Link from "next/link";
import { MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NegotiationTipsPage() {
  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="py-24 px-6 bg-bg-dark text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-display leading-tight">
            How to negotiate your price without losing the client.
          </h1>
          <p className="text-lg text-text-muted mb-10 leading-relaxed font-body max-w-2xl mx-auto">
            Practical strategies for freelancers navigating pushback, lowball offers, and scope creep.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6 bg-surface text-text-dark">
        <div className="max-w-3xl mx-auto prose prose-lg prose-slate max-w-none font-body text-text-secondary leading-relaxed">
          
          <h2 className="font-display font-bold text-text-dark text-3xl mt-8 mb-6">1. The psychology of client pushback</h2>
          <p className="mb-4">When a client pushes back on your price, it is rarely an insult. Usually, it means one of three things:</p>
          <ul className="list-disc pl-6 mb-8 space-y-2">
            <li><strong>They are testing your confidence.</strong> They want to know if you actually believe in the value you&apos;re quoting.</li>
            <li><strong>They genuinely don&apos;t understand the scope.</strong> They think a website is just &quot;putting some pictures on a page.&quot;</li>
            <li><strong>They actually don&apos;t have the budget.</strong> But they still want *you* to do the work.</li>
          </ul>

          <h2 className="font-display font-bold text-text-dark text-3xl mt-12 mb-6">2. The 5 rules of freelance negotiation</h2>
          <div className="space-y-4 mb-8">
            <p><strong>Rule 1: Never discount before you explain value.</strong> If you drop your price immediately, you&apos;re telling them your first price was a lie.</p>
            <p><strong>Rule 2: The counter-offer frame.</strong> If they ask for a discount, don&apos;t just lower the price. Lower the scope. &quot;I can do it for ₦200k if we remove the secondary deliverables.&quot;</p>
            <p><strong>Rule 3: How to say no without saying no.</strong> Instead of &quot;No, I won&apos;t do that,&quot; say &quot;Yes, we can add that to the scope. The revised estimate will be ₦X.&quot;</p>
            <p><strong>Rule 4: Silence is a tool.</strong> When you state your price on a call, stop talking. Do not immediately fill the silence by justifying the cost.</p>
            <p><strong>Rule 5: The walk-away signal.</strong> Be mentally prepared to lose the deal. Clients can smell desperation.</p>
          </div>

          <h2 className="font-display font-bold text-text-dark text-3xl mt-12 mb-6">3. Word-for-word response templates</h2>
          <p className="mb-8">Here are exact scripts you can use for the most common pushback scenarios.</p>

          <div className="space-y-8 mb-12">
            {/* Scenario 1 */}
            <div className="bg-surface border border-border-light rounded-xl overflow-hidden shadow-sm">
              <div className="bg-surface-secondary border-l-4 border-primary p-6">
                <p className="text-sm font-semibold text-text-muted font-display uppercase tracking-wider mb-2">The Client says:</p>
                <p className="text-lg font-medium text-text-dark italic">&quot;Your price is much higher than we expected.&quot;</p>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-primary font-display uppercase tracking-wider mb-2">How to respond:</p>
                <p className="text-text-dark font-medium bg-gray-50 p-4 rounded-lg">
                  &quot;I understand this is a significant investment. My pricing reflects the deep strategy and zero-handholding approach I bring. We can absolutely look at reducing the scope to fit a smaller budget. Which of the deliverables would you like to prioritize?&quot;
                </p>
              </div>
            </div>

            {/* Scenario 2 */}
            <div className="bg-surface border border-border-light rounded-xl overflow-hidden shadow-sm">
              <div className="bg-surface-secondary border-l-4 border-primary p-6">
                <p className="text-sm font-semibold text-text-muted font-display uppercase tracking-wider mb-2">The Client says:</p>
                <p className="text-lg font-medium text-text-dark italic">&quot;I have another freelancer who can do it for half the price.&quot;</p>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-primary font-display uppercase tracking-wider mb-2">How to respond:</p>
                <p className="text-text-dark font-medium bg-gray-50 p-4 rounded-lg">
                  &quot;That sounds like a great deal. If budget is the primary concern right now, it might make sense to go with them. However, if you are looking for the strategic quality and reliability we discussed on our call, I&apos;d love to work together.&quot;
                </p>
              </div>
            </div>

            {/* Scenario 3 */}
            <div className="bg-surface border border-border-light rounded-xl overflow-hidden shadow-sm">
              <div className="bg-surface-secondary border-l-4 border-primary p-6">
                <p className="text-sm font-semibold text-text-muted font-display uppercase tracking-wider mb-2">The Client says:</p>
                <p className="text-lg font-medium text-text-dark italic">&quot;Can we start with a small part first to test the waters?&quot;</p>
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold text-primary font-display uppercase tracking-wider mb-2">How to respond:</p>
                <p className="text-text-dark font-medium bg-gray-50 p-4 rounded-lg">
                  &quot;Absolutely. I recommend starting with a standalone strategy sprint. The cost for that is ₦X. If we decide to move forward with the full project afterward, we can apply that payment toward the total project fee.&quot;
                </p>
              </div>
            </div>
          </div>

          <h2 className="font-display font-bold text-text-dark text-3xl mt-12 mb-6">4. When to walk away</h2>
          <p className="mb-4">Sometimes, no negotiation script will save the deal. Walk away if the client:</p>
          <ul className="list-disc pl-6 mb-12 space-y-2">
            <li>Refuses to sign a contract or agree to an upfront deposit.</li>
            <li>Disrespects your time (missing calls, demanding immediate weekend responses).</li>
            <li>Says &quot;this will be great exposure for your portfolio.&quot;</li>
          </ul>

          <div className="bg-bg-dark-2 text-white rounded-2xl p-8 mt-12 text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare size={32} className="text-primary" />
            </div>
            <h2 className="font-display font-bold text-2xl mb-4">Practice these scenarios before your next call.</h2>
            <p className="mb-8 text-text-muted max-w-lg mx-auto">
              Want to get comfortable defending your rates? Use Kova, Pricis&apos;s AI negotiation assistant, to run practice roleplays.
            </p>
            <Link href="/signup" className="inline-flex bg-primary hover:bg-primary-hover shadow-blue text-white font-semibold px-8 py-3.5 rounded-full transition-all font-body">
              Practice with Kova
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
