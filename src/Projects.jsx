import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import "./Projects.css";

const PROJECTS = [
  {
    id: 1,
    name: "Cerebro",
    subtitle: "Agentic AI Focus Group Simulator",
    desc: "Owned end-to-end frontend architecture — dual-channel real-time comms (Socket.IO + SSE), D3.js sentiment dashboards, Azure deployment. Market research turnaround cut from weeks to 48 hours.",
    tech: ["Angular 17+", "RxJS", "NgRx", "Socket.IO", "SSE", "D3.js", "Docker", "Azure"],
    metric: "60% re-render reduction",
    type: "Enterprise",
    company: "LTIMindtree",
    color: "#a855f7",
    colorDim: "rgba(168,85,247,0.12)",
    colorBorder: "rgba(168,85,247,0.35)",
    link: null,
  },
  {
    id: 2,
    name: "Unilever Commerce",
    subtitle: "12-Module Enterprise Platform",
    desc: "Defined feature-based NgRx architecture, led Angular v16→v19 migration with Signals, integrated Razorpay checkout (UPI, cards, net-banking) and Azure Maps real-time delivery tracking.",
    tech: ["Angular 16-19", "NgRx", "MSAL", "Razorpay", "Azure Maps", "Chart.js", "Tailwind"],
    metric: "99%+ payment success",
    type: "Enterprise",
    company: "LTIMindtree",
    color: "#3b82f6",
    colorDim: "rgba(59,130,246,0.12)",
    colorBorder: "rgba(59,130,246,0.35)",
    link: null,
  },
  {
    id: 3,
    name: "UIBuilder",
    subtitle: "Low-Code Drag-and-Drop Platform",
    desc: "Architected a low-code canvas from scratch — component-tree data model, 50+ reusable widgets, deep undo/redo, conflict-free multi-user editing. Website delivery cut from 3 days to under 1 hour.",
    tech: ["Angular", "TypeScript", "RxJS", "NgRx"],
    metric: "45% render time cut",
    type: "Enterprise",
    company: "LTIMindtree",
    color: "#f59e0b",
    colorDim: "rgba(245,158,11,0.12)",
    colorBorder: "rgba(245,158,11,0.35)",
    link: null,
  },
  {
    id: 4,
    name: "SSV Platform",
    subtitle: "Data Exploration & Visualization",
    desc: "Extended Apache Superset with custom React visualization plugins, integrated 6+ data sources, replaced 2 legacy BI licenses. Typed Redux Toolkit layer cut frontend bug reports by 30%.",
    tech: ["React", "Redux Toolkit", "TypeScript", "Apache Superset", "D3.js"],
    metric: "$30K annual savings",
    type: "Enterprise",
    company: "LTIMindtree",
    color: "#10b981",
    colorDim: "rgba(16,185,129,0.12)",
    colorBorder: "rgba(16,185,129,0.35)",
    link: null,
  },
  {
    id: 5,
    name: "Jamba Juice",
    subtitle: "E-Commerce Storefront (US Client)",
    desc: "End-to-end customer storefront handling 5K+ daily transactions across 500+ US store locations. Cut page load from 4.2s → 1.8s via lazy loading, code splitting, and image optimisation. Reduced cart abandonment by ~18% through checkout-flow redesign with async validation.",
    tech: ["Angular", "Node.js", "Express.js", "REST APIs"],
    metric: "4.2s → 1.8s load time",
    type: "Enterprise",
    company: "Vthink Global",
    color: "#f97316",
    colorDim: "rgba(249,115,22,0.12)",
    colorBorder: "rgba(249,115,22,0.35)",
    link: null,
  },
  {
    id: 6,
    name: "Ovenues",
    subtitle: "Event & Venue Booking Marketplace",
    desc: "Full-stack booking marketplace covering venue search, availability calendar, vendor onboarding, and payments. Built reusable reactive-form framework cutting new-form delivery from 3 days to 4 hours. MongoDB schema with indexing kept search queries under 120ms.",
    tech: ["Angular", "Node.js", "Express.js", "MongoDB"],
    metric: "100+ vendors in Q1",
    type: "Enterprise",
    company: "Vthink Global",
    color: "#06b6d4",
    colorDim: "rgba(6,182,212,0.12)",
    colorBorder: "rgba(6,182,212,0.35)",
    link: null,
  },
];

function ProjectCard({ project, index }) {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const inView  = useInView(wrapRef, { once: true, margin: "-60px" });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const onMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const x  = (e.clientX - r.left) / r.width;
    const y  = (e.clientY - r.top)  / r.height;
    const rx = (y - 0.5) * -18;
    const ry = (x - 0.5) *  18;
    el.style.transform  = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03,1.03,1.03)`;
    el.style.boxShadow  = `${ry * -1.5}px ${rx * 1.5}px 40px rgba(0,0,0,0.55), 0 0 50px ${project.color}1a`;
    setGlow({ x: x * 100, y: y * 100 });
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
      className="proj-wrap"
      initial={{ opacity: 0, y: 70, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={cardRef}
        className="proj-card"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          "--accent":       project.color,
          "--accent-dim":   project.colorDim,
          "--accent-border":project.colorBorder,
        }}
      >
        {/* Cursor-tracking glow */}
        <div
          className="proj-glow"
          style={{ background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, ${project.color}22, transparent 65%)` }}
        />

        {/* Top accent line */}
        <div className="proj-accent-bar" />

        <div className="proj-header-row">
          <span className="proj-badge proj-badge--type">{project.type}</span>
          <span className="proj-badge proj-badge--co">{project.company}</span>
        </div>

        <h3 className="proj-name">{project.name}</h3>
        <p className="proj-subtitle">{project.subtitle}</p>
        <p className="proj-desc">{project.desc}</p>

        <div className="proj-tech">
          {project.tech.map(t => <span key={t} className="proj-chip">{t}</span>)}
        </div>

        <div className="proj-footer">
          <div className="proj-metric">
            <span className="proj-metric-dot" />
            {project.metric}
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="proj-link"
              onClick={e => e.stopPropagation()}
            >
              Live ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const titleRef  = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section className="projects-section" id="projects">
      <div className="proj-bg-orb proj-bg-orb--1" />
      <div className="proj-bg-orb proj-bg-orb--2" />

      <div className="projects-container">
        <motion.div
          ref={titleRef}
          className="proj-heading"
          initial={{ opacity: 0, y: 40 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="proj-eyebrow">Selected Work</p>
          <h2 className="proj-title">Projects & Case Studies</h2>
          <p className="proj-sub">Enterprise platforms · AI systems · Live freelance deployments</p>
        </motion.div>

        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
