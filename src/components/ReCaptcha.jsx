import React, { useEffect, useRef } from 'react'

const ReCaptcha = ({ 
  siteKey, 
  onVerify, 
  onExpire, 
  onError,
  theme = 'light',
  size = 'normal'
}) => {
  const recaptchaRef = useRef(null)
  const widgetId = useRef(null)

  useEffect(() => {
    // Load reCAPTCHA script if not already loaded
    if (!window.grecaptcha) {
      const script = document.createElement('script')
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.onload = initializeRecaptcha
      document.head.appendChild(script)
    } else {
      initializeRecaptcha()
    }

    return () => {
      // Cleanup
      if (widgetId.current !== null && window.grecaptcha) {
        try {
          window.grecaptcha.reset(widgetId.current)
        } catch (error) {
          console.warn('Error resetting reCAPTCHA:', error)
        }
      }
    }
  }, [siteKey])

  const initializeRecaptcha = () => {
    if (window.grecaptcha && window.grecaptcha.render && recaptchaRef.current) {
      try {
        widgetId.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          callback: onVerify,
          'expired-callback': onExpire,
          'error-callback': onError,
          theme: theme,
          size: size
        })
      } catch (error) {
        console.error('Error rendering reCAPTCHA:', error)
        if (onError) onError(error)
      }
    }
  }

  const reset = () => {
    if (widgetId.current !== null && window.grecaptcha) {
      try {
        window.grecaptcha.reset(widgetId.current)
      } catch (error) {
        console.warn('Error resetting reCAPTCHA:', error)
      }
    }
  }

  const getResponse = () => {
    if (widgetId.current !== null && window.grecaptcha) {
      try {
        return window.grecaptcha.getResponse(widgetId.current)
      } catch (error) {
        console.warn('Error getting reCAPTCHA response:', error)
        return ''
      }
    }
    return ''
  }

  // Expose methods to parent component
  React.useImperativeHandle(recaptchaRef, () => ({
    reset,
    getResponse
  }))

  return (
    <div 
      ref={recaptchaRef}
      style={{
        margin: '5px 0',
        filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
      }}
    />
  )
}

export default ReCaptcha