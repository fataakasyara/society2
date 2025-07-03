import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useMetaMask } from '../contexts/MetaMaskContext'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { isConnected, currentAccount, connect, truncateAddress } = useMetaMask()
  const location = useLocation()
  const navigate = useNavigate()

  const getCurrentPage = () => {
    const path = location.pathname
    if (path === '/') return 'index'
    if (path.startsWith('/post/')) return 'post'
    return path.slice(1)
  }

  const currentPage = getCurrentPage()

  // Track active section on homepage with improved detection
  useEffect(() => {
    if (currentPage === 'index') {
      const handleScroll = () => {
        const sections = ['join', 'about', 'governance']
        const scrollPosition = window.scrollY + 120 // Offset for navbar height
        const windowHeight = window.innerHeight

        let currentActiveSection = ''
        let closestSection = ''
        let closestDistance = Infinity

        sections.forEach(sectionId => {
          const element = document.getElementById(sectionId)
          if (element) {
            const { offsetTop, offsetHeight } = element
            const sectionCenter = offsetTop + (offsetHeight / 2)
            const distanceFromCenter = Math.abs(scrollPosition + (windowHeight / 2) - sectionCenter)

            // Check if section is in viewport
            if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight + 100) {
              currentActiveSection = sectionId
            }

            // Track closest section for fallback
            if (distanceFromCenter < closestDistance) {
              closestDistance = distanceFromCenter
              closestSection = sectionId
            }
          }
        })

        // If no section is clearly active, use the closest one
        if (!currentActiveSection && closestDistance < windowHeight) {
          currentActiveSection = closestSection
        }

        // If we're at the very top, no section should be active
        if (window.scrollY < 200) {
          currentActiveSection = ''
        }

        setActiveSection(currentActiveSection)
      }

      // Initial check with delay to ensure DOM is ready
      setTimeout(handleScroll, 100)

      // Add scroll listener with throttling
      let ticking = false
      const throttledScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll()
            ticking = false
          })
          ticking = true
        }
      }

      window.addEventListener('scroll', throttledScroll, { passive: true })
      window.addEventListener('resize', handleScroll, { passive: true })
      
      return () => {
        window.removeEventListener('scroll', throttledScroll)
        window.removeEventListener('resize', handleScroll)
      }
    } else {
      // Reset active section when not on homepage
      setActiveSection('')
    }
  }, [currentPage])

  const getMenuItems = () => {
    const baseItems = []

    // Different navigation logic based on current page
    if (currentPage === 'join' || currentPage === 'blog' || currentPage === 'ai' || currentPage === 'post') {
      baseItems.push(
        { 
          href: '/join', 
          text: 'Join', 
          isExternal: true, 
          sectionId: 'join',
          action: 'navigate'
        },
        { 
          href: '/#about', 
          text: 'About', 
          isExternal: true, 
          sectionId: 'about',
          action: 'navigate-to-home-section'
        },
        { 
          href: '/#governance', 
          text: 'Governance', 
          isExternal: true, 
          sectionId: 'governance',
          action: 'navigate-to-home-section'
        },
        { 
          href: '/blog', 
          text: 'Learn', 
          isExternal: true, 
          sectionId: 'blog',
          action: 'navigate'
        }
      )
    } else {
      // Homepage navigation
      baseItems.push(
        { 
          href: '#join', 
          text: 'Join', 
          isExternal: false, 
          sectionId: 'join',
          action: 'scroll-internal'
        },
        { 
          href: '#about', 
          text: 'About', 
          isExternal: false, 
          sectionId: 'about',
          action: 'scroll-internal'
        },
        { 
          href: '#governance', 
          text: 'Governance', 
          isExternal: false, 
          sectionId: 'governance',
          action: 'scroll-internal'
        },
        { 
          href: '/blog', 
          text: 'Learn', 
          isExternal: false, 
          sectionId: 'blog',
          action: 'navigate'
        }
      )
    }

    return baseItems
  }

  const isActiveLink = (item) => {
    // For blog and post pages
    if ((currentPage === 'blog' || currentPage === 'post') && item.sectionId === 'blog') {
      return true
    }

    // For join page
    if (currentPage === 'join' && item.sectionId === 'join') {
      return true
    }

    // For homepage sections - only highlight if we're actually in that section
    if (currentPage === 'index') {
      return activeSection === item.sectionId
    }

    return false
  }

  const handleLinkClick = (item, event) => {
    event.preventDefault()
    setIsMobileMenuOpen(false)
    
    const { href, action, sectionId } = item

    switch (action) {
      case 'navigate':
        // Direct page navigation
        navigate(href)
        break

      case 'navigate-to-home-section':
        // Navigate to homepage and scroll to section
        sessionStorage.setItem('scrollToSection', sectionId)
        navigate('/')
        break

      case 'scroll-internal':
        // Scroll to section on current page
        scrollToSection(sectionId)
        break

      default:
        // Fallback navigation
        if (href.startsWith('/')) {
          navigate(href)
        } else if (href.includes('#')) {
          const targetId = href.split('#')[1]
          scrollToSection(targetId)
        }
    }
  }

  const scrollToSection = (sectionId) => {
    const target = document.querySelector(`#${sectionId}`)
    if (target) {
      // Add visual feedback during navigation
      target.style.transition = 'all 0.3s ease'
      target.style.transform = 'scale(1.01)'
      
      // Calculate offset for fixed navbar
      const navbarHeight = 80
      const targetPosition = target.offsetTop - navbarHeight

      // Smooth scroll with custom implementation for better control
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
      
      // Reset visual feedback after scroll
      setTimeout(() => {
        if (target.style) {
          target.style.transform = 'scale(1)'
        }
      }, 600)

      // Update active section immediately for better UX
      setActiveSection(sectionId)

      // Focus management for accessibility
      setTimeout(() => {
        target.focus({ preventScroll: true })
        target.setAttribute('tabindex', '-1')
      }, 800)
    }
  }

  // Handle scroll to section after navigation to homepage
  useEffect(() => {
    if (currentPage === 'index') {
      const targetSection = sessionStorage.getItem('scrollToSection')
      if (targetSection) {
        sessionStorage.removeItem('scrollToSection')
        // Wait for page to fully load
        setTimeout(() => {
          scrollToSection(targetSection)
        }, 500)
      }
    }
  }, [currentPage])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Enhanced click outside and scroll handling
  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenu = document.querySelector('.mobile-menu')
      const button = document.querySelector('.mobile-menu-button')
      
      if (mobileMenu && button && !mobileMenu.contains(event.target) && !button.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }

    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileMenuOpen])

  const menuItems = getMenuItems()

  return (
    <nav className="fixed top-0 w-full bg-white shadow-lg z-30 mt-0 mb-16" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 outline-none">
            <img src="/gambar/nolyxnew.png" alt="Nolyx Logo" className="h-10 w-10" />
            <span id="cinzel" className="text-2xl font-bold text-green-700">Nolyx</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item, index) => {
              const isActive = isActiveLink(item)
              const activeClass = isActive ? 'text-green-700 font-semibold' : 'text-gray-700 hover:text-green-700'
              
              return (
                <button
                  key={index}
                  onClick={(e) => handleLinkClick(item, e)}
                  className={`font-medium ${activeClass} transition-all duration-300 hover:scale-105 relative group outline-none px-2 py-1`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.text}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-green-600 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>
              )
            })}
            
            {/* MetaMask Connection */}
            <button
              onClick={connect}
              className={`font-medium transition-all duration-300 hover:scale-105 outline-none px-2 py-1 ${
                isConnected 
                  ? 'text-green-600 font-semibold' 
                  : 'text-gray-700 hover:text-green-700'
              }`}
              aria-label={isConnected ? 'MetaMask Connected' : 'Connect MetaMask Wallet'}
            >
              {isConnected ? 'Connected' : 'Connect Metamask'}
            </button>
            
            <p className={`text-sm transition-colors duration-300 ${
              isConnected ? 'text-green-600 font-medium' : 'text-gray-600'
            }`} aria-live="polite">
              {isConnected ? truncateAddress(currentAccount) : 'not connected'}
            </p>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              className="mobile-menu-button text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 outline-none"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`mobile-menu ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} md:hidden bg-white border-t overflow-hidden transition-all duration-300 ease-in-out`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="px-4 py-2 space-y-3">
          {menuItems.map((item, index) => {
            const isActive = isActiveLink(item)
            const activeClass = isActive ? 'text-green-700 font-semibold bg-green-50' : 'text-gray-700 hover:text-green-700 hover:bg-gray-50'
            
            return (
              <button
                key={index}
                onClick={(e) => handleLinkClick(item, e)}
                className={`block w-full text-left py-3 px-3 rounded-lg transition-all duration-200 ${activeClass} outline-none`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.text}
              </button>
            )
          })}
          
          <button
            onClick={() => {
              connect()
              setIsMobileMenuOpen(false)
            }}
            className={`block w-full text-left py-3 px-3 rounded-lg transition-all duration-200 outline-none ${
              isConnected 
                ? 'text-green-600 font-semibold bg-green-50' 
                : 'text-gray-700 hover:text-green-700 hover:bg-gray-50'
            }`}
            aria-label={isConnected ? 'MetaMask Connected' : 'Connect MetaMask Wallet'}
          >
            {isConnected ? 'Connected' : 'Connect Metamask'}
          </button>
          
          <p className={`text-sm py-2 px-3 ${
            isConnected ? 'text-green-600 font-medium' : 'text-gray-600'
          }`} aria-live="polite">
            {isConnected ? truncateAddress(currentAccount) : 'not connected'}
          </p>
        </div>
      </div>

      {/* Fallback for users with JavaScript disabled */}
      <noscript>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 text-center">
          <p>For the best experience, please enable JavaScript in your browser.</p>
        </div>
      </noscript>
    </nav>
  )
}

export default Navbar