// import React from "react";
// import "./Skills.css";

// import {
//   FaAngular,
//   FaReact,
//   FaJs,
//   FaHtml5,
//   FaCss3Alt,
//   FaNodeJs,
//   FaGitAlt,
//   FaGithub,
//   FaBootstrap,
//   FaApple
// } from "react-icons/fa";

// import {
//   SiTypescript,
//   SiMysql,
//   SiSwift
// } from "react-icons/si";


// export default function Skills() {
//   return (
//     <section className="skills-section">
//   );
// }
// import React from "react";
import "./skills.css";
import React, { useState, useEffect, useRef } from "react";

import {
  FaAngular,
  FaReact,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaBootstrap,
  FaApple
} from "react-icons/fa";

import { SiTypescript, SiMysql, SiSwift, SiNextdotjs, SiIonic } from "react-icons/si";

const skills = {
  Frontend: [
    { name: "Angular",    icon: <FaAngular />,    color: "#DD0031" },
    { name: "React",      icon: <FaReact />,      color: "#61DAFB" },
    { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
    { name: "JavaScript", icon: <FaJs />,         color: "#F7DF1E" },
    { name: "HTML5",      icon: <FaHtml5 />,      color: "#E34F26" },
    { name: "CSS3",       icon: <FaCss3Alt />,    color: "#1572B6" },
    { name: "Bootstrap",  icon: <FaBootstrap />,  color: "#7952B3" },
    { name: "Next.js",    icon: <SiNextdotjs />,  color: "#ffffff" },
    { name: "Ionic",      icon: <SiIonic />,      color: "#3880FF" },
  ],
  Backend: [
    { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
    { name: "SQL",     icon: <SiMysql />,  color: "#4479A1" },
    { name: "Git",     icon: <FaGitAlt />, color: "#F05032" },
    { name: "GitHub",  icon: <FaGithub />, color: "#ffffff" },
  ],
  Mobile: [
    { name: "Swift",       icon: <SiSwift />, color: "#F05138" },
    { name: "Objective-C", icon: <FaApple />, color: "#A2AAAD" },
    { name: "iOS Dev",     icon: <FaApple />, color: "#A2AAAD" },
  ],
};

export default function SkillsSpin() {
  const [rotation, setRotation] = useState({ x: 10, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      if (!isHovering) {
        setRotation(prev => ({
          x: 60,
          y: prev.y + 0.2,
        }));
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isHovering]);

  const handleMouseMove = (e) => {
    if (isHovered && !selectedIcon) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientY - rect.top - rect.height / 2) / 10;
      const y = (e.clientX - rect.left - rect.width / 2) / 10;
      setRotation({ x: -x, y: y });
    }
  };

  return (
    <>
      <section className="skills-section" id="skills">
        <h2 className="skills-title">My Skills &amp; Technologies</h2>

        {Object.entries(skills).map(([category, items]) => (
          <div className="category-section" key={category}>
            <h3 className="category-title">{category}</h3>

            <div className="skills-grid">
              {items.map((skill, index) => (
                <div className="skill-card" key={index}>
                  <div
                    className="skill-icon"
                    style={{ color: skill.color }}
                  >
                    {skill.icon}
                  </div>
                  <p>{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

