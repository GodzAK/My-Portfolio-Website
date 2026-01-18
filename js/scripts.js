
document.addEventListener("DOMContentLoaded", () => {
    // MOBILE MENU TOGGLE
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });
    }

    
    // EXPERIENCE SLIDER

    let currentProject = 0;
    const projects = document.querySelectorAll(".experience-item");
    const dots = document.querySelectorAll(".pagination-dots .dot");
    let projectAutoSlide;

    function showProject(index) {
        projects.forEach(project => project.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));
        
        if (projects[index]) {
            projects[index].classList.add("active");
        }
        if (dots[index]) {
            dots[index].classList.add("active");
        }
    }

    // Show first project
    if (projects.length > 0) {
        showProject(currentProject);
    }

    // Navigation functions
    window.nextProject = function () {
        currentProject = (currentProject + 1) % projects.length;
        showProject(currentProject);
    };

    window.prevProject = function () {
        currentProject = (currentProject - 1 + projects.length) % projects.length;
        showProject(currentProject);
    };

    window.goToProject = function (index) {
        currentProject = index;
        showProject(currentProject);
    };

    // Auto-advance slider
    function startProjectSlide() {
        projectAutoSlide = setInterval(() => {
            if (projects.length > 0) {
                nextProject();
            }
        }, 6000);
    }

    function stopProjectSlide() {
        clearInterval(projectAutoSlide);
    }

    // Start auto-slide
    if (projects.length > 0) {
        startProjectSlide();
    }

    // Pause auto-slide on hover
    const experienceSlider = document.querySelector('.experience-slider');
    if (experienceSlider) {
        experienceSlider.addEventListener('mouseenter', stopProjectSlide);
        experienceSlider.addEventListener('mouseleave', startProjectSlide);
    }

    // Keyboard navigation for projects
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && document.activeElement.tagName !== 'INPUT') {
            prevProject();
        } else if (e.key === 'ArrowRight' && document.activeElement.tagName !== 'INPUT') {
            nextProject();
        }
    });

    // Touch swipe for projects
    let touchStartX = 0;
    let touchEndX = 0;

    if (experienceSlider) {
        experienceSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopProjectSlide();
        }, { passive: true });

        experienceSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleProjectSwipe();
            startProjectSlide();
        }, { passive: true });

        function handleProjectSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                nextProject();
            }
            if (touchEndX > touchStartX + swipeThreshold) {
                prevProject();
            }
        }
    }

   
    // SKILLS CAROUSEL
   
    const track = document.querySelector(".carousel-track");
    const cards = document.querySelectorAll(".skill-card");
    
    if (track && cards.length > 0) {
        let skillIndex = 0;
        let skillAutoSlide;

        function updateCarousel() {
            if (cards.length > 0) {
                const width = cards[0].offsetWidth;
                track.style.transform = `translateX(-${skillIndex * width}px)`;
            }
        }

        // Navigation functions
        window.nextSkill = function () {
            skillIndex = (skillIndex + 1) % cards.length;
            updateCarousel();
        };

        window.prevSkill = function () {
            skillIndex = (skillIndex - 1 + cards.length) % cards.length;
            updateCarousel();
        };

        // Auto slide every 4 seconds
        function startAutoSlide() {
            skillAutoSlide = setInterval(nextSkill, 4000);
        }

        function stopAutoSlide() {
            clearInterval(skillAutoSlide);
        }

        // Start auto-slide
        startAutoSlide();

        // Pause auto-slide on hover
        const skillsCarousel = document.querySelector('.skills-carousel');
        if (skillsCarousel) {
            skillsCarousel.addEventListener('mouseenter', stopAutoSlide);
            skillsCarousel.addEventListener('mouseleave', startAutoSlide);
        }

        // Update on window resize
        window.addEventListener("resize", updateCarousel);

        // Touch swipe support for skills
        let skillTouchStartX = 0;
        let skillTouchEndX = 0;

        if (skillsCarousel) {
            skillsCarousel.addEventListener('touchstart', (e) => {
                skillTouchStartX = e.changedTouches[0].screenX;
                stopAutoSlide();
            }, { passive: true });

            skillsCarousel.addEventListener('touchend', (e) => {
                skillTouchEndX = e.changedTouches[0].screenX;
                handleSkillSwipe();
                startAutoSlide();
            }, { passive: true });

            function handleSkillSwipe() {
                const swipeThreshold = 50;
                if (skillTouchEndX < skillTouchStartX - swipeThreshold) {
                    nextSkill();
                }
                if (skillTouchEndX > skillTouchStartX + swipeThreshold) {
                    prevSkill();
                }
            }
        }

        console.log('✅ Skills carousel loaded successfully!');
    }

  
    // ACHIEVEMENTS SECTION ENHANCEMENTS
    
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    if (achievementCards.length > 0) {
        // Scroll reveal animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        achievementCards.forEach(card => {
            observer.observe(card);
        });
        
        // 3D Tilt Effect
        achievementCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateY(-15px)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
        
        // Badge Click Animation
        const badges = document.querySelectorAll('.achievement-badge');
        
        badges.forEach(badge => {
            badge.addEventListener('click', (e) => {
                e.preventDefault();
                
                badge.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    badge.style.transform = 'scale(1.1)';
                }, 100);
                
                setTimeout(() => {
                    badge.style.transform = 'scale(1)';
                }, 200);
            });
        });
        
        // Achievement Counter Animation
        function animateCounter() {
            const achievementsSection = document.querySelector('.achievements');
            if (!achievementsSection) return;
            
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const totalAchievements = achievementCards.length;
                        
                        const counterDiv = document.createElement('div');
                        counterDiv.className = 'achievements-counter';
                        counterDiv.style.cssText = `
                            text-align: center;
                            margin-bottom: 3rem;
                            font-size: 1.8rem;
                            color: #b74b4b;
                        `;
                        
                        let count = 0;
                        const interval = setInterval(() => {
                            count++;
                            counterDiv.textContent = `${count} Achievement${count !== 1 ? 's' : ''} Earned`;
                            
                            if (count >= totalAchievements) {
                                clearInterval(interval);
                            }
                        }, 200);
                        
                        const container = document.querySelector('.achievements-container');
                        if (container && !document.querySelector('.achievements-counter')) {
                            container.parentNode.insertBefore(counterDiv, container);
                        }
                        
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            counterObserver.observe(achievementsSection);
        }
        
        animateCounter();
        
        // Button Ripple Effect
        const achievementButtons = document.querySelectorAll('.achievement-card .btn');
        
        achievementButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    width: 20px;
                    height: 20px;
                    left: ${x}px;
                    top: ${y}px;
                    transform: translate(-50%, -50%) scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                `;
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add ripple animation CSS
        if (!document.getElementById('ripple-animation-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation-style';
            style.textContent = `
                @keyframes ripple-animation {
                    to {
                        transform: translate(-50%, -50%) scale(20);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Lazy Load Images
        const badgeImages = document.querySelectorAll('.achievement-badge img');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    
                    setTimeout(() => {
                        img.style.transition = 'opacity 0.8s ease';
                        img.style.opacity = '1';
                    }, 100);
                    
                    imageObserver.unobserve(img);
                }
            });
        }, { threshold: 0.1 });
        
        badgeImages.forEach(img => {
            imageObserver.observe(img);
        });
        
        console.log('✅ Achievements section enhanced!');
    }

   
    // SMOOTH SCROLLING & ACTIVE NAV LINK
   
    const sections = document.querySelectorAll('section');
    const navLinksAll = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });

        // Header scroll effect
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });

  
    // SCROLL REVEAL ANIMATIONS
    
    const fadeObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, fadeObserverOptions);

    // Observe animated elements
    const animatedElements = document.querySelectorAll(
        '.service-box, .education-box, .contact-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });

   
    // PARTICLE BACKGROUND EFFECT
    
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        `;
        document.body.appendChild(particlesContainer);

        // Create 30 particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 3 + 1;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(183, 75, 75, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float ${duration}s linear ${delay}s infinite;
                box-shadow: 0 0 ${size * 2}px rgba(183, 75, 75, 0.5);
            `;
            particlesContainer.appendChild(particle);
        }

        // Add CSS animation for particles
        if (!document.getElementById('particle-animation')) {
            const style = document.createElement('style');
            style.id = 'particle-animation';
            style.textContent = `
                @keyframes float {
                    0% {
                        transform: translateY(0) translateX(0) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    createParticles();

    
    // SCROLL TO TOP BUTTON
   
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #b74b4b, #d35555);
        border: 2px solid #b74b4b;
        border-radius: 50%;
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 99;
        box-shadow: 0 5px 20px rgba(183, 75, 75, 0.4);
    `;
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
        scrollTopBtn.style.boxShadow = '0 8px 30px rgba(183, 75, 75, 0.6)';
    });

    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = 'translateY(0) scale(1)';
        scrollTopBtn.style.boxShadow = '0 5px 20px rgba(183, 75, 75, 0.4)';
    });

    
    // CONSOLE MESSAGE
 
    console.log('%c🚀 Ultimate Enhanced Portfolio Loaded!', 'color: #b74b4b; font-size: 20px; font-weight: bold;');
    console.log('%c✨ Developed by Godwin Dela Cruz', 'color: #d35555; font-size: 14px;');
    console.log('%c📧 Contact: delacruzgodwin4@gmail.com', 'color: #888; font-size: 12px;');
    console.log('%c💼 Features: Mobile Menu | Skills Carousel | 3D Achievements | Smooth Animations', 'color: #b74b4b; font-size: 11px;');
});