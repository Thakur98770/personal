import Hero from "../sections/Hero";
import AboutIntro from "../sections/AboutIntro";
import Services from "../sections/Services";
import Work from "../sections/Work";
import About from "../sections/About";
import Contact from "../sections/Contact";

export default function Home({ ready }) {
  return (
    <>
      <Hero ready={ready} />
      <AboutIntro />
      <Services />
      <Work />
      <About />
      <Contact />
    </>
  );
}
