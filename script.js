document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);



    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';

        if (navLinks.classList.contains('active')) {
            gsap.fromTo('.nav-links li',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, delay: 0.2 }
            );
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Navbar Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Loading Animation
    const tl = gsap.timeline();

    // Frame expansion
    tl.from('.vintage-frame', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    })
        .from('.ornament', {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1
        }, "-=0.5")

        // Icons pop in (Cross Animation)
        .fromTo('.scissor',
            { x: -100, opacity: 0, rotation: -90 },
            { x: 0, opacity: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
        )
        .fromTo('.comb',
            { x: 100, opacity: 0, rotation: 90 },
            { x: 0, opacity: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" },
            "<" // Run at start of previous animation
        )

        // Text reveal
        .to('.loader-logo .letter', {
            y: 0,
            stagger: 0.05,
            duration: 0.8,
            ease: 'power4.out'
        }, "-=0.3")

        // Tagline fade up
        .to('.loader-tagline', {
            y: 0,
            opacity: 1,
            duration: 0.6
        }, "-=0.5")

        // Exit animation
        .to('.vintage-frame', {
            scale: 1.1,
            opacity: 0,
            duration: 0.8,
            delay: 0.5,
            ease: "power2.in"
        })
        .to('.preloader', {
            y: '-100%',
            duration: 1,
            ease: 'power4.inOut'
        }, "-=0.4")

        // Hero reveal
        .from('.hero h1', {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power4.out'
        }, "-=0.5")
        .fromTo('.hero p', 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, 
            "-=0.8"
        )
        .fromTo('.hero .cta-btn', 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, 
            "-=0.8"
        );

    // Scroll Animations
    gsap.utils.toArray('.service-category').forEach(card => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        });
    });

    gsap.utils.toArray('.academy-card').forEach(card => {
        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        });
    });

    gsap.utils.toArray('.feature-box').forEach(box => {
        gsap.to(box, {
            scrollTrigger: {
                trigger: box,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
        });
    });

    // Parallax Effect for Hero
    gsap.to('.hero-overlay', {
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: 200,
        scale: 1.1
    });

    // Filtering Logic with Animation
    const filterBtns = document.querySelectorAll('.filter-btn');
    const serviceCategories = document.querySelectorAll('.service-category');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            serviceCategories.forEach(category => {
                gsap.killTweensOf(category); // Stop any ongoing animations

                if (filterValue === 'all' || category.getAttribute('data-category') === filterValue) {
                    category.style.display = 'inline-block';
                    gsap.fromTo(category, 
                        { opacity: 0, scale: 0.95 },
                        { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
                    );
                } else {
                    category.style.display = 'none';
                }
            });

            // Re-refresh scroll trigger after filtering
            setTimeout(() => {
                ScrollTrigger.refresh();
            }, 100);
        });
    });


    // Gold Salon Tools Background Animation
    const canvas = document.getElementById('hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 20; // Fewer particles since they are larger icons

        class ToolParticle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 40 + 40; // Size 40-80px (Much Larger)
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.02;
                this.opacity = Math.random() * 0.3 + 0.1; // Low opacity
                this.type = Math.random() > 0.5 ? 'scissor' : 'comb'; // 50% chance
                this.color = `rgba(212, 175, 55, ${this.opacity})`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.rotation += this.rotationSpeed;

                // Wrap around
                if (this.x < -50) this.x = canvas.width + 50;
                if (this.x > canvas.width + 50) this.x = -50;
                if (this.y < -50) this.y = canvas.height + 50;
                if (this.y > canvas.height + 50) this.y = -50;
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.fillStyle = this.color;
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 2;

                if (this.type === 'scissor') {
                    // Draw Scissor
                    // Handle 1
                    ctx.beginPath();
                    ctx.arc(-5, 10, 3, 0, Math.PI * 2);
                    ctx.stroke();
                    // Handle 2
                    ctx.beginPath();
                    ctx.arc(5, 10, 3, 0, Math.PI * 2);
                    ctx.stroke();
                    // Blades
                    ctx.beginPath();
                    ctx.moveTo(-5, 7);
                    ctx.lineTo(8, -10);
                    ctx.moveTo(5, 7);
                    ctx.lineTo(-8, -10);
                    ctx.stroke();
                } else {
                    // Draw Comb
                    ctx.beginPath();
                    ctx.fillRect(-10, -5, 20, 4); // Spine
                    // Teeth
                    for (let i = -10; i < 10; i += 2.5) {
                        ctx.fillRect(i, -1, 1.5, 8);
                    }
                    ctx.fill();
                }

                ctx.restore();
            }
        }

        function initParticles() {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new ToolParticle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles.length = 0;
            initParticles();
        });
    }
});
