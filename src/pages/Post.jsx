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

  useEffect(() => {
    loadPostsData()
  }, [])

  useEffect(() => {
    if (allPosts.length > 0) {
      loadPost()
    }
  }, [allPosts, searchParams])

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
      alert('Link copied to clipboard!')
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
        
        <main className="pt-20 min-h-screen">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-white text-lg">Loading article...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !currentPost) {
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
        
        <main className="pt-20 min-h-screen">
          <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-md mx-auto px-4 text-center">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-exclamation-triangle text-3xl text-red-500"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h2>
                  <p className="text-gray-600 mb-6">
                    The article you're looking for doesn't exist or has been removed.
                  </p>
                </div>
                
                <Link 
                  to="/blog" 
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-105"
                >
                  <i className="fas fa-arrow-left mr-3"></i>
                  Back to Blog
                </Link>
              </div>
            </div>
          </div>
        </main>
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
      
      <main className="pt-20 min-h-screen">
        {/* Breadcrumb */}
        <section className="bg-white py-4 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
              <Link to="/blog" className="hover:text-green-600 transition-colors">Blog</Link>
              <i className="fas fa-chevron-right text-xs"></i>
              <span className="text-gray-800 font-medium">{currentPost.title}</span>
            </nav>
          </div>
        </section>

        {/* Article Header */}
        <section className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="mb-4">
                <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  {formatCategoryName(currentPost.category)}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">{currentPost.title}</h1>
              
              {/* Article Meta */}
              <div className="flex items-center justify-center space-x-6 text-gray-600 mb-8">
                <div className="flex items-center">
                  <i className="fas fa-calendar mr-2"></i>
                  <span>{new Date(currentPost.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-clock mr-2"></i>
                  <span>{currentPost.readTime}</span>
                </div>
                <div className="flex items-center">
                  <img src={currentPost.author.avatar} alt="Author" className="w-8 h-8 rounded-full mr-2" />
                  <span>{currentPost.author.name}</span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="mb-8">
                <img src={currentPost.image} alt={currentPost.title} className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg" />
              </div>

              {/* Social Share */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                <span className="text-gray-600 font-medium">Share:</span>
                <button onClick={shareOnTwitter} className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors">
                  <i className="fab fa-twitter"></i>
                </button>
                <button onClick={shareOnLinkedIn} className="bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-full transition-colors">
                  <i className="fab fa-linkedin"></i>
                </button>
                <button onClick={shareOnFacebook} className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors">
                  <i className="fab fa-facebook"></i>
                </button>
                <button onClick={copyLink} className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full transition-colors">
                  <i className="fas fa-link"></i>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="bg-white py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="post-content prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: currentPost.content }}>
            </div>

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
              <div className="flex items-start space-x-4">
                <img src={currentPost.author.avatar} alt="Author" className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{currentPost.author.name}</h3>
                  <p className="text-gray-600">{currentPost.author.bio}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-12 flex justify-between items-center">
              <Link 
                to="/blog" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Back to Blog
              </Link>
              
              <div className="flex space-x-4">
                <button 
                  onClick={shareArticle}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center"
                >
                  <i className="fas fa-share mr-2"></i>
                  Share Article
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <article 
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer" 
                  onClick={() => window.location.href = `/post?id=${post.id}`}
                >
                  <div className="relative">
                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
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
                    <h3 className="text-lg font-bold text-gray-800 mb-3 hover:text-green-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{post.excerpt.substring(0, 100)}...</p>
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