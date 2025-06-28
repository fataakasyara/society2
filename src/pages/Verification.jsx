import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../contexts/SessionContext'

const Verification = () => {
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { createSession } = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    // Load reCAPTCHA
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        console.log('reCAPTCHA is ready')
      })
    }

    // Make enableSubmit function globally available
    window.enableSubmit = () => {
      setIsSubmitEnabled(true)
    }

    return () => {
      delete window.enableSubmit
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!window.grecaptcha) {
      alert('reCAPTCHA not loaded. Please refresh the page.')
      return
    }

    const response = window.grecaptcha.getResponse()
    if (response.length === 0) {
      alert('Please complete the reCAPTCHA verification')
      return
    }

    setIsSubmitting(true)

    // Create verification session
    createSession()

    // Show success message briefly before redirect
    setTimeout(() => {
      navigate('/join')
    }, 1000)
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
      <style>{`
        body::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            rgba(46, 125, 50, 0.01) 2px,
            rgba(46, 125, 50, 0.01) 4px
          );
          pointer-events: none;
        }
      `}</style>

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
          <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', fill: '#2e7d32', filter: 'drop-shadow(0 1px 1px rgba(46, 125, 50, 0.2))' }}>
            <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11C15.4,11 16,11.4 16,12V16C16,16.6 15.6,17 15,17H9C8.4,17 8,16.6 8,16V12C8,11.4 8.4,11 9,11V10C9,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.2,9.2 10.2,10V11H13.8V10C13.8,9.2 12.8,8.2 12,8.2Z"/>
          </svg>
        </div>
        
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
        
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '30px'
        }}>
          <div 
            className="g-recaptcha" 
            data-sitekey="6LdGRm8rAAAAAJMzE_ezbOw3Cxan67FHmkY9atJG" 
            data-callback="enableSubmit"
            style={{
              margin: '5px 0',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
            }}
          />
          
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
              boxShadow: isSubmitEnabled && !isSubmitting
                ? '0 2px 4px rgba(46, 125, 50, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                : '0 1px 2px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              textTransform: 'none',
              letterSpacing: '0.025em',
              position: 'relative',
              overflow: 'hidden',
              opacity: isSubmitEnabled && !isSubmitting ? '1' : '0.6'
            }}
          />

          <p style={{
            color: '#424242',
            fontSize: '13px',
            marginTop: '20px',
            opacity: '0.8',
            fontWeight: '400',
            lineHeight: '1.4'
          }}>
            This security check helps protect our website from automated attacks
          </p>
        </form>
      </div>
    </div>
  )
}

export default Verification