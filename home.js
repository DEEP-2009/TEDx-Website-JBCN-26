document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Countdown Timer with persistence
    function updateCountdown() {
        let eventTime = localStorage.getItem('eventTime');

        if (!eventTime) {
            const eventDate = new Date('2026-01-23T12:00:00').getTime();
            localStorage.setItem('eventTime', eventDate);
            eventTime = eventDate;
        }

        const now = new Date().getTime();
        const distance = eventTime - now;

        const days = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
        const hours = Math.max(
            0,
            Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        );
        const minutes = Math.max(
            0,
            Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        );
        const seconds = Math.max(
            0,
            Math.floor((distance % (1000 * 60)) / 1000)
        );

        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');

        if (daysElement) daysElement.textContent = days;
        if (hoursElement) hoursElement.textContent = hours;
        if (minutesElement) minutesElement.textContent = minutes;
        if (secondsElement) secondsElement.textContent = seconds;

        if (distance <= 0) {
            clearInterval(window.countdownInterval);
        }
    }

    if (document.getElementById('days')) {
        updateCountdown();
        window.countdownInterval = setInterval(updateCountdown, 1000);
    }

    // Contact Form Handler
    function handleSubmit() {
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;

        if (!name || !email || !message) {
            alert('Please fill in all fields!');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address!');
            return;
        }

        alert('Thank you for your message! We will get back to you soon.');

        document.getElementById('contactName').value = '';
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactMessage').value = '';
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.speaker-card, .event-detail-card, .chief-guest-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Page Navigation
    const aboutUsBtn = document.getElementById('aboutUs');
    if (aboutUsBtn) {
        aboutUsBtn.addEventListener('click', () => {
            window.location.href = '../aboutPage/about.html';
        });
    }
});
