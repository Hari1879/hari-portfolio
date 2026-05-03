import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import "./about.css";

function PhotoCarousel() {
  const images = [
    "/hari-profile.jpg",
    "/hari-photo2.jpg",
    "/hari-photo3.JPG",
  ];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % images.length), 3200);
    return () => clearInterval(t);
  }, []);

  const getPos = (i) => {
    const offset = (i - active + images.length) % images.length;
    if (offset === 0) return "pos-center";
    if (offset === images.length - 1) return "pos-left";
    return "pos-right";
  };

  return (
    <div className="photo-carousel">
      {images.map((src, i) => (
        <div
          key={i}
          className={`carousel-card ${getPos(i)}`}
          onClick={() => setActive(i)}
        >
          <img src={src} alt={`Photo ${i + 1}`} />
        </div>
      ))}
      <div className="carousel-dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === active ? " active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <h1 className="bg-text">HARI</h1>
        <PhotoCarousel />
        <div className="about-content">
          <h2>About Me</h2>
          <p>
            Highly skilled and results-driven <span>Front-End Engineer</span> with <span>8 years</span> of experience in building responsive and scalable web applications.
            Expert in <span>Angular (2+)</span>, <span>React.js</span>, JavaScript, TypeScript, RxJS, NgRx, Redux, and REST APIs.
          </p>
          <p>
            Hands-on experience with <span>Node.js</span> backend and <span>iOS development</span> using Swift.
            Focused on clean code, performance, and delivering seamless user experiences across e-commerce, enterprise, and internal platforms.
          </p>
          <div className="about-stats">
            <Stat value={8} label="Years Experience" />
            <Stat value={20} label="Projects Completed" />
            <Stat value={15} label="Technologies" />
          </div>
          <a
            href="/Harimurugavel__Gnanavel-Frontend_developer.pdf"
            download="Harimurugavel__Gnanavel-Frontend_developer.pdf"
            className="about-btn"
            id="download-resume-btn"
          >Download Resume</a>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label, suffix = "+" }) {
  return (
    <div className="stat">
      <RollingNumber value={value} suffix={suffix} />
      <p>{label}</p>
    </div>
  );
}

function RollingNumber({ value, suffix }) {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.6 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="rolling-number" ref={containerRef}>
      {value.toString().split("").map((digit, i) => (
        <Digit key={i} digit={parseInt(digit)} visible={visible} delay={i * 0.15} />
      ))}
      <span className="suffix">{suffix}</span>
    </div>
  );
}

function Digit({ digit, visible, delay }) {
  const stripRef = useRef(null);

  useEffect(() => {
    const el = stripRef.current;
    if (!el || !el.parentElement) return;
    const height = el.parentElement.getBoundingClientRect().height;
    if (visible) {
      el.style.transition = `transform 1.3s cubic-bezier(0.22,1,0.36,1) ${delay}s`;
      el.style.transform = `translateY(-${digit * height}px)`;
    } else {
      el.style.transition = "none";
      el.style.transform = "translateY(0px)";
    }
  }, [visible, digit, delay]);

  return (
    <div className="digit-wrapper">
      <div ref={stripRef} className="digit-strip">
        {[0,1,2,3,4,5,6,7,8,9].map((n) => (
          <div key={n} className="digit">{n}</div>
        ))}
      </div>
    </div>
  );
}

export default About;

export function AICertifications() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hoveredCard, setHoveredCard] = useState(null);

  const courses = [
    { title: "AI for Research and Insights",               provider: "Google", color: "#4285F4", badge: "✓" },
    { title: "AI for Content Creation & Communication",    provider: "Google", color: "#EA4335", badge: "✓" },
    { title: "AI for Data Analysis",                       provider: "Google", color: "#FBBC05", badge: "✓" },
    { title: "AI for App Building",                        provider: "Google", color: "#34A853", badge: "✓" },
    { title: "Generative AI: Introduction and Applications", provider: "IBM",  color: "#1F70C1", badge: "✓" },
  ];

  const aiTools = [
    { name: "Claude",  color: "#d4a853" },
    { name: "ChatGPT", color: "#74aa9c" },
    { name: "Grok",    color: "#a855f7" },
    { name: "Gemini",  color: "#4285F4" },
  ];

  const nodes = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    delay: Math.random() * 5,
    dur: 3 + Math.random() * 5,
  }));

  return (
    <section className="ai-cert-section" id="ai-certifications" ref={sectionRef}>
      <svg className="ai-circuit-bg" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuitGrid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(247,151,30,0.07)" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuitGrid)" />
      </svg>

      <div className="ai-nodes" aria-hidden="true">
        {nodes.map((n) => (
          <span key={n.id} className="ai-node" style={{
            left: `${n.x}%`, top: `${n.y}%`,
            width: n.size, height: n.size,
            animationDelay: `${n.delay}s`,
            animationDuration: `${n.dur}s`,
          }} />
        ))}
      </div>

      <div className="ai-cert-container">
        <motion.div
          className="ai-cert-title-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="ai-chip-label">⚡ FEATURED</span>
          <h2 className="ai-cert-title">AI &amp; Certifications</h2>
          <p className="ai-cert-subtitle">Completed industry-recognized courses to stay at the forefront of AI.</p>
        </motion.div>

        <motion.div
          className="ai-note"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="ai-note-header">
            <span className="ai-note-label">🤖 AI Tools &amp; Powered Experiences</span>
            <div className="ai-tools-chips">
              {aiTools.map((t) => (
                <span key={t.name} className="ai-tool-chip" style={{ '--chip-color': t.color }}>{t.name}</span>
              ))}
            </div>
          </div>
          <div className="ai-bot-track" aria-hidden="true">
            <span className="ai-bot-runner"><span className="ai-bot-bounce">🤖</span></span>
          </div>
          <p>Actively worked with cutting-edge AI models including <span>Claude</span>, <span>ChatGPT</span>, <span>Grok</span>, and <span>Gemini</span> — leveraging them to accelerate development, enhance problem-solving, and build smarter user experiences.</p>
          <p>Also experienced in building <span>AI-Powered UX &amp; Interfaces</span> such as <span>chatbots</span> and <span>recommendation systems</span> — integrating intelligent features directly into product workflows.</p>
        </motion.div>

        <div className="ai-cert-grid">
          {courses.map((course, i) => (
            <motion.div
              className="ai-cert-card"
              key={i}
              style={{ '--card-color': course.color }}
              initial={{ opacity: 0, y: 40, rotateX: -15 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 + i * 0.11, ease: [0.22, 1, 0.36, 1] }}
              onHoverStart={() => setHoveredCard(i)}
              onHoverEnd={() => setHoveredCard(null)}
              whileHover={{ y: -6, scale: 1.03 }}
            >
              <div className="ai-card-shimmer" />
              <div className="ai-cert-num" style={{ background: course.color }}>0{i + 1}</div>
              <div className="ai-cert-body">
                <div className="ai-cert-top">
                  <div className="ai-cert-icon">🎓</div>
                  <span className="ai-cert-badge" style={{ color: course.color, borderColor: course.color }}>
                    {course.badge} {course.provider}
                  </span>
                </div>
                <h4>{course.title}</h4>
              </div>
              <div className="ai-card-bar" style={{ background: course.color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
