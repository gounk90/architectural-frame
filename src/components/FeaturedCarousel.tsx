import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const featured = [
  { src: "/lovable-uploads/ca5486da-4f1b-4aba-9a7c-670e929b8999.jpg", title: "Form & Shadow" },
  { src: "/lovable-uploads/26d91cda-11e4-4155-8376-49d44b1e1ffd.jpg", title: "Infinite Corridor" },
  { src: "/lovable-uploads/90846b84-1bcf-4714-823a-3c9d1e2a6715.jpg", title: "Descending Light" },
  { src: "/lovable-uploads/e5b71382-0545-4150-9214-fc2b613f4f08.jpg", title: "Structural Poetry" },
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
