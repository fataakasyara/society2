/**
 * Utility functions for creating and handling URL slugs
 */

/**
 * Convert text to URL-friendly slug
 * @param {string} text - Text to convert to slug
 * @returns {string} - URL-friendly slug
 */
export const createSlug = (text) => {
  if (!text) return ''
  
  return text
    .toLowerCase()
    .trim()
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove special characters except hyphens
    .replace(/[^\w\-]+/g, '')
    // Replace multiple hyphens with single hyphen
    .replace(/\-\-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

/**
 * Extract ID from slug (assumes format: title-slug-123)
 * @param {string} slug - URL slug
 * @returns {number|null} - Extracted ID or null if not found
 */
export const extractIdFromSlug = (slug) => {
  if (!slug) return null
  
  // Look for number at the end of slug after last hyphen
  const parts = slug.split('-')
  const lastPart = parts[parts.length - 1]
  const id = parseInt(lastPart)
  
  return isNaN(id) ? null : id
}

/**
 * Create full slug with ID (format: title-slug-123)
 * @param {string} title - Article title
 * @param {number} id - Article ID
 * @returns {string} - Full slug with ID
 */
export const createFullSlug = (title, id) => {
  const titleSlug = createSlug(title)
  return `${titleSlug}-${id}`
}

/**
 * Validate if slug matches expected format
 * @param {string} slug - URL slug to validate
 * @returns {boolean} - Whether slug is valid
 */
export const isValidSlug = (slug) => {
  if (!slug) return false
  
  // Check if slug ends with a number (ID)
  const id = extractIdFromSlug(slug)
  return id !== null && id > 0
}

/**
 * Generate meta title for SEO
 * @param {string} title - Article title
 * @param {string} siteName - Site name
 * @returns {string} - SEO-optimized title
 */
export const generateMetaTitle = (title, siteName = 'Nolyx Society') => {
  return `${title} | ${siteName}`
}

/**
 * Generate meta description for SEO
 * @param {string} excerpt - Article excerpt
 * @param {number} maxLength - Maximum length for description
 * @returns {string} - SEO-optimized description
 */
export const generateMetaDescription = (excerpt, maxLength = 160) => {
  if (!excerpt) return ''
  
  if (excerpt.length <= maxLength) return excerpt
  
  // Truncate at word boundary
  const truncated = excerpt.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  
  return lastSpace > 0 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...'
}