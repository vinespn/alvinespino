import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-border border-t py-8">
      <Container>
        <p className="text-muted text-sm">
          © {new Date().getFullYear()} {site.name}. {site.title}.
        </p>
      </Container>
    </footer>
  );
}
