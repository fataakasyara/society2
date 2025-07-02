import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const [countdown, setCountdown] = useState(4)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Start countdown immediately
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsRedirecting(true)
          clearInterval(timer)
          // Redirect to home after countdown
          setTimeout(() => {
            navigate('/')
          }, 500)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  const handleGoHome = () => {
    setIsRedirecting(true)
    navigate('/')
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .not-found-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #064e3b 0%, #065f46 25%, #047857 50%, #059669 75%, #10b981 100%);
          background-size: 400% 400%;
          animation: gradientFlow 8s ease infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }

        /* Background overlay effects */
        .bg-overlay {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(5, 150, 105, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(4, 120, 87, 0.1) 0%, transparent 70%);
          animation: overlayPulse 6s ease-in-out infinite;
        }

        @keyframes overlayPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        /* Large 404 background text */
        .large-404 {
          position: absolute;
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(200px, 40vw, 800px);
          font-weight: 900;
          color: rgba(255, 255, 255, 0.03);
          line-height: 0.8;
          user-select: none;
          pointer-events: none;
          z-index: 1;
          animation: float404 8s ease-in-out infinite;
        }

        @keyframes float404 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(1deg); }
          50% { transform: translateY(-10px) rotate(0deg); }
          75% { transform: translateY(-30px) rotate(-1deg); }
        }

        /* Main content */
        .main-content {
          position: relative;
          z-index: 10;
          text-align: center;
          color: white;
          max-width: 600px;
          padding: 0 20px;
          animation: contentSlideUp 1s ease-out;
        }

        @keyframes contentSlideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Error badge */
        .error-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 8px 20px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          margin-bottom: 30px;
          animation: badgeGlow 2s ease-in-out infinite;
        }

        @keyframes badgeGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.6); }
        }

        /* Main 404 text */
        .error-code {
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(80px, 15vw, 180px);
          font-weight: 900;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #ffffff, #d1fae5, #a7f3d0, #6ee7b7);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textShimmer 3s ease-in-out infinite;
          position: relative;
        }

        @keyframes textShimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        /* Error messages */
        .error-title {
          font-size: clamp(28px, 6vw, 48px);
          font-weight: 700;
          margin-bottom: 16px;
          animation: titleFade 1s ease-out 0.3s both;
        }

        .error-subtitle {
          font-size: clamp(16px, 4vw, 24px);
          font-weight: 500;
          margin-bottom: 12px;
          color: rgba(255, 255, 255, 0.9);
          animation: titleFade 1s ease-out 0.6s both;
        }

        .error-description {
          font-size: clamp(14px, 3vw, 18px);
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 40px;
          line-height: 1.6;
          animation: titleFade 1s ease-out 0.9s both;
        }

        @keyframes titleFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Countdown section */
        .countdown-section {
          margin-bottom: 40px;
          animation: titleFade 1s ease-out 1.2s both;
        }

        .countdown-text {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 15px;
        }

        .countdown-timer {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          font-size: 24px;
          font-weight: 700;
          color: white;
          position: relative;
          animation: timerPulse 1s ease-in-out infinite;
        }

        @keyframes timerPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { transform: scale(1.1); box-shadow: 0 0 30px rgba(16, 185, 129, 0.6); }
        }

        /* Action buttons */
        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          animation: titleFade 1s ease-out 1.5s both;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 16px 32px;
          border-radius: 50px;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          min-width: 200px;
          cursor: pointer;
          border: none;
          font-family: inherit;
        }

        .btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }

        .btn:hover::before {
          transform: translateX(100%);
        }

        .btn-primary {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #059669, #047857);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 35px rgba(16, 185, 129, 0.4);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }

        .btn:active {
          transform: translateY(1px) scale(0.98);
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }

        .icon {
          transition: transform 0.3s ease;
        }

        .btn:hover .icon {
          transform: scale(1.2);
        }

        /* Floating particles */
        .particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: particleFloat 8s linear infinite;
        }

        .particle:nth-child(1) { left: 10%; animation-delay: 0s; animation-duration: 8s; }
        .particle:nth-child(2) { left: 20%; animation-delay: 1s; animation-duration: 10s; }
        .particle:nth-child(3) { left: 30%; animation-delay: 2s; animation-duration: 7s; }
        .particle:nth-child(4) { left: 40%; animation-delay: 3s; animation-duration: 9s; }
        .particle:nth-child(5) { left: 50%; animation-delay: 4s; animation-duration: 11s; }
        .particle:nth-child(6) { left: 60%; animation-delay: 5s; animation-duration: 8s; }
        .particle:nth-child(7) { left: 70%; animation-delay: 6s; animation-duration: 10s; }
        .particle:nth-child(8) { left: 80%; animation-delay: 7s; animation-duration: 9s; }
        .particle:nth-child(9) { left: 90%; animation-delay: 8s; animation-duration: 7s; }

        @keyframes particleFloat {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Redirecting state */
        .redirecting {
          animation: redirectPulse 0.5s ease-in-out infinite;
        }

        @keyframes redirectPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .main-content {
            padding: 0 16px;
          }

          .action-buttons {
            width: 100%;
          }

          .btn {
            width: 100%;
            max-width: 280px;
          }

          .large-404 {
            font-size: clamp(150px, 35vw, 400px);
          }
        }

        @media (max-width: 480px) {
          .error-code {
            font-size: clamp(60px, 12vw, 120px);
          }

          .countdown-timer {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }
        }

        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="not-found-container">
        {/* Background overlay */}
        <div className="bg-overlay"></div>

        {/* Large background 404 */}
        <div className="large-404">404</div>

        {/* Floating particles */}
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>

        {/* Main content */}
        <div className={`main-content ${isRedirecting ? 'redirecting' : ''}`}>
          {/* Error badge */}
          <div className="error-badge">
            404 ERROR PAGE
          </div>

          {/* Main 404 text */}
          <div className="error-code">404</div>

          {/* Error messages */}
          <h1 className="error-title">Page Not Found</h1>
          <h2 className="error-subtitle">SORRY, WE COULDN'T FIND THIS PAGE</h2>
          <p className="error-description">
            The page you're looking for seems to have wandered off into the blockchain. 
            Don't worry, we'll get you back to the Nolyx Society!
          </p>

          {/* Countdown section */}
          <div className="countdown-section">
            <p className="countdown-text">
              {isRedirecting ? 'Redirecting now...' : `Redirecting to home in:`}
            </p>
            <div className="countdown-timer">
              {isRedirecting ? '🚀' : countdown}
            </div>
          </div>

          {/* Action buttons */}
          <div className="action-buttons">
            <button
              onClick={handleGoHome}
              className="btn btn-primary"
              disabled={isRedirecting}
            >
              <span className="icon">🏠</span>
              {isRedirecting ? 'Redirecting...' : 'Go Home Now'}
            </button>

            <button
              onClick={() => window.history.back()}
              className="btn btn-secondary"
              disabled={isRedirecting}
            >
              <span className="icon">↩️</span>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound