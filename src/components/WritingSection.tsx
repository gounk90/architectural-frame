import { motion } from "framer-motion";

const writings = [
  {
    title: "On Silence in Concrete",
    excerpt: "The most profound architecture speaks in whispers. A concrete wall, left bare, becomes a canvas for light — shifting, fleeting, eternal.",
    date: "2026.02",
  },
  {
    title: "The Geometry of Absence",
    excerpt: "What defines a space is not what fills it, but what has been deliberately removed. Emptiness is the architect's most powerful material.",
    date: "2026.01",
  },
  {
    title: "Cities After Rain",
    excerpt: "Wet streets become mirrors. Every puddle holds a building upside down, reminding us that perspective is never fixed.",
    date: "2025.12",
  },
  {
    title: "Light as Material",
    excerpt: "Tadao Ando once said light is the origin of all being. In photography, we don't capture buildings — we capture the light that reveals them.",
    date: "2025.11",
  },
];

const WritingSection = () => {
  return (
    <section id="writing" className="section-padding">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <p className="heading-section mb-16">Journal</p>
      </motion.div>

      <div className="max-w-3xl">
        {writings.map((post, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group cursor-pointer py-10 border-b border-border first:border-t"
          >
            <div className="flex items-start justify-between gap-8 mb-4">
              <h3 className="text-lg md:text-xl font-extralight tracking-wide text-foreground group-hover:text-muted-foreground transition-colors duration-500">
                {post.title}
              </h3>
              <span className="text-[10px] tracking-[0.3em] text-muted-foreground/60 whitespace-nowrap mt-1.5">
                {post.date}
              </span>
            </div>
            <p className="editorial-text text-sm md:text-base max-w-xl">{post.excerpt}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default WritingSection;
