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
    img: "https://lh3.googleusercontent.com/d/1tnbHPH90S373HlQvSGaXeE-7J8wmxqAN",
  },
  {
    type: "image", id: 2,
    place: "Saffron Fields", region: "Kashmir",
    span: "small",
    color: "#74c0fc",
    img: "https://lh3.googleusercontent.com/d/1mNO5uT-yqHkPjXjOw83knoqH-27oDSEr",
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
    img: "https://lh3.googleusercontent.com/d/1OIRd2rajUxD9GFpuW3ZsqQBZIA6Fq0Z0" ,
  },
  {
    type: "image", id: 4,
    place: "Cherrapunji Clouds", region: "Meghalaya",
    span: "tall",
    color: "#38d9a9",
    img: "https://lh3.googleusercontent.com/d/1RwcLlt7Tbzl_05jcwy80JbLJzHytEuNu" ,
  },
  {
    type: "image", id: 5,
    place: "Kaziranga", region: "Assam",
    span: "wide",
    color: "#f7971e",
    img: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=900&q=80",
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
    img: "https://drive.google.com/thumbnail?id=1E3mvcOas1WKhoxS4ct4dPHkom9sE3lc3&sz=w1200",
  },
  {
    type: "image", id: 7,
    place: "Sunset Beach", region: "Goa",
    span: "small",
    color: "#ff6b35",
    img: "https://drive.google.com/thumbnail?id=1tpCPAxvRxIHdLH1HuXpDFo9qgyHV8KBM&sz=w1200",
  },
  {
    type: "image", id: 8,
    place: "Houseboat", region: "Kerala",
    span: "small",
    color: "#51cf66",
    img: "https://drive.google.com/thumbnail?id=1nwoJbUNJIG4SCZ_DK1j2r8FsHndIj2Wm&sz=w1200",
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
    place: "Chandni Chowk", region: "Delhi",
    span: "wide",
    color: "#ff004f",
    img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=900&q=80",
  },
  {
    type: "image", id: 10,
    place: "Rock Garden", region: "Chandigarh",
    span: "tall",
    color: "#4facfe",
    img: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=900&q=80",
  },
  {
    type: "image", id: 11,
    place: "Red Fort", region: "Delhi",
    span: "small",
    color: "#e03131",
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=900&q=80",
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
    img: "https://drive.google.com/thumbnail?id=1p8Yesa_715usSf40L6jVNTVwtwc5eOTO&sz=w1200",
  },
  {
    type: "image", id: 13,
    place: "Meenakshi Temple", region: "Tamil Nadu",
    span: "small",
    color: "#c850c0",
    img: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=900&q=80",
  },
  {
    type: "image", id: 14,
    place: "Charminar", region: "Telangana",
    span: "small",
    color: "#9c36b5",
    img: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=900&q=80",
  },
  {
    type: "image", id: 15,
    place: "Pondicherry Coast", region: "Pondicherry",
    span: "wide",
    color: "#f093fb",
    img: "https://drive.google.com/thumbnail?id=19uK7InrrpaPlMDl77tELx5ZlsyQiWUcL&sz=w1200",
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
