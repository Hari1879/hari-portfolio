import { useEffect, useRef, useState, useCallback } from "react";
import video1 from "./assets/videos/can_u_reduce_the_video_length.mp4";
import video2 from "./assets/videos/uccan_u_generate_same_for_dlsr_c.mp4";
import "./ScrollVideoHero.css";

const TOTAL_DELTA = 5000;
const LERP        = 0.09; // fraction of remaining gap closed per frame (~60 fps)

export default function ScrollVideoHero({ onDone }) {
  const vid1Ref   = useRef(null);
  const vid2Ref   = useRef(null);
  const targetRef = useRef(0);   // raw accumulated scroll — updated instantly
  const smoothRef = useRef(0);   // lerped 0-1 progress — drives the video
  const rafRef    = useRef(null);
  const doneRef   = useRef(false);
  const [progress, setProgress] = useState(0);
  const [exiting,  setExiting]  = useState(false);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    setExiting(true);
    setTimeout(onDone, 800);
  }, [onDone]);

  useEffect(() => {
    const vid1 = vid1Ref.current;
    const vid2 = vid2Ref.current;

    vid1.load();
    vid2.load();
    document.body.style.overflow = "hidden";

    const applyProgress = (p) => {
      // ── Video 1 scrub ──
      if (p <= 0.55) {
        const t = Math.min(1, p / 0.5);
        if (vid1.readyState >= 1 && vid1.duration) vid1.currentTime = t * vid1.duration;
      }
      // ── Video 2 scrub ──
      if (p >= 0.45) {
        const t = Math.min(1, (p - 0.5) / 0.5);
        if (vid2.readyState >= 1 && vid2.duration) vid2.currentTime = Math.max(0, t) * vid2.duration;
      }
      // ── Cross-fade: 0.45 → 0.55 overlap zone ──
      if (p <= 0.45) {
        vid1.style.opacity = "1";
        vid2.style.opacity = "0";
      } else if (p >= 0.55) {
        vid1.style.opacity = "0";
        vid2.style.opacity = "1";
      } else {
        const blend = (p - 0.45) / 0.1;          // 0 → 1 across the overlap
        vid1.style.opacity = String(1 - blend);
        vid2.style.opacity = String(blend);
      }
    };

    // ── RAF loop: lerps smoothRef toward targetRef every frame ──
    const tick = () => {
      const target = targetRef.current / TOTAL_DELTA;
      const diff   = target - smoothRef.current;

      if (Math.abs(diff) > 0.00015) {
        smoothRef.current += diff * LERP;
        const p = Math.min(1, Math.max(0, smoothRef.current));
        setProgress(p);
        applyProgress(p);
        if (p >= 0.9999) { finish(); return; }
      } else if (target >= 1) {
        // Lerp stalled just below 1 — snap to finish
        finish();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    // Scroll only updates the target — the RAF loop does all the seeking
    const step = (delta) => {
      targetRef.current = Math.max(0, Math.min(TOTAL_DELTA, targetRef.current + delta));
    };

    const onWheel      = (e) => step(e.deltaY);
    let   touchY       = 0;
    const onTouchStart = (e) => { touchY = e.touches[0].clientY; };
    const onTouchMove  = (e) => {
      const dy = touchY - e.touches[0].clientY;
      touchY   = e.touches[0].clientY;
      step(dy * 3);
    };

    window.addEventListener("wheel",      onWheel,      { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove",  onTouchMove,  { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("wheel",      onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
      document.body.style.overflow = "";
    };
  }, [finish]);

  const WORDS = ["Angular", "React", "Javascript"];
  const seg   = Math.min(2, Math.floor(progress * 3));
  const local = (progress * 3) % 1;
  const wordOpacity = progress < 0.02 ? 0
    : local < 0.25 ? local / 0.25
    : local > 0.75 ? (1 - local) / 0.25
    : 1;

  return (
    <div className={`svh-banner${exiting ? " svh-exiting" : ""}`}>
      <div className="svh-bg" />

      <video ref={vid1Ref} className="svh-video"           src={video1} muted playsInline preload="auto" />
      <video ref={vid2Ref} className="svh-video svh-video-2" src={video2} muted playsInline preload="auto" />

      <div className="svh-vignette" />

      <div className="svh-content" style={{ transform: `translateY(${progress * -60}px)` }}>
        <p className="svh-eyebrow">Portfolio</p>
        <h1 className="svh-name">Hari</h1>
        <p className="svh-tagline">Front-End Engineer</p>

        <div
          className="svh-skill-word"
          style={{
            opacity:   wordOpacity,
            transform: `translateY(${(1 - wordOpacity) * 12}px)`,
          }}
        >
          <span className="svh-skill-dot" />
          {WORDS[seg]}
        </div>
      </div>

      <div className="svh-hint" style={{ opacity: progress > 0.04 ? 0 : 1 }}>
        <div className="svh-hint-mouse">
          <div className="svh-hint-wheel" />
        </div>
        <span>scroll to explore</span>
      </div>

      <div className="svh-progress-track">
        <div className="svh-progress-fill" style={{ width: `${progress * 100}%` }} />
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
