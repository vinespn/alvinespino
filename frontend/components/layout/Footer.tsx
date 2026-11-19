import { cacheLife } from "next/cache";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export async function Footer() {
  "use cache";
  cacheLife("days"); // regenerate the footer at most every few days

  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t py-8">
      <Container>
        <p className="text-muted text-sm">
          © {year} {site.name}. {site.title}.
        </p>
      </Container>
    </footer>
  );
}
