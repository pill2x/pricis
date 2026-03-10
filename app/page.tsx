import { Ruler, FileText, Send, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1D35] text-white">
      {/* Navbar */}
      <nav className="px-6 py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#B8860B]">
            Pricis
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/negotiate"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Negotiate
            </Link>
            <Link
              href="/login"
              className="text-sm text-white/80 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center px-4 py-2 bg-[#B8860B] text-[#0B1D35] font-medium rounded-lg hover:bg-[#c99414] transition-colors text-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center md:pt-32 md:pb-28">
        <span className="mb-6 text-sm font-medium text-[#B8860B]">
          For freelancers & service providers
        </span>

        <h1 className="max-w-3xl text-balance text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
          Know exactly what to charge. Every time.
        </h1>

        <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/70">
          Pricis generates professional pricing and scope documents in seconds — so you stop undercharging and start getting paid what your work is worth. Then when the client pushes back? We've got that covered too.
        </p>

        <a
          href="/generate"
          className="mt-10 inline-flex rounded-lg bg-[#B8860B] px-6 py-3 font-semibold text-[#0B1D35] transition-colors hover:bg-[#a07609]"
        >
          Generate Your Free Scope &rarr;
        </a>
      </section>

      {/* Value Props Section */}
      <section className="px-6 pb-16 md:pb-24">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3 md:gap-8">
          <ValueProp
            icon={<Ruler className="h-6 w-6 text-[#B8860B]" />}
            title="Instant Pricing"
            description="Accurate, market-aligned pricing for your industry in seconds."
          />
          <ValueProp
            icon={<FileText className="h-6 w-6 text-[#B8860B]" />}
            title="Professional Scopes"
            description="Auto-generated scope documents that protect you from scope creep."
          />
          <ValueProp
            icon={<Send className="h-6 w-6 text-[#B8860B]" />}
            title="Send to Clients"
            description="Export a PDF or share a link your client can accept digitally."
          />
        </div>
      </section>

      {/* From First Quote Section */}
      <section className="px-6 pb-16 md:pb-24">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-12">
          From first quote to final agreement.
        </h2>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[#B8860B]/20 bg-[#0F2440] p-8 transition-all duration-200 hover:border-[#B8860B]/40">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#B8860B]/10">
                <FileText className="h-6 w-6 text-[#B8860B]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#B8860B] tracking-wider uppercase">STEP 1</p>
                <h3 className="text-xl font-semibold">Know what to charge</h3>
              </div>
            </div>
            <p className="text-white/70 mb-6">
              Generate a professional scope and accurate pricing in seconds. Export a PDF your client can accept digitally.
            </p>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#B8860B] text-[#0B1D35] font-medium rounded-lg hover:bg-[#c99414] transition-colors"
            >
              Generate Scope
              <Send className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-2xl border border-[#B8860B]/20 bg-[#0F2440] p-8 transition-all duration-200 hover:border-[#B8860B]/40">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#B8860B]/10">
                <MessageSquare className="h-6 w-6 text-[#B8860B]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#B8860B] tracking-wider uppercase">STEP 2</p>
                <h3 className="text-xl font-semibold">Hold your ground</h3>
              </div>
            </div>
            <p className="text-white/70 mb-6">
              When the client negotiates, you're ready. Get strategy, draft responses, and practice the conversation before it happens.
            </p>
            <Link
              href="/negotiate"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#B8860B] text-[#0B1D35] font-medium rounded-lg hover:bg-[#c99414] transition-colors"
            >
              Try Negotiation Assistant
              <Send className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="flex flex-col items-center justify-center px-6 py-20 text-center md:py-28">
        <h2 className="max-w-xl text-balance text-2xl font-bold md:text-3xl">
          Stop guessing. Start charging with confidence.
        </h2>

        <a
          href="/signup"
          className="mt-8 inline-flex rounded-lg bg-[#B8860B] px-6 py-3 font-semibold text-[#0B1D35] transition-colors hover:bg-[#a07609]"
        >
          Get Started Free →
        </a>

        <p className="mt-4 text-sm text-white/50">No sign-up required.</p>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8">
        <p className="text-center text-sm text-white/40">
          © 2025 Pricis. Built for freelancers who know their worth.
        </p>
      </footer>
    </main>
  );
}

function ValueProp({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#B8860B]/10">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
}
