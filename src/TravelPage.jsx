import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import FogEffect from "./FogEffect";
import { usePageTransition } from "./usePageTransition";
import indiaMap from "./assets/india.svg?url";
import "./TravelPage.css";


const travels = [
  {
    id: 1,
    place: "Kashmir",
    country: "India",
    tag: "Valleys · Snow Peaks",
    description: "Dal Lake at dawn, saffron fields in autumn and mountains so vast they make every worry feel small.",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=80",
    color: "#4facfe",
    coords: { x: 23.4, y: 9.7 },
  },
  {
    id: 2,
    place: "Meghalaya",
    country: "India",
    tag: "Clouds · Living Roots",
    description: "The abode of clouds — rolling green hills, living root bridges and waterfalls that seem to fall from the sky itself.",
    img: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=900&q=80",
    color: "#11998e",
    coords: { x: 80.7, y: 38.3 },
  },
  {
    id: 3,
    place: "Assam",
    country: "India",
    tag: "Tea · Wildlife",
    description: "Endless tea gardens, the mighty Brahmaputra and one-horned rhinos wandering through Kaziranga's grasslands.",
    img: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=900&q=80",
    color: "#f7971e",
    coords: { x: 85.9, y: 36.0 },
  },
  {
    id: 4,
    place: "Kerala",
    country: "India",
    tag: "Backwaters · Spices",
    description: "Houseboat mornings on glassy backwaters, spice-scented air and sunsets that melt into the Arabian Sea.",
    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&q=80",
    color: "#43e97b",
    coords: { x: 28.6, y: 87.0 },
  },
  {
    id: 5,
    place: "Goa",
    country: "India",
    tag: "Beach · Vibes",
    description: "Golden sands, vibrant beach shacks and sunsets that paint the Arabian Sea in a hundred shades of orange.",
    img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900&q=80",
    color: "#ff6b35",
    coords: { x: 20.7, y: 72.3 },
  },
  {
    id: 6,
    place: "Pondicherry",
    country: "India",
    tag: "French Quarter · Cafés",
    description: "Pastel-coloured colonial streets, bougainvillea walls and a tranquil seafront that blends Tamil soul with French charm.",
    img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&q=80",
    color: "#f093fb",
    coords: { x: 40.7, y: 83.7 },
  },
  {
    id: 7,
    place: "Delhi",
    country: "India",
    tag: "Heritage · Street Food",
    description: "Mughal monuments, chaotic bazaars, the best street food in the country and centuries of layered history at every corner.",
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=900&q=80",
    color: "#ff004f",
    coords: { x: 31.7, y: 28.0 },
  },
  {
    id: 8,
    place: "Tamil Nadu",
    country: "India",
    tag: "Temples · Culture",
    description: "Towering gopurams, Carnatic music drifting through corridors and a classical culture rooted deeply in every stone.",
    img: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=900&q=80",
    color: "#c850c0",
    coords: { x: 36.9, y: 86.7 },
  },
  {
    id: 9,
    place: "Chandigarh",
    country: "India",
    tag: "Architecture · Gardens",
    description: "Le Corbusier's planned city — wide boulevards, the surreal Rock Garden and a clean green energy unlike any Indian city.",
    img: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=900&q=80",
    color: "#4facfe",
    coords: { x: 30.3, y: 21.0 },
  },
  {
    id: 10,
    place: "Karnataka",
    country: "India",
    tag: "Ruins · Coffee Hills",
    description: "Hampi's boulder-strewn ruins, Coorg's misty coffee hills, Mysore's palaces and a coast that stays untouched.",
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80",
    color: "#f7971e",
    coords: { x: 26.6, y: 72.3 },
  },
  {
    id: 11,
    place: "Andhra Pradesh",
    country: "India",
    tag: "Temples · Coastline",
    description: "The sacred corridor of Tirupati, untouched Araku Valley, fiery cuisine and a long scenic coastline.",
    img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=900&q=80",
    color: "#ff6b35",
    coords: { x: 40.3, y: 68.3 },
  },
  {
    id: 12,
    place: "Telangana",
    country: "India",
    tag: "Hyderabad · Forts",
    description: "Biryanis that define a city, the grand Charminar at dusk and Ramoji Film City — Telangana is boldly its own story.",
    img: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=900&q=80",
    color: "#c850c0",
    coords: { x: 36.2, y: 65.3 },
  },
];

/* ── India Map overview slide ─────────────────────────────────────── */
function MapView({ onSelect, onStart }) {
  const [hovered, setHovered]    = useState(null);
  const transitionTo             = usePageTransition();
  return (
    <div className="tp-map-view">
      <div className="tp-map-wrap">
        <img src={indiaMap} alt="India" className="tp-map-img" draggable={false} />
        {travels.map((t, i) => (
          <button
            key={t.id}
            className="tp-map-pin"
            style={{ left: `${t.coords.x}%`, top: `${t.coords.y}%` }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => transitionTo(`/travel/${t.id}`)}
            aria-label={t.place}
          >
            <span className="tp-map-dot" style={{ background: t.color }} />
            <span className="tp-map-pulse" style={{ borderColor: t.color }} />
            <AnimatePresence>
              {hovered === i && (
                <motion.span
                  className="tp-map-tooltip"
                  style={{ background: t.color }}
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.9 }}
                  transition={{ duration: 0.18 }}
                >
                  {t.place}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
      <button className="tp-map-start" onClick={onStart}>
        Explore Destinations →
      </button>
    </div>
  );
}

const variants = {
  enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 0.94 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, scale: 0.94 }),
};

export default function TravelPage() {
  const [active, setActive] = useState(-1);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const navigate = useNavigate();
  const transitionTo = usePageTransition();
  const dragStartX = useRef(null);

  const go = useCallback(
    (next) => {
      const clamped = Math.max(-1, Math.min(travels.length - 1, next));
      setDirection(next > active ? 1 : -1);
      window.gtag?.('event', 'travel_click' + clamped, { source: 'page' });
      setActive(clamped);
    },
    [active]
  );

  const prev = () => go(active - 1);
  const next = () => go(active + 1);

  const spot = active >= 0 ? travels[active] : null;

  return (
    <>
      <FogEffect />
      <Header />
      <section
        className="tp-section"
        ref={sectionRef}
        onPointerDown={(e) => { dragStartX.current = e.clientX; }}
        onPointerUp={(e) => {
          if (dragStartX.current === null) return;
          const diff = dragStartX.current - e.clientX;
          if (diff > 50) next();
          else if (diff < -50) prev();
          dragStartX.current = null;
        }}
      >
        {/* ── Background image cross-fade ── */}
        <AnimatePresence>
          {spot && (
            <motion.div
              key={`bg-${active}`}
              className="tp-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ backgroundImage: `url(${spot.img})` }}
            />
          )}
        </AnimatePresence>
        <div className="tp-overlay" />

        {/* ── Left panel ── */}
        <motion.div
          className="tp-left"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <button className="tp-back" onClick={() => navigate("/hobbies")}>
            ← Back
          </button>
          <p className="tp-sub">Places I've been</p>
          <h2 className="tp-heading">My<br />Travels</h2>

          <div className="tp-counter">
            {active === -1 ? (
              <span className="tp-count-active">{travels.length} places</span>
            ) : (
              <>
                <span className="tp-count-active">{String(active + 1).padStart(2, "0")}</span>
                <span className="tp-count-sep"> / </span>
                <span className="tp-count-total">{String(travels.length).padStart(2, "0")}</span>
              </>
            )}
          </div>

          <div className="tp-nav">
            <button className="tp-btn tp-btn--prev" onClick={prev} disabled={active === -1} aria-label="Previous">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className="tp-btn tp-btn--next" onClick={next} disabled={active === travels.length - 1} aria-label="Next">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          <button className="tp-gallery-link" onClick={() => transitionTo("/gallery")}>
            <span>View Gallery</span>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
              <path d="M2 14l5-5 3 3 4-6 4 8H2z" />
              <circle cx="7" cy="6" r="1.5" />
            </svg>
          </button>

          <div className="tp-dots">
            <button
              className={`tp-dot tp-dot--map${active === -1 ? " tp-dot--active" : ""}`}
              style={active === -1 ? { background: "#fff" } : {}}
              onClick={() => go(-1)}
              aria-label="Map overview"
              title="Map overview"
            />
            {travels.map((_, i) => (
              <button
                key={i}
                className={`tp-dot${i === active ? " tp-dot--active" : ""}`}
                style={i === active ? { background: spot.color } : {}}
                onClick={() => go(i)}
                aria-label={`Go to ${travels[i].place}`}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Right panel ── */}
        <div className="tp-right">
          {active === -1 ? (
            <MapView onSelect={(i) => go(i)} onStart={() => go(0)} />
          ) : (
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={active}
                className="tp-card"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                style={{ "--card-color": spot.color }}
              >
                <div className="tp-card-img-wrap">
                  <img src={spot.img} alt={spot.place} className="tp-card-img" draggable={false} />
                  <div className="tp-card-img-overlay" />
                </div>

                <div className="tp-card-info">
                  <span className="tp-card-tag">{spot.tag}</span>
                  <h3 className="tp-card-place">{spot.place}</h3>
                  <span className="tp-card-country">{spot.country}</span>
                  <p className="tp-card-desc">{spot.description}</p>
                  <button
                    className="tp-card-view"
                    style={{ "--card-color": spot.color }}
                    onClick={() => transitionTo(`/travel/${spot.id}`)}
                  >
                    View Details
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>

                <div className="tp-card-number">{String(active + 1).padStart(2, "00")}</div>
                <div className="tp-card-glow" style={{ background: spot.color }} />
              </motion.div>
            </AnimatePresence>
          )}

          {active >= 0 && active < travels.length - 1 && (
            <div className="tp-peek">
              <span className="tp-peek-title">{travels[active + 1].place}</span>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
