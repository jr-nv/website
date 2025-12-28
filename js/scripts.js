/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Contact form AJAX submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const submitButton = document.getElementById('submitButton');
            const successMessage = document.getElementById('submitSuccessMessage');
            const errorMessage = document.getElementById('submitErrorMessage');
            const formData = new FormData(event.target);

            // Honeypot spam check - if website field is filled, it's a bot
            const honeypot = document.getElementById('website');
            if (honeypot && honeypot.value !== '') {
                // Silently reject spam - don't give the bot any feedback
                return false;
            }

            // Hide any previous messages
            successMessage.classList.add('d-none');
            errorMessage.classList.add('d-none');

            // Disable button and show loading state
            submitButton.disabled = true;
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';

            // Submit form via AJAX
            fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    successMessage.classList.remove('d-none');
                    // Reset form
                    contactForm.reset();
                } else {
                    // Show error message
                    errorMessage.classList.remove('d-none');
                }
            })
            .catch(error => {
                // Show error message on network failure
                errorMessage.classList.remove('d-none');
            })
            .finally(() => {
                // Re-enable button and restore original text
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            });
        });
    }

});
