// Initialize Typed.js for typing effect
var typed = new Typed(".text", {
    strings: ["Frontend Developer", "Web Developer", "AI Aspirant"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Function to open a video in a new tab
function openVideo(url) {
    window.open(url, '_blank');
}

// Smooth scroll functionality for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for anchor links to enable smooth scrolling
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

    // Lazy load videos when they come into view
    const videoContainers = document.querySelectorAll('.video-container');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const iframe = entry.target.querySelector('iframe');
                // Only load the video when it's visible
                if(!iframe.src) {
                    iframe.src = iframe.dataset.src;
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize lazy loading for all videos
    videoContainers.forEach(container => {
        const iframe = container.querySelector('iframe');
        iframe.dataset.src = iframe.src;
        iframe.removeAttribute('src');
        observer.observe(container);
    });
});

// Optional: Function to control video play/pause
function toggleVideo(videoContainer) {
    const iframe = videoContainer.querySelector('iframe');
    const player = iframe.contentWindow;
    player.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
}

// Form validation function
document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the form from submitting
    
    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    
    // Simple validation check
    if (name === "" || email === "" || message === "") {
        alert("All fields are required.");
        return;
    }

    // Basic email validation using regex
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // If everything is valid, you can either send the form data to a server, or display a success message.
    // For now, let's log the data and show a success message.
    console.log("Form submitted:", { name, email, message });
    
    alert("Thank you for contacting me. I'll get back to you shortly!");
    
    // Clear the form after submission
    document.getElementById("contact-form").reset();
});
