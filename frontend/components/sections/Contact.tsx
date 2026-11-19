import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const links = [
    contact.email && {
      label: "Email",
      href: `mailto:${contact.email}`,
      text: contact.email,
    },
    contact.linkedin && {
      label: "LinkedIn",
      href: contact.linkedin,
      text: "LinkedIn profile",
    },
    contact.github && {
      label: "GitHub",
      href: contact.github,
      text: "GitHub profile",
    },
  ].filter(Boolean) as { label: string; href: string; text: string }[];

  return (
    <Section id="contact">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's talk."
            description={contact.availability}
          />
          {links.length > 0 && (
            <ul className="mt-8 space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <span className="text-muted text-sm">{link.label}: </span>
                  <a
                    href={link.href}
                    className="hover:text-accent underline underline-offset-4"
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
