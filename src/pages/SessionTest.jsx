import React, { useState, useEffect } from 'react'
import { useSession } from '../contexts/SessionContext'

const SessionTest = () => {
  const [logs, setLogs] = useState([])
  const [logCounter, setLogCounter] = useState(0)
  const [sessionStatus, setSessionStatus] = useState('Checking session status...')
  const [sessionData, setSessionData] = useState('Loading...')
  
  const { 
    isSessionValid, 
    getSessionInfo, 
    extendSession, 
    clearSession, 
    isSessionExpiringSoon 
  } = useSession()

  const log = (message, type = 'info') => {
    const newLogCounter = logCounter + 1
    setLogCounter(newLogCounter)
    const timestamp = new Date().toLocaleTimeString()
    
    const newLog = {
      id: newLogCounter,
      timestamp,
      message,
      type
    }
    
    setLogs(prevLogs => [...prevLogs, newLog])
  }

  const checkSession = () => {
    log('Checking session status...', 'info')
    
    const isValid = isSessionValid()
    
    if (isValid) {
      setSessionStatus('✅ Session is VALID - User is verified')
      log('Session is valid', 'success')
    } else {
      setSessionStatus('❌ Session is INVALID - User needs verification')
      log('Session is invalid', 'error')
    }
    
    refreshSessionInfo()
  }

  const refreshSessionInfo = () => {
    const sessionInfo = getSessionInfo()
    
    if (sessionInfo) {
      setSessionData(JSON.stringify(sessionInfo, null, 2))
      
      if (isSessionExpiringSoon()) {
        log('⚠️ Session will expire soon!', 'warning')
      }
    } else {
      setSessionData('No session data found')
    }
  }

  const handleExtendSession = () => {
    const success = extendSession(24)
    if (success) {
      log('Session extended by 24 hours', 'success')
      refreshSessionInfo()
    } else {
      log('Failed to extend session', 'error')
    }
  }

  const handleClearSession = () => {
    clearSession()
    log('Session cleared', 'warning')
    checkSession()
  }

  const goToVerification = () => {
    log('Redirecting to verification page...', 'info')
    window.location.href = '/verif'
  }

  const goToJoin = () => {
    log('Redirecting to join page...', 'info')
    window.location.href = '/join'
  }

  const clearLogs = () => {
    setLogs([])
    setLogCounter(0)
    log('Logs cleared', 'info')
  }

  useEffect(() => {
    log('Session test page loaded', 'info')
    
    setTimeout(() => {
      checkSession()
    }, 100)

    const interval = setInterval(() => {
      if (isSessionValid()) {
        refreshSessionInfo()
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const getLogStyle = (type) => {
    const baseStyle = {
      marginBottom: '5px',
      padding: '5px',
      borderRadius: '3px'
    }

    switch(type) {
      case 'success':
        return { ...baseStyle, background: '#d4edda', color: '#155724' }
      case 'error':
        return { ...baseStyle, background: '#f8d7da', color: '#721c24' }
      case 'warning':
        return { ...baseStyle, background: '#fff3cd', color: '#856404' }
      default:
        return { ...baseStyle, background: '#e2e3e5', color: '#383d41' }
    }
  }

  const getStatusStyle = () => {
    if (sessionStatus.includes('VALID')) {
      return { background: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' }
    } else {
      return { background: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' }
    }
  }

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      background: '#f5f5f5'
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1>🔐 Nolyx Society Session Test</h1>
        <p>Halaman ini untuk testing sistem session management.</p>
        
        <div style={{
          padding: '15px',
          borderRadius: '5px',
          margin: '10px 0',
          ...getStatusStyle()
        }}>
          {sessionStatus}
        </div>
        
        <div>
          <h3>Session Information:</h3>
          <pre style={{
            background: '#f8f9fa',
            padding: '15px',
            borderRadius: '5px',
            overflowX: 'auto'
          }}>
            {sessionData}
          </pre>
        </div>
        
        <div>
          <h3>Session Controls:</h3>
          <button onClick={checkSession} style={{ background: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', margin: '5px' }}>
            🔍 Check Session
          </button>
          <button onClick={refreshSessionInfo} style={{ background: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', margin: '5px' }}>
            🔄 Refresh Info
          </button>
          <button onClick={handleExtendSession} style={{ background: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', margin: '5px' }}>
            ⏰ Extend Session (+24h)
          </button>
          <button onClick={handleClearSession} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', margin: '5px' }}>
            🗑️ Clear Session
          </button>
          <button onClick={goToVerification} style={{ background: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', margin: '5px' }}>
            ✅ Go to Verification
          </button>
          <button onClick={goToJoin} style={{ background: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', margin: '5px' }}>
            🚀 Go to Join Page
          </button>
        </div>
        
        <div>
          <h3>Activity Log:</h3>
          <div style={{
            maxHeight: '300px',
            overflowY: 'auto',
            background: '#f8f9fa',
            padding: '15px',
            borderRadius: '5px'
          }}>
            <div>
              {logs.map((log) => (
                <div key={log.id} style={getLogStyle(log.type)}>
                  [{log.id}] {log.timestamp}: {log.message}
                </div>
              ))}
            </div>
          </div>
          <button onClick={clearLogs} style={{ background: '#007bff', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', margin: '5px' }}>
            Clear Logs
          </button>
        </div>
        
        <div>
          <h3>📋 Testing Instructions:</h3>
          <ol>
            <li><strong>Test 1:</strong> Akses halaman ini tanpa verifikasi → Status harus "Invalid"</li>
            <li><strong>Test 2:</strong> Klik "Go to Verification" → Complete reCAPTCHA → Kembali ke sini</li>
            <li><strong>Test 3:</strong> Status harus berubah menjadi "Valid" setelah verifikasi</li>
            <li><strong>Test 4:</strong> Klik "Clear Session" → Status harus kembali "Invalid"</li>
            <li><strong>Test 5:</strong> Klik "Go to Join Page" tanpa session → Harus redirect ke verifikasi</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default SessionTest