"use client";

export default function StitchBuiltFor() {
  const personas = [
    "Freelancers",
    "Creative Agencies",
    "Consultants",
    "Studios",
  ];

  return (
    <section id="built-for" className="py-20 px-4 sm:px-8 border-t border-slate-200/80 bg-[#FBFBFD]">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A] tracking-tight">
          Built for the business of service.
        </h2>

        {/* Understated Editorial Typography Row */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-2xl sm:text-4xl font-extrabold font-display text-slate-400 select-none">
          {personas.map((persona, idx) => (
            <span
              key={idx}
              className="hover:text-slate-900 transition-colors duration-200 cursor-default"
            >
              {persona}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
