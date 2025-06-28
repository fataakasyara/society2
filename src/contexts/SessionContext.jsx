import React, { createContext, useContext, useState, useEffect } from 'react'

const SessionContext = createContext()

export const useSession = () => {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}

export const SessionProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState(null)
  const sessionKey = 'nolyxVerificationSession'
  const tempSessionKey = 'nolyxVerified'
  const sessionDuration = 24 * 60 * 60 * 1000 // 24 hours

  // Create a new verification session
  const createSession = () => {
    const newSessionData = {
      verified: true,
      timestamp: Date.now(),
      expires: Date.now() + sessionDuration,
      userAgent: navigator.userAgent,
      ip: null
    }

    localStorage.setItem(sessionKey, JSON.stringify(newSessionData))
    sessionStorage.setItem(tempSessionKey, 'true')
    setSessionData(newSessionData)
    
    console.log('Verification session created:', newSessionData)
    return newSessionData
  }

  // Check if current session is valid
  const isSessionValid = () => {
    try {
      const tempSession = sessionStorage.getItem(tempSessionKey)
      const storedSessionData = localStorage.getItem(sessionKey)
      
      if (storedSessionData) {
        const session = JSON.parse(storedSessionData)
        const currentTime = Date.now()
        
        if (session.verified && session.expires > currentTime) {
          if (!tempSession) {
            sessionStorage.setItem(tempSessionKey, 'true')
          }
          setSessionData(session)
          return true
        } else {
          clearSession()
          return false
        }
      }
      
      return false
    } catch (error) {
      console.error('Error checking session validity:', error)
      clearSession()
      return false
    }
  }

  // Get session information
  const getSessionInfo = () => {
    try {
      const storedSessionData = localStorage.getItem(sessionKey)
      if (storedSessionData) {
        const session = JSON.parse(storedSessionData)
        const currentTime = Date.now()
        const timeLeft = session.expires - currentTime
        
        return {
          ...session,
          timeLeft: timeLeft,
          hoursLeft: Math.floor(timeLeft / (1000 * 60 * 60)),
          minutesLeft: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
          isValid: timeLeft > 0
        }
      }
      return null
    } catch (error) {
      console.error('Error getting session info:', error)
      return null
    }
  }

  // Clear verification session
  const clearSession = () => {
    localStorage.removeItem(sessionKey)
    sessionStorage.removeItem(tempSessionKey)
    setSessionData(null)
    console.log('Verification session cleared')
  }

  // Redirect to verification page if session is invalid
  const requireVerification = (redirectUrl = '/verif') => {
    if (!isSessionValid()) {
      console.log('No valid verification session found, redirecting to verification page')
      window.location.href = redirectUrl
      return false
    }
    return true
  }

  // Extend session expiry time
  const extendSession = (additionalHours = 24) => {
    try {
      const storedSessionData = localStorage.getItem(sessionKey)
      if (storedSessionData) {
        const session = JSON.parse(storedSessionData)
        session.expires = Date.now() + (additionalHours * 60 * 60 * 1000)
        localStorage.setItem(sessionKey, JSON.stringify(session))
        setSessionData(session)
        console.log(`Session extended by ${additionalHours} hours`)
        return true
      }
      return false
    } catch (error) {
      console.error('Error extending session:', error)
      return false
    }
  }

  // Check if session will expire soon (within 1 hour)
  const isSessionExpiringSoon = () => {
    const sessionInfo = getSessionInfo()
    if (sessionInfo) {
      return sessionInfo.timeLeft < (60 * 60 * 1000)
    }
    return false
  }

  // Initialize session on mount
  useEffect(() => {
    isSessionValid()
  }, [])

  // Setup session monitoring
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        isSessionValid()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    const interval = setInterval(() => {
      if (!isSessionValid()) {
        // Session expired, could trigger redirect here if needed
      }
    }, 5 * 60 * 1000) // Check every 5 minutes

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearInterval(interval)
    }
  }, [])

  const value = {
    sessionData,
    createSession,
    isSessionValid,
    getSessionInfo,
    clearSession,
    requireVerification,
    extendSession,
    isSessionExpiringSoon
  }

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  )
}