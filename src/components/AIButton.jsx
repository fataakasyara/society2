import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const AIButton = ({ 
  href = '/ai', 
  text = 'Ask Nolyx AI',
  showOnPages = ['all'],
  hideOnPages = [],
  position = 'fixed'
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimated, setIsAnimated] = useState(false)
  const location = useLocation()

  const getCurrentPage = () => {
    const path = location.pathname
    return path === '/' ? 'index' : path.slice(1)
  }

  const shouldShowOnCurrentPage = () => {
    const currentPage = getCurrentPage()
    
    if (hideOnPages.includes(currentPage)) {
      return false
    }

    if (showOnPages.includes('all')) {
      return true
    }

    return showOnPages.includes(currentPage)
  }

  useEffect(() => {
    const shouldShow = shouldShowOnCurrentPage()
    setIsVisible(shouldShow)
    
    if (shouldShow) {
      const timer = setTimeout(() => {
        setIsAnimated(true)
      }, 1500)
      
      return () => clearTimeout(timer)
    }
  }, [location.pathname])

  const handleClick = () => {
    console.log('AI Button clicked')
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'AI Button',
        event_label: 'Ask Nolyx AI',
        value: 1
      })
    }
  }

  if (!isVisible) return null

  const buttonStyle = {
    opacity: isAnimated ? '1' : '0',
    transform: isAnimated ? 'translateY(0)' : 'translateY(50px)',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    position: position
  }

  return (
    <div className="button-container ai-button-container" style={buttonStyle}>
      <a 
        href={href} 
        className="ai-button"
        onClick={handleClick}
        onMouseEnter={() => console.log('AI Button hovered')}
      >
        <span className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M9 9l.01 0" />
            <path d="M15 9l.01 0" />
            <path d="M8 13a4 4 0 1 0 8 0m0 0h-8" />
          </svg>
        </span>
        {text}
      </a>
    </div>
  )
}

export default AIButton