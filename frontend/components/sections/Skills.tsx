import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { levelLabels, skillCategories, type SkillLevel } from "@/lib/skills";

const chipStyles: Record<SkillLevel, string> = {
  daily: "border-accent/60",
  working: "border-border text-muted",
  learning: "border-dashed border-border text-muted",
  earlier: "border-border text-muted",
};

const dotStyles: Record<SkillLevel, string> = {
  daily: "bg-accent",
  working: "bg-muted",
  learning: "border border-muted",
  earlier: "bg-border",
};

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Technical skills"
        title="What I work with, and how well."
        description="Labeled by how I actually use each skill, not by a percentage."
      />

      <ul
        className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted"
        aria-label="Legend"
      >
        {(Object.keys(levelLabels) as SkillLevel[]).map((level) => (
          <li key={level} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`size-2 rounded-full ${dotStyles[level]}`}
            />
            {levelLabels[level]}
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {skillCategories.map((category) => (
          <article
            key={category.name}
            className="rounded-xl border border-border bg-surface p-6"
          >
            <h3 className="text-xl font-semibold tracking-tight">
              {category.name}
            </h3>
            <p className="mt-1 text-sm text-muted">{category.blurb}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {category.skills.map(([name, level]) => (
                <li
                  key={name}
                  title={levelLabels[level]}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${chipStyles[level]}`}
                >
                  <span
                    aria-hidden="true"
                    className={`size-1.5 rounded-full ${dotStyles[level]}`}
                  />
                  {name}
                  <span className="sr-only"> ({levelLabels[level]})</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
