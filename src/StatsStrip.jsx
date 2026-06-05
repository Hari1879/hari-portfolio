import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import "./StatsStrip.css";

const STATS = [
  { value: 8,   suffix: "+",  prefix: "",  label: "Years Experience",         desc: "Angular & React" },
  { value: 22,  suffix: "%",  prefix: "",  label: "Bundle Size Reduced",      desc: "Unilever platform" },
  { value: 99,  suffix: "%+", prefix: "",  label: "Payment Success Rate",     desc: "50K+ monthly orders" },
  { value: 50,  suffix: "K+", prefix: "",  label: "Monthly Orders Processed", desc: "Razorpay integration" },
  { value: 60,  suffix: "%",  prefix: "",  label: "Re-render Overhead Cut",   desc: "RxJS + OnPush CD" },
  { value: 48,  suffix: "h",  prefix: "<", label: "Research Turnaround",      desc: "From weeks (Cerebro AI)" },
];

function CountUp({ to, suffix, prefix, inView }) {
  const [count, setCount]  = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    if (!inView) { setCount(0); return; }
    let startTime = null;
    const duration = 1800;
    const tick = (ts) => {
      if (!startTime) startTime = ts;
      const prog  = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      setCount(Math.round(eased * to));
      if (prog < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, to]);

  return (
    <span className="ss-number">
      <span className="ss-prefix">{prefix}</span>
      {count}
      <span className="ss-suffix">{suffix}</span>
    </span>
  );
}

export default function StatsStrip() {
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section className="stats-section" ref={sectionRef}>
      {/* Red gradient rules top & bottom */}
      <div className="stats-rule stats-rule--top"    />
      <div className="stats-rule stats-rule--bottom" />

      <div className="stats-inner">
        <motion.p
          className="stats-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Impact by the numbers
        </motion.p>

        <div className="stats-grid">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              className="ss-item"
              initial={{ opacity: 0, y: 44, scale: 0.88 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* 3-D depth layer behind the number */}
              <div className="ss-depth" />

              <CountUp to={s.value} suffix={s.suffix} prefix={s.prefix} inView={inView} />
              <p className="ss-label">{s.label}</p>
              <p className="ss-desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
