import { useState } from 'react'
import Home from './home'
import './App.css'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HobbiesPage from './hobbiesPage'
import ScrollIndicator from './ScrollIndicator'
import TravelPage from './TravelPage'
import TravelDetail from './TravelDetail'
import TravelGallery from './TravelGallery'
import PlaceGallery from './PlaceGallery'
import { PageTransitionProvider } from './PageTransition'
import ScrollVideoHero from './ScrollVideoHero'

function App() {
  const [showBanner, setShowBanner] = useState(true)

  return (
    <>
      {showBanner && <ScrollVideoHero onDone={() => setShowBanner(false)} />}

    <BrowserRouter>

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
