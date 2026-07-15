// FISCHER OPTIX — site scripts
document.addEventListener("DOMContentLoaded", function () {
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
