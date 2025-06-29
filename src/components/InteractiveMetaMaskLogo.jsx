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
  const svgRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [containerBounds, setContainerBounds] = useState(null)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    const updateContainerBounds = () => {
      if (containerRef.current) {
        const bounds = containerRef.current.getBoundingClientRect()
        setContainerBounds(bounds)
      }
    }

    updateContainerBounds()
    window.addEventListener('resize', updateContainerBounds)

    return () => {
      window.removeEventListener('resize', updateContainerBounds)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!followMouse || !containerBounds) return

    const handleMouseMove = (e) => {
      const centerX = containerBounds.left + containerBounds.width / 2
      const centerY = containerBounds.top + containerBounds.height / 2
      
      // Calculate relative position from center (-1 to 1)
      const relativeX = (e.clientX - centerX) / (containerBounds.width / 2)
      const relativeY = (e.clientY - centerY) / (containerBounds.height / 2)
      
      // Limit the range and add some smoothing
      const maxRotation = 15 // degrees
      const rotationX = Math.max(-maxRotation, Math.min(maxRotation, relativeY * maxRotation))
      const rotationY = Math.max(-maxRotation, Math.min(maxRotation, relativeX * maxRotation))
      
      setMousePosition({ x: rotationY, y: -rotationX })
    }

    document.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [followMouse, containerBounds])

  useEffect(() => {
    if (!slowDrift || followMouse) return

    let startTime = Date.now()
    
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000
      const rotationX = Math.sin(elapsed * 0.5) * 3
      const rotationY = Math.cos(elapsed * 0.3) * 3
      
      setMousePosition({ x: rotationY, y: rotationX })
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    
    animationFrameRef.current = requestAnimationFrame(animate)
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [slowDrift, followMouse])

  const svgTransform = followMouse || slowDrift 
    ? `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
    : 'none'

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
        perspective: '1000px',
        ...style
      }}
    >
      <div
        ref={svgRef}
        style={{
          transform: svgTransform,
          transition: followMouse ? 'transform 0.1s ease-out' : 'transform 0.3s ease-in-out',
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg 
          width={width} 
          height={height} 
          viewBox="0 0 521 521" 
          version="1.1" 
          baseProfile="full" 
          xmlns="http://www.w3.org/2000/svg" 
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
            maxWidth: '100%',
            maxHeight: '100%'
          }}
        >
          <defs>
            <linearGradient x1="50%" x2="50%" y1="20.232164948453608%" y2="74.87123711340206%" id="forehead-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#23FE4A"></stop>
              <stop offset="1" stopColor="#BAD8EF"></stop>
            </linearGradient>
            <linearGradient x1="77.19501199040768%" x2="77.19501199040768%" y1="44.68123711340206%" y2="68.2861855670103%" id="right-upper-cheek-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#20B475"></stop>
              <stop offset="1" stopColor="#70BDCE"></stop>
            </linearGradient>
            <linearGradient x1="22.820719424460435%" x2="22.820719424460435%" y1="44.68123711340206%" y2="68.2861855670103%" id="left-upper-cheek-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#20B475"></stop>
              <stop offset="1" stopColor="#70BDCE"></stop>
            </linearGradient>
            <linearGradient x1="54.34676258992806%" x2="65.3001438848921%" y1="68.26917525773197%" y2="68.26917525773197%" id="right-below-eye-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#85BBE1"></stop>
              <stop offset="1" stopColor="#7CCACA"></stop>
            </linearGradient>
            <linearGradient x1="34.731223021582736%" x2="45.65323741007194%" y1="68.26917525773197%" y2="68.26917525773197%" id="left-below-eye-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#7CCACA"></stop>
              <stop offset="1" stopColor="#85BBE1"></stop>
            </linearGradient>
            <linearGradient x1="61.443549160671466%" x2="93.802206235012%" y1="44.51773195876289%" y2="24.439072164948456%" id="right-ear-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#074F1E"></stop>
              <stop offset="0.4286" stopColor="#05541C"></stop>
              <stop offset="0.62" stopColor="#006A13"></stop>
              <stop offset="1" stopColor="#007514"></stop>
            </linearGradient>
            <linearGradient x1="32.7432134292566%" x2="4.853390887290168%" y1="44.33329896907217%" y2="19.18181443298969%" id="left-ear-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#074F1E"></stop>
              <stop offset="0.4286" stopColor="#05541C"></stop>
              <stop offset="0.62" stopColor="#006A13"></stop>
              <stop offset="1" stopColor="#007514"></stop>
            </linearGradient>
            <linearGradient x1="27.575539568345324%" x2="34.982350119904076%" y1="60.519278350515464%" y2="60.519278350515464%" id="left-outer-eye-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#43C3A2"></stop>
              <stop offset="1" stopColor="#4FAFC0"></stop>
            </linearGradient>
            <linearGradient x1="65.01764988009592%" x2="72.42446043165468%" y1="60.519278350515464%" y2="60.519278350515464%" id="right-outer-eye-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4FAFC0"></stop>
              <stop offset="1" stopColor="#43C3A2"></stop>
            </linearGradient>
            <linearGradient x1="77.93247002398083%" x2="77.93247002398083%" y1="68.15113402061857%" y2="86.82577319587631%" id="right-lower-cheek-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#59ADCB"></stop>
              <stop offset="1" stopColor="#436CC8"></stop>
            </linearGradient>
            <linearGradient x1="22.083165467625896%" x2="22.083165467625896%" y1="68.15113402061857%" y2="86.82577319587631%" id="left-lower-cheek-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#59ADCB"></stop>
              <stop offset="1" stopColor="#436CC8"></stop>
            </linearGradient>
            <linearGradient x1="13.954513189448441%" x2="44.146762589928066%" y1="22.055670103092787%" y2="22.055670103092787%" id="left-top-ear-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0ED54A"></stop>
              <stop offset="1" stopColor="#0ED54A"></stop>
            </linearGradient>
            <linearGradient x1="55.85333333333334%" x2="86.04556354916068%" y1="22.055670103092787%" y2="22.055670103092787%" id="right-top-ear-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0ED54A"></stop>
              <stop offset="1" stopColor="#11EB36"></stop>
            </linearGradient>
            <linearGradient x1="36.3947242206235%" x2="36.3947242206235%" y1="34.11144329896908%" y2="53.59649484536083%" id="left-forehead-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#15DC5D"></stop>
              <stop offset="1" stopColor="#48CA9F"></stop>
            </linearGradient>
            <linearGradient x1="63.6052757793765%" x2="63.6052757793765%" y1="34.11144329896908%" y2="53.59649484536083%" id="right-forehead-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#15DC5D"></stop>
              <stop offset="1" stopColor="#48CA9F"></stop>
            </linearGradient>
            <linearGradient x1="38.829736211031175%" x2="38.829736211031175%" y1="68.28865979381443%" y2="81.55670103092784%" id="left-upper-snout-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#54A8CF"></stop>
              <stop offset="1" stopColor="#5393E3"></stop>
            </linearGradient>
            <linearGradient x1="61.17026378896883%" x2="61.17026378896883%" y1="68.28865979381443%" y2="81.55670103092784%" id="right-upper-snout-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#54A8CF"></stop>
              <stop offset="1" stopColor="#5393E3"></stop>
            </linearGradient>
            <linearGradient x1="69.9137649880096%" x2="69.9137649880096%" y1="51.063505154639174%" y2="85.81041237113402%" id="right-middle-cheek-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#32819D"></stop>
              <stop offset="0.3363" stopColor="#447DCD"></stop>
            </linearGradient>
            <linearGradient x1="30.086330935251798%" x2="30.086330935251798%" y1="68.15092783505153%" y2="81.55752577319588%" id="left-middle-cheek-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#32819D"></stop>
              <stop offset="0.3363" stopColor="#447DCD"></stop>
            </linearGradient>
            <linearGradient x1="55.38244604316547%" x2="55.38244604316547%" y1="74.87123711340206%" y2="53.59659793814433%" id="right-inner-eye-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#53A9CB"></stop>
              <stop offset="1" stopColor="#44C0A6"></stop>
            </linearGradient>
            <linearGradient x1="43.58177458033573%" x2="45.65323741007194%" y1="64.2339175257732%" y2="64.2339175257732%" id="left-inner-eye-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#53A9CB"></stop>
              <stop offset="1" stopColor="#44C0A6"></stop>
            </linearGradient>
            <linearGradient x1="50%" x2="50%" y1="0%" y2="100%" id="back-gradient" gradientUnits="userSpaceOnUse">
              <stop stopColor="#27FC4E"></stop>
              <stop offset="1" stopColor="#446FC9"></stop>
            </linearGradient>
          </defs>
          
          {/* All the polygon paths from your SVG */}
          <polygon fill="url('#right-lower-cheek-gradient')" stroke="url('#right-lower-cheek-gradient')" points="528.861946105957,225.82504823803902 510.43886947631836,288.78758347034454 452.43332862854004,272.57900363206863"></polygon>
          <polygon fill="url('#right-ear-gradient')" stroke="url('#right-ear-gradient')" points="471.7273120880127,141.67650282382965 523.3724784851074,120.2579430937767 520.5106658935547,131.61521196365356"></polygon>
          <polygon fill="url('#right-ear-gradient')" stroke="url('#right-ear-gradient')" points="518.5441017150879,145.27001005411148 511.39283752441406,164.61053313314915 471.7273120880127,141.67650282382965"></polygon>
          <polygon fill="url('#right-ear-gradient')" stroke="url('#right-ear-gradient')" points="518.5441017150879,145.27001005411148 471.7273120880127,141.67650282382965 520.5106658935547,131.61521196365356"></polygon>
          <polygon fill="url('#right-ear-gradient')" stroke="url('#right-ear-gradient')" points="511.39283752441406,164.61053313314915 452.8677406311035,147.1365491449833 471.7273120880127,141.67650282382965"></polygon>
          <polygon fill="url('#right-ear-gradient')" stroke="url('#right-ear-gradient')" points="523.3724784851074,120.2579430937767 471.7273120880127,141.67650282382965 474.2717170715332,82.69873940944672"></polygon>
          <polygon fill="url('#right-ear-gradient')" stroke="url('#right-ear-gradient')" points="474.2717170715332,82.69873940944672 471.7273120880127,141.67650282382965 452.8677406311035,147.1365491449833"></polygon>
          <polygon fill="url('#right-lower-cheek-gradient')" stroke="url('#right-lower-cheek-gradient')" points="452.43332862854004,272.57900363206863 484.3688049316406,226.29352650046349 528.861946105957,225.82504823803902"></polygon>
          <polygon fill="url('#right-upper-cheek-gradient')" stroke="url('#right-upper-cheek-gradient')" points="475.73525619506836,174.39236342906952 511.39283752441406,164.61053313314915 528.861946105957,225.82504823803902"></polygon>
          <polygon fill="url('#right-upper-cheek-gradient')" stroke="url('#right-upper-cheek-gradient')" points="475.73525619506836,174.39236342906952 528.861946105957,225.82504823803902 484.3688049316406,226.29352650046349"></polygon>
          <polygon fill="url('#forehead-gradient')" stroke="url('#forehead-gradient')" points="347.5928792953491,61.668566823005676 425.8591146469116,63.50758171081543 413.1340055465698,110.60492926836014"></polygon>
          <polygon fill="url('#right-top-ear-gradient')" stroke="url('#right-top-ear-gradient')" points="523.0735816955566,31.315898656845093 413.1340055465698,110.60492926836014 425.8591146469116,63.50758171081543"></polygon>
          <polygon fill="url('#right-ear-gradient')" stroke="url('#right-ear-gradient')" points="511.39283752441406,164.61053313314915 518.5441017150879,145.27001005411148 524.2487525939941,149.40564292669296"></polygon>
          <polygon fill="url('#right-ear-gradient')" stroke="url('#right-ear-gradient')" points="529.5391273498535,124.81883019208908 520.5106658935547,131.61521196365356 523.3724784851074,120.2579430937767"></polygon>
          <polygon fill="url('#right-ear-gradient')" stroke="url('#right-ear-gradient')" points="518.5441017150879,145.27001005411148 520.5106658935547,131.61521196365356 527.4862976074219,137.0727550983429"></polygon>
          <polygon fill="url('#forehead-gradient')" stroke="url('#forehead-gradient')" points="413.1340055465698,110.60492926836014 370.0810761451721,110.07577246427536 347.5928792953491,61.668566823005676"></polygon>
          <polygon fill="url('#right-ear-gradient')" stroke="url('#right-ear-gradient')" points="474.2717170715332,82.69873940944672 534.3300819396973,74.40483379364014 523.3724784851074,120.2579430937767"></polygon>
          <polygon fill="url('#left-lower-cheek-gradient')" stroke="url('#left-lower-cheek-gradient')" points="330.64503479003906,275.77580869197845 256.6731605529785,296.53751385211945 237.81383514404297,230.2988716363907"></polygon>
          <polygon fill="url('#right-ear-gradient')" stroke="url('#right-ear-gradient')" points="452.8677406311035,147.1365491449833 413.1340055465698,110.60492926836014 474.2717170715332,82.69873940944672"></polygon>
          <polygon fill="url('#left-ear-gradient')" stroke="url('#left-ear-gradient')" points="261.08044052124023,164.732977733016 300.40306091308594,140.8174867928028 323.95947074890137,146.6611064374447"></polygon>
          <polygon fill="url('#left-ear-gradient')" stroke="url('#left-ear-gradient')" points="253.21968841552734,144.15576392412186 300.40306091308594,140.8174867928028 261.08044052124023,164.732977733016"></polygon>
          <polygon fill="url('#left-ear-gradient')" stroke="url('#left-ear-gradient')" points="253.21968841552734,144.15576392412186 250.82274627685547,129.58875370025635 300.40306091308594,140.8174867928028"></polygon>
          <polygon fill="url('#right-upper-cheek-gradient')" stroke="url('#right-upper-cheek-gradient')" points="511.39283752441406,164.61053313314915 475.73525619506836,174.39236342906952 452.8677406311035,147.1365491449833"></polygon>
          <polygon fill="url('#left-ear-gradient')" stroke="url('#left-ear-gradient')" points="300.40306091308594,140.8174867928028 250.82274627685547,129.58875370025635 247.5567283630371,117.423554956913"></polygon>
          <polygon fill="url('#left-ear-gradient')" stroke="url('#left-ear-gradient')" points="305.0085639953613,79.45467483997345 300.40306091308594,140.8174867928028 247.5567283630371,117.423554956913"></polygon>
          <polygon fill="url('#left-ear-gradient')" stroke="url('#left-ear-gradient')" points="323.95947074890137,146.6611064374447 300.40306091308594,140.8174867928028 305.0085639953613,79.45467483997345"></polygon>
          <polygon fill="url('#left-top-ear-gradient')" stroke="url('#left-top-ear-gradient')" points="370.0810761451721,110.07577246427536 257.4111557006836,22.850431203842163 347.5928792953491,61.668566823005676"></polygon>
          <polygon fill="url('#right-forehead-gradient')" stroke="url('#right-forehead-gradient')" points="452.8677406311035,147.1365491449833 475.73525619506836,174.39236342906952 414.40619373321533,177.3363788612187"></polygon>
          <polygon fill="url('#right-forehead-gradient')" stroke="url('#right-forehead-gradient')" points="414.40619373321533,177.3363788612187 413.1340055465698,110.60492926836014 452.8677406311035,147.1365491449833"></polygon>
          <polygon fill="url('#left-ear-gradient')" stroke="url('#left-ear-gradient')" points="305.0085639953613,79.45467483997345 370.0810761451721,110.07577246427536 323.95947074890137,146.6611064374447"></polygon>
          <polygon fill="url('#left-upper-cheek-gradient')" stroke="url('#left-upper-cheek-gradient')" points="310.56833839416504,174.86019148677588 237.81383514404297,230.2988716363907 261.08044052124023,164.732977733016"></polygon>
          <polygon fill="url('#left-lower-cheek-gradient')" stroke="url('#left-lower-cheek-gradient')" points="237.81383514404297,230.2988716363907 301.5899906158447,229.09362667798996 330.64503479003906,275.77580869197845"></polygon>
          <polygon fill="url('#left-upper-cheek-gradient')" stroke="url('#left-upper-cheek-gradient')" points="301.5899906158447,229.09362667798996 237.81383514404297,230.2988716363907 310.56833839416504,174.86019148677588"></polygon>
          <polygon fill="url('#right-ear-gradient')" stroke="url('#right-ear-gradient')" points="523.0735816955566,31.315898656845093 534.3300819396973,74.40483379364014 474.2717170715332,82.69873940944672"></polygon>
          <polygon fill="url('#right-ear-gradient')" stroke="url('#right-ear-gradient')" points="474.2717170715332,82.69873940944672 413.1340055465698,110.60492926836014 523.0735816955566,31.315898656845093"></polygon>
          <polygon fill="url('#left-upper-cheek-gradient')" stroke="url('#left-upper-cheek-gradient')" points="261.08044052124023,164.732977733016 323.95947074890137,146.6611064374447 310.56833839416504,174.86019148677588"></polygon>
          <polygon fill="url('#left-ear-gradient')" stroke="url('#left-ear-gradient')" points="261.08044052124023,164.732977733016 247.43974685668945,148.51951763033867 253.21968841552734,144.15576392412186"></polygon>
          <polygon fill="url('#left-forehead-gradient')" stroke="url('#left-forehead-gradient')" points="323.95947074890137,146.6611064374447 370.0810761451721,110.07577246427536 379.1654977798462,177.45928552001715"></polygon>
          <polygon fill="url('#left-forehead-gradient')" stroke="url('#left-forehead-gradient')" points="379.1654977798462,177.45928552001715 310.56833839416504,174.86019148677588 323.95947074890137,146.6611064374447"></polygon>
          <polygon fill="url('#left-ear-gradient')" stroke="url('#left-ear-gradient')" points="253.21968841552734,144.15576392412186 243.74649810791016,135.3133865594864 250.82274627685547,129.58875370025635"></polygon>
          <polygon fill="url('#left-ear-gradient')" stroke="url('#left-ear-gradient')" points="241.2777442932129,122.1717444062233 247.5567283630371,117.423554956913 250.82274627685547,129.58875370025635"></polygon>
          <polygon fill="url('#right-middle-cheek-gradient')" stroke="url('#right-middle-cheek-gradient')" points="452.43332862854004,272.57900363206863 451.4420700073242,227.22753778100014 484.3688049316406,226.29352650046349"></polygon>
          <polygon fill="url('#left-ear-gradient')" stroke="url('#left-ear-gradient')" points="247.5567283630371,117.423554956913 239.21353912353516,68.07024788856506 305.0085639953613,79.45467483997345"></polygon>
          <polygon fill="url('#forehead-gradient')" stroke="url('#forehead-gradient')" points="370.0810761451721,110.07577246427536 413.1340055465698,110.60492926836014 414.40619373321533,177.3363788612187"></polygon>
          <polygon fill="url('#left-ear-gradient')" stroke="url('#left-ear-gradient')" points="257.4111557006836,22.850431203842163 370.0810761451721,110.07577246427536 305.0085639953613,79.45467483997345"></polygon>
          <polygon fill="url('#forehead-gradient')" stroke="url('#forehead-gradient')" points="414.40619373321533,177.3363788612187 379.1654977798462,177.45928552001715 370.0810761451721,110.07577246427536"></polygon>
          <polygon fill="url('#left-ear-gradient')" stroke="url('#left-ear-gradient')" points="305.0085639953613,79.45467483997345 239.21353912353516,68.07024788856506 257.4111557006836,22.850431203842163"></polygon>
          <polygon fill="url('#left-middle-cheek-gradient')" stroke="url('#left-middle-cheek-gradient')" points="330.64503479003906,275.77580869197845 301.5899906158447,229.09362667798996 340.78569316864014,228.93409532308578"></polygon>
          <polygon fill="rgb(192,173,158)" stroke="rgb(192,173,158)" points="429.4783229827881,290.28825867176056 452.43332862854004,272.57900363206863 442.9101104736328,283.11892652511597"></polygon>
          <polygon fill="url('#right-upper-cheek-gradient')" stroke="url('#right-upper-cheek-gradient')" points="484.3688049316406,226.29352650046349 451.4420700073242,227.22753778100014 475.73525619506836,174.39236342906952"></polygon>
          <polygon fill="url('#right-outer-eye-gradient')" stroke="url('#right-outer-eye-gradient')" points="475.73525619506836,174.39236342906952 451.4420700073242,227.22753778100014 451.7424774169922,200.92404763400555"></polygon>
          <polygon fill="rgb(35,151,119)" stroke="rgb(35,151,119)" points="414.40619373321533,177.3363788612187 475.73525619506836,174.39236342906952 451.7424774169922,200.92404763400555"></polygon>
          <polygon fill="rgb(215,193,179)" stroke="rgb(215,193,179)" points="432.41992378234863,279.3756023645401 452.43332862854004,272.57900363206863 429.4783229827881,290.28825867176056"></polygon>
          <polygon fill="rgb(215,193,179)" stroke="rgb(215,193,179)" points="452.43332862854004,272.57900363206863 432.41992378234863,279.3756023645401 429.88715171813965,253.7824490070343"></polygon>
          <polygon fill="url('#right-upper-snout-gradient')" stroke="url('#right-upper-snout-gradient')" points="429.88715171813965,253.7824490070343 451.4420700073242,227.22753778100014 452.43332862854004,272.57900363206863"></polygon>
          <polygon fill="rgb(192,173,158)" stroke="rgb(192,173,158)" points="346.683837890625,285.8805242776871 330.64503479003906,275.77580869197845 380.9923242330551,291.7578216791153"></polygon>
          <polygon fill="rgb(35,151,119)" stroke="rgb(35,151,119)" points="451.7424774169922,200.92404763400555 429.4293622970581,190.6205341592431 414.40619373321533,177.3363788612187"></polygon>
          <polygon fill="rgb(22,22,22)" stroke="rgb(22,22,22)" points="421.1930751800537,210.8384491801262 429.4293622970581,190.6205341592431 451.7424774169922,200.92404763400555"></polygon>
          <polygon fill="url('#right-below-eye-gradient')" stroke="url('#right-below-eye-gradient')" points="451.4420700073242,227.22753778100014 421.1930751800537,210.8384491801262 451.7424774169922,200.92404763400555"></polygon>
          <polygon fill="rgb(215,193,179)" stroke="rgb(215,193,179)" points="383.3742849826813,280.736044883728 380.9923242330551,291.7578216791153 330.64503479003906,275.77580869197845"></polygon>
          <polygon fill="rgb(215,193,179)" stroke="rgb(215,193,179)" points="330.64503479003906,275.77580869197845 386.92766708135605,254.712375998497 383.3742849826813,280.736044883728"></polygon>
          <polygon fill="url('#left-upper-snout-gradient')" stroke="url('#left-upper-snout-gradient')" points="386.92766708135605,254.712375998497 330.64503479003906,275.77580869197845 340.78569316864014,228.93409532308578"></polygon>
          <polygon fill="rgb(35,151,119)" stroke="rgb(35,151,119)" points="339.14938259124756,201.9539312273264 310.56833839416504,174.86019148677588 379.1654977798462,177.45928552001715"></polygon>
          <polygon fill="url('#left-outer-eye-gradient')" stroke="url('#left-outer-eye-gradient')" points="310.56833839416504,174.86019148677588 339.14938259124756,201.9539312273264 340.78569316864014,228.93409532308578"></polygon>
          <polygon fill="url('#left-upper-cheek-gradient')" stroke="url('#left-upper-cheek-gradient')" points="310.56833839416504,174.86019148677588 340.78569316864014,228.93409532308578 301.5899906158447,229.09362667798996"></polygon>
          <polygon fill="rgb(35,151,119)" stroke="rgb(35,151,119)" points="429.4293622970581,190.6205341592431 421.1930751800537,210.8384491801262 414.40619373321533,177.3363788612187"></polygon>
          <polygon fill="rgb(192,173,158)" stroke="rgb(192,173,158)" points="442.9101104736328,283.11892652511597 427.8872480392456,301.40051901340485 429.4783229827881,290.28825867176056"></polygon>
          <polygon fill="rgb(35,151,119)" stroke="rgb(35,151,119)" points="379.1654977798462,177.45928552001715 362.99427938461304,191.06252759695053 339.14938259124756,201.9539312273264"></polygon>
          <polygon fill="url('#right-inner-eye-gradient')" stroke="url('#right-inner-eye-gradient')" points="421.1930751800537,210.8384491801262 414.94566822052,198.41549138724804 414.40619373321533,177.3363788612187"></polygon>
          <polygon fill="rgb(22,22,22)" stroke="rgb(22,22,22)" points="374.0124249458313,211.3776919543743 339.14938259124756,201.9539312273264 362.99427938461304,191.06252759695053"></polygon>
          <polygon fill="url('#left-below-eye-gradient')" stroke="url('#left-below-eye-gradient')" points="340.78569316864014,228.93409532308578 339.14938259124756,201.9539312273264 374.0124249458313,211.3776919543743"></polygon>
          <polygon fill="rgb(35,151,119)" stroke="rgb(35,151,119)" points="362.99427938461304,191.06252759695053 379.1654977798462,177.45928552001715 374.0124249458313,211.3776919543743"></polygon>
          <polygon fill="url('#forehead-gradient')" stroke="url('#forehead-gradient')" points="382.68200424313545,198.68889331817627 379.1654977798462,177.45928552001715 414.40619373321533,177.3363788612187"></polygon>
          <polygon fill="url('#forehead-gradient')" stroke="url('#forehead-gradient')" points="414.40619373321533,177.3363788612187 414.94566822052,198.41549138724804 382.68200424313545,198.68889331817627"></polygon>
          <polygon fill="url('#left-inner-eye-gradient')" stroke="url('#left-inner-eye-gradient')" points="374.0124249458313,211.3776919543743 379.1654977798462,177.45928552001715 382.68200424313545,198.68889331817627"></polygon>
          <polygon fill="rgb(192,173,158)" stroke="rgb(192,173,158)" points="380.9923242330551,291.7578216791153 383.74452578276396,302.8543198108673 346.683837890625,285.8805242776871"></polygon>
          <polygon fill="url('#right-below-eye-gradient')" stroke="url('#right-below-eye-gradient')" points="421.1930751800537,210.8384491801262 451.4420700073242,227.22753778100014 429.88715171813965,253.7824490070343"></polygon>
          <polygon fill="url('#right-inner-eye-gradient')" stroke="url('#right-inner-eye-gradient')" points="414.94566822052,198.41549138724804 421.1930751800537,210.8384491801262 424.4144353866577,250.0555053949356"></polygon>
          <polygon fill="url('#right-below-eye-gradient')" stroke="url('#right-below-eye-gradient')" points="429.88715171813965,253.7824490070343 424.4144353866577,250.0555053949356 421.1930751800537,210.8384491801262"></polygon>
          <polygon fill="url('#left-below-eye-gradient')" stroke="url('#left-below-eye-gradient')" points="386.92766708135605,254.712375998497 340.78569316864014,228.93409532308578 374.0124249458313,211.3776919543743"></polygon>
          <polygon fill="url('#left-inner-eye-gradient')" stroke="url('#left-inner-eye-gradient')" points="382.68200424313545,198.68889331817627 392.5173361301422,250.7168944478035 374.0124249458313,211.3776919543743"></polygon>
          <polygon fill="url('#left-below-eye-gradient')" stroke="url('#left-below-eye-gradient')" points="374.0124249458313,211.3776919543743 392.5173361301422,250.7168944478035 386.92766708135605,254.712375998497"></polygon>
          <polygon fill="url('#forehead-gradient')" stroke="url('#forehead-gradient')" points="382.68200424313545,198.68889331817627 414.94566822052,198.41549138724804 424.4144353866577,250.0555053949356"></polygon>
          <polygon fill="url('#forehead-gradient')" stroke="url('#forehead-gradient')" points="424.4144353866577,250.0555053949356 392.5173361301422,250.7168944478035 382.68200424313545,198.68889331817627"></polygon>
          <polygon fill="rgb(192,173,158)" stroke="rgb(192,173,158)" points="430.8557596206665,276.78375482559204 427.8872480392456,301.40051901340485 383.74452578276396,302.8543198108673"></polygon>
          <polygon fill="rgb(192,173,158)" stroke="rgb(192,173,158)" points="427.8872480392456,301.40051901340485 430.8557596206665,276.78375482559204 432.41992378234863,279.3756023645401"></polygon>
          <polygon fill="rgb(192,173,158)" stroke="rgb(192,173,158)" points="383.74452578276396,302.8543198108673 380.9923242330551,291.7578216791153 383.3742849826813,280.736044883728"></polygon>
          <polygon fill="rgb(192,173,158)" stroke="rgb(192,173,158)" points="383.3742849826813,280.736044883728 387.4966399669647,277.9593358039856 383.74452578276396,302.8543198108673"></polygon>
          <polygon fill="rgb(192,173,158)" stroke="rgb(192,173,158)" points="383.74452578276396,302.8543198108673 387.4966399669647,277.9593358039856 430.8557596206665,276.78375482559204"></polygon>
          <polygon fill="rgb(22,22,22)" stroke="rgb(22,22,22)" points="429.88715171813965,253.7824490070343 432.41992378234863,279.3756023645401 430.8557596206665,276.78375482559204"></polygon>
          <polygon fill="rgb(22,22,22)" stroke="rgb(22,22,22)" points="387.4966399669647,277.9593358039856 383.3742849826813,280.736044883728 386.92766708135605,254.712375998497"></polygon>
          <polygon fill="rgb(22,22,22)" stroke="rgb(22,22,22)" points="429.88715171813965,253.7824490070343 430.6686086654663,259.1356502175331 427.1811218261719,255.2360925078392"></polygon>
          <polygon fill="rgb(22,22,22)" stroke="rgb(22,22,22)" points="427.1811218261719,255.2360925078392 424.4144353866577,250.0555053949356 429.88715171813965,253.7824490070343"></polygon>
          <polygon fill="rgb(22,22,22)" stroke="rgb(22,22,22)" points="394.7328071594238,255.9492267370224 392.5173361301422,250.7168944478035 424.4144353866577,250.0555053949356"></polygon>
          <polygon fill="rgb(22,22,22)" stroke="rgb(22,22,22)" points="424.4144353866577,250.0555053949356 427.1811218261719,255.2360925078392 394.7328071594238,255.9492267370224"></polygon>
          <polygon fill="rgb(22,22,22)" stroke="rgb(22,22,22)" points="386.92766708135605,254.712375998497 392.5173361301422,250.7168944478035 394.7328071594238,255.9492267370224"></polygon>
          <polygon fill="rgb(22,22,22)" stroke="rgb(22,22,22)" points="391.16345858573914,260.0411636829376 430.6686086654663,259.1356502175331 430.8557596206665,276.78375482559204"></polygon>
          <polygon fill="rgb(22,22,22)" stroke="rgb(22,22,22)" points="430.8557596206665,276.78375482559204 387.4966399669647,277.9593358039856 391.16345858573914,260.0411636829376"></polygon>
          <polygon fill="rgb(22,22,22)" stroke="rgb(22,22,22)" points="386.92766708135605,254.712375998497 391.16345858573914,260.0411636829376 387.4966399669647,277.9593358039856"></polygon>
          <polygon fill="rgb(22,22,22)" stroke="rgb(22,22,22)" points="394.7328071594238,255.9492267370224 391.16345858573914,260.0411636829376 386.92766708135605,254.712375998497"></polygon>
          <polygon fill="rgb(22,22,22)" stroke="rgb(22,22,22)" points="427.1811218261719,255.2360925078392 430.6686086654663,259.1356502175331 391.16345858573914,260.0411636829376"></polygon>
          <polygon fill="rgb(22,22,22)" stroke="rgb(22,22,22)" points="391.16345858573914,260.0411636829376 394.7328071594238,255.9492267370224 427.1811218261719,255.2360925078392"></polygon>
        </svg>
      </div>
    </div>
  )
}

export default InteractiveMetaMaskLogo