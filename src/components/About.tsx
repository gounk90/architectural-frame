import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="section-padding">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <p className="heading-section mb-16">About</p>
      </motion.div>

      <div className="max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-2xl font-extralight leading-relaxed tracking-wide text-foreground mb-8"
        >
          Lūmen is an architectural photography studio and editorial space based between Tokyo and Berlin.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="editorial-text mb-8"
        >
          We believe in the quiet power of space — the interplay of light, material, and void. Our work explores architecture not as structure, but as experience. Every photograph is an attempt to hold a moment of stillness within the built environment.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="editorial-text"
        >
          Through photography and writing, we document the invisible dialogue between human intention and physical form — finding beauty in reduction, meaning in emptiness, and poetry in concrete.
        </motion.p>
      </div>
    </section>
  );
};

export default About;
