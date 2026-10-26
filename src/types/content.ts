import type { Locale } from "@/i18n/config";

/** A value translated into every supported locale. */
export type Localized<T> = Record<Locale, T>;

export type ProjectCategory = "web" | "mobile" | "backend" | "open-source";

export type ProjectStatus = "in-development" | "beta" | "live" | "archived";

/** Decorative fallback rendered when a project has no cover image yet. */
export type ProjectVisual = "orbit" | "grid";

export type ProjectImage = {
  src: string;
  alt: Localized<string>;
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  description: Localized<string>;
  summary?: Localized<string>;
  categories: ProjectCategory[];
  technologies: string[];
  year: number;
  status: ProjectStatus;
  coverImage?: ProjectImage;
  visual?: ProjectVisual;
  gallery?: ProjectImage[];
  challenges?: Localized<string[]>;
  solutions?: Localized<string[]>;
  outcomes?: Localized<string[]>;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
};

export type PostCategory =
  | "swiftui"
  | "kotlin"
  | "react"
  | "architecture"
  | "engineering";

/** Exported as `metadata` from every MDX article. */
export type PostMetadata = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: PostCategory;
  /** Drafts are visible in development only. */
  draft?: boolean;
};

export type Post = PostMetadata & {
  slug: string;
  locale: Locale;
  readingTime: number;
  headings: { id: string; text: string; level: 2 | 3 }[];
};
