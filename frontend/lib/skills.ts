export type SkillLevel = "daily" | "working" | "learning" | "earlier";

export const levelLabels: Record<SkillLevel, string> = {
  daily: "Daily use",
  working: "Working knowledge",
  learning: "Learning",
  earlier: "Earlier career",
};

type SkillCategory = {
  name: string;
  blurb: string;
  skills: [name: string, level: SkillLevel][];
};

// CONFIRM EVERY LEVEL: these are first guesses from the resume only.
export const skillCategories: SkillCategory[] = [
  {
    name: "WordPress Development",
    blurb: "Custom themes and plugins, not just page builders.",
    skills: [
      ["Custom theme development", "daily"],
      ["Custom plugin development", "daily"],
      ["Custom post types", "daily"],
      ["Hooks and filters", "daily"],
      ["Advanced Custom Fields", "daily"],
      ["WordPress REST API", "working"],
      ["Gutenberg blocks", "working"],
      ["Elementor", "working"],
      ["Divi", "working"],
    ],
  },
  {
    name: "Frontend Development",
    blurb: "Responsive interfaces built on solid fundamentals.",
    skills: [
      ["HTML5", "daily"],
      ["CSS3", "daily"],
      ["SCSS", "working"],
      ["JavaScript (ES6+)", "daily"],
      ["jQuery", "working"],
      ["Bootstrap", "working"],
      ["Responsive design", "daily"],
    ],
  },
  // Uncomment and label honestly once you've decided:
  // {
  //   name: "Modern JavaScript",
  //   blurb: "...",
  //   skills: [
  //     ["TypeScript", "learning"],
  //     ["React", "learning"],
  //     ["Next.js", "learning"],
  //   ],
  // },
  {
    name: "Backend Development",
    blurb: "Server-side logic and databases.",
    skills: [
      ["PHP 8.x", "daily"],
      ["MySQL", "daily"],
      ["Classic ASP", "earlier"],
      ["ASP.NET", "earlier"],
      ["MS SQL Server", "earlier"],
    ],
  },
  {
    name: "E-commerce",
    blurb: "Stores that take payments reliably.",
    skills: [
      ["WooCommerce customization", "daily"],
      ["Stripe", "working"],
      ["PayPal", "working"],
    ],
  },
  {
    name: "API Integrations",
    blurb: "Connecting WordPress to other services.",
    skills: [
      ["Third-party APIs", "working"],
      ["REST APIs", "working"],
    ],
  },
  {
    name: "Performance Optimization",
    blurb: "Faster pages and healthier Core Web Vitals.",
    skills: [
      ["Core Web Vitals", "daily"],
      ["Speed optimization", "daily"],
      ["Caching", "daily"],
      ["CDN configuration", "daily"],
      ["Image optimization", "daily"],
      ["Technical SEO", "working"],
    ],
  },
  {
    name: "DevOps and Deployment",
    blurb: "Shipping, hosting and securing sites.",
    skills: [
      ["Git and GitHub", "daily"],
      ["GitHub Actions", "working"],
      ["WP Engine", "daily"],
      ["Kinsta", "working"],
      ["cPanel", "working"],
      ["Cloudflare", "daily"],
      ["DNS management", "daily"],
      ["Site migrations", "daily"],
      ["Staging and production workflows", "daily"],
      ["Security hardening", "working"],
    ],
  },
];
