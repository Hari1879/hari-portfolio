import { useEffect } from "react";
import { FaEnvelope, FaLinkedinIn, FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";
import "./HireMeModal.css";

export default function HireMeModal({ onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="hire-overlay" onClick={onClose}>
      <div className="hire-card" onClick={(e) => e.stopPropagation()}>

        <button className="hire-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="hire-profile">
          <div className="hire-avatar">
            <img src="/hari-profile.jpg" alt="Hari" />
          </div>
          <div className="hire-intro">
            <h2>Let's Work Together</h2>
            <p>Available for freelance &amp; full-time opportunities</p>
            <span className="hire-badge">🟢 Open to work</span>
          </div>
        </div>

        <div className="hire-divider" />

        <div className="hire-options">
          <a href="mailto:harigmindia7@gmail.com" className="hire-option">
            <span className="hire-opt-icon">📧</span>
            <div className="hire-opt-text">
              <strong>Send an Email</strong>
              <small>harigmindia7@gmail.com</small>
            </div>
            <span className="hire-opt-arrow">→</span>
          </a>

          <a href="https://www.linkedin.com/in/harigm7/" target="_blank" rel="noreferrer" className="hire-option">
            <span className="hire-opt-icon">💼</span>
            <div className="hire-opt-text">
              <strong>Connect on LinkedIn</strong>
              <small>linkedin.com/in/harigm7</small>
            </div>
            <span className="hire-opt-arrow">→</span>
          </a>

          <a href="https://wa.me/917812811213" target="_blank" rel="noreferrer" className="hire-option">
            <span className="hire-opt-icon">💬</span>
            <div className="hire-opt-text">
              <strong>WhatsApp</strong>
              <small>+91 78128 11213</small>
            </div>
            <span className="hire-opt-arrow">→</span>
          </a>
        </div>

        <div className="hire-socials">
          <a href="https://github.com/harigm7" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/harigm7/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
          <a href="https://www.instagram.com/hari_gm" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
          <a href="mailto:harigmindia7@gmail.com" aria-label="Email"><FaEnvelope /></a>
          <a href="https://wa.me/917812811213" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
        </div>
      </div>
    </div>
  );
}
