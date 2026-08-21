"use client";

export default function StitchCapabilities() {
  const capabilities = [
    {
      num: "01",
      title: "Scope",
      description: "Define project parameters, deliverables, and timelines with precision.",
      highlighted: false,
    },
    {
      num: "02",
      title: "Price",
      description: "Calculate margins, apply rate cards, and structure pricing models.",
      highlighted: false,
    },
    {
      num: "03",
      title: "Proposals",
      description: "Generate clear, professional proposals that clients can review and sign.",
      highlighted: false,
    },
    {
      num: "04",
      title: "Negotiate (SaBee)",
      description: "Handle client pushback with context-aware assistance.",
      highlighted: true, // Pricis accent highlighted cell
    },
    {
      num: "05",
      title: "Manage",
      description: "Track status, milestones, and client communications in one place.",
      highlighted: false,
    },
    {
      num: "06",
      title: "Deliver",
      description: "Handoff assets and complete project phases smoothly.",
      highlighted: false,
    },
    {
      num: "07",
      title: "Invoice",
      description: "Automate billing based on approved scopes and milestones.",
      highlighted: false,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-8 bg-[#FBFBFD] border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-left max-w-3xl space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-[#0F172A] tracking-tight">
            Everything between &quot;I have a client&quot; and &quot;I got paid.&quot;
          </h2>
        </div>

        {/* 7-Item Bordered Editorial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-slate-200/90 text-left">
          {capabilities.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-8 border-r border-b border-slate-200/90 font-body transition-colors relative ${
                item.highlighted
                  ? "bg-blue-50/50 border-blue-200"
                  : "bg-white hover:bg-slate-50/50"
              } ${idx === 6 ? "md:col-span-2 lg:col-span-2" : ""}`}
            >
              {/* Number Badge */}
              <div
                className={`w-7 h-7 rounded-full text-xs font-bold font-display flex items-center justify-center mb-6 ${
                  item.highlighted
                    ? "bg-[#2563EB] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-500 border border-slate-200"
                }`}
              >
                {item.num}
              </div>

              {/* Title */}
              <h3
                className={`text-lg font-bold font-display mb-2 ${
                  item.highlighted ? "text-[#2563EB]" : "text-[#0F172A]"
                }`}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
