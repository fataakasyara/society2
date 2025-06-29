import React, { useEffect, useRef, useState } from 'react'

const InteractiveMetaMaskLogo = ({ 
  width = 120, 
  height = 120, 
  followMouse = true, 
  slowDrift = false,
  className = "",
  style = {}
}) => {
  const containerRef = useRef(null)
  const viewerRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let viewer = null

    const initializeMetaMaskLogo = async () => {
      try {
        // Dynamic import to handle potential loading issues
        const ModelViewer = await import('@metamask/logo')
        const MetaMaskLogo = ModelViewer.default || ModelViewer

        if (!containerRef.current) return

        // Clear any existing content safely
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild)
        }

        // Create MetaMask logo viewer
        viewer = MetaMaskLogo({
          pxNotRatio: true,
          width: width,
          height: height,
          followMouse: followMouse,
          slowDrift: slowDrift,
        })

        // Add viewer to container
        if (viewer && viewer.container) {
          containerRef.current.appendChild(viewer.container)
          viewerRef.current = viewer
          setIsLoaded(true)
          setError(null)

          // Enable mouse follow if specified
          if (followMouse) {
            viewer.setFollowMouse(true)
          }

          console.log('✅ MetaMask interactive logo loaded successfully')
        }
      } catch (err) {
        console.error('❌ Failed to load MetaMask logo:', err)
        setError(err.message)
        setIsLoaded(false)
      }
    }

    initializeMetaMaskLogo()

    // Cleanup function
    return () => {
      if (viewer && viewer.stopAnimation) {
        try {
          viewer.stopAnimation()
        } catch (err) {
          console.warn('Warning during MetaMask logo cleanup:', err)
        }
      }
      
      // Safe cleanup of DOM elements
      if (containerRef.current && viewerRef.current && viewerRef.current.container) {
        try {
          // Only remove if the container is still a child of the parent
          if (containerRef.current.contains(viewerRef.current.container)) {
            containerRef.current.removeChild(viewerRef.current.container)
          }
        } catch (err) {
          console.warn('Warning during DOM cleanup:', err)
        }
      }
      
      // Reset refs
      viewerRef.current = null
    }
  }, [width, height, followMouse, slowDrift])

  // Method to enable/disable mouse following
  const setFollowMouse = (enabled) => {
    if (viewerRef.current && viewerRef.current.setFollowMouse) {
      viewerRef.current.setFollowMouse(enabled)
    }
  }

  // Method to look at specific coordinates
  const lookAt = (x, y) => {
    if (viewerRef.current && viewerRef.current.lookAt) {
      viewerRef.current.lookAt({ x, y })
    }
  }

  // Fallback static image if 3D logo fails to load
  const renderFallback = () => (
    <img 
      src="https://images.ctfassets.net/clixtyxoaeas/4rnpEzy1ATWRKVBOLxZ1Fm/a74dc1eed36d23d7ea6030383a4d5163/MetaMask-icon-fox.svg" 
      alt="MetaMask Fox" 
      style={{
        width: `${width}px`,
        height: `${height}px`,
        filter: 'hue-rotate(60deg) saturate(200%)',
        ...style
      }}
      className={className}
    />
  )

  if (error) {
    console.warn('Using fallback MetaMask logo due to error:', error)
    return renderFallback()
  }

  return (
    <div 
      ref={containerRef}
      className={`metamask-logo-container ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style
      }}
    >
      {!isLoaded && (
        <div className="flex items-center justify-center w-full h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      )}
    </div>
  )
}

export default InteractiveMetaMaskLogo