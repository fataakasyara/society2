// Dynamic Navbar Component
class DynamicNavbar {
    constructor(options = {}) {
        this.options = {
            logoSrc: 'gambar/nolyxnew.png',
            logoAlt: 'Nolyx',
            brandText: 'Nolyx',
            brandLink: 'index.html',
            showMetaMask: true,
            ...options
        };
        
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    // Get current page name
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        return page.replace('.html', '');
    }

    // Initialize navbar
    init() {
        this.createNavbar();
        this.setupEventListeners();
        this.updateActiveLinks();
        this.ensureStylesLoaded();
    }

    // Create navbar HTML with exact same styling as index.html
    createNavbar() {
        const navbarHTML = `
            <nav class="fixed top-0 w-full bg-white shadow-lg z-30 mt-0 mb-16">
                <div class="max-w-7xl mx-auto px-4">
                    <div class="flex justify-between h-16">
                        <div class="flex items-center space-x-4">
                            <img src="${this.options.logoSrc}" alt="${this.options.logoAlt}" class="h-10 w-10">
                            <span id="cinzel" class="text-2xl font-bold text-green-700">${this.options.brandText}</span>
                        </div>

                        <!-- Desktop Menu -->
                        <div class="hidden md:flex items-center space-x-6">
                            ${this.createDesktopMenu()}
                            ${this.options.showMetaMask ? this.createMetaMaskSection() : ''}
                        </div>

                        <!-- Mobile Menu Button -->
                        <div class="md:hidden flex items-center">
                            <button class="mobile-menu-button text-gray-700 p-2">
                                <i class="fas fa-bars text-xl"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Mobile Menu -->
                <div class="mobile-menu hidden md:hidden bg-white border-t">
                    <div class="px-4 py-2 space-y-3">
                        ${this.createMobileMenu()}
                        ${this.options.showMetaMask ? this.createMobileMetaMaskSection() : ''}
                    </div>
                </div>
            </nav>
        `;

        // Insert navbar at the beginning of body
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    }

    // Create desktop menu items
    createDesktopMenu() {
        const menuItems = this.getMenuItems();
        return menuItems.map(item => {
            const activeClass = this.isActiveLink(item.href) ? 'text-green-700 font-semibold' : 'text-gray-700 hover:text-green-700';
            return `<a href="${item.href}" class="font-medium ${activeClass} transition-colors">${item.text}</a>`;
        }).join('');
    }

    // Create mobile menu items
    createMobileMenu() {
        const menuItems = this.getMenuItems();
        return menuItems.map(item => {
            const activeClass = this.isActiveLink(item.href) ? 'text-green-700 font-semibold' : 'text-gray-700 hover:text-green-700';
            return `<a href="${item.href}" class="block py-2 ${activeClass}">${item.text}</a>`;
        }).join('');
    }

    // Get menu items based on current page - same as index.html
    getMenuItems() {
        const baseItems = [];

        if (this.currentPage === 'join') {
            // For join page, link back to index sections
            baseItems.push(
                { href: 'index.html#join', text: 'Join' },
                { href: 'index.html#about', text: 'About' },
                { href: 'index.html#governance', text: 'Governance' },
                { href: 'blog.html', text: 'Learn' }
            );
        } else if (this.currentPage === 'blog') {
            // For blog page, link back to index sections
            baseItems.push(
                { href: 'index.html#join', text: 'Join' },
                { href: 'index.html#about', text: 'About' },
                { href: 'index.html#governance', text: 'Governance' },
                { href: 'blog.html', text: 'Learn' }
            );
        } else if (this.currentPage === 'ai') {
            // For AI page, link back to index sections
            baseItems.push(
                { href: 'index.html#join', text: 'Join' },
                { href: 'index.html#about', text: 'About' },
                { href: 'index.html#governance', text: 'Governance' },
                { href: 'blog.html', text: 'Learn' }
            );
        } else {
            // For index page, use anchor links
            baseItems.push(
                { href: '#join', text: 'Join' },
                { href: '#about', text: 'About' },
                { href: '#governance', text: 'Governance' },
                { href: 'blog.html', text: 'Learn' }
            );
        }



        return baseItems;
    }

    // Create MetaMask section for desktop - exact same as index.html
    createMetaMaskSection() {
        return `
            <button id="connect" class="font-medium text-gray-700 hover:text-green-700 transition-colors">Connect Metamask</button>
            <p id="address" class="text-sm text-gray-600">not connected</p>
        `;
    }

    // Create MetaMask section for mobile - exact same as index.html
    createMobileMetaMaskSection() {
        return `
            <button id="connect2" class="block text-left py-2 text-gray-700 hover:text-green-700">Connect Metamask</button>
            <p id="address2" class="text-sm text-gray-600">not connected</p>
        `;
    }

    // Check if a link is active
    isActiveLink(href) {
        if (href.includes('#')) {
            const [page] = href.split('#');
            const pageName = page.replace('.html', '') || 'index';
            return this.currentPage === pageName || (this.currentPage === 'index' && pageName === 'index');
        }

        const pageName = href.replace('.html', '');
        return this.currentPage === pageName;
    }

    // Check if a page exists (simplified check)
    pageExists(page) {
        // For now, assume these pages exist since we're implementing them
        const commonPages = ['ai.html', 'blog.html', 'about.html', 'contact.html'];
        return commonPages.includes(page);
    }

    // Setup event listeners
    setupEventListeners() {
        // Mobile menu toggle
        const button = document.querySelector('.mobile-menu-button');
        const mobileMenu = document.querySelector('.mobile-menu');

        if (button && mobileMenu) {
            button.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                this.updateMobileMenuIcon(button, !mobileMenu.classList.contains('hidden'));
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (event) => {
                if (!mobileMenu.contains(event.target) && !button.contains(event.target)) {
                    mobileMenu.classList.add('hidden');
                    this.updateMobileMenuIcon(button, false);
                }
            });

            // Close mobile menu on scroll
            window.addEventListener('scroll', () => {
                mobileMenu.classList.add('hidden');
                this.updateMobileMenuIcon(button, false);
            });

            // Close mobile menu on window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 768) { // md breakpoint
                    mobileMenu.classList.add('hidden');
                    this.updateMobileMenuIcon(button, false);
                }
            });
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href*="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href.includes('#') && href.split('#')[0] === '' || href.split('#')[0] === window.location.pathname.split('/').pop()) {
                    e.preventDefault();
                    const target = document.querySelector(href.split('#')[1] ? `#${href.split('#')[1]}` : 'body');
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        // Close mobile menu if open
                        mobileMenu?.classList.add('hidden');
                        this.updateMobileMenuIcon(button, false);
                    }
                }
            });
        });
    }

    // Update mobile menu icon
    updateMobileMenuIcon(button, isOpen) {
        const icon = button.querySelector('i');
        if (icon) {
            icon.className = isOpen ? 'fas fa-times text-xl' : 'fas fa-bars text-xl';
        }
    }

    // Update active links (useful for SPA navigation)
    updateActiveLinks() {
        // Update desktop links
        document.querySelectorAll('nav a').forEach(link => {
            const href = link.getAttribute('href');
            if (this.isActiveLink(href)) {
                link.classList.add('text-green-700', 'font-semibold');
                link.classList.remove('text-gray-700');
            } else {
                link.classList.remove('text-green-700', 'font-semibold');
                link.classList.add('text-gray-700');
            }
        });
    }

    // Add custom menu item
    addMenuItem(item, position = 'end') {
        // This method can be used to dynamically add menu items
        console.log('Adding menu item:', item, 'at position:', position);
    }

    // Remove menu item
    removeMenuItem(href) {
        // This method can be used to dynamically remove menu items
        console.log('Removing menu item with href:', href);
    }

    // Update MetaMask status
    updateMetaMaskStatus(connected, address) {
        const elements = {
            desktop: {
                button: document.getElementById('connect'),
                address: document.getElementById('address')
            },
            mobile: {
                button: document.getElementById('connect2'),
                address: document.getElementById('address2')
            }
        };

        Object.values(elements).forEach(({ button, address: addressEl }) => {
            if (button && addressEl) {
                if (connected && address) {
                    button.textContent = 'Connected';
                    button.classList.add('text-green-600', 'font-semibold');
                    addressEl.textContent = address;
                    addressEl.classList.add('text-green-600');
                } else {
                    button.textContent = 'Connect Metamask';
                    button.classList.remove('text-green-600', 'font-semibold');
                    addressEl.textContent = 'not connected';
                    addressEl.classList.remove('text-green-600');
                }
            }
        });
    }

    // Ensure CSS styles are loaded and applied
    ensureStylesLoaded() {
        // Check if Cinzel font is loaded
        if (!document.querySelector('link[href*="Cinzel"]') && !document.querySelector('style[data-cinzel]')) {
            const link = document.createElement('link');
            link.href = 'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&display=swap';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }

        // Apply Cinzel font to brand text
        setTimeout(() => {
            const brandElement = document.getElementById('cinzel');
            if (brandElement) {
                brandElement.style.fontFamily = "'Cinzel Decorative', serif";
            }
        }, 100);
    }

    // Add dynamic positioning support
    setPosition(position = 'fixed') {
        const navbar = document.querySelector('nav');
        if (navbar) {
            navbar.style.position = position;
            if (position === 'fixed') {
                navbar.classList.add('fixed', 'top-0', 'w-full', 'z-30');
            }
        }
    }

    // Add scroll behavior
    addScrollBehavior() {
        let lastScrollTop = 0;
        const navbar = document.querySelector('nav');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollTop = scrollTop;
        });

        // Add transition for smooth animation
        if (navbar) {
            navbar.style.transition = 'transform 0.3s ease-in-out';
        }
    }
}

// Auto-initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if navbar should be auto-initialized
    if (!document.querySelector('nav') && !window.noAutoNavbar) {
        window.dynamicNavbar = new DynamicNavbar({
            logoSrc: 'gambar/nolyxnew.png',
            logoAlt: 'Nolyx',
            brandText: 'Nolyx',
            brandLink: 'index.html',
            showMetaMask: true
        });

        // Add scroll behavior for better UX (optional)
        // window.dynamicNavbar.addScrollBehavior();
    }
});

// Export for manual initialization
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DynamicNavbar;
}

// Global function to manually create navbar
window.createDynamicNavbar = (options = {}) => {
    return new DynamicNavbar(options);
};
