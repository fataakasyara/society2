import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AIButton from '../components/AIButton'

const Post = () => {
  const [searchParams] = useSearchParams()
  const [currentPost, setCurrentPost] = useState(null)
  const [allPosts, setAllPosts] = useState([])
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    loadPostsData()
  }, [])

  useEffect(() => {
    if (allPosts.length > 0) {
      loadPost()
    }
  }, [allPosts, searchParams])

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.pageYOffset / totalHeight) * 100
      setReadingProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const loadPostsData = async () => {
    try {
      console.log('Loading posts data from API...')
      const response = await fetch('https://api.jsonbin.io/v3/b/685bffd98561e97a502b9481')

      if (!response.ok) {
        throw new Error(`Failed to load posts data: ${response.status}`)
      }

      const data = await response.json()
      const posts = data.record?.posts || data.record || data.posts || data || []
      setAllPosts(posts)
      console.log('Posts loaded successfully from API:', posts.length, 'posts')
    } catch (error) {
      console.error('Error loading posts from API:', error)
      setError(true)
      setLoading(false)
    }
  }

  const loadPost = () => {
    const postIdString = searchParams.get('id')
    const postId = parseInt(postIdString)

    console.log('Post ID from URL:', postIdString, 'Parsed:', postId)

    if (!postId) {
      console.error('No valid post ID found')
      setError(true)
      setLoading(false)
      return
    }

    const post = allPosts.find(post => post.id === postId)
    console.log('Found post:', !!post)

    if (!post) {
      console.error('Post not found with ID:', postId)
      setError(true)
      setLoading(false)
      return
    }

    setCurrentPost(post)
    loadRelatedPosts(post)
    setLoading(false)

    // Update page title and meta
    document.title = `${post.title} - Nolyx Society`
  }

  const loadRelatedPosts = (post) => {
    let related = allPosts
      .filter(p => p.id !== post.id && p.category === post.category)
      .slice(0, 3)

    if (related.length < 3) {
      const otherPosts = allPosts
        .filter(p => p.id !== post.id && p.category !== post.category)
        .slice(0, 3 - related.length)
      related.push(...otherPosts)
    }

    setRelatedPosts(related)
  }

  const formatCategoryName = (category) => {
    const categoryNames = {
      'web3': 'Web3',
      'blockchain': 'Blockchain',
      'defi': 'DeFi',
      'smartcontracts': 'Smart Contracts',
      'tutorials': 'Tutorials',
      'nft': 'NFT',
      'dao': 'DAO'
    }
    return categoryNames[category] || category
  }

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`Check out this article: ${currentPost.title}`)
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
  }

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
  }

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      // Modern toast notification
      const toast = document.createElement('div')
      toast.className = 'fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300'
      toast.innerHTML = `
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
          <span>Link copied to clipboard!</span>
        </div>
      `
      document.body.appendChild(toast)
      setTimeout(() => {
        toast.style.transform = 'translateX(100%)'
        setTimeout(() => document.body.removeChild(toast), 300)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const shareArticle = () => {
    if (navigator.share) {
      navigator.share({
        title: currentPost.title,
        text: currentPost.excerpt,
        url: window.location.href
      })
    } else {
      copyLink()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <style>{`
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
            50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.6); }
          }
          .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        `}</style>
        
        <Navbar />
        
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-6 pulse-glow"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-purple-500 border-b-transparent rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-800 text-xl font-semibold">Loading Article</p>
              <p className="text-gray-600">Fetching Web3 content...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !currentPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="bg-white rounded-3xl p-8 border border-red-200 shadow-2xl">
              <div className="mb-6">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200">
                  <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h2>
                <p className="text-gray-600 mb-6">
                  The article you're looking for doesn't exist or has been removed.
                </p>
              </div>
              
              <Link 
                to="/blog" 
                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-105 group"
              >
                <svg className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Blog
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.2); }
          50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.4); }
        }
        @keyframes progressPulse {
          0%, 100% { box-shadow: 0 0 10px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.6); }
        }
        .float-animation { animation: float 6s ease-in-out infinite; }
        .glow-effect { animation: glow 3s ease-in-out infinite; }
        .progress-pulse { animation: progressPulse 2s ease-in-out infinite; }
        .gradient-text {
          background: linear-gradient(135deg, #059669, #0d9488, #0891b2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .glass-morphism {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .neon-border {
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.2), inset 0 0 20px rgba(16, 185, 129, 0.05);
        }
        
        /* Enhanced readability for post content */
        .post-content h1 { color: #1f2937; font-size: 2.25rem; font-weight: 700; margin: 2rem 0 1rem 0; }
        .post-content h2 { color: #374151; font-size: 1.875rem; font-weight: 600; margin: 1.75rem 0 1rem 0; }
        .post-content h3 { color: #4b5563; font-size: 1.5rem; font-weight: 600; margin: 1.5rem 0 0.75rem 0; }
        .post-content h4 { color: #6b7280; font-size: 1.25rem; font-weight: 600; margin: 1.25rem 0 0.5rem 0; }
        .post-content p { color: #374151; line-height: 1.8; margin-bottom: 1.25rem; font-size: 1.1rem; }
        .post-content ul, .post-content ol { color: #374151; margin-bottom: 1.25rem; padding-left: 1.5rem; }
        .post-content li { margin-bottom: 0.5rem; line-height: 1.7; }
        .post-content strong { color: #1f2937; font-weight: 600; }
        .post-content em { color: #4b5563; font-style: italic; }
        .post-content code { 
          background: #f3f4f6; 
          color: #059669; 
          padding: 0.25rem 0.5rem; 
          border-radius: 0.375rem; 
          font-size: 0.9rem; 
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }
        .post-content pre {
          background: #1f2937;
          color: #e5e7eb;
          padding: 1.5rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .post-content blockquote {
          border-left: 4px solid #059669;
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          color: #4b5563;
          font-style: italic;
          background: #f0fdf4;
          padding: 1rem 1.5rem;
          border-radius: 0.5rem;
        }
        .post-content a {
          color: #059669;
          text-decoration: underline;
          font-weight: 500;
        }
        .post-content a:hover {
          color: #047857;
        }
      `}</style>

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-100 rounded-full blur-3xl float-animation opacity-30"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-100 rounded-full blur-3xl float-animation opacity-30" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-purple-100 rounded-full blur-3xl float-animation opacity-30" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-emerald-100 rounded-full blur-3xl float-animation opacity-30" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Reading Progress Bar - Enhanced */}
      <div className="fixed top-0 left-0 w-full h-2 bg-gray-200/80 backdrop-blur-sm z-50 border-b border-gray-300/50">
        <div 
          className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 transition-all duration-300 ease-out progress-pulse relative overflow-hidden"
          style={{ width: `${readingProgress}%` }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          
          {/* Progress indicator dot */}
          {readingProgress > 0 && (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
              <div className="w-4 h-4 bg-white rounded-full shadow-lg border-2 border-green-500 animate-pulse"></div>
            </div>
          )}
        </div>
        
        {/* Progress percentage indicator */}
        {readingProgress > 5 && (
          <div 
            className="absolute top-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow-lg transition-all duration-300"
            style={{ left: `${Math.min(readingProgress, 95)}%`, transform: 'translateX(-50%)' }}
          >
            {Math.round(readingProgress)}%
          </div>
        )}
      </div>

      {/* Fixed Reading Progress Indicator - Bottom */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200/50">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="2"
                  strokeDasharray={`${readingProgress}, 100`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <div className="text-sm">
              <div className="font-semibold text-gray-800">{Math.round(readingProgress)}% Read</div>
              <div className="text-gray-600 text-xs">
                {readingProgress < 100 ? 'Keep reading...' : 'Article complete!'}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Navbar />
      
      <main className="pt-20 relative z-10">
        {/* Breadcrumb */}
        <section className="py-6 bg-white/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-3 text-sm">
              <Link to="/blog" className="text-gray-600 hover:text-green-600 transition-colors flex items-center group">
                <svg className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Blog
              </Link>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-800 font-medium truncate">{currentPost.title}</span>
            </nav>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  {formatCategoryName(currentPost.category)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800 leading-tight">
                {currentPost.title}
              </h1>
              
              {/* Article Meta */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">{new Date(currentPost.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{currentPost.readTime}</span>
                </div>
                <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full">
                  <img src={currentPost.author.avatar} alt="Author" className="w-6 h-6 rounded-full mr-2 border border-green-400" />
                  <span className="text-green-600 font-medium">{currentPost.author.name}</span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative mb-12 group">
                <img 
                  src={currentPost.image} 
                  alt={currentPost.title} 
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-xl border border-gray-200 group-hover:scale-[1.02] transition-all duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-2xl"></div>
              </div>

              {/* Social Share */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <span className="text-gray-600 font-medium">Share this article:</span>
                <div className="flex space-x-3">
                  <button onClick={shareOnTwitter} className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition-all duration-300 group">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button onClick={shareOnLinkedIn} className="bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-xl transition-all duration-300 group">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </button>
                  <button onClick={shareOnFacebook} className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-all duration-300 group">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button onClick={copyLink} className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-xl transition-all duration-300 group">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
              <div 
                className="post-content max-w-none"
                dangerouslySetInnerHTML={{ __html: currentPost.content }}
              >
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <img src={currentPost.author.avatar} alt="Author" className="w-20 h-20 rounded-full border-2 border-green-400" />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentPost.author.name}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{currentPost.author.bio}</p>
                  <div className="flex space-x-3">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm transition-all duration-300">
                      Follow
                    </button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl text-sm transition-all duration-300">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link 
                to="/blog" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center group shadow-lg"
              >
                <svg className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Blog
              </Link>
              
              <div className="flex space-x-4">
                <button 
                  onClick={shareArticle}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center group shadow-lg"
                >
                  <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share Article
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Related Articles</h2>
              <p className="text-gray-600 text-lg">Explore more Web3 content</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((post, index) => (
                <article 
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 cursor-pointer group border border-gray-200 shadow-lg hover:shadow-xl"
                  onClick={() => window.location.href = `/post?id=${post.id}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        {formatCategoryName(post.category)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img src={post.author.avatar} alt="Author" className="w-6 h-6 rounded-full border border-green-400" />
                        <span className="text-green-600 text-sm font-medium">{post.author.name}</span>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <AIButton hideOnPages={['ai']} />
    </div>
  )
}

export default Post