import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{
      textAlign: 'center',
      fontFamily: 'sans-serif',
      padding: '50px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <h1 style={{ fontSize: '50px', color: '#333', marginBottom: '20px' }}>404</h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
        Oops! This page doesn't exist
      </p>
      <Link 
        to="/" 
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '12px 24px',
          textDecoration: 'none',
          borderRadius: '25px',
          fontSize: '16px',
          fontWeight: '600',
          transition: 'transform 0.3s ease',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)'
        }}
      >
        Back to Homepage
      </Link>
    </div>
  )
}

export default NotFound