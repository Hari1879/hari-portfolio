import { useState, useEffect, useCallback } from 'react'
import Home from './home'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import HobbiesPage from './hobbiesPage'
import ScrollIndicator from './ScrollIndicator'
import TravelPage from './TravelPage'
import TravelDetail from './TravelDetail'
import TravelGallery from './TravelGallery'
import PlaceGallery from './PlaceGallery'
import { PageTransitionProvider } from './PageTransition'
import ScrollVideoHero from './ScrollVideoHero'
import { trackPageView } from './analytics.js'

function InitialLoader({ onRevealBanner, onDone }) {
  const [suffixOut, setSuffixOut] = useState(false);
  const [exiting,   setExiting]   = useState(false);

  // Lock scroll while loader is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setSuffixOut(true), 1500);
    // When exit starts, immediately show ScrollVideoHero BEHIND the fading loader
    // so there is never a gap where the home page is exposed
    const t2 = setTimeout(() => { setExiting(true); onRevealBanner(); }, 2500);
    const t3 = setTimeout(onDone, 3350);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onRevealBanner, onDone]);

  const suffix = 'murugavel'.split('');

  return (
    <div className={`il-overlay${exiting ? ' il-exit' : ''}`}>
      <div className="il-sweep" />
      <h1 className="il-name">
        <span className="il-prefix">Hari</span>
        {suffix.map((char, i) => (
          <span
            key={i}
            className={`il-char${suffixOut ? ' il-char--out' : ''}`}
            style={{ '--i': i }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}

function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname + location.search)
  }, [location.key, location.pathname, location.search])

  useEffect(() => {
    let hasTrackedBottom = false

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const atBottom = scrollTop + windowHeight >= documentHeight - 8

      if (atBottom && !hasTrackedBottom) {
        hasTrackedBottom = true
        window.gtag?.('event', 'scroll_to_bottom', {
          page_path: location.pathname + location.search,
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.key, location.pathname, location.search])

  return null
}

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  const handleRevealBanner = useCallback(() => setShowBanner(true), []);
  const handleLoaderDone   = useCallback(() => setShowLoader(false), []);
  const handleBannerDone   = useCallback(() => setShowBanner(false), []);

  // Block right-click "Save Image As" on every image and video across the app
  useEffect(() => {
    const block = (e) => {
      if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', block);
    return () => document.removeEventListener('contextmenu', block);
  }, []);

  return (
    <>
      {showLoader && (
        <InitialLoader
          onRevealBanner={handleRevealBanner}
          onDone={handleLoaderDone}
        />
      )}
      {showBanner && <ScrollVideoHero onDone={handleBannerDone} />}

    <BrowserRouter>
      <AnalyticsTracker />

      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{
          top: 24,
          right: 24,
        }}
        toastOptions={{
          duration: 3800,
          style: {
            background: 'linear-gradient(145deg, rgba(28,12,22,0.96), rgba(14,9,13,0.96))',
            color: '#fff',
            border: '1px solid rgba(255,0,79,0.35)',
            borderRadius: '14px',
            padding: '14px 16px',
            boxShadow: '0 14px 35px rgba(255,0,79,0.22)',
            backdropFilter: 'blur(10px)',
            fontSize: '14px',
            fontWeight: 500,
          },
          success: {
            iconTheme: {
              primary: '#ff4f8b',
              secondary: '#0b0b0c',
            },
            style: {
              border: '1px solid rgba(255,79,139,0.55)',
              boxShadow: '0 14px 35px rgba(255,79,139,0.28)',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff1f6a',
              secondary: '#0b0b0c',
            },
            style: {
              border: '1px solid rgba(255,31,106,0.55)',
              boxShadow: '0 14px 35px rgba(255,31,106,0.3)',
            },
          },
        }}
      />

      <ScrollIndicator />

      <PageTransitionProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hobbies" element={<HobbiesPage />} />
          <Route path="/travel" element={<TravelPage />} />
          <Route path="/travel/:id" element={<TravelDetail />} />
          <Route path="/gallery" element={<TravelGallery />} />
          <Route path="/gallery/:id" element={<PlaceGallery />} />
        </Routes>
      </PageTransitionProvider>
    </BrowserRouter>
    </>
  )

}

export default App
