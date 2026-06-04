import Header from "./header";
import About, { AICertifications } from "./about";
import Skills from "./skills";
import Contact from "./contact";
import FogEffect from "./FogEffect";
import SkillOrbit from "./skillOrbit";
import "./home.css";

function Home() {
  return (
    <>
      <FogEffect />
      <Header />
      <About />
      <AICertifications />
      <Skills />
      <SkillOrbit />
      <Contact />
    </>
  )
}

export default Home;