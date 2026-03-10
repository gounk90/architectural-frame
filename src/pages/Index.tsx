import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import WritingSection from "@/components/WritingSection";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { CursorFollower, GrainOverlay, ScrollProgress, SmoothScrollProvider } from "@/components/VisualEffects";

const Index = () => {
  return (
    <SmoothScrollProvider>
      <CursorFollower />
      <GrainOverlay />
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        <div className="thin-divider" />
        <Gallery />
        <FeaturedCarousel />
        <div className="thin-divider" />
        <WritingSection />
        <div className="thin-divider" />
        <About />
        <div className="thin-divider" />
        <Contact />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
};

export default Index;
