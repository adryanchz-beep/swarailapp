// SwaRail APK Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeFAQ();
    initializeDownloadTracking();
    initializeSmoothScroll();
    initializeMobileInteractions();
    initializeErrorHandling();
    
    console.log('SwaRail landing page loaded successfully');
});

/**
 * Initialize FAQ expandable sections
 */
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((faqItem, index) => {
        const question = faqItem.querySelector('.faq-question');
        const answer = faqItem.querySelector('.faq-answer');
        
        if (question && answer) {
            // Ensure proper data attributes are set
            question.setAttribute('data-faq', index);
            answer.setAttribute('data-answer', index);
            
            question.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const isExpanded = faqItem.classList.contains('expanded');
                
                // Close all other FAQ items for accordion behavior
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('expanded');
                    }
                });
                
                // Toggle current FAQ item
                if (isExpanded) {
                    faqItem.classList.remove('expanded');
                } else {
                    faqItem.classList.add('expanded');
                }
            });
            
            // Add keyboard support for accessibility
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    this.click();
                }
            });
        }
    });
}

/**
 * Initialize download button tracking - Ensure buttons work properly
 */
function initializeDownloadTracking() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        // Ensure proper attributes are set
        if (!button.hasAttribute('href')) {
            button.setAttribute('href', 'https://swarailapk.com');
        }
        if (!button.hasAttribute('target')) {
            button.setAttribute('target', '_blank');
        }
        if (!button.hasAttribute('rel')) {
            button.setAttribute('rel', 'noopener noreferrer');
        }
        
        button.addEventListener('click', function(e) {
            // Don't prevent default - let the link work normally
            console.log('Download button clicked:', this.href);
            
            // Add brief visual feedback for user interaction
            const originalTransform = this.style.transform;
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = originalTransform;
            }, 100);
            
            // Track click event (could be used for analytics)
            trackDownloadClick(this.href);
            
            // Fallback: If for some reason the link doesn't work, open manually
            setTimeout(() => {
                if (this.href) {
                    try {
                        window.open(this.href, '_blank', 'noopener,noreferrer');
                    } catch (error) {
                        console.warn('Fallback window.open failed:', error);
                    }
                }
            }, 100);
        });
    });
}

/**
 * Track download click for analytics (placeholder function)
 */
function trackDownloadClick(url) {
    // This could integrate with analytics services
    console.log('Tracking download click to:', url);
    
    // Example: Google Analytics event tracking
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', 'download', {
    //         'event_category': 'engagement',
    //         'event_label': 'swarail_apk_download'
    //     });
    // }
}

/**
 * Initialize smooth scrolling for internal links only
 */
function initializeSmoothScroll() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without triggering navigation
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}

/**
 * Handle responsive navigation and mobile interactions
 */
function initializeMobileInteractions() {
    // Add touch feedback for mobile devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        const touchElements = document.querySelectorAll('.btn, .faq-question, .feature-category, .point-item');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function(e) {
                this.classList.add('touch-active');
            }, { passive: true });
            
            element.addEventListener('touchend', function(e) {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            }, { passive: true });
            
            element.addEventListener('touchcancel', function(e) {
                this.classList.remove('touch-active');
            }, { passive: true });
        });
    }
    
    // Handle feature card hover effects on mobile
    const featureCards = document.querySelectorAll('.feature-category');
    featureCards.forEach(card => {
        card.addEventListener('touchstart', function(e) {
            // Remove hover effect from other cards
            featureCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('mobile-hover');
                }
            });
            
            // Toggle hover effect on current card
            this.classList.toggle('mobile-hover');
        }, { passive: true });
    });
}

/**
 * Handle error states and fallbacks
 */
function initializeErrorHandling() {
    // Handle image loading errors (if we had images)
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Image failed to load:', this.src);
            this.style.display = 'none';
        });
    });
    
    // Ensure external links work properly and have proper attributes
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        // Add security attributes for external links
        if (!link.hasAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
        
        link.addEventListener('click', function(e) {
            // Log for debugging but don't prevent default
            console.log('External link clicked:', this.href);
            
            // Ensure the link has proper attributes
            if (!this.target) {
                this.target = '_blank';
            }
            if (!this.rel) {
                this.rel = 'noopener noreferrer';
            }
        });
    });
    
    // Handle potential JavaScript errors gracefully
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // Don't break the page for users
        return true;
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault();
    });
}

/**
 * Initialize scroll-based animations (optional enhancement)
 */
function initializeScrollAnimations() {
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements that should animate in
        const animateElements = document.querySelectorAll(
            '.feature-category, .point-item, .comparison-item'
        );
        
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
}

/**
 * Utility function to debounce events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Handle window resize events
 */
function initializeResizeHandlers() {
    const debouncedResize = debounce(() => {
        // Handle any resize-specific logic here
        console.log('Window resized:', window.innerWidth, 'x', window.innerHeight);
        
        // Could adjust layout or trigger responsive updates
        handleResponsiveUpdates();
    }, 250);
    
    window.addEventListener('resize', debouncedResize);
}

/**
 * Handle responsive layout updates
 */
function handleResponsiveUpdates() {
    // This could contain logic for dynamic responsive adjustments
    // For now, CSS handles most responsive behavior
    
    // Example: Adjust FAQ behavior on mobile
    const isMobile = window.innerWidth < 768;
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (isMobile) {
        // Could add mobile-specific behavior
        faqItems.forEach(item => {
            item.classList.add('mobile-layout');
        });
    } else {
        faqItems.forEach(item => {
            item.classList.remove('mobile-layout');
        });
    }
}

/**
 * Initialize page performance monitoring
 */
function initializePerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
        if ('performance' in window && performance.now) {
            const loadTime = performance.now();
            console.log('Page loaded in:', Math.round(loadTime), 'ms');
            
            // Could send to analytics service
            trackPagePerformance(loadTime);
        }
    });
}

/**
 * Track page performance (placeholder for analytics)
 */
function trackPagePerformance(loadTime) {
    // This could integrate with performance monitoring services
    console.log('Page performance:', {
        loadTime: Math.round(loadTime),
        userAgent: navigator.userAgent.substring(0, 100), // Truncate for privacy
        timestamp: new Date().toISOString()
    });
}

/**
 * Force re-initialize FAQ if needed (fallback)
 */
function reinitializeFAQ() {
    console.log('Reinitializing FAQ functionality...');
    
    // Remove existing event listeners by cloning elements
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        const newQuestion = question.cloneNode(true);
        question.parentNode.replaceChild(newQuestion, question);
    });
    
    // Reinitialize with fresh event listeners
    initializeFAQ();
}

// Initialize additional features
initializeScrollAnimations();
initializeResizeHandlers();
initializePerformanceMonitoring();

// Fallback: Reinitialize FAQ after a short delay if needed
setTimeout(() => {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        // Test if FAQ is working by checking if any items are expandable
        const firstFaq = faqItems[0];
        const firstQuestion = firstFaq.querySelector('.faq-question');
        if (firstQuestion && !firstQuestion.onclick) {
            console.log('FAQ may need reinitialization');
            reinitializeFAQ();
        }
    }
}, 1000);
