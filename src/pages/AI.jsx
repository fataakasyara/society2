import React from 'react'
import { Link } from 'react-router-dom'

const AI = () => {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-800 bg-size-200 bg-pos-0 animation" style={{
      backgroundSize: '200% 200%',
      backgroundPosition: '0% 0%',
      animation: 'gradient 2s ease infinite'
    }}>
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 0%; }
          100% { background-position: 0% 0%; }
        }
        
        /* Hide iframe footer using CSS */
        .chatbot-container iframe {
          margin-bottom: -50px;
          height: calc(100% + 50px);
          overflow: hidden;
        }
        
        /* Additional CSS to hide footer elements in iframe */
        .chatbot-container iframe::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: white;
          z-index: 999;
        }
        
        /* Try to inject CSS into iframe to hide footer */
        .chatbot-container {
          position: relative;
        }
        
        .chatbot-container::after {
          content: '';
          position: absolute;
          bottom: 80px;
          left: 0;
          right: 0;
          height: 60px;
          background: linear-gradient(to top, white 0%, white 80%, transparent 100%);
          pointer-events: none;
          z-index: 10;
        }
      `}</style>
      
      <div className="page-container">
        <div className="chatbot-container">
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/xLREWrmWyxgzLsoIPnyv-"
            title="AI Chatbot"
            allow="microphone"
            loading="lazy"
            style={{
              width: '100%',
              height: 'calc(100vh - 80px)',
              border: 'none',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
            }}
            onLoad={(e) => {
              // Try to inject CSS to hide footer when iframe loads
              try {
                const iframe = e.target;
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                
                // Create style element to hide footer
                const style = iframeDoc.createElement('style');
                style.textContent = `
                  footer, .footer, #footer, 
                  [class*="footer"], [id*="footer"],
                  [class*="Footer"], [id*="Footer"],
                  .chatbase-footer, .chatbot-footer,
                  div[style*="bottom"]:last-child {
                    display: none !important;
                    visibility: hidden !important;
                    height: 0 !important;
                    overflow: hidden !important;
                  }
                  
                  /* Hide powered by text */
                  [class*="powered"], [class*="Powered"],
                  a[href*="chatbase"], a[href*="Chatbase"] {
                    display: none !important;
                  }
                  
                  /* Adjust main container */
                  body, html {
                    margin: 0 !important;
                    padding: 0 !important;
                    overflow-x: hidden !important;
                  }
                  
                  /* Hide last element if it looks like footer */
                  body > div:last-child,
                  #root > div:last-child {
                    margin-bottom: 0 !important;
                    padding-bottom: 0 !important;
                  }
                `;
                
                iframeDoc.head.appendChild(style);
                console.log('Footer hiding CSS injected successfully');
              } catch (error) {
                console.log('Cannot inject CSS into iframe (CORS restriction):', error);
              }
            }}
          />
        </div>
        
        <div className="button-container" style={{
          height: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f9fafb',
          padding: '10px 0',
          position: 'relative',
          zIndex: 2,
          boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.05)'
        }}>
          <Link 
            to="/" 
            className="back-button"
            style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              textDecoration: 'none',
              border: 'none',
              borderRadius: '50px',
              padding: '16px 36px',
              fontSize: '16px',
              fontWeight: '600',
              letterSpacing: '0.5px',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              width: '300px',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #059669, #047857)'
              e.target.style.transform = 'translateY(-3px) scale(1.05)'
              e.target.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.4)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #10b981, #059669)'
              e.target.style.transform = 'translateY(0) scale(1)'
              e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.3)'
            }}
          >
            <span className="icon" style={{ marginRight: '12px', transition: 'transform 0.3s ease', display: 'flex' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M5 12l14 0" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
              </svg>
            </span>
            Back to Home
          </Link>
          
          <div className="particles" style={{
            position: 'absolute',
            width: '100%',
            height: '80px',
            bottom: 0,
            left: 0,
            overflow: 'hidden',
            pointerEvents: 'none'
          }}>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  position: 'absolute',
                  width: '6px',
                  height: '6px',
                  background: 'rgba(16, 185, 129, 0.2)',
                  borderRadius: '50%',
                  left: `${10 + i * 20}%`,
                  top: `${20 + i * 10}%`,
                  animation: `float ${12 + i * 3}s infinite linear`,
                  animationDelay: `${i}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
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
        
        @media (max-width: 768px) {
          .chatbot-container {
            height: calc(100vh - 70px) !important;
          }
          
          .button-container {
            height: 70px !important;
          }
          
          .back-button {
            padding: 14px 28px !important;
            font-size: 15px !important;
            width: 240px !important;
          }
        }
        
        @media (max-width: 480px) {
          .chatbot-container {
            height: calc(100vh - 60px) !important;
          }
          
          .button-container {
            height: 60px !important;
          }
          
          .back-button {
            padding: 12px 24px !important;
            font-size: 14px !important;
            width: 200px !important;
          }
        }
      `}</style>
    </div>
  )
}

export default AI