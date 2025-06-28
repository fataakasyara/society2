// MetaMask Connection Handler
class MetaMaskConnector {
    constructor() {
        this.isConnected = false;
        this.currentAccount = null;
        this.provider = null;
        this.init();
        this.injectCustomCSS();
    }

    // Function to truncate Ethereum address
    truncateAddress(address) {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }

    // Initialize MetaMask connection
    async init() {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            this.provider = window.ethereum;
            
            // Check if already connected
            try {
                const accounts = await this.provider.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    this.handleAccountsChanged(accounts);
                }
            } catch (error) {
                console.error('Error checking existing connection:', error);
            }

            // Listen for account changes
            this.provider.on('accountsChanged', (accounts) => {
                this.handleAccountsChanged(accounts);
            });

            // Listen for chain changes
            this.provider.on('chainChanged', () => {
                window.location.reload();
            });
        }

        this.setupEventListeners();
    }

    // Setup event listeners for connect buttons
    setupEventListeners() {
        // Desktop connect button
        const connectBtn = document.getElementById('connect');
        if (connectBtn) {
            connectBtn.addEventListener('click', () => this.connect());
        }

        // Mobile connect button
        const connectBtn2 = document.getElementById('connect2');
        if (connectBtn2) {
            connectBtn2.addEventListener('click', () => this.connect());
        }

        // Disconnect buttons (if any)
        const disconnectBtns = document.querySelectorAll('.disconnect-btn');
        disconnectBtns.forEach(btn => {
            btn.addEventListener('click', () => this.disconnect());
        });
    }

    // Connect to MetaMask
    async connect() {
        if (!window.ethereum) {
            this.showAlert('MetaMask wallet not detected. Please install MetaMask extension to connect your wallet and access Web3 features.', 'warning');
            return;
        }

        try {
            // Request account access
            const accounts = await this.provider.request({
                method: 'eth_requestAccounts'
            });

            if (accounts.length > 0) {
                this.handleAccountsChanged(accounts);
                this.showAlert('🎉 Successfully connected to MetaMask! Your wallet is now linked to Nolyx Society.', 'success');
            }
        } catch (error) {
            console.error('Connection error:', error);

            if (error.code === 4001) {
                this.showAlert('Connection request was rejected. Please try again and approve the connection to continue.', 'info');
            } else if (error.code === -32002) {
                this.showAlert('Connection request is already pending. Please check your MetaMask extension.', 'info');
            } else {
                this.showAlert('Failed to connect to MetaMask. Please make sure your wallet is unlocked and try again.', 'error');
            }

            this.updateUI(false, null);
        }
    }

    // Handle account changes
    handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            // User disconnected
            this.isConnected = false;
            this.currentAccount = null;
            this.updateUI(false, null);
        } else {
            // User connected or switched accounts
            this.isConnected = true;
            this.currentAccount = accounts[0];
            this.updateUI(true, accounts[0]);
        }
    }

    // Disconnect from MetaMask
    async disconnect() {
        this.isConnected = false;
        this.currentAccount = null;
        this.updateUI(false, null);
        this.showAlert('👋 Successfully disconnected from MetaMask. Your wallet is no longer connected to this site.', 'info');
    }

    // Update UI elements
    updateUI(connected, address) {
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
                    const truncatedAddress = this.truncateAddress(address);
                    
                    // Update button text
                    button.textContent = 'Connected';
                    button.classList.add('connected');
                    button.disabled = false;
                    
                    // Update address display
                    addressEl.textContent = truncatedAddress;
                    addressEl.title = address; // Show full address on hover
                    addressEl.classList.add('connected');
                } else {
                    // Reset to disconnected state
                    button.textContent = 'Connect MetaMask';
                    button.classList.remove('connected');
                    button.disabled = false;
                    
                    addressEl.textContent = 'Not connected';
                    addressEl.title = '';
                    addressEl.classList.remove('connected');
                }
            }
        });
    }

    // Show alert messages
    showAlert(message, type = 'info') {
        // Check if SweetAlert2 is available
        if (typeof Swal !== 'undefined') {
            const config = {
                title: this.getAlertTitle(type),
                text: message,
                icon: type,
                timer: 4000,
                showConfirmButton: true,
                confirmButtonText: 'OK',
                confirmButtonColor: '#10b981',
                toast: false,
                position: 'center',
                backdrop: true,
                allowOutsideClick: true,
                allowEscapeKey: true,
                showClass: {
                    popup: 'swal2-show',
                    backdrop: 'swal2-backdrop-show',
                    icon: 'swal2-icon-show'
                },
                hideClass: {
                    popup: 'swal2-hide',
                    backdrop: 'swal2-backdrop-hide',
                    icon: 'swal2-icon-hide'
                },
                customClass: {
                    popup: 'metamask-alert-popup',
                    title: 'metamask-alert-title',
                    content: 'metamask-alert-content',
                    confirmButton: 'metamask-alert-button',
                    icon: 'metamask-alert-icon'
                }
            };

            Swal.fire(config);
        } else {
            // Fallback to regular alert
            alert(message);
        }
    }

    // Get alert title based on type
    getAlertTitle(type) {
        const titles = {
            success: 'Success!',
            error: 'Error!',
            warning: 'Warning!',
            info: 'Info'
        };
        return titles[type] || 'Notification';
    }

    // Get current connection status
    getConnectionStatus() {
        return {
            isConnected: this.isConnected,
            account: this.currentAccount,
            truncatedAccount: this.currentAccount ? this.truncateAddress(this.currentAccount) : null
        };
    }

    // Get network information
    async getNetworkInfo() {
        if (!this.provider) return null;

        try {
            const chainId = await this.provider.request({ method: 'eth_chainId' });
            return {
                chainId: chainId,
                chainIdDecimal: parseInt(chainId, 16)
            };
        } catch (error) {
            console.error('Error getting network info:', error);
            return null;
        }
    }

    // Get balance
    async getBalance() {
        if (!this.provider || !this.currentAccount) return null;

        try {
            const balance = await this.provider.request({
                method: 'eth_getBalance',
                params: [this.currentAccount, 'latest']
            });

            // Convert from wei to ether
            const balanceInEther = parseInt(balance, 16) / Math.pow(10, 18);
            return balanceInEther.toFixed(4);
        } catch (error) {
            console.error('Error getting balance:', error);
            return null;
        }
    }

    // Inject custom CSS for MetaMask alerts
    injectCustomCSS() {
        // Check if CSS is already injected
        if (document.querySelector('#metamask-alert-styles')) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'metamask-alert-styles';
        style.textContent = `
            /* MetaMask Alert Custom Styles */
            .metamask-alert-popup {
                border-radius: 16px !important;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15) !important;
                border: 2px solid #10b981 !important;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            }

            .metamask-alert-title {
                color: #1f2937 !important;
                font-size: 1.5rem !important;
                font-weight: 700 !important;
                margin-bottom: 0.5rem !important;
            }

            .metamask-alert-content {
                color: #4b5563 !important;
                font-size: 1rem !important;
                line-height: 1.5 !important;
                margin-bottom: 1rem !important;
            }

            .metamask-alert-button {
                background: linear-gradient(135deg, #10b981, #059669) !important;
                border: none !important;
                border-radius: 8px !important;
                padding: 12px 24px !important;
                font-weight: 600 !important;
                font-size: 0.95rem !important;
                transition: all 0.3s ease !important;
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3) !important;
            }

            .metamask-alert-button:hover {
                background: linear-gradient(135deg, #059669, #047857) !important;
                transform: translateY(-2px) !important;
                box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4) !important;
            }

            .metamask-alert-button:focus {
                outline: none !important;
                box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3) !important;
            }

            /* Success alert styling - Clean and Simple */
            .swal2-success .swal2-icon {
                border: 4px solid #10b981 !important;
                border-radius: 50% !important;
                width: 80px !important;
                height: 80px !important;
                position: relative !important;
                margin: 20px auto !important;
                background: transparent !important;
                box-sizing: border-box !important;
            }

            /* Hide all default SweetAlert2 success elements */
            .swal2-success .swal2-success-ring,
            .swal2-success .swal2-success-fix,
            .swal2-success [class^='swal2-success-line'],
            .swal2-success .swal2-success-line-tip,
            .swal2-success .swal2-success-line-long,
            .swal2-success .swal2-success-circular-line-left,
            .swal2-success .swal2-success-circular-line-right,
            .swal2-success::before,
            .swal2-success::after {
                display: none !important;
            }

            /* Create clean checkmark using Font Awesome */
            .swal2-success .swal2-icon::after {
                content: '\f00c' !important;
                font-family: 'Font Awesome 6 Free' !important;
                font-weight: 900 !important;
                font-size: 40px !important;
                color: #10b981 !important;
                position: absolute !important;
                top: 50% !important;
                left: 50% !important;
                transform: translate(-50%, -50%) scale(0) !important;
                display: block !important;
                animation: checkmark-appear 0.6s ease-out 0.2s forwards !important;
            }

            /* Error alert styling */
            .swal2-error .swal2-icon {
                border-color: #ef4444 !important;
            }

            .swal2-error .swal2-x-mark {
                color: #ef4444 !important;
            }

            /* Warning alert styling */
            .swal2-warning .swal2-icon {
                border-color: #f59e0b !important;
                color: #f59e0b !important;
            }

            /* Info alert styling */
            .swal2-info .swal2-icon {
                border-color: #3b82f6 !important;
                color: #3b82f6 !important;
            }

            /* Backdrop styling */
            .swal2-backdrop-show {
                background: rgba(0, 0, 0, 0.4) !important;
                backdrop-filter: blur(4px) !important;
            }

            /* Icon styling improvements */
            .metamask-alert-icon {
                border: 3px solid #10b981 !important;
            }

            /* Success icon specific fixes */
            .swal2-success .swal2-icon::before {
                background-color: #10b981 !important;
            }

            .swal2-success .swal2-icon::after {
                background-color: #10b981 !important;
            }

            /* Ensure success checkmark is visible and animated */
            .swal2-success .swal2-success-line {
                background-color: #10b981 !important;
                height: 5px !important;
                border-radius: 2px !important;
                position: absolute !important;
                z-index: 2 !important;
            }

            /* Make sure the success icon container is properly sized */
            .swal2-success .swal2-icon {
                position: relative !important;
                box-sizing: border-box !important;
                width: 80px !important;
                height: 80px !important;
                border: 4px solid #10b981 !important;
                border-radius: 50% !important;
                margin: 20px auto !important;
            }

            .swal2-success .swal2-success-line.swal2-success-line-tip {
                left: 14px !important;
                top: 46px !important;
                width: 25px !important;
                transform: rotate(45deg) !important;
                animation: swal2-animate-success-line-tip 0.75s !important;
            }

            .swal2-success .swal2-success-line.swal2-success-line-long {
                right: 8px !important;
                top: 38px !important;
                width: 47px !important;
                transform: rotate(-45deg) !important;
                animation: swal2-animate-success-line-long 0.75s !important;
            }

            /* Success checkmark animation keyframes */
            @keyframes swal2-animate-success-line-tip {
                0% {
                    width: 0;
                    left: 14px;
                    top: 46px;
                }
                54% {
                    width: 0;
                    left: 14px;
                    top: 46px;
                }
                70% {
                    width: 25px;
                    left: 14px;
                    top: 46px;
                }
                84% {
                    width: 25px;
                    left: 14px;
                    top: 46px;
                }
                100% {
                    width: 25px;
                    left: 14px;
                    top: 46px;
                }
            }

            @keyframes swal2-animate-success-line-long {
                0% {
                    width: 0;
                    right: 8px;
                    top: 38px;
                }
                65% {
                    width: 0;
                    right: 8px;
                    top: 38px;
                }
                84% {
                    width: 47px;
                    right: 8px;
                    top: 38px;
                }
                100% {
                    width: 47px;
                    right: 8px;
                    top: 38px;
                }
            }

            /* Animation improvements */
            .swal2-show {
                animation: swal2-show 0.3s ease-out !important;
            }

            .swal2-hide {
                animation: swal2-hide 0.15s ease-in !important;
            }

            @keyframes swal2-show {
                0% {
                    transform: scale(0.7) translateY(-20px);
                    opacity: 0;
                }
                100% {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }
            }

            @keyframes swal2-hide {
                0% {
                    transform: scale(1) translateY(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(0.5) translateY(-20px);
                    opacity: 0;
                }
            }

            /* Mobile responsive */
            @media (max-width: 768px) {
                .metamask-alert-popup {
                    margin: 1rem !important;
                    max-width: calc(100% - 2rem) !important;
                }

                .metamask-alert-title {
                    font-size: 1.25rem !important;
                }

                .metamask-alert-content {
                    font-size: 0.9rem !important;
                }

                .metamask-alert-button {
                    padding: 10px 20px !important;
                    font-size: 0.9rem !important;
                }
            }
        `;

        document.head.appendChild(style);
    }
}

// Initialize MetaMask connector when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.metaMaskConnector = new MetaMaskConnector();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MetaMaskConnector;
}
