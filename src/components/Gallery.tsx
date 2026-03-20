import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  { src: "/lovable-uploads/ca5486da-4f1b-4aba-9a7c-670e929b8999.jpg", title: "Concrete Geometry", location: "A" },
  { src: "/lovable-uploads/8063bf0d-9c99-4c5a-8694-9601d9201b7e.jpg", title: "Glass Ascent", location: "B" },
  { src: "/lovable-uploads/26d91cda-11e4-4155-8376-49d44b1e1ffd.jpg", title: "Light Corridor", location: "C" },
  { src: "/lovable-uploads/90846b84-1bcf-4714-823a-3c9d1e2a6715.jpg", title: "Spiral Descent", location: "D" },
  { src: "/lovable-uploads/34fa979a-f140-49da-b3ef-6b9955d1ebfc.jpg", title: "Gallery Space", location: "E" },
  { src: "/lovable-uploads/0aac1501-a088-4def-b845-947309823786.jpg", title: "Steel Tension", location: "F" },
  { src: "/lovable-uploads/60c69900-cf55-4ed9-bf04-bfdcee3895e0.jpg", title: "Silent Frame", location: "G" },
  { src: "/lovable-uploads/ec1b83a4-422b-4973-8456-8e6d0f0660eb.jpg", title: "Horizon Line", location: "Barcelona" },
  { src: "/lovable-uploads/2ef97498-fe6d-4762-a20b-38fbe3092523.jpg", title: "Depth & Form", location: "Milan" },
];

const Gallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => (i !== null ? (i - 1 + photos.length) % photos.length : null)), []);
  const next = useCallback(() => setLightboxIndex((i) => (i !== null ? (i + 1) % photos.length : null)), []);

  return (
    <section id="gallery" className="section-padding">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <p className="heading-section mb-16">Gallery</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className={`gallery-image ${i === 0 || i === 5 ? "md:col-span-2 aspect-[2/1]" : i === 4 ? "lg:row-span-2 aspect-square lg:aspect-auto lg:h-full" : "aspect-square"}`}
            onClick={() => openLightbox(i)}
          >
            <img src={photo.src} alt={photo.title} loading="lazy" />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={photos}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

interface LightboxProps {
  photos: typeof photos;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox = ({ photos, index, onClose, onPrev, onNext }: LightboxProps) => {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-primary/95 flex items-center justify-center"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
    >
      <button onClick={onClose} className="absolute top-6 right-6 text-primary-foreground/60 hover:text-primary-foreground text-xs tracking-[0.3em] uppercase transition-colors">
        Close
      </button>
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-6 text-primary-foreground/60 hover:text-primary-foreground text-xs tracking-[0.3em] transition-colors">
        ←
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-6 text-primary-foreground/60 hover:text-primary-foreground text-xs tracking-[0.3em] transition-colors">
        →
      </button>

      <motion.img
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        src={photos[index].src}
        alt={photos[index].title}
        className="max-h-[80vh] max-w-[90vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      <div className="absolute bottom-8 text-center">
        <p className="text-primary-foreground/40 text-[10px] tracking-[0.3em] mt-1 uppercase">{photos[index].location}</p>
      </div>
    </motion.div>
  );
};

export default Gallery;
