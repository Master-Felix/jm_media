document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    document.body.classList.add('fade-in-up');

    // Smooth scroll for navigation with offset for fixed navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (!target) return;
            
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const navbarToggler = document.querySelector('.navbar-toggler');
                if (navbarToggler) {
                    navbarToggler.click();
                }
            }
        });
    });

    // Portfolio filtering with modern animation
    const portfolioFilterButtons = document.querySelectorAll('#portfolio [data-filter]');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioFilterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const filterValue = button.getAttribute('data-filter');
            
            // Add ripple effect
            createRipple(button, e);
            
            // Update active state
            portfolioFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter portfolio items with animation
            let visibleCount = 0;
            portfolioItems.forEach((item, index) => {
                const categories = item.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8) translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1) translateY(0)';
                            item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        }, 10);
                    }, 50 * visibleCount++);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8) translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Service Section Filtering
    const serviceFilterButtons = document.querySelectorAll('#services [data-filter]');
    const serviceItems = document.querySelectorAll('.service-item');

    if (serviceFilterButtons.length && serviceItems.length) {
        serviceFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                serviceFilterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                // Add animation to service items
                serviceItems.forEach((item, index) => {
                    const category = item.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === category) {
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.display = '';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transition = 'all 0.4s ease';
                            }, 10);
                        }, index * 50);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Contact form handling with improved validation
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate form fields
            const firstName = this.querySelector('#firstName').value.trim();
            const lastName = this.querySelector('#lastName').value.trim();
            const email = this.querySelector('#email').value.trim();
            const projectType = this.querySelector('#projectType').value;
            const message = this.querySelector('#message').value.trim();
            
            if (!firstName || !lastName || !email || !projectType || !message) {
                showNotification('Please fill in all required fields', 'danger');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'danger');
                return;
            }
            
            // Add loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
            submitBtn.disabled = true;
            
            // Submit form to Formspree
            try {
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                    // Reset form
                    this.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                // Show error message
                showNotification('Failed to send message. Please try again or contact us directly.', 'danger');
                console.error('Form submission error:', error);
            } finally {
                // Restore button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // Statistics counter animation
    const statElements = document.querySelectorAll('.col-4 h4');
    
    if (statElements.length) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    animateCounter(entry.target);
                    entry.target.dataset.animated = 'true';
                    statsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        });

        statElements.forEach(stat => {
            if (stat.textContent.includes('+')) {
                statsObserver.observe(stat);
            }
        });
    }

    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + '+';
        }, 16);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px; animation: slideInRight 0.3s ease-out;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 150);
            }
        }, 5000);
    }

    // Enhanced navbar with scroll effects
    const navbar = document.querySelector('#mainNav');
    let lastScrollY = window.scrollY;
    let scrollTimeout;

    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add blur and shadow on scroll
            if (currentScrollY > 50) {
                navbar.style.background = 'rgba(15, 23, 42, 0.98)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
            } else {
                navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = 'none';
            }

            // Hide/show navbar on scroll (with delay for better UX)
            clearTimeout(scrollTimeout);
            
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                scrollTimeout = setTimeout(() => {
                    navbar.style.transform = 'translateY(-100%)';
                    navbar.style.transition = 'transform 0.3s ease';
                }, 150);
            } else if (currentScrollY < lastScrollY) {
                navbar.style.transform = 'translateY(0)';
                navbar.style.transition = 'transform 0.3s ease';
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
    }

    // Initialize carousel with custom options
    const heroCarouselEl = document.getElementById('heroCarousel');
    if (heroCarouselEl) {
        const heroCarousel = new bootstrap.Carousel(heroCarouselEl, {
            interval: 3000,
            pause: 'hover',
            wrap: true,
            touch: true
        });

        // Carousel Progress Bar Animation
        const progressBar = document.querySelector('.carousel-progress-bar');
        if (progressBar) {
            let progress = 0;
            const interval = 3000;
            const updateInterval = 10;
            const increment = (100 / interval) * updateInterval;
            
            function updateProgressBar() {
                progress += increment;
                if (progress >= 100) {
                    progress = 0;
                }
                progressBar.style.width = progress + '%';
            }
            
            const progressInterval = setInterval(updateProgressBar, updateInterval);
            
            // Reset on carousel slide change
            heroCarouselEl.addEventListener('slide.bs.carousel', function() {
                progress = 0;
                progressBar.style.width = '0%';
            });
        }
    }

    // Back-to-Top visibility and behavior
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        const toggleBackToTop = () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        };
        
        window.addEventListener('scroll', toggleBackToTop, { passive: true });
        toggleBackToTop();

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Active nav link highlight using IntersectionObserver
    const sections = Array.from(document.querySelectorAll('section[id], header[id]'));
    const navLinks = Array.from(document.querySelectorAll('#mainNav .nav-link[href^="#"]'));
    const linkMap = new Map(
        navLinks.map(a => [a.getAttribute('href').replace('#',''), a])
    );

    if (sections.length && navLinks.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.id;
                const link = linkMap.get(id);
                if (!link) return;
                if (entry.isIntersecting) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });
        }, {
            root: null,
            threshold: 0.4,
            rootMargin: '0px 0px -40% 0px'
        });

        sections.forEach(sec => sectionObserver.observe(sec));
    }

    // Add intersection observer for fade-in animations
    const animationObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, animationObserverOptions);

    // Observe elements for animations
    document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .team-card').forEach(el => {
        observer.observe(el);
    });

    // Add hover effects to service cards
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(this, e);
        });
    });

    // Lazy-load non-critical images with performance optimization
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.loading = 'lazy';
                img.decoding = 'async';
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img:not([data-eager])').forEach(img => {
        const inHero = img.closest('#hero');
        if (!inHero) {
            imageObserver.observe(img);
        }
    });

    // Scroll reveal animation for sections
    const revealSections = document.querySelectorAll('section');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    revealSections.forEach(section => {
        revealObserver.observe(section);
    });

    // Add loading state for better UX
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// Ripple effect function
function createRipple(element, event) {
    if (!element) return;
    
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = (event?.clientX ?? rect.left + rect.width / 2) - rect.left - size / 2;
    const y = (event?.clientY ?? rect.top + rect.height / 2) - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add custom styles for animations
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .fade-in-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: all 0.6s ease-out;
    }
    
    .back-to-top {
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .back-to-top.show {
        opacity: 1;
        visibility: visible;
    }
`;
document.head.appendChild(style);
