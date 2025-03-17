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


// Text to be typed
const text = "Student ||  Blogger || Frontend Developer";

// Setting up the typing animation
let i = 0;
const typingSpeed = 100; // Adjust typing speed (in milliseconds)
const deletingSpeed = 50; // Adjust deleting speed
const textElement = document.getElementById("typing-text");

function typeText() {
  if (i < text.length) {
    textElement.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeText, typingSpeed);
  } else {
    setTimeout(deleteText, 2000); // Delay before starting to delete
  }
}

function deleteText() {
  if (i > 0) {
    textElement.innerHTML = text.substring(0, i - 1);
    i--;
    setTimeout(deleteText, deletingSpeed);
  } else {
    setTimeout(typeText, 1000); // Delay before starting to type again
  }
}

// Start typing on page load
typeText();

  
  
