import { useEffect, useRef, useState, useCallback } from "react";
import video1 from "./assets/videos/can_u_reduce_the_video_length.mp4";
import video2 from "./assets/videos/uccan_u_generate_same_for_dlsr_c.mp4";
import "./ScrollVideoHero.css";

const TOTAL_DELTA = 5000; // 40% slower than original 3000

export default function ScrollVideoHero({ onDone }) {
  const vid1Ref = useRef(null);
  const vid2Ref = useRef(null);
  const accRef = useRef(0);
  const doneRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

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
      if (p <= 0.5) {
        const t = p / 0.5;
        if (vid1.readyState >= 1 && vid1.duration) vid1.currentTime = t * vid1.duration;
        if (vid2.readyState >= 1) vid2.currentTime = 0;
        vid1.style.opacity = "1";
        vid2.style.opacity = "0";
      } else {
        const t = (p - 0.5) / 0.5;
        if (vid1.readyState >= 1 && vid1.duration) vid1.currentTime = vid1.duration;
        if (vid2.readyState >= 1 && vid2.duration) vid2.currentTime = t * vid2.duration;
        vid1.style.opacity = "0";
        vid2.style.opacity = "1";
      }
    };

    const step = (delta) => {
      accRef.current = Math.max(0, Math.min(TOTAL_DELTA, accRef.current + delta));
      const p = accRef.current / TOTAL_DELTA;
      setProgress(p);
      applyProgress(p);
      if (p >= 1) finish();
    };

    const onWheel = (e) => step(e.deltaY);

    let touchY = 0;
    const onTouchStart = (e) => { touchY = e.touches[0].clientY; };
    const onTouchMove = (e) => {
      const dy = touchY - e.touches[0].clientY;
      touchY = e.touches[0].clientY;
      step(dy * 3);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      document.body.style.overflow = "";
    };
  }, [finish]);

  const WORDS = ["Angular", "React", "Javascript"];
  const seg = Math.min(2, Math.floor(progress * 3));
  const local = (progress * 3) % 1;
  // fade in first 25%, hold middle, fade out last 25%
  const wordOpacity = progress < 0.02 ? 0
    : local < 0.25 ? local / 0.25
    : local > 0.75 ? (1 - local) / 0.25
    : 1;

  return (
    <div className={`svh-banner${exiting ? " svh-exiting" : ""}`}>
      {/* Background gradient */}
      <div className="svh-bg" />

      {/* Videos */}
      <video ref={vid1Ref} className="svh-video" src={video1} muted playsInline preload="auto" />
      <video ref={vid2Ref} className="svh-video svh-video-2" src={video2} muted playsInline preload="auto" />

      {/* Vignette */}
      <div className="svh-vignette" />

      {/* Headline — moves up slower than the video for parallax depth */}
      <div className="svh-content" style={{ transform: `translateY(${progress * -60}px)` }}>
        <p className="svh-eyebrow">Portfolio</p>
        <h1 className="svh-name">Hari</h1>
        <p className="svh-tagline">Front-End Engineer</p>

        {/* Scroll-driven tech word */}
        <div
          className="svh-skill-word"
          style={{
            opacity: wordOpacity,
            transform: `translateY(${(1 - wordOpacity) * 12}px)`,
          }}
        >
          <span className="svh-skill-dot" />
          {WORDS[seg]}
        </div>
      </div>

      {/* Scroll hint — fades out after user starts scrolling */}
      <div className="svh-hint" style={{ opacity: progress > 0.04 ? 0 : 1 }}>
        <div className="svh-hint-mouse">
          <div className="svh-hint-wheel" />
        </div>
        <span>scroll to explore</span>
      </div>

      {/* Progress bar */}
      <div className="svh-progress-track">
        <div className="svh-progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>

      {/* Skip */}
      <button className="svh-skip" onClick={finish} aria-label="Skip intro">
        Skip
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
