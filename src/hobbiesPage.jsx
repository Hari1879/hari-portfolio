import { useEffect, useState } from "react";
import FogEffect from "./FogEffect";
import Header from "./header";
import Hobbies from "./hobbies";
import FloatingEmojis from "./FloatingEmojis";

function HobbiesPage() {
  const [navCount, setNavCount] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <FogEffect />
      <Header />
      {navCount > 0 && <FloatingEmojis key={navCount} />}
      <Hobbies onNavigate={() => setNavCount((c) => c + 1)} />
    </>
  );
}

export default HobbiesPage;

