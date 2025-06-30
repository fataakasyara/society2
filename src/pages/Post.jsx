import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AIButton from '../components/AIButton'
import { extractIdFromSlug, createFullSlug, generateMetaTitle, generateMetaDescription } from '../utils/slugUtils'

const Post = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
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
  }, [allPosts, slug])

  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('.article-content')
      if (article) {
        const scrollTop = window.scrollY
        const docHeight = article.offsetHeight
        const winHeight = window.innerHeight
        const scrollPercent = scrollTop / (docHeight - winHeight)
        const scrollPercentRounded = Math.round(scrollPercent * 100)
        setReadingProgress(Math.min(100, Math.max(0, scrollPercentRounded)))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentPost])

  const loadPostsData = async () => {
    try {
      console.log('Loading posts data from API...')
      const response = await fetch('https://api.jsonbin.io/v3/b/6860da6b8a456b7966b7bfb0')

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
    // Extract ID from slug
    const postId = extractIdFromSlug(slug)
    
    console.log('Slug from URL:', slug, 'Extracted ID:', postId)

    if (!postId) {
      console.error('No valid post ID found in slug:', slug)
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

    // Check if current URL matches the correct slug format
    const correctSlug = createFullSlug(post.title, post.id)
    if (slug !== correctSlug) {
      // Redirect to correct URL for SEO
      console.log('Redirecting to correct slug:', correctSlug)
      navigate(`/post/${correctSlug}`, { replace: true })
      return
    }

    setCurrentPost(post)
    loadRelatedPosts(post)
    setLoading(false)

    // Update page title and meta for SEO
    document.title = generateMetaTitle(post.title)
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', generateMetaDescription(post.excerpt))
    } else {
      const newMetaDescription = document.createElement('meta')
      newMetaDescription.name = 'description'
      newMetaDescription.content = generateMetaDescription(post.excerpt)
      document.head.appendChild(newMetaDescription)
    }

    // Update Open Graph meta tags
    updateOpenGraphMeta(post)
  }

  const updateOpenGraphMeta = (post) => {
    const ogTags = [
      { property: 'og:title', content: post.title },
      { property: 'og:description', content: generateMetaDescription(post.excerpt) },
      { property: 'og:image', content: post.image },
      { property: 'og:url', content: window.location.href },
      { property: 'og:type', content: 'article' },
      { property: 'article:author', content: post.author.name },
      { property: 'article:published_time', content: post.date },
      { property: 'article:section', content: post.category }
    ]

    ogTags.forEach(({ property, content }) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`)
      if (metaTag) {
        metaTag.setAttribute('content', content)
      } else {
        metaTag = document.createElement('meta')
        metaTag.setAttribute('property', property)
        metaTag.setAttribute('content', content)
        document.head.appendChild(metaTag)
      }
    })
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
      // Show toast notification
      const toast = document.createElement('div')
      toast.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300'
      toast.textContent = 'Link copied to clipboard!'
      document.body.appendChild(toast)
      setTimeout(() => {
        toast.style.transform = 'translateY(100px)'
        setTimeout(() => document.body.removeChild(toast), 300)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  // Share Now function - now just copies link
  const shareNow = async () => {
    // Try native share first (mobile devices)
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentPost.title,
          text: currentPost.excerpt,
          url: window.location.href
        })
        return
      } catch (err) {
        // If native share fails or is cancelled, fall back to copy link
        console.log('Native share cancelled or failed, copying link instead')
      }
    }
    
    // Fallback to copy link
    await copyLink()
  }

  // Render sections content based on new structure
  const renderSectionContent = (section) => {
    if (section.content) {
      // Simple content section
      return (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.heading}</h2>
          <p className="text-gray-700 leading-relaxed">{section.content}</p>
        </div>
      )
    }

    if (section.points) {
      // Points list section
      return (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.heading}</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            {section.points.map((point, index) => (
              <li key={index} className="leading-relaxed">{point}</li>
            ))}
          </ol>
        </div>
      )
    }

    if (section.bullets) {
      // Bullet list section
      return (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.heading}</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {section.bullets.map((bullet, index) => (
              <li key={index} className="leading-relaxed">{bullet}</li>
            ))}
          </ul>
        </div>
      )
    }

    if (section.steps) {
      // Steps list section
      return (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.heading}</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            {section.steps.map((step, index) => (
              <li key={index} className="leading-relaxed font-medium">{step}</li>
            ))}
          </ol>
        </div>
      )
    }

    return null
  }

  // Generate structured data for SEO
  const generateStructuredData = () => {
    if (!currentPost) return null

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": currentPost.title,
      "description": currentPost.excerpt,
      "image": currentPost.image,
      "author": {
        "@type": "Person",
        "name": currentPost.author.name
      },
      "publisher": {
        "@type": "Organization",
        "name": "Nolyx Society",
        "logo": {
          "@type": "ImageObject",
          "url": "https://nolyx.sytes.net/gambar/nolyxnew.png"
        }
      },
      "datePublished": currentPost.date,
      "dateModified": currentPost.date,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      }
    }

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="pt-20">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
                <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-green-400 animate-ping mx-auto"></div>
              </div>
              <p className="text-gray-600 text-lg font-medium">Loading article...</p>
              <p className="text-gray-400 text-sm mt-2">Please wait while we fetch the content</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !currentPost) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="pt-20">
          <div className="flex items-center justify-center min-h-screen">
            <div className="max-w-md mx-auto px-4 text-center">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Article Not Found</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
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
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data for SEO */}
      {generateStructuredData()}
      
      <Navbar />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-16 left-0 w-full h-1 bg-gray-200 z-40">
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.3) 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
              <Link to="/blog" className="hover:text-green-600 transition-colors font-medium">Blog</Link>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-800 font-medium truncate">{currentPost.title}</span>
            </nav>

            {/* Category Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {formatCategoryName(currentPost.category)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {currentPost.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl">
              {currentPost.excerpt}
            </p>
            
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center">
                <img 
                  src={currentPost.author.avatar} 
                  alt="Author" 
                  className="w-12 h-12 rounded-full border-2 border-white shadow-lg mr-3" 
                />
                <div>
                  <p className="font-semibold text-gray-900">{currentPost.author.name}</p>
                  <p className="text-sm text-gray-500">Author</p>
                </div>
              </div>
              
              <div className="h-8 w-px bg-gray-300"></div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">{new Date(currentPost.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{currentPost.readTime}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12">
              <img 
                src={currentPost.image} 
                alt={currentPost.title} 
                className="w-full h-64 md:h-96 lg:h-[500px] object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Main Content */}
              <article className="lg:col-span-8 article-content">
                <div className="prose prose-lg prose-green max-w-none">
                  {/* Render sections based on new structure */}
                  {currentPost.sections && currentPost.sections.map((section, index) => (
                    <div key={index}>
                      {renderSectionContent(section)}
                    </div>
                  ))}
                </div>

                {/* Author Bio */}
                <div className="mt-12 p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                  <div className="flex items-start space-x-6">
                    <img 
                      src={currentPost.author.avatar} 
                      alt="Author" 
                      className="w-20 h-20 rounded-full border-4 border-white shadow-lg" 
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentPost.author.name}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{currentPost.author.bio}</p>
                      <div className="flex space-x-4">
                        <a href="#" className="text-green-600 hover:text-green-700 transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        </a>
                        <a href="#" className="text-green-600 hover:text-green-700 transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <div className="sticky top-24 space-y-8">
                  {/* Share Article */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share Article
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">Found this article helpful? Share it with your network!</p>
                    
                    {/* Social Share Buttons - Logo only */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <button 
                        onClick={shareOnTwitter}
                        className="flex items-center justify-center p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                        title="Share on Twitter"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </button>
                      
                      <button 
                        onClick={shareOnLinkedIn}
                        className="flex items-center justify-center p-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg transition-colors"
                        title="Share on LinkedIn"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </button>
                      
                      <button 
                        onClick={shareOnFacebook}
                        className="flex items-center justify-center p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        title="Share on Facebook"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </button>
                    </div>
                    
                    {/* Share Now Button - Now copies link */}
                    <button 
                      onClick={shareNow}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Share Now
                    </button>
                  </div>

                  {/* Newsletter Signup */}
                  <div className="bg-gray-900 text-white rounded-2xl p-6">
                    <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                    <p className="text-gray-300 text-sm mb-4">Get the latest Web3 insights delivered to your inbox.</p>
                    <div className="space-y-3">
                      <input 
                        type="email" 
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
                      />
                      <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            {/* Navigation */}
            <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link 
                to="/blog" 
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors flex items-center group"
              >
                <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Blog
              </Link>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Reading progress:</span>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${readingProgress}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700">{readingProgress}%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Continue Reading</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Explore more articles that might interest you</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <article 
                  key={post.id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100" 
                  onClick={() => window.location.href = `/post/${createFullSlug(post.title, post.id)}`}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {formatCategoryName(post.category)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="flex items-center text-green-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                      Read Article
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
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