const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

export function initializeAnalytics() {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') {
    return
  }

  if (document.getElementById('ga-script')) {
    return
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments)
  }

  const script = document.createElement('script')
  script.id = 'ga-script'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`

  const inlineScript = document.createElement('script')
  inlineScript.innerHTML = `
    window.dataLayer = window.dataLayer || []
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    window.gtag('config', '${GA_MEASUREMENT_ID}')
  `

  document.head.appendChild(script)
  document.head.appendChild(inlineScript)
}

export function trackPageView(path) {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return
  }

  const pagePath = path || window.location.pathname + window.location.search
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: pagePath })
  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: document.title || 'Portfolio',
  })
}
