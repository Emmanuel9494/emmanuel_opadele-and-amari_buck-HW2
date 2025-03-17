export function ClockAnimations() {
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initial page load animations
function initLoadAnimations() {
    // Header animation
    gsap.from('.site-header', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Hero content animations
    const heroTimeline = gsap.timeline({ delay: 0.5 });
    heroTimeline
        .from('.hero-content h1', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .from('.hero-content p', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.cta-button', {
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out'
        }, '-=0.3')
        .from('.hero-image', {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.8');
}



// Scroll animations
function initScrollAnimations() {
    // Clock App section animation
    gsap.from('.section-header', {
        scrollTrigger: {
            trigger: '.clock-app',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Add Clock button animation
    gsap.from('#addClock', {
        scrollTrigger: {
            trigger: '.controls',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)'
    });

    // Video section parallax effect
    gsap.to('.video-container', {
        scrollTrigger: {
            trigger: '.video-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: -100,
        ease: 'none'
    });

    // Info cards stagger animation
    gsap.from('.info-card', {
        scrollTrigger: {
            trigger: '.info-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Footer sections animation
    gsap.from('.footer-section', {
        scrollTrigger: {
            trigger: '.site-footer',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });
}



(() => {
    gsap.registerPlugin(ScrollToPlugin);
  
    const navLinks = document.querySelectorAll(".cta-button");
    const navButtons = document.querySelectorAll(".cta-button");
    
      function scrollLink(e) {
          e.preventDefault(); 
          console.log(e.currentTarget.hash);
          const selectedLink = e.currentTarget.hash;
          gsap.to(window, { duration: 1, scrollTo: { y: selectedLink, offsetY: 100 } });
      }
    
      function buttonLink(e) {
          e.preventDefault();  // If needed to prevent the default behavior (in case of <a> links)
    
          // Get the target section from the data-target attribute
          const selectedLink = e.currentTarget.getAttribute('data-target');
          gsap.to(window, { duration: 1, scrollTo: { y: selectedLink, offsetY: 100 } });
      }
    
      // Add event listeners to the navLinks (anchor links)
      navLinks.forEach((link) => {
          link.addEventListener("click", scrollLink);
      });
    
      // Add event listeners to the navButtons (buttons with data-target attribute)
      navButtons.forEach(button => {
          button.addEventListener("click", buttonLink);
      });
})();
// Clock animations
function initClockAnimations() {
    // Observer for new clocks being added
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.classList && node.classList.contains('clock')) {
                    // Animate new clock entry
                    gsap.from(node, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power3.out'
                    });
                }
            });
        });
    });

    // Start observing the clocks container
    observer.observe(document.getElementById('clocksContainer'), {
        childList: true
    });
}

// Modal animations
function initModalAnimations() {
    const modal = document.getElementById('newClockModal');
    
    // Show modal animation
    function animateModalShow() {
        if (modal.style.display === 'block') {
            gsap.from('.modal-content', {
                y: -50,
                opacity: 0,
                duration: 0.3,
                ease: 'power3.out'
            });
        }
    }

    // Create observer for modal display changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                animateModalShow();
            }
        });
    });

    observer.observe(modal, {
        attributes: true
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initLoadAnimations();
    initScrollAnimations();
    initClockAnimations();
    initModalAnimations();
}); 
}