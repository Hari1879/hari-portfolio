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
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = (data) => { 
       if(data) {
        window.gtag?.('event', data, { method: 'google' })
       }
    setMenuOpen(false); setShowHobbiesMenu(false); };

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

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <nav className={`nav${menuOpen ? ' nav--open' : ''}`}>
          <a href="/#about" onClick={() => closeMenu('about')}>About</a>
          <a href="/#about" onClick={(e) => { closeMenu('about'); handleResumeClick(e); }}>Resume</a>
          <a href="/#skills" onClick={() => closeMenu('skills')}>Skills</a>
          <div className="hobbies-nav-wrapper">
            <button
              className={`nav-link hobbies-nav-btn${location.pathname === '/hobbies' ? ' active' : ''}`}
              onClick={() => {
                window.gtag?.('event', 'hobbies_click', { source: 'header' })
                setShowHobbiesMenu(v => !v)
              }}
            >
              Hobbies <span className={`hm-chevron${showHobbiesMenu ? ' open' : ''}`}>›</span>
            </button>
            {showHobbiesMenu && <HobbiesMenu onClose={() => { setShowHobbiesMenu(false); closeMenu(); }} />}
          </div>
          {/* <a
            href="/travel"
            onClick={(e) => {
              e.preventDefault()
              window.gtag?.('event', 'travel_page_click', { source: 'header' })
              navigate('/travel')
              closeMenu()
            }}
          >
            Travel
          </a> */}
          <a href="/#contact" onClick={closeMenu}>Contact</a>
          <button
            onClick={() => {
              window.gtag?.('event', 'hire_me_click', { source: 'header' })
              setShowHireModal(true)
              closeMenu('hire')
            }}
            className="hire-btn"
          >
            Hire Me
          </button>
        </nav>
      </div>
    </header>

    {showHireModal && <HireMeModal onClose={() => {
      window.gtag?.('event', 'hire_me_click', { source: 'header' })
      setShowHireModal(false)}
    }
       />}
  </>);
}

export default Header;