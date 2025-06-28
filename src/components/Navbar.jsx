import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useMetaMask } from '../contexts/MetaMaskContext'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isConnected, currentAccount, connect, truncateAddress } = useMetaMask()
  const location = useLocation()

  const getCurrentPage = () => {
    const path = location.pathname
    return path === '/' ? 'index' : path.slice(1)
  }

  const currentPage = getCurrentPage()

  const getMenuItems = () => {
    const baseItems = []

    if (currentPage === 'join' || currentPage === 'blog' || currentPage === 'ai' || currentPage === 'post') {
      baseItems.push(
        { href: '/#join', text: 'Join' },
        { href: '/#about', text: 'About' },
        { href: '/#governance', text: 'Governance' },
        { href: '/blog', text: 'Learn' }
      )
    } else {
      baseItems.push(
        { href: '#join', text: 'Join' },
        { href: '#about', text: 'About' },
        { href: '#governance', text: 'Governance' },
        { href: '/blog', text: 'Learn' }
      )
    }

    return baseItems
  }

  const isActiveLink = (href) => {
    if (href.includes('#')) {
      const [page] = href.split('#')
      const pageName = page.replace('/', '') || 'index'
      return currentPage === pageName || (currentPage === 'index' && pageName === 'index')
    }

    const pageName = href.replace('/', '')
    return currentPage === pageName
  }

  const handleLinkClick = (href) => {
    setIsMobileMenuOpen(false)
    
    if (href.includes('#') && href.split('#')[0] === '' || href.split('#')[0] === location.pathname) {
      const target = document.querySelector(href.split('#')[1] ? `#${href.split('#')[1]}` : 'body')
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
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
              const activeClass = isActiveLink(item.href) ? 'text-green-700 font-semibold' : 'text-gray-700 hover:text-green-700'
              
              if (item.href.startsWith('#')) {
                return (
                  <a
                    key={index}
                    href={item.href}
                    className={`font-medium ${activeClass} transition-colors`}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(item.href)
                    }}
                  >
                    {item.text}
                  </a>
                )
              } else {
                return (
                  <Link
                    key={index}
                    to={item.href}
                    className={`font-medium ${activeClass} transition-colors`}
                  >
                    {item.text}
                  </Link>
                )
              }
            })}
            <button
              onClick={connect}
              className="font-medium text-gray-700 hover:text-green-700 transition-colors"
            >
              {isConnected ? 'Connected' : 'Connect Metamask'}
            </button>
            <p className="text-sm text-gray-600">
              {isConnected ? truncateAddress(currentAccount) : 'not connected'}
            </p>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              className="mobile-menu-button text-gray-700 p-2"
              onClick={toggleMobileMenu}
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? '' : 'hidden'} md:hidden bg-white border-t`}>
        <div className="px-4 py-2 space-y-3">
          {menuItems.map((item, index) => {
            const activeClass = isActiveLink(item.href) ? 'text-green-700 font-semibold' : 'text-gray-700 hover:text-green-700'
            
            if (item.href.startsWith('#')) {
              return (
                <a
                  key={index}
                  href={item.href}
                  className={`block py-2 ${activeClass}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(item.href)
                  }}
                >
                  {item.text}
                </a>
              )
            } else {
              return (
                <Link
                  key={index}
                  to={item.href}
                  className={`block py-2 ${activeClass}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.text}
                </Link>
              )
            }
          })}
          <button
            onClick={() => {
              connect()
              setIsMobileMenuOpen(false)
            }}
            className="block text-left py-2 text-gray-700 hover:text-green-700"
          >
            {isConnected ? 'Connected' : 'Connect Metamask'}
          </button>
          <p className="text-sm text-gray-600">
            {isConnected ? truncateAddress(currentAccount) : 'not connected'}
          </p>
        </div>
      </div>
    </nav>
  )
}

export default Navbar