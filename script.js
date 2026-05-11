document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll listener for navbar background effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
        }
    });

    // Improved Intersection Observer for buttery smooth fade-ins
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-scroll');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation classes
    const animatedElements = document.querySelectorAll('.glass-card, .section-title, .hero-content, .edu-item, .awards-list li');
    animatedElements.forEach((el, index) => {
        el.classList.add('hidden-scroll');
        
        // Add staggered delays for elements in grids
        if (el.closest('.projects-grid') || el.closest('.skills-container')) {
            const delay = (index % 4) + 1;
            el.classList.add(`delay-${delay}`);
        }
        
        observer.observe(el);
    });
});
