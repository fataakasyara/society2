import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ 
        fontSize: '120px', 
        margin: '0 0 20px 0',
        fontWeight: 'bold'
      }}>
        404
      </h1>
      
      <h2 style={{ 
        fontSize: '24px', 
        margin: '0 0 10px 0',
        fontWeight: '600'
      }}>
        Page Not Found
      </h2>
      
      <p style={{ 
        fontSize: '16px', 
        margin: '0 0 40px 0',
        opacity: '0.9'
      }}>
        The page you're looking for doesn't exist.
      </p>
      
      <Link 
        to="/" 
        style={{
          background: 'white',
          color: '#10b981',
          padding: '12px 30px',
          textDecoration: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)'
          e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)'
          e.target.style.boxShadow = 'none'
        }}
      >
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound