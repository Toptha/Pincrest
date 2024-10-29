// JavaScript to handle fade-in effects on scroll
document.addEventListener("DOMContentLoaded", function () {
    const fadeSections = document.querySelectorAll(".fade-scroll");
  
    function checkVisibility() {
      const windowHeight = window.innerHeight;
      fadeSections.forEach(section => {
        const { top, bottom } = section.getBoundingClientRect();
  
        // Check if section is within the viewport
        if (top < windowHeight * 0.85 && bottom > 0) {
          section.classList.add("visible");
        } else {
          section.classList.remove("visible");
        }
      });
    }
  
    checkVisibility(); // Check visibility on page load
  
    window.addEventListener("scroll", checkVisibility);
  });
  