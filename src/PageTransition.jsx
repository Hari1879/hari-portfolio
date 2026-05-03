import { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TransitionCtx } from "./usePageTransition";
import "./PageTransition.css";

export function PageTransitionProvider({ children }) {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase]   = useState("idle"); // idle | in | hold | out
  const navigate             = useNavigate();
  const pendingPath          = useRef(null);

  const transitionTo = useCallback((path) => {
    if (phase !== "idle") return;
    pendingPath.current = path;
    setVisible(true);
    setPhase("in");
  }, [phase]);

  /* Called when the cover panel finishes sliding IN */
  const onCoverIn = () => {
    setPhase("hold");
    navigate(pendingPath.current);
    // short hold so the new page mounts, then slide out
    setTimeout(() => setPhase("out"), 320);
  };

  /* Called when the cover panel finishes sliding OUT */
  const onCoverOut = () => {
    setPhase("idle");
    setVisible(false);
  };

  return (
    <TransitionCtx.Provider value={transitionTo}>
      {children}

      <AnimatePresence>
        {visible && (
          <motion.div
            className="pt-overlay"
            /* Slide UP from bottom to cover, then slide UP off the top */
            initial={{ y: "100%" }}
            animate={phase === "out" ? { y: "-100%" } : { y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{
              duration: phase === "out" ? 0.72 : 0.65,
              ease: [0.76, 0, 0.24, 1],
            }}
            onAnimationComplete={() => {
              if (phase === "in")  onCoverIn();
              if (phase === "out") onCoverOut();
            }}
          >
            {/* Noise texture layer */}
            <div className="pt-noise" />

            {/* "hari" — shine sweep reveal / clip hide */}
            <div className="pt-wordmark-wrap">
              <span
                className={`pt-wordmark${
                  phase === "out" ? " pt-wordmark--out" : ""
                }`}
              >
                Hari
              </span>
            </div>

            {/* Thin progress line at the bottom */}
            <motion.div
              className="pt-bar"
              initial={{ scaleX: 0 }}
              animate={phase === "out" ? { scaleX: 0 } : { scaleX: 1 }}
              transition={{ duration: 0.6, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionCtx.Provider>
  );
}
