export type NavLinkItem = { label: string; href: string };

export type DonationCauseItem = { id: string; slug: string; label: string };

export type ProjectView = {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  shortDescription: string;
  description: string;
  goals: string[];
  expectedImpact: string;
  imageUrl: string;
  targetAmount: number;
  raisedAmount: number;
};

export type CaseStoryView = {
  id: string;
  slug: string;
  title: string;
  location: string;
  category: string;
  excerpt: string;
  content: string[];
  impactSummary: string;
  imageUrl: string;
};

export function toProjectView(
  p: {
    slug: string;
    title: string;
    location: string;
    category: string;
    shortDescription: string;
    description: string;
    goals: string;
    expectedImpact: string;
    imageUrl: string;
    targetAmount: number;
    raisedAmount: number;
    id?: string;
  }
): ProjectView {
  return {
    id: p.id ?? p.slug,
    slug: p.slug,
    title: p.title,
    location: p.location,
    category: p.category,
    shortDescription: p.shortDescription,
    description: p.description,
    goals: JSON.parse(p.goals) as string[],
    expectedImpact: p.expectedImpact,
    imageUrl: p.imageUrl,
    targetAmount: p.targetAmount,
    raisedAmount: p.raisedAmount,
  };
}

export function toCaseStoryView(
  s: {
    slug: string;
    title: string;
    location: string;
    category: string;
    excerpt: string;
    content: string;
    impactSummary: string;
    imageUrl: string;
    id?: string;
  }
): CaseStoryView {
  return {
    id: s.id ?? s.slug,
    slug: s.slug,
    title: s.title,
    location: s.location,
    category: s.category,
    excerpt: s.excerpt,
    content: JSON.parse(s.content) as string[],
    impactSummary: s.impactSummary,
    imageUrl: s.imageUrl,
  };
}
