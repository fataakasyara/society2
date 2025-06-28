import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AIButton from '../components/AIButton'
import AnimationObserver from '../components/AnimationObserver'
import { useSession } from '../contexts/SessionContext'

const Join = () => {
  const [showComingSoonModal, setShowComingSoonModal] = useState(false)
  const [platformName, setPlatformName] = useState('')
  const { requireVerification, getSessionInfo, isSessionExpiringSoon } = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    // Check verification session on page load
    const checkSession = () => {
      if (!requireVerification()) {
        navigate('/verif')
        return false
      }
      return true
    }

    checkSession()

    // Show session info if available
    const sessionInfo = getSessionInfo()
    if (sessionInfo) {
      console.log(`Session expires in: ${sessionInfo.hoursLeft}h ${sessionInfo.minutesLeft}m`)

      // Show warning if session is expiring soon
      if (isSessionExpiringSoon()) {
        console.warn('Session will expire soon!')
      }
    }
  }, [requireVerification, getSessionInfo, isSessionExpiringSoon, navigate])

  const showComingSoon = (platform) => {
    setPlatformName(platform)
    setShowComingSoonModal(true)
  }

  const closeComingSoon = () => {
    setShowComingSoonModal(false)
  }

  return (
    <div className="bg-gradient-to-r from-green-400 to-green-600 bg-size-200 bg-pos-0 animation" style={{
      backgroundSize: '200% 200%',
      backgroundPosition: '0% 0%',
      animation: 'gradient 2s ease infinite'
    }}>
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 0%; }
          100% { background-position: 0% 0%; }
        }
      `}</style>
      
      <Navbar />
      <AnimationObserver />

      {/* Platform Selection */}
      <section className="py-20 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Platform Cards */}
          <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-center">
            {/* WhatsApp Card */}
            <div className="animate-card bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-8 text-center">
                <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fab fa-whatsapp text-4xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">WhatsApp</h3>
                <p className="text-green-100">Instant messaging & Fast Information</p>
              </div>
              <div className="p-8">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600">
                    <i className="fas fa-check text-green-500 mr-3"></i>
                    Real-time discussions
                  </li>
                  <li className="flex items-center text-gray-600">
                    <i className="fas fa-check text-green-500 mr-3"></i>
                    Mobile-first experience
                  </li>
                </ul>
                <a 
                  href="https://chat.whatsapp.com/COlHSaFaFUiCBegugNfufA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group"
                >
                  <i className="fab fa-whatsapp mr-2 text-xl"></i>
                  Join WhatsApp Group
                  <i className="fas fa-external-link-alt ml-2 text-sm group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>

            {/* Telegram Card */}
            <div className="animate-card bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-center">
                <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fab fa-telegram text-4xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Telegram</h3>
                <p className="text-blue-100">Advanced features & bots</p>
              </div>
              <div className="p-8">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600">
                    <i className="fas fa-check text-blue-500 mr-3"></i>
                    Bot integrations
                  </li>
                  <li className="flex items-center text-gray-600">
                    <i className="fas fa-check text-blue-500 mr-3"></i>
                    Large file support
                  </li>
                </ul>
                <button 
                  onClick={() => showComingSoon('Telegram')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group"
                >
                  <i className="fab fa-telegram mr-2 text-xl"></i>
                  Join Telegram Group
                  <i className="fas fa-clock ml-2 text-sm"></i>
                </button>
              </div>
            </div>

            {/* Discord Card */}
            <div className="animate-card bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-center">
                <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fab fa-discord text-4xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Discord</h3>
                <p className="text-indigo-100">Voice channels & communities</p>
              </div>
              <div className="p-8">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600">
                    <i className="fas fa-check text-indigo-500 mr-3"></i>
                    Voice & video calls
                  </li>
                  <li className="flex items-center text-gray-600">
                    <i className="fas fa-check text-indigo-500 mr-3"></i>
                    Screen sharing
                  </li>
                </ul>
                <button 
                  onClick={() => showComingSoon('Discord')}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center group"
                >
                  <i className="fab fa-discord mr-2 text-xl"></i>
                  Join Discord Server
                  <i className="fas fa-clock ml-2 text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Modal */}
      {showComingSoonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
            <div className="text-center">
              <i className="fas fa-clock text-4xl text-yellow-500 mb-4"></i>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon!</h3>
              <p className="text-gray-600 mb-6">
                The {platformName} community will be available soon. 
                For now, join us on WhatsApp to stay connected!
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={closeComingSoon}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  Close
                </button>
                <a 
                  href="https://chat.whatsapp.com/COlHSaFaFUiCBegugNfufA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-colors text-center"
                >
                  Join WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <AIButton hideOnPages={['ai']} />
    </div>
  )
}

export default Join