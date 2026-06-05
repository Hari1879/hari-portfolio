import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import "./Experience.css";

const EXPERIENCES = [
  {
    id: 1,
    logo: "LTI",
    company: "LTIMindtree",
    role: "Specialist — Product Engineering",
    level: "SDE-II",
    period: "2023 – Present",
    duration: "2+ yrs",
    location: "Chennai, India",
    color: "#3b82f6",
    colorDim: "rgba(59,130,246,0.10)",
    colorBorder: "rgba(59,130,246,0.32)",
    yearBg: "2023",
    projects: ["Cerebro AI", "Unilever Commerce", "UIBuilder", "SSV Platform"],
    highlights: [
      "Owned end-to-end architecture for agentic AI simulator — research turnaround weeks → 48 h",
      "Led Angular v16→v19 migration with Signals — 22% bundle cut, Lighthouse 68 → 91",
      "99%+ payment success rate across 50K+ monthly orders via Razorpay",
      "Mentored 4–5 junior engineers; 2 promoted to mid-level within 12 months",
    ],
    metrics: [
      { value: "22%",  label: "Bundle reduced" },
      { value: "99%+", label: "Payment success" },
      { value: "50K+", label: "Monthly orders" },
    ],
  },
  {
    id: 2,
    logo: "VG",
    company: "Vthink Global",
    role: "Application Developer",
    level: "SDE-I",
    period: "2017 – 2022",
    duration: "5 yrs",
    location: "Chennai, India",
    color: "#ff4f8b",
    colorDim: "rgba(255,79,139,0.10)",
    colorBorder: "rgba(255,79,139,0.32)",
    yearBg: "2017",
    projects: ["Jamba Juice (US)", "Ovenues", "ClanHQ iOS", "BrandMuscle"],
    highlights: [
      "Built e-commerce storefront handling 5K+ daily transactions across 500+ US locations",
      "Cut page load 4.2s → 1.8s via lazy loading, code splitting, and image optimisation",
      "Reduced cart abandonment by ~18% through checkout-flow redesign with async validation",
      "Delivered full-stack booking marketplace — 100+ vendors onboarded in Q1 post-launch",
    ],
    metrics: [
      { value: "5K+",   label: "Daily transactions" },
      { value: "1.8s",  label: "Page load time" },
      { value: "18%↓",  label: "Cart abandonment" },
    ],
  },
];

function ExpCard({ exp, side }) {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const inView  = useInView(wrapRef, { once: true, margin: "-80px" });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;   // 0-1
    const ny = (e.clientY - r.top)  / r.height;  // 0-1
    const rx = (ny - 0.5) * -16;
    const ry = (nx - 0.5) *  16;
    // Dynamic shadow simulates card thickness in the tilt direction
    const sx = ry * -3;
    const sy = rx *  3;
    el.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.025,1.025,1.025)`;
    el.style.boxShadow = `
      ${sx}px   ${sy}px   0   1px rgba(0,0,0,0.8),
      ${sx*1.7}px ${sy*1.7}px 0   rgba(0,0,0,0.38),
      0 24px 55px rgba(0,0,0,0.5),
      0 0   80px ${exp.color}18
    `;
    setGlow({ x: nx * 100, y: ny * 100 });
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "";
    el.style.boxShadow = "";
    setGlow({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={wrapRef}
      className={`exp-item exp-item--${side}`}
      initial={{
        opacity: 0,
        x:       side === "left" ? -110 : 110,
        scale:   0.82,
        rotateY: side === "left" ? -22  : 22,
      }}
      animate={inView ? { opacity: 1, x: 0, scale: 1, rotateY: 0 } : {}}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: 1400 }}
    >
      <div
        ref={cardRef}
        className="exp-card"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          "--exp-color":  exp.color,
          "--exp-dim":    exp.colorDim,
          "--exp-border": exp.colorBorder,
        }}
      >
        {/* Cursor-tracking radial glow */}
        <div
          className="exp-cursor-glow"
          style={{ background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, ${exp.color}20, transparent 62%)` }}
        />

        {/* Top accent line */}
        <div className="exp-accent-bar" />

        {/* Giant year watermark behind all content */}
        <div className="exp-year-bg" aria-hidden="true">{exp.yearBg}</div>

        {/* Floating level pill — animates as if hovering above card */}
        <div className="exp-level-pill">{exp.level}</div>

        {/* ── Header ── */}
        <div className="exp-header">
          <div className="exp-logo-box">
            <span>{exp.logo}</span>
          </div>
          <div className="exp-header-info">
            <h3 className="exp-company">{exp.company}</h3>
            <p className="exp-role">{exp.role}</p>
            <div className="exp-meta-row">
              <span className="exp-period">{exp.period}</span>
              <span className="exp-sep">·</span>
              <span className="exp-dur">{exp.duration}</span>
              <span className="exp-sep">·</span>
              <span className="exp-loc">{exp.location}</span>
            </div>
          </div>
        </div>

        {/* ── Project chips ── */}
        <div className="exp-chips-row">
          {exp.projects.map(p => (
            <span key={p} className="exp-chip">{p}</span>
          ))}
        </div>

        {/* ── Achievement bullets ── */}
        <ul className="exp-bullets">
          {exp.highlights.map((h, i) => <li key={i}>{h}</li>)}
        </ul>

        {/* ── Metrics strip at the bottom ── */}
        <div className="exp-metrics">
          {exp.metrics.map((m, i) => (
            <div key={i} className="exp-metric">
              <span className="exp-metric-val">{m.value}</span>
              <span className="exp-metric-lbl">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Centre timeline dot */}
      <div className="exp-dot-anchor">
        <div className="exp-dot" style={{ background: exp.color, boxShadow: `0 0 18px ${exp.color}bb` }} />
        <div className="exp-dot-ring" style={{ borderColor: exp.colorBorder }} />
        <div className="exp-dot-ring exp-dot-ring--outer" style={{ borderColor: exp.colorBorder }} />
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const titleRef    = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 85%", "end 30%"],
  });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="experience-section" id="experience">
      <div className="exp-bg-orb exp-bg-orb--1" />
      <div className="exp-bg-orb exp-bg-orb--2" />

      <div className="exp-container">
        <motion.div
          ref={titleRef}
          className="exp-heading"
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="exp-eyebrow">Career Journey</p>
          <h2 className="exp-title">Professional Experience</h2>
          <p className="exp-sub">8+ years building enterprise-grade frontends</p>
        </motion.div>

        <div className="exp-timeline" ref={timelineRef}>
          <div className="exp-line-track">
            <motion.div className="exp-line-fill" style={{ height: lineH }} />
          </div>
          {EXPERIENCES.map((exp, i) => (
            <ExpCard key={exp.id} exp={exp} side={i % 2 === 0 ? "left" : "right"} />
          ))}
        </div>
      </div>
    </section>
  );
}
