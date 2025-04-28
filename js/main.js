document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active class on the button
            this.classList.toggle('active');
            
            // Toggle active class on the content
            const content = this.nextElementSibling;
            content.classList.toggle('active');
        });
    });

    // Form submission handling
    const cleaningForm = document.getElementById('cleaning-form');
    
    cleaningForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(cleaningForm);
        const formDataObj = {};
        
        formData.forEach((value, key) => {
            // Handle multiple values for the same key (like checkboxes)
            if (formDataObj[key]) {
                if (!Array.isArray(formDataObj[key])) {
                    formDataObj[key] = [formDataObj[key]];
                }
                formDataObj[key].push(value);
            } else {
                formDataObj[key] = value;
            }
        });
        
        // Log form data for debugging
        console.log('Form data:', formDataObj);
        
        // Redirect to BookingKoala (placeholder URL - to be replaced with actual BookingKoala URL)
        // In a real implementation, this would include the form data as query parameters
        window.location.href = 'https://bookingkoala.com/cleanuity';
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to elements as they come into view
    const fadeElements = document.querySelectorAll('.feature, .step, .testimonial');
    
    const fadeInOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeInObserver.observe(element);
    });

    // Mobile optimization - ensure form fields are easy to tap
    const formInputs = document.querySelectorAll('input, select, button');
    
    formInputs.forEach(input => {
        // Add touch-friendly padding on mobile
        if (window.innerWidth < 768) {
            input.style.padding = '12px';
        }
    });
});
