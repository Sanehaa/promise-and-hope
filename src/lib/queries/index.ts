import { prisma } from "@/lib/prisma";

export async function getSiteSetting(key: string): Promise<string | null> {
  const row = await prisma.siteSetting.findUnique({ where: { key } });
  return row?.value ?? null;
}

export async function getSiteSettings(keys: string[]): Promise<Record<string, string>> {
  const rows = await prisma.siteSetting.findMany({ where: { key: { in: keys } } });
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export async function getNavLinks(group: "main" | "footer_quick" | "footer_useful") {
  return prisma.navLink.findMany({
    where: { group, published: true },
    orderBy: { sortOrder: "asc" },
    select: { label: true, href: true },
  });
}

/** Single query for layout — avoids 3 parallel connections on a small pool */
export async function getLayoutNavLinks() {
  const rows = await prisma.navLink.findMany({
    where: {
      published: true,
      group: { in: ["main", "footer_quick", "footer_useful"] },
    },
    orderBy: { sortOrder: "asc" },
    select: { label: true, href: true, group: true },
  });

  const pick = (group: string) =>
    rows
      .filter((r) => r.group === group)
      .map(({ label, href }) => ({ label, href }));

  return {
    main: pick("main"),
    footerQuick: pick("footer_quick"),
    footerUseful: pick("footer_useful"),
  };
}

export async function getPageHero(pageKey: string) {
  return prisma.pageHero.findUnique({ where: { pageKey } });
}

export async function getSuggestedAmounts(): Promise<number[]> {
  const raw = await getSiteSetting("donation.suggested_amounts");
  if (!raw) return [10, 25, 50, 100, 250];
  try {
    return JSON.parse(raw) as number[];
  } catch {
    return [10, 25, 50, 100, 250];
  }
}

export async function getDonationCauses() {
  return prisma.donationCause.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
    select: { id: true, slug: true, label: true },
  });
}

export async function getDonationCauseBySlug(slug: string) {
  return prisma.donationCause.findUnique({ where: { slug } });
}

export async function getServices() {
  return prisma.service.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getHomeServices() {
  return prisma.service.findMany({
    where: { published: true, showOnHome: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getServiceBySlug(slug: string) {
  return prisma.service.findUnique({ where: { slug } });
}

export async function getProjects(featuredOnly = false) {
  return prisma.project.findMany({
    where: { published: true, ...(featuredOnly ? { featured: true } : {}) },
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({ where: { slug } });
}

export async function getProjectSlugs() {
  const rows = await prisma.project.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

export async function getRelatedProjects(slug: string, limit = 3) {
  const current = await getProjectBySlug(slug);
  if (!current) return getProjects();
  return prisma.project.findMany({
    where: { published: true, slug: { not: slug }, category: current.category },
    take: limit,
    orderBy: { sortOrder: "asc" },
  });
}

export async function getProjectCategories() {
  const rows = await prisma.project.findMany({
    where: { published: true },
    select: { category: true },
    distinct: ["category"],
  });
  return ["All", ...rows.map((r) => r.category)];
}

export async function getCaseStories(featuredOnly = false) {
  return prisma.caseStory.findMany({
    where: { published: true, ...(featuredOnly ? { featured: true } : {}) },
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }],
  });
}

export async function getCaseStoryBySlug(slug: string) {
  return prisma.caseStory.findUnique({ where: { slug } });
}

export async function getCaseStorySlugs() {
  const rows = await prisma.caseStory.findMany({
    where: { published: true },
    select: { slug: true },
  });
  return rows.map((r) => r.slug);
}

export async function getRelatedStories(slug: string, limit = 3) {
  return prisma.caseStory.findMany({
    where: { published: true, slug: { not: slug } },
    take: limit,
    orderBy: { sortOrder: "asc" },
  });
}

export async function getStoryCategories() {
  const rows = await prisma.caseStory.findMany({
    where: { published: true },
    select: { category: true },
    distinct: ["category"],
  });
  return ["All", ...rows.map((r) => r.category)];
}

export async function getRegionalOffices() {
  return prisma.regionalOffice.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getGalleryItems() {
  return prisma.galleryItem.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getGalleryCategories() {
  const rows = await prisma.galleryItem.findMany({
    where: { published: true },
    select: { category: true },
    distinct: ["category"],
  });
  return ["All", ...rows.map((r) => r.category)];
}

export async function getTestimonials() {
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getImpactStats() {
  return prisma.impactStat.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getCoreValues() {
  return prisma.coreValue.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getTimelineEvents() {
  return prisma.timelineEvent.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getTeamMembers() {
  return prisma.teamMember.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getDonationByReference(reference: string) {
  return prisma.donation.findUnique({
    where: { reference },
    include: { cause: true, project: true },
  });
}

export async function getDonationByStripeSession(sessionId: string) {
  return prisma.donation.findUnique({
    where: { stripeSessionId: sessionId },
    include: { cause: true },
  });
}

export function parseJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [value];
  } catch {
    return [value];
  }
}
