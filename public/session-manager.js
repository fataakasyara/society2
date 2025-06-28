/**
 * Nolyx Society Session Manager
 * Handles verification sessions and security checks
 */

class NolyxSessionManager {
    constructor() {
        this.sessionKey = 'nolyxVerificationSession';
        this.tempSessionKey = 'nolyxVerified';
        this.sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
    }

    /**
     * Create a new verification session
     */
    createSession() {
        const sessionData = {
            verified: true,
            timestamp: Date.now(),
            expires: Date.now() + this.sessionDuration,
            userAgent: navigator.userAgent,
            ip: this.getClientIP() // Will be null for client-side, but good for structure
        };

        // Store in localStorage for persistence
        localStorage.setItem(this.sessionKey, JSON.stringify(sessionData));
        
        // Store in sessionStorage for current browser session
        sessionStorage.setItem(this.tempSessionKey, 'true');
        
        console.log('Verification session created:', sessionData);
        return sessionData;
    }

    /**
     * Check if current session is valid
     */
    isSessionValid() {
        try {
            // Check sessionStorage first (faster)
            const tempSession = sessionStorage.getItem(this.tempSessionKey);
            
            // Check localStorage for persistent session
            const sessionData = localStorage.getItem(this.sessionKey);
            
            if (sessionData) {
                const session = JSON.parse(sessionData);
                const currentTime = Date.now();
                
                // Check if session is still valid (not expired)
                if (session.verified && session.expires > currentTime) {
                    // Ensure sessionStorage is also set
                    if (!tempSession) {
                        sessionStorage.setItem(this.tempSessionKey, 'true');
                    }
                    return true;
                } else {
                    // Session expired, clean up
                    this.clearSession();
                    return false;
                }
            }
            
            return false;
        } catch (error) {
            console.error('Error checking session validity:', error);
            this.clearSession();
            return false;
        }
    }

    /**
     * Get session information
     */
    getSessionInfo() {
        try {
            const sessionData = localStorage.getItem(this.sessionKey);
            if (sessionData) {
                const session = JSON.parse(sessionData);
                const currentTime = Date.now();
                const timeLeft = session.expires - currentTime;
                
                return {
                    ...session,
                    timeLeft: timeLeft,
                    hoursLeft: Math.floor(timeLeft / (1000 * 60 * 60)),
                    minutesLeft: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
                    isValid: timeLeft > 0
                };
            }
            return null;
        } catch (error) {
            console.error('Error getting session info:', error);
            return null;
        }
    }

    /**
     * Clear verification session
     */
    clearSession() {
        localStorage.removeItem(this.sessionKey);
        sessionStorage.removeItem(this.tempSessionKey);
        console.log('Verification session cleared');
    }

    /**
     * Redirect to verification page if session is invalid
     */
    requireVerification(redirectUrl = 'verif.html') {
        if (!this.isSessionValid()) {
            console.log('No valid verification session found, redirecting to verification page');
            window.location.href = redirectUrl;
            return false;
        }
        return true;
    }

    /**
     * Extend session expiry time
     */
    extendSession(additionalHours = 24) {
        try {
            const sessionData = localStorage.getItem(this.sessionKey);
            if (sessionData) {
                const session = JSON.parse(sessionData);
                session.expires = Date.now() + (additionalHours * 60 * 60 * 1000);
                localStorage.setItem(this.sessionKey, JSON.stringify(session));
                console.log(`Session extended by ${additionalHours} hours`);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error extending session:', error);
            return false;
        }
    }

    /**
     * Get client IP (placeholder - would need server-side implementation)
     */
    getClientIP() {
        // This is a placeholder - actual IP detection would require server-side code
        return null;
    }

    /**
     * Check if session will expire soon (within 1 hour)
     */
    isSessionExpiringSoon() {
        const sessionInfo = this.getSessionInfo();
        if (sessionInfo) {
            return sessionInfo.timeLeft < (60 * 60 * 1000); // Less than 1 hour
        }
        return false;
    }

    /**
     * Auto-refresh session if user is active
     */
    setupAutoRefresh() {
        // Refresh session every 12 hours if user is active
        setInterval(() => {
            if (this.isSessionValid() && !document.hidden) {
                this.extendSession(24);
            }
        }, 12 * 60 * 60 * 1000); // 12 hours
    }

    /**
     * Setup session monitoring
     */
    setupSessionMonitoring() {
        // Check session when page becomes visible
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.requireVerification();
            }
        });

        // Check session periodically
        setInterval(() => {
            if (!this.isSessionValid()) {
                this.requireVerification();
            }
        }, 5 * 60 * 1000); // Check every 5 minutes
    }
}

// Create global instance
window.NolyxSession = new NolyxSessionManager();

// Auto-setup monitoring when script loads
document.addEventListener('DOMContentLoaded', () => {
    window.NolyxSession.setupSessionMonitoring();
    window.NolyxSession.setupAutoRefresh();
});
