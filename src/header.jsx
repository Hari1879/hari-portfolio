import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import HireMeModal from './HireMeModal'
import HobbiesMenu from './HobbiesMenu'
import './header.css'

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showHireModal, setShowHireModal] = useState(false);
  const [showHobbiesMenu, setShowHobbiesMenu] = useState(false);

  const handleResumeClick = (e) => {
    e.preventDefault();

    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    window.setTimeout(() => {
      const downloadButton = document.getElementById("download-resume-btn");
      if (downloadButton) {
        downloadButton.classList.remove("auto-clicking");
        void downloadButton.offsetWidth;
        downloadButton.classList.add("auto-clicking");

        window.setTimeout(() => {
          downloadButton.click();
          downloadButton.classList.remove("auto-clicking");
        }, 560);
      }
    }, 700);
  };

  return (<>
    <header className="header">
      <div className="container">
        <div className="logo">
          <span className="logo-white">Harimurugavel</span>{" "}
          <span className="logo-red">Gnanavel</span>
        </div>

        <nav className="nav">
          <a href="/#about">About</a>
          {/* <a href="#services">Services</a> */}
          <a href="/#about" onClick={handleResumeClick}>Resume</a>
          <a href="/#skills">Skills</a>
          <div className="hobbies-nav-wrapper">
            <button
              className={`nav-link hobbies-nav-btn${location.pathname === '/hobbies' ? ' active' : ''}`}
              onClick={() => setShowHobbiesMenu(v => !v)}
            >
              Hobbies <span className={`hm-chevron${showHobbiesMenu ? ' open' : ''}`}>›</span>
            </button>
            {showHobbiesMenu && <HobbiesMenu onClose={() => setShowHobbiesMenu(false)} />}
          </div>
          {/* <a href="#projects">Projects</a> */}
          <a href="/#contact">Contact</a>
          <button onClick={() => setShowHireModal(true)} className="hire-btn">Hire Me</button>
        </nav>
      </div>
    </header>

    {showHireModal && <HireMeModal onClose={() => setShowHireModal(false)} />}
  </>);
}

export default Header;