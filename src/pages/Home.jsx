import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AIButton from '../components/AIButton'
import AnimationObserver from '../components/AnimationObserver'

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-green-400 to-green-600 bg-size-200 bg-pos-0 animation" style={{
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
      <AnimationObserver />
      
      <section id="p" className="hero-section h-96 flex items-center justify-center text-white mt-16">
        <div className="text-center">
          <h1 id="cinzel" className="animate-hero text-4xl md:text-6xl font-bold mb-4">Nolyx Society</h1>
          <br />
          <Link 
            to="/join" 
            className="animate-button bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full transition-colors"
          >
            Join Community
          </Link>
        </div>
      </section>

      <section id="category" className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="animate-title text-2xl text-gray-600 mt-4 max-w-2xl mx-auto">
              Explore our popular <span className="font-bold text-green-700 text-3xl">Web 3.0</span> categories that are trending among our community
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <a href="#" className="animate-card relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 green-filter">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-70 z-10"></div>
              <img src="https://cdn.coin68.com/uploads/2021/01/999x-999.gif" alt="Smart Contracts" className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 z-20">
                <span className="text-white text-xl font-bold mb-1">Smart Contracts</span>
              </div>
            </a>

            <a href="#" className="animate-card relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 green-filter">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-70 z-10"></div>
              <img src="https://cdn-icons-gif.flaticon.com/11700/11700968.gif" alt="Blockchain" className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 z-20">
                <span className="text-white text-xl font-bold mb-1">Blockchain</span>
              </div>
            </a>

            <a href="#" className="animate-card relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 green-filter">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-70 z-10"></div>
              <img src="https://cryptounity.org/wp-content/uploads/2023/04/16.gif" alt="Cryptography" className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 z-20">
                <span className="text-white text-xl font-bold mb-1">Cryptography</span>
              </div>
            </a>

            <a href="#" className="animate-card relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 green-filter">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-70 z-10"></div>
              <img src="https://trends.vc/wp-content/uploads/2021/09/defi-optimized.gif" alt="Web 3.0" className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-6 z-20">
                <span className="text-white text-xl font-bold mb-1">Decentralized App</span>
              </div>
            </a>
          </div>
    
          <div className="text-center mt-12">
          </div>
        </div>
      </section>
    
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <h2 className="animate-title text-4xl font-bold text-green-900 relative">
              About Us
              <span className="absolute -bottom-2 left-0 w-20 h-1 bg-green-600"></span>
            </h2>

            <div className="hidden md:block">
              <div className="animate-element flex items-center space-x-2 text-sm text-green-800 font-medium">
                <span className="text-green-600">Nolyx Society</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="animate-content transform transition duration-500 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-6 text-green-900 flex items-center">
                <span className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                Our Mission
              </h3>
              <p className="text-green-700 mb-6 leading-relaxed">
                Building a community where we can learn about future technology together.
              </p>
              <p className="text-green-700 leading-relaxed">
                We strive to create an environment that fosters curiosity, collaboration, and continuous learning. Through discussions, workshops, and projects, we aim to empower individuals with the knowledge and skills needed to navigate the evolving world of technology.
              </p>
            </div>

            <div className="animate-content transform transition duration-500 hover:scale-105">
              <h3 className="text-2xl font-semibold mb-6 text-green-900 flex items-center">
                <span className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </span>
                Our Story
              </h3>
              <p className="text-green-700 mb-6 leading-relaxed">
                The journey of Nolyx Society began with a simple idea: to create a space where technology enthusiasts can come together, exchange ideas, and grow collectively. What started as a small group has now evolved into a thriving community.
              </p>
              <p className="text-green-700 leading-relaxed">
                Over time, we have expanded our reach, bringing in experts, learners, and innovators from different backgrounds. Our goal remains the same—to explore emerging technologies and shape the future through shared knowledge and experience.
              </p>
            </div>
          </div>
          
          <div className="mt-16">
            <h3 className="animate-title text-2xl font-semibold mb-8 text-green-900 text-center">Our Values</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="animate-card p-8 bg-green-100 rounded-xl shadow-lg transform transition duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg mb-3 text-green-900">Innovation</h4>
                <p className="text-green-700">
                  We embrace change and constantly seek new ways to push the boundaries of technology, creativity, and knowledge.
                </p>
              </div>

              <div className="animate-card p-8 bg-green-100 rounded-xl shadow-lg transform transition duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg mb-3 text-green-900">Excellence</h4>
                <p className="text-green-700">
                  Our commitment to quality and continuous improvement drives us to achieve the best in everything we do.
                </p>
              </div>

              <div className="animate-card p-8 bg-green-100 rounded-xl shadow-lg transform transition duration-500 hover:-translate-y-2 hover:shadow-xl">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg mb-3 text-green-900">Community</h4>
                <p className="text-green-700">
                  We believe in the power of collaboration and knowledge-sharing, building a strong, supportive network of like-minded individuals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="join" className="py-20 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          <div className="text-center mb-10">
            <h2 className="animate-title text-4xl font-bold text-green-800 mb-4">Become a Nolixian Civilian</h2>
            <p className="animate-content text-xl text-gray-600 max-w-3xl mx-auto">Learn and make projects together.</p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="animate-button relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
              <Link 
                to="/join" 
                className="relative bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white font-bold py-4 px-10 rounded-3xl shadow-xl flex items-center justify-center transform transition-all duration-300 hover:scale-105 text-2xl"
              >
                <span className="mr-2">Join Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
            <div className="animate-element flex items-center space-x-3 mt-6">
              <div className="flex -space-x-2">
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/75.jpg" alt="User Avatar" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/women/75.jpg" alt="User Avatar" />
                <img className="w-10 h-10 rounded-full border-2 border-white" src="https://randomuser.me/api/portraits/men/76.jpg" alt="User Avatar" />
              </div>
              <p className="text-gray-600">Join with <span className="font-semibold text-green-700">180+</span> other Nolixians</p>
            </div>
          </div>
        </div>
      </section>

      <section id="governance" className="py-6 md:py-16 bg-gradient-to-br from-green-50 to-green-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <h2 className="governance-title text-xl md:text-3xl font-bold text-green-800 mb-4 md:mb-8">
            Governance of Society
            <span className="block h-1 w-16 md:w-20 bg-green-600 mt-1 md:mt-2"></span>
          </h2>
          
          {/* Top Officials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
            {/* President Card */}
            <div className="governance-card carddesign bg-white rounded-lg md:rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-4 text-center">
                <div className="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-2 ring-green-500 ring-opacity-50 mb-3">
                  <img src="https://avatars.githubusercontent.com/u/140477415?v=4" alt="President" className="w-full h-full object-cover" />
                </div>
                <div className="mb-2">
                  <h4 className="text-md md:text-xl font-bold text-gray-800">Fataa Kasyara</h4>
                  <p className="text-xs md:text-sm text-gray-600">President of the Nolyx Society</p>
                </div>
                <div className="flex justify-center mb-2">
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Founder & Visionary
                  </span>
                </div>
                <div className="flex justify-center gap-2">
                  <a href="https://kasyara.pages.dev" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs transition-colors duration-300">
                    Website
                  </a>
                </div>
              </div>
            </div>

            {/* Vice President Card */}
            <div className="governance-card carddesign bg-white rounded-lg md:rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-4 text-center">
                <div className="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-2 ring-green-500 ring-opacity-50 mb-3">
                  <img src="https://media.tenor.com/lcuvD0zkFNMAAAAM/question-mark.gif" alt="Vice President" className="w-full h-full object-cover" />
                </div>
                <div className="mb-2">
                  <h4 className="text-md md:text-xl font-bold text-gray-800">Contribute to post name</h4>
                  <p className="text-xs md:text-sm text-gray-600">Vice President of the Nolyx Society</p>
                </div>
                <div className="flex justify-center mb-2">
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Executive Affairs
                  </span>
                </div>
                <div className="flex justify-center gap-2">
                  <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs transition-colors duration-300">
                    <i className="fab fa-instagram mr-1"></i> Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Government Officials Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Grand Chancellor Card */}
            <div className="governance-card carddesign bg-white rounded-lg md:rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-4 text-center">
                <div className="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-2 ring-green-500 ring-opacity-50 mb-3">
                  <img src="https://media.tenor.com/lcuvD0zkFNMAAAAM/question-mark.gif" alt="Grand Chancellor" className="w-full h-full object-cover" />
                </div>
                <div className="mb-2">
                  <h4 className="text-md md:text-xl font-bold text-gray-800">Contribute to post name</h4>
                  <p className="text-xs md:text-sm text-gray-600">Grand Chancellor of the Nolyx Society</p>
                </div>
                <div className="flex justify-center mb-2">
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Diplomatic Affairs
                  </span>
                </div>
                <div className="flex justify-center gap-2">
                  <a href="#" className="inline-flex items-center justify-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin mr-1"></i> LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Supreme Commander Card */}
            <div className="governance-card carddesign bg-white rounded-lg md:rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-4 text-center">
                <div className="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-2 ring-green-500 ring-opacity-50 mb-3">
                  <img src="https://media.tenor.com/lcuvD0zkFNMAAAAM/question-mark.gif" alt="Supreme Commander" className="w-full h-full object-cover" />
                </div>
                <div className="mb-2">
                  <h4 className="text-md md:text-xl font-bold text-gray-800">Contribute to post name</h4>
                  <p className="text-xs md:text-sm text-gray-600">Supreme Commander of the Nolyx Society</p>
                </div>
                <div className="flex justify-center mb-2">
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Military Affairs
                  </span>
                </div>
                <div className="flex justify-center gap-2">
                  <a href="#" className="inline-flex items-center justify-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin mr-1"></i> LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* High Judge Card */}
            <div className="governance-card carddesign bg-white rounded-lg md:rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-4 text-center">
                <div className="mx-auto w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-2 ring-green-500 ring-opacity-50 mb-3">
                  <img src="https://media.tenor.com/lcuvD0zkFNMAAAAM/question-mark.gif" alt="High Judge" className="w-full h-full object-cover" />
                </div>
                <div className="mb-2">
                  <h4 className="text-md md:text-xl font-bold text-gray-800">Contribute to post name</h4>
                  <p className="text-xs md:text-sm text-gray-600">High Judge of the Nolyx Society</p>
                </div>
                <div className="flex justify-center mb-2">
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    Judicial Affairs
                  </span>
                </div>
                <div className="flex justify-center gap-2">
                  <a href="#" className="inline-flex items-center justify-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md text-xs transition-colors duration-300" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin mr-1"></i> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-green-800 to-green-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-5 gap-8 mb-12">
              {/* Brand Section */}
              <div className="col-span-2">
                <div className="flex items-center mb-6">
                  <div className="bg-white bg-opacity-10 p-3 rounded-xl mr-4">
                    <img src="/gambar/nolyxnew.png" alt="Nolyx Logo" className="h-12 w-12 filter brightness-0 invert" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">NOLYX</h3>
                    <p className="text-green-200 text-sm">Society</p>
                  </div>
                </div>
                <p className="text-green-100 text-sm leading-relaxed mb-6 max-w-sm">
                  Building a community where we can learn about future technology together. Pioneering solutions for sustainable futures through Web 3.0 innovation.
                </p>
                {/* Social Media Links */}
                <div className="flex space-x-4">
                  <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-lg transition-all duration-300 hover:scale-110">
                    <i className="fab fa-discord text-lg"></i>
                  </a>
                  <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-lg transition-all duration-300 hover:scale-110">
                    <i className="fab fa-telegram text-lg"></i>
                  </a>
                  <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-lg transition-all duration-300 hover:scale-110">
                    <i className="fab fa-twitter text-lg"></i>
                  </a>
                  <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-lg transition-all duration-300 hover:scale-110">
                    <i className="fab fa-github text-lg"></i>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-bold text-white mb-6 text-lg">Quick Links</h4>
                <ul className="space-y-3">
                  <li><a href="#about" className="text-green-200 hover:text-white transition-colors duration-300 flex items-center group">
                    <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                    About Us
                  </a></li>
                  <li><a href="#governance" className="text-green-200 hover:text-white transition-colors duration-300 flex items-center group">
                    <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                    Governance
                  </a></li>
                  <li><Link to="/join" className="text-green-200 hover:text-white transition-colors duration-300 flex items-center group">
                    <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                    Join Community
                  </Link></li>
                  <li><Link to="/ai" className="text-green-200 hover:text-white transition-colors duration-300 flex items-center group">
                    <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                    Nolyx AI
                  </Link></li>
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="font-bold text-white mb-6 text-lg">Technologies</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-300 flex items-center group">
                    <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                    Blockchain
                  </a></li>
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-300 flex items-center group">
                    <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                    Smart Contracts
                  </a></li>
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-300 flex items-center group">
                    <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                    Cryptography
                  </a></li>
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-300 flex items-center group">
                    <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                    DeFi
                  </a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-bold text-white mb-6 text-lg">Support</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-300 flex items-center group">
                    <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                    Help Center
                  </a></li>
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-300 flex items-center group">
                    <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                    Documentation
                  </a></li>
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-300 flex items-center group">
                    <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                    Contact Us
                  </a></li>
                  <li><a href="#" className="text-green-200 hover:text-white transition-colors duration-300 flex items-center group">
                    <i className="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>
                    Privacy Policy
                  </a></li>
                </ul>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden">
              {/* Mobile Brand Section */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white bg-opacity-10 p-3 rounded-xl mr-3">
                    <img src="/gambar/nolyxnew.png" alt="Nolyx Logo" className="h-10 w-10 filter brightness-0 invert" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">NOLYX</h3>
                    <p className="text-green-200 text-sm">Society</p>
                  </div>
                </div>
                <p className="text-green-100 text-sm leading-relaxed mb-6">
                  Building a community where we can learn about future technology together.
                </p>
                {/* Mobile Social Media */}
                <div className="flex justify-center space-x-4 mb-8">
                  <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-lg transition-all duration-300">
                    <i className="fab fa-discord text-lg"></i>
                  </a>
                  <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-lg transition-all duration-300">
                    <i className="fab fa-telegram text-lg"></i>
                  </a>
                  <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-lg transition-all duration-300">
                    <i className="fab fa-twitter text-lg"></i>
                  </a>
                  <a href="#" className="bg-white bg-opacity-10 hover:bg-opacity-20 p-3 rounded-lg transition-all duration-300">
                    <i className="fab fa-github text-lg"></i>
                  </a>
                </div>
              </div>

              {/* Mobile Links Grid */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-bold text-white mb-4 text-base">Quick Links</h4>
                  <ul className="space-y-3">
                    <li><a href="#about" className="text-green-200 hover:text-white transition-colors text-sm">About Us</a></li>
                    <li><a href="#governance" className="text-green-200 hover:text-white transition-colors text-sm">Governance</a></li>
                    <li><Link to="/join" className="text-green-200 hover:text-white transition-colors text-sm">Join Community</Link></li>
                    <li><Link to="/ai" className="text-green-200 hover:text-white transition-colors text-sm">Nolyx AI</Link></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-4 text-base">Technologies</h4>
                  <ul className="space-y-3">
                    <li><a href="#" className="text-green-200 hover:text-white transition-colors text-sm">Blockchain</a></li>
                    <li><a href="#" className="text-green-200 hover:text-white transition-colors text-sm">Smart Contracts</a></li>
                    <li><a href="#" className="text-green-200 hover:text-white transition-colors text-sm">Cryptography</a></li>
                    <li><a href="#" className="text-green-200 hover:text-white transition-colors text-sm">DeFi</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-green-700 bg-green-900 bg-opacity-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                  <p className="text-green-200 text-sm">
                    © 2025 <span className="font-semibold text-white">NOLYX Society</span>. All rights reserved.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
                  <a href="#" className="text-green-200 hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="text-green-200 hover:text-white transition-colors">Terms of Service</a>
                  <a href="#" className="text-green-200 hover:text-white transition-colors">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <AIButton hideOnPages={['ai']} />
    </div>
  )
}

export default Home