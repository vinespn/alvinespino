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
          <p className="font-mono text-sm text-accent">
            {site.name} · {site.title}
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">
            {site.headline}
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted">{site.description}</p>

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
            {heroStack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative code card: hidden from screen readers */}
        <div
          aria-hidden="true"
          className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm"
        >
          <div className="flex gap-2 border-b border-border px-4 py-3">
            <span className="size-3 rounded-full bg-border" />
            <span className="size-3 rounded-full bg-border" />
            <span className="size-3 rounded-full bg-border" />
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-sm leading-relaxed">
            <code>{snippet}</code>
          </pre>
        </div>
      </div>
    </Section>
  );
}
