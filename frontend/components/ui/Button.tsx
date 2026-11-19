import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  download?: boolean;
};

const base =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const variants = {
  primary: "bg-accent text-accent-foreground hover:opacity-90",
  secondary: "border border-border hover:bg-surface",
};

export function Button({
  href,
  children,
  variant = "primary",
  download,
}: ButtonProps) {
  const className = `${base} ${variants[variant]}`;

  // Downloads and files use a plain <a>; internal navigation uses Next's <Link>.
  if (download) {
    return (
      <a href={href} download className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
