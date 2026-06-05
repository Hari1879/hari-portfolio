import { useEffect, useRef, useState, useCallback } from "react";
import video1 from "./assets/videos/can_u_reduce_the_video_length.mp4";
import video2 from "./assets/videos/uccan_u_generate_same_for_dlsr_c.mp4";
import "./ScrollVideoHero.css";

const COOLDOWN = 900; // ms minimum between step advances

export default function ScrollVideoHero({ onDone }) {
  const vid1Ref   = useRef(null);
  const vid2Ref   = useRef(null);
  const doneRef   = useRef(false);
  const onDoneRef = useRef(onDone);
  const stepRef   = useRef(0);
  const lastTime  = useRef(0);
  const [step,    setStep]    = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setExiting(true);
    setTimeout(() => {
      document.body.style.overflow = "";
      window.scrollTo(0, 0);          // clear any scroll that leaked through
      onDoneRef.current();
      // After React removes the banner, jump to About section
      requestAnimationFrame(() => {
        const about = document.getElementById("about");
        if (about) about.scrollIntoView({ behavior: "smooth" });
      });
    }, 800);
  }, []);

  // Each call advances one step; 4th scroll triggers exit
  const advance = useCallback(() => {
    if (doneRef.current) return;
    const now = Date.now();
    if (now - lastTime.current < COOLDOWN) return;
    lastTime.current = now;

    const next = stepRef.current + 1;
    // steps 0-1 → video 1  |  step 2 → video 2  |  step 3+ → exit
    if (next > 3) { finish(); return; }
    stepRef.current = next;
    setStep(next);
  }, [finish]);

  // Lock scroll, start video 1, wire events
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const vid1 = vid1Ref.current;
    const vid2 = vid2Ref.current;
    vid1.load();
    vid2.load();
    vid1.play().catch(() => {});

    let touchY = 0;
    // non-passive so preventDefault() prevents the page behind from scrolling
    const onWheel      = (e) => { e.preventDefault(); if (e.deltaY > 5) advance(); };
    const onTouchStart = (e) => { touchY = e.touches[0].clientY; };
    const onTouchMove  = (e) => {
      e.preventDefault();
      const dy = touchY - e.touches[0].clientY;
      if (dy > 25) { touchY = e.touches[0].clientY; advance(); }
    };

    window.addEventListener("wheel",      onWheel,      { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove",  onTouchMove,  { passive: false });

    return () => {
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
      // Safety: restore overflow if unmounted without finish (e.g. hot reload)
      if (!doneRef.current) document.body.style.overflow = "";
    };
  }, [advance]);

  // Sync video visibility when step changes
  useEffect(() => {
    const vid1 = vid1Ref.current;
    const vid2 = vid2Ref.current;
    if (step < 3) {
      vid1.style.opacity = "1";
      vid2.style.opacity = "0";
      vid2.pause();
    } else {
      vid1.style.opacity = "0";
      vid2.style.opacity = "1";
      vid2.currentTime = 0;
      vid2.play().catch(() => {});
    }
  }, [step]);

  const WORDS   = ["Angular", "React", "Javascript"];
  const wordIdx = Math.min(step, 2);

  return (
    <div className={`svh-banner${exiting ? " svh-exiting" : ""}`}>
      <div className="svh-bg" />

      <video ref={vid1Ref} className="svh-video"              src={video1} muted playsInline preload="auto" loop />
      <video ref={vid2Ref} className="svh-video svh-video-2"  src={video2} muted playsInline preload="auto" loop />

      <div className="svh-vignette" />

      <div className="svh-content">
        <p className="svh-eyebrow">Portfolio</p>
        <h1 className="svh-name">Hari</h1>
        <p className="svh-tagline">Front-End Engineer</p>

        <div className="svh-skill-word" key={wordIdx}>
          <span className="svh-skill-dot" />
          {WORDS[wordIdx]}
        </div>
      </div>

      <div className="svh-hint" style={{ opacity: step === 0 ? 1 : 0 }}>
        <div className="svh-hint-mouse"><div className="svh-hint-wheel" /></div>
        <span>scroll to explore</span>
      </div>

      {/* Step indicator dots */}
      <div className="svh-steps">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`svh-step-dot${step >= i ? " svh-step-dot--active" : ""}`} />
        ))}
      </div>

      <div className="svh-progress-track">
        <div className="svh-progress-fill" style={{ width: `${(step / 3) * 100}%` }} />
      </div>

      <button className="svh-skip" onClick={finish} aria-label="Skip intro">
        Skip
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
