document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetElement = document.querySelector(this.getAttribute('href'));
    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Duration in milliseconds (adjust this for slower or faster scrolling)
    let startTime = null;

    function scrollAnimation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const scrollAmount = easeInOut(timeElapsed, startPosition, distance, duration);
      
      window.scrollTo(0, scrollAmount);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(scrollAnimation);
      }
    }

    function easeInOut(t, b, c, d) {
      let time = t / (d / 2);
      if (time < 1) return (c / 2) * time * time + b;
      time--;
      return (-c / 2) * (time * (time - 2) - 1) + b;
    }

    requestAnimationFrame(scrollAnimation);
  });
});
  
  // Mobile menu functionality
  const menuButton = document.getElementById('menuButton');
  const closeMenu = document.getElementById('closeMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');

  function toggleMobileMenu() {
      mobileMenu.classList.toggle('translate-x-full');
      overlay.classList.toggle('opacity-0');
      overlay.classList.toggle('pointer-events-none');
      document.body.classList.toggle('overflow-hidden');
  }

  function closeMobileMenu() {
      mobileMenu.classList.add('translate-x-full');
      overlay.classList.add('opacity-0');
      overlay.classList.add('pointer-events-none');
      document.body.classList.remove('overflow-hidden');
  }

  menuButton.addEventListener('click', toggleMobileMenu);
  closeMenu.addEventListener('click', toggleMobileMenu);
  overlay.addEventListener('click', toggleMobileMenu);

  // Close menu when clicking on anchor links
  document.querySelectorAll('#mobileMenu a[href^="#"]').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
  });
  

  // Contact Form Submission
const contactForm = document.getElementById('contactForm');
const thankYouModal = document.getElementById('thankYouModal');
const closeModal = document.getElementById('closeModal');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      thankYouModal.classList.remove('hidden');
      contactForm.reset();
    } else {
      alert('Something went wrong. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong. Please try again.');
  }
});

// Close Modal
closeModal.addEventListener('click', () => {
  thankYouModal.classList.add('hidden');
});

// Close Modal on Outside Click
window.addEventListener('click', (e) => {
  if (e.target === thankYouModal) {
    thankYouModal.classList.add('hidden');
  }
});



