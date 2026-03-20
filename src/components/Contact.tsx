import { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <section id="contact" className="section-padding">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}>
        
        <p className="heading-section mb-16">Contact</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-4xl">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="space-y-8">
          
          {[
          { name: "name" as const, label: "Name", type: "text" },
          { name: "email" as const, label: "Email", type: "email" }].
          map((field) =>
          <div key={field.name}>
              <label className="heading-section text-[10px] block mb-3">{field.label}</label>
              <input
              type={field.type}
              value={formData[field.name]}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              className="w-full bg-transparent border-b border-border pb-2 text-sm font-light tracking-wide text-foreground focus:outline-none focus:border-foreground transition-colors duration-300 placeholder:text-muted-foreground/30"
              required />
            
            </div>
          )}
          <div>
            <label className="heading-section text-[10px] block mb-3">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full bg-transparent border-b border-border pb-2 text-sm font-light tracking-wide text-foreground focus:outline-none focus:border-foreground transition-colors duration-300 resize-none placeholder:text-muted-foreground/30"
              required />
            
          </div>
          <button
            type="submit"
            className="heading-section text-[10px] text-foreground hover:text-muted-foreground transition-colors duration-300 pt-4">
            
            Send Message →
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6">
          
          <div>
            <p className="heading-section text-[10px] mb-3">Email</p>
            <a className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-300" href="mailto:hello@gounaris.co.uk">
              hello@gounaris.co.uk
            </a>
          </div>
          <div>
            <p className="heading-section text-[10px] mb-3">Linkedin</p>
            <a className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors duration-300" href="https://www.linkedin.com/in/kostas-gounaris" target="_blank" rel="noopener noreferrer">
              ​Gounaris
            </a>
          </div>
          <div>
            <p className="heading-section text-[10px] mb-3">Location</p>
            <p className="text-sm font-light text-muted-foreground">London · Athens · Munich        </p>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default Contact;
