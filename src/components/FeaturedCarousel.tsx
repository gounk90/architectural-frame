import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useAnimationFrame } from "framer-motion";

const featured = [
  { src: "/lovable-uploads/ca5486da-4f1b-4aba-9a7c-670e929b8999.jpg", title: "" },
  { src: "/lovable-uploads/26d91cda-11e4-4155-8376-49d44b1e1ffd.jpg", title: "" },
  { src: "/lovable-uploads/90846b84-1bcf-4714-823a-3c9d1e2a6715.jpg", title: "" },
  { src: "/lovable-uploads/e5b71382-0545-4150-9214-fc2b613f4f08.jpg", title: "" },
  { src: "/lovable-uploads/8063bf0d-9c99-4c5a-8694-9601d9201b7e.jpg", title: "" },
  { src: "/lovable-uploads/b12227cd-cf2d-4572-90de-951ffb713459.jpg", title: "" },
];

// Duplicate for seamless loop
const items = [...featured, ...featured];

const SPEED = 0.5; // pixels per frame
const ITEM_WIDTH = 420; // px per item including gap
const GAP = 16;
const FRICTION = 0.95; // momentum decay per frame
const MIN_VELOCITY = 0.1; // stop threshold

const FeaturedCarousel = () => {
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const offsetX = useMotionValue(0);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const totalWidth = featured.length * (ITEM_WIDTH + GAP);

  // Momentum tracking
  const velocity = useRef(0);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const isMomentum = useRef(false);

  useAnimationFrame(() => {
    if (dragging) return;

    // Apply momentum after drag release
    if (isMomentum.current) {
      velocity.current *= FRICTION;
      if (Math.abs(velocity.current) < MIN_VELOCITY) {
        isMomentum.current = false;
        velocity.current = 0;
      } else {
        let current = offsetX.get() + velocity.current;
        if (current <= -totalWidth) current += totalWidth;
        if (current > 0) current -= totalWidth;
        offsetX.set(current);
        return;
      }
    }

    if (hovered) return;

    // Normal auto-scroll
    let current = offsetX.get() - SPEED;
    if (current <= -totalWidth) current += totalWidth;
    offsetX.set(current);
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    isMomentum.current = false;
    velocity.current = 0;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetX.get();
    lastPointerX.current = e.clientX;
    lastPointerTime.current = performance.now();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const now = performance.now();
    const dt = now - lastPointerTime.current;
    if (dt > 0) {
      velocity.current = (e.clientX - lastPointerX.current) / Math.max(dt, 1) * 16; // normalize to ~per frame
    }
    lastPointerX.current = e.clientX;
    lastPointerTime.current = now;

    const delta = e.clientX - dragStartX.current;
    let next = dragStartOffset.current + delta;
    if (next <= -totalWidth) next += totalWidth;
    if (next > 0) next -= totalWidth;
    offsetX.set(next);
  };

  const handlePointerUp = () => {
    setDragging(false);
    // Clamp velocity to reasonable range
    velocity.current = Math.max(-30, Math.min(30, velocity.current));
    if (Math.abs(velocity.current) > MIN_VELOCITY) {
      isMomentum.current = true;
    }
  };

  const openLightbox = useCallback((i: number) => {
    if (!dragging) setLightboxIndex(i % featured.length);
  }, [dragging]);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevLightbox = useCallback(() => setLightboxIndex((i) => (i !== null ? (i - 1 + featured.length) % featured.length : null)), []);
  const nextLightbox = useCallback(() => setLightboxIndex((i) => (i !== null ? (i + 1) % featured.length : null)), []);

  const clickGuard = useRef(false);

  const handlePointerDownGuard = (e: React.PointerEvent) => {
    clickGuard.current = false;
    dragStartX.current = e.clientX;
    handlePointerDown(e);
  };

  const handlePointerMoveGuard = (e: React.PointerEvent) => {
    if (dragging && Math.abs(e.clientX - dragStartX.current) > 5) {
      clickGuard.current = true;
    }
    handlePointerMove(e);
  };

  const handleClick = (i: number) => {
    if (!clickGuard.current) openLightbox(i);
  };

  return (
    <section className="py-24 md:py-40 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-24 mb-12">
        <p className="heading-section">Featured Work</p>
      </div>

      <div
        className="relative select-none"
        style={{ cursor: dragging ? "grabbing" : "grab" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onPointerDown={handlePointerDownGuard}
        onPointerMove={handlePointerMoveGuard}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <motion.div
          className="flex"
          style={{ x: offsetX, gap: GAP }}
        >
          {items.map((photo, i) => (
            <div
              key={i}
              className="shrink-0 group"
              style={{ width: ITEM_WIDTH }}
              onClick={() => handleClick(i)}
            >
              <div className="gallery-image aspect-[3/2] rounded-sm overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  draggable={false}
                  className="pointer-events-none"
                />
              </div>
              <p className="text-xs font-light tracking-[0.2em] text-muted-foreground mt-3">
                {photo.title}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-primary/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 text-primary-foreground/60 hover:text-primary-foreground text-xs tracking-[0.3em] uppercase transition-colors">
              Close
            </button>
            <button onClick={(e) => { e.stopPropagation(); prevLightbox(); }} className="absolute left-6 text-primary-foreground/60 hover:text-primary-foreground text-xs tracking-[0.3em] transition-colors">
              ←
            </button>
            <button onClick={(e) => { e.stopPropagation(); nextLightbox(); }} className="absolute right-6 text-primary-foreground/60 hover:text-primary-foreground text-xs tracking-[0.3em] transition-colors">
              →
            </button>
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              src={featured[lightboxIndex].src}
              alt={featured[lightboxIndex].title}
              className="max-h-[80vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-8 text-center">
              <p className="text-primary-foreground/80 text-xs tracking-[0.2em] font-light">{featured[lightboxIndex].title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturedCarousel;
