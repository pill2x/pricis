"use client";

export default function StitchBuiltFor() {
  const personas = [
    "Freelancers",
    "Creative Agencies",
    "Consultants",
    "Studios",
  ];

  return (
    <section id="built-for" className="py-20 px-4 sm:px-8 border-t border-slate-200/80 bg-[#FBFBFD] overflow-hidden">
      <div className="max-w-6xl mx-auto text-center space-y-10">
        
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#0F172A] tracking-tight">
          Built for the business of service.
        </h2>

        {/* Single Line Editorial Typography Row */}
        <div className="flex flex-nowrap items-center justify-center gap-4 sm:gap-8 md:gap-12 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold font-display text-slate-400 select-none whitespace-nowrap overflow-x-auto no-scrollbar py-2">
          {personas.map((persona, idx) => (
            <span
              key={idx}
              className="hover:text-slate-900 transition-colors duration-200 cursor-default flex-shrink-0"
            >
              {persona}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
