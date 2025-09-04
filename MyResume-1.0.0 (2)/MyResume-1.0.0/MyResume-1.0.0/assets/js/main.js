/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

// ================================
// soft skills
// =================================

document.addEventListener("DOMContentLoaded", () => {
  // Build the SVG circles for each skill
  document.querySelectorAll('.progress-circle').forEach(container => {
    const percent = container.dataset.percent;
    const label = container.dataset.label;

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 100");

    const bg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    const fg = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    bg.setAttribute("class", "circle-bg");
    bg.setAttribute("cx", "50");
    bg.setAttribute("cy", "50");
    bg.setAttribute("r", "45");

    fg.setAttribute("class", "circle-fg");
    fg.setAttribute("cx", "50");
    fg.setAttribute("cy", "50");
    fg.setAttribute("r", "45");

    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    fg.style.strokeDasharray = circumference;
    fg.style.strokeDashoffset = circumference; // start hidden
    fg.style.transition = "stroke-dashoffset 1s ease"; // keep transition

    svg.appendChild(bg);
    svg.appendChild(fg);
    container.appendChild(svg);

    const percentText = document.createElement("div");
    percentText.className = "percent-text";
    percentText.textContent = `${percent}%`;

    const labelText = document.createElement("div");
    labelText.className = "label-text";
    labelText.textContent = label;

    container.appendChild(percentText);
    container.appendChild(labelText);
  });

  // Animate on reveal using IntersectionObserver
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target;
      const percent = el.getAttribute("data-percent");
      const fgCircle = el.querySelector(".circle-fg");
      const radius = 45;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (percent / 100) * circumference;

      if (entry.isIntersecting) {
        // Animate when entering view
        fgCircle.style.strokeDashoffset = offset;
      } else {
        // Animate back smoothly when leaving view
        fgCircle.style.strokeDashoffset = circumference;
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll(".progress-circle").forEach(el => {
    observer.observe(el);

    // Optional: 3D interactive effect
   el.addEventListener("mousemove", e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = Math.round(-y / 10); // <-- rounded to integer
    const rotateY = Math.round(x / 10);  // <-- rounded to integer
    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});


    el.addEventListener("mouseleave", () => {
      el.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  });
});


// =============================
// proffessional skills
// =============================

// Setup progress bars dynamically
document.querySelectorAll('.skill-pill').forEach(pill => {
  const percent = pill.getAttribute('data-percent');
  const bar = document.createElement('div');
  bar.classList.add('bar');
  pill.appendChild(bar);

  const label = document.createElement('div');
  label.classList.add('percent');
  label.textContent = percent + '%';
  pill.appendChild(label);

  // Animate on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bar.style.width = percent + '%';
        observer.unobserve(pill);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(pill);
});
// ============================



// =============================
// resume
// =============================

document.addEventListener("DOMContentLoaded", () => {
  const educationBtn = document.getElementById("educationBtn");
  const experienceBtn = document.getElementById("experienceBtn");
  const educationTimeline = document.querySelector(".timeline-content.education");
  const experienceTimeline = document.querySelector(".timeline-content.experience");

  educationBtn.addEventListener("click", () => {
    educationBtn.classList.add("active");
    experienceBtn.classList.remove("active");
    educationTimeline.classList.add("active");
    experienceTimeline.classList.remove("active");
  });

  experienceBtn.addEventListener("click", () => {
    experienceBtn.classList.add("active");
    educationBtn.classList.remove("active");
    experienceTimeline.classList.add("active");
    educationTimeline.classList.remove("active");
  });

  // Fade-in on scroll
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => appearOnScroll.observe(fader));
});




// ============================

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();