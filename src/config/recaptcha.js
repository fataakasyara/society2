// reCAPTCHA Configuration
// Replace this with your actual site key from Google reCAPTCHA admin console

export const RECAPTCHA_CONFIG = {
  // IMPORTANT: Replace this with your new site key
  SITE_KEY: '6LfhynArAAAAAJkto7sf9CExHObip1UPOUKkdgKp', // Updated with new key
  
  // Development site key (for localhost testing)
  // You can use the same key or create a separate one for development
  DEV_SITE_KEY: '6LfhynArAAAAAJkto7sf9CExHObip1UPOUKkdgKp', // Updated with new key
  
  // Configuration options
  THEME: 'light', // 'light' or 'dark'
  SIZE: 'normal', // 'normal' or 'compact'
  
  // Get the appropriate site key based on environment
  getSiteKey: () => {
    // Check if we're in development
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1' ||
                         window.location.hostname.includes('localhost')
    
    return isDevelopment ? RECAPTCHA_CONFIG.DEV_SITE_KEY : RECAPTCHA_CONFIG.SITE_KEY
  }
}

// Validation function to check if site key is configured
export const validateRecaptchaConfig = () => {
  const siteKey = RECAPTCHA_CONFIG.getSiteKey()
  
  if (!siteKey || siteKey === '6LdGRm8rAAAAAJMzE_ezbOw3Cxan67FHmkY9atJG') {
    console.warn('⚠️ Default reCAPTCHA site key detected. Please update with your own site key.')
    return false
  }
  
  return true
}

// Helper function to load reCAPTCHA script with explicit rendering
export const loadRecaptchaScript = () => {
  return new Promise((resolve, reject) => {
    if (window.grecaptcha) {
      resolve(window.grecaptcha)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'
    script.async = true
    script.defer = true
    
    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          resolve(window.grecaptcha)
        })
      } else {
        reject(new Error('reCAPTCHA failed to load'))
      }
    }
    
    script.onerror = () => {
      reject(new Error('Failed to load reCAPTCHA script'))
    }
    
    document.head.appendChild(script)
  })
}