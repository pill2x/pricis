"use client";

import Link from "next/link";
import { FileText, MessageSquare, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      `}</style>
      
      <div className="min-h-screen" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#FFFFFF', color: '#0A0F1E' }}>
        
        {/* Navbar */}
        <nav 
          className="sticky top-0 z-50 bg-white border-b border-[#E8EAED]"
          style={{ height: '60px' }}
        >
          <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
            <Link 
              href="/" 
              className="font-bold text-xl"
              style={{ color: '#0A0F1E' }}
            >
              Pricis
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/login"
                className="text-sm hover:text-[#0A0F1E] transition-colors"
                style={{ color: '#4B5563' }}
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#1D4ED8] transition-colors"
                style={{ 
                  backgroundColor: '#2563EB',
                  color: 'white'
                }}
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section 
          className="text-center"
          style={{ paddingTop: '96px', paddingBottom: '64px', backgroundColor: '#FFFFFF' }}
        >
          <div className="max-w-4xl mx-auto px-6">
            {/* Eyebrow badge */}
            <div 
              className="inline-block mb-8"
              style={{ 
                backgroundColor: '#FBF6E9',
                color: '#B8860B',
                border: '1px solid #E8D5A3',
                fontSize: '12px',
                fontWeight: '500',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                padding: '6px 12px',
                borderRadius: '9999px'
              }}
            >
              For Freelancers & Service Providers
            </div>

            {/* Headline */}
            <h1 
              className="font-black mb-6"
              style={{ 
                fontSize: 'clamp(48px, 8vw, 80px)',
                letterSpacing: '-0.03em',
                lineHeight: '0.92',
                color: '#0A0F1E'
              }}
            >
              Know exactly
              <br />
              <span style={{ color: '#2563EB' }}>what to charge.</span>
            </h1>

            {/* Subtext */}
            <p 
              className="mb-10 leading-relaxed"
              style={{ 
                fontSize: 'clamp(18px, 2vw, 20px)',
                color: '#4B5563',
                maxWidth: '640px',
                margin: '0 auto 40px'
              }}
            >
              Pricis generates professional pricing and scope documents in seconds — so you stop undercharging and start getting paid what your work is worth. Then when the client pushes back? We&apos;ve got that covered too.
            </p>

            {/* CTA buttons */}
            <div className="flex justify-center gap-3 mb-4">
              <Link
                href="/generate"
                className="font-bold rounded-xl transition-colors"
                style={{ 
                  backgroundColor: '#2563EB',
                  color: '#white',
                  fontSize: '16px',
                  padding: '14px 28px',
                  boxShadow: '0 4px 14px rgba(37,99,235,0.25)'
                }}
              >
                Generate Your Free Scope →
              </Link>
              <Link
                href="/signup"
                className="font-medium rounded-xl transition-all"
                style={{ 
                  border: '1px solid #E8EAED',
                  color: '#4B5563',
                  fontSize: '16px',
                  padding: '14px 24px'
                }}
              >
                Try Negotiation Assistant →
              </Link>
            </div>

            <p 
              className="text-sm"
              style={{ color: '#9CA3AF' }}
            >
              No sign-up required · Free forever
            </p>
          </div>
        </section>

        {/* Product Mockup Card */}
        <section 
          className="mt-16"
          style={{ maxWidth: '672px', margin: '0 auto', padding: '0 24px' }}
        >
          <div 
            className="rounded-2xl overflow-hidden"
            style={{ 
              border: '1px solid #E8EAED',
              boxShadow: '0 20px 60px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
              backgroundColor: '#FFFFFF'
            }}
          >
            {/* Browser bar */}
            <div 
              className="flex items-center gap-2"
              style={{ 
                backgroundColor: '#F7F8FA',
                borderBottom: '1px solid #E8EAED',
                padding: '12px 16px'
              }}
            >
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#E8545A' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F5BE4F' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#56C15E' }} />
              <span 
                className="ml-4 text-xs"
                style={{ color: '#9CA3AF' }}
              >
                pricis.co/scope/mj8k2
              </span>
            </div>

            {/* Content */}
            <div style={{ padding: '24px' }}>
              {/* Tag */}
              <div 
                className="inline-block mb-3"
                style={{ 
                  backgroundColor: '#FBF6E9',
                  color: '#B8860B',
                  border: '1px solid #E8D5A3',
                  fontSize: '12px',
                  fontWeight: '500',
                  padding: '4px 10px',
                  borderRadius: '9999px'
                }}
              >
                UI/UX Design · Senior
              </div>

              {/* Title */}
              <h3 
                className="font-bold mb-4"
                style={{ 
                  fontSize: '20px',
                  color: '#0A0F1E'
                }}
              >
                Mobile App Redesign — Fintech
              </h3>

              {/* Divider */}
              <div style={{ borderTop: '1px solid #E8EAED', marginBottom: '20px' }} />

              {/* Pricing */}
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div>
                  <p 
                    className="text-xs uppercase tracking-wide mb-1"
                    style={{ color: '#9CA3AF' }}
                  >
                    Conservative
                  </p>
                  <p 
                    className="text-lg font-bold"
                    style={{ color: '#0A0F1E' }}
                  >
                    ₦120,000
                  </p>
                </div>
                <div style={{ position: 'relative' }}>
                  <div style={{ 
                    position: 'absolute',
                    top: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#2563EB'
                  }} />
                  <p 
                    className="text-xs uppercase tracking-wide mb-1"
                    style={{ color: '#9CA3AF' }}
                  >
                    Standard
                  </p>
                  <p 
                    className="text-lg font-bold"
                    style={{ color: '#2563EB' }}
                  >
                    ₦200,000
                  </p>
                </div>
                <div>
                  <p 
                    className="text-xs uppercase tracking-wide mb-1"
                    style={{ color: '#9CA3AF' }}
                  >
                    Premium
                  </p>
                  <p 
                    className="text-lg font-bold"
                    style={{ color: '#0A0F1E' }}
                  >
                    ₦320,000
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2">
                <div 
                  className="rounded-lg"
                  style={{ 
                    backgroundColor: '#F7F8FA',
                    border: '1px solid #E8EAED',
                    fontSize: '12px',
                    color: '#4B5563',
                    padding: '6px 12px'
                  }}
                >
                  12 Deliverables
                </div>
                <div 
                  className="rounded-lg"
                  style={{ 
                    backgroundColor: '#F7F8FA',
                    border: '1px solid #E8EAED',
                    fontSize: '12px',
                    color: '#4B5563',
                    padding: '6px 12px'
                  }}
                >
                  3 Revision rounds
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industries Strip */}
        <section 
          className="mt-20 py-12"
          style={{ 
            borderTop: '1px solid #E8EAED',
            borderBottom: '1px solid #E8EAED',
            backgroundColor: '#F7F8FA'
          }}
        >
          <p 
            className="text-center mb-7"
            style={{ 
              fontSize: '12px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#9CA3AF'
            }}
          >
            Built for every type of freelancer
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 px-6">
            {[
              "UI/UX Design", "Web Development", "Copywriting", "Video Editing",
              "Photography", "Social Media", "Graphic Design", "Brand Strategy"
            ].map((industry) => (
              <div
                key={industry}
                className="rounded-full transition-colors cursor-default"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E8EAED',
                  fontSize: '14px',
                  color: '#4B5563',
                  padding: '8px 16px'
                }}
              >
                {industry}
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section 
          className="py-28 px-6"
          style={{ backgroundColor: '#FFFFFF' }}
        >
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <p 
                className="mb-4"
                style={{ 
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#2563EB',
                  fontWeight: '500'
                }}
              >
                How it works
              </p>
              
              <h2 
                className="font-black"
                style={{ 
                  fontSize: 'clamp(36px, 5vw, 48px)',
                  letterSpacing: '-0.02em',
                  lineHeight: '1.2',
                  color: '#0A0F1E'
                }}
              >
                From first quote to<br />
                final agreement.
              </h2>
              
              <p 
                className="mt-4 text-lg"
                style={{ color: '#4B5563' }}
              >
                Two tools. One workflow.
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Card 1 */}
              <div 
                className="group rounded-2xl p-8 transition-all"
                style={{ 
                  backgroundColor: '#F7F8FA',
                  border: '1px solid #E8EAED'
                }}
              >
                <p 
                  className="mb-5"
                  style={{ 
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#2563EB',
                    fontWeight: '500'
                  }}
                >
                  STEP 01
                </p>
                
                <div 
                  className="flex items-center justify-center mb-5 rounded-xl"
                  style={{ 
                    width: '44px',
                    height: '44px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8EAED',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}
                >
                  <FileText size={20} color="#2563EB" />
                </div>
                
                <h3 
                  className="text-xl font-bold mb-3"
                  style={{ color: '#0A0F1E' }}
                >
                  Know what to charge
                </h3>
                
                <p 
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: '#4B5563' }}
                >
                  Generate a professional scope and accurate pricing in seconds. Export a PDF your client can accept digitally.
                </p>
                
                <Link
                  href="/generate"
                  className="inline-flex items-center gap-1.5 font-semibold transition-all group-hover:gap-2.5"
                  style={{ 
                    fontSize: '14px',
                    color: '#2563EB'
                  }}
                >
                  Generate Scope
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Card 2 */}
              <div 
                className="group rounded-2xl p-8 transition-all"
                style={{ 
                  backgroundColor: '#F7F8FA',
                  border: '1px solid #E8EAED'
                }}
              >
                <p 
                  className="mb-5"
                  style={{ 
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#2563EB',
                    fontWeight: '500'
                  }}
                >
                  STEP 02
                </p>
                
                <div 
                  className="flex items-center justify-center mb-5 rounded-xl"
                  style={{ 
                    width: '44px',
                    height: '44px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E8EAED',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}
                >
                  <MessageSquare size={20} color="#2563EB" />
                </div>
                
                <h3 
                  className="text-xl font-bold mb-3"
                  style={{ color: '#0A0F1E' }}
                >
                  Hold your ground
                </h3>
                
                <p 
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: '#4B5563' }}
                >
                  When the client negotiates, you&apos;re ready. Get strategy, draft responses, and practice the conversation before it happens.
                </p>
                
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-1.5 font-semibold transition-all group-hover:gap-2.5"
                  style={{ 
                    fontSize: '14px',
                    color: '#2563EB'
                  }}
                >
                  Try Negotiation Assistant
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section 
          className="py-28 px-6 text-center"
          style={{ backgroundColor: '#0A0F1E' }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 
              className="font-black"
              style={{ 
                fontSize: 'clamp(36px, 6vw, 60px)',
                letterSpacing: '-0.03em',
                lineHeight: '1.2',
                color: '#FFFFFF'
              }}
            >
              Stop guessing.
              <br />
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>
                Start charging with confidence.
              </span>
            </h2>
            
            <p 
              className="mt-6 text-lg"
              style={{ 
                color: 'rgba(255,255,255,0.5)',
                maxWidth: '512px',
                margin: '24px auto 0'
              }}
            >
              Join freelancers who know their worth — and charge accordingly.
            </p>
            
            <Link
              href="/signup"
              className="inline-block mt-10 font-bold rounded-xl transition-colors"
              style={{ 
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                fontSize: '16px',
                padding: '16px 32px'
              }}
            >
              Get Started Free →
            </Link>
            
            <p 
              className="mt-4 text-sm"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Free to use · No credit card required
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer 
          style={{ 
            backgroundColor: '#060B14',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '32px 24px'
          }}
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span 
                className="font-bold text-lg"
                style={{ color: '#FFFFFF' }}
              >
                Pricis
              </span>
              <span 
                className="text-sm"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                2025
              </span>
            </div>
            <p 
              className="text-sm"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Built for freelancers who know their worth.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
