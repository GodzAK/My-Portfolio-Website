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

        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = 'auto';
            });
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = 'auto';
            }
        });
    }
    // CONTACT - COPY TO CLIPBOARD
const copyButtons = document.querySelectorAll('.copy-btn');
copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const parent = btn.closest('.contact-item');
        const textToCopy = parent.getAttribute('data-copy');
        navigator.clipboard.writeText(textToCopy).then(() => {
            const icon = btn.querySelector('i');
            icon.className = 'fa-solid fa-check';
            btn.classList.add('copied');
            setTimeout(() => {
                icon.className = 'fa-regular fa-copy';
                btn.classList.remove('copied');
            }, 1500);
        });
    });
});


    // EXPERIENCE / PROJECTS SLIDER

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

    if (projects.length > 0) {
        showProject(currentProject);
    }

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

    if (projects.length > 0) {
        startProjectSlide();
    }

    const experienceSlider = document.querySelector('.experience-slider');
    if (experienceSlider) {
        experienceSlider.addEventListener('mouseenter', stopProjectSlide);
        experienceSlider.addEventListener('mouseleave', startProjectSlide);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && document.activeElement.tagName !== 'INPUT') {
            prevProject();
        } else if (e.key === 'ArrowRight' && document.activeElement.tagName !== 'INPUT') {
            nextProject();
        }
    });

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


    // ACHIEVEMENTS - SCROLL REVEAL

    const achievementCards = document.querySelectorAll('.achievement-card');

    if (achievementCards.length > 0) {
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
    }


    // SMOOTH SCROLLING & ACTIVE NAV LINK

    const sections = document.querySelectorAll('section');
    const navLinksAll = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
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

        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });


    // SCROLL REVEAL FOR SERVICE / SKILL / EDUCATION / CONTACT BOXES

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

    const animatedElements = document.querySelectorAll(
        '.service-box, .skill-item, .timeline-item, .contact-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeObserver.observe(el);
    });


    // SCROLL TO TOP BUTTON

    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');

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

});