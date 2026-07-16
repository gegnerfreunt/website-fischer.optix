// FISCHER OPTIX — site scripts
document.addEventListener("DOMContentLoaded", function () {
  // Homepage gallery preview: auto-rotating slides
  var previewSlides = document.querySelectorAll(".gallery-preview-slide");
  var previewDots = document.querySelectorAll(".gallery-preview-dots button");
  if (previewSlides.length) {
    var current = 0;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var timer = null;

    function showSlide(index) {
      previewSlides.forEach(function (s, i) { s.classList.toggle("is-active", i === index); });
      previewDots.forEach(function (d, i) { d.classList.toggle("is-active", i === index); });
      current = index;
    }
    function next() { showSlide((current + 1) % previewSlides.length); }
    function startAuto() {
      if (reduceMotion) return;
      stopAuto();
      timer = setInterval(next, 4200);
    }
    function stopAuto() { if (timer) clearInterval(timer); }

    previewDots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        showSlide(i);
        startAuto();
      });
    });

    var previewEl = document.querySelector(".gallery-preview");
    if (previewEl) {
      previewEl.addEventListener("mouseenter", stopAuto);
      previewEl.addEventListener("mouseleave", startAuto);
    }
    startAuto();
  }

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Work page: category filter
  var filterButtons = document.querySelectorAll("[data-filter]");
  var workSections = document.querySelectorAll("[data-category]");
  if (filterButtons.length && workSections.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-filter");
        filterButtons.forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        workSections.forEach(function (section) {
          if (target === "all" || section.getAttribute("data-category") === target) {
            section.style.display = "";
          } else {
            section.style.display = "none";
          }
        });
        if (target !== "all") {
          var el = document.querySelector('[data-category="' + target + '"]');
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // Scroll reveal
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }
});
