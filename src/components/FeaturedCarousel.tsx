import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import photo1 from "@/assets/photo-1.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";
import photo6 from "@/assets/photo-6.jpg";

const featured = [
  { src: photo1, title: "Form & Shadow" },
  { src: photo3, title: "Infinite Corridor" },
  { src: photo4, title: "Descending Light" },
  { src: photo6, title: "Structural Poetry" },
];

const FeaturedCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section className="py-24 md:py-40 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24 mb-16">
        <p className="heading-section">Featured Work</p>
      </div>
      <div ref={containerRef}>
        <motion.div style={{ x }} className="flex gap-6 pl-6 md:pl-12 lg:pl-24">
          {featured.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="flex-shrink-0 w-[70vw] md:w-[45vw] lg:w-[35vw]"
            >
              <div className="gallery-image aspect-[3/2] mb-4">
                <img src={item.src} alt={item.title} loading="lazy" />
              </div>
              <p className="text-xs font-light tracking-[0.2em] text-muted-foreground">{item.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;
