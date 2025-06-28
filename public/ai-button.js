// Dynamic AI Button Component
class AIButton {
    constructor(options = {}) {
        this.options = {
            href: 'ai.html',
            text: 'Ask Nolyx AI',
            position: 'fixed', // 'fixed' or 'relative'
            showOnPages: ['all'], // ['all'] or specific pages like ['index', 'join']
            hideOnPages: [], // pages to hide the button
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

    // Check if button should be shown on current page
    shouldShowOnCurrentPage() {
        // Check if current page is in hideOnPages
        if (this.options.hideOnPages.includes(this.currentPage)) {
            return false;
        }

        // Check if should show on all pages
        if (this.options.showOnPages.includes('all')) {
            return true;
        }

        // Check if current page is in showOnPages
        return this.options.showOnPages.includes(this.currentPage);
    }

    // Initialize AI button
    init() {
        if (this.shouldShowOnCurrentPage()) {
            this.createButton();
            this.setupEventListeners();
        }
    }

    // Create AI button HTML
    createButton() {
        // Check if button already exists
        if (document.querySelector('.ai-button-container')) {
            return;
        }

        const buttonHTML = `
            <div class="button-container ai-button-container">
                <a href="${this.options.href}" class="ai-button">
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M9 9l.01 0" />
                            <path d="M15 9l.01 0" />
                            <path d="M8 13a4 4 0 1 0 8 0m0 0h-8" />
                        </svg>
                    </span>
                    ${this.options.text}
                </a>
            </div>
        `;

        // Insert button at the end of body
        document.body.insertAdjacentHTML('beforeend', buttonHTML);

        // Apply position styling if different from default
        if (this.options.position !== 'fixed') {
            const container = document.querySelector('.ai-button-container');
            if (container) {
                container.style.position = this.options.position;
            }
        }
    }

    // Setup event listeners
    setupEventListeners() {
        const button = document.querySelector('.ai-button');
        if (button) {
            // Add click tracking (optional)
            button.addEventListener('click', (e) => {
                this.onButtonClick(e);
            });

            // Add hover effects (already handled by CSS, but can add custom logic here)
            button.addEventListener('mouseenter', () => {
                this.onButtonHover();
            });
        }
    }

    // Handle button click
    onButtonClick(event) {
        // Add any custom click logic here
        console.log('AI Button clicked');
        
        // Optional: Add analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'AI Button',
                event_label: 'Ask Nolyx AI',
                value: 1
            });
        }
    }

    // Handle button hover
    onButtonHover() {
        // Add any custom hover logic here
        console.log('AI Button hovered');
    }

    // Show button
    show() {
        const container = document.querySelector('.ai-button-container');
        if (container) {
            container.style.display = 'flex';
        }
    }

    // Hide button
    hide() {
        const container = document.querySelector('.ai-button-container');
        if (container) {
            container.style.display = 'none';
        }
    }

    // Remove button
    remove() {
        const container = document.querySelector('.ai-button-container');
        if (container) {
            container.remove();
        }
    }

    // Update button text
    updateText(newText) {
        const button = document.querySelector('.ai-button');
        if (button) {
            const textNode = button.childNodes[button.childNodes.length - 1];
            if (textNode && textNode.nodeType === Node.TEXT_NODE) {
                textNode.textContent = newText;
            }
        }
    }

    // Update button href
    updateHref(newHref) {
        const button = document.querySelector('.ai-button');
        if (button) {
            button.href = newHref;
        }
    }

    // Add scroll behavior to hide/show button
    addScrollBehavior(options = {}) {
        const {
            hideOnScroll = false,
            showAfterScroll = 200,
            hideAfterScroll = 100
        } = options;

        if (!hideOnScroll) return;

        let lastScrollTop = 0;
        const container = document.querySelector('.ai-button-container');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > showAfterScroll) {
                if (scrollTop > lastScrollTop && scrollTop > hideAfterScroll) {
                    // Scrolling down - hide button
                    if (container) {
                        container.style.transform = 'translateY(100px)';
                        container.style.opacity = '0';
                    }
                } else {
                    // Scrolling up - show button
                    if (container) {
                        container.style.transform = 'translateY(0)';
                        container.style.opacity = '1';
                    }
                }
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Add transition for smooth animation
        if (container) {
            container.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
        }
    }

    // Add entrance animation
    addEntranceAnimation(delay = 1000) {
        const container = document.querySelector('.ai-button-container');
        if (container) {
            // Initially hide
            container.style.opacity = '0';
            container.style.transform = 'translateY(50px)';
            container.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Show after delay
            setTimeout(() => {
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            }, delay);
        }
    }

    // Check if AI page exists
    static checkAIPageExists() {
        return fetch('ai.html', { method: 'HEAD' })
            .then(response => response.ok)
            .catch(() => false);
    }
}

// Auto-initialize AI button when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if AI button should be auto-initialized
    if (!window.noAutoAIButton) {
        window.aiButton = new AIButton({
            showOnPages: ['all'], // Show on all pages
            hideOnPages: ['ai'] // Hide on AI page itself
        });
        
        // Add entrance animation
        window.aiButton.addEntranceAnimation(1500);
        
        // Optional: Add scroll behavior
        // window.aiButton.addScrollBehavior({ hideOnScroll: true });
    }
});

// Export for manual initialization
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIButton;
}

// Global function to manually create AI button
window.createAIButton = (options = {}) => {
    return new AIButton(options);
};
