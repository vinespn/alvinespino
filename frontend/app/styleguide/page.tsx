import { Section } from "@/components/ui/Section";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const swatches = [
  ["background", "bg-background"],
  ["surface", "bg-surface"],
  ["border", "bg-border"],
  ["muted", "bg-muted"],
  ["accent", "bg-accent"],
  ["foreground", "bg-foreground"],
];

export default function StyleGuide() {
  return (
    <main>
      <Section>
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Style guide
          </h1>
          <ThemeToggle />
        </div>

        <p className="mt-6 max-w-xl text-lg text-muted">
          Body text in the muted color. Check readability in both themes.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-6">
          {swatches.map(([name, cls]) => (
            <div key={name}>
              <div className={`h-16 rounded-lg border border-border ${cls}`} />
              <p className="mt-2 font-mono text-sm">{name}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex gap-4">
          <button className="rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground">
            Primary button
          </button>
          <button className="rounded-full border border-border px-6 py-3 font-medium">
            Secondary button
          </button>
        </div>

        <p className="mt-12 font-mono text-sm text-accent">
          Mono accent text, like a tech label
        </p>
      </Section>
    </main>
  );
}
