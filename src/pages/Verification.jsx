import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../contexts/SessionContext'
import { RECAPTCHA_CONFIG, validateRecaptchaConfig, loadRecaptchaScript } from '../config/recaptcha'

const Verification = () => {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
  const [error, setError] = useState('')
  const recaptchaRef = useRef(null)
  const recaptchaWidgetId = useRef(null)
  const { createSession } = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    initializeRecaptcha()
    
    // Cleanup function to reset reCAPTCHA when component unmounts
    return () => {
      if (window.grecaptcha && recaptchaWidgetId.current !== null) {
        try {
          window.grecaptcha.reset(recaptchaWidgetId.current)
        } catch (error) {
          console.log('reCAPTCHA cleanup error (expected on unmount):', error)
        }
      }
    }
  }, [])

  const initializeRecaptcha = async () => {
    try {
      // Validate configuration
      if (!validateRecaptchaConfig()) {
        setError('reCAPTCHA configuration error. Please check the setup.')
        return
      }

      // Load reCAPTCHA script
      await loadRecaptchaScript()
      
      // Only render if not already rendered and element exists
      if (window.grecaptcha && recaptchaRef.current && recaptchaWidgetId.current === null) {
        recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: RECAPTCHA_CONFIG.getSiteKey(),
          callback: handleRecaptchaVerify,
          'expired-callback': handleRecaptchaExpire,
          'error-callback': handleRecaptchaError,
          theme: RECAPTCHA_CONFIG.THEME,
          size: RECAPTCHA_CONFIG.SIZE
        })
        
        setRecaptchaLoaded(true)
        console.log('✅ reCAPTCHA loaded successfully with widget ID:', recaptchaWidgetId.current)
      }
    } catch (error) {
      console.error('❌ Failed to initialize reCAPTCHA:', error)
      setError('Failed to load reCAPTCHA. Please refresh the page.')
    }
  }

  const handleRecaptchaVerify = (token) => {
    console.log('✅ reCAPTCHA verified:', token.substring(0, 20) + '...')
    setIsSubmitEnabled(true)
    setError('')
  }

  const handleRecaptchaExpire = () => {
    console.log('⚠️ reCAPTCHA expired')
    setIsSubmitEnabled(false)
    setError('reCAPTCHA expired. Please verify again.')
  }

  const handleRecaptchaError = (error) => {
    console.error('❌ reCAPTCHA error:', error)
    setIsSubmitEnabled(false)
    
    // Provide more specific error message based on common issues
    const currentDomain = window.location.hostname + (window.location.port ? ':' + window.location.port : '')
    setError(`reCAPTCHA domain error. Please ensure '${currentDomain}' is added to your reCAPTCHA site key domains in Google admin console. Check the setup guide for details.`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!window.grecaptcha || recaptchaWidgetId.current === null) {
      setError('reCAPTCHA not loaded. Please refresh the page.')
      return
    }

    const response = window.grecaptcha.getResponse(recaptchaWidgetId.current)
    if (!response || response.length === 0) {
      setError('Please complete the reCAPTCHA verification')
      return
    }

    setIsSubmitting(true)
    setError('')

    // Create verification session
    try {
      createSession()
      console.log('✅ Verification session created')
      
      // Show success message briefly before redirect
      setTimeout(() => {
        navigate('/join')
      }, 1000)
    } catch (error) {
      console.error('❌ Failed to create session:', error)
      setError('Failed to create verification session. Please try again.')
      setIsSubmitting(false)
    }
  }

  const resetRecaptcha = () => {
    if (window.grecaptcha && recaptchaWidgetId.current !== null) {
      try {
        window.grecaptcha.reset(recaptchaWidgetId.current)
        setIsSubmitEnabled(false)
        setError('')
        console.log('🔄 reCAPTCHA reset')
      } catch (error) {
        console.error('❌ Failed to reset reCAPTCHA:', error)
      }
    }
  }

  return (
    <div style={{
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      background: `
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(34, 139, 34, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(46, 125, 50, 0.05) 0%, transparent 50%),
        linear-gradient(135deg, #f8f9fa 0%, #e8f5e8 100%)
      `,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative'
    }}>
      <div style={{
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
        padding: '50px 40px',
        borderRadius: '8px',
        boxShadow: `
          0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `,
        textAlign: 'center',
        maxWidth: '420px',
        width: '100%',
        border: '1px solid rgba(46, 125, 50, 0.1)',
        position: 'relative',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Header decoration */}
        <div style={{
          content: '',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #2e7d32, #4caf50, #66bb6a, #4caf50, #2e7d32)',
          borderRadius: '8px 8px 0 0'
        }}></div>

        {/* Security badge */}
        <div style={{
          width: '48px',
          height: '48px',
          background: 'linear-gradient(145deg, #e8f5e8, #f1f8e9)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 25px',
          boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.3)
          `,
          border: '1px solid rgba(46, 125, 50, 0.1)'
        }}>
          <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', fill: '#2e7d32' }}>
            <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11C15.4,11 16,11.4 16,12V16C16,16.6 15.6,17 15,17H9C8.4,17 8,16.6 8,16V12C8,11.4 8.4,11 9,11V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,9.2 10.2,10V11H13.8V10C13.8,9.2 12.8,8.2 12,8.2Z"/>
          </svg>
        </div>
        
        {/* Step indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '20px',
          color: '#558b2f',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: 'linear-gradient(145deg, #c8e6c9, #a5d6a7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: '600',
            color: '#1b5e20',
            boxShadow: 'inset 0 1px 2px rgba(27, 94, 32, 0.1)'
          }}>
            1
          </div>
          <span>Security Verification</span>
        </div>
        
        <h2 style={{
          color: '#1b5e20',
          marginBottom: '35px',
          fontSize: '22px',
          fontWeight: '600',
          letterSpacing: '-0.025em',
          textShadow: '0 1px 2px rgba(27, 94, 32, 0.1)'
        }}>
          Verify you're human
        </h2>

        {/* Error message */}
        {error && (
          <div style={{
            background: '#f8d7da',
            color: '#721c24',
            padding: '12px',
            borderRadius: '5px',
            marginBottom: '20px',
            fontSize: '13px',
            border: '1px solid #f5c6cb',
            lineHeight: '1.4'
          }}>
            {error}
          </div>
        )}

        {/* Configuration warning */}
        {!validateRecaptchaConfig() && (
          <div style={{
            background: '#fff3cd',
            color: '#856404',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '20px',
            fontSize: '12px',
            border: '1px solid #ffeaa7'
          }}>
            ⚠️ Using default reCAPTCHA key. Please update with your own site key.
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px'
        }}>
          {/* reCAPTCHA container */}
          <div style={{ minHeight: '78px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {!recaptchaLoaded && !error && (
              <div style={{ color: '#666', fontSize: '14px' }}>
                Loading reCAPTCHA...
              </div>
            )}
            <div ref={recaptchaRef} />
          </div>
          
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input 
              type="submit" 
              value={isSubmitting ? 'Verified! Redirecting...' : 'Continue'}
              disabled={!isSubmitEnabled || isSubmitting}
              style={{
                background: isSubmitEnabled && !isSubmitting 
                  ? 'linear-gradient(145deg, #2e7d32, #388e3c)' 
                  : 'linear-gradient(145deg, #bdbdbd, #9e9e9e)',
                color: 'white',
                border: 'none',
                padding: '14px 32px',
                borderRadius: '6px',
                cursor: isSubmitEnabled && !isSubmitting ? 'pointer' : 'not-allowed',
                fontSize: '15px',
                fontWeight: '500',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                textTransform: 'none',
                letterSpacing: '0.025em',
                opacity: isSubmitEnabled && !isSubmitting ? '1' : '0.6'
              }}
            />
            
            {recaptchaLoaded && (
              <button 
                type="button"
                onClick={resetRecaptcha}
                style={{
                  background: 'linear-gradient(145deg, #757575, #616161)',
                  color: 'white',
                  border: 'none',
                  padding: '14px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: '500',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                Reset
              </button>
            )}
          </div>

          <p style={{
            color: '#424242',
            fontSize: '13px',
            opacity: '0.8',
            fontWeight: '400',
            lineHeight: '1.4'
          }}>
            This security check helps protect our website from automated attacks
          </p>
        </form>

        {/* Debug info (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div style={{
            marginTop: '20px',
            padding: '10px',
            background: '#f0f0f0',
            borderRadius: '5px',
            fontSize: '12px',
            color: '#666'
          }}>
            <strong>Debug Info:</strong><br />
            Site Key: {RECAPTCHA_CONFIG.getSiteKey().substring(0, 20)}...<br />
            Environment: {window.location.hostname}:{window.location.port}<br />
            reCAPTCHA Loaded: {recaptchaLoaded ? '✅' : '❌'}<br />
            Widget ID: {recaptchaWidgetId.current}
          </div>
        )}
      </div>
    </div>
  )
}

export default Verification