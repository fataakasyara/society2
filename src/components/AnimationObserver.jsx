import { useEffect } from 'react'

const AnimationObserver = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const section = entry.target

          // Animate titles first
          const titles = section.querySelectorAll('.animate-title, .governance-title')
          titles.forEach((title, index) => {
            setTimeout(() => {
              title.classList.add('animate')
            }, index * 100)
          })

          // Animate hero elements
          const heroElements = section.querySelectorAll('.animate-hero')
          heroElements.forEach((element, index) => {
            setTimeout(() => {
              element.classList.add('animate')
            }, index * 200 + 300)
          })

          // Animate buttons
          const buttons = section.querySelectorAll('.animate-button')
          buttons.forEach((button, index) => {
            setTimeout(() => {
              button.classList.add('animate')
            }, index * 150 + 600)
          })

          // Animate content blocks
          const contentBlocks = section.querySelectorAll('.animate-content')
          contentBlocks.forEach((content, index) => {
            setTimeout(() => {
              content.classList.add('animate')
            }, index * 200 + 200)
          })

          // Animate cards with sequential delay
          const cards = section.querySelectorAll('.animate-card, .governance-card')
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('animate')
            }, index * 200 + 400)
          })

          // Animate other elements
          const elements = section.querySelectorAll('.animate-element')
          elements.forEach((element, index) => {
            setTimeout(() => {
              element.classList.add('animate')
            }, index * 150 + 300)
          })

          // Stop observing once animated
          sectionObserver.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observe all main sections
    const sections = document.querySelectorAll('section')
    sections.forEach(section => {
      if (section) {
        sectionObserver.observe(section)
      }
    })

    // Fallback for browsers that don't support Intersection Observer
    if (!window.IntersectionObserver) {
      const allAnimateElements = document.querySelectorAll(
        '.animate-title, .animate-hero, .animate-button, .animate-content, .animate-card, .animate-element, .governance-title, .governance-card'
      )

      allAnimateElements.forEach(element => {
        element.classList.add('animate')
      })
    }

    return () => {
      sections.forEach(section => {
        if (section) {
          sectionObserver.unobserve(section)
        }
      })
    }
  }, [])

  return null
}

export default AnimationObserver