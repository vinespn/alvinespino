import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/lib/site";

export function About() {
  return (
    <Section id="about">
      <Reveal>
        <div className="grid gap-12 md:grid-cols-2">
          <SectionHeading
            eyebrow="About"
            title="Twenty years of building for the web."
          />
          <div className="text-muted space-y-5 text-lg">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-16" delay={100}>
        <dl className="border-border grid gap-8 border-t pt-10 sm:grid-cols-3">
          {about.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse">
              <dt className="text-muted mt-1 text-sm">{stat.label}</dt>
              <dd className="text-4xl font-semibold tracking-tight md:text-5xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
