import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Post from './pages/Post'
import Join from './pages/Join'
import AI from './pages/AI'
import Verification from './pages/Verification'
import SessionTest from './pages/SessionTest'
import NotFound from './pages/NotFound'
import { MetaMaskProvider } from './contexts/MetaMaskContext'
import { SessionProvider } from './contexts/SessionContext'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <SessionProvider>
      <MetaMaskProvider>
        <Router>
          <ScrollToTop />
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              {/* New SEO-friendly route with slug parameter */}
              <Route path="/post/:slug" element={<Post />} />
              {/* Legacy route for backward compatibility */}
              <Route path="/post" element={<Post />} />
              <Route path="/join" element={<Join />} />
              <Route path="/ai" element={<AI />} />
              <Route path="/verif" element={<Verification />} />
              <Route path="/session-test" element={<SessionTest />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </MetaMaskProvider>
    </SessionProvider>
  )
}

export default App