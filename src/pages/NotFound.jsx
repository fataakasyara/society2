import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [particles, setParticles] = useState([])
  const navigate = useNavigate()

  // Generate random particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = []
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          delay: Math.random() * 5,
          duration: Math.random() * 3 + 2
        })
      }
      setParticles(newParticles)
    }

    generateParticles()
  }, [])

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleGoHome = () => {
    // Add a small delay for animation effect
    setTimeout(() => {
      navigate('/')
    }, 300)
  }

  const handleGoToBlog = () => {
    setTimeout(() => {
      navigate('/blog')
    }, 300)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&display=swap');
        
        .not-found-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #10b981 0%, #059669 25%, #047857 50%, #065f46 75%, #064e3b 100%);
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          position: relative;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
        }

        .background-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.1;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.15) 1px, transparent 1px);
          background-size: 50px 50px, 80px 80px;
          animation: patternMove 20s linear infinite;
        }

        @keyframes patternMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .floating-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: float linear infinite;
        }

        @keyframes float {
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

        .main-content {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 30px;
          padding: 60px 40px;
          text-align: center;
          max-width: 600px;
          width: 100%;
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          position: relative;
          transform: translateY(0);
          animation: contentFloat 6s ease-in-out infinite;
        }

        @keyframes contentFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .main-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #10b981, #34d399, #6ee7b7, #34d399, #10b981);
          background-size: 200% 100%;
          border-radius: 30px 30px 0 0;
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%, 100% { background-position: 200% 0; }
          50% { background-position: -200% 0; }
        }

        .error-code {
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(80px, 15vw, 150px);
          font-weight: 900;
          background: linear-gradient(135deg, #10b981, #059669, #047857);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 20px;
          position: relative;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .error-code::after {
          content: '404';
          position: absolute;
          top: 0;
          left: 0;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.3), rgba(5, 150, 105, 0.3));
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: glitch 3s ease-in-out infinite;
        }

        @keyframes glitch {
          0%, 90%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }

        .error-title {
          font-size: clamp(24px, 5vw, 36px);
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 16px;
          animation: slideInUp 1s ease-out 0.3s both;
        }

        .error-description {
          font-size: clamp(16px, 3vw, 20px);
          color: #6b7280;
          margin-bottom: 40px;
          line-height: 1.6;
          animation: slideInUp 1s ease-out 0.6s both;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          animation: slideInUp 1s ease-out 0.9s both;
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
        }

        .btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
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
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
          color: #374151;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .btn-secondary:hover {
          background: linear-gradient(135deg, #e5e7eb, #d1d5db);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        }

        .btn:active {
          transform: translateY(1px) scale(0.98);
        }

        .icon {
          transition: transform 0.3s ease;
        }

        .btn:hover .icon {
          transform: scale(1.2);
        }

        .btn-primary:hover .icon {
          animation: bounce 0.6s ease;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0) scale(1.2); }
          40% { transform: translateY(-5px) scale(1.2); }
          60% { transform: translateY(-3px) scale(1.2); }
        }

        .interactive-bg {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.1), transparent);
          pointer-events: none;
          transition: all 0.3s ease;
          animation: pulse-bg 4s ease-in-out infinite;
        }

        @keyframes pulse-bg {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.8; }
        }

        .suggestions {
          margin-top: 40px;
          padding-top: 30px;
          border-top: 2px solid #e5e7eb;
          animation: slideInUp 1s ease-out 1.2s both;
        }

        .suggestions h3 {
          font-size: 18px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 16px;
        }

        .suggestion-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }

        .suggestion-link {
          padding: 8px 16px;
          background: linear-gradient(135deg, #ecfdf5, #d1fae5);
          color: #065f46;
          text-decoration: none;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 1px solid #a7f3d0;
        }

        .suggestion-link:hover {
          background: linear-gradient(135deg, #d1fae5, #a7f3d0);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(16, 185, 129, 0.2);
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .main-content {
            padding: 40px 24px;
            margin: 20px;
            border-radius: 20px;
          }

          .action-buttons {
            width: 100%;
          }

          .btn {
            width: 100%;
            max-width: 280px;
          }

          .suggestion-links {
            flex-direction: column;
            align-items: center;
          }

          .suggestion-link {
            width: 100%;
            max-width: 200px;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .main-content {
            padding: 30px 20px;
          }

          .error-code {
            font-size: 80px;
          }

          .error-title {
            font-size: 24px;
          }

          .error-description {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="not-found-container">
        {/* Background Pattern */}
        <div className="background-pattern"></div>

        {/* Interactive Background Element */}
        <div 
          className="interactive-bg"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`
          }}
        ></div>

        {/* Floating Particles */}
        <div className="floating-particles">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: `${particle.x}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="error-code">404</div>
          
          <h1 className="error-title">Oops! Page Not Found</h1>
          
          <p className="error-description">
            The page you're looking for seems to have wandered off into the blockchain. 
            Don't worry, we'll help you find your way back to the Nolyx Society!
          </p>

          <div className="action-buttons">
            <button
              onClick={handleGoHome}
              className="btn btn-primary"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span className="icon">🏠</span>
              Back to Home
            </button>

            <button
              onClick={handleGoToBlog}
              className="btn btn-secondary"
            >
              <span className="icon">📚</span>
              Explore Blog
            </button>
          </div>

          <div className="suggestions">
            <h3>Popular Destinations</h3>
            <div className="suggestion-links">
              <Link to="/join" className="suggestion-link">Join Community</Link>
              <Link to="/ai" className="suggestion-link">Nolyx AI</Link>
              <Link to="/#about" className="suggestion-link">About Us</Link>
              <Link to="/#governance" className="suggestion-link">Governance</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound