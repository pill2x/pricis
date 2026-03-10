"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2, Lock } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import type { ExperienceLevel, GeneratedScope, Industry } from "@/types";
import ScopePDF from "@/components/ScopePDF";
import { supabase } from "@/lib/supabase";

type Step = 1 | 2 | 3;

const INDUSTRIES: Array<{
  id: Industry;
  label: string;
  icon: string;
}> = [
  { id: "ui_ux_design", label: "UI/UX Design", icon: "🎨" },
  { id: "web_development", label: "Web Development", icon: "💻" },
  { id: "graphic_design", label: "Graphic Design", icon: "✏️" },
  { id: "copywriting", label: "Copywriting", icon: "📝" },
  { id: "video_editing", label: "Video Editing", icon: "🎬" },
  { id: "social_media", label: "Social Media", icon: "📱" },
  { id: "photography", label: "Photography", icon: "📸" },
];

const EXPERIENCE_LEVELS: Array<{
  id: ExperienceLevel;
  label: string;
  detail: string;
}> = [
  { id: "junior", label: "Junior", detail: "1-2 years" },
  { id: "mid", label: "Mid-level", detail: "3-5 years" },
  { id: "senior", label: "Senior", detail: "5+ years" },
];

function StepPill({ currentStep }: { currentStep: Step }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-sm text-white/60">Step {currentStep} of 3</p>
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((n) => {
          const isActive = n === currentStep;
          const isDone = n < currentStep;
          return (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={n}
              aria-hidden
              className={[
                "h-2.5 w-2.5 rounded-full",
                isActive
                  ? "bg-[#B8860B]"
                  : isDone
                    ? "bg-white/50"
                    : "bg-white/20",
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
}

function SelectCard({
  title,
  subtitle,
  leading,
  selected,
  onClick,
}: {
  title: string;
  subtitle?: string;
  leading?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "text-left rounded-xl border px-4 py-4 transition-colors",
        "bg-white/5 border-white/10 hover:border-white/25",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8860B] focus-visible:ring-offset-0",
        selected ? "border-2 border-[#B8860B] bg-[#B8860B]/10" : "",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        {leading ? (
          <div className="mt-0.5 text-xl leading-none">{leading}</div>
        ) : null}
        <div className="min-w-0">
          <p className="font-semibold text-white">{title}</p>
          {subtitle ? (
            <p className="text-sm text-white/60 mt-1">{subtitle}</p>
          ) : null}
        </div>
      </div>
    </button>
  );
}

export default function GeneratePage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(
    null,
  );
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceLevel | null>(null);
  const [projectDescription, setProjectDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScope, setGeneratedScope] = useState<GeneratedScope | null>(
    null,
  );
  const [selectedTier, setSelectedTier] = useState<
    "conservative" | "standard" | "premium"
  >("standard");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [showSaveBanner, setShowSaveBanner] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const descriptionLength = projectDescription.trim().length;
  const meetsMinChars = descriptionLength >= 50;

  const canGoNext = useMemo(() => {
    if (currentStep === 1) return Boolean(selectedIndustry);
    if (currentStep === 2) return Boolean(selectedExperience);
    return false;
  }, [currentStep, selectedIndustry, selectedExperience]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const saveQuote = async (scope: GeneratedScope) => {
    if (!user) return;

    const { error } = await supabase.from("quotes").insert({
      user_id: user.id,
      industry: selectedIndustry,
      experience_level: selectedExperience,
      project_description: projectDescription,
      project_title: scope.project_title,
      deliverables: scope.deliverables,
      timeline: scope.timeline,
      revision_policy: scope.revision_policy,
      out_of_scope: scope.out_of_scope,
      price_conservative: scope.price_conservative,
      price_standard: scope.price_standard,
      price_premium: scope.price_premium,
      pricing_rationale: scope.pricing_rationale,
      selected_tier: selectedTier,
    });

    if (error) {
      console.error("Save error:", error.message, error.details);
      return;
    }

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const goBack = () => {
    setCurrentStep((s) => (s === 1 ? 1 : ((s - 1) as Step)));
  };

  const goNext = () => {
    if (!canGoNext) return;
    setCurrentStep((s) => (s === 3 ? 3 : ((s + 1) as Step)));
  };

  const onGenerate = async () => {
    if (!selectedIndustry || !selectedExperience || !meetsMinChars) return;
    setIsGenerating(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/generate-scope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry: selectedIndustry,
          experience_level: selectedExperience,
          project_description: projectDescription.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = (await res.json()) as GeneratedScope;
      setGeneratedScope(data);
      
      // Save quote if user is logged in
      if (user) {
        await saveQuote(data);
      } else {
        setShowSaveBanner(true);
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const resetAll = () => {
    setCurrentStep(1);
    setSelectedIndustry(null);
    setSelectedExperience(null);
    setProjectDescription("");
    setGeneratedScope(null);
    setErrorMessage(null);
    setIsGenerating(false);
    setShowSaveBanner(false);
  };

  return (
    <div className="min-h-screen bg-[#0B1D35] text-white">
      <div className="px-6 py-10 md:py-14 max-w-2xl mx-auto">
        <Link
          href={user ? "/dashboard" : "/"}
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Pricis
        </Link>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          {generatedScope ? (
            <div>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-white/60">Results</p>
                <button
                  type="button"
                  onClick={resetAll}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                >
                  Start Over
                </button>
              </div>

              <h1 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight">
                {generatedScope.project_title}
              </h1>

              <div className="mt-10 space-y-10">
                <section>
                  <h2 className="text-lg font-semibold">Deliverables</h2>
                  <ul className="mt-3 list-disc pl-5 space-y-2 text-white/80">
                    {generatedScope.deliverables.map((d, idx) => (
                      <li key={`${d}-${idx}`}>{d}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg font-semibold">Timeline</h2>
                  <p className="mt-3 text-white/80">{generatedScope.timeline}</p>
                </section>

                <section>
                  <h2 className="text-lg font-semibold">Revision Policy</h2>
                  <p className="mt-3 text-white/80">
                    {generatedScope.revision_policy}
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-semibold">Out of Scope</h2>
                  <ul className="mt-3 list-disc pl-5 space-y-2 text-white/80">
                    {generatedScope.out_of_scope.map((o, idx) => (
                      <li key={`${o}-${idx}`}>{o}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg font-semibold">Pricing</h2>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <div 
                      className={`rounded-xl border border-white/10 bg-white/5 p-4 cursor-pointer transition-all hover:border-white/25 ${
                        selectedTier === "conservative" ? "border-2 border-[#B8860B] bg-[#B8860B]/10" : ""
                      }`}
                      onClick={() => setSelectedTier("conservative")}
                    >
                      <p className="text-sm text-white/60">Conservative</p>
                      <p className="mt-2 text-xl font-bold">
                        ₦{generatedScope.price_conservative.toLocaleString()}
                      </p>
                    </div>
                    <div 
                      className={`rounded-xl border border-white/10 bg-white/5 p-4 cursor-pointer transition-all hover:border-white/25 ${
                        selectedTier === "standard" ? "border-2 border-[#B8860B] bg-[#B8860B]/10" : ""
                      }`}
                      onClick={() => setSelectedTier("standard")}
                    >
                      <p className="text-sm text-white/70">Standard</p>
                      <p className="mt-2 text-xl font-bold">
                        ₦{generatedScope.price_standard.toLocaleString()}
                      </p>
                    </div>
                    <div 
                      className={`rounded-xl border border-white/10 bg-white/5 p-4 cursor-pointer transition-all hover:border-white/25 ${
                        selectedTier === "premium" ? "border-2 border-[#B8860B] bg-[#B8860B]/10" : ""
                      }`}
                      onClick={() => setSelectedTier("premium")}
                    >
                      <p className="text-sm text-white/60">Premium</p>
                      <p className="mt-2 text-xl font-bold">
                        ₦{generatedScope.price_premium.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold">Pricing Rationale</h2>
                  <p className="mt-3 text-white/60 italic leading-relaxed">
                    {generatedScope.pricing_rationale}
                  </p>
                </section>
              </div>

              {!user && (
                <div className="mt-6 rounded-xl border border-[#B8860B]/40 bg-[#B8860B]/10 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-[#B8860B]" />
                      <div>
                        <p className="text-white font-medium">
                          Save this scope to your account and access it anytime.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link
                        href="/signup"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#B8860B] text-[#0B1D35] font-medium rounded-lg hover:bg-[#c99414] transition-colors text-sm"
                      >
                        Sign up free
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <Link
                        href="/login"
                        className="text-xs text-white/60 hover:text-white transition-colors text-center"
                      >
                        Already have an account? Sign in
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={resetAll}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 text-white/80 hover:text-white hover:border-white/25 transition-colors"
                >
                  Start Over
                </button>
                <PDFDownloadLink
                  document={<ScopePDF scope={generatedScope} selectedTier={selectedTier} />}
                  fileName={`pricis-scope-${Date.now()}.pdf`}
                >
                  {({ loading }) => (
                    <button
                      type="button"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#B8860B] text-[#0B1D35] font-bold rounded-lg hover:bg-[#c99414] transition-colors"
                    >
                      {loading ? "Preparing PDF..." : "Export PDF"}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </PDFDownloadLink>
              </div>
            </div>
          ) : (
            <>
              <StepPill currentStep={currentStep} />

              {currentStep === 1 ? (
                <div className="mt-8">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    What type of work do you do?
                  </h1>
                  <p className="mt-2 text-white/70">Select your industry</p>

                  <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {INDUSTRIES.map((industry) => (
                      <SelectCard
                        key={industry.id}
                        title={industry.label}
                        leading={<span aria-hidden>{industry.icon}</span>}
                        selected={selectedIndustry === industry.id}
                        onClick={() => setSelectedIndustry(industry.id)}
                      />
                    ))}
                  </div>

                  {selectedIndustry ? (
                    <div className="mt-8 flex justify-end">
                      <button
                        type="button"
                        onClick={goNext}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[#B8860B] text-[#0B1D35] font-bold rounded-lg hover:bg-[#c99414] transition-colors"
                      >
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {currentStep === 2 ? (
                <div className="mt-8">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    What&apos;s your experience level?
                  </h1>

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {EXPERIENCE_LEVELS.map((level) => (
                      <SelectCard
                        key={level.id}
                        title={level.label}
                        subtitle={level.detail}
                        selected={selectedExperience === level.id}
                        onClick={() => setSelectedExperience(level.id)}
                      />
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 text-white/80 hover:text-white hover:border-white/25 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>

                    {selectedExperience ? (
                      <button
                        type="button"
                        onClick={goNext}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-[#B8860B] text-[#0B1D35] font-bold rounded-lg hover:bg-[#c99414] transition-colors"
                      >
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {currentStep === 3 ? (
                <div className="mt-8">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                    Describe the project
                  </h1>
                  <p className="mt-2 text-white/70">
                    What does the client need? Be as specific as you can.
                  </p>

                  <div className="mt-8">
                    <textarea
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      rows={7}
                      className={[
                        "w-full rounded-xl border bg-[#0B1D35] text-white",
                        "border-white/15 px-4 py-3 leading-relaxed",
                        "placeholder:text-white/40",
                        "focus:outline-none focus:ring-2 focus:ring-[#B8860B] focus:border-transparent",
                      ].join(" ")}
                      placeholder={
                        "e.g. A mobile app design for a food delivery startup. 5 screens, including onboarding, home, cart, checkout and profile."
                      }
                    />

                    <div className="mt-3 flex items-center justify-between gap-4">
                      <p
                        className={[
                          "text-sm",
                          meetsMinChars ? "text-white/60" : "text-white/50",
                        ].join(" ")}
                      >
                        {descriptionLength}/50 characters
                      </p>
                      {!meetsMinChars ? (
                        <p className="text-sm text-white/50">
                          Minimum 50 characters
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {errorMessage ? (
                    <p className="mt-4 text-sm text-white/70">{errorMessage}</p>
                  ) : null}

                  <div className="mt-8 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={onGenerate}
                      disabled={!meetsMinChars || isGenerating}
                      className={[
                        "w-full inline-flex items-center justify-center gap-2",
                        "px-6 py-3.5 font-bold rounded-lg transition-colors",
                        meetsMinChars && !isGenerating
                          ? "bg-[#B8860B] text-[#0B1D35] hover:bg-[#c99414]"
                          : "bg-white/15 text-white/50 cursor-not-allowed",
                      ].join(" ")}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          Generate My Scope
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={goBack}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 text-white/80 hover:text-white hover:border-white/25 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50">
          <span className="text-lg">✓</span>
          <span>Scope saved to your dashboard</span>
        </div>
      )}
    </div>
  );
}
