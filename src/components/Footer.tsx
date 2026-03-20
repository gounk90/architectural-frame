const Footer = () => {
  return (
    <footer className="px-6 md:px-12 lg:px-24 py-12 border-t border-border">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 font-light">
          © 2026 Gounaris - WIP..  
        </p>
        <div className="flex items-center gap-6">
          <a href="#" className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60 hover:text-foreground transition-colors duration-300 font-light">
            Instagram
          </a>
          <a href="mailto:hello@lumen.studio" className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60 hover:text-foreground transition-colors duration-300 font-light">
            Email
          </a>
        </div>
      </div>
    </footer>);

};

export default Footer;