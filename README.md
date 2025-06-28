# Nolyx Society - React Application

A modern Web3 community platform built with React, featuring MetaMask integration, blog system, and AI chatbot.

## 🚀 Features

- **React 18** with modern hooks and context API
- **React Router** for client-side routing
- **MetaMask Integration** for Web3 wallet connection
- **Session Management** for user verification
- **Blog System** with dynamic content loading
- **AI Chatbot** integration
- **Responsive Design** with Tailwind CSS
- **reCAPTCHA v2** for security verification
- **Animation System** with Intersection Observer

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Tailwind CSS, Custom CSS animations
- **Web3**: MetaMask integration with Ethers.js
- **Security**: reCAPTCHA v2, Session management
- **Build Tool**: Vite
- **Deployment**: Netlify ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nolyx-society-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🔧 Configuration

### reCAPTCHA Setup

1. Get your site key from [Google reCAPTCHA](https://www.google.com/recaptcha/admin/create)
2. Update `src/config/recaptcha.js` with your site key
3. Add your domains to reCAPTCHA admin console

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_RECAPTCHA_SITE_KEY=your_site_key_here
VITE_API_URL=your_api_url_here
```

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Navbar.jsx      # Navigation component
│   ├── AIButton.jsx    # Floating AI button
│   ├── ScrollToTop.jsx # Scroll to top functionality
│   └── AnimationObserver.jsx # Animation system
├── contexts/           # React Context providers
│   ├── MetaMaskContext.jsx   # MetaMask wallet integration
│   └── SessionContext.jsx    # Session management
├── pages/              # Page components
│   ├── Home.jsx        # Homepage
│   ├── Blog.jsx        # Blog listing page
│   ├── Post.jsx        # Individual blog post
│   ├── Join.jsx        # Community join page
│   ├── AI.jsx          # AI chatbot page
│   ├── Verification.jsx # reCAPTCHA verification
│   ├── SessionTest.jsx  # Session testing page
│   └── NotFound.jsx    # 404 page
├── config/             # Configuration files
│   └── recaptcha.js    # reCAPTCHA configuration
├── utils/              # Utility functions
│   └── recaptchaValidator.js # reCAPTCHA validation helpers
├── App.jsx             # Main App component
├── main.jsx            # React entry point
└── index.css           # Global styles
```

## 🌐 Routes

- `/` - Homepage with hero, about, governance sections
- `/blog` - Blog listing with search and filters
- `/post?id=123` - Individual blog post
- `/join` - Community platforms (WhatsApp, Telegram, Discord)
- `/ai` - AI chatbot interface
- `/verif` - reCAPTCHA verification page
- `/session-test` - Session management testing (development)

## 🔐 Security Features

- **reCAPTCHA v2** verification before accessing community
- **Session management** with 24-hour expiry
- **MetaMask wallet** connection for Web3 features
- **Input validation** and sanitization

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **Custom animations** with CSS transitions
- **Responsive design** for all screen sizes
- **Green color scheme** matching brand identity

## 📱 Responsive Design

- **Mobile-first** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly** interface elements
- **Optimized** for all device sizes

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Environment Variables for Production

Set these in your deployment platform:

- `VITE_RECAPTCHA_SITE_KEY`
- `VITE_API_URL`

## 🧪 Testing

### Development Testing

```bash
# Start dev server
npm run dev

# Test session management
# Visit: http://localhost:5173/session-test
```

### Production Testing

```bash
# Build and preview
npm run build
npm run preview
```

## 📊 Performance

- **Code splitting** with React Router
- **Lazy loading** for images and components
- **Optimized animations** with CSS transforms
- **Minimal bundle size** with tree shaking

## 🔄 State Management

- **React Context** for global state
- **Local state** with useState hook
- **Session persistence** with localStorage
- **MetaMask state** synchronization

## 🌟 Key Features Explained

### MetaMask Integration
- Automatic connection detection
- Account change handling
- Network switching support
- Transaction capabilities

### Session Management
- 24-hour session duration
- Automatic expiry handling
- Verification requirement
- Session extension capability

### Blog System
- Dynamic content loading from API
- Category filtering
- Search functionality
- Related posts suggestion

### AI Integration
- Embedded chatbot iframe
- Custom styling and controls
- Responsive design
- Back navigation

## 🐛 Troubleshooting

### Common Issues

1. **reCAPTCHA not loading**
   - Check site key configuration
   - Verify domain in reCAPTCHA admin
   - Check network connectivity

2. **MetaMask not connecting**
   - Ensure MetaMask is installed
   - Check wallet unlock status
   - Verify network compatibility

3. **Session issues**
   - Clear localStorage
   - Check session expiry
   - Verify verification completion

### Debug Tools

- Browser developer console
- React Developer Tools
- Network tab for API calls
- Session test page (`/session-test`)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Visit our community platforms
- Check the troubleshooting section
- Open an issue on GitHub
