export type Language = 'en' | 'es';
export interface Localized {
  en: string;
  es: string;
}
export interface ProjectImage {
  src: string;
  alt: Localized;
  position?: string;
  fit?: 'contain' | 'cover';
}
export interface ArchitectureStage {
  title: Localized;
  detail: Localized;
}
export interface ProjectLink {
  label: Localized;
  url: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: Localized;
  description: Localized;
  overview: Localized;
  caseStudyLabels?: { problem: Localized; solution: Localized; contributions: Localized };
  problem?: Localized;
  solution?: Localized;
  contributions?: Localized;
  features: Localized[];
  technologies: string[];
  cardTechnologies?: string[];
  cardImage?: ProjectImage;
  coverImage?: ProjectImage;
  screenshots?: ProjectImage[];
  architecture: ArchitectureStage[];
  architectureFlow?: boolean;
  architectureSystems?: boolean;
  prioritizeDetailDownload?: boolean;
  codeSamples?: { file: string; detail: Localized; url: string }[];
  technicalNote?: Localized;
  highlightedTechnologies?: string[];
  quality?: { measures: Localized[]; pending: Localized };
  decisions?: Localized[];
  sourceButton?: boolean;
  prioritizeDetailDemo?: boolean;
  qualityCards?: {
    icon: string;
    title: Localized;
    detail: Localized;
    automated?: boolean;
    manual?: boolean;
  }[];
  demoNote?: Localized;
  testing?: Localized;
  challenges?: Localized;
  status: Localized;
  githubUrl: string;
  demoUrl?: string;
  downloadUrl?: string;
  documentationUrl?: string;
  links?: ProjectLink[];
  controls?: { action: Localized; keys: Localized }[];
  installation?: Localized[];
  credits?: Localized;
  visible: boolean;
  order: number;
}
