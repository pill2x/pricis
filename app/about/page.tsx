"use client";

import Link from "next/link";
import { Linkedin, Sparkles, Target, Zap, ShieldAlert, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#080D1A] text-white font-body selection:bg-primary selection:text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-[#080D1A] text-white">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent rounded-full blur-[120px] opacity-80 pointer-events-none"></div>
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[128px] opacity-40 pointer-events-none"></div>
          <div className="absolute top-40 -right-40 w-96 h-96 bg-success/5 rounded-full blur-[128px] opacity-40 pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/25 mb-8 backdrop-blur-md shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">Our Mission</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8 leading-tight text-white">
            Built for the African freelancer. <br className="hidden md:block" />
            <span className="text-primary">By someone who gets it.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
            Pricis was born from a simple frustration: talented African freelancers were doing world-class work and charging far less than they were worth — not from lack of skill, but lack of tools.
          </p>
        </div>
      </section>

      {/* Main Team Banner Section */}
      <section className="py-6 bg-[#080D1A]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative rounded-[2rem] overflow-hidden aspect-[2.1/1] border border-white/10 shadow-2xl animate-fade-in">
            <img 
              src="/images/team_banner.png" 
              alt="Pricis Team Collaborating" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent opacity-80"></div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6 bg-white text-text-dark border-t border-b border-[#E5EAF2]">
        <div className="max-w-4xl mx-auto">
          <div className="text-lg text-text-secondary font-body leading-relaxed space-y-6 animate-fade-in-up">
            <p className="text-xl font-bold text-[#0F172A]">
              Nigerian freelancers — designers, developers, writers, consultants — are some of the most talented in the world. But most of them have never had a tool that understands their market.
            </p>
            <p>
              The pricing tools that exist were built for US and European rates, and their translation of our local nuances? Nonexistent. Undercharging became a default strategy just to secure deals, leaving creative talent burnt out and underpaid.
            </p>
            <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 text-2xl font-display font-bold text-[#0F172A] leading-snug">
              "We're not trying to be Bonsai or HoneyBook. We're building the tool those platforms never thought to build — the one for us."
            </blockquote>
            <p>
              Pricis changes that. We built a scope generator calibrated for African market reality, and a negotiation AI (Kova) that helps freelancers hold their ground when clients push back.
            </p>
            <p>
              We're early. The product is live, the community is growing, and we're dedicated to helping every freelancer build a sustainable, highly-profitable creative business.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section with entry animations */}
      <section className="py-20 bg-[#F7F9FC] text-text-dark border-b border-[#E5EAF2]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { stat: "+₦250M", label: "Volume of Scopes Pricis Helps Calibrate" },
              { stat: "2,500+", label: "Freelancers Using Pricis Across Africa" },
              { stat: "40%", label: "Average Proposal Close Rate Increase" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-[#E5EAF2] p-8 rounded-2xl text-center shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                <p className="text-4xl md:text-5xl font-black text-primary font-display mb-2">{item.stat}</p>
                <p className="text-xs font-bold text-text-secondary uppercase tracking-wider">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-white text-text-dark border-b border-[#E5EAF2]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight mb-4 text-[#0F172A]">
              What we stand for
            </h2>
            <p className="text-lg text-text-secondary">Our core principles and dedication to creators.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Built for Africa First",
                desc: "Not adapted from the West. Built from Lagos, for Lagos — and every other city where freelancers are doing serious work."
              },
              {
                icon: Award,
                title: "Honest Tools",
                desc: "We don't hide limits in fine print. We tell you exactly what you get on every plan, and we keep pricing transparent."
              },
              {
                icon: Zap,
                title: "Freelancer Sovereignty",
                desc: "Your pricing is your power. Pricis is here to protect your boundaries, value, and creative sovereignty."
              }
            ].map((v, idx) => (
              <div key={idx} className="bg-[#F7F9FC] border border-[#E5EAF2] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center mb-6">
                  <v.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-4 font-display">{v.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed font-body">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 bg-white text-text-dark">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight mb-4 text-[#0F172A]">
              The core team
            </h2>
            <p className="text-lg text-text-secondary">The builders behind the Pricis toolkit.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                name: "Daniel Adeyemi",
                role: "Founder & Builder",
                img: "/images/daniel_adeyemi.png",
                desc: "Product thinker and builder. Building Pricis to give African freelancers the pricing and negotiation tools they've always needed."
              },
              {
                name: "Mary Ijeoma",
                role: "Co-Founder & Product Manager",
                img: "/images/mary_ijeoma.png",
                desc: "Leads product strategy, operations, and our freelancer community programs across Nigeria."
              },
              {
                name: "Tayo Akindele",
                role: "Head of Design",
                img: "/images/tayo_akindele.png",
                desc: "Shapes the brand visuals, UI components, and the clean structure of proposal templates."
              },
              {
                name: "Emeka Promise",
                role: "Chief Technical Officer",
                img: "/images/emeka_promise.png",
                desc: "Builds our core AI engine integrations, scope calibration parameters, and real-time tracking systems."
              }
            ].map((t, idx) => (
              <div key={idx} className="bg-[#F7F9FC] border border-[#E5EAF2] p-6 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-2 border-primary bg-slate-200">
                    <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-base font-bold text-[#0F172A] mb-1 font-display">{t.name}</h3>
                  <p className="text-[11px] font-bold text-primary mb-4 uppercase tracking-wider">{t.role}</p>
                  <p className="text-xs text-text-secondary leading-relaxed font-body mb-6">
                    {t.desc}
                  </p>
                </div>
                <div className="flex justify-center border-t border-[#E5EAF2] pt-4 mt-auto">
                  <a href="#" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white border border-[#E5EAF2] text-text-muted hover:text-primary hover:border-primary transition-colors">
                    <Linkedin size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark CTA */}
      <section className="py-24 px-6 bg-[#080D1A] text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-t from-primary/10 via-primary/5 to-transparent rounded-full blur-[100px] opacity-80 pointer-events-none"></div>
        </div>
        <div className="max-w-2xl mx-auto relative z-10 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-display mb-8">
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
