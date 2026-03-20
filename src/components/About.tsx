import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="section-padding">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}>
        
        <p className="heading-section mb-16">About</p>
      </motion.div>

      <div className="max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xl md:text-2xl font-extralight leading-relaxed tracking-wide text-foreground mb-8">
          
          Stillness in Structure
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="editorial-text mb-8">
          
          Ultra-minimal black and white photography that distills architecture to its purest form—light, line, and silence. Work as an exploration of balance and restraint, where absence becomes as significant as presence.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="editorial-text">
          
          Precise, almost analytical perspective to visual composition—seeking clarity, order, and quiet tension in every frame.
        </motion.p>
      </div>
    </section>);

};

export default About;