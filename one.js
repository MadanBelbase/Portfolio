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
        const menuButton = document.getElementById('menuButton');
        const mobileMenu = document.getElementById('mobileMenu');
        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Certificate viewer (placeholder)
        function openCertificate(imageSrc) {
            window.open(imageSrc, '_blank');
        }

        // Animate skill bars on scroll
        const skillBars = document.querySelectorAll('.skill-progress');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.parentElement.nextElementSibling?.textContent || entry.target.style.width;
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            bar.style.width = '0%';
            observer.observe(bar);
        });



  function openCertificate(certImage) {
    // Show the modal and set the image source
    const modal = document.getElementById('certModal');
    const modalImage = document.getElementById('modalImage');
    modal.style.display = 'flex';  // Display the modal
    modalImage.src = certImage;   // Set the image source to the certificate image

    // Close modal when clicking the close button
    const closeButton = document.querySelector('.close-btn');
    closeButton.onclick = function() {
      modal.style.display = 'none'; // Hide the modal
    };

    // Close modal when clicking outside the modal content
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

  document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1); // Get the target section id
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - document.querySelector('header').offsetHeight, // Adjust scroll position for fixed header
            behavior: 'smooth'
        });
    });
});

    document.getElementById("menuButton").addEventListener("click", function () {
        document.getElementById("mobileMenu").classList.toggle("hidden");
    });

    document.getElementById("closeMenu").addEventListener("click", function () {
        document.getElementById("mobileMenu").classList.add("hidden");
    });

  
      