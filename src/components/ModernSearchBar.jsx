import React, { useState, useRef, useEffect } from 'react'

const ModernSearchBar = ({ 
  onSearch, 
  placeholder = "Search articles, topics, or keywords...",
  suggestions = [],
  showVoiceSearch = true
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const searchInputRef = useRef(null)
  const suggestionsRef = useRef(null)

  // Voice search support
  const [speechRecognition, setSpeechRecognition] = useState(null)

  useEffect(() => {
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = 'en-US'
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setSearchValue(transcript)
        onSearch(transcript)
        setIsListening(false)
      }
      
      recognition.onerror = () => {
        setIsListening(false)
      }
      
      recognition.onend = () => {
        setIsListening(false)
      }
      
      setSpeechRecognition(recognition)
    }
  }, [onSearch])

  // Filter suggestions based on search value
  useEffect(() => {
    if (searchValue && suggestions.length > 0) {
      const filtered = suggestions
        .filter(suggestion => 
          suggestion.toLowerCase().includes(searchValue.toLowerCase())
        )
        .slice(0, 6)
      setFilteredSuggestions(filtered)
      setShowSuggestions(filtered.length > 0 && isFocused)
    } else {
      setShowSuggestions(false)
    }
  }, [searchValue, suggestions, isFocused])

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchValue(value)
    onSearch(value)
  }

  const handleInputFocus = () => {
    setIsFocused(true)
    if (searchValue && filteredSuggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  const handleInputBlur = () => {
    // Delay to allow suggestion clicks
    setTimeout(() => {
      setIsFocused(false)
      setShowSuggestions(false)
    }, 200)
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion)
    onSearch(suggestion)
    setShowSuggestions(false)
    searchInputRef.current?.focus()
  }

  const handleVoiceSearch = () => {
    if (speechRecognition && !isListening) {
      setIsListening(true)
      speechRecognition.start()
    }
  }

  const handleClearSearch = () => {
    setSearchValue('')
    onSearch('')
    searchInputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false)
      searchInputRef.current?.blur()
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      onSearch(searchValue)
      setShowSuggestions(false)
    }
  }

  return (
    <div className="modern-search-container">
      {/* Main Search Bar */}
      <div className={`search-bar-wrapper ${isFocused ? 'focused' : ''}`}>
        <div className="search-input-container">
          {/* Search Icon */}
          <div className="search-icon">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>

          {/* Search Input */}
          <input
            ref={searchInputRef}
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="search-input"
            aria-label="Search articles"
            autoComplete="off"
            spellCheck="false"
          />

          {/* Action Buttons */}
          <div className="search-actions">
            {/* Clear Button */}
            {searchValue && (
              <button
                onClick={handleClearSearch}
                className="action-button clear-button"
                aria-label="Clear search"
                type="button"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}

            {/* Voice Search Button */}
            {showVoiceSearch && speechRecognition && (
              <button
                onClick={handleVoiceSearch}
                className={`action-button voice-button ${isListening ? 'listening' : ''}`}
                aria-label="Voice search"
                type="button"
                disabled={isListening}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                  <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
              </button>
            )}

            {/* Search Button */}
            <button
              onClick={() => onSearch(searchValue)}
              className="action-button search-button"
              aria-label="Search"
              type="submit"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && (
          <div ref={suggestionsRef} className="suggestions-dropdown">
            <div className="suggestions-header">
              <span className="suggestions-title">Popular Searches</span>
            </div>
            <div className="suggestions-list">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="suggestion-item"
                  type="button"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Voice Search Indicator */}
      {isListening && (
        <div className="voice-indicator">
          <div className="voice-animation">
            <div className="voice-wave"></div>
            <div className="voice-wave"></div>
            <div className="voice-wave"></div>
          </div>
          <span>Listening...</span>
        </div>
      )}
    </div>
  )
}

export default ModernSearchBar