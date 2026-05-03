import { useMemo } from "react";
import "./AmbientEffect.css";

/* ── Place → effect map ─────────────────────────────────────────── */
const PLACE_EFFECT = {
  "Kashmir":          "snow",
  "Meghalaya":        "rain",
  "Assam":            "firefly",
  "Kerala":           "leaf",
  "Goa":              "bubble",
  "Pondicherry":      "petal",
  "Delhi":            "dust",
  "Tamil Nadu":       "spark",
  "Chandigarh":       "blossom",
  "Karnataka":        "ember",
  "Andhra Pradesh":   "star",
  "Telangana":        "firefly-gold",
};

/* ── Per-effect particle factory ────────────────────────────────── */
function makeParticles(type) {
  const r = () => Math.random();

  const configs = {
    snow: Array.from({ length: 80 }, (_, i) => ({
      id: i,
      style: {
        left:              `${r() * 100}%`,
        top:               `-${r() * 20 + 4}px`,
        width:             `${r() * 7 + 3}px`,
        height:            `${r() * 7 + 3}px`,
        animationDelay:    `${r() * 12}s`,
        animationDuration: `${r() * 9 + 6}s`,
        "--offset":        `${r() * 50 - 25}px`,
        opacity:           r() * 0.5 + 0.45,
      },
    })),

    rain: Array.from({ length: 130 }, (_, i) => ({
      id: i,
      style: {
        left:              `${r() * 112 - 6}%`,
        top:               `-${r() * 60 + 10}px`,
        width:             `${r() * 1 + 1}px`,
        height:            `${r() * 22 + 12}px`,
        animationDelay:    `${r() * 3}s`,
        animationDuration: `${r() * 0.45 + 0.55}s`,
        "--drift":         `${r() * 50 + 25}px`,
        opacity:           r() * 0.4 + 0.4,
      },
    })),

    firefly: Array.from({ length: 38 }, (_, i) => ({
      id: i,
      style: {
        left:              `${r() * 95 + 2}%`,
        top:               `${r() * 70 + 15}%`,
        width:             `${r() * 5 + 3}px`,
        height:            `${r() * 5 + 3}px`,
        animationDelay:    `${r() * 7}s`,
        animationDuration: `${r() * 5 + 4}s`,
        "--sx":            `${r() * 80 - 40}px`,
        "--sy":            `${-(r() * 90 + 30)}px`,
        opacity:           0,
      },
    })),

    "firefly-gold": Array.from({ length: 45 }, (_, i) => ({
      id: i,
      style: {
        left:              `${r() * 95 + 2}%`,
        top:               `${r() * 70 + 15}%`,
        width:             `${r() * 6 + 3}px`,
        height:            `${r() * 6 + 3}px`,
        animationDelay:    `${r() * 7}s`,
        animationDuration: `${r() * 5 + 4}s`,
        "--sx":            `${r() * 80 - 40}px`,
        "--sy":            `${-(r() * 90 + 30)}px`,
        opacity:           0,
      },
    })),

    leaf: Array.from({ length: 28 }, (_, i) => ({
      id: i,
      style: {
        left:              `${r() * 105 - 2}%`,
        top:               `-${r() * 20 + 5}px`,
        width:             `${r() * 12 + 8}px`,
        height:            `${r() * 8 + 5}px`,
        animationDelay:    `${r() * 10}s`,
        animationDuration: `${r() * 7 + 7}s`,
        "--offset":        `${r() * 60 - 30}px`,
        "--rot":           `${r() * 720 - 360}deg`,
        opacity:           r() * 0.4 + 0.5,
      },
    })),

    bubble: Array.from({ length: 45 }, (_, i) => ({
      id: i,
      style: {
        left:              `${r() * 100}%`,
        bottom:            `-${r() * 20 + 5}px`,
        width:             `${r() * 20 + 6}px`,
        height:            `${r() * 20 + 6}px`,
        animationDelay:    `${r() * 8}s`,
        animationDuration: `${r() * 7 + 6}s`,
        "--offset":        `${r() * 60 - 30}px`,
        opacity:           r() * 0.35 + 0.2,
      },
    })),

    petal: Array.from({ length: 40 }, (_, i) => ({
      id: i,
      style: {
        left:              `${r() * 105 - 2}%`,
        top:               `-${r() * 20 + 5}px`,
        width:             `${r() * 10 + 6}px`,
        height:            `${r() * 8 + 4}px`,
        animationDelay:    `${r() * 12}s`,
        animationDuration: `${r() * 8 + 8}s`,
        "--offset":        `${r() * 50 - 25}px`,
        "--rot":           `${r() * 540 - 270}deg`,
        opacity:           r() * 0.45 + 0.45,
      },
    })),

    dust: Array.from({ length: 90 }, (_, i) => ({
      id: i,
      style: {
        left:              `${r() * 100}%`,
        top:               `${r() * 100}%`,
        width:             `${r() * 7 + 3}px`,
        height:            `${r() * 7 + 3}px`,
        animationDelay:    `${r() * 8}s`,
        animationDuration: `${r() * 8 + 5}s`,
        "--sx":            `${r() * 220 - 110}px`,
        "--sy":            `${r() * 220 - 110}px`,
        opacity:           r() * 0.4 + 0.45,
      },
    })),

    spark: Array.from({ length: 60 }, (_, i) => ({
      id: i,
      style: {
        left:              `${r() * 100}%`,
        top:               `-${r() * 10 + 4}px`,
        width:             `${r() * 3 + 2}px`,
        height:            `${r() * 3 + 2}px`,
        animationDelay:    `${r() * 6}s`,
        animationDuration: `${r() * 3 + 2}s`,
        "--offset":        `${r() * 30 - 15}px`,
        opacity:           r() * 0.5 + 0.5,
      },
    })),

    blossom: Array.from({ length: 32 }, (_, i) => ({
      id: i,
      style: {
        left:              `${r() * 105 - 2}%`,
        top:               `-${r() * 20 + 5}px`,
        width:             `${r() * 11 + 7}px`,
        height:            `${r() * 9 + 5}px`,
        animationDelay:    `${r() * 11}s`,
        animationDuration: `${r() * 9 + 9}s`,
        "--offset":        `${r() * 55 - 27}px`,
        "--rot":           `${r() * 600 - 300}deg`,
        opacity:           r() * 0.4 + 0.5,
      },
    })),

    ember: Array.from({ length: 45 }, (_, i) => ({
      id: i,
      style: {
        left:              `${r() * 100}%`,
        bottom:            `-${r() * 10 + 4}px`,
        width:             `${r() * 5 + 2}px`,
        height:            `${r() * 5 + 2}px`,
        animationDelay:    `${r() * 6}s`,
        animationDuration: `${r() * 4 + 3}s`,
        "--offset":        `${r() * 60 - 30}px`,
        opacity:           r() * 0.5 + 0.5,
      },
    })),

    star: Array.from({ length: 55 }, (_, i) => ({
      id: i,
      style: {
        left:              `${r() * 98 + 1}%`,
        top:               `${r() * 90 + 2}%`,
        width:             `${r() * 4 + 2}px`,
        height:            `${r() * 4 + 2}px`,
        animationDelay:    `${r() * 8}s`,
        animationDuration: `${r() * 4 + 3}s`,
        opacity:           0,
      },
    })),
  };

  return configs[type] ?? [];
}

/* ── Main component ─────────────────────────────────────────────── */
export default function AmbientEffect({ place }) {
  const type = PLACE_EFFECT[place];
  const particles = useMemo(() => (type ? makeParticles(type) : []), [type]);

  if (!type || !particles.length) return null;

  return (
    <div className={`ae-container ae-${type}`} aria-hidden="true">
      {particles.map(p => (
        <span key={p.id} className={`ae-particle ae-p-${type}`} style={p.style} />
      ))}
    </div>
  );
}
