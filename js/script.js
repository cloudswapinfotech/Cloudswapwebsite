// Make an API call using the base URL
fetch(`${apiBaseURL}/api/greet`)
    .then(response => response.json())
    .then(data => {
        console.log(data); // Output API response
        document.getElementById("greeting").innerText = data.message;
    })
    .catch(error => console.error("Error:", error));

    document.addEventListener("DOMContentLoaded", () => {
      // 1. Dynamically add the fade-in-section class to all <section> elements
      const majorSections = document.querySelectorAll("section");

      majorSections.forEach(section => {
        if (!section.classList.contains("fade-in-section")) {
          section.classList.add("fade-in-section");
        }
      });

      // 2. Set up IntersectionObserver to trigger fade-in animation when sections enter viewport
      const fadeElems = document.querySelectorAll(".fade-in-section");
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible"); // Add visible class to trigger CSS animation
            observer.unobserve(entry.target);       // Stop observing after animation triggers once
          }
        });
      }, { threshold: 0.15 });

      fadeElems.forEach(el => observer.observe(el));
    });
