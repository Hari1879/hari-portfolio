import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Header from "./header";
import FogEffect from "./FogEffect";
import { usePageTransition } from "./usePageTransition";
import "./TravelGallery.css";

/* ── Gallery data ─────────────────────────────────────────────────
   type: "image" | "quote"
   For images, set `img` to a real URL once you have photos.
   `span` controls height: "tall" | "wide" | "small"
   ──────────────────────────────────────────────────────────────── */
const items = [
  /* ── Kashmir ── */
  {
    type: "image", id: 1,
    place: "Dal Lake", region: "Kashmir",
    span: "tall",
    color: "#4facfe",
    img: "",
  },
  {
    type: "image", id: 2,
    place: "Snow Peaks", region: "Kashmir",
    span: "small",
    color: "#74c0fc",
    img: "",
  },
  /* ── Quote 1 ── */
  {
    type: "quote",
    text: "Not all those who wander are lost.",
    author: "J.R.R. Tolkien",
  },
  /* ── Meghalaya / Assam ── */
  {
    type: "image", id: 3,
    place: "Living Root Bridge", region: "Meghalaya",
    span: "small",
    color: "#11998e",
    img: "",
  },
  {
    type: "image", id: 4,
    place: "Cloud Valley", region: "Meghalaya",
    span: "tall",
    color: "#38d9a9",
    img: "",
  },
  {
    type: "image", id: 5,
    place: "Kaziranga", region: "Assam",
    span: "wide",
    color: "#f7971e",
    img: "",
  },
  /* ── Quote 2 ── */
  {
    type: "quote",
    text: "Travel is the only thing you buy that makes you richer.",
    author: "Anonymous",
  },
  /* ── Kerala / Goa ── */
  {
    type: "image", id: 6,
    place: "Backwaters", region: "Kerala",
    span: "tall",
    color: "#43e97b",
    img: "",
  },
  {
    type: "image", id: 7,
    place: "Sunset Beach", region: "Goa",
    span: "small",
    color: "#ff6b35",
    img: "",
  },
  {
    type: "image", id: 8,
    place: "Houseboat", region: "Kerala",
    span: "small",
    color: "#51cf66",
    img: "",
  },
  /* ── Quote 3 ── */
  {
    type: "quote",
    text: "The world is a book, and those who do not travel read only one page.",
    author: "Saint Augustine",
  },
  /* ── Delhi / Chandigarh ── */
  {
    type: "image", id: 9,
    place: "Old Delhi", region: "Delhi",
    span: "wide",
    color: "#ff004f",
    img: "",
  },
  {
    type: "image", id: 10,
    place: "Rock Garden", region: "Chandigarh",
    span: "tall",
    color: "#4facfe",
    img: "",
  },
  {
    type: "image", id: 11,
    place: "Red Fort", region: "Delhi",
    span: "small",
    color: "#e03131",
    img: "",
  },
  /* ── Quote 4 ── */
  {
    type: "quote",
    text: "Every journey begins with a single step.",
    author: "Lao Tzu",
  },
  /* ── South India ── */
  {
    type: "image", id: 12,
    place: "Hampi Ruins", region: "Karnataka",
    span: "tall",
    color: "#f7971e",
    img: "",
  },
  {
    type: "image", id: 13,
    place: "Meenakshi Temple", region: "Tamil Nadu",
    span: "small",
    color: "#c850c0",
    img: "",
  },
  {
    type: "image", id: 14,
    place: "Charminar", region: "Telangana",
    span: "small",
    color: "#9c36b5",
    img: "",
  },
  {
    type: "image", id: 15,
    place: "Pondicherry Coast", region: "Pondicherry",
    span: "wide",
    color: "#f093fb",
    img: "",
  },
];

/* ── Scroll-reveal helper ─────────────────────────────────────────── */
function Reveal({ children, delay = 0 }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Image tile ────────────────────────────────────────────────────── */
function ImageTile({ item }) {
  return (
    <Reveal>
      <div className={`tg-tile tg-tile--${item.span}`} style={{ "--tile-color": item.color }}>
        {item.img ? (
          <img src={item.img} alt={item.place} draggable={false} />
        ) : (
          <div
            className="tg-tile-placeholder"
            style={{
              background: `linear-gradient(135deg, ${item.color}22 0%, ${item.color}55 100%)`,
            }}
          >
            <span className="tg-tile-placeholder-icon">+</span>
            <span className="tg-tile-placeholder-label">Add photo</span>
          </div>
        )}
        <div className="tg-tile-caption">
          <span className="tg-tile-place">{item.place}</span>
          <span className="tg-tile-region">{item.region}</span>
        </div>
        <div className="tg-tile-overlay" />
      </div>
    </Reveal>
  );
}

/* ── Quote block ───────────────────────────────────────────────────── */
function QuoteBlock({ item, idx }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="tg-quote"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <motion.span
        className="tg-quote-mark"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        "{item.text}"
      </motion.blockquote>
      <motion.cite
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        — {item.author}
      </motion.cite>
    </motion.div>
  );
}

/* ── Main gallery page ─────────────────────────────────────────────── */
export default function TravelGallery() {
  const transitionTo = usePageTransition();

  return (
    <>
      <FogEffect />
      <Header />

      {/* ── Hero ── */}
      <section className="tg-hero">
        <motion.p
          className="tg-hero-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          hari's 
        </motion.p>
        <div className="tg-hero-title-wrap">
          {"Diaries".split("").map((ch, i) => (
            <motion.span
              key={i}
              className="tg-hero-char"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 + i * 0.055, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="tg-hero-line"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.p
          className="tg-hero-sub"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
        >
          a visual diary of places that left a mark
        </motion.p>

        <motion.button
          className="tg-back"
          onClick={() => transitionTo("/travel")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          ← Back to map
        </motion.button>
      </section>

      {/* ── Gallery grid ── */}
      <section className="tg-grid">
        {items.map((item, i) =>
          item.type === "quote" ? (
            <QuoteBlock key={`q-${i}`} item={item} idx={i} />
          ) : (
            <ImageTile key={`img-${item.id}`} item={item} />
          )
        )}
      </section>

      {/* ── Footer ── */}
      <footer className="tg-footer">
        <span>© hari · all memories reserved</span>
      </footer>
    </>
  );
}
