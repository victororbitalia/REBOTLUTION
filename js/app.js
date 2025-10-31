document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
            
            // Scroll to section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const headerHeight = document.querySelector('.header').offsetHeight;
        const scrollPosition = window.scrollY + headerHeight + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Modal Functionality
    const modal = document.getElementById('demoModal');
    const tryFreeBtn = document.getElementById('tryFreeBtn');
    const closeModal = document.querySelector('.close-modal');
    
    if (tryFreeBtn && modal) {
        tryFreeBtn.addEventListener('click', function() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    const demoForm = document.getElementById('demoForm');
    const successMessage = document.getElementById('successMessage');
    
    // Contact Form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(contactForm)) {
                // Show success message
                showSuccessMessage();
                
                // Reset form
                contactForm.reset();
            }
        });
    }
    
    // Demo Form
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(demoForm)) {
                // Show success message
                showSuccessMessage();
                
                // Close modal
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Reset form
                demoForm.reset();
            }
        });
    }
    
    // Form Validation Function
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showError(field, 'Este campo es obligatorio');
                isValid = false;
            } else {
                clearError(field);
                
                // Additional validation based on field type
                if (field.type === 'email' && !validateEmail(field.value)) {
                    showError(field, 'Por favor, introduce un email válido');
                    isValid = false;
                } else if (field.type === 'tel' && !validatePhone(field.value)) {
                    showError(field, 'Por favor, introduce un número de teléfono válido');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    // Email Validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Phone Validation
    function validatePhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 9;
    }
    
    // Show Error Message
    function showError(field, message) {
        clearError(field);
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#e34429';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '5px';
        
        field.parentNode.appendChild(errorElement);
        field.style.borderColor = '#e34429';
    }
    
    // Clear Error Message
    function clearError(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
        field.style.borderColor = '#ddd';
    }
    
    // Show Success Message
    function showSuccessMessage() {
        if (successMessage) {
            successMessage.style.display = 'block';
            
            // Hide after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // Call Button
    const callBtn = document.getElementById('callBtn');
    if (callBtn) {
        callBtn.addEventListener('click', function() {
            // In a real application, this would initiate a call or open a dialer
            window.location.href = 'tel:600213456';
        });
    }
    
    // How It Works Button
    const howItWorksBtn = document.getElementById('howItWorksBtn');
    if (howItWorksBtn) {
        howItWorksBtn.addEventListener('click', function() {
            const howItWorksSection = document.getElementById('how-it-works');
            if (howItWorksSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = howItWorksSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#how-it-works') {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Pricing Card Selection
    const pricingCards = document.querySelectorAll('.pricing-card button');
    
    pricingCards.forEach(button => {
        button.addEventListener('click', function() {
            const planName = this.closest('.pricing-card').querySelector('.pricing-title').textContent;
            
            // In a real application, this would redirect to a signup page or open a modal
            alert(`Has seleccionado el plan: ${planName}`);
        });
    });
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-item, .how-it-works-item, .why-choose-item, .pricing-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const elementsToAnimate = document.querySelectorAll('.feature-item, .how-it-works-item, .why-choose-item, .pricing-card');
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run animation on page load
    animateOnScroll();
});