/* ==========================================================================
   NOVA TECH - Main JavaScript (script.js)
   Beginner-friendly, Clean, Interactivity & Form Validation
   ========================================================================== */

// Wait until the DOM content is fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. MOBILE MENU TOGGLE
       ---------------------------------------------------------------------- */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navMenu) {
        // Toggle mobile menu visibility when hamburger button is clicked
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Update accessibility aria attribute
            const isExpanded = hamburgerBtn.classList.contains('active');
            hamburgerBtn.setAttribute('aria-expanded', isExpanded);
        });

        // Close mobile menu when a navigation link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }


    /* ----------------------------------------------------------------------
       2. ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
       ---------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(currentSection => {
            const sectionHeight = currentSection.offsetHeight;
            const sectionTop = currentSection.offsetTop - 120; // Offset for header height
            const sectionId = currentSection.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

            if (correspondingNavLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingNavLink.classList.add('active');
                } else {
                    correspondingNavLink.classList.remove('active');
                }
            }
        });
    }

    // Attach scroll event listener for active link highlight
    window.addEventListener('scroll', highlightActiveNavLink);


    /* ----------------------------------------------------------------------
       3. CONTACT FORM VALIDATION & SUBMISSION
       ---------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            // Prevent standard form submission (page refresh)
            event.preventDefault();

            // Clear previous error messages & styles
            clearFormErrors();

            // Retrieve form input values
            const nameInput = document.getElementById('fullname');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            const nameValue = nameInput.value.trim();
            const emailValue = emailInput.value.trim();
            const subjectValue = subjectInput.value.trim();
            const messageValue = messageInput.value.trim();

            let isValid = true;

            // Validate Full Name
            if (nameValue === '') {
                showInputError(nameInput, 'name-error', 'Please enter your full name.');
                isValid = false;
            }

            // Validate Email Address using simple Regular Expression
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailValue === '') {
                showInputError(emailInput, 'email-error', 'Please enter your email address.');
                isValid = false;
            } else if (!emailPattern.test(emailValue)) {
                showInputError(emailInput, 'email-error', 'Please enter a valid email address.');
                isValid = false;
            }

            // Validate Subject
            if (subjectValue === '') {
                showInputError(subjectInput, 'subject-error', 'Please enter a subject.');
                isValid = false;
            }

            // Validate Message
            if (messageValue === '') {
                showInputError(messageInput, 'message-error', 'Please write your message.');
                isValid = false;
            }

            // If form inputs are valid, show success message and reset form
            if (isValid) {
                showFormAlert('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
                contactForm.reset();

                // Hide success message after 6 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                    formMessage.className = 'form-message';
                }, 6000);
            } else {
                showFormAlert('Please fix the errors above before submitting.', 'error');
            }
        });
            // Clear individual input error state as user types
            const allInputs = contactForm.querySelectorAll('input, textarea');
            allInputs.forEach(input => {
                input.addEventListener('input', () => {
                    input.classList.remove('invalid');
                    const errorSpan = document.getElementById(`${input.id === 'fullname' ? 'name' : input.id}-error`);
                    if (errorSpan) {
                        errorSpan.textContent = '';
                    }
                });
            });
        });
    }

    /**
     * Helper function to display input-specific error messages
     */
    function showInputError(inputElement, errorSpanId, errorMessage) {
        inputElement.classList.add('invalid');
        const errorSpan = document.getElementById(errorSpanId);
        if (errorSpan) {
            errorSpan.textContent = errorMessage;
        }
    }

    /**
     * Helper function to clear all error styles & messages
     */
    function clearFormErrors() {
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => input.classList.remove('invalid'));

        const errorSpans = contactForm.querySelectorAll('.error-text');
        errorSpans.forEach(span => span.textContent = '');

        formMessage.style.display = 'none';
        formMessage.className = 'form-message';
    }

    /**
     * Helper function to show overall form success or error alert banner
     */
    function showFormAlert(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
    }

});
