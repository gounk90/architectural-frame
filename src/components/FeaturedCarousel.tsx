import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const featured = [
  { src: "/lovable-uploads/ca5486da-4f1b-4aba-9a7c-670e929b8999.jpg", title: "Form & Shadow" },
  { src: "/lovable-uploads/26d91cda-11e4-4155-8376-49d44b1e1ffd.jpg", title: "Infinite Corridor" },
  { src: "/lovable-uploads/90846b84-1bcf-4714-823a-3c9d1e2a6715.jpg", title: "Descending Light" },
  { src: "/lovable-uploads/e5b71382-0545-4150-9214-fc2b613f4f08.jpg", title: "Structural Poetry" },
];

const FeaturedCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + featured.length) % featured.length);
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % featured.length);
  }, []);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? "60%" : "-60%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-60%" : "60%", opacity: 0 }),
  };

  return (
    <section className="py-24 md:py-40">
      <div className="px-6 md:px-12 lg:px-24 mb-16 flex items-center justify-between">
        <p className="heading-section">Featured Work</p>
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            aria-label="Previous"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground font-light">
            {String(current + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
          </span>
          <button
            onClick={next}
            className="text-muted-foreground hover:text-foreground transition-colors duration-300"
            aria-label="Next"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="gallery-image aspect-[3/2] md:aspect-[2/1] mb-4">
              <img src={featured[current].src} alt={featured[current].title} loading="lazy" />
            </div>
            <p className="text-xs font-light tracking-[0.2em] text-muted-foreground mt-4">
              {featured[current].title}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
