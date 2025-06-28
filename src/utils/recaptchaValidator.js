/**
 * reCAPTCHA Validation Utilities
 * Client-side validation helpers for reCAPTCHA integration
 */

import { RECAPTCHA_CONFIG } from '../config/recaptcha'

/**
 * Validates reCAPTCHA response on the client side
 * @param {string} token - reCAPTCHA response token
 * @returns {boolean} - Whether the token appears valid
 */
export const validateRecaptchaToken = (token) => {
  if (!token || typeof token !== 'string') {
    return false
  }

  // Basic token format validation
  // reCAPTCHA tokens are typically long base64-like strings
  if (token.length < 100) {
    return false
  }

  return true
}

/**
 * Checks if reCAPTCHA is properly loaded and ready
 * @returns {boolean} - Whether reCAPTCHA is ready to use
 */
export const isRecaptchaReady = () => {
  return !!(window.grecaptcha && window.grecaptcha.render && window.grecaptcha.getResponse)
}

/**
 * Gets the current reCAPTCHA response
 * @param {number} widgetId - Optional widget ID for multiple reCAPTCHAs
 * @returns {string} - reCAPTCHA response token
 */
export const getRecaptchaResponse = (widgetId = undefined) => {
  if (!isRecaptchaReady()) {
    console.warn('reCAPTCHA not ready')
    return ''
  }

  try {
    return window.grecaptcha.getResponse(widgetId) || ''
  } catch (error) {
    console.error('Error getting reCAPTCHA response:', error)
    return ''
  }
}

/**
 * Resets the reCAPTCHA widget
 * @param {number} widgetId - Optional widget ID for multiple reCAPTCHAs
 */
export const resetRecaptcha = (widgetId = undefined) => {
  if (!isRecaptchaReady()) {
    console.warn('reCAPTCHA not ready for reset')
    return
  }

  try {
    window.grecaptcha.reset(widgetId)
  } catch (error) {
    console.error('Error resetting reCAPTCHA:', error)
  }
}

/**
 * Validates the current environment for reCAPTCHA usage
 * @returns {object} - Validation result with status and messages
 */
export const validateEnvironment = () => {
  const result = {
    isValid: true,
    warnings: [],
    errors: []
  }

  // Check if site key is configured
  const siteKey = RECAPTCHA_CONFIG.getSiteKey()
  if (!siteKey) {
    result.isValid = false
    result.errors.push('No reCAPTCHA site key configured')
  } else if (siteKey === '6LdGRm8rAAAAAJMzE_ezbOw3Cxan67FHmkY9atJG') {
    result.warnings.push('Using default/example site key - should be replaced in production')
  }

  // Check if we're on HTTPS in production
  if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
    result.warnings.push('reCAPTCHA works best over HTTPS')
  }

  // Check if domain is likely registered with reCAPTCHA
  const hostname = window.location.hostname
  if (hostname !== 'localhost' && hostname !== '127.0.0.1' && !hostname.includes('nolyx')) {
    result.warnings.push('Domain may not be registered with reCAPTCHA service')
  }

  return result
}

/**
 * Logs reCAPTCHA configuration and environment info
 */
export const logRecaptchaInfo = () => {
  const validation = validateEnvironment()
  
  console.group('🔒 reCAPTCHA Configuration')
  console.log('Site Key:', RECAPTCHA_CONFIG.getSiteKey().substring(0, 20) + '...')
  console.log('Environment:', window.location.hostname)
  console.log('Protocol:', window.location.protocol)
  console.log('reCAPTCHA Ready:', isRecaptchaReady())
  
  if (validation.warnings.length > 0) {
    console.warn('Warnings:', validation.warnings)
  }
  
  if (validation.errors.length > 0) {
    console.error('Errors:', validation.errors)
  }
  
  console.groupEnd()
}

/**
 * Test function to verify reCAPTCHA integration
 * @returns {Promise<boolean>} - Whether the test passed
 */
export const testRecaptchaIntegration = async () => {
  console.log('🧪 Testing reCAPTCHA integration...')
  
  try {
    // Check environment
    const envValidation = validateEnvironment()
    if (!envValidation.isValid) {
      console.error('❌ Environment validation failed:', envValidation.errors)
      return false
    }

    // Check if reCAPTCHA script is loaded
    if (!window.grecaptcha) {
      console.error('❌ reCAPTCHA script not loaded')
      return false
    }

    // Wait for reCAPTCHA to be ready
    await new Promise((resolve) => {
      if (window.grecaptcha.ready) {
        window.grecaptcha.ready(resolve)
      } else {
        resolve()
      }
    })

    console.log('✅ reCAPTCHA integration test passed')
    return true
  } catch (error) {
    console.error('❌ reCAPTCHA integration test failed:', error)
    return false
  }
}