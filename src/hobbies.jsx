import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./hobbies.css";

const hobbies = [
   {
    id: "travel",
    title: "Travel",
    tag: "Road Trips · Culture",
    description:
      "Exploring new cities and local culture to refresh creativity and perspective.",
    color: "#ff6b35",
  },
  {
    id: "photography",
    title: "Photography",
    tag: "Street · Nature",
    description:
      "Capturing frames, light and people moments that tell visual stories.",
    color: "#ff004f",
  },
 
  // {
  //   id: "fitness",
  //   title: "Fitness",
  //   tag: "Strength · Discipline",
  //   description:
  //     "Consistent training for energy, focus, and a strong day-to-day routine.",
  //   color: "#c850c0",
  // },
  {
    id: "music",
    title: "Music",
    tag: "Focus · Relax",
    description:
      "Using curated playlists for deep work, coding flow, and mindful downtime.",
    color: "#4facfe",
  },
  {
    id: "movies",
    title: "Movies",
    tag: "Sci‑Fi · Thriller",
    description:
      "Loving storytelling, cinematography, and screenwriting craft in great films.",
    color: "#f7971e",
  },
];

/* ── Full-section Falling Items (hobby-themed) ─────────────────────── */

// left (%), size (px), delay (s), dur (s), rotate (deg) — per item
const itemConfigs = {
  photography: [
    { left: 6,  size: 64, delay: 0,    dur: 2.4, rotate: -15, icon: "📷" },
    { left: 25, size: 40, delay: 0.5,  dur: 2.0, rotate: 20,  icon: "🔭" },
    { left: 50, size: 80, delay: 0.2,  dur: 2.8, rotate: -8,  icon: "🎞️" },
    { left: 72, size: 36, delay: 0.8,  dur: 1.8, rotate: 30,  icon: "🖼️" },
    { left: 90, size: 56, delay: 0.35, dur: 2.2, rotate: -22, icon: "💡" },
  ],
  travel: [
    { left: 8,  size: 70, delay: 0,    dur: 2.1, rotate: -10, icon: "✈️" },
    { left: 32, size: 52, delay: 0.4,  dur: 2.7, rotate: 15,  icon: "🗺️" },
    { left: 56, size: 44, delay: 0.65, dur: 1.9, rotate: -20, icon: "🧳" },
    { left: 78, size: 60, delay: 0.15, dur: 2.3, rotate: 8,   icon: "🏔️" },
    { left: 93, size: 38, delay: 0.55, dur: 2.0, rotate: -30, icon: "🧭" },
  ],
  // fitness: [
  //   { left: 5,  size: 56, delay: 0.3,  dur: 2.0, rotate: 10,  icon: "🏋️" },
  //   { left: 28, size: 48, delay: 0,    dur: 3.0, rotate: -18, icon: "💪" },
  //   { left: 52, size: 64, delay: 0.55, dur: 2.4, rotate: 25,  icon: "🥊" },
  //   { left: 75, size: 42, delay: 0.2,  dur: 1.8, rotate: -12, icon: "🏃" },
  //   { left: 91, size: 54, delay: 0.7,  dur: 2.2, rotate: 18,  icon: "⏱️" },
  // ],
  music: [
    { left: 4,  size: 44, delay: 0,    dur: 1.7, rotate: -20, icon: "🎵" },
    { left: 24, size: 68, delay: 0.3,  dur: 2.2, rotate: 12,  icon: "🎧" },
    { left: 48, size: 50, delay: 0.6,  dur: 2.0, rotate: -8,  icon: "🎸" },
    { left: 70, size: 72, delay: 0.15, dur: 2.6, rotate: 22,  icon: "🎹" },
    { left: 90, size: 46, delay: 0.75, dur: 1.9, rotate: -15, icon: "🎤" },
  ],
  movies: [
    { left: 8,  size: 926, delay: 0.2,  dur: 2.3, rotate: -10, icon: "🎬" },
    { left: 30, size: 448708, delay: 0,    dur: 1.8, rotate: 18,  icon: "🎭" },
    { left: 55, size: 108, delay: 0.45, dur: 2.7, rotate: -22, icon: "🍿" },
    { left: 78, size: 548784, delay: 0.7,  dur: 2.1, rotate: 14,  icon: "📽️" },
    { left: 94, size: 42, delay: 0.3,  dur: 2.0, rotate: -8,  icon: "🎥" },
  ],
};

function FallingBallsBg({ id, color }) {
  const items = itemConfigs[id] ?? [];
  return (
    <div className="hb-bg" aria-hidden="true">
      {items.map((b, i) => (
        <div
          key={i}
          className="hb-ball"
          style={{
            "--left": `${b.left}%`,
            "--size": `${b.size}px`,
            "--delay": `${b.delay}s`,
            "--dur": `${b.dur}s`,
            "--rotate": `${b.rotate}deg`,
            "--color": color,
            fontSize: `${b.size * 0.72}px`,
          }}
        >
          {b.icon}
        </div>
      ))}
      {/* floor shadows */}
      {items.map((b, i) => (
        <div
          key={`s${i}`}
          className="hb-shadow"
          style={{
            "--left": `${b.left}%`,
            "--size": `${b.size}px`,
            "--delay": `${b.delay}s`,
            "--dur": `${b.dur}s`,
            "--color": color,
          }}
        />
        
      ))}
    </div>
  );

}

export default function Hobbies({ onNavigate }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const dragStartX = useRef(null);
  const navigate = useNavigate();

  const go = useCallback(
    (next) => {
      const clamped = Math.max(0, Math.min(hobbies.length - 1, next));
      setDirection(next > active ? 1 : -1);
      setActive(clamped);
      if (clamped !== active) onNavigate?.();
    },
    [active, onNavigate]
  );

  const prev = () => go(active - 1);
  const next = () => go(active + 1);

  const onWheel = useCallback(
    (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        if (e.deltaX > 40) next();
        else if (e.deltaX < -40) prev();
      }
    },
    [active] // eslint-disable-line
  );

  const hobby = hobbies[active];

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, scale: 0.92 }),
  };

  return (
    <section
      className="hobbies-carousel-section"
      id="hobbies"
      ref={sectionRef}
      onWheel={onWheel}
      onPointerDown={(e) => { dragStartX.current = e.clientX; }}
      onPointerUp={(e) => {
        if (dragStartX.current === null) return;
        const diff = dragStartX.current - e.clientX;
        if (diff > 50) next();
        else if (diff < -50) prev();
        dragStartX.current = null;
      }}
    >
      {/* ── Full-section falling balls background ── */}
      <AnimatePresence>
        <motion.div
          key={`bg-${active}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
        >
          <FallingBallsBg id={hobby.id} color={hobby.color} />
        </motion.div>
      </AnimatePresence>
      {/* ── Left panel ── */}
      <motion.div
        className="hc-left"
        initial={{ opacity: 0, x: -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="hc-sub">What I enjoy</p>
        <h2 className="hc-heading">My<br />Hobbies</h2>

        <div className="hc-counter">
          <span className="hc-count-active">{String(active + 1).padStart(2, "0")}</span>
          <span className="hc-count-sep"> / </span>
          <span className="hc-count-total">{String(hobbies.length).padStart(2, "0")}</span>
        </div>

        <div className="hc-nav">
          <button className="hc-btn" onClick={prev} disabled={active === 0} aria-label="Previous">
            ←
          </button>
          <button className="hc-btn" onClick={next} disabled={active === hobbies.length - 1} aria-label="Next">
            →
          </button>
        </div>

        <div className="hc-dots">
          {hobbies.map((_, i) => (
            <button
              key={i}
              className={`hc-dot ${i === active ? "hc-dot--active" : ""}`}
              style={i === active ? { background: hobby.color } : {}}
              onClick={() => go(i)}
              aria-label={`Go to ${hobbies[i].title}`}
            />
          ))}
        </div>
      </motion.div>

      {/* ── Right carousel ── */}
      <div className="hc-right">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={active}
            className="hc-card"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ "--card-color": hobby.color }}
          >
            <div className="hc-card-number">{String(active + 1).padStart(2, "0")}</div>
            <div className="hc-card-inner">
              <div className="hc-card-body">
                <span className="hc-card-tag">{hobby.tag}</span>
                <h3 className="hc-card-title">{hobby.title}</h3>
                <p className="hc-card-desc">{hobby.description}</p>
                {hobby.id === "travel" && (
                  <button
                    className="hc-explore-btn"
                    onClick={(e) => { e.stopPropagation(); navigate("/travel"); }}
                  >
                    Explore ✈️
                  </button>
                )}
                {hobby.id === "photography" && (
                  <button
                    className="hc-explore-btn"
                    onClick={(e) => { e.stopPropagation(); navigate("/gallery"); }}
                  >
                    Explore 📷
                  </button>
                )}
              </div>
            </div>
            <div className="hc-card-glow" style={{ background: hobby.color }} />
          </motion.div>
        </AnimatePresence>

        {active < hobbies.length - 1 && (
          <div className="hc-peek">
            <span className="hc-peek-title">{hobbies[active + 1].title}</span>
          </div>
        )}
      </div>
    </section>
  );
}