import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AIButton from '../components/AIButton'
import ModernSearchBar from '../components/ModernSearchBar'
import CategorySidebar from '../components/CategorySidebar'
import { useMetaMask } from '../contexts/MetaMaskContext'

const Blog = () => {
  const [currentCategory, setCurrentCategory] = useState('all')
  const [postsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [allPosts, setAllPosts] = useState([])
  const [postsLoaded, setPostsLoaded] = useState(false)
  const [isConnectedState, setIsConnectedState] = useState(false)
  const { isConnected, connect } = useMetaMask()

  // Search suggestions based on common topics
  const searchSuggestions = [
    'Blockchain fundamentals',
    'Smart contract development',
    'DeFi protocols',
    'NFT marketplace',
    'Web3 development',
    'Cryptocurrency trading',
    'DAO governance',
    'Ethereum tutorials',
    'Solidity programming',
    'MetaMask integration',
    'Decentralized applications',
    'Crypto security'
  ]

  useEffect(() => {
    checkWalletConnection()
  }, [isConnected])

  const checkWalletConnection = () => {
    setTimeout(() => {
      if (isConnected) {
        setIsConnectedState(true)
        if (!postsLoaded) {
          setPostsLoaded(true)
          loadPostsData()
        }
      } else {
        setIsConnectedState(false)
        setPostsLoaded(false)
      }
    }, 500)
  }

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
      setAllPosts([])
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleCategoryChange = (category) => {
    setCurrentCategory(category)
    setCurrentPage(1)
  }

  const getFilteredPosts = () => {
    let filteredPosts = allPosts

    // Filter by category
    if (currentCategory !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category === currentCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filteredPosts
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

  const filteredPosts = getFilteredPosts()
  const postsToShow = filteredPosts.slice(0, postsPerPage * currentPage)
  const hasMorePosts = filteredPosts.length > postsPerPage * currentPage

  const loadMorePosts = () => {
    setCurrentPage(currentPage + 1)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setCurrentCategory('all')
    setCurrentPage(1)
  }

  if (!isConnectedState) {
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
        `}</style>
        
        <Navbar />
        
        <div className="flex items-center justify-center min-h-screen">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
              <div className="mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <circle cx="12" cy="16" r="1"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Wallet Required</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Connect your MetaMask wallet to access our exclusive Web3 content and join the Nolyx Society community.
                </p>
              </div>
              
              <button 
                onClick={connect}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-105 group"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="mr-3 group-hover:scale-110 transition-transform">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Connect MetaMask Wallet
              </button>
              
              <div className="mt-6 text-sm text-gray-500">
                <p>Don't have MetaMask? <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline font-medium">Download here</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
      `}</style>
      
      <Navbar />
      
      {/* Welcome Header */}
      <section className="hero-section h-96 flex items-center justify-center text-white mt-16">
        <div id="cinzel" className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Nolyx Blog</h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-2xl mx-auto">
            Discover the future of Web3 technology
          </p>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Section */}
          <div className="mb-12">
            <ModernSearchBar
              onSearch={handleSearch}
              suggestions={searchSuggestions}
              placeholder="Search articles, topics, or keywords..."
              showVoiceSearch={true}
            />
          </div>

          {/* Search Results Info */}
          {(searchQuery || currentCategory !== 'all') && (
            <div className="mb-8 p-4 bg-white bg-opacity-10 rounded-lg backdrop-filter backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                  <span className="text-white font-medium">
                    {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                    {searchQuery && ` for "${searchQuery}"`}
                    {currentCategory !== 'all' && ` in ${formatCategoryName(currentCategory)}`}
                  </span>
                </div>
                {(searchQuery || currentCategory !== 'all') && (
                  <button
                    onClick={clearSearch}
                    className="text-white hover:text-green-200 transition-colors flex items-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Main Content Layout with Sidebar */}
          <div className="blog-layout">
            {/* Category Sidebar */}
            <CategorySidebar
              currentCategory={currentCategory}
              onCategoryChange={handleCategoryChange}
            />

            {/* Blog Posts Content */}
            <div className="blog-content">
              {/* Blog Posts Grid */}
              <div id="blogPosts" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {postsToShow.length > 0 ? (
                  postsToShow.map((post, index) => (
                    <article
                      key={post.id}
                      className="animate-card animate bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                      onClick={() => window.location.href = `/post?id=${post.id}`}
                      style={{ transitionDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold capitalize shadow-lg">
                            {formatCategoryName(post.category)}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-3">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                          </svg>
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                          <span className="mx-2">•</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12,6 12,12 16,14"/>
                          </svg>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-green-600 transition-colors group-hover:text-green-600">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="text-green-600 hover:text-green-700 font-semibold flex items-center transition-colors group-hover:translate-x-1">
                          Read More
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-2">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                            <polyline points="12,5 19,12 12,19"/>
                          </svg>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16 opacity-100">
                    <div className="max-w-md mx-auto">
                      <div className="w-24 h-24 bg-white bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <circle cx="11" cy="11" r="8"/>
                          <path d="m21 21-4.35-4.35"/>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">No Articles Found</h3>
                      <p className="text-green-100 mb-6">
                        We couldn't find any articles matching your search criteria.
                        Try adjusting your search terms or browse all categories.
                      </p>
                      <button
                        onClick={clearSearch}
                        className="bg-white hover:bg-gray-100 text-green-600 font-bold py-3 px-6 rounded-lg transition-colors"
                      >
                        Clear Search
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Load More Button */}
              {hasMorePosts && (
                <div className="text-center mt-12">
                  <button
                    onClick={loadMorePosts}
                    className="bg-white hover:bg-gray-100 text-green-600 font-bold py-3 px-8 rounded-xl transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Load More Articles
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <AIButton hideOnPages={['ai']} />
    </div>
  )
}

export default Blog