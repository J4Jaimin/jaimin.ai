import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import TechMarquee from "@/components/ui/TechMarquee";

export default function Home() {
  return (
    <>
      <Hero />
      <TechMarquee />
      <Services />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
