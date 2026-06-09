
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  // Add scroll animation initialization
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const reveals = document.querySelectorAll(".reveal");
      
      reveals.forEach((reveal) => {
        const revealTop = (reveal as HTMLElement).getBoundingClientRect().top;
        const revealPoint = 100;
        
        if (revealTop < window.innerHeight - revealPoint) {
          reveal.classList.add("visible");
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check on load
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      {/* Allows #contact to scroll fully below the fixed header (page end clamp) */}
      <div className="h-24 md:h-80" aria-hidden="true" />
      <Footer />
    </div>
  );
};

export default Index;
