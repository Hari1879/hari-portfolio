import { useEffect, useRef, useState } from "react";
import Header from "./header";
import About, { AICertifications } from "./about";
import StatsStrip from "./StatsStrip";
import Experience from "./Experience";
import Projects from "./Projects";
import Skills from "./skills";
import Contact from "./contact";
import FogEffect from "./FogEffect";
import SkillOrbit from "./skillOrbit";
import HireMeModal from "./HireMeModal";
import "./home.css";

function HireMePrompt() {
  const [visible,   setVisible]   = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const firedRef = useRef(false);

  // Observe the contact section — fires once when it enters the viewport
  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          // Small delay so the user has a moment to see the section first
          setTimeout(() => { setVisible(true); setShowModal(true); }, 800);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  if (dismissed && !showModal) return null;

  return (
    <>
      {/* Floating Hire Me button */}
      {!dismissed && (
        <div className={`hmp-wrap${visible ? " hmp-wrap--visible" : ""}`}>
          {/* Dismiss × */}
          <button
            className="hmp-dismiss"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss"
          >
            ✕
          </button>

          {/* Main button */}
          <button className="hmp-btn" onClick={() => setShowModal(true)}>
            <span className="hmp-pulse-ring" />
            <span className="hmp-pulse-ring hmp-pulse-ring--delay" />
            <span className="hmp-inner">
              <span className="hmp-emoji">👋</span>
              <span className="hmp-label">Hire Me</span>
            </span>
          </button>
        </div>
      )}

      {/* Reuse existing modal */}
      {showModal && <HireMeModal onClose={() => setShowModal(false)} />}
    </>
  );
}

function Home() {
  return (
    <>
      <FogEffect />
      <Header />
      <About />
      <StatsStrip />
      <Experience />
      <Projects />
      <AICertifications />
      <Skills />
      <SkillOrbit />
      <Contact />
      <HireMePrompt />
    </>
  );
}

export default Home;
