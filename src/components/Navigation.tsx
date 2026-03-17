import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const { scrollYProgress } = useScroll();
  const navOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0.85]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      style={{ opacity: navOpacity }}
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 lg:px-24 h-16 transition-all duration-500 ${
      scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"}`
      }>
      
      <button onClick={() => scrollTo("hero")} className="heading-section text-foreground tracking-[0.4em] text-xs font-thin">
        HELLO 
      </button>
      <div className="flex items-center gap-10">
        <div className="hidden md:flex items-center gap-10">
          {["gallery", "writing", "about", "contact"].map((item) =>
          <button
            key={item}
            onClick={() => scrollTo(item)}
            className="heading-section text-[10px] hover:text-foreground transition-colors duration-300">
              {item}
            </button>
          )}
        </div>
        <button
          onClick={toggleDark}
          className="text-muted-foreground hover:text-foreground transition-colors duration-300"
          aria-label="Toggle dark mode">
          
          {dark ? <Sun size={14} strokeWidth={1.5} /> : <Moon size={14} strokeWidth={1.5} />}
        </button>
      </div>
    </motion.nav>);

};
export default Navigation;