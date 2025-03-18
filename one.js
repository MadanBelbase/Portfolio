// Handle scroll to hide/show logo on scroll
let lastScrollTop = 0;
const logo = document.getElementById("logo");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling Down -> Hide Logo
    logo.classList.add("opacity-0", "pointer-events-none");
  } else {
    // Scrolling Up -> Show Logo
    logo.classList.remove("opacity-0", "pointer-events-none");
  }

  lastScrollTop = scrollTop;
});

// Mobile menu toggle
const menuButton = document.getElementById("menuButton");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

// Toggle mobile menu visibility on button click
menuButton.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-full");
  mobileMenu.classList.add("translate-x-0"); // Slide the menu in
  overlay.classList.remove("hidden"); // Show overlay when menu is open
});

// Close the mobile menu when clicking close button
closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-0");
  mobileMenu.classList.add("translate-x-full"); // Slide the menu out
  overlay.classList.add("hidden"); // Hide overlay when menu is closed
});

// Close mobile menu when clicking on the overlay
overlay.addEventListener("click", () => {
  mobileMenu.classList.remove("translate-x-0");
  mobileMenu.classList.add("translate-x-full"); // Slide the menu out
  overlay.classList.add("hidden"); // Hide overlay when menu is closed
});

// Smooth Scroll behavior for navigation links
document.querySelectorAll('.nav-link').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior

    const targetId = this.getAttribute('href').substring(1); // Get the target section id
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Add smooth scroll with offset for fixed header
      const headerHeight = document.querySelector('header').offsetHeight;
      window.scrollTo({
        top: targetElement.offsetTop - headerHeight,
        behavior: 'smooth'
      });

      // Close mobile menu after clicking a nav link
      mobileMenu.classList.remove("translate-x-0");
      mobileMenu.classList.add("translate-x-full"); // Slide the menu out
      overlay.classList.add("hidden"); // Hide overlay when menu is closed
    }
  });
});


// Certificate viewer with modern modal design
function openCertificate(certImage) {
  const modal = document.getElementById('certModal');
  const modalImage = document.getElementById('modalImage');

  if (modal && modalImage) {
    modal.style.display = 'flex'; // Display the modal
    modalImage.src = certImage; // Set the image source to the certificate image

    // Close modal when clicking the close button
    const closeButton = document.querySelector('.close-btn');
    if (closeButton) {
      closeButton.onclick = function () {
        modal.style.display = 'none'; // Hide the modal
      };
    }

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
}

// Close certificate modal with cancel button
const cancelButton = document.getElementById("cancelBtn");
if (cancelButton) {
  cancelButton.addEventListener('click', function () {
    const modal = document.getElementById('certModal');
    if (modal) {
      modal.style.display = 'none'; // Hide the modal
    }
  });
}


// <!-- Typing Effect Script -->

const textArray = ["Blogger", "Web Developer", "Tech Enthusiast"]; // Words to type
const typingText = document.getElementById("typing-text");
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = textArray[textIndex];
  if (!isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  } else {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  }

  let typingSpeed = isDeleting ? 100 : 150;

  if (!isDeleting && charIndex === currentText.length) {
    typingSpeed = 1000; // Pause before deleting
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % textArray.length;
  }

  setTimeout(typeEffect, typingSpeed);
}

// Start typing effect on page load
document.addEventListener("DOMContentLoaded", typeEffect);



// <!-- Floating Particles Animation -->

  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");

  let particlesArray = [];
  const numberOfParticles = 50;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 4 + 1;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.fillStyle = "rgba(173, 216, 230, 0.8)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function createParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
  });

  resizeCanvas();
  createParticles();
  animateParticles();

  
  