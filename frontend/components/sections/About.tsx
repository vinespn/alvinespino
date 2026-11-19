import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/lib/site";

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 md:grid-cols-2">
        <SectionHeading
          eyebrow="About"
          title="Twenty years of building for the web."
        />
        <div className="space-y-5 text-lg text-muted">
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>

      <dl className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-3">
        {about.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse">
            <dt className="mt-1 text-sm text-muted">{stat.label}</dt>
            <dd className="text-4xl font-semibold tracking-tight md:text-5xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
