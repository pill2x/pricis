export type Industry =
  | "ui_ux_design"
  | "web_development"
  | "graphic_design"
  | "copywriting"
  | "video_editing"
  | "social_media"
  | "photography";

export type ExperienceLevel = "junior" | "mid" | "senior";

export type GeneratedScope = {
  project_title: string;
  deliverables: string[];
  timeline: string;
  revision_policy: string;
  out_of_scope: string[];
  price_conservative: number;
  price_standard: number;
  price_premium: number;
  pricing_rationale: string;
};

export type QuoteFormData = {
  industry: Industry;
  experience_level: ExperienceLevel;
  project_description: string;
};
