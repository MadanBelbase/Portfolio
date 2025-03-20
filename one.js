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

document.getElementById("contactForm").addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevent default form submission

  const form = event.target;
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.innerText = "Sending...";
  submitBtn.disabled = true;

  const formData = new FormData(form);

  try {
    // Send the form data via fetch API
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      // Show Thank You message and make it full-screen
      const thankYouModal = document.getElementById("thankYouModal");
      thankYouModal.classList.remove("hidden");
      thankYouModal.style.height = "100%";  // Full screen height
      thankYouModal.style.width = "100%";   // Full screen width

      // Reset the form
      form.reset();

      // Reset button text after a short delay
      setTimeout(() => {
        submitBtn.innerText = "Send Message";
        submitBtn.disabled = false;
      }, 2000);

      // Hide modal and redirect back to the contact section after 3 seconds
      setTimeout(() => {
        thankYouModal.classList.add("hidden");
        window.location.hash = "#contact";  // Scroll back to the contact section
      }, 3000);

    } else {
      alert("Error sending message. Please try again later.");
      submitBtn.innerText = "Send Message";
      submitBtn.disabled = false;
    }
  } catch (error) {
    alert("Something went wrong. Please check your internet connection.");
    submitBtn.innerText = "Send Message";
    submitBtn.disabled = false;
  }
});

function closeThankYouModal() {
  document.getElementById("thankYouModal").classList.add("hidden");
}



// Sidebar toggle logic for small devices
  const toggleSidebar = document.getElementById("toggleSidebar");
  const mobileSidebar = document.getElementById("mobileSidebar");
  const closeSidebar = document.getElementById("closeSidebar");

  toggleSidebar.addEventListener("click", () => {
    mobileSidebar.classList.remove("hidden");
  });

  closeSidebar.addEventListener("click", () => {
    mobileSidebar.classList.add("hidden");
  });