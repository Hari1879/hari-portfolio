import React, { useState, useEffect, useRef } from 'react';
import {
  FaAngular, FaReact, FaJs, FaHtml5, FaCss3Alt,
  FaBootstrap, FaNodeJs, FaGitAlt, FaGithub, FaApple,
} from 'react-icons/fa';
import { SiTypescript, SiMysql, SiSwift, SiNextdotjs, SiIonic } from 'react-icons/si';
import './SkillOrbit.css';

const SKILLS = [
  { name: "Angular",     icon: <FaAngular />,    color: "#DD0031", desc: "Enterprise-ready framework by Google.",             level: 97, category: "Frontend" },
  { name: "React",       icon: <FaReact />,      color: "#61DAFB", desc: "Declarative UI library for modern web apps.",      level: 96, category: "Frontend" },
  { name: "TypeScript",  icon: <SiTypescript />, color: "#3178C6", desc: "Type-safe JavaScript for large-scale apps.",       level: 94, category: "Frontend" },
  { name: "JavaScript",  icon: <FaJs />,         color: "#F7DF1E", desc: "The engine of the modern web.",                   level: 94, category: "Frontend" },
  { name: "HTML5",       icon: <FaHtml5 />,      color: "#E34F26", desc: "The backbone of web structure.",                  level: 96, category: "Frontend" },
  { name: "CSS3",        icon: <FaCss3Alt />,    color: "#1572B6", desc: "Visual styling and layout engine.",               level: 90, category: "Frontend" },
  { name: "Bootstrap",   icon: <FaBootstrap />,  color: "#7952B3", desc: "Rapid UI development framework.",                level: 82, category: "Frontend" },
  { name: "Next.js",     icon: <SiNextdotjs />,  color: "#aaaaaa", desc: "React framework for production-grade web apps.", level: 78, category: "Frontend" },
  { name: "Ionic",       icon: <SiIonic />,      color: "#3880FF", desc: "Cross-platform hybrid mobile framework.",        level: 75, category: "Frontend" },
  { name: "Node.js",     icon: <FaNodeJs />,     color: "#339933", desc: "High-speed server-side JavaScript runtime.",     level: 91, category: "Backend"  },
  { name: "SQL",         icon: <SiMysql />,      color: "#4479A1", desc: "Structured data storage and management.",        level: 70, category: "Backend"  },
  { name: "Git",         icon: <FaGitAlt />,     color: "#F05032", desc: "Version control for project history.",           level: 88, category: "Backend"  },
  { name: "GitHub",      icon: <FaGithub />,     color: "#c0c0c0", desc: "Cloud collaboration and code hosting.",          level: 85, category: "Backend"  },
  { name: "Swift",       icon: <SiSwift />,      color: "#F05138", desc: "Modern language for native iOS apps.",           level: 80, category: "Mobile"   },
  { name: "Objective-C", icon: <FaApple />,      color: "#A2AAAD", desc: "Core foundation of Apple software.",            level: 70, category: "Mobile"   },
  { name: "iOS Dev",     icon: <FaApple />,      color: "#d0d5d9", desc: "Building premium mobile experiences.",           level: 82, category: "Mobile"   },
];

const R = 44; // bubble radius px
const REPEL_RADIUS = 140;
const SPEED_CAP    = 5;

export default function SkillOrbit() {
  const containerRef = useRef(null);
  const rafRef       = useRef(null);
  const physRef      = useRef([]);   // mutable physics — no re-renders
  const nodeRefs     = useRef({});   // id → DOM node
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const cursorRef    = useRef(null);

  const [active,    setActive]    = useState(null);
  const [collected, setCollected] = useState(new Set());
  const [popping,   setPopping]   = useState(new Set());
  const [typed,     setTyped]     = useState('');

  // Typing effect for HUD
  useEffect(() => {
    if (!active) return;
    let i = 0;
    setTyped('');
    const tid = setInterval(() => {
      i++;
      setTyped(active.desc.slice(0, i));
      if (i >= active.desc.length) clearInterval(tid);
    }, 45);
    return () => clearInterval(tid);
  }, [active]);

  // Physics init + RAF loop
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const spawn = () => {
      const W = el.clientWidth, H = el.clientHeight;
      physRef.current = SKILLS.map((_, id) => ({
        id,
        x: R + 30 + Math.random() * (W - R * 2 - 60),
        y: R + 30 + Math.random() * (H - R * 2 - 60),
        vx: (Math.random() - 0.5) * 1.1,
        vy: (Math.random() - 0.5) * 1.1,
        alive: true,
      }));
    };
    spawn();

    const tick = () => {
      const W = el.clientWidth, H = el.clientHeight;
      const { x: mx, y: my } = mouseRef.current;
      physRef.current.forEach(b => {
        if (!b.alive) return;

        // Mouse repulsion
        const dx = b.x - mx, dy = b.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * 1.2;
          b.vx += (dx / dist) * force;
          b.vy += (dy / dist) * force;
        }

        // Speed cap + damping
        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (speed > SPEED_CAP) { b.vx = (b.vx / speed) * SPEED_CAP; b.vy = (b.vy / speed) * SPEED_CAP; }
        b.vx *= 0.985;
        b.vy *= 0.985;

        b.x += b.vx;
        b.y += b.vy;
        if (b.x < R)     { b.x = R;     b.vx =  Math.abs(b.vx); }
        if (b.x > W - R) { b.x = W - R; b.vx = -Math.abs(b.vx); }
        if (b.y < R)     { b.y = R;     b.vy =  Math.abs(b.vy); }
        if (b.y > H - R) { b.y = H - R; b.vy = -Math.abs(b.vy); }
        const node = nodeRefs.current[b.id];
        if (node) {
          node.style.left = `${b.x - R}px`;
          node.style.top  = `${b.y - R}px`;
        }
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const pop = (id) => {
    const b = physRef.current[id];
    if (!b || !b.alive) return;
    b.alive = false;
    setActive(SKILLS[id]);
    setCollected(prev => new Set([...prev, id]));
    setPopping(prev => new Set([...prev, id]));
    setTimeout(() => {
      const el = containerRef.current;
      if (!el) return;
      const W = el.clientWidth, H = el.clientHeight;
      b.x  = R + 30 + Math.random() * (W - R * 2 - 60);
      b.y  = R + 30 + Math.random() * (H - R * 2 - 60);
      b.vx = (Math.random() - 0.5) * 1.1;
      b.vy = (Math.random() - 0.5) * 1.1;
      b.alive = true;
      setPopping(prev => { const n = new Set(prev); n.delete(id); return n; });
    }, 950);
  };

  const reset = () => {
    setCollected(new Set());
    setPopping(new Set());
    setActive(null);
    const el = containerRef.current;
    if (!el) return;
    const W = el.clientWidth, H = el.clientHeight;
    physRef.current.forEach(b => {
      b.x  = R + 30 + Math.random() * (W - R * 2 - 60);
      b.y  = R + 30 + Math.random() * (H - R * 2 - 60);
      b.vx = (Math.random() - 0.5) * 1.1;
      b.vy = (Math.random() - 0.5) * 1.1;
      b.alive = true;
    });
  };

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y };
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
      cursorRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -9999, y: -9999 };
    if (cursorRef.current) cursorRef.current.style.opacity = '0';
  };

  const allDone = collected.size === SKILLS.length;
  const pct     = (collected.size / SKILLS.length) * 100;

  return (
    <div className="skill-container" ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>

      {/* ── Cursor glow ── */}
      <div className="sg-cursor-glow" ref={cursorRef} />

      {/* ── Section heading ── */}
      <h2 className="sg-section-title">Skills &amp; Technologies</h2>

      {/* ── Score bar ── */}
      <div className="sg-scorebar">
        <span className="sg-score-label">SKILLS COLLECTED</span>
        <div className="sg-score-track">
          <div className="sg-score-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="sg-score-count">
          {collected.size}<span className="sg-score-total">/{SKILLS.length}</span>
        </span>
      </div>

      <p className="sg-hint">Click the bubbles to explore skills ✦</p>

      {/* ── Bubbles ── */}
      {SKILLS.map((skill, id) => (
        <div
          key={id}
          ref={el => { nodeRefs.current[id] = el; }}
          className={`sg-bubble${popping.has(id) ? ' sg-pop' : ''}${collected.has(id) && !popping.has(id) ? ' sg-hidden' : ''}`}
          style={{ '--c': skill.color }}
          onClick={() => pop(id)}
        >
          <span className="sg-icon">{skill.icon}</span>
          <span className="sg-name">{skill.name}</span>
        </div>
      ))}

      {/* ── Win overlay ── */}
      {allDone && (
        <div className="sg-win">
          <div className="sg-win-card">
            <div className="sg-win-emoji">🎉</div>
            <h3>All Skills Collected!</h3>
            <p>You've explored every technology in the stack.</p>
            <button className="sg-win-btn" onClick={reset}>Play Again</button>
          </div>
        </div>
      )}

      {/* ── HUD panel ── */}
      {active && (
        <div className="hud-panel" key={active.name} style={{ '--accent': active.color }}>
          <div className="hud-accent-bar" style={{ background: `linear-gradient(90deg, transparent, ${active.color}, transparent)` }} />
          <div className="terminal-header">
            <div className="terminal-controls">
              <span className="control-btn close"    onClick={() => setActive(null)} />
              <span className="control-btn minimize" />
              <span className="control-btn maximize" />
            </div>
            <div className="terminal-title">skill_info.sh</div>
            <div className="typing-indicator">
              <span /><span /><span />
            </div>
          </div>
          <div className="terminal-content">
            <div className="hud-header">
              <span className="terminal-prompt">{'>'}</span>
              <span className="hud-icon">{active.icon}</span>
              <h3>{active.name}</h3>
              <span className="hud-category-badge">{active.category}</span>
            </div>
            <div className="proficiency-row">
              <span className="proficiency-label">PROFICIENCY</span>
              <span className="proficiency-pct">{active.level}%</span>
            </div>
            <div className="proficiency-track">
              <div className="proficiency-fill" style={{ '--fill-width': `${active.level}%`, '--fill-color': active.color }} />
            </div>
            <div className="code-output">
              <span className="output-label">// Description:</span>
              <p className="hud-desc">
                {typed}<span className="typing-cursor">|</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
