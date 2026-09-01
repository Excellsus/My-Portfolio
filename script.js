
    (function() {
        const words = ["Web Developer", "Game Developer", "Media Editor", "Photographer"];
        const typingElement = document.querySelector('.typing-text span');
        if (!typingElement) return;

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const typeSpeed = 80;      // Speed of typing (ms per character)
        const deleteSpeed = 40;    // Speed of deleting (faster, like holding backspace)
        const pauseAfterWord = 2000; // Pause after typing complete word
        const pauseBeforeType = 500; // Pause before typing new word
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                // Deleting characters
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    setTimeout(type, pauseBeforeType);
                } else {
                    setTimeout(type, deleteSpeed);
                }
            } else {
                // Typing characters
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentWord.length) {
                    isDeleting = true;
                    setTimeout(type, pauseAfterWord);
                } else {
                    setTimeout(type, typeSpeed);
                }
            }
        }
        
        // Start typing animation
        setTimeout(type, 1000);
    })();

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = Array.from(document.querySelectorAll('nav a[href^="#"]'));
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    function setActiveNav(sectionId) {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;
            link.classList.toggle('active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            setActiveNav(link.getAttribute('href').slice(1));
        });
    });

    if (sections.length) {
        const sectionObserver = new IntersectionObserver((entries) => {
            const visibleSections = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visibleSections.length) {
                setActiveNav(visibleSections[0].target.id);
            }
        }, {
            rootMargin: '-25% 0px -60% 0px',
            threshold: [0, 0.1, 0.25]
        });

        sections.forEach((section) => sectionObserver.observe(section));

        const initialSection = window.location.hash.slice(1);
        if (initialSection && sections.some((section) => section.id === initialSection)) {
            setActiveNav(initialSection);
        }
    }

    // Obfuscate the email address to prevent scraping
    const user = "excellsusjavier";
    const domain = "gmail.com";
    const email = user + "@" + domain;

    // Contact form or text
    const emailText = document.getElementById("email-text");
    if (emailText) {
        emailText.textContent = email;
    }

    // Social icon trigger opening web-based Gmail composer
    const emailLink = document.getElementById("email-link");
    if (emailLink) {
        // Fallback to web-based Gmail composer to ensure it works for everyone
        emailLink.href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + email;
        emailLink.setAttribute("target", "_blank"); 
    }

    const heroSlides = Array.from(document.querySelectorAll('.hero-slideshow .hero-image'));
    const heroDots = Array.from(document.querySelectorAll('.dots-nav .dot'));

    if (heroSlides.length > 1) {
        let activeIndex = heroSlides.findIndex((slide) => slide.classList.contains('is-active'));
        if (activeIndex === -1) {
            activeIndex = 0;
            heroSlides[0].classList.add('is-active');
        }

        const slideInterval = 2500;
        let autoSlideTimer = null;

        function updateDotState(index) {
            heroDots.forEach((dot, dotIndex) => {
                const isActive = dotIndex === index;
                dot.classList.toggle('is-active', isActive);

                if (isActive) {
                    dot.setAttribute('aria-current', 'true');
                    dot.style.backgroundColor = '#f4f4f4';
                    dot.style.borderColor = 'rgba(17, 17, 17, 0.35)';
                    dot.style.boxShadow = '0 0 0 4px rgba(17, 17, 17, 0.08)';
                    dot.style.transform = 'scale(1.2)';
                } else {
                    dot.removeAttribute('aria-current');
                    dot.style.backgroundColor = '#111111';
                    dot.style.borderColor = 'rgba(17, 17, 17, 0.15)';
                    dot.style.boxShadow = 'inset 0 0 0 1px rgba(255, 255, 255, 0.25)';
                    dot.style.transform = '';
                }
            });
        }

        function startAutoSlide() {
            window.clearInterval(autoSlideTimer);
            autoSlideTimer = window.setInterval(() => {
                const nextIndex = (activeIndex + 1) % heroSlides.length;
                showSlide(nextIndex, false);
            }, slideInterval);
        }

        function showSlide(nextIndex, shouldRestartTimer = true) {
            const currentSlide = heroSlides[activeIndex];
            const nextSlide = heroSlides[nextIndex];

            if (currentSlide === nextSlide) {
                if (shouldRestartTimer) {
                    startAutoSlide();
                }
                return;
            }

            currentSlide.classList.remove('is-active');
            currentSlide.classList.add('is-exiting');

            nextSlide.classList.add('is-active');
            nextSlide.classList.remove('is-exiting');

            window.setTimeout(() => {
                currentSlide.classList.remove('is-exiting');
            }, 700);

            activeIndex = nextIndex;
            updateDotState(activeIndex);

            if (shouldRestartTimer) {
                startAutoSlide();
            }
        }

        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index, true);
            });
        });

        updateDotState(activeIndex);
        startAutoSlide();
    }
});

