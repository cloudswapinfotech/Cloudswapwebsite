// Carousel + Quick Links JS (shared for all pages)

document.addEventListener('DOMContentLoaded', () => {
  /* ==============
     Carousel logic
     ============== */
  const carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
    const prevBtn = carousel.querySelector('.carousel-control.prev');
    const nextBtn = carousel.querySelector('.carousel-control.next');
    let currentIndex = 0;
    let autoplayId = null;
    const slideCount = slides.length;

    function updateSlide(newIndex) {
      currentIndex = (newIndex + slideCount) % slideCount;
      const offset = -currentIndex * 100;
      if (track) {
        track.style.transform = `translateX(${offset}%)`;
      }
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    function next() {
      updateSlide(currentIndex + 1);
    }

    function prev() {
      updateSlide(currentIndex - 1);
    }

    function startAutoplay() {
      if (autoplayId) return;
      autoplayId = setInterval(next, 5000); // 5s rotation
    }

    function stopAutoplay() {
      if (!autoplayId) return;
      clearInterval(autoplayId);
      autoplayId = null;
    }

    if (nextBtn) nextBtn.addEventListener('click', () => {
      stopAutoplay();
      next();
      startAutoplay();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
      stopAutoplay();
      prev();
      startAutoplay();
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        stopAutoplay();
        updateSlide(index);
        startAutoplay();
      });
    });

    // Start
    updateSlide(0);
    startAutoplay();

    // Pause on hover (desktop)
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
  });

  /* =======================
     Floating Quick Links Menu
     ======================= */
  const quickBtn = document.querySelector('.quick-links-btn');
  const quickMenu = document.querySelector('.quick-links-menu');

  if (quickBtn && quickMenu) {
    quickBtn.addEventListener('click', () => {
      const open = quickMenu.classList.toggle('active');
      quickMenu.setAttribute('aria-hidden', (!open).toString());
    });

    document.addEventListener('click', (e) => {
      if (
        !quickBtn.contains(e.target) &&
        !quickMenu.contains(e.target)
      ) {
        quickMenu.classList.remove('active');
        quickMenu.setAttribute('aria-hidden', 'true');
      }
    });
  }
});
