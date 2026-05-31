import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Target } from "lucide-react";
import {
  getProjectBySlug,
  getRelatedProjects,
  getDonationCauses,
  getSuggestedAmounts,
  getSiteSettings,
  getPageHero,
} from "@/lib/queries";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { DonateButton } from "@/components/shared/DonateButton";
import { DonationCTA } from "@/components/shared/DonationCTA";
import { DonationForm } from "@/components/donation/DonationForm";
import { Card, CardContent } from "@/components/ui/card";
import { calculateProgress, formatCurrency } from "@/lib/utils";
import { toProjectView } from "@/types/content";
import { createPageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return createPageMetadata({
    title: project.title,
    description: project.shortDescription,
    path: `/projects/${slug}`,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const raw = await getProjectBySlug(slug);
  if (!raw) notFound();

  const project = toProjectView(raw);
  const progress = calculateProgress(project.raisedAmount, project.targetAmount);
  const relatedRaw = await getRelatedProjects(slug);
  const related = relatedRaw.map(toProjectView);
  const [causes, suggestedAmounts, settings, ctaHero] = await Promise.all([
    getDonationCauses(),
    getSuggestedAmounts(),
    getSiteSettings(["donation.cta.title", "donation.cta.description"]),
    getPageHero("donation-cta"),
  ]);

  return (
    <>
      <div className="relative min-h-[50vh]">
        <ImageWithFallback
          src={project.imageUrl}
          alt={project.title}
          fill
          variant="dark"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Projects", href: "/projects" },
              { label: project.title },
            ]}
            className="text-white/70 [&_a]:text-white/80 [&_span]:text-white"
          />
          <h1 className="font-heading text-4xl font-semibold text-white sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-2 flex items-center gap-2 text-white/80">
            <MapPin className="h-4 w-4" />
            {project.location}
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-semibold">About This Project</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{project.description}</p>
              </div>
              <div>
                <h2 className="font-heading text-2xl font-semibold flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Project Goals
                </h2>
                <ul className="mt-4 space-y-2">
                  {project.goals.map((goal) => (
                    <li key={goal} className="flex gap-2 text-muted-foreground">
                      <span className="text-accent">•</span>
                      {goal}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-heading text-2xl font-semibold">Expected Impact</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {project.expectedImpact}
                </p>
              </div>
            </div>

            <div>
              <Card className="sticky top-24 border-primary/20 shadow-lg mb-8">
                <CardContent className="p-6 space-y-6">
                  <ProgressBar value={progress} />
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-primary">
                      {formatCurrency(project.raisedAmount)} raised
                    </span>
                    <span className="text-muted-foreground">
                      Goal {formatCurrency(project.targetAmount)}
                    </span>
                  </div>
                  <DonateButton className="w-full" size="lg" />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-16 border-t border-border pt-16">
            <h2 className="font-heading text-2xl font-semibold mb-8">Donate to This Project</h2>
            <DonationForm
              causes={causes}
              suggestedAmounts={suggestedAmounts}
              projectId={raw.id}
            />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-semibold mb-8">Related Projects</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <DonationCTA
        title={settings["donation.cta.title"] ?? ""}
        description={settings["donation.cta.description"] ?? ""}
        imageUrl={ctaHero?.imageUrl ?? "/images/hero/donation-cta.jpg"}
      />
    </>
  );
}
