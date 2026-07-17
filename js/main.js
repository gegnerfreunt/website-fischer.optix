// FISCHER OPTIX — site scripts
document.addEventListener("DOMContentLoaded", function () {
  // Homepage genre cards: hover image preview with random no-repeat cycling
  var genreCards = document.querySelectorAll(".genre-card[data-preview]");
  genreCards.forEach(function (card) {
    var media = card.querySelector(".genre-card-media");
    var images = [];
    try { images = JSON.parse(card.getAttribute("data-preview")) || []; } catch (e) { images = []; }
    if (!media || !images.length) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var dwellTimer = null;
    var cycleTimer = null;
    var order = [];
    var orderPos = 0;
    var preloaded = false;

    function preload() {
      if (preloaded) return;
      preloaded = true;
      images.forEach(function (src) { var i = new Image(); i.src = src; });
    }
    function shuffle(arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }
    function setImage(src) {
      media.style.backgroundImage = 'url("' + src + '")';
    }
    function enter() {
      preload();
      card.classList.add("is-previewing");
      // Show first image immediately
      setImage(images[0]);
      if (reduceMotion || images.length < 2) return;
      // After a dwell, begin cycling the remaining images in random order (no repeats)
      dwellTimer = setTimeout(function () {
        // Build a shuffled order of the images excluding the one already shown first
        var rest = images.slice(1);
        order = shuffle(rest);
        orderPos = 0;
        cycleTimer = setInterval(function () {
          if (orderPos >= order.length) {
            // Every image has been shown once — hold on the last frame
            clearInterval(cycleTimer);
            cycleTimer = null;
            return;
          }
          setImage(order[orderPos]);
          orderPos++;
        }, 900);
      }, 700);
    }
    function leave() {
      if (dwellTimer) { clearTimeout(dwellTimer); dwellTimer = null; }
      if (cycleTimer) { clearInterval(cycleTimer); cycleTimer = null; }
      card.classList.remove("is-previewing");
    }

    card.addEventListener("mouseenter", enter);
    card.addEventListener("mouseleave", leave);
    // Touch/keyboard: reset any preview state if focus moves away
    card.addEventListener("blur", leave, true);
  });

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
