import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const AI = () => {
  useEffect(() => {
    // Script to hide the footer in the iframe after it loads
    const hideIframeFooter = () => {
      setTimeout(() => {
        const iframe = document.querySelector('.chatbot-container iframe')
        
        if (iframe) {
          try {
            // Try to access the iframe content
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
            
            if (iframeDoc) {
              // Create a style element
              const style = document.createElement('style')
              style.textContent = `
                footer, .footer, [class*="footer"], [id*="footer"],
                .powered-by, .chatbase-footer, .chat-footer, .copyright,
                [class*="powered"], [class*="branding"], .branding, 
                .attribution, .credits,
                footer.flex.min-h-10.w-full.max-w-full.shrink-0.items-center.justify-center.gap-2.overflow-hidden.text-nowrap.bg-primary-foreground.px-4.py-2.text-muted-foreground.text-xs,
                [data-sentry-component="ChatbotChatbaseBranding"],
                [data-sentry-component="Separator"] {
                  display: none !important;
                  visibility: hidden !important;
                  opacity: 0 !important;
                  height: 0 !important;
                  padding: 0 !important;
                  margin: 0 !important;
                  overflow: hidden !important;
                  pointer-events: none !important;
                }
              `
              
              // Append the style to the iframe head
              iframeDoc.head.appendChild(style)
              
              console.log("Footer hiding style injected")
            }
          } catch (e) {
            // If we can't access the iframe directly due to same-origin policy
            console.log("Could not access iframe content due to same-origin policy.")
          }
        }
      }, 1000)
    }

    // Call the function when component mounts
    hideIframeFooter()

    // Set up interval to continuously try hiding footer
    const interval = setInterval(hideIframeFooter, 5000)

    // Cleanup interval on unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <style>{`
        /* Reset and base styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          background-color: #f9fafb;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        /* Main container for both iframe and button */
        .page-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: relative;
          overflow: hidden;
        }
        
        /* Chatbot container */
        .chatbot-container {
          flex: 1;
          width: 100%;
          height: calc(100vh - 80px);
          position: relative;
          z-index: 1;
        }
        
        .chatbot-container iframe {
          width: 100%;
          height: 100%;
          border: none;
          background-color: #ffffff;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          /* Alternative approach - hide footer by cropping */
          margin-bottom: -50px;
          height: calc(100% + 50px);
          overflow: hidden;
        }
        
        /* Button container - separate from iframe */
        .button-container {
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f9fafb;
          padding: 10px 0;
          position: relative;
          z-index: 2;
          box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
        }
        
        .back-button {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          text-decoration: none;
          border: none;
          border-radius: 50px;
          padding: 16px 36px;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          width: 300px;
          position: relative;
          overflow: hidden;
        }
        
        /* Pulsing effect */
        .back-button::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          transform: scale(0);
          opacity: 0;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
          }
        }
        
        .back-button:hover {
          background: linear-gradient(135deg, #059669, #047857);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
        }
        
        .back-button:active {
          transform: translateY(1px) scale(0.98);
        }
        
        /* Icon with animation */
        .back-button .icon {
          margin-right: 12px;
          transition: transform 0.3s ease;
          display: flex;
        }
        
        .back-button:hover .icon {
          transform: translateX(-5px);
        }
        
        /* Floating particles for a more dynamic feel */
        .particles {
          position: absolute;
          width: 100%;
          height: 80px;
          bottom: 0;
          left: 0;
          overflow: hidden;
          pointer-events: none;
        }
        
        .particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(16, 185, 129, 0.2);
          border-radius: 50%;
          animation: float 15s infinite linear;
        }
        
        .particle:nth-child(1) {
          left: 10%;
          top: 20%;
          animation-duration: 12s;
          animation-delay: 0s;
        }
        
        .particle:nth-child(2) {
          left: 30%;
          top: 50%;
          animation-duration: 18s;
          animation-delay: 1s;
        }
        
        .particle:nth-child(3) {
          left: 50%;
          top: 30%;
          animation-duration: 15s;
          animation-delay: 2s;
        }
        
        .particle:nth-child(4) {
          left: 70%;
          top: 60%;
          animation-duration: 20s;
          animation-delay: 3s;
        }
        
        .particle:nth-child(5) {
          left: 90%;
          top: 40%;
          animation-duration: 13s;
          animation-delay: 4s;
        }
        
        @keyframes float {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 0.8;
          }
          25% {
            transform: translate(-20px, -15px) rotate(45deg) scale(1.2);
            opacity: 0.6;
          }
          50% {
            transform: translate(10px, -30px) rotate(90deg) scale(1);
            opacity: 0.4;
          }
          75% {
            transform: translate(30px, -15px) rotate(135deg) scale(0.8);
            opacity: 0.6;
          }
          100% {
            transform: translate(0, 0) rotate(180deg) scale(1);
            opacity: 0.8;
          }
        }
        
        /* Media queries for responsive design */
        @media (max-width: 768px) {
          .chatbot-container {
            height: calc(100vh - 70px);
          }
          
          .button-container {
            height: 70px;
          }
          
          .back-button {
            padding: 14px 28px;
            font-size: 15px;
            width: 240px;
          }
        }
        
        @media (max-width: 480px) {
          .chatbot-container {
            height: calc(100vh - 60px);
          }
          
          .button-container {
            height: 60px;
          }
          
          .back-button {
            padding: 12px 24px;
            font-size: 14px;
            width: 200px;
          }
        }
      `}</style>

      <div className="page-container">
        <div className="chatbot-container">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/xLREWrmWyxgzLsoIPnyv-"
            title="AI Chatbot"
            allow="microphone"
            loading="lazy"
            onLoad={(e) => {
              // Additional attempt to hide footer when iframe loads
              setTimeout(() => {
                const iframe = e.target
                try {
                  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
                  
                  if (iframeDoc) {
                    // Direct DOM manipulation to remove footer elements
                    const footers = iframeDoc.querySelectorAll('footer, .footer, [class*="footer"]')
                    footers.forEach(footer => {
                      footer.style.display = 'none'
                      footer.remove()
                    })
                    
                    // Remove Chatbase branding
                    const branding = iframeDoc.querySelectorAll('[data-sentry-component="ChatbotChatbaseBranding"]')
                    branding.forEach(el => {
                      el.style.display = 'none'
                      el.remove()
                    })
                    
                    // Remove elements containing "Powered By Chatbase"
                    const poweredBy = iframeDoc.querySelectorAll('*')
                    poweredBy.forEach(el => {
                      if (el.textContent && el.textContent.includes('Powered By Chatbase')) {
                        el.style.display = 'none'
                        el.remove()
                      }
                    })
                    
                    console.log("Footer elements removed via onLoad")
                  }
                } catch (error) {
                  console.log("Cannot access iframe content (CORS):", error)
                }
              }, 500)
            }}
          />
        </div>
        
        <div className="button-container">
          <Link to="/" className="back-button">
            <span className="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5 12l14 0" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
              </svg>
            </span>
            Back to Home
          </Link>
          
          <div className="particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AI