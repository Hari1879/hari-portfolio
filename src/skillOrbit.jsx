import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './SkillOrbit.css';

const PROJECTS = [
  {
    id: 1,
    title: "FTPL Field Intelligence",
    subtitle: "React · Firebase · Node.js",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop",
    actionText: "View Project",
    href: "https://ftpl-field-intelligence-be6b0.web.app",
    accent: "#ff004f",
  },
  {
    id: 2,
    title: "Aadhava Constructions",
    subtitle: "React · Next.js · Vercel",
    imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&auto=format&fit=crop",
    actionText: "View Project",
    href: "https://aadhava-constructions.vercel.app/",
    accent: "#f7971e",
  },
  {
    id: 3,
    title: "Attendra",
    subtitle: "React · Node.js · MySQL",
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80&auto=format&fit=crop",
    actionText: "View Project",
    href: "https://ateendra.in/",
    accent: "#4285f4",
  },
];

// Low damping = pronounced elastic overshoot on release
const springConfig = { damping: 6, stiffness: 280 };

function ProjectCard({ id, title, subtitle, imageUrl, actionText, href, accent, delay }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // ±17° tilt — noticeably more dramatic than default
  const rotateX = useTransform(springY, [-0.5, 0.5], ['17deg', '-17deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-17deg',  '17deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width  - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleProjectClick = () => {
    window.gtag?.('event', 'recent_project_click', {
      project_name: title,
      project_id: id,
      project_href: href,
    });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        '--accent': accent,
      }}
      className="rp-card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Outer glow ring — scales with accent colour */}
      <div className="rp-card-glow-ring" />

      <div className="rp-card-inner">
        {/* Photo */}
        <img src={imageUrl} alt={title} className="rp-card-img" />

        {/* Dark + accent gradient overlay */}
        <div className="rp-card-overlay" />

        {/* Content */}
        <div className="rp-card-content">

          {/* Header row */}
          <div className="rp-card-header">
            <div>
              <motion.h2
                style={{ transform: 'translateZ(60px)' }}
                className="rp-card-title"
              >
                {title}
              </motion.h2>
              <motion.p
                style={{ transform: 'translateZ(48px)' }}
                className="rp-card-subtitle"
              >
                {subtitle}
              </motion.p>
            </div>

            <motion.a
              href={href}
              target="_blank"
              onClick={handleProjectClick}
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: '8deg' }}
              whileTap={{ scale: 0.88 }}
              style={{ transform: 'translateZ(70px)' }}
              className="rp-link-btn"
              aria-label={`Open ${title}`}
            >
              <ArrowUpRight size={20} />
            </motion.a>
          </div>

          {/* CTA button */}
          <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleProjectClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{ transform: 'translateZ(50px)' }}
            className="rp-action-btn"
          >
            {actionText}
          </motion.a>

        </div>
      </div>
    </motion.div>
  );
}


export default function RecentProjects() {
  return (
    <div className="skill-container rp-container">
      <h2 className="sg-section-title">Recent Projects</h2>
      <p className="rp-subtitle">Things I've built and shipped recently</p>
      <div className="rp-grid">
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={idx} {...project} delay={idx * 0.14} />
        ))}
      </div>
    </div>
  );
}
