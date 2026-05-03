import { useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Header from "./header";
import FogEffect from "./FogEffect";
import { usePageTransition } from "./usePageTransition";
import AmbientEffect from "./AmbientEffect";
import "./PlaceGallery.css";

/* ─────────────────────────────────────────────────────────────── *
 *  Per-place data: images + quotes
 *  Add your own photos later by replacing `img` strings.
 *  span: "tall" | "wide" | "small"
 * ─────────────────────────────────────────────────────────────── */
const placeData = {
  1: {
    place: "Kashmir",
    color: "#4facfe",
    hero: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&q=90",
    items: [
      { type: "image", caption: "Dal Lake", span: "tall",  img: "https://drive.google.com/thumbnail?id=1jPgiPLmWtdbLkrPD9br-MY8x-L378VoeO&sz=w1200" },
      { type: "image", caption: "Gulmarg Meadows", span: "small", img: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=900&q=80" },
      { type: "quote",  text: "If there is paradise on earth, it is this, it is this, it is this.", author: "Emperor Jahangir" },
      { type: "image", caption: "Snow Peaks", span: "wide",  img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80" },
      { type: "image", caption: "Saffron Fields", span: "small", img: "https://drive.google.com/thumbnail?id=1NweN0ajJvOGSeXsFUUnaGur7AIeC08Zf&sz=w1200" },
      { type: "image", caption: "Pahalgam Valley", span: "tall",  img: "https://images.unsplash.com/photo-1534377075-38d9e14ce2dd?w=900&q=80" },
      { type: "quote",  text: "Kashmir is not just a place — it is a feeling you carry forever.", author: "" },
      { type: "image", caption: "Shikaras at Dusk", span: "wide",  img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80" },
    ],
  },
  2: {
    place: "Meghalaya",
    color: "#11998e",
    hero: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=1400&q=90",
    items: [
      { type: "image", caption: "Living Root Bridge", span: "tall",  img: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=900&q=80" },
      { type: "image", caption: "Cherrapunji Clouds", span: "small", img: "https://images.unsplash.com/photo-1580500255834-9a7a5e388668?w=900&q=80" },
      { type: "quote",  text: "The mountains are calling and I must go.", author: "John Muir" },
      { type: "image", caption: "Nohkalikai Falls", span: "wide",  img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80" },
      { type: "image", caption: "Dawki River", span: "small", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80" },
      { type: "image", caption: "Mawlynnong Village", span: "tall",  img: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=900&q=80" },
      { type: "quote",  text: "In every walk with nature, one receives far more than he seeks.", author: "John Muir" },
      { type: "image", caption: "Rolling Green Hills", span: "wide",  img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80" },
    ],
  },
  3: {
    place: "Assam",
    color: "#f7971e",
    hero: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=1400&q=90",
    items: [
      { type: "image", caption: "Kaziranga Grasslands", span: "tall",  img: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=900&q=80" },
      { type: "image", caption: "Tea Gardens",          span: "small", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80" },
      { type: "quote",  text: "Tea is the magic key to the vault where my brain is kept.", author: "Frances Hardinge" },
      { type: "image", caption: "Brahmaputra River",    span: "wide",  img: "https://images.unsplash.com/photo-1559827291-72b5a2f5e2c1?w=900&q=80" },
      { type: "image", caption: "One-Horned Rhino",     span: "small", img: "https://images.unsplash.com/photo-1504173010664-32509107de35?w=900&q=80" },
      { type: "image", caption: "Mist Over Hills",      span: "tall",  img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80" },
      { type: "quote",  text: "Wildlife is something which man cannot construct. Once it is gone, it is gone forever.", author: "Joy Adamson" },
      { type: "image", caption: "Majuli Island",        span: "wide",  img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&q=80" },
    ],
  },
  4: {
    place: "Kerala",
    color: "#43e97b",
    hero: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1400&q=90",
    items: [
      { type: "image", caption: "Alleppey Backwaters", span: "tall",  img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=900&q=80" },
      { type: "image", caption: "Munnar Tea Hills",    span: "small", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80" },
      { type: "quote",  text: "Kerala is not a destination — it is a therapy for the soul.", author: "" },
      { type: "image", caption: "Houseboat Morning",   span: "wide",  img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900&q=80" },
      { type: "image", caption: "Paddy Fields",        span: "small", img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80" },
      { type: "image", caption: "Kovalam Sunset",      span: "tall",  img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80" },
      { type: "quote",  text: "Slow travel is the art of being fully present wherever you are.", author: "" },
      { type: "image", caption: "Wayanad Forest",      span: "wide",  img: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=900&q=80" },
    ],
  },
  5: {
    place: "Goa",
    color: "#ff6b35",
    hero: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1400&q=90",
    items: [
      { type: "image", caption: "Palolem Beach",      span: "tall",  img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=900&q=80" },
      { type: "image", caption: "Golden Dunes",       span: "small", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80" },
      { type: "quote",  text: "The ocean stirs the heart, inspires the imagination and brings eternal joy to the soul.", author: "Wyland" },
      { type: "image", caption: "Sunset at Vagator",  span: "wide",  img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=900&q=80" },
      { type: "image", caption: "Old Goa Church",     span: "small", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=900&q=80" },
      { type: "image", caption: "Beach Shacks",       span: "tall",  img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=900&q=80" },
      { type: "quote",  text: "Life is better in flip flops.", author: "" },
      { type: "image", caption: "Spice Plantation",   span: "wide",  img: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=900&q=80" },
    ],
  },
  6: {
    place: "Pondicherry",
    color: "#f093fb",
    hero: "https://drive.google.com/thumbnail?id=19uK7InrrpaPlMDl77tELx5ZlsyQiWUcL&sz=w1400",
    items: [
      { type: "image", caption: "Pondicherry Vibes",    span: "tall",  img: "https://drive.google.com/thumbnail?id=19uK7InrrpaPlMDl77tELx5ZlsyQiWUcL&sz=w1200" },
      { type: "image", caption: "Coastal Breeze",       span: "small", img: "https://drive.google.com/thumbnail?id=1wbPSWQItr21SJDL8MvYi1DkEUIpmB73R&sz=w1200" },
      { type: "quote",  text: "Paris of the East — every lane tells a story of two worlds.", author: "" },
      { type: "image", caption: "Seaside Stroll",       span: "wide",  img: "https://drive.google.com/thumbnail?id=1r4d9zMgjA8ySGPOxOg3wxEufXBXou0dD&sz=w1200" },
      { type: "image", caption: "French Quarter",       span: "small", img: "https://drive.google.com/thumbnail?id=1TsNq6k51zcVv7s__fu54xe_-W4IWb19Y&sz=w1200" },
      { type: "image", caption: "Promenade Walk",       span: "tall",  img: "https://drive.google.com/thumbnail?id=11QScfhwZLHVvE-6sa281suxKVPqYJTGV&sz=w1200" },
      { type: "quote",  text: "Not all classrooms have four walls — some have cobblestones and café tables.", author: "" },
      { type: "image", caption: "Tranquil Moments",     span: "wide",  img: "https://drive.google.com/thumbnail?id=1u0UqHn4O1oCRT1-qGc-Ph-BZfuxAUhGa&sz=w1200" },
      { type: "image", caption: "Pondicherry Colours",  span: "small", img: "https://drive.google.com/thumbnail?id=1i9WZaRUB5z52yjj4wFxid1xRcCecYYMq&sz=w1200" },
    ],
  },
  7: {
    place: "Delhi",
    color: "#ff004f",
    hero: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1400&q=90",
    items: [
      { type: "image", caption: "Red Fort",           span: "tall",  img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=900&q=80" },
      { type: "image", caption: "Humayun's Tomb",     span: "small", img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=900&q=80" },
      { type: "quote",  text: "Delhi is not a city, it is an emotion.", author: "" },
      { type: "image", caption: "Jama Masjid",        span: "wide",  img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&q=80" },
      { type: "image", caption: "Chandni Chowk",      span: "small", img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=900&q=80" },
      { type: "image", caption: "Qutub Minar",        span: "tall",  img: "https://images.unsplash.com/photo-1480714600823-b8f26d5b7e7c?w=900&q=80" },
      { type: "quote",  text: "History is not the past. It is the present. We carry our history with us.", author: "James Baldwin" },
      { type: "image", caption: "India Gate at Dusk", span: "wide",  img: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=900&q=80" },
    ],
  },
  8: {
    place: "Tamil Nadu",
    color: "#c850c0",
    hero: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=1400&q=90",
    items: [
      { type: "image", caption: "Meenakshi Temple",  span: "tall",  img: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=900&q=80" },
      { type: "image", caption: "Shore Temple",      span: "small", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&q=80" },
      { type: "quote",  text: "A culture is made or destroyed by its articulate voices.", author: "Ayn Rand" },
      { type: "image", caption: "Chettinad Mansion", span: "wide",  img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80" },
      { type: "image", caption: "Ooty Nilgiris",     span: "small", img: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=900&q=80" },
      { type: "image", caption: "Kanyakumari",       span: "tall",  img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80" },
      { type: "quote",  text: "Music gives a soul to the universe, wings to the mind and life to everything.", author: "Plato" },
      { type: "image", caption: "Brihadeeswara Temple", span: "wide", img: "https://images.unsplash.com/photo-1480714600823-b8f26d5b7e7c?w=900&q=80" },
    ],
  },
  9: {
    place: "Chandigarh",
    color: "#4facfe",
    hero: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=1400&q=90",
    items: [
      { type: "image", caption: "Rock Garden",        span: "tall",  img: "https://images.unsplash.com/photo-1597074866923-dc0589150358?w=900&q=80" },
      { type: "image", caption: "Sukhna Lake",        span: "small", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80" },
      { type: "quote",  text: "Art is not what you see, but what you make others see.", author: "Edgar Degas" },
      { type: "image", caption: "Le Corbusier Centre", span: "wide",  img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&q=80" },
      { type: "image", caption: "Rose Garden",        span: "small", img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&q=80" },
      { type: "image", caption: "Capitol Complex",    span: "tall",  img: "https://images.unsplash.com/photo-1480714600823-b8f26d5b7e7c?w=900&q=80" },
      { type: "quote",  text: "Architecture is the art of how to waste space beautifully.", author: "Philip Johnson" },
      { type: "image", caption: "Nek Chand Sculptures", span: "wide", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80" },
    ],
  },
  10: {
    place: "Karnataka",
    color: "#f7971e",
    hero: "https://drive.google.com/thumbnail?id=1p8Yesa_715usSf40L6jVNTVwtwc5eOTO&sz=w1400",
    items: [
      { type: "image", caption: "Karnataka Trails",   span: "tall",  img: "https://drive.google.com/thumbnail?id=1p8Yesa_715usSf40L6jVNTVwtwc5eOTO&sz=w1200" },
      { type: "image", caption: "Into the Wild",      span: "small", img: "https://drive.google.com/thumbnail?id=1rMNE82W4VgWOq0zNqYwoDRfp5d3efmeZ&sz=w1200" },
      { type: "quote",  text: "Ruins are not a sign of decay, but of a life fully lived.", author: "" },
      { type: "image", caption: "Golden Horizons",    span: "wide",  img: "https://drive.google.com/thumbnail?id=1x7F0-RLb4oR8rv3j-0ST9UUPkY6JYnSQ&sz=w1200" },
      { type: "image", caption: "Hidden Paths",       span: "small", img: "https://drive.google.com/thumbnail?id=1oVpa_tDf4AImGTBHT6b5EuUIGcV7BiEv&sz=w1200" },
      { type: "image", caption: "Ancient Glory",      span: "tall",  img: "https://drive.google.com/thumbnail?id=1XIvnojjdG1Vl5S24tgoHorzWBo1_y3rN&sz=w1200" },
      { type: "image", caption: "Lush Greens",        span: "wide",  img: "https://drive.google.com/thumbnail?id=1l_EnefFhCVuun-IevS23FrgvAueAAJKU&sz=w1200" },
      { type: "quote",  text: "Coffee is a language in itself.", author: "Jackie Chan" },
      { type: "image", caption: "Land of Temples",    span: "tall",  img: "https://drive.google.com/thumbnail?id=1i60Iv9ybWSKFNspI7yGd--uUBYhINqfq&sz=w1200" },
      { type: "image", caption: "Serene Escape",      span: "small", img: "https://drive.google.com/thumbnail?id=1d07Q0tdxJq8IHp8RhCeUugCHdQZ23P3C&sz=w1200" },
      { type: "image", caption: "Karnataka Memories", span: "wide",  img: "https://drive.google.com/thumbnail?id=1bCTBo6ri1oD3MJ_PXl5pFf0zZDCv9zFL&sz=w1200" },
    ],
  },
  11: {
    place: "Andhra Pradesh",
    color: "#ff6b35",
    hero: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1400&q=90",
    items: [
      { type: "image", caption: "Tirupati Temple",    span: "tall",  img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=900&q=80" },
      { type: "image", caption: "Araku Valley",       span: "small", img: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?w=900&q=80" },
      { type: "quote",  text: "Faith is taking the first step even when you don't see the whole staircase.", author: "Martin Luther King Jr." },
      { type: "image", caption: "Visakhapatnam Coast", span: "wide", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80" },
      { type: "image", caption: "Lepakshi Murals",    span: "small", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&q=80" },
      { type: "image", caption: "Borra Caves",        span: "tall",  img: "https://images.unsplash.com/photo-1534377075-38d9e14ce2dd?w=900&q=80" },
      { type: "quote",  text: "Every coastline holds a story that the ocean has been whispering for centuries.", author: "" },
      { type: "image", caption: "Kondapalli Craft",   span: "wide",  img: "https://images.unsplash.com/photo-1580500255834-9a7a5e388668?w=900&q=80" },
    ],
  },
  12: {
    place: "Telangana",
    color: "#c850c0",
    hero: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=1400&q=90",
    items: [
      { type: "image", caption: "Charminar at Dusk",  span: "tall",  img: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=900&q=80" },
      { type: "image", caption: "Golconda Fort",      span: "small", img: "https://images.unsplash.com/photo-1480714600823-b8f26d5b7e7c?w=900&q=80" },
      { type: "quote",  text: "Biryani is not just food — it is the soul of a city served on a plate.", author: "" },
      { type: "image", caption: "Hussain Sagar Lake", span: "wide",  img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80" },
      { type: "image", caption: "Warangal Kakatiya",  span: "small", img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&q=80" },
      { type: "image", caption: "Ramoji Film City",   span: "tall",  img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=900&q=80" },
      { type: "quote",  text: "History has a way of speaking louder in the places it was made.", author: "" },
      { type: "image", caption: "Laad Bazaar",        span: "wide",  img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=900&q=80" },
    ],
  },
};

/* ── Scroll reveal wrapper ────────────────────────────────────────── */
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

/* ── Image tile ──────────────────────────────────────────────────── */
function ImageTile({ item, color }) {
  return (
    <Reveal>
      <div
        className={`pg-tile pg-tile--${item.span}`}
        style={{ "--tile-color": color }}
      >
        {item.img ? (
          <img src={item.img} alt={item.caption} draggable={false} />
        ) : (
          <div className="pg-tile-placeholder">
            <span className="pg-tile-plus">+</span>
            <span className="pg-tile-add">Add photo</span>
          </div>
        )}
        <div className="pg-tile-overlay" />
        <div className="pg-tile-caption">
          <span className="pg-tile-name">{item.caption}</span>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Quote block ─────────────────────────────────────────────────── */
function QuoteBlock({ item }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className="pg-quote"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.9 }}
    >
      <motion.span
        className="pg-quote-bar"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.blockquote
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.22 }}
      >
        "{item.text}"
      </motion.blockquote>
      {item.author && (
        <motion.cite
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          — {item.author}
        </motion.cite>
      )}
    </motion.div>
  );
}

/* ── Main page ───────────────────────────────────────────────────── */
export default function PlaceGallery() {
  const { id }       = useParams();
  const transitionTo = usePageTransition();
  const data         = placeData[Number(id)];

  if (!data) {
    return (
      <div className="pg-notfound">
        <p>Gallery not found.</p>
        <button onClick={() => transitionTo(`/travel/${id}`)}>← Back</button>
      </div>
    );
  }

  return (
    
    <>
      <FogEffect />
      <AmbientEffect place={data.place} />
      <Header />

      {/* ── Hero ── */}
      <section className="pg-hero" style={{ "--accent": data.color }}>
        <motion.img
          src={data.hero}
          alt={data.place}
          className="pg-hero-img"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          draggable={false}
        />
        <div className="pg-hero-overlay" />

        <div className="pg-hero-content">
          <motion.p
            className="pg-hero-eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            photo diary
          </motion.p>

          <div className="pg-hero-title-wrap">
            {data.place.split("").map((ch, i) => (
              <motion.span
                key={i}
                className="pg-hero-char"
                style={{ color: i === 0 ? data.color : "#fff" }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 + i * 0.065, ease: [0.22, 1, 0.36, 1] }}
              >
                {ch}
              </motion.span>
            ))}
          </div>

          <motion.div
            className="pg-hero-line"
            style={{ background: data.color }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.7 }}
          />

          <motion.button
            className="pg-back"
            onClick={() => transitionTo(`/travel/${id}`)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
          >
            ← Back to {data.place}
          </motion.button>
        </div>
      </section>

      {/* ── Masonry gallery ── */}
      <section className="pg-grid">
        {data.items.map((item, i) =>
          item.type === "quote" ? (
            <QuoteBlock key={`q-${i}`} item={item} />
          ) : (
            <ImageTile key={`img-${i}`} item={item} color={data.color} />
          )
        )}
      </section>

      {/* ── Bottom CTA ── */}
      <motion.div
        className="pg-cta"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <button
          className="pg-cta-btn"
          style={{ "--accent": data.color }}
          onClick={() => transitionTo(`/travel/${id}`)}
        >
          ← Back to {data.place}
        </button>
        <button
          className="pg-cta-btn pg-cta-btn--gallery"
          style={{ "--accent": data.color }}
          onClick={() => transitionTo("/gallery")}
        >
          All Travels Gallery →
        </button>
      </motion.div>

      <footer className="pg-footer">
        <span>© hari · {data.place} memories</span>
      </footer>
    </>
  );
}
