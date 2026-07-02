import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HobbiesMenu.css";

const items = [
  {
    id: "travel",
    icon: "✈️",
    title: "Travel",
    tag: "Road Trips · Culture",
    desc: "Exploring new cities and local culture.",
    color: "#ff6b35",
    route: "/travel",
  },
  {
    id: "photography",
    icon: "📷",
    title: "Photography",
    tag: "Street · Nature",
    desc: "Capturing moments that tell visual stories.",
    color: "#ff004f",
    route: "/gallery",
  }
  // {
  //   id: "music",
  //   icon: "🎵",
  //   title: "Music",
  //   tag: "Focus · Relax",
  //   desc: "Curated playlists for deep work and flow.",
  //   color: "#4facfe",
  //   route: "/hobbies",
  // },
  // {
  //   id: "movies",
  //   icon: "🎬",
  //   title: "Movies",
  //   tag: "Sci‑Fi · Thriller",
  //   desc: "Loving storytelling and cinematography.",
  //   color: "#f7971e",
  //   route: "/hobbies",
  // },
];

export default function HobbiesMenu({ onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleItem = (route) => {
    onClose();
    window.scrollTo({ top: 0, behavior: "instant" });
    window.gtag?.('event', `route_${route}`, { source: 'header' });
    navigate(route);
  };

  return (
    <>
      <div className="hm-backdrop" onClick={onClose} />
      <div className="hm-panel">
        <p className="hm-label">Explore</p>
        <div className="hm-grid">
          {items.map((item) => (
            <button
              key={item.id}
              className="hm-item"
              style={{ "--hm-color": item.color }}
              onClick={() => handleItem(item.route)}
            >
              <span className="hm-icon">{item.icon}</span>
              <div className="hm-text">
                <strong>{item.title}</strong>
                <small>{item.desc}</small>
              </div>
              <span className="hm-tag">{item.tag}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
