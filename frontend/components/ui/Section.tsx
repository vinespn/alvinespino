import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = { id?: string; children: ReactNode; className?: string };

export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
