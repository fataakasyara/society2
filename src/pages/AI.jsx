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
          margin-bottom: -80px;
          height: calc(100% + 80px);
          overflow: hidden;
        }
        
        /* Aggressive footer hiding - target specific classes */
        .chatbot-container iframe::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          background: white;
          z-index: 9999;
          pointer-events: none;
        }
        
        /* White overlay to cover footer area */
        .footer-overlay {
          position: absolute;
          bottom: 80px;
          left: 0;
          right: 0;
          height: 80px;
          background: white;
          z-index: 999;
          pointer-events: none;
        }
        
        /* Additional overlay for safety */
        .chatbot-container {
          position: relative;
          overflow: hidden;
        }
        
        .chatbot-container::before {
          content: '';
          position: absolute;
          bottom: 80px;
          left: 0;
          right: 0;
          height: 80px;
          background: linear-gradient(to top, #ffffff 0%, #ffffff 90%, transparent 100%);
          pointer-events: none;
          z-index: 100;
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
              // Aggressive footer removal with multiple attempts
              const iframe = e.target;
              
              // Multiple attempts to hide footer
              const hideFooter = () => {
                try {
                  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                  
                  if (iframeDoc) {
                    // Create comprehensive CSS to hide footer
                    const style = iframeDoc.createElement('style');
                    style.id = 'nolyx-footer-hider';
                    style.textContent = `
                      /* Hide specific footer with exact classes */
                      footer.flex.min-h-10.w-full.max-w-full.shrink-0.items-center.justify-center.gap-2.overflow-hidden.text-nowrap.bg-primary-foreground.px-4.py-2.text-muted-foreground.text-xs {
                        display: none !important;
                        visibility: hidden !important;
                        height: 0 !important;
                        overflow: hidden !important;
                        opacity: 0 !important;
                      }
                      
                      /* Hide by partial class matches */
                      footer[class*="flex"][class*="min-h-10"][class*="w-full"] {
                        display: none !important;
                        visibility: hidden !important;
                        height: 0 !important;
                      }
                      
                      /* Hide Chatbase branding specifically */
                      [data-sentry-component="ChatbotChatbaseBranding"] {
                        display: none !important;
                        visibility: hidden !important;
                      }
                      
                      /* Hide powered by text */
                      a[href="/"][class*="ml-1"]:contains("Powered By Chatbase.co") {
                        display: none !important;
                      }
                      
                      /* Hide any element containing "Powered By Chatbase" */
                      *:contains("Powered By Chatbase.co") {
                        display: none !important;
                      }
                      
                      /* Hide "Nolyx Chatbase" text */
                      *:contains("Nolyx Chatbase") {
                        display: none !important;
                      }
                      
                      /* Hide separator */
                      [data-sentry-component="Separator"] {
                        display: none !important;
                      }
                      
                      /* Hide any footer-like element */
                      footer, .footer, #footer,
                      [class*="footer"], [id*="footer"],
                      [class*="Footer"], [id*="Footer"] {
                        display: none !important;
                        visibility: hidden !important;
                        height: 0 !important;
                        overflow: hidden !important;
                      }
                      
                      /* Hide elements with bg-primary-foreground */
                      .bg-primary-foreground {
                        display: none !important;
                      }
                      
                      /* Hide text-muted-foreground elements at bottom */
                      .text-muted-foreground {
                        display: none !important;
                      }
                      
                      /* Hide any bottom positioned elements */
                      [style*="bottom"]:last-child,
                      div:last-child[class*="flex"][class*="items-center"] {
                        display: none !important;
                      }
                      
                      /* Adjust body to remove bottom space */
                      body {
                        margin-bottom: 0 !important;
                        padding-bottom: 0 !important;
                      }
                      
                      /* Hide last child if it contains branding */
                      body > *:last-child,
                      #root > *:last-child,
                      [id*="app"] > *:last-child {
                        margin-bottom: 0 !important;
                        padding-bottom: 0 !important;
                      }
                      
                      /* White overlay at bottom */
                      body::after {
                        content: '';
                        position: fixed;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 60px;
                        background: white;
                        z-index: 99999;
                        pointer-events: none;
                      }
                    `;
                    
                    // Remove existing style if present
                    const existingStyle = iframeDoc.getElementById('nolyx-footer-hider');
                    if (existingStyle) {
                      existingStyle.remove();
                    }
                    
                    iframeDoc.head.appendChild(style);
                    
                    // Direct DOM manipulation to remove footer elements
                    setTimeout(() => {
                      // Remove footer by class
                      const footers = iframeDoc.querySelectorAll('footer, .footer, [class*="footer"]');
                      footers.forEach(footer => {
                        footer.style.display = 'none';
                        footer.remove();
                      });
                      
                      // Remove Chatbase branding
                      const branding = iframeDoc.querySelectorAll('[data-sentry-component="ChatbotChatbaseBranding"]');
                      branding.forEach(el => {
                        el.style.display = 'none';
                        el.remove();
                      });
                      
                      // Remove elements containing "Powered By Chatbase"
                      const poweredBy = iframeDoc.querySelectorAll('*');
                      poweredBy.forEach(el => {
                        if (el.textContent && el.textContent.includes('Powered By Chatbase')) {
                          el.style.display = 'none';
                          el.remove();
                        }
                      });
                      
                      // Remove elements with specific classes
                      const bgPrimary = iframeDoc.querySelectorAll('.bg-primary-foreground, .text-muted-foreground');
                      bgPrimary.forEach(el => {
                        el.style.display = 'none';
                        el.remove();
                      });
                      
                      console.log('Footer elements removed successfully');
                    }, 500);
                    
                    console.log('Comprehensive footer hiding CSS injected');
                  }
                } catch (error) {
                  console.log('Cannot access iframe content (CORS):', error);
                }
              };
              
              // Try multiple times with delays
              hideFooter();
              setTimeout(hideFooter, 1000);
              setTimeout(hideFooter, 2000);
              setTimeout(hideFooter, 3000);
              
              // Set up observer to continuously hide footer
              const observer = setInterval(() => {
                hideFooter();
              }, 5000);
              
              // Clean up observer after 30 seconds
              setTimeout(() => {
                clearInterval(observer);
              }, 30000);
            }}
          />
          
          {/* Additional overlay div */}
          <div className="footer-overlay"></div>
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