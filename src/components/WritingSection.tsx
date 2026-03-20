import { motion } from "framer-motion";

const writings = [
  {
    title: "Concrete as a Material.",
    excerpt: "A study in weight and permanence—where form resists time and silence settles into structure.",
    date: "2026.02",
  },
  {
    title: "Glass as a  Material. ",
    excerpt: "A threshold between presence and absence—revealing, reflecting, and quietly distorting what lies beyond.",
    date: "2026.01",
  },
  {
    title: "Sky as a Material. ",
    excerpt: "An ever-shifting void—limitless, intangible, yet grounding everything it surrounds.",
    date: "2025.12",
  },
  {
    title: "Light as a Material.",
    excerpt: "The unseen architect—shaping space, defining edges, and giving meaning to what remains.",
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
