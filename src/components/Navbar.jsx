import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMetaMask } from '../contexts/MetaMaskContext'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { isConnected, currentAccount, connect, truncateAddress } = useMetaMask()
  const location = useLocation()

  const getCurrentPage = () => {
    const path = location.pathname
    return path === '/' ? 'index' : path.slice(1)
  }

  const currentPage = getCurrentPage()

  // Track active section on homepage
  useEffect(() => {
    if (currentPage === 'index') {
      const handleScroll = () => {
        const sections = ['join', 'about', 'governance']
        const scrollPosition = window.scrollY + 100 // Offset for navbar height

        let currentActiveSection = ''

        sections.forEach(sectionId => {
          const element = document.getElementById(sectionId)
          if (element) {
            const { offsetTop, offsetHeight } = element
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              currentActiveSection = sectionId
            }
          }
        })

        // If we're at the very top, no section should be active
        if (window.scrollY < 200) {
          currentActiveSection = ''
        }

        setActiveSection(currentActiveSection)
      }

      // Initial check
      handleScroll()

      // Add scroll listener
      window.addEventListener('scroll', handleScroll)
      
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    } else {
      // Reset active section when not on homepage
      setActiveSection('')
    }
  }, [currentPage])

  const getMenuItems = () => {
    const baseItems = []

    if (currentPage === 'join' || currentPage === 'blog' || currentPage === 'ai' || currentPage === 'post') {
      baseItems.push(
        { href: '/#join', text: 'Join', isExternal: true, sectionId: 'join' },
        { href: '/#about', text: 'About', isExternal: true, sectionId: 'about' },
        { href: '/#governance', text: 'Governance', isExternal: true, sectionId: 'governance' },
        { href: '/blog', text: 'Learn', isExternal: false, sectionId: 'blog' }
      )
    } else {
      baseItems.push(
        { href: '#join', text: 'Join', isExternal: false, sectionId: 'join' },
        { href: '#about', text: 'About', isExternal: false, sectionId: 'about' },
        { href: '#governance', text: 'Governance', isExternal: false, sectionId: 'governance' },
        { href: '/blog', text: 'Learn', isExternal: false, sectionId: 'blog' }
      )
    }

    return baseItems
  }

  const isActiveLink = (item) => {
    // For external pages (blog, ai, join, post)
    if (currentPage !== 'index') {
      if (item.sectionId === 'blog' && currentPage === 'blog') return true
      if (item.sectionId === 'blog' && currentPage === 'post') return true
      return false
    }

    // For homepage sections
    if (currentPage === 'index') {
      // Only highlight if we're actually in that section
      return activeSection === item.sectionId
    }

    return false
  }

  const handleLinkClick = (href, isExternal) => {
    setIsMobileMenuOpen(false)
    
    if (!isExternal && href.includes('#')) {
      const targetId = href.split('#')[1]
      const target = document.querySelector(`#${targetId}`)
      if (target) {
        // Add visual feedback during navigation
        target.style.transition = 'all 0.3s ease'
        target.style.transform = 'scale(1.02)'
        
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
        
        // Reset visual feedback after scroll
        setTimeout(() => {
          target.style.transform = 'scale(1)'
        }, 300)
      }
    } else if (isExternal && href.includes('#')) {
      // For external links to index.html sections
      window.location.href = href
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      const mobileMenu = document.querySelector('.mobile-menu')
      const button = document.querySelector('.mobile-menu-button')
      
      if (mobileMenu && button && !mobileMenu.contains(event.target) && !button.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }

    const handleScroll = () => {
      setIsMobileMenuOpen(false)
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('click', handleClickOutside)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const menuItems = getMenuItems()

  return (
    <nav className="fixed top-0 w-full bg-white shadow-lg z-30 mt-0 mb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <img src="/gambar/nolyxnew.png" alt="Nolyx" className="h-10 w-10" />
            <span id="cinzel" className="text-2xl font-bold text-green-700">Nolyx</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item, index) => {
              const isActive = isActiveLink(item)
              const activeClass = isActive ? 'text-green-700 font-semibold' : 'text-gray-700 hover:text-green-700'
              
              if (item.isExternal || item.href.startsWith('/')) {
                return (
                  <Link
                    key={index}
                    to={item.href}
                    className={`font-medium ${activeClass} transition-all duration-300 hover:scale-105 relative group`}
                  >
                    {item.text}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-green-600 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </Link>
                )
              } else {
                return (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(item.href, item.isExternal)
                    }}
                    className={`font-medium ${activeClass} transition-all duration-300 hover:scale-105 relative group`}
                  >
                    {item.text}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-green-600 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </button>
                )
              }
            })}
            <button
              onClick={connect}
              className={`font-medium transition-all duration-300 hover:scale-105 ${
                isConnected 
                  ? 'text-green-600 font-semibold' 
                  : 'text-gray-700 hover:text-green-700'
              }`}
            >
              {isConnected ? 'Connected' : 'Connect Metamask'}
            </button>
            <p className={`text-sm transition-colors duration-300 ${
              isConnected ? 'text-green-600 font-medium' : 'text-gray-600'
            }`}>
              {isConnected ? truncateAddress(currentAccount) : 'not connected'}
            </p>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              className="mobile-menu-button text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              onClick={toggleMobileMenu}
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} md:hidden bg-white border-t overflow-hidden transition-all duration-300 ease-in-out`}>
        <div className="px-4 py-2 space-y-3">
          {menuItems.map((item, index) => {
            const isActive = isActiveLink(item)
            const activeClass = isActive ? 'text-green-700 font-semibold bg-green-50' : 'text-gray-700 hover:text-green-700 hover:bg-gray-50'
            
            if (item.isExternal || item.href.startsWith('/')) {
              return (
                <Link
                  key={index}
                  to={item.href}
                  className={`block py-3 px-3 rounded-lg transition-all duration-200 ${activeClass}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.text}
                </Link>
              )
            } else {
              return (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(item.href, item.isExternal)
                  }}
                  className={`block w-full text-left py-3 px-3 rounded-lg transition-all duration-200 ${activeClass}`}
                >
                  {item.text}
                </button>
              )
            }
          })}
          <button
            onClick={() => {
              connect()
              setIsMobileMenuOpen(false)
            }}
            className={`block w-full text-left py-3 px-3 rounded-lg transition-all duration-200 ${
              isConnected 
                ? 'text-green-600 font-semibold bg-green-50' 
                : 'text-gray-700 hover:text-green-700 hover:bg-gray-50'
            }`}
          >
            {isConnected ? 'Connected' : 'Connect Metamask'}
          </button>
          <p className={`text-sm py-2 px-3 ${
            isConnected ? 'text-green-600 font-medium' : 'text-gray-600'
          }`}>
            {isConnected ? truncateAddress(currentAccount) : 'not connected'}
          </p>
        </div>
      </div>
    </nav>
  )
}

export default Navbar