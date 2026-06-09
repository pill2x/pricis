"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Loader2, Lock, ChevronLeft, CheckCircle2, Clock, RefreshCw, XCircle } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import type { ExperienceLevel, GeneratedScope, Industry } from "@/types";
import ScopePDF from "@/components/ScopePDF";
import { supabaseAuth } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";

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
      <p className="text-sm" style={{ color: '#94A3B8' }}>Step {currentStep} of 3</p>
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((n) => {
          const isActive = n === currentStep;
          const isDone = n < currentStep;
          return (
            <span
              // eslint-disable-next-line react/no-array-index-key
              key={n}
              aria-hidden
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: isActive ? '#2563EB' : isDone ? '#10B981' : 'rgba(255,255,255,0.15)'
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function IndustryCard({
  title,
  icon,
  selected,
  onClick,
}: {
  title: string;
  icon: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl p-5 cursor-pointer transition-all duration-200"
      style={{
        backgroundColor: selected ? 'rgba(37,99,235,0.08)' : '#0C1827',
        border: selected ? 'rgba(37,99,235,0.6)' : 'rgba(255,255,255,0.08)',
        borderWidth: '1px',
        boxShadow: selected ? '0 0 0 1px rgba(37,99,235,0.3)' : 'none'
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.backgroundColor = '#0F1F35';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.backgroundColor = '#0C1827';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
        }
      }}
    >
      <div 
        className="w-10 h-10 rounded-lg mb-3 flex items-center justify-center text-xl leading-none"
        style={{
          backgroundColor: selected ? 'rgba(37,99,235,0.12)' : 'rgba(255,255,255,0.06)'
        }}
      >
        {icon}
      </div>
      <p className="font-semibold text-sm mb-1" style={{ color: '#F1F5F9' }}>{title}</p>
    </button>
  );
}

function ExperiencePill({
  title,
  subtitle,
  selected,
  onClick,
}: {
  title: string;
  subtitle?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
      style={{
        backgroundColor: selected ? 'rgba(37,99,235,0.12)' : '#0A1525',
        border: selected ? 'rgba(37,99,235,0.5)' : 'rgba(255,255,255,0.08)',
        borderWidth: '1px',
        color: selected ? '#2563EB' : '#94A3B8'
      }}
    >
      {title}
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
  const [autoSaveQuotes, setAutoSaveQuotes] = useState(true);

  const descriptionLength = projectDescription.trim().length;
  const meetsMinChars = descriptionLength >= 50;

  const canGoNext = useMemo(() => {
    if (currentStep === 1) return Boolean(selectedIndustry);
    if (currentStep === 2) return Boolean(selectedExperience);
    return false;
  }, [currentStep, selectedIndustry, selectedExperience]);

  useEffect(() => {
    checkUser();
    // fetchAutoSaveSetting(); // Temporarily commented out until database column is added
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabaseAuth.auth.getUser();
    setUser(user);
  };

  const fetchAutoSaveSetting = async () => {
    const { data: { user } } = await supabaseAuth.auth.getUser();
    if (user) {
      try {
        const data: any = await queryOne("SELECT auto_save_quotes FROM profiles WHERE id = $1", [user.id]);
        if (data?.auto_save_quotes !== undefined) {
          setAutoSaveQuotes(data.auto_save_quotes);
        }
      } catch (e) {}
    }
  };

  const saveQuote = async (scope: GeneratedScope) => {
    if (!user) return;

    let error = null;
    try {
      await queryOne(
        `INSERT INTO quotes (
          user_id, industry, experience_level, project_description, project_title,
          deliverables, timeline, revision_policy, out_of_scope, price_conservative,
          price_standard, price_premium, pricing_rationale, selected_tier
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
        ) RETURNING *`,
        [
          user.id, selectedIndustry, selectedExperience, projectDescription,
          scope.project_title, scope.deliverables, scope.timeline, scope.revision_policy,
          scope.out_of_scope, scope.price_conservative, scope.price_standard,
          scope.price_premium, scope.pricing_rationale, selectedTier
        ]
      );
    } catch (e: any) {
      error = e;
    }

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
      
      // Save quote if user is logged in (original behavior)
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

  const getIndustryLabel = () => {
    const industry = INDUSTRIES.find(i => i.id === selectedIndustry);
    return industry?.label || '';
  };

  const getExperienceLabel = () => {
    const level = EXPERIENCE_LEVELS.find(l => l.id === selectedExperience);
    return level?.label || '';
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      `}</style>
      
      <div className="min-h-screen" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#060D18' }}>
        
        {/* Top Bar */}
        <div 
          className="px-6 py-4 flex items-center justify-between sticky top-0 z-50"
          style={{ 
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            backgroundColor: 'rgba(6,13,24,0.8)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Link
            href={user ? "/dashboard" : "/"}
            className="flex items-center gap-2 text-sm hover:transition-colors"
            style={{ color: '#94A3B8' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#F1F5F9'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Pricis
          </Link>

          <div className="font-bold" style={{ color: '#F1F5F9' }}>
            Pricis
          </div>

          {generatedScope ? null : <StepPill currentStep={currentStep} />}
        </div>

        {/* Step 1 - Industry Selection */}
        {currentStep === 1 && !generatedScope && (
          <div className="max-w-3xl mx-auto px-6" style={{ paddingTop: '48px', paddingBottom: '80px' }}>
            <div className="text-center mb-12">
              <h1 
                className="font-black tracking-[-0.02em]"
                style={{ fontSize: '36px', color: '#F1F5F9' }}
              >
                What type of work is this?
              </h1>
              <p 
                className="mt-3"
                style={{ fontSize: '16px', color: '#94A3B8' }}
              >
                Choose the closest match — you can customize everything later.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {INDUSTRIES.map((industry) => (
                <IndustryCard
                  key={industry.id}
                  title={industry.label}
                  icon={industry.icon}
                  selected={selectedIndustry === industry.id}
                  onClick={() => setSelectedIndustry(industry.id)}
                />
              ))}
            </div>

            {selectedIndustry && (
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={goNext}
                  className="font-bold rounded-xl transition-colors flex items-center gap-2"
                  style={{ 
                    backgroundColor: '#2563EB',
                    color: 'white',
                    fontSize: '16px',
                    padding: '12px 24px',
                    boxShadow: '0 4px 14px rgba(37,99,235,0.3)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 2 - Project Details */}
        {currentStep === 2 && !generatedScope && (
          <div className="max-w-2xl mx-auto px-6" style={{ paddingTop: '48px', paddingBottom: '80px' }}>
            <div className="mb-10">
              <button
                type="button"
                onClick={goBack}
                className="text-sm hover:transition-colors flex items-center gap-2 mb-4"
                style={{ color: '#94A3B8' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#F1F5F9'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
              >
                <ArrowLeft className="h-4 w-4" />
                Change industry
              </button>

              <h1 
                className="font-black tracking-[-0.02em] mt-4"
                style={{ fontSize: '36px', color: '#F1F5F9' }}
              >
                Tell us about the project
              </h1>

              <p 
                className="mt-3"
                style={{ fontSize: '16px', color: '#94A3B8' }}
              >
                What does the client need? Be as specific as you can.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#94A3B8' }}>
                Experience Level
              </label>
              <div className="flex gap-2">
                {EXPERIENCE_LEVELS.map((level) => (
                  <ExperiencePill
                    key={level.id}
                    title={level.label}
                    subtitle={level.detail}
                    selected={selectedExperience === level.id}
                    onClick={() => setSelectedExperience(level.id)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2" style={{ color: '#94A3B8' }}>
                Project Description
              </label>
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                rows={7}
                className="w-full rounded-xl transition-all resize-none"
                style={{
                  backgroundColor: '#0A1525',
                  border: '1px solid rgba(255,255,255,0.08)',
                  padding: '12px 16px',
                  fontSize: '16px',
                  color: '#F1F5F9',
                  outline: 'none'
                }}
                placeholder="e.g. A mobile app design for a food delivery startup. 5 screens, including onboarding, home, cart, checkout and profile."
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(37,99,235,0.6)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.target.style.boxShadow = 'none';
                }}
              />

              <div className="mt-3 flex items-center justify-between gap-4">
                <p
                  className="text-sm"
                  style={{ color: meetsMinChars ? '#94A3B8' : '#475569' }}
                >
                  {descriptionLength}/50 characters
                </p>
                {!meetsMinChars && (
                  <p className="text-sm" style={{ color: '#475569' }}>
                    Minimum 50 characters
                  </p>
                )}
              </div>
            </div>

            {errorMessage && (
              <p className="mt-4 text-sm" style={{ color: '#EF4444' }}>
                {errorMessage}
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                onClick={onGenerate}
                disabled={!meetsMinChars || isGenerating}
                className="w-full font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                style={{
                  backgroundColor: meetsMinChars && !isGenerating ? '#2563EB' : 'rgba(255,255,255,0.1)',
                  color: meetsMinChars && !isGenerating ? 'white' : '#475569',
                  fontSize: '16px',
                  padding: '16px',
                  cursor: meetsMinChars && !isGenerating ? 'pointer' : 'not-allowed'
                }}
                onMouseEnter={(e) => {
                  if (meetsMinChars && !isGenerating) {
                    e.currentTarget.style.backgroundColor = '#1D4ED8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (meetsMinChars && !isGenerating) {
                    e.currentTarget.style.backgroundColor = '#2563EB';
                  }
                }}
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
                className="rounded-xl transition-colors flex items-center justify-center gap-2"
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#94A3B8',
                  fontSize: '14px',
                  padding: '10px 16px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#F1F5F9';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#94A3B8';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            </div>
          </div>
        )}

        {/* Step 3 - Loading State */}
        {isGenerating && (
          <div className="max-w-md mx-auto px-6 text-center" style={{ paddingTop: '96px' }}>
            <div 
              className="w-12 h-12 rounded-full mx-auto animate-spin"
              style={{
                border: '3px solid rgba(255,255,255,0.08)',
                borderTop: '3px solid #2563EB'
              }}
            />
            <div className="mt-8">
              <h3 
                className="font-semibold"
                style={{ fontSize: '20px', color: '#F1F5F9' }}
              >
                Generating your scope...
              </h3>
              <p 
                className="mt-3 text-sm"
                style={{ color: '#94A3B8' }}
              >
                This takes about 10 seconds.
              </p>
            </div>
          </div>
        )}

        {/* Step 3 - Scope Result */}
        {generatedScope && (
          <div className="max-w-3xl mx-auto px-6" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
            {/* Top row */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <div 
                  className="inline-block px-3 py-1.5 rounded-full text-xs mb-2"
                  style={{
                    backgroundColor: '#0C1827',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#94A3B8'
                  }}
                >
                  {getIndustryLabel()} · {getExperienceLabel()}
                </div>
                <h2 
                  className="font-black tracking-[-0.02em]"
                  style={{ fontSize: '30px', color: '#F1F5F9' }}
                >
                  {generatedScope.project_title}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => saveQuote(generatedScope)}
                  className="font-semibold rounded-xl transition-colors"
                  style={{
                    backgroundColor: '#2563EB',
                    color: 'white',
                    fontSize: '14px',
                    padding: '10px 20px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
                >
                  Save
                </button>
                
                <PDFDownloadLink
                  document={<ScopePDF scope={generatedScope} selectedTier={selectedTier} />}
                  fileName={`pricis-scope-${Date.now()}.pdf`}
                >
                  {({ loading }) => (
                    <button
                      type="button"
                      className="font-medium rounded-xl transition-colors"
                      style={{
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'white',
                        fontSize: '14px',
                        padding: '10px 16px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      {loading ? "Preparing..." : "PDF"}
                    </button>
                  )}
                </PDFDownloadLink>
              </div>
            </div>

            {/* Pricing Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { id: 'conservative', name: 'Conservative', price: generatedScope.price_conservative },
                { id: 'standard', name: 'Standard', price: generatedScope.price_standard },
                { id: 'premium', name: 'Premium', price: generatedScope.price_premium }
              ].map((tier) => (
                <div
                  key={tier.id}
                  className="rounded-2xl p-6 cursor-pointer transition-all"
                  style={{
                    backgroundColor: selectedTier === tier.id ? 'rgba(37,99,235,0.06)' : '#0C1827',
                    border: selectedTier === tier.id ? 'rgba(37,99,235,0.5)' : 'rgba(255,255,255,0.08)',
                    borderWidth: '1px',
                    boxShadow: selectedTier === tier.id ? '0 0 0 1px rgba(37,99,235,0.2)' : 'none'
                  }}
                  onClick={() => setSelectedTier(tier.id as any)}
                  onMouseEnter={(e) => {
                    if (selectedTier !== tier.id) {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedTier !== tier.id) {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    }
                  }}
                >
                  <p className="text-xs tracking-widest uppercase font-medium mb-1" style={{ color: '#94A3B8' }}>
                    {tier.name}
                  </p>
                  <p 
                    className="font-black tracking-[-0.02em] mb-4"
                    style={{ fontSize: '24px', color: '#F1F5F9' }}
                  >
                    ₦{tier.price.toLocaleString()}
                  </p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: '16px' }} />
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: '#94A3B8', fontSize: '13px' }}
                  >
                    {generatedScope.pricing_rationale}
                  </p>
                  <button
                    className="w-full font-semibold rounded-lg transition-all mt-4"
                    style={{
                      backgroundColor: selectedTier === tier.id ? '#2563EB' : 'rgba(255,255,255,0.05)',
                      color: selectedTier === tier.id ? 'white' : '#94A3B8',
                      fontSize: '14px',
                      padding: '10px'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedTier !== tier.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTier !== tier.id) {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                      }
                    }}
                  >
                    {selectedTier === tier.id ? 'Selected' : 'Select'}
                  </button>
                </div>
              ))}
            </div>

            {/* Scope Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Deliverables */}
              <div 
                className="rounded-xl p-5"
                style={{ backgroundColor: '#0C1827', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="text-sm font-semibold uppercase tracking-wide mb-3 flex items-center gap-2" style={{ color: '#94A3B8' }}>
                  <CheckCircle2 className="h-4 w-4" />
                  Deliverables
                </div>
                {generatedScope.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 py-1">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#2563EB' }} />
                    <span className="text-sm leading-relaxed" style={{ color: '#F1F5F9' }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div 
                className="rounded-xl p-5"
                style={{ backgroundColor: '#0C1827', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="text-sm font-semibold uppercase tracking-wide mb-3 flex items-center gap-2" style={{ color: '#94A3B8' }}>
                  <Clock className="h-4 w-4" />
                  Timeline
                </div>
                <div className="flex items-start gap-2 py-1">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#2563EB' }} />
                  <span className="text-sm leading-relaxed" style={{ color: '#F1F5F9' }}>
                    {generatedScope.timeline}
                  </span>
                </div>
              </div>

              {/* Revision Policy */}
              <div 
                className="rounded-xl p-5"
                style={{ backgroundColor: '#0C1827', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="text-sm font-semibold uppercase tracking-wide mb-3 flex items-center gap-2" style={{ color: '#94A3B8' }}>
                  <RefreshCw className="h-4 w-4" />
                  Revision Policy
                </div>
                <div className="flex items-start gap-2 py-1">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#2563EB' }} />
                  <span className="text-sm leading-relaxed" style={{ color: '#F1F5F9' }}>
                    {generatedScope.revision_policy}
                  </span>
                </div>
              </div>

              {/* Out of Scope */}
              <div 
                className="rounded-xl p-5"
                style={{ backgroundColor: '#0C1827', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="text-sm font-semibold uppercase tracking-wide mb-3 flex items-center gap-2" style={{ color: '#94A3B8' }}>
                  <XCircle className="h-4 w-4" />
                  Out of Scope
                </div>
                {generatedScope.out_of_scope.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 py-1">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#EF4444', opacity: 0.7 }} />
                    <span className="text-sm leading-relaxed" style={{ color: '#EF4444', opacity: 0.7 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={resetAll}
                className="rounded-xl transition-colors flex items-center justify-center gap-2"
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#94A3B8',
                  fontSize: '14px',
                  padding: '10px 16px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#F1F5F9';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#94A3B8';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }}
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
                    className="font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: '#2563EB',
                      color: 'white',
                      fontSize: '14px',
                      padding: '10px 20px',
                      boxShadow: '0 4px 14px rgba(37,99,235,0.3)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
                  >
                    {loading ? "Preparing PDF..." : "Export PDF"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        )}

        {/* Logged-out Banner */}
        {showSaveBanner && !user && generatedScope && (
          <div 
            className="sticky bottom-0 left-0 right-0 flex items-center justify-between backdrop-blur gap-4"
            style={{
              backgroundColor: '#0C1827',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              padding: '16px 24px'
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">💾</span>
              <div>
                <p className="text-sm" style={{ color: '#94A3B8' }}>
                  Sign up to save this scope to your dashboard
                </p>
              </div>
            </div>
            <Link
              href="/signup"
              className="font-semibold rounded-xl transition-colors"
              style={{
                backgroundColor: '#2563EB',
                color: 'white',
                fontSize: '14px',
                padding: '10px 20px'
              }}
            >
              Create Free Account
            </Link>
          </div>
        )}

        {/* Success Toast */}
        {showToast && (
          <div 
            className="fixed bottom-4 right-4 flex items-center gap-2 z-50 px-4 py-3 rounded-lg"
            style={{ backgroundColor: '#10B981', color: 'white' }}
          >
            <span className="text-lg">✓</span>
            <span>Scope saved to your dashboard</span>
          </div>
        )}
      </div>
    </>
  );
}
