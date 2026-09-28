/* ==========================================================================
   NOVA TECH - Main JavaScript (script.js)
   Clean, Reliable, Deployment-Ready Interactivity & Form Validation
   ========================================================================== */

// Execute scripts once DOM is fully parsed
document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. MOBILE MENU TOGGLE
       ---------------------------------------------------------------------- */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburgerBtn && navMenu) {
        // Toggle mobile navigation menu when hamburger button is clicked
        hamburgerBtn.addEventListener('click', () => {
            const isActive = hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            hamburgerBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });

        // Close mobile navigation drawer when any nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                hamburgerBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }


    /* ----------------------------------------------------------------------
       2. ACTIVE NAVIGATION LINK HIGHLIGHT ON SCROLL
       ---------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveNavLink() {
        const scrollPosition = window.pageYOffset + 140; // Adjust offset for fixed header

        sections.forEach(currentSection => {
            const sectionHeight = currentSection.offsetHeight;
            const sectionTop = currentSection.offsetTop;
            const sectionId = currentSection.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

            if (correspondingNavLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    correspondingNavLink.classList.add('active');
                } else {
                    correspondingNavLink.classList.remove('active');
                }
            }
        });
    }

    // Listen for window scroll events to update active link
    window.addEventListener('scroll', highlightActiveNavLink);
    highlightActiveNavLink(); // Initial call


    /* ----------------------------------------------------------------------
       3. CONTACT FORM VALIDATION & STATIC SUBMISSION FEEDBACK
       ---------------------------------------------------------------------- */
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        const nameInput = document.getElementById('fullname');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        // Clear error styling dynamically when user types into any input
        const allInputs = contactForm.querySelectorAll('input, textarea');
        allInputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('invalid');
                const errorSpanId = input.id === 'fullname' ? 'name-error' : `${input.id}-error`;
                const errorSpan = document.getElementById(errorSpanId);
                if (errorSpan) {
                    errorSpan.textContent = '';
                }
            });
        });

        contactForm.addEventListener('submit', (event) => {
            // Prevent default HTTP form submit refresh
            event.preventDefault();

            // Clear previous errors
            clearFormErrors();

            const nameValue = nameInput.value.trim();
            const emailValue = emailInput.value.trim();
            const subjectValue = subjectInput.value.trim();
            const messageValue = messageInput.value.trim();

            let isValid = true;

            // 1. Validate Full Name
            if (nameValue === '') {
                showInputError(nameInput, 'name-error', 'Please enter your full name.');
                isValid = false;
            }

            // 2. Validate Email format via Regular Expression
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailValue === '') {
                showInputError(emailInput, 'email-error', 'Please enter your email address.');
                isValid = false;
            } else if (!emailPattern.test(emailValue)) {
                showInputError(emailInput, 'email-error', 'Please enter a valid email address (e.g. name@domain.com).');
                isValid = false;
            }

            // 3. Validate Subject
            if (subjectValue === '') {
                showInputError(subjectInput, 'subject-error', 'Please enter a subject.');
                isValid = false;
            }

            // 4. Validate Message
            if (messageValue === '') {
                showInputError(messageInput, 'message-error', 'Please enter your message.');
                isValid = false;
            }

            // On success, display visible feedback message and reset inputs
            if (isValid) {
                showFormAlert('Thank you! Your message has been received (Demo Mode). We will get back to you shortly!', 'success');
                contactForm.reset();

                // Auto hide message banner after 7 seconds
                setTimeout(() => {
                    if (formMessage) {
                        formMessage.style.display = 'none';
                        formMessage.className = 'form-message';
                    }
                }, 7000);
            } else {
                showFormAlert('Please fix the highlighted errors above before submitting.', 'error');
            }
        });
    }

    /**
     * Helper to set input error state and message
     */
    function showInputError(inputElement, errorSpanId, errorMessage) {
        if (inputElement) {
            inputElement.classList.add('invalid');
        }
        const errorSpan = document.getElementById(errorSpanId);
        if (errorSpan) {
            errorSpan.textContent = errorMessage;
        }
    }

    /**
     * Helper to clear all form error states
     */
    function clearFormErrors() {
        if (!contactForm) return;
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => input.classList.remove('invalid'));

        const errorSpans = contactForm.querySelectorAll('.error-text');
        errorSpans.forEach(span => span.textContent = '');

        if (formMessage) {
            formMessage.style.display = 'none';
            formMessage.className = 'form-message';
        }
    }

    /**
     * Helper to show form alert box
     */
    function showFormAlert(message, type) {
        if (!formMessage) return;
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
    }


    /* ----------------------------------------------------------------------
       4. PREVENT DUMMY LINK REFRESH
       ---------------------------------------------------------------------- */
    const dummyLinks = document.querySelectorAll('a[href="#"], a[href="javascript:void(0)"]');
    dummyLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });

});
