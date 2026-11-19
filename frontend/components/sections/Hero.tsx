import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { heroStack, site } from "@/lib/site";

const snippet = `<?php
// Register a custom post type
add_action( 'init', function () {
    register_post_type( 'project', [
        'public'       => true,
        'show_in_rest' => true,
        'supports'     => [ 'title', 'editor', 'thumbnail' ],
    ] );
} );`;

export function Hero() {
  return (
    <Section className="pt-16 md:pt-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <p className="text-accent font-mono text-sm">
            {site.name} · {site.title}
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">
            {site.headline}
          </h1>
          <p className="text-muted mt-6 max-w-lg text-lg">{site.description}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/#projects">View My Projects</Button>
            <Button href={site.resumeUrl} variant="secondary" download>
              Download Resume
            </Button>
          </div>

          <ul
            className="mt-10 flex flex-wrap gap-2"
            aria-label="Core technologies"
          >
            {heroStack.map((tech, i) => (
              <li
                key={tech}
                style={{ animationDelay: `${300 + i * 60}ms` }}
                className="border-border text-muted motion-safe:animate-fade-up rounded-full border px-3 py-1 font-mono text-xs"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative code card: hidden from screen readers */}
        <div
          aria-hidden="true"
          style={{ animationDelay: "200ms" }}
          className="border-border bg-surface motion-safe:animate-fade-up overflow-hidden rounded-xl border shadow-sm"
        >
          <div className="border-border flex gap-2 border-b px-4 py-3">
            <span className="bg-border size-3 rounded-full" />
            <span className="bg-border size-3 rounded-full" />
            <span className="bg-border size-3 rounded-full" />
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
            <code>{snippet}</code>
          </pre>
        </div>
      </div>
    </Section>
  );
}
