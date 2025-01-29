document.addEventListener("DOMContentLoaded", () => {
    const texts = ["Web Developer", "Designer", "Programmer"];
    const titleElement = document.getElementById("animated-title");
    let currentIndex = 0;
    let currentTextIndex = 0;
    let isDeleting = false;
  
    function typeAndDelete() {
      const currentText = texts[currentTextIndex];
  
      // Update text content
      titleElement.textContent = currentText.slice(0, currentIndex);
  
      if (!isDeleting) {
        // Typing forward
        if (currentIndex < currentText.length) {
          currentIndex++;
        } else {
          // Pause before deleting
          isDeleting = true;
          setTimeout(typeAndDelete, 1000); // 1-second delay before deleting
          return;
        }
      } else {
        // Deleting backward
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          // Move to the next phrase
          currentTextIndex = (currentTextIndex + 1) % texts.length; // Cycle through texts
          isDeleting = false;
          setTimeout(typeAndDelete, 500); // 0.5-second delay before typing
          return;
        }
      }
  
      // Adjust typing and deleting speed
      const speed = isDeleting ? 50 : 100;
      setTimeout(typeAndDelete, speed);
    }
  
    typeAndDelete(); // Start the animation
  });
  

  // Toggle the mobile menu
  const menuButton = document.getElementById('menuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  
  menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(form);

    // Use the Fetch API to submit the form to Web3Forms API
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Show custom success message
        successMessage.classList.remove('hidden');
        form.reset(); // Clear the form
      } else {
        // Optionally handle failure (show error message or log error)
        alert('Oops! Something went wrong.');
      }
    })
    .catch(error => {
      // Optionally handle error (show error message or log error)
      alert('Oops! Something went wrong.');
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
  
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust offset if needed
          behavior: "smooth"
        });
      }
    });
  });
  
