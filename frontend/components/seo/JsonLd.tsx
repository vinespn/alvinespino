import { contact, seoDescription, site, siteUrl } from "@/lib/site";

const data = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  url: siteUrl,
  description: seoDescription,
  address: { "@type": "PostalAddress", addressCountry: "PH" },
  knowsAbout: [
    "WordPress",
    "WooCommerce",
    "PHP",
    "JavaScript",
    "Website performance optimization",
  ],
  // Only profiles you've actually filled in; empty strings are removed.
  sameAs: [contact.linkedin, contact.github].filter(Boolean),
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      // Escaping "<" prevents a stray "</script>" in the data from breaking out of the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
