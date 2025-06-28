import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AIButton from '../components/AIButton'
import { useMetaMask } from '../contexts/MetaMaskContext'

const Blog = () => {
  const [currentCategory, setCurrentCategory] = useState('all')
  const [postsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [allPosts, setAllPosts] = useState([])
  const [postsLoaded, setPostsLoaded] = useState(false)
  const [isConnectedState, setIsConnectedState] = useState(false)
  const { isConnected } = useMetaMask()

  // Popular categories for tags
  const popularCategories = [
    { id: 'blockchain', name: 'Blockchain', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'defi', name: 'DeFi', color: 'bg-purple-500 hover:bg-purple-600' },
    { id: 'smartcontracts', name: 'Smart Contracts', color: 'bg-indigo-500 hover:bg-indigo-600' },
    { id: 'tutorials', name: 'Tutorials', color: 'bg-green-500 hover:bg-green-600' },
    { id: 'nft', name: 'NFT', color: 'bg-pink-500 hover:bg-pink-600' },
    { id: 'dao', name: 'DAO', color: 'bg-yellow-500 hover:bg-yellow-600' }
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

  const switchCategory = (category) => {
    setCurrentCategory(category)
    setCurrentPage(1)
    
    // Add visual feedback for category selection
    const categoryButtons = document.querySelectorAll('.category-tag')
    categoryButtons.forEach(btn => {
      btn.style.transform = 'scale(1)'
    })
    
    const selectedButton = document.querySelector(`[data-category="${category}"]`)
    if (selectedButton) {
      selectedButton.style.transform = 'scale(1.05)'
      setTimeout(() => {
        selectedButton.style.transform = 'scale(1)'
      }, 200)
    }
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
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <img src="https://images.ctfassets.net/clixtyxoaeas/4rnpEzy1ATWRKVBOLxZ1Fm/a74dc1eed36d23d7ea6030383a4d5163/MetaMask-icon-fox.svg" alt="MetaMask" className="w-20 h-20 filter hue-rotate-60 saturate-200" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Wallet Required</h2>
                <p className="text-gray-600 mb-6">
                  You must connect your MetaMask wallet to access the Nolyx Society blog. 
                  This ensures secure access to our exclusive Web3 content.
                </p>
              </div>
              
              <button 
                onClick={() => window.metaMaskConnector?.connect()}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-emerald-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-105"
              >
                Connect MetaMask Wallet
              </button>
              
              <div className="mt-4 text-sm text-gray-500">
                <p>Don't have MetaMask? <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">Download here</a></p>
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
        
        .category-tag {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .category-tag:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        
        .category-tag.active {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }
        
        @media (max-width: 768px) {
          .category-tags-container {
            gap: 0.5rem;
          }
          
          .category-tag {
            font-size: 0.875rem;
            padding: 0.5rem 1rem;
          }
        }
        
        @media (max-width: 480px) {
          .category-tags-container {
            gap: 0.25rem;
          }
          
          .category-tag {
            font-size: 0.75rem;
            padding: 0.375rem 0.75rem;
          }
        }
      `}</style>
      
      <Navbar />
      
      {/* Welcome Header */}
      <section className="hero-section h-96 flex items-center justify-center text-white mt-16">
        <div id="cinzel" className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Nolyx Blog</h1>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="hero-section py-20 bg-gradient-to-br from-green-600 to-emerald-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Section */}
          <section className="sticky top-16 z-20 bg-white shadow-lg mb-8 rounded-lg">
            <div className="bg-white p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Search by name */}
                <div className="relative">
                  <label htmlFor="searchName" className="block text-sm font-medium text-gray-700 mb-1">Search Articles:</label>
                  <input
                    type="text"
                    id="searchName"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors text-gray-700"
                    placeholder="Search by title or content..."
                  />
                  <div className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center pointer-events-none">
                    <i className="fas fa-search text-gray-400"></i>
                  </div>
                </div>

                {/* Search by category */}
                <div className="relative">
                  <label htmlFor="searchCategory" className="block text-sm font-medium text-gray-700 mb-1">Filter by Category:</label>
                  <select
                    id="searchCategory"
                    value={currentCategory}
                    onChange={(e) => switchCategory(e.target.value)}
                    className="w-full text-gray-700 p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
                  >
                    <option value="all">All Categories</option>
                    <option value="blockchain">Blockchain</option>
                    <option value="defi">DeFi</option>
                    <option value="smartcontracts">Smart Contracts</option>
                    <option value="tutorials">Tutorials</option>
                    <option value="nft">NFT</option>
                    <option value="dao">DAO</option>
                  </select>
                </div>
              </div>

              {/* Popular Category Tags */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">Popular Categories:</h3>
                  <span className="text-xs text-gray-500">Click to filter</span>
                </div>
                <div className="category-tags-container flex flex-wrap gap-2">
                  <button
                    onClick={() => switchCategory('all')}
                    data-category="all"
                    className={`category-tag px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      currentCategory === 'all'
                        ? 'bg-gray-800 text-white active'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    All
                  </button>
                  {popularCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => switchCategory(category.id)}
                      data-category={category.id}
                      className={`category-tag px-3 py-1.5 rounded-full text-sm font-medium text-white transition-all duration-300 ${
                        currentCategory === category.id
                          ? `${category.color} active ring-2 ring-offset-2 ring-gray-400`
                          : `${category.color}`
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <div className="text-center mb-16">
            <h2 className="animate-title text-3xl md:text-4xl font-bold text-white mb-8">
              Popular Categories
            </h2>
            <div className="animate-content flex flex-wrap justify-center gap-4 mb-12">
              {['blockchain', 'defi', 'smartcontracts', 'tutorials'].map((category) => (
                <button
                  key={category}
                  onClick={() => switchCategory(category)}
                  className={`category-btn px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    currentCategory === category
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-green-600 hover:text-white'
                  }`}
                >
                  {formatCategoryName(category)}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div id="blogPosts" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsToShow.length > 0 ? (
              postsToShow.map((post, index) => (
                <article
                  key={post.id}
                  className="animate-card animate bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => window.location.href = `/post?id=${post.id}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
                        {formatCategoryName(post.category)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <i className="fas fa-calendar mr-2"></i>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <i className="fas fa-clock mr-2"></i>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-green-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="text-green-600 hover:text-green-700 font-semibold flex items-center transition-colors">
                      Read More
                      <i className="fas fa-arrow-right ml-2"></i>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-16 opacity-100">
                <div className="max-w-md mx-auto">
                  <i className="fas fa-search text-6xl text-gray-300 mb-6"></i>
                  <h3 className="text-2xl font-bold text-gray-600 mb-4">No Articles Found</h3>
                  <p className="text-gray-500 mb-6">
                    We couldn't find any articles matching your search criteria.
                    Try adjusting your search terms or browse all categories.
                  </p>
                  <button
                    onClick={clearSearch}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
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
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-colors duration-300"
              >
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </section>

      <AIButton hideOnPages={['ai']} />
    </div>
  )
}

export default Blog