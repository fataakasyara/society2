import React, { useState, useEffect } from 'react'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      className={`fixed bottom-4 right-4 bg-green-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 hover:bg-green-800 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 ${
        isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onClick={scrollToTop}
      style={{ 
        zIndex: 9999,
        cursor: 'pointer'
      }}
      aria-label="Scroll to top"
      type="button"
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  )
}

export default ScrollToTop