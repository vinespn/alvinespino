import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Contact />
    </>
  );
}
