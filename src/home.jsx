import Header from "./header";
import About, { AICertifications } from "./about";
import Skills from "./skills";
import Contact from "./contact";
import FogEffect from "./FogEffect";
import SkillOrbit from "./skillOrbit";
import "./home.css";

function Home() {
  const scrollToNextSection = () => {
    const pageSections = Array.from(document.querySelectorAll("section[id]"));
    const currentScrollY = window.scrollY + 120;

    const nextSection = pageSections.find(
      (section) => section.offsetTop > currentScrollY
    );

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const firstSection = document.getElementById("about");
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <FogEffect />
      <Header />
      
      {/* Scroll Down Button */}
      <div className="scroll-down-container">
        <a href="#about" className="scroll-down-btn" onClick={(e) => {
          e.preventDefault();
          scrollToNextSection();
        }} aria-label="Scroll to next section">
          {/* Mouse Icon */}
          <div className="mouse-scroll">
            <div className="mouse-scroll-wheel"></div>
          </div>
        </a>
      </div>

      <About />
      <AICertifications />
      <Skills />
      <SkillOrbit />
      <Contact />

     
    </>
  )
}

export default Home;