  // Counter Animation
 function animateCounters() {
     const counters = document.querySelectorAll('.stat-number');
     
     counters.forEach(counter => {
         const target = parseInt(counter.getAttribute('data-target'));
         const increment = target / 100;
         let current = 0;
         
         const updateCounter = () => {
             if (current < target) {
                 current += increment;
                 counter.textContent = Math.ceil(current);
                 setTimeout(updateCounter, 30);
             } else {
                 counter.textContent = target;
             }
         };
         
         updateCounter();
     });
 }

 // Intersection Observer for animations
 const observerOptions = {
     threshold: 0.3,
     rootMargin: '0px 0px -100px 0px'
 };

 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('fade-in');
             
             // Trigger counter animation when stats section is visible
             if (entry.target.classList.contains('stats-section')) {
                 animateCounters();
             }
         }
     });
 }, observerOptions);

 // Observe elements for animation
 document.addEventListener('DOMContentLoaded', function() {
     const animateElements = document.querySelectorAll('.info-card, .step-card, .stats-section, .chart-container');
     animateElements.forEach(el => observer.observe(el));

     // Smooth scrolling for navigation links
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

     // Add scroll effect to navbar
     window.addEventListener('scroll', function() {
         const navbar = document.querySelector('.navbar');
         if (window.scrollY > 100) {
             navbar.style.backgroundColor = 'rgba(45, 80, 22, 0.95)';
             navbar.style.backdropFilter = 'blur(10px)';
         } else {
             navbar.style.backgroundColor = 'var(--primary-green)';
             navbar.style.backdropFilter = 'none';
         }
     });
 });

 // Add interactive hover effects
 document.querySelectorAll('.info-card, .step-card').forEach(card => {
     card.addEventListener('mouseenter', function() {
         this.style.transform = 'translateY(-10px) scale(1.02)';
     });
     
     card.addEventListener('mouseleave', function() {
         this.style.transform = 'translateY(0) scale(1)';
     });
 });
